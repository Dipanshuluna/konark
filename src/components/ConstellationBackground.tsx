import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  brightness: number;
}

const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    const initPoints = () => {
      const numPoints = Math.floor((canvas.width * canvas.height) / 12000);
      pointsRef.current = [];
      
      for (let i = 0; i < numPoints; i++) {
        pointsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.8 + 0.5,
          brightness: Math.random() * 0.5 + 0.5,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const drawPoint = (point: Point) => {
      if (!ctx) return;
      
      // Calculate distance from mouse for interaction
      const dx = mouseRef.current.x - point.x;
      const dy = mouseRef.current.y - point.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 200;
      const interactionFactor = dist < maxDist ? 1 - dist / maxDist : 0;
      
      // Enhanced glow when near mouse
      const glowRadius = point.radius * (4 + interactionFactor * 3);
      const alpha = point.brightness * (0.6 + interactionFactor * 0.4);
      
      // Outer glow
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, glowRadius
      );
      gradient.addColorStop(0, `rgba(0, 212, 255, ${alpha})`);
      gradient.addColorStop(0.4, `rgba(0, 180, 255, ${alpha * 0.4})`);
      gradient.addColorStop(1, 'rgba(0, 150, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius * (1 + interactionFactor * 0.5), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 230, 255, ${point.brightness})`;
      ctx.fill();
    };

    const drawLine = (p1: Point, p2: Point, distance: number, maxDistance: number) => {
      if (!ctx) return;
      
      const opacity = (1 - distance / maxDistance) * 0.4;
      
      // Check if line is near mouse
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      const dx = mouseRef.current.x - midX;
      const dy = mouseRef.current.y - midY;
      const mouseDist = Math.sqrt(dx * dx + dy * dy);
      const mouseInteraction = mouseDist < 150 ? (1 - mouseDist / 150) * 0.3 : 0;
      
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = `rgba(0, 200, 255, ${opacity + mouseInteraction})`;
      ctx.lineWidth = 0.6 + mouseInteraction;
      ctx.stroke();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;
      const maxDistance = 140;

      // Update positions
      points.forEach((point) => {
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        // Keep within bounds
        point.x = Math.max(0, Math.min(canvas.width, point.x));
        point.y = Math.max(0, Math.min(canvas.height, point.y));

        // Subtle attraction to mouse
        const dx = mouseRef.current.x - point.x;
        const dy = mouseRef.current.y - point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300 && dist > 50) {
          point.vx += (dx / dist) * 0.01;
          point.vy += (dy / dist) * 0.01;
        }

        // Speed limit
        const speed = Math.sqrt(point.vx * point.vx + point.vy * point.vy);
        if (speed > 0.8) {
          point.vx = (point.vx / speed) * 0.8;
          point.vy = (point.vy / speed) * 0.8;
        }
      });

      // Draw connections
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            drawLine(points[i], points[j], distance, maxDistance);
          }
        }
      }

      // Draw points
      points.forEach(drawPoint);

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: 'radial-gradient(ellipse at center, hsl(222 47% 10%) 0%, hsl(222 47% 5%) 60%, hsl(222 47% 3%) 100%)',
      }}
    />
  );
};

export default ConstellationBackground;
