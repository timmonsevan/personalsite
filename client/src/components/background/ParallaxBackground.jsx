import { useEffect, useRef } from "react";
import "./ParallaxBackground.css";

function ParallaxBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function handleScroll() {
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <div id="parallax-bg" ref={bgRef} />;
}

export default ParallaxBackground;
