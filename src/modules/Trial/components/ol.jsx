import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../css/style.module.css";
import Svg from "./Svg";

gsap.registerPlugin(ScrollTrigger);

const Screen1 = ({ onScroll, setShow, show }) => {
  const container = useRef();
  const textContainerRef = useRef();
  const freshTextRef = useRef();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const clouds = gsap.utils.toArray(`.${styles.cloud_img}`);

    const imagesLoaded = () => {
      return Promise.all(
        clouds.map(
          (img) =>
            new Promise((resolve) => {
              if (img.complete) {
                resolve();
              } else {
                img.onload = resolve;
              }
            })
        )
      );
    };

    imagesLoaded().then(() => {
      console.log("All images loaded");

      // Set initial position to center for each cloud
      gsap.set(clouds, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
      });

      // Animate clouds
      gsap.to(clouds[0], {
        y: -window.innerHeight / 2,
        duration: 2,
        ease: "power2.inOut",
      });
      gsap.to(clouds[1], {
        x: -300,
        duration: 2,
        ease: "power2.inOut",
      });
      gsap.to(clouds[2], {
        x: 300,
        y: -20,
        duration: 2,
        ease: "power2.inOut",
      });

      gsap.to([clouds[3], clouds[4]], {
        y: window.innerHeight / 2,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.2,
        onComplete: () => {
          setShow(true);
          animateText();
        },
      });
    });

    ScrollTrigger.observe({
      trigger: container.current,
      start: "top top",
      end: "bottom top",
      once: true,

      onUp: () => {
        if (!hasAnimated) {
          setHasAnimated(true);

          // Fade out clouds and text
          gsap.to(`.${styles.cloud_img}`, {
            opacity: 0,
            duration: 2,
            ease: "power2.inOut",
          });

          gsap.to(textContainerRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              onScroll(); // Trigger transition to Screen2
            },
          });
        }
      },
    });
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
      <section ref={container} className={styles.contents}>
        <div className={styles.div}>
          <img
            src="https://img.crofarm.com/crofarmweb/branding/cloud-png-222.webp"
            className={styles.cloud_img}
          />
        </div>
        <div className={styles.div}>
          <img
            src="https://img.crofarm.com/crofarmweb/branding/cloud-png-222.webp"
            className={styles.cloud_img}
          />
          <img
            src="https://img.crofarm.com/crofarmweb/branding/cloud-png-222.webp"
            className={styles.cloud_img}
          />
        </div>
        <div className={styles.div}>
          <img
            src="https://img.crofarm.com/crofarmweb/branding/cloud-png-222.webp"
            className={styles.cloud_img}
          />
          <img
            src="https://img.crofarm.com/crofarmweb/branding/cloud-png-222.webp"
            className={styles.cloud_img}
          />
        </div>
        {show && <Svg />}
        <div ref={textContainerRef} className={styles.textContainer}>
          <h1 ref={freshTextRef} className={styles.freshText}>
            Fresh
          </h1>
          <h2 className={styles.subText}>How So?</h2>
          <p className={styles.paragraphText}>Scroll down & we'll text you.</p>
        </div>
      </section>
    </>
  );
};

export default Screen1;
// import React, { useState } from "react";
// import styles from "./css/style.module.css";
// import Screen1 from "./components/Screen1";
// import Screen2 from "./components/Screen2";
// import { useRef, useEffect } from "react";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import gsap from "gsap";

// gsap.registerPlugin(ScrollTrigger);

// const Trial = () => {
//   const [showScreen2, setShowScreen2] = useState(false);
//   const [hasAnimated, setHasAnimated] = useState(false);

//   const [show, setShow] = useState(false);
//   const container = useRef();
//   const textContainerRef = useRef();

//   const handleScroll = () => {
//     setShowScreen2(true);
//   };

//   useEffect(() => {
//     ScrollTrigger.observe({
//       trigger: container.current,
//       start: "top top",
//       end: "bottom top",
//       once: true,
//       onDown: () => {
//         console.log("hit ");
//       },
//       onUp: () => {
//         if (!hasAnimated) {
//           setHasAnimated(true);

//           // Fade out clouds and text
//           gsap.to(`.${styles.cloud_img}`, {
//             opacity: 0,
//             duration: 2,
//             ease: "power2.inOut",
//           });

//           gsap.to(textContainerRef.current, {
//             opacity: 0,
//             duration: 1,
//             ease: "power2.inOut",
//             onComplete: () => {
//               handleScroll();
//             },
//           });
//         }
//       },
//     });
//   }, []);

//   return (
//     <section ref={container} className={styles.contents}>
//       {!showScreen2 ? (
//         <Screen1
//           onScroll={handleScroll}
//           show={show}
//           setShow={setShow}
//           textContainerRef={textContainerRef}
//           container={container}
//           hasAnimated={hasAnimated}
//           setHasAnimated={setHasAnimated}
//         />
//       ) : (
//         <Screen2 show={show} setShow={setShow} />
//       )}
//     </section>
//   );
// };

// export default Trial;
