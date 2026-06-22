/**
 * Scrub-driven kinetic controller for the hero left column.
 *
 * Every beat's lines/marks are positioned DIRECTLY from scroll progress — no
 * triggered tweens, no overflow masks — so the copy physically tracks the wheel:
 * stop scrolling and it stops halfway. Each beat enters from below (opacity 0,
 * y+) with a per-line stagger, holds in a readable plateau, then exits upward
 * (opacity 0, y-). Beats rest on slightly different baselines so the layout's
 * gravity shifts between phases. The beat-2 accent word ("Gold.") additionally
 * scales and lets its gold gradient track across the letters as you scroll,
 * mirroring the oil splash.
 *
 * No masks ⇒ nothing is ever clipped, so no sliced-header artifacts.
 */

export type HeroKinetic = {
  setProgress: (p: number) => void;
  destroy: () => void;
};

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Win = {
  inStart: number; // enter window start (negative ⇒ settled at rest)
  inEnd: number;
  outStart: number; // exit window start (>1 ⇒ never self-exits)
  outEnd: number;
  baseY: number; // resting baseline offset (px) — structural asymmetry
};

// Enter/exit windows across hero-stage scroll progress. Beat 0 is settled at rest
// and exits early; beat 2 never self-exits — the #hero-content fade carries it out.
const WINDOWS: Win[] = [
  // Two beats over the stage. Near-sequential handoff: beat 0 all but clears before
  // beat 1 arrives (only a sliver of overlap), so the transition reads as a clean
  // vertical handoff — never a muddy 50/50 double-exposure. Beat 1 doesn't self-exit
  // (the #hero-content fade carries it out as the film's oil-burst plays).
  { inStart: -1, inEnd: 0, outStart: 0.24, outEnd: 0.34, baseY: 0 },
  { inStart: 0.32, inEnd: 0.44, outStart: 2, outEnd: 2, baseY: 18 },
];
const FALLBACK: Win = { inStart: -1, inEnd: 0, outStart: 2, outEnd: 2, baseY: 0 };

const Y = 56; // beat enter/exit travel (px)
const LINE_LAG = 0.45; // per-line stagger as a fraction of the enter window
const PARALLAX = 6; // extra travel per line index (px) — a touch of depth
const SPLASH_PEAK = 0.62; // reserved for an accent word, if one is reintroduced

type BeatCfg = {
  beat: HTMLElement;
  els: HTMLElement[]; // lines + marks, in DOM order, for the stagger
  accent: HTMLElement | null;
  win: Win;
};

export function createHeroKinetic(beatEls: HTMLElement[]): HeroKinetic {
  const container = (beatEls[0]?.parentElement as HTMLElement | undefined) ?? undefined;

  const beats: BeatCfg[] = beatEls.map((beat, i) => ({
    beat,
    els: Array.from(beat.querySelectorAll<HTMLElement>('[data-hero-line], [data-hero-mark]')),
    accent: beat.querySelector<HTMLElement>('[data-hero-accent]'),
    win: WINDOWS[i] ?? FALLBACK,
  }));

  // Motion is on: reveal the beat containers (SSR hides 1..n via inline opacity:0);
  // the per-element opacity computed below now governs visibility.
  for (const b of beats) {
    b.beat.style.opacity = '1';
    for (const el of b.els) el.style.willChange = 'opacity, transform';
    if (b.accent) b.accent.style.willChange = 'transform, background-position';
  }

  // Reserve the resting beat's (beat 0) height so the actions sit snug beneath it;
  // taller beats overflow into the space the CTA vacates rather than leaving a gap.
  const remeasure = () => {
    if (!container) return;
    container.style.removeProperty('min-height');
    if (container.offsetWidth > 100 && beatEls[0]) {
      container.style.minHeight = `${beatEls[0].offsetHeight}px`;
    }
  };

  let lastP = 0;
  const setProgress = (p: number) => {
    lastP = p;
    for (const { els, accent, win } of beats) {
      const enterRaw = win.inStart < 0 ? 1 : (p - win.inStart) / (win.inEnd - win.inStart);
      const exitT = win.outStart > 1 ? 0 : smooth((p - win.outStart) / (win.outEnd - win.outStart));
      const exitOpacity = 1 - exitT;
      const exitY = -Y * exitT;
      const n = els.length || 1;
      const slice = 1 / (1 + (n - 1) * LINE_LAG); // each element's enter sub-duration
      els.forEach((el, j) => {
        const enterT = smooth((enterRaw - j * LINE_LAG * slice) / slice);
        el.style.opacity = String(enterT * exitOpacity);
        const y = (1 - enterT) * (Y + j * PARALLAX) + exitY + win.baseY;
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      });
      if (accent) {
        // Gold: scale up + sweep the gradient across the letters as you scroll
        // through the beat, mirroring the splashing oil. Both endpoints of the
        // gradient are AA-large on paper, so every frame stays legible.
        const t = clamp01((p - win.inStart) / (SPLASH_PEAK - win.inStart));
        accent.style.transform = `scale(${lerp(0.95, 1.08, t).toFixed(3)})`;
        accent.style.backgroundPositionX = `${lerp(0, 100, t).toFixed(1)}%`;
      }
    }
  };

  remeasure();
  setProgress(0);

  const onResize = () => {
    remeasure();
    setProgress(lastP);
  };
  window.addEventListener('resize', onResize);

  const destroy = () => {
    window.removeEventListener('resize', onResize);
    if (container) container.style.removeProperty('min-height');
    for (const b of beats) {
      b.beat.style.removeProperty('opacity');
      for (const el of b.els) {
        el.style.removeProperty('opacity');
        el.style.removeProperty('transform');
        el.style.removeProperty('will-change');
      }
      if (b.accent) {
        b.accent.style.removeProperty('transform');
        b.accent.style.removeProperty('background-position-x');
        b.accent.style.removeProperty('will-change');
      }
    }
  };

  return { setProgress, destroy };
}
