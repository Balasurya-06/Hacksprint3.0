"use client";
import { useEffect, useRef, useState } from "react";

/* Small pieces used by the landing hero. Motion falls back to the
   plain final state under prefers-reduced-motion. */

/* Counts a stat like "500+" up from zero once it scrolls into view. */
export function CountUp({ value, delay = 700 }: { value: string; delay?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const isNum = match !== null;
  const [n, setN] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !isNum || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      setN(0);
      const start = performance.now() + delay;
      const dur = 1600;
      const tick = (t: number) => {
        const p = Math.min(1, Math.max(0, (t - start) / dur));
        setN(Math.round(target * (1 - Math.pow(2, -10 * p))));
        if (p < 1) raf = requestAnimationFrame(tick);
        else setN(target);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, delay, isNum]);

  return (
    <span ref={ref}>
      {isNum ? n : ""}
      {suffix}
    </span>
  );
}
