import { useMemo } from 'react';
import './TechLogoMarquee.css';

const SPEED_MAP = {
  slow: 36,
  medium: 24,
  fast: 16
};

export default function TechLogoMarquee({ items = [], direction = 'left', speed = 'medium' }) {
  const validItems = useMemo(() => items.filter((item) => item?.src), [items]);

  if (!validItems.length) {
    return null;
  }

  const animationDuration = SPEED_MAP[speed] ?? SPEED_MAP.medium;
  const marqueeItems = [...validItems, ...validItems];

  return (
    <div className="tech-marquee" aria-hidden>
      <div
        className="tech-marquee__track"
        style={{ animationDuration: `${animationDuration}s`, animationDirection: direction === 'right' ? 'reverse' : 'normal' }}
      >
        {marqueeItems.map((item, idx) => (
          <div className="tech-marquee__item" key={`${item.alt}-${idx}`}>
            <img src={item.src} alt={item.alt ?? item.name} loading="lazy" />
            <span className="tech-marquee__label">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

