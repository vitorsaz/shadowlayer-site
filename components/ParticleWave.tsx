"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseY: number;
  speed: number;
  amplitude: number;
  phase: number;
  size: number;
  opacity: number;
}

export default function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    let isMouseOver = false;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const w = window.innerWidth;
      const h = window.innerHeight;
      const cols = Math.floor(w / 28);
      const rows = Math.floor(h / 28);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push({
            x: (i / cols) * w + (w / cols) * 0.5,
            y: (j / rows) * h + (h / rows) * 0.5,
            baseY: (j / rows) * h + (h / rows) * 0.5,
            speed: 0.3 + Math.random() * 0.5,
            amplitude: 8 + Math.random() * 16,
            phase: (i * 0.15) + (j * 0.08),
            size: 1 + Math.random() * 0.5,
            opacity: 0.08 + Math.random() * 0.18,
          });
        }
      }
    };

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      time += 0.008;

      for (const p of particles) {
        const wave1 = Math.sin(time * p.speed + p.phase) * p.amplitude;
        const wave2 = Math.cos(time * 0.5 + p.phase * 0.7) * (p.amplitude * 0.4);
        p.y = p.baseY + wave1 + wave2;

        let opacity = p.opacity;

        if (isMouseOver) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;
          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            opacity = Math.min(0.8, opacity + factor * 0.5);
            p.y += Math.sin(dist * 0.02 + time * 2) * factor * 12;
          }
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 165, 85, ${opacity})`;
        ctx.fill();
      }

      // Draw subtle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 45) {
            const lineOpacity = (1 - dist / 45) * 0.06;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(200, 165, 85, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseOver = true;
    };

    const handleMouseLeave = () => {
      isMouseOver = false;
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "auto" }}
    />
  );
}
