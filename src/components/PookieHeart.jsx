"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(InertiaPlugin);

export default function PookieHeart() {
  const containerRef = useRef(null);
  const dotsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const brightColors = [
  { bg: "rgb(239, 68, 68)", shadow: "239, 68, 68" },   // red
  { bg: "rgb(34, 197, 94)", shadow: "34, 197, 94" },   // green
  { bg: "rgb(59, 130, 246)", shadow: "59, 130, 246" }, // blue
  { bg: "rgb(245, 158, 11)", shadow: "245, 158, 11" }, // amber
  { bg: "rgb(236, 72, 153)", shadow: "236, 72, 153" }, // pink
  { bg: "rgb(20, 184, 166)", shadow: "20, 184, 166" }, // teal
  { bg: "rgb(251, 146, 60)", shadow: "251, 146, 60" }, // orange
  { bg: "rgb(6, 182, 212)", shadow: "6, 182, 212" },   // cyan
  { bg: "rgb(132, 204, 22)", shadow: "132, 204, 22" }, // lime
  { bg: "rgb(253, 224, 71)", shadow: "253, 224, 71" }, // yellow
  { bg: "rgb(244, 114, 182)", shadow: "244, 114, 182" }, // rose
  { bg: "rgb(167, 243, 208)", shadow: "167, 243, 208" }, // mint
  { bg: "rgb(253, 186, 116)", shadow: "253, 186, 116" }, // peach
  { bg: "rgb(190, 242, 100)", shadow: "190, 242, 100" }, // light lime
  { bg: "rgb(147, 197, 253)", shadow: "147, 197, 253" }, // baby blue
  { bg: "rgb(252, 165, 165)", shadow: "252, 165, 165" }, // soft red
  { bg: "rgb(216, 180, 254)", shadow: "216, 180, 254" }, // lavender
  { bg: "rgb(250, 204, 21)", shadow: "250, 204, 21" },   // gold yellow
  { bg: "rgb(253, 164, 175)", shadow: "253, 164, 175" }, // light rose
  { bg: "rgb(125, 211, 252)", shadow: "125, 211, 252" }, // bright sky
  { bg: "rgb(192, 132, 252)", shadow: "192, 132, 252" }, // lilac
  { bg: "rgb(134, 239, 172)", shadow: "134, 239, 172" }, // spring green
  { bg: "rgb(253, 230, 138)", shadow: "253, 230, 138" }, // pastel amber
  { bg: "rgb(253, 213, 217)", shadow: "253, 213, 217" }, // blush pink
  { bg: "rgb(201, 253, 223)", shadow: "201, 253, 223" }, // aqua mint
  { bg: "rgb(221, 214, 254)", shadow: "221, 214, 254" }, // pastel purple
  { bg: "rgb(252, 231, 243)", shadow: "252, 231, 243" }, // candy pink
  { bg: "rgb(254, 249, 195)", shadow: "254, 249, 195" }, // light lemon
  { bg: "rgb(205, 253, 255)", shadow: "205, 253, 255" }, // icy cyan
  { bg: "rgb(255, 214, 165)", shadow: "255, 214, 165" }, // peach cream
  { bg: "rgb(255, 182, 193)", shadow: "255, 182, 193" }, // pastel pink
  { bg: "rgb(173, 216, 230)", shadow: "173, 216, 230" }, // pastel blue
  { bg: "rgb(144, 238, 144)", shadow: "144, 238, 144" }, // pastel green
  { bg: "rgb(255, 255, 102)", shadow: "255, 255, 102" }, // neon yellow
  { bg: "rgb(255, 105, 180)", shadow: "255, 105, 180" }, // hot pink
  { bg: "rgb(0, 255, 127)", shadow: "0, 255, 127" },     // neon green
  { bg: "rgb(0, 191, 255)", shadow: "0, 191, 255" },     // deep sky blue
  { bg: "rgb(255, 140, 0)", shadow: "255, 140, 0" },     // neon orange
];


const isInsideHeart = (x, y, centerX, centerY, size) => {

  const normalizedX = (x - centerX) / size;
  const normalizedY = (y - centerY) / size;
  const heartX = normalizedX;
  const heartY = -normalizedY + 0.3; 

  // Standard heart equation: (x² + y² - 1)³ - x²y³ ≤ 0
  const equation =
    Math.pow(heartX * heartX + heartY * heartY - 1, 3) -
    heartX * heartX * Math.pow(heartY, 3);

  return equation <= 0;
};


  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const dots = [];

    const gridSize = 12;
    const dotSize = 4;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    const heartSize = Math.min(containerWidth, containerHeight) * 0.2;

    const cols = Math.floor(containerWidth / gridSize);
    const rows = Math.floor(containerHeight / gridSize);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * gridSize + gridSize / 2;
        const y = i * gridSize + gridSize / 2;

        if (isInsideHeart(x, y, centerX, centerY, heartSize)) {
          const dot = document.createElement("div");

          dot.className =
            "absolute rounded-full bg-primary transition-all duration-300 ease-out";
          dot.style.width = `${dotSize}px`;
          dot.style.height = `${dotSize}px`;
          dot.style.left = `${x}px`;
          dot.style.top = `${y}px`;
          dot.style.transform = "translate(-50%, -50%)";
          dot.style.boxShadow = "0 0 10px rgba(8, 145, 178, 0.5)";

          container.appendChild(dot);

          dots.push({
            x,
            y,
            element: dot,
            originalX: x,
            originalY: y,
          });
        }
      }
    }

    dotsRef.current = dots;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;

      dots.forEach((dot) => {
        const distance = Math.sqrt(
          Math.pow(mouseRef.current.x - dot.originalX, 2) +
            Math.pow(mouseRef.current.y - dot.originalY, 2)
        );

        const maxDistance = 100;
        const influence = Math.max(0, 1 - distance / maxDistance);

        if (influence > 0) {
          const angle = Math.atan2(
            mouseRef.current.y - dot.originalY,
            mouseRef.current.x - dot.originalX
          );

          const offsetX = Math.cos(angle) * influence * 20;
          const offsetY = Math.sin(angle) * influence * 20;

          gsap.to(dot.element, {
            x: offsetX,
            y: offsetY,
            scale: 1 + influence * 0.5,
            duration: 0.3,
            ease: "power2.out",
          });

          const glowIntensity = influence * 0.8;
          dot.element.style.boxShadow = `
            0 0 ${10 + glowIntensity * 20}px rgba(8, 145, 178, ${
            0.5 + glowIntensity * 0.5
          }),
            0 0 ${20 + glowIntensity * 40}px rgba(99, 102, 241, ${
            glowIntensity * 0.3
          })
          `;
        } else {
          gsap.to(dot.element, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
          });

          dot.element.style.boxShadow = "0 0 10px rgba(8, 145, 178, 0.5)";
        }
      });
    };

    const handleMouseLeave = () => {
      dots.forEach((dot) => {
        gsap.to(dot.element, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        });
        dot.element.style.boxShadow = "0 0 10px rgba(8, 145, 178, 0.5)";
      });
    };

    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const randomColor =
        brightColors[Math.floor(Math.random() * brightColors.length)];

      dots.forEach((dot) => {
        const distance = Math.sqrt(
          Math.pow(clickX - dot.originalX, 2) +
            Math.pow(clickY - dot.originalY, 2)
        );
        const delay = distance * 0.002;

        gsap.to(dot.element, {
          scale: 1.8,
          duration: 0.2,
          delay,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
          onStart: () => {
            dot.element.style.backgroundColor = randomColor.bg;
          },
        });

        gsap.to(dot.element, {
          duration: 0.4,
          delay,
          onStart: () => {
            dot.element.style.boxShadow = `
              0 0 ${10 + distance * 0.2}px rgba(${randomColor.shadow}, 0.9),
              0 0 ${20 + distance * 0.4}px rgba(${randomColor.shadow}, 0.6)
            `;
          },
          onComplete: () => {
            dot.element.style.boxShadow = `0 0 10px rgba(${randomColor.shadow}, 0.5)`;
          },
        });
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("click", handleClick);

      dots.forEach((dot) => {
        if (dot.element.parentNode) {
          dot.element.parentNode.removeChild(dot.element);
        }
      });
    };
  }, []);

  return (
  <div
    ref={containerRef}
    className="flex w-full h-screen overflow-hidden cursor-crosshair justify-center"
  >
    <div className="text-center z-10 pointer-events-none">
      <h1 className="text-4xl font-bold my-8 text-white">
        Pookie Hearts
      </h1>
      <p className="text-lg text-white/80">
        Move your mouse to interact • Click for colorful ripple effects
      </p>
    </div>
  </div>
);
}
