import * as React from 'react';
import { bookmarkTitle } from 'utils/bookmarks';

function hasMarkdown(text: string) {
  return text.includes('**');
}

//eslint-disable-next-line no-useless-escape
const BOLD_REGEX = /(\*\*[^\*]+\*\*)/gi;

function applyMarkdown(text: string) {
  return text
    .split(BOLD_REGEX)
    .map((chunk, i) =>
      chunk.match(BOLD_REGEX) ? <strong key={i}>{chunk}</strong> : chunk,
    );
}

function renderMarkdown(text: string) {
  return hasMarkdown(text) ? applyMarkdown(text) : text;
}

function renderLink(text: string) {
  text = bookmarkTitle(text);

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
