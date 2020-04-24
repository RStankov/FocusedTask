export default function focusOn(id) {
  const el = document.getElementById(id);
  el && el.focus();
}
