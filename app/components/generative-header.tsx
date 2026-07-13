"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const SEED_KEY = "boro-art-seed";
const FRAMES = 420;
const PARTICLES = 260;

function hash2(x: number, y: number, seed: number) {
  let h = (seed ^ Math.imul(x, 374761393) ^ Math.imul(y, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

// Value noise interpolated over an integer lattice, deterministic per seed.
function noise(x: number, y: number, seed: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const tx = smooth(x - xi);
  const ty = smooth(y - yi);
  const a = hash2(xi, yi, seed);
  const b = hash2(xi + 1, yi, seed);
  const c = hash2(xi, yi + 1, seed);
  const d = hash2(xi + 1, yi + 1, seed);
  return a + (b - a) * tx + (c - a) * ty + (a - b - c + d) * tx * ty;
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function GenerativeHeader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const { resolvedTheme } = useTheme();
  const [seed, setSeed] = useState<number | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(SEED_KEY);
    if (stored && Number.isFinite(Number(stored))) {
      setSeed(Number(stored));
    } else {
      const fresh = Math.floor(Math.random() * 0xffffffff);
      window.localStorage.setItem(SEED_KEY, String(fresh));
      setSeed(fresh);
    }
  }, []);

  useEffect(() => {
    if (seed === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const dark = resolvedTheme === "dark";
    ctx.strokeStyle = dark ? "rgba(163,163,163,0.07)" : "rgba(82,82,82,0.06)";
    ctx.lineWidth = 0.8;

    const rand = mulberry32(seed);
    const scale = 0.012 + rand() * 0.006;
    const swirl = 2 + Math.floor(rand() * 3);
    const particles = Array.from({ length: PARTICLES }, () => ({
      x: rand() * width,
      y: rand() * height,
    }));

    function step() {
      if (!ctx) return;
      ctx.beginPath();
      for (const p of particles) {
        const angle = noise(p.x * scale, p.y * scale, seed as number) * Math.PI * swirl;
        const nx = p.x + Math.cos(angle) * 1.1;
        const ny = p.y + Math.sin(angle) * 1.1;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        p.x = nx;
        p.y = ny;
        if (p.x < -4 || p.x > width + 4 || p.y < -4 || p.y > height + 4) {
          p.x = rand() * width;
          p.y = rand() * height;
        }
      }
      ctx.stroke();
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      for (let i = 0; i < FRAMES; i++) step();
      return;
    }

    let frame = 0;
    function tick() {
      step();
      frame += 1;
      if (frame < FRAMES) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [seed, resolvedTheme]);

  function reweave() {
    const fresh = Math.floor(Math.random() * 0xffffffff);
    window.localStorage.setItem(SEED_KEY, String(fresh));
    setSeed(fresh);
  }

  return (
    <div className="relative group">
      <canvas
        ref={canvasRef}
        onClick={reweave}
        title="Woven from a seed unique to you — click to reweave"
        className="w-full h-[110px] cursor-pointer"
        aria-hidden="true"
      />
      <span className="pointer-events-none absolute bottom-1 right-1 font-mono text-[10px] text-neutral-300 dark:text-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity">
        {seed !== null && `seed 0x${seed.toString(16)} · yours alone · click to reweave`}
      </span>
    </div>
  );
}
