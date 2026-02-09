import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const SlabscanStats = () => {
  const stats: Stat[] = [
  { value: 500, suffix: "+", label: "Kreator Aktif" },
  { value: 1200, suffix: "+", label: "Kampanye Selesai" },
  { value: 15, suffix: "M+", label: "Total Dibayarkan" },
  { value: 98, suffix: "%", label: "Tingkat Kepuasan" }];


  return (
    <section className="py-24 bg-bg-primary">
      <div className="container-slabscan">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) =>
          <StatCounter key={index} stat={stat} index={index} />
          )}
        </div>
      </div>
    </section>);

};

interface StatCounterProps {
  stat: Stat;
  index: number;
}

const StatCounter = ({ stat, index }: StatCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCount();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);

  const animateCount = () => {
    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
  };

  return (
    <div
      ref={ref}
      className="text-center space-y-2 animate-fade-up"
      style={{ animationDelay: `${index * 0.1}s` }}>

      <div className="text-4xl md:text-5xl font-bold text-white">
        {count}
        {stat.suffix}
      </div>
      <div className="text-sm md:text-base text-text-muted font-medium">
        {stat.label}
      </div>
    </div>);

};

export default SlabscanStats;