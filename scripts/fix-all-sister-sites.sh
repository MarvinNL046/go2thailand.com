#!/usr/bin/env bash
# Patch all Go2 sister sites in one pass:
#   1. Re-sync pipeline files (now repo-aware)
#   2. Backfill pipeline.config.json with repoOwner + repoName
#   3. Report git status (user pushes manually)
#
# Root-cause of the blog-pipeline-not-working issue across sister sites:
# `lib/pipeline/github-commit.ts` had REPO_NAME hardcoded to "go2thailand.com",
# so every sister cron was trying to commit to Thailand's repo (succeeding
# or failing silently depending on GITHUB_TOKEN scope). Either way: no
# blogs landed in the sister site's own repo.

set -e

PUSH=false
if [ "${1:-}" = "--push" ]; then
  PUSH=true
  echo "⚠ --push enabled: will commit + push every patched site."
fi

SRC="$(cd "$(dirname "$0")/.." && pwd)"
PARENT="$(dirname "$SRC")"

# Directory name ↔ (country, siteName) mapping.
# Note: go2-usa is present in dir name with dash; friendly display name = "USA".
declare -A SITES=(
  ["go2-bali.com"]="Bali:Go2Bali"
  ["go2-china.com"]="China:Go2China"
  ["go2-france.com"]="France:Go2France"
  ["go2-india.com"]="India:Go2India"
  ["go2-japan.com"]="Japan:Go2Japan"
  ["go2-mexico.com"]="Mexico:Go2Mexico"
  ["go2-morocco.com"]="Morocco:Go2Morocco"
  ["go2-spain.com"]="Spain:Go2Spain"
  ["go2-usa.com"]="USA:Go2USA"
  ["go2-vietnam.com"]="Vietnam:Go2Vietnam"
)

echo "Patching sister sites from $SRC"
echo ""

for DIR in "${!SITES[@]}"; do
  TARGET="$PARENT/$DIR"
  if [ ! -d "$TARGET" ]; then
    echo "✗ $DIR — directory not found, skipped"
    continue
  fi

  IFS=':' read -r COUNTRY SITE_NAME <<< "${SITES[$DIR]}"

  echo "→ $DIR ($COUNTRY)"

  # Run the sync script for this site (copies fixed pipeline + backfills config).
  bash "$SRC/scripts/sync-pipeline.sh" "$TARGET" "$COUNTRY" "$SITE_NAME" "$DIR" 2>&1 | sed 's/^/    /' | tail -5

  # Show what's changed in git; optionally commit + push.
  if [ -d "$TARGET/.git" ]; then
    CHANGED=$(cd "$TARGET" && git status --porcelain 2>/dev/null | wc -l)
    echo "    git: $CHANGED files changed"

    if [ "$PUSH" = true ] && [ "$CHANGED" -gt 0 ]; then
      # Stage only the paths we sync-patched — don't sweep up any unrelated
      # in-progress work in the sister site.
      (cd "$TARGET" && \
        git add lib/pipeline/*.ts lib/i18n/index.ts lib/indexnow.ts \
                pages/api/cron/*.ts scripts/*.mjs \
                pipeline.config.json 2>/dev/null || true) | sed 's/^/    /'

      STAGED=$(cd "$TARGET" && git diff --cached --name-only 2>/dev/null | wc -l)
      if [ "$STAGED" -gt 0 ]; then
        BRANCH=$(cd "$TARGET" && git rev-parse --abbrev-ref HEAD)
        if [ "$BRANCH" != "main" ] && [ "$BRANCH" != "master" ]; then
          echo "    ⚠ branch is '$BRANCH', skipping push (not main/master)"
        else
          (cd "$TARGET" && \
           git commit -m "fix(pipeline): commit to own repo, not go2thailand

Root cause: lib/pipeline/github-commit.ts had REPO_NAME hardcoded to
\"go2thailand.com\", so sister cron runs were pushing blogs into the wrong
repo. Resolved via pipeline.config.json (repoOwner/repoName)." 2>&1 | sed 's/^/    /') || echo "    commit skipped (likely no staged changes)"

          # Push; fail softly so one bad site doesn't stop the loop.
          if (cd "$TARGET" && git push 2>&1 | sed 's/^/    /'); then
            echo "    ✓ pushed"
          else
            echo "    ✗ push failed — resolve manually"
          fi
        fi
      else
        echo "    nothing staged (files filtered out?)"
      fi
    fi
  else
    echo "    git: no repo (not a clone?)"
  fi
  echo ""
done

echo "Done. Manual next steps per site:"
echo "  1. cd <site-dir> && git add -A && git commit -m 'fix: pipeline commits to own repo'"
echo "  2. git push"
echo "  3. On Vercel: verify GITHUB_TOKEN has write access to THIS site's repo"
echo "     (not thailand's — each sister site needs its own scoped PAT)."
echo "  4. Trigger a test cron run from Vercel dashboard to verify blog commits land."
