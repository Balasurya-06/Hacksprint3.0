"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* ═══════════════════════════════════════════════════════════════
   Pauses every looping CSS animation while its element is off-screen.

   Measured on a Redmi/Poco-class phone profile: a couple of off-screen
   loops (the venue marquee, the past-events live dot) kept Chrome's main
   thread busy ~50% of the time even while the visitor was only looking at
   the hero. Nobody can see an off-screen animation, so pausing it changes
   nothing visually and gives that time back to scrolling and taps.
   ═══════════════════════════════════════════════════════════════ */
export default function PauseOffscreenAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || !document.getAnimations) return;

    const byTarget = new Map<Element, Animation[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          for (const a of byTarget.get(entry.target) ?? []) {
            if (entry.isIntersecting) {
              if (a.playState === "paused") a.play();
            } else if (a.playState === "running") a.pause();
          }
        }
      },
      { rootMargin: "200px 0px" },
    );

    /* Wait a beat so the page's CSS animations exist before we collect them. */
    const timer = window.setTimeout(() => {
      for (const a of document.getAnimations()) {
        const effect = a.effect as KeyframeEffect | null;
        const target = effect?.target;
        if (!target || effect.getComputedTiming().iterations !== Infinity) continue;
        /* Fixed elements (chat button) are always on screen; skip them. */
        if (getComputedStyle(target).position === "fixed") continue;
        const list = byTarget.get(target);
        if (list) list.push(a);
        else {
          byTarget.set(target, [a]);
          io.observe(target);
        }
      }
    }, 600);

    return () => {
      window.clearTimeout(timer);
      io.disconnect();
      byTarget.forEach((list) => list.forEach((a) => a.playState === "paused" && a.play()));
    };
  }, [pathname]);

  return null;
}
