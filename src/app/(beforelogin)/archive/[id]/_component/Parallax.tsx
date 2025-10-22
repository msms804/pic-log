"use client";

import "./parallax.css";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function ParallaxImage({ idx }: { idx: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="img-container">
      <div ref={ref}>
        <img src={`/${idx}.jpeg`} alt={`image ${idx}`} />
      </div>
      <motion.h2 initial={{ visibility: "hidden" }} animate={{ visibility: "visible" }} style={{ y }}>
        #{idx}
      </motion.h2>
    </section>
  );
}

export default function ParallaxGallery() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress);

  return (
    <div id="parallax-example">
      {[...Array(12)].map((_, i) => (
        <ParallaxImage key={i} idx={i + 1} />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
    </div>
  );
}