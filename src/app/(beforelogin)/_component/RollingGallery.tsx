'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimation, useTransform } from 'motion/react';
import './RollingGallery.css';

const IMGS = [
  'https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1495103033382-fe343886b671?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1506781961370-37a89d6b3095?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1599576838688-8a6c11263108?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1494094892896-7f14a4433b7a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://plus.unsplash.com/premium_photo-1664910706524-e783eed89e71?q=80&w=3869&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1503788311183-fa3bf9c4bc32?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1585970480901-90d6bb2a48b5?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3'
];

type Props = {
  autoplay?: boolean;
  pauseOnHover?: boolean;
  images?: string[];
};

/**
 * Concave(오목) 3D 롤링 갤러리
 * - 원통 안쪽에 카드가 붙어 있고, 카메라가 내부에서 보는 느낌
 */
export default function RollingGallery({ autoplay = false, pauseOnHover = false, images = IMGS }: Props) {
  // SSR 안전 초기값
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth <= 640 : false)
  );

  // 레이아웃 파라미터
  const cylinderWidth = isScreenSizeSm ? 1100 : 1800;
  const faceCount = images.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const radius = cylinderWidth / (2 * Math.PI);

  // 드래그/오토 재생 방향 보정 (오목 내부이므로 방향 반전)
  const SIGN = -1;
  const dragFactor = 0.05;

  // 모션 값
  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef<number | null>(null);

  const transform = useTransform(rotation, (deg) => `rotate3d(0, 1, 0, ${deg}deg)`);

  const handleDrag = (_: any, info: { offset: { x: number } }) => {
    rotation.set(rotation.get() + SIGN * info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: { velocity: { x: number } }) => {
    controls.start({
      rotateY: rotation.get() + SIGN * info.velocity.x * dragFactor,
      transition: { type: 'spring', stiffness: 60, damping: 20, mass: 0.1, ease: 'easeOut' }
    });
  };

  // 오토플레이
  useEffect(() => {
    if (!autoplay) return;
    const step = 360 / faceCount;

    const tick = () => {
      controls.start({ rotateY: rotation.get() + SIGN * step, transition: { duration: 2, ease: 'linear' } });
      rotation.set(rotation.get() + SIGN * step);
    };

    autoplayRef.current = window.setInterval(tick, 2000);
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [autoplay, controls, faceCount, rotation]);

  // 리사이즈
  useEffect(() => {
    const onResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // hover 시 일시정지/재개
  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover && autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
      controls.stop();
    }
  };
  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover && !autoplayRef.current) {
      const step = 360 / faceCount;
      const tick = () => {
        controls.start({ rotateY: rotation.get() + SIGN * step, transition: { duration: 2, ease: 'linear' } });
        rotation.set(rotation.get() + SIGN * step);
      };
      autoplayRef.current = window.setInterval(tick, 2000);
    }
  };

  // 각 슬라이드 회전 간격
  const step = 360 / faceCount;

  return (
    <div className="gallery-container">
      <div className="gallery-gradient gallery-gradient-left" />
      <div className="gallery-gradient gallery-gradient-right" />

      <div className="gallery-content">
        <motion.div
          drag="x"
          className="gallery-track"
          style={{ rotateY: rotation as any, width: cylinderWidth, transformStyle: 'preserve-3d' }}          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="gallery-item"
              style={{
                width: `${faceWidth}px`,
                // ★ concave 핵심: Z를 음수로, 카드 자체는 180° 뒤집는다
                transform: `rotateY(${i * step}deg) translateZ(${-radius}px) rotateY(180deg)`
              }}
            >
              {/* 카드가 180도라 이미지에 다시 180도 적용해 정방향 보이게 */}
              <img src={url} alt="" className="gallery-img" />
              <div className="rec">REC</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}