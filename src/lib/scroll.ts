import type Lenis from "lenis";
let inst: Lenis | null = null;
export const setLenis = (l: Lenis | null) => { inst = l; };
export const getLenis = () => inst;
export function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (inst) inst.scrollTo(el); else el.scrollIntoView();
}
