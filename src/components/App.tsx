"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { PROFILE } from "@/lib/data";
import { setLenis } from "@/lib/scroll";
import Nav from "./Navigation";
import Hero from "./Hero";
import { About, Skills, Work, Certifications, Experience, Contact } from "./Sections";

export default function App() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0; let l: Lenis | null = null;
    if (!reduce) {
      l = new Lenis({ lerp: 0.1 }); setLenis(l);
      const loop = (t: number) => { l!.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.12 });
    document.querySelectorAll(".reveal,.wave").forEach((n) => io.observe(n));
    return () => { cancelAnimationFrame(raf); l?.destroy(); setLenis(null); io.disconnect(); };
  }, []);
  return (
    <>
      <Nav />
      <main>
        <Hero /><About /><Skills /><Work /><Certifications /><Experience /><Contact />
      </main>
      <footer className="foot wrap">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <a href="#top" onClick={(e) => { e.preventDefault(); import("@/lib/scroll").then((m) => m.goTo("top")); }}>Back to top ↑</a>
        <span>Built with Next.js</span>
      </footer>
    </>
  );
}
