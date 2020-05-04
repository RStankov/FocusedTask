export default function focusOn(id: string) {
  const el = document.getElementById(id) as any;

  if (!el) {
    return;
  }

  el.focus();
  el.setSelectionRange(el.value.length, el.value.length);
}
