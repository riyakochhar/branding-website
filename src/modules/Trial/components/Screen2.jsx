import React, { useEffect } from "react";
import gsap from "gsap";
import styles from "../css/style.module.css";
import Svg from "./Svg";
import { useRef } from "react";

const Screen2 = ({ show, setShow }) => {
  const textContainerRef = useRef();
  const freshTextRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      `.${styles.fruitBasket}`,
      { y: window.innerHeight, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => {
          console.log("triggered");
          setShow(true);
          animateText(); // Trigger transition to Screen2
        },
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
              Array.from(textContainerRef?.current?.children || []).slice(1),
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
          style={{ width: "100%" }}
        />
      </div>

      {show && <Svg isScreen2={true} />}
      <div ref={textContainerRef} className={styles.textContainer}>
        <h1 ref={freshTextRef} className={styles.freshText}>
          Chemical Free
        </h1>
        <h2 className={styles.subText}>Really?</h2>
        <p className={styles.paragraphText}>
          Keep moving the secret, will be out soon.
        </p>
      </div>
    </>
  );
};

export default Screen2;
