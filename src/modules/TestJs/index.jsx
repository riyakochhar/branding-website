import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import styles from "./style.module.css";

gsap.registerPlugin(Observer);

const TestJs = () => {
  const sectionsData = [
    {
      className: "first",
      heading: "First Section",
      bgUrl:
        "https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDk4Mg&ixlib=rb-1.2.1&q=75&w=1920",
    },
    {
      className: "second",
      heading: "Second Section",
      bgUrl:
        "https://images.unsplash.com/photo-1617128734662-66da6c1d3505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzc3NTM3MA&ixlib=rb-1.2.1&q=75&w=1920",
    },
    {
      className: "third",
      heading: "Third Section",
      bgUrl:
        "https://images.unsplash.com/photo-1617438817509-70e91ad264a5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDk4Mg&ixlib=rb-1.2.1&q=75&w=1920",
    },
    {
      className: "fourth",
      heading: "Fourth Section",
      bgUrl:
        "https://images.unsplash.com/photo-1617412327653-c29093585207?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxNzU2MDgzMQ&ixlib=rb-1.2.1&q=75&w=1920",
    },
    {
      className: "fifth",
      heading: "Fifth Section",
      bgUrl:
        "https://images.unsplash.com/photo-1617141636403-f511e2d5dc17?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYxODAzMjc4Mw&ixlib=rb-1.2.1&q=75&w=1920",
    },
  ];

  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className={styles.char}>
        {char}
      </span>
    ));
  };

  const sectionsRef = useRef([]);
  const imagesRef = useRef([]);
  const headingsRef = useRef([]);
  const outerWrappersRef = useRef([]);
  const innerWrappersRef = useRef([]);
  const currentIndexRef = useRef(-1);

  useEffect(() => {
    const sections = sectionsRef.current;
    const images = imagesRef.current;
    const headings = headingsRef.current;
    const outerWrappers = outerWrappersRef.current;
    const innerWrappers = innerWrappersRef.current;
    const wrap = gsap.utils.wrap(0, sections.length);
    let animating = false;

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });
    gsap.set(sections[0], { autoAlpha: 1 }); // Set the first section's autoAlpha to 1

    const gotoSection = (index, direction) => {
      if (animating) return;
      index = wrap(index);
      animating = true;
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;
      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          animating = false;
        },
      });
      if (currentIndexRef.current >= 0) {
        gsap.set(sections[currentIndexRef.current], { zIndex: 0 });
        tl.to(images[currentIndexRef.current], { yPercent: -15 * dFactor }).set(
          sections[currentIndexRef.current],
          { autoAlpha: 0 }
        );
      }
      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
        { yPercent: 0 },
        0
      )
        .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(
          Array.from(headings[index].querySelectorAll(`.${styles.char}`)),
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: {
              each: 0.02,
              from: "random",
            },
          },
          0.2
        );

      currentIndexRef.current = index;
    };

    Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: 1,
      onDown: () => gotoSection(currentIndexRef.current + 1, 1),
      onUp: () => gotoSection(currentIndexRef.current - 1, -1),
      tolerance: 10,
      preventDefault: true,
    });

    gotoSection(0, 1);
  }, []);

  return (
    <div>
      <header>
        <a href="#">Logo</a>
        <a href="#">Menu</a>
      </header>
      {sectionsData.map((section, index) => (
        <div
          key={index}
          className={`${styles.section} ${styles[section.className]}`}
          ref={(el) => (sectionsRef.current[index] = el)}
        >
          <div
            className={styles.outer}
            ref={(el) => (outerWrappersRef.current[index] = el)}
          >
            <div
              className={styles.inner}
              ref={(el) => (innerWrappersRef.current[index] = el)}
            >
              <div
                className={styles.bg}
                ref={(el) => (imagesRef.current[index] = el)}
                style={{
                  backgroundImage: section.bgUrl
                    ? `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%), url(${section.bgUrl})`
                    : "none",
                }}
              >
                <h2
                  className={styles.h2}
                  ref={(el) => (headingsRef.current[index] = el)}
                >
                  {splitText(section.heading)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestJs;
