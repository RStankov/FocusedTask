import React from 'react';
import Section from 'components/Section';
import Stack from 'components/Stack';
import styles from './styles.module.css';
import BackButton from 'components/BackButton';
import Title from 'components/Title';
import keyCodes from 'utils/keyCodes';
import { updateGlobalShortcutKey, getGlobalShortcutKey } from 'utils/electron';
import isAccelerator from 'electron-is-accelerator';
import classNames from 'classnames';
import Button from 'components/Button';

export default function Shortcuts() {
  return (
    <>
      <BackButton />
      <Stack.Column gap="m">
        <Title emoji="⌨️" title="Shortcuts" />
        <Section emoji="🌎" title="Global">
          <ShortcutsTable>
            <ShortcutGlobal />
          </ShortcutsTable>
        </Section>
        <Section emoji="🎯" title="Task">
          <ShortcutsTable>
            <Shortcut description="New todo">
              <Cmd /> + <Key>t</Key>
            </Shortcut>
            <Shortcut description="Focus on first incomplete todo">
              <Cmd /> + <Shift /> + <Key>t</Key>
            </Shortcut>
            <Shortcut description="New bookmark">
              <Cmd /> + <Key>b</Key>
            </Shortcut>
            <Shortcut description="Focus on note">
              <Cmd /> + <Key>n</Key>
            </Shortcut>
            <Shortcut description="Undo">
              <Cmd /> + <Key>z</Key>
            </Shortcut>
            <Shortcut description="Redo">
              <Cmd /> + <Shift /> + <Key>z</Key>
            </Shortcut>
            <Shortcut description="Open last bookmark">
              <Cmd /> + <Key>0</Key>
            </Shortcut>
            <Shortcut description="Open [1st-9th] bookmark">
              <Cmd /> + <Key>[1-9]</Key>
            </Shortcut>
          </ShortcutsTable>
        </Section>
        <Section emoji="🔜" title="Todos">
          <ShortcutsTable>
            <Shortcut description="New todo">
              <Key>Enter</Key>
            </Shortcut>
            <Shortcut description="Remove empty todo">
              <Key>Backspace</Key>
            </Shortcut>
            <Shortcut description="Remove todo">
              <Cmd /> + <Key>Backspace</Key>
            </Shortcut>
            <Shortcut description="Blur current todo">
              <Key>Esc</Key>
            </Shortcut>
            <Shortcut description="Focus previous todo">
              <Key>↑</Key>
            </Shortcut>
            <Shortcut description="Focus next todo">
              <Key>↓</Key>
            </Shortcut>
            <Shortcut description="Move todo up">
              <Cmd /> + <Key>↑</Key>
            </Shortcut>
            <Shortcut description="Move todo down">
              <Cmd /> + <Key>↓</Key>
            </Shortcut>
            <Shortcut description="Decrease todo indentation">
              <Cmd /> + <Key>[</Key>
            </Shortcut>
            <Shortcut description="Increase todo indentation">
              <Cmd /> + <Key>]</Key>
            </Shortcut>
            <Shortcut description="Toggle completion of todo">
              <Cmd /> + <Key>click</Key>
            </Shortcut>
            <Shortcut description="Toggle completion of todo">
              <Cmd /> + <Shift /> + <Key>c</Key>
            </Shortcut>
          </ShortcutsTable>
        </Section>
        <Section emoji="📌" title="Bookmarks">
          <ShortcutsTable>
            <Shortcut description="New bookmark">
              <Key>⏎ Enter</Key>
            </Shortcut>
            <Shortcut description="Remove empty bookmark">
              <Key>Backspace</Key>
            </Shortcut>
            <Shortcut description="Remove bookmark">
              <Cmd /> + <Key>Backspace</Key>
            </Shortcut>
            <Shortcut description="Blur current bookmark">
              <Key>Esc</Key>
            </Shortcut>
            <Shortcut description="Focus previous bookmark">
              <Key>↑</Key>
            </Shortcut>
            <Shortcut description="Focus next bookmark">
              <Key>↓</Key>
            </Shortcut>
            <Shortcut description="Move bookmark up">
              <Cmd /> + <Key>↑</Key>
            </Shortcut>
            <Shortcut description="Move bookmark down">
              <Cmd /> + <Key>↓</Key>
            </Shortcut>
            <Shortcut description="Open bookmark">
              <Cmd /> + <Key>click</Key>
            </Shortcut>
          </ShortcutsTable>
        </Section>
      </Stack.Column>
    </>
  );
}

function ShortcutsTable({ children }: { children: React.ReactNode }) {
  return (
    <table className={styles.table}>
      <tbody>{children}</tbody>
    </table>
  );
}

function Shortcut({
  description,
  children,
}: {
  description: string | React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <tr>
      <td className={styles.keys} align="right">
        {children}
      </td>
      <td>{description}</td>
    </tr>
  );
}

function Cmd() {
  return <Key>⌘ Cmd</Key>;
}

function Shift() {
  return <Key>Shift</Key>;
}

function Key({ children }: { children: React.ReactNode }) {
  return <span className={styles.key}>{children}</span>;
}

function ShortcutGlobal() {
  const {
    key,
    setKey,
    isEditing,
    edit,
    cancelChanges,
    saveChanges,
  } = useGlobalShortcutForm();

  return (
    <Shortcut
      description={
        isEditing ? (
          <Stack.Row gap="s">
            <input
              value={key}
              onChange={setKey}
              autoFocus={true}
              maxLength={1}
              className={classNames(
                styles.input,
                !isKeyAcceptable(key) && styles.error,
              )}
              onKeyDown={e => {
                if (e.keyCode === keyCodes.enter) {
                  saveChanges();
                }
              }}
            />
            <Button onClick={saveChanges}>Save</Button>
            <Button onClick={cancelChanges}>Cancel</Button>
          </Stack.Row>
        ) : (
          <>
            Open Focused Task (global) <Button onClick={edit}>change</Button>
          </>
        )
      }>
      <Cmd /> + <Key>{key}</Key>
    </Shortcut>
  );
}

export function useGlobalShortcutForm() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [key, setKey] = React.useState(getGlobalShortcutKey);

  return {
    key,
    setKey(e: any) {
      setKey(e.target.value);
    },
    isEditing,
    edit() {
      setIsEditing(true);
    },
    cancelChanges() {
      setKey(getGlobalShortcutKey());
      setIsEditing(true);
    },
    saveChanges() {
      if (isKeyAcceptable(key)) {
        updateGlobalShortcutKey(key);
        setIsEditing(false);
      }
    },
  };
}

function isKeyAcceptable(key: string) {
  return isAccelerator(`CommandOrControl+${key}`);
}
