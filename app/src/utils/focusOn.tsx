export default function focusOn(id: string) {
  const el = document.getElementById(id);
  el && el.focus();
}
