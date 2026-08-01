[CmdletBinding()]
param(
  [Parameter(Mandatory = $true, Position = 0)]
  [ValidateSet('serp', 'cluster', 'parse', 'rankings', 'backlinks', 'overview', 'update', 'quickwins', 'compare')]
  [string]$Mode,

  [Parameter(Mandatory = $true, Position = 1)]
  [ValidateSet('nl', 'en')]
  [string]$Locale,

  [Parameter(Mandatory = $true, Position = 2, ValueFromRemainingArguments = $true)]
  [string[]]$Values
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$sharedEnvFile = if ($env:GO2_DFS_ENV_FILE) {
  $env:GO2_DFS_ENV_FILE
} else {
  'C:\Users\M_Smi\Projecten\theyogasensei\.env.local'
}

if (-not (Test-Path -LiteralPath $sharedEnvFile -PathType Leaf)) {
  throw "Shared DataForSEO environment file not found: $sharedEnvFile"
}

Get-Content -LiteralPath $sharedEnvFile | ForEach-Object {
  if ($_ -match '^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$') {
    $name = $matches[1]
    $value = $matches[2].Trim().Trim('"').Trim("'")
    Set-Item -Path "Env:$name" -Value $value
  }
}

$env:NODE_OPTIONS = '--require=C:\tmp\codex-node-os-patch.cjs'

Push-Location -LiteralPath $projectRoot
try {
  foreach ($value in $Values) {
    if ([string]::IsNullOrWhiteSpace($value)) {
      throw 'Every DataForSEO value must contain a keyword, URL, or domain.'
    }

    & npm.cmd run seo:research -- $Mode $Locale $value
    if ($LASTEXITCODE -ne 0) {
      exit $LASTEXITCODE
    }
  }
} finally {
  Pop-Location
}
