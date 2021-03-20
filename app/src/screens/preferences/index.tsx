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
import useShortcuts from 'hooks/useShortcuts';

export default function Preferences() {
  useShortcuts();

  return (
    <>
      <BackButton />
      <Stack.Column gap="xl">
        <Title title="Preferences" />
        <Section emoji="⚙️" title="General">
          <PreferencesTable>
            <Preference description="Theme">
              <ThemeDropdown />
            </Preference>
          </PreferencesTable>
        </Section>
      </Stack.Column>
    </>
  );
}

function PreferencesTable({ children }: { children: React.ReactNode }) {
  return (
    <table className={styles.table}>
      <tbody>{children}</tbody>
    </table>
  );
}

function Preference({
  description,
  children,
}: {
  description: string | React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <tr>
      <td>{description}</td>
      <td className={styles.keys} align="right">
        {children}
      </td>
    </tr>
  );
}

const themes = ['light' , 'dark'] as const
type Themes = typeof themes[number];

function ThemeDropdown() {
  const [theme, setTheme] = React.useState(loadTheme());
  return (
  // <div className={styles.custom_select} style={{width: '200px'}}>
  <div>
    <select className={styles.select_selected} value={theme} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
      const theme = e.target.value as Themes
      updateTheme(theme)
      setTheme(theme)
    }} id="theme" >
      {themes.map((theme) => <option value={theme}>{theme}</option>)}
    </select>
  </div>)
}

// type Themes = "dark" | "light"

function updateTheme(theme: Themes) {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute("data-theme", theme);
}


function loadTheme():Themes | undefined  {
  try {
    const theme = localStorage.get('theme')
    document.documentElement.setAttribute("data-theme", theme);
    return theme
  } catch {
    return undefined
  }
}