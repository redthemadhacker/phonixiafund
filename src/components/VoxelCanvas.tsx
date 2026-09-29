import React, { useEffect, useRef } from 'react';

interface VoxelCanvasProps {
  lowStimulation: boolean;
  slideIndex: number;
}

interface VoxelParticle {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
}

export const VoxelCanvas: React.FC<VoxelCanvasProps> = ({ lowStimulation, slideIndex }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = lowStimulation
      ? ['#64748b', '#94a3b8', '#cbd5e1', '#e2e8f0']
      : [
          '#f59e0b', // Amber/gold (voxel gold)
          '#06b6d4', // Cyan (sound rune)
          '#8b5cf6', // Violet (aether crystal)
          '#10b981', // Emerald (builders grass)
          '#3b82f6', // Azure
        ];

    const particleCount = lowStimulation ? 24 : 75;
    const particles: VoxelParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 200 + 50,
        size: Math.random() * (lowStimulation ? 8 : 14) + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: (Math.random() * 0.4 + 0.15) * (lowStimulation ? 0.3 : 1),
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() * 0.01 - 0.005) * (lowStimulation ? 0.2 : 1),
        opacity: Math.random() * (lowStimulation ? 0.15 : 0.4) + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient background gradient
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );

      if (lowStimulation) {
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(1, '#020617');
      } else {
        // Subtle shift depending on slide
        const slideHues = [
          'rgba(245, 158, 11, 0.05)', // slide 1: gold
          'rgba(6, 182, 212, 0.05)',  // slide 2: cyan
          'rgba(16, 185, 129, 0.05)', // slide 3: emerald
          'rgba(139, 92, 246, 0.05)', // slide 4: violet
          'rgba(59, 130, 246, 0.05)', // slide 5: azure
          'rgba(245, 158, 11, 0.05)', // slide 6: gold
          'rgba(16, 185, 129, 0.05)', // slide 7: emerald
          'rgba(236, 72, 153, 0.05)', // slide 8: rose/gold
        ];
        grad.addColorStop(0, slideHues[slideIndex % slideHues.length] || 'rgba(15, 23, 42, 0.8)');
        grad.addColorStop(1, '#05070c');
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw isometric voxel cube particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.rotation += p.rotSpeed;

        if (p.y < -50) {
          p.y = height + 50;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        // Draw isometric mini voxel cube
        const s = p.size;
        ctx.fillStyle = p.color;

        // Top face
        ctx.beginPath();
        ctx.moveTo(0, -s * 0.5);
        ctx.lineTo(s * 0.7, -s * 0.15);
        ctx.lineTo(0, s * 0.2);
        ctx.lineTo(-s * 0.7, -s * 0.15);
        ctx.closePath();
        ctx.fill();

        // Left face (darker)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.beginPath();
        ctx.moveTo(-s * 0.7, -s * 0.15);
        ctx.lineTo(0, s * 0.2);
        ctx.lineTo(0, s * 0.75);
        ctx.lineTo(-s * 0.7, s * 0.4);
        ctx.closePath();
        ctx.fill();

        // Right face (medium)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
        ctx.beginPath();
        ctx.moveTo(0, s * 0.2);
        ctx.lineTo(s * 0.7, -s * 0.15);
        ctx.lineTo(s * 0.7, s * 0.4);
        ctx.lineTo(0, s * 0.75);
        ctx.closePath();
        ctx.fill();

        // Subtle wireframe highlight
        if (!lowStimulation) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [lowStimulation, slideIndex]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
    />
  );
};
