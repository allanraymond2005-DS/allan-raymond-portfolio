"use client";
/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useRef, useState } from "react";
import { PROFILE, SKILL_GROUPS, PROJECTS, CERTIFICATIONS, EDUCATION, EXPERIENCE } from "@/lib/data";

const Tag = ({ n, label }: { n: string; label: string }) => <p className="tag">{n} — {label}</p>;

function Logo({ slug }: { slug?: string }) {
  const [bad, setBad] = useState(!slug);
  if (bad) return <svg className="logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>;
  return <img className="logo" src={`/logos/${slug}.svg`} alt="" onError={() => setBad(true)} />;
}

/* ───────── About ───────── */
function IdCard() {
  const [flip, setFlip] = useState(false);
  const sw = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const sec = sw.current!.closest("section")!; let a = 0, v = 0, raf = 0;
    const mv = (e: PointerEvent) => { v += e.movementX * 0.012; };
    sec.addEventListener("pointermove", mv);
    const loop = (t: number) => { v += -a * 0.02; v *= 0.95; a += v; sw.current!.style.transform = `rotate(${Math.max(-14, Math.min(14, a)) + Math.sin(t / 1100) * 1.4}deg)`; raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); sec.removeEventListener("pointermove", mv); };
  }, []);
  const lines = [
    `${PROFILE.role} at BDreamz Global Solutions Pvt Ltd`,
    "B.Tech CSE/Data Science · 7.0 CGPA",
    "Projects: AI Mock Interview Platform, Airline Reservation System, IT Incident Intelligence",
    "Certifications: Data Analyst (Besant Technologies), Anthropic Courses",
  ];
  return (
    <div className="lanyard" ref={sw}>
      <div className="strap" aria-hidden><div><span>{PROFILE.name} · {PROFILE.role} · {PROFILE.name} · {PROFILE.role} ·</span></div></div>
      <div className="clip" aria-hidden />
      <button className={`card3d ${flip ? "flip" : ""}`} onClick={() => setFlip(!flip)} aria-pressed={flip} aria-label={`ID card of ${PROFILE.name}, ${PROFILE.role}. Press to flip.`}>
        <span className="face front">
          <span className="band">DEVELOPER ID</span>
          <img src="/portrait-bust.webp" alt={`Portrait of ${PROFILE.name}`} width={128} height={156} />
          <strong>{PROFILE.name}</strong><em>{PROFILE.role}</em>
          <span className="barcode" aria-hidden /><span className="holo" aria-hidden />
        </span>
        <span className="face back">
          <h3>What I am</h3>
          <ul>{lines.map((l) => <li key={l}>{l}</li>)}</ul>
          <small>If found, say hello</small>
        </span>
      </button>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="sec wrap">
      <Tag n="01" label="About" />
      <div className="about">
        <div className="reveal">
          <h2 className="h2">Hi, I&apos;m <span className="em">Allan.</span></h2>
          <p className="lead">{PROFILE.resumeSummary}</p>
          <p className="muted">{PROFILE.aboutExtra}</p>
          <div className="btns">
            <a className="btn pri" href={PROFILE.resumePath} download>Résumé</a>
            {PROFILE.github && <a className="btn" href={PROFILE.github}>GitHub</a>}
            {PROFILE.linkedin && <a className="btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>}
          </div>
        </div>
        <IdCard />
        <dl className="facts reveal">
          <div><dt>Location</dt><dd>{PROFILE.location}</dd></div>
          <div><dt>Education</dt><dd>B.Tech CSE/Data Science, Kalasalingam Academy of Research and Education (2022 – 2026)</dd></div>
          <div><dt>Current role</dt><dd>{PROFILE.role}, BDreamz Global Solutions Pvt Ltd (May 2026 – Present)</dd></div>
          <div><dt>Email</dt><dd><a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a></dd></div>
        </dl>
      </div>
    </section>
  );
}

/* ───────── Skills ───────── */
function symbols(names: string[]) {
  const used = new Set<string>();
  return names.map((n) => {
    const w = n.replace(/[^A-Za-z ]/g, " ").split(/\s+/).filter(Boolean); const L = w.join("").toLowerCase(); const c: string[] = [];
    if (w.length > 1) c.push(w[0][0] + w[1][0]);
    for (let i = 1; i < L.length; i++) c.push(L[0] + L[i]);
    const s = c.find((x) => !used.has(x.toLowerCase())) || L.slice(0, 2); used.add(s.toLowerCase());
    return s[0].toUpperCase() + s.slice(1, 2).toLowerCase();
  });
}

export function Skills() {
  const flat = SKILL_GROUPS.flatMap((g) => g.skills.map((s) => ({ ...s, gid: g.id, glabel: g.label })));
  const syms = symbols(flat.map((s) => s.name));
  const [f, setF] = useState("all");
  const [sel, setSel] = useState<number | null>(null);
  const cur = sel === null ? null : flat[sel];
  return (
    <section id="skills" className="sec wrap">
      <Tag n="02" label="The periodic table of my stack" />
      <h2 className="h2 reveal">Skills, <span className="em">elementally.</span></h2>
      <div className="filters" role="group" aria-label="Filter skills by family">
        <button aria-pressed={f === "all"} onClick={() => setF("all")}>All</button>
        {SKILL_GROUPS.map((g) => <button key={g.id} aria-pressed={f === g.id} onClick={() => setF(g.id)}>{g.label}</button>)}
      </div>
      <div className="skills">
        <div className="grid wave">
          {flat.map((s, i) => (
            <button key={s.name} className={`tile ${f !== "all" && f !== s.gid ? "dim" : ""} ${sel === i ? "sel" : ""}`}
              style={{ ["--d" as string]: `${((i % 8) + Math.floor(i / 8)) * 40}ms` }}
              onMouseEnter={() => setSel(i)} onFocus={() => setSel(i)} aria-label={`${s.name}, ${s.glabel}`}>
              <small>{i + 1}</small><b>{syms[i]}</b><span>{s.name}</span>
            </button>
          ))}
        </div>
        <aside className="insp" aria-live="polite">
          {cur ? (
            <>
              <Logo slug={cur.logo} key={cur.name} />
              <h3>{cur.name}</h3><p className="mono">{cur.glabel}</p>
              {cur.detail && <p className="muted">{cur.detail}</p>}
              {cur.projects.length > 0 && <><p className="mono">Used in</p><ul>{cur.projects.map((id) => <li key={id}>{PROJECTS.find((p) => p.id === id)?.title}</li>)}</ul></>}
            </>
          ) : <p className="muted">Hover or focus a tile to inspect it.</p>}
        </aside>
      </div>
    </section>
  );
}

/* ───────── Work ───────── */
export function Work() {
  const [open, setOpen] = useState(0);
  return (
    <section id="work" className="sec wrap">
      <Tag n="03" label="Selected work" />
      <h2 className="h2 reveal">Things I&apos;ve <span className="em">built.</span></h2>
      <div className="acc">
        {PROJECTS.map((p, i) => (
          <article key={p.id} className={`pn ${open === i ? "open" : ""}`} onMouseEnter={() => setOpen(i)}>
            <button className="spine" aria-expanded={open === i} onClick={() => setOpen(i)} onFocus={() => setOpen(i)}>
              <span className="mono">{p.number}</span><span className="vt">{p.title}</span><span className="plus" aria-hidden>+</span>
            </button>
            <div className="body">
              <div className="txt">
                <p className="mono">{p.number} · {p.kicker}</p>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <ul>{p.features.map((x) => <li key={x}>{x}</li>)}</ul>
                <div className="chips">{p.tech.map((t) => <span key={t.name}><Logo slug={t.logo} />{t.name}</span>)}</div>
                {p.url && <a className="btn pri" href={p.url}>View on GitHub</a>}
              </div>
              <div className="miniwrap">
                <div className="mini">
                  <img src={p.image} alt={p.imageAlt} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ───────── Certifications ───────── */
export function Certifications() {
  return (
    <section id="certifications" className="sec wrap">
      <Tag n="04" label="Certifications" />
      <div className="certs">
        <div className="sticky reveal">
          <h2 className="h2">Always <span className="em">learning.</span></h2>
          <p className="mono">{CERTIFICATIONS.length} certifications</p>
        </div>
        <ol className="clist">
          {CERTIFICATIONS.map((c, i) => (
            <li key={c.id} tabIndex={0} className="reveal">
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="ct">{c.title}</span><span className="ci">{c.issuer}</span><span className="arr" aria-hidden>→</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────── Experience ───────── */
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const items = [
    ...EDUCATION.map((e) => ({ key: e.id, at: e.start, period: e.period, title: e.level, org: `${e.institution}${e.location ? `, ${e.location}` : ""}`, note: e.score, bullets: [] as string[] })),
    ...EXPERIENCE.map((e) => ({ key: e.id, at: +e.start.slice(0, 4) + (+e.start.slice(5) - 1) / 12, period: e.period, title: e.role, org: e.company, note: e.projectTitle, bullets: e.bullets })),
  ].sort((a, b) => a.at - b.at);
  useEffect(() => {
    const el = ref.current!;
    const f = () => {
      const r = el.getBoundingClientRect(); const y = Math.max(0, Math.min(r.height, innerHeight * 0.6 - r.top));
      el.style.setProperty("--h", `${y}px`);
      el.querySelectorAll<HTMLElement>(".stop").forEach((s) => s.classList.toggle("lit", s.offsetTop + 10 <= y));
    };
    f(); addEventListener("scroll", f, { passive: true }); addEventListener("resize", f);
    return () => { removeEventListener("scroll", f); removeEventListener("resize", f); };
  }, []);
  return (
    <section id="experience" className="sec wrap">
      <Tag n="05" label="Education & experience" />
      <h2 className="h2 reveal">One <span className="em">path.</span></h2>
      <div className="tl" ref={ref}>
        <div className="spine2" aria-hidden><i /></div>
        {items.map((it) => (
          <div className="stop" key={it.key}>
            <span className="dot" aria-hidden />
            <p className="mono">{it.period}</p>
            <h3>{it.title}</h3><p>{it.org}</p><p className="muted">{it.note}</p>
            {it.bullets.length > 0 && <ul>{it.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
          </div>
        ))}
        <div className="stop next"><span className="dot" aria-hidden /><h3>Next — Your team?</h3></div>
      </div>
    </section>
  );
}

/* ───────── Contact ───────── */
export function Contact() {
  const [copied, setC] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(PROFILE.email); setC(true); setTimeout(() => setC(false), 2000); } catch {} };
  return (
    <section id="contact" className="sec wrap">
      <Tag n="06" label="Contact" />
      <h2 className="h2 big" aria-label="Let's build something together.">
        {"Let's build something together.".split(" ").map((w, wi, arr) => (
          <Fragment key={wi}>
            <span className="word" aria-hidden>{w.split("").map((ch, i) => <span key={i} className="ltr">{ch}</span>)}</span>
            {wi < arr.length - 1 ? " " : ""}
          </Fragment>
        ))}
      </h2>
      <div className="mail">
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        <button className="btn" onClick={copy}>Copy</button><span aria-live="polite" className="mono">{copied ? "Copied ✓" : ""}</span>
      </div>
      <p className="links"><a href={PROFILE.phoneHref}>{PROFILE.phone}</a>
        {PROFILE.github && <> · <a href={PROFILE.github}>GitHub</a></>}
        {PROFILE.linkedin && <> · <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></>}</p>
      <svg className="badge" viewBox="0 0 120 120" aria-hidden>
        <defs><path id="c" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
        <text fontSize="11" letterSpacing="2"><textPath href="#c">say hello · say hello · say hello · </textPath></text>
      </svg>
    </section>
  );
}
