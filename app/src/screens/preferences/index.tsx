import * as React from 'react';
import Section from 'components/Section';
import Stack from 'components/Stack';
import styles from './styles.module.css';
import BackButton from 'components/BackButton';
import Title from 'components/Title';
import useSelector from 'hooks/useSelector';
import useDispatch from 'hooks/useDispatch';
import useShortcuts from 'hooks/useShortcuts';
import { getTheme } from 'modules/selectors';
import { changeTheme } from 'modules/theme';

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
export type Themes = typeof themes[number];

function ThemeDropdown() {
  const theme = useSelector(getTheme)
  const dispatch = useDispatch();
  console.log('theme',theme)

  return (
    <div>
      <select
        className={styles.select_selected}
        value={theme}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const theme = e.target.value as Themes
          dispatch(changeTheme(theme))
        }}
        id="theme" >
        {themes.map((theme) => <option value={theme} key={theme}>{theme}</option>)}
      </select>
  </div>)
}


