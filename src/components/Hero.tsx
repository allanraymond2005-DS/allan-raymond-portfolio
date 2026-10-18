"use client";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { goTo } from "@/lib/scroll";

export default function Hero() {
  const vid = useRef<HTMLVideoElement>(null);
  const blockedRef = useRef(false);
  const [muted, setM] = useState(true);
  const [ended, setE] = useState(false);
  const [blocked, setB] = useState(false);

  useEffect(() => {
    const v = vid.current!;
    v.play().catch(() => { blockedRef.current = true; setB(true); });
    const io = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio < 0.35) v.pause();
      else if (!v.ended && v.currentTime > 0 && !blockedRef.current) v.play().catch(() => {});
    }, { threshold: [0, 0.35, 1] });
    io.observe(v.closest("section")!);
    return () => io.disconnect();
  }, []);

  const toggleSound = () => { const v = vid.current!; v.muted = !v.muted; setM(v.muted); };
  const replay = () => { const v = vid.current!; v.currentTime = 0; setE(false); v.play().catch(() => {}); };
  const start = () => { vid.current!.play().then(() => { blockedRef.current = false; setB(false); }).catch(() => {}); };

  return (
    <section id="top" className="hero" aria-label="Introduction">
      <div className="ghost" aria-hidden>{PROFILE.firstName}</div>
      <div className="vidwrap">
        <video ref={vid} muted playsInline preload="auto" poster="/hero/poster.png" aria-label={`${PROFILE.name} introducing himself (video)`}
          onEnded={() => setE(true)} onPlaying={() => { blockedRef.current = false; setB(false); }}>
          <source src="/hero/hero.webm" type="video/webm" />
          <source src="/hero/hero.mp4" type="video/mp4" />
        </video>
        <div className="vctl">
          <button onClick={toggleSound} aria-pressed={!muted} aria-label={muted ? "Turn sound on" : "Turn sound off"}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M11 5 6 9H3v6h3l5 4z" />{muted ? <path d="m16 9 5 6m0-6-5 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />}
            </svg>
          </button>
          {ended && <button onClick={replay} aria-label="Replay introduction">↺</button>}
          {blocked && !ended && <button className="ping" onClick={start} aria-label="Play introduction">▶</button>}
        </div>
      </div>
      <div className="hero-text">
        <h1>Data Scientist</h1>
        <div className="btns">
          <button className="btn pri" onClick={() => goTo("work")}>Explore work</button>
          <button className="btn" onClick={() => goTo("contact")}>Let&apos;s talk</button>
          <a className="btn" href={PROFILE.resumePath} download>Résumé ↓</a>
        </div>
      </div>
    </section>
  );
}
