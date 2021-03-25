import useSelector from 'hooks/useSelector';
import { getTheme } from 'modules/selectors';


export default function useTheme() {
  const theme = useSelector(getTheme)
  React.useEffect(() => document.documentElement.setAttribute("data-theme", theme), [theme])
}
