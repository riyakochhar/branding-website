import React, { useEffect } from "react";
import gsap from "gsap";
import styles from "../css/style.module.css";
import Svg from "./Svg";
import { useRef } from "react";

const Screen2 = () => {
  const textContainerRef = useRef();
  const freshTextRef = useRef();
  
  useEffect(() => {
    gsap.fromTo(
      `.${styles.fruitBasket}`,
      { y: window.innerHeight, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 2,
        ease: "power2.inOut",
      }
    );
  }, []);

  const animateText = () => {
    if (textContainerRef.current) {
      gsap.fromTo(
        freshTextRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          duration: 4,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.fromTo(
              Array.from(textContainerRef.current.children).slice(1),
              { opacity: 0, y: 0 },
              {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power2.inOut",
                stagger: 1,
                delay: 0.5,
              }
            );
          },
        }
      );
    }
  };

  return (
    <>
      <div className={styles.fruitBasket}>
        <img
          src="https://img.crofarm.com/crofarmweb/branding/bg-2.png"
          alt="Fruit Basket"
        />
      </div>

      <Svg isScreen2={true} />
      <div ref={textContainerRef} className={styles.textContainer}>
        <h1 ref={freshTextRef} className={styles.freshText}>
          Fresh
        </h1>
        <h2 className={styles.subText}>How So?</h2>
        <p className={styles.paragraphText}>Scroll down & we'll text you.</p>
      </div>
    </>
  );
};

export default Screen2;
