import * as React from 'react';
import isURI from 'utils/isURI';

export function hasMarkdown(text: string) {
  return text.includes('**');
}

//eslint-disable-next-line no-useless-escape
const BOLD_REGEX = /(\*\*[^\*]+\*\*)/gi;

export function applyMarkdown(text: string) {
  return text
    .split(BOLD_REGEX)
    .map((chunk, i) =>
      chunk.match(BOLD_REGEX) ? <strong key={i}>{chunk}</strong> : chunk,
    );
}

export function renderMarkdown(text: string) {
  return hasMarkdown(text) ? applyMarkdown(text) : text;
}

export function renderLink(text: string) {
  if (text.includes(' ')) {
    const [chunk1, chunk2] = text.split(' ');
    if (isURI(chunk2)) {
      text = chunk1 + ' ↗️';
    }
  }

  if (text.length > 60) {
    text = text.substr(0, 50) + '...';
  }

  return text;
}

const RENDERERS = {
  markdown: renderMarkdown,
  link: renderLink,
};

export type IRenderer = keyof typeof RENDERERS;

export function renderText(text: string, renderer: IRenderer) {
  return RENDERERS[renderer](text);
}
