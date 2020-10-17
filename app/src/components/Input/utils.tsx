import * as React from 'react';

export function hasMarkdown(text: string) {
  return text.includes('**');
}

const BOLD_REGEX = /(\*\*[^\*]+\*\*)/gi;

export function applyMarkdown(text: string) {
  return text
    .split(BOLD_REGEX)
    .map((chunk, i) =>
      chunk.match(BOLD_REGEX) ? <strong key={i}>{chunk}</strong> : chunk,
    );
}
