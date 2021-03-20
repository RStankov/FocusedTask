import * as React from 'react';
import Stack from 'components/Stack';
import BackButton from 'components/BackButton';
import styles from './styles.module.css';
import ExternalLink from 'components/ExternalLink';
import logo from 'icons/logo.png';
import { appVersion } from 'utils/electron';
import { autoUpdateRequest } from 'utils/electron';
import AutoUpdateStatus from './AutoUpdateStatus';
import TextButton from './TextButton';
import useShortcuts from 'hooks/useShortcuts';

export default function About() {
  useShortcuts()

  return (
    <>
      <BackButton />
      <Stack.Column
        align="center"
        justify="center"
        className={styles.about}
        gap="m">
        <img src={logo} alt="Logo" width={100} height={100} />
        <strong>Focused Task</strong>
        <span>Version {appVersion()}</span>
        <span>
          Copyright ©{' '}
          <ExternalLink href="https://rstankov.com">
            Radoslav Stankov
          </ExternalLink>
        </span>
        <span>
          <ExternalLink href="http://github.com/rstankov/FocusedTask">
            Source Code
          </ExternalLink>{' '}
          |{' '}
          <TextButton onClick={autoUpdateRequest}>Check for Updates</TextButton>
        </span>
        <AutoUpdateStatus />
      </Stack.Column>
    </>
  );
}
