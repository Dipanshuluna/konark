import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const animationRef = useRef<number>();

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
      const numPoints = Math.floor((canvas.width * canvas.height) / 15000);
      pointsRef.current = [];
      
      for (let i = 0; i < numPoints; i++) {
        pointsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const drawPoint = (point: Point) => {
      if (!ctx) return;
      
      // Outer glow
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 0,
        point.x, point.y, point.radius * 4
      );
      gradient.addColorStop(0, 'rgba(0, 240, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(0, 200, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(0, 180, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 240, 255, 1)';
      ctx.fill();
    };

    const drawLine = (p1: Point, p2: Point, distance: number, maxDistance: number) => {
      if (!ctx) return;
      
      const opacity = 1 - distance / maxDistance;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = `rgba(0, 200, 255, ${opacity * 0.3})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const points = pointsRef.current;
      const maxDistance = 150;

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
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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
        background: 'linear-gradient(135deg, rgb(5, 10, 20) 0%, rgb(10, 17, 31) 50%, rgb(5, 10, 20) 100%)',
      }}
    />
  );
};

export default ConstellationBackground;
