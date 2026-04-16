import React from 'react';
import { formatEditorialUpdatedAt } from '../../lib/pseo-editorial-date';

interface EditorialMetaProps {
  updatedAt?: string;
}

export default function EditorialMeta({ updatedAt }: EditorialMetaProps) {
  const formattedDate = formatEditorialUpdatedAt(updatedAt);

  return (
    <p className="mt-3 text-sm text-white/85">
      Reviewed by Marvin
      <span className="mx-2 text-white/50">•</span>
      Founder &amp; Lead Editor
      {formattedDate && (
        <>
          <span className="mx-2 text-white/50">•</span>
          Last updated: <strong>{formattedDate}</strong>
        </>
      )}
    </p>
  );
}
