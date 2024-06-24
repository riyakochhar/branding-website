import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import styles from "./css/style.module.css";
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";

const Trial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const headingsRef = useRef([]); // Array to store SplitText instances
  const [show, setShow] = useState(false);

  const sections = document.querySelectorAll("section");
  const images = document.querySelectorAll(".bg");
  const outerWrappers = gsap.utils.toArray(".outer");
  const innerWrappers = gsap.utils.toArray(".inner");

  headingsRef.current = gsap.utils.toArray(".section-heading").map(
    (heading) =>
      new SplitText(heading, {
        type: "chars,words,lines",
        linesClass: "clip-text",
      })
  );

  const wrap = gsap.utils.wrap(0, sections.length);

  useEffect(() => {
    const observer = Observer.create({
      trigger: containerRef.current,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,
      onDown: () => !animating && gotoSection(0, -1),
      onUp: () => !animating && gotoSection(1, 1),
    });

    return () => observer.kill(); // Cleanup observer on unmount
  }, []);

  const gotoSection = (index, direction) => {
    if (index === 1) {
      gsap.to(section2Ref.current, {
        y: "0%",
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(section1Ref.current, {
            y: "-100%",
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {},
          });
        },
      });
    } else {
      gsap.to(section1Ref.current, {
        y: "0%",
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(section2Ref.current, {
            y: "100%",
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {},
          });
        },
      });
    }

    setCurrentIndex(index);
  };

  return (
    <section ref={containerRef} className={styles.contents}>
      {currentIndex === 0 ? (
        <section ref={section1Ref}>
          <Screen1 show={show} setShow={setShow} />
        </section>
      ) : (
        <section ref={section2Ref}>
          <Screen2 show={show} setShow={setShow} />
        </section>
      )}
    </section>
  );
};

export default Trial;
