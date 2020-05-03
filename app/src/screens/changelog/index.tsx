import React from 'react';
import Stack from 'components/Stack';
import BackButton from 'components/BackButton';
import Title from 'components/Title';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.css';
import raw from 'raw.macro';

const markdown = raw('../../../CHANGELOG.md').replace(/^# .*\n\n/, '');

export default function Shortcuts() {
  return (
    <>
      <BackButton />
      <Stack.Column>
        <Title emoji="📖" title="Changelog" />
        <div className={styles.markdown}>
          <ReactMarkdown source={markdown} escapeHtml={true} />
        </div>
      </Stack.Column>
    </>
  );
}
