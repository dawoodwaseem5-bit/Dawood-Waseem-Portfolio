"use client";
import React, { useRef, useEffect } from "react";
import "./Squares.css";

const Squares = ({
  direction = "diagonal",
  speed = 0.5,
  borderColor = "rgb(92, 36, 188)", // ✅ default your color
  squareSize = 50,
  className = "",
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // ✅ Proper resize function with devicePixelRatio consideration
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      const computedStyle = getComputedStyle(parent);

      // Calculate actual dimensions considering padding
      const width =
        parent.clientWidth -
        parseFloat(computedStyle.paddingLeft) -
        parseFloat(computedStyle.paddingRight);

      const height =
        parent.clientHeight -
        parseFloat(computedStyle.paddingTop) -
        parseFloat(computedStyle.paddingBottom);

      // Set canvas size with DPR consideration
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform before scaling
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let offsetX = 0;
    let offsetY = 0;

    const draw = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      // ✅ Set stroke color only
      ctx.strokeStyle = borderColor;

      const cols = Math.ceil(width / squareSize) + 2;
      const rows = Math.ceil(height / squareSize) + 2;

      for (let i = -1; i < cols; i++) {
        for (let j = -1; j < rows; j++) {
          const x = i * squareSize + offsetX;
          const y = j * squareSize + offsetY;

          // Only border (no fill)
          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }

      // Move squares
      switch (direction) {
        case "up":
          offsetY -= speed;
          break;
        case "down":
          offsetY += speed;
          break;
        case "left":
          offsetX -= speed;
          break;
        case "right":
          offsetX += speed;
          break;
        case "diagonal":
        default:
          offsetX += speed;
          offsetY += speed;
          break;
      }

      // Reset offset when full square passed
      if (Math.abs(offsetX) >= squareSize) offsetX = 0;
      if (Math.abs(offsetY) >= squareSize) offsetY = 0;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [direction, speed, borderColor, squareSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`squares-canvas absolute top-0 left-0 w-full h-full ${className}`}
    />
  );
};

export default Squares;
