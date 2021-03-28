import * as React from 'react';
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
import Table from 'components/Table';

export default function Shortcuts() {
  return (
    <>
      <BackButton />
      <Stack.Column gap="xl">
        <Title title="Shortcuts" />
        <Section emoji="🌎" title="Global">
          <Table>
            <ShortcutGlobal />
          </Table>
        </Section>
        <Section emoji="⚙️" title="General">
          <Table>
            <Table.Row description="Open shortcuts">
              <Cmd /> + <Key>h</Key>
            </Table.Row>
            <Table.Row description="Go back to task screen">
              <Key>Esc</Key>
            </Table.Row>
          </Table>
        </Section>
        <Section emoji="🎯" title="Task">
          <Table>
            <Table.Row description="Focus on title">
              <Cmd /> + <Key>e</Key>
            </Table.Row>
            <Table.Row description="New todo">
              <Cmd /> + <Key>t</Key>
            </Table.Row>
            <Table.Row description="Focus on first incomplete todo">
              <Cmd /> + <Shift /> + <Key>t</Key>
            </Table.Row>
            <Table.Row description="New bookmark">
              <Cmd /> + <Key>b</Key>
            </Table.Row>
            <Table.Row description="Focus on note">
              <Cmd /> + <Key>n</Key>
            </Table.Row>
            <Table.Row description="Open last bookmark">
              <Cmd /> + <Key>0</Key>
            </Table.Row>
            <Table.Row description="Open [1st-9th] bookmark">
              <Cmd /> + <Key>[1-9]</Key>
            </Table.Row>
            <Table.Row description="Undo">
              <Cmd /> + <Key>z</Key>
            </Table.Row>
            <Table.Row description="Redo">
              <Cmd /> + <Shift /> + <Key>z</Key>
            </Table.Row>
            <Table.Row description="Focus on todo, bookmark or note">
              <Key>Tab</Key>
            </Table.Row>
            <Table.Row description="Switch between tasks">
              <Cmd /> + <Key>`</Key>
            </Table.Row>
          </Table>
        </Section>
        <Section emoji="🔜" title="Todos">
          <Table>
            <Table.Row description="New todo">
              <Key>Enter</Key>
            </Table.Row>
            <Table.Row description="Remove empty todo">
              <Key>Backspace</Key>
            </Table.Row>
            <Table.Row description="Remove todo">
              <Cmd /> + <Key>Backspace</Key>
            </Table.Row>
            <Table.Row description="Blur current todo">
              <Key>Esc</Key>
            </Table.Row>
            <Table.Row description="Focus previous todo">
              <Key>↑</Key>
            </Table.Row>
            <Table.Row description="Focus next todo">
              <Key>↓</Key>
            </Table.Row>
            <Table.Row description="Move todo up">
              <Cmd /> + <Key>↑</Key>
            </Table.Row>
            <Table.Row description="Move todo down">
              <Cmd /> + <Key>↓</Key>
            </Table.Row>
            <Table.Row description="Decrease todo indentation">
              <Cmd /> + <Key>[</Key>
            </Table.Row>
            <Table.Row description="Increase todo indentation">
              <Cmd /> + <Key>]</Key>
            </Table.Row>
            <Table.Row description="Toggle completion of todo">
              <Cmd /> + <Key>click</Key>
            </Table.Row>
            <Table.Row description="Toggle completion of todo">
              <Cmd /> + <Shift /> + <Key>c</Key>
            </Table.Row>
          </Table>
        </Section>
        <Section emoji="📌" title="Bookmarks">
          <Table>
            <Table.Row description="New bookmark">
              <Key>⏎ Enter</Key>
            </Table.Row>
            <Table.Row description="Remove empty bookmark">
              <Key>Backspace</Key>
            </Table.Row>
            <Table.Row description="Remove bookmark">
              <Cmd /> + <Key>Backspace</Key>
            </Table.Row>
            <Table.Row description="Blur current bookmark">
              <Key>Esc</Key>
            </Table.Row>
            <Table.Row description="Focus previous bookmark">
              <Key>↑</Key>
            </Table.Row>
            <Table.Row description="Focus next bookmark">
              <Key>↓</Key>
            </Table.Row>
            <Table.Row description="Move bookmark up">
              <Cmd /> + <Key>↑</Key>
            </Table.Row>
            <Table.Row description="Move bookmark down">
              <Cmd /> + <Key>↓</Key>
            </Table.Row>
            <Table.Row description="Open bookmark">
              <Cmd /> + <Key>click</Key>
            </Table.Row>
          </Table>
        </Section>
      </Stack.Column>
    </>
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
    <Table.Row
      description={
        isEditing ? (
          <Stack.Row gap="m">
            <input
              value={key}
              onChange={setKey}
              autoFocus={true}
              maxLength={1}
              className={classNames(
                styles.input,
                !isKeyAcceptable(key) && styles.error,
              )}
              onKeyDown={(e) => {
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
    </Table.Row>
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
      setIsEditing(false);
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
