"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { goTo, getLenis } from "@/lib/scroll";

export default function Nav() {
  const [scrolled, setS] = useState(false);
  const [active, setA] = useState("");
  const [open, setO] = useState(false);
  const [prog, setP] = useState(0);
  const [ind, setInd] = useState({ x: 0, w: 0 });
  const pill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = () => { setS(scrollY > 40); const h = document.documentElement.scrollHeight - innerHeight; setP(h > 0 ? scrollY / h : 0); };
    f(); addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setA(e.target.id === "top" ? "" : e.target.id); }), { rootMargin: "-45% 0px -50% 0px" });
    ["top", ...NAV.map((n) => n.id)].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  useLayoutEffect(() => {
    const el = pill.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    setInd(el ? { x: el.offsetLeft, w: el.offsetWidth } : { x: 0, w: 0 });
  }, [active, scrolled]);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setO(false); };
    addEventListener("keydown", k); getLenis()?.stop(); document.body.style.overflow = "hidden";
    return () => { removeEventListener("keydown", k); getLenis()?.start(); document.body.style.overflow = ""; };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); setO(false); setTimeout(() => goTo(id), 60); };

  return (
    <>
      <div className="prog" style={{ transform: `scaleX(${prog})` }} aria-hidden />
      <header className={`nav ${scrolled ? "sc" : ""}`}>
        <a href="#top" className="brand" onClick={go("top")} aria-label={`${PROFILE.name} — back to top`}>
          <span className="mark">{PROFILE.initials}</span><span className="bname">{PROFILE.name}</span>
        </a>
        <nav className="pill" ref={pill} aria-label="Primary">
          <span className="ind" style={{ transform: `translateX(${ind.x}px)`, width: ind.w, opacity: ind.w ? 1 : 0 }} aria-hidden />
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} data-id={n.id} className={active === n.id ? "on" : ""} onClick={go(n.id)}>{n.label}</a>
          ))}
        </nav>
        <button className="menubtn" aria-expanded={open} aria-controls="mnav" onClick={() => setO(!open)}>{open ? "Close" : "Menu"}</button>
      </header>
      <div id="mnav" className={`mover ${open ? "open" : ""}`} aria-hidden={!open}>
        {NAV.map((n, i) => (
          <a key={n.id} href={`#${n.id}`} tabIndex={open ? 0 : -1} style={{ transitionDelay: `${open ? 150 + i * 60 : 0}ms` }} onClick={go(n.id)}>
            <small>{String(i + 1).padStart(2, "0")}</small>{n.label}
          </a>
        ))}
      </div>
    </>
  );
}
