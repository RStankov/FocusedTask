import React from 'react';
import Emoji from 'components/Emoji';
import styles from './styles.module.css';
import ExternalLink from 'components/ExternalLink';
import isURI from 'utils/isURI';

interface IProps {
  uri: string;
  index: number | null;
}

export default function BookmarkOpenLink({ uri, index }: IProps) {
  if (!isURI(uri)) {
    return <div className={styles.inactive} />;
  }

  return (
    <ExternalLink href={uri} className={styles.link} title="Open bookmark">
      <span className={styles.label}>{index}</span>
      <Emoji emoji="↗️" className={styles.emoji} />
    </ExternalLink>
  );
}
