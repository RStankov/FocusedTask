import * as React from 'react';
import Section from 'components/Section';
import Stack from 'components/Stack';
import styles from './styles.module.css';
import BackButton from 'components/BackButton';
import Title from 'components/Title';
import useSelector from 'hooks/useSelector';
import useDispatch from 'hooks/useDispatch';
import { getTheme } from 'modules/selectors';
import { themes, ITheme, changeTheme } from 'modules/preferences';
import Table from 'components/Table';

export default function Preferences() {
  return (
    <>
      <BackButton />
      <Stack.Column gap="xl">
        <Title title="Preferences" />
        <Section emoji="⚙️" title="General">
          <Table>
            <Table.Row description="Theme">
              <ThemeDropdown />
            </Table.Row>
          </Table>
        </Section>
      </Stack.Column>
    </>
  );
}

function ThemeDropdown() {
  const theme = useSelector(getTheme);
  const dispatch = useDispatch();

  return (
    <div>
      <select
        className={styles.select}
        value={theme}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          dispatch(changeTheme(e.target.value as ITheme));
        }}
        id="theme">
        {themes.map((theme) => (
          <option value={theme} key={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
}
