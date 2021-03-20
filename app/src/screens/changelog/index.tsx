import * as React from 'react';
import Stack from 'components/Stack';
import BackButton from 'components/BackButton';
import Title from 'components/Title';
import ReactMarkdown from 'react-markdown';
import styles from './styles.module.css';
import raw from 'raw.macro';
import useShortcuts from 'hooks/useShortcuts';

const markdown = raw('../../../../CHANGELOG.md').replace(/^# .*\n\n/, '');

export default function ChangeLog() {
  useShortcuts()


  return (
    <>
      <BackButton />
      <Stack.Column>
        <Title title="Changelog" />
        <div className={styles.markdown}>
          <ReactMarkdown source={markdown} escapeHtml={true} />
        </div>
      </Stack.Column>
    </>
  );
}
