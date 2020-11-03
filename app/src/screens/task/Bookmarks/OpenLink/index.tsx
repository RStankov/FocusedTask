import * as React from 'react';
import styles from './styles.module.css';
import ExternalLink from 'components/ExternalLink';
import { bookmarkUri } from 'utils/bookmarks';

interface IProps {
  bookmark: {
    uri: string;
  };
  index: number;
}

export default function BookmarkOpenLink({ bookmark, index }: IProps) {
  const uri = bookmarkUri(bookmark);

  if (!uri) {
    return <div className={styles.inactive} />;
  }

  return (
    <ExternalLink href={uri} className={styles.link} title="Open bookmark">
      <span className={styles.label}>{index}</span>
      <span role="img" aria-label="open link" className={styles.emoji}>
        ↗️
      </span>
    </ExternalLink>
  );
}
