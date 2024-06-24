// import React, { useState } from "react";
// import styles from "./css/style.module.css";
// import Screen1 from "./components/Screen1";
// import Screen2 from "./components/Screen2";

// const Trial = () => {
//   const [showScreen2, setShowScreen2] = useState(false);
//   const [show, setShow] = useState(false);

//   const handleScroll = () => {
//     setShowScreen2(true);
//   };

//   return (
//     <section className={styles.section}>
//       {!showScreen2 ? (
//         <Screen1 onScroll={handleScroll} show={show} setShow={setShow} />
//       ) : (
//         <Screen2 show={show} setShow={setShow} />
//       )}
//     </section>
//   );
// };

// export default Trial;

import React, { useState } from "react";
import styles from "./css/style.module.css";
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const Trial = () => {
  const [showScreen2, setShowScreen2] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const [show, setShow] = useState(false);
  const container = useRef();
  const textContainerRef = useRef();

  const handleScroll = () => {
    setShowScreen2(true);
  };

  useEffect(() => {
    ScrollTrigger.observe({
      trigger: container.current,
      type: "wheel",
      once: true,
      onDown: () => {
        console.log("hit ");
      },
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
              handleScroll();
            },
          });
        }
      },
    });
  }, []);

  return (
    <section ref={container} className={styles.contents}>
      {!showScreen2 ? (
        <Screen1
          onScroll={handleScroll}
          show={show}
          setShow={setShow}
          textContainerRef={textContainerRef}
          container={container}
          hasAnimated={hasAnimated}
          setHasAnimated={setHasAnimated}
        />
      ) : (
        <Screen2 show={show} setShow={setShow} />
      )}
    </section>
  );
};

export default Trial;
