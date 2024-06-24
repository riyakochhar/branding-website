// import React, { useRef, useEffect, useState } from "react";
// import gsap from "gsap";
// import styles from "./css/style.module.css";
// import Svg from "./components/Svg";

// const Home = () => {
//   const container = useRef();
//   const [show, setShow] = useState(false);
//   const textContainerRef = useRef(null);
//   const freshTextRef = useRef(null);

//   useEffect(() => {
//     const clouds = gsap.utils.toArray(`.${styles.cloud_img}`);

//     const imagesLoaded = () => {
//       return Promise.all(
//         clouds.map(
//           (img) =>
//             new Promise((resolve) => {
//               if (img.complete) {
//                 resolve();
//               } else {
//                 img.onload = resolve;
//               }
//             })
//         )
//       );
//     };

//     imagesLoaded().then(() => {
//       console.log("All images loaded");

//       // Set initial position to center for each cloud
//       gsap.set(clouds, {
//         xPercent: -50,
//         yPercent: -50,
//         x: 0,
//         y: 0,
//       });

//       // Animate clouds
//       gsap.to(clouds[0], {
//         y: -window.innerHeight / 2,
//         duration: 2,
//         ease: "power2.inOut",
//       });
//       gsap.to(clouds[1], {
//         x: -300,
//         duration: 2,
//         ease: "power2.inOut",
//       });
//       gsap.to(clouds[2], {
//         x: 300,
//         y: -20,
//         duration: 2,
//         ease: "power2.inOut",
//       });

//       gsap.to([clouds[3], clouds[4]], {
//         y: window.innerHeight / 2,
//         duration: 2,
//         ease: "power2.inOut",
//         stagger: 0.2,
//         onComplete: () => {
//           setShow(true);
//           animateText();
//         },
//       });
//     });
//   }, []);

// const animateText = () => {
//   // Ensure textContainerRef.current is defined
//   if (textContainerRef.current) {
//     // Animate the Fresh heading
//     gsap.fromTo(
//       freshTextRef.current,
//       { opacity: 0, scale: 0.5 },
//       {
//         opacity: 1,
//         scale: 1,
//         x: 0,
//         y: 0,
//         duration: 4,
//         ease: "power2.inOut",
//         onComplete: () => {
//           // Animate the remaining text elements after the Fresh heading animation is complete
//           gsap.fromTo(
//             Array.from(textContainerRef.current.children).slice(1), // Skip the first child (Fresh heading)
//             { opacity: 0, y: 0 },
//             {
//               opacity: 1,
//               y: 0,
//               duration: 2,
//               ease: "power2.inOut",
//               stagger: 1, // Adjust stagger time if needed
//               delay: 0.5, // Adjust delay if needed to sync with SVG animation
//             }
//           );
//         },
//       }
//     );
//   }
// };
//   return (
//     <>
//       <section
//         ref={container}
//         className={styles.contents}
//         style={{
//           backgroundImage:
//             'url("https://img.crofarm.com/crofarmweb/branding/bg-1.png")',
//           backgroundSize: "cover",
//         }}
//       >
//         <div className={styles.div}>
//           <img
//             src="https://img.crofarm.com/crofarmweb/branding/cloud-png-222.webp"
//             className={styles.cloud_img}
//           />
//         </div>

//         <div className={styles.div}>
//           <img
//             src="https://img.crofarm.com/crofarmweb/branding/cloud-png-222.webp"
//             className={styles.cloud_img}
//           />
//           <img
//             src="https://img.crofarm.com/crofarmweb/branding/cloud-png-222.webp"
//             className={styles.cloud_img}
//           />
//         </div>

//         <div className={styles.div}>
//           <img
//             src="https://img.crofarm.com/crofarmweb/branding/cloud-png-222.webp"
//             className={styles.cloud_img}
//           />
//           <img
//             src="https://img.crofarm.com/crofarmweb/branding/cloud-png-222.webp"
//             className={styles.cloud_img}
//           />
//         </div>

//         {show && <Svg />}
// <div ref={textContainerRef} className={styles.textContainer}>
//   <h1 ref={freshTextRef} className={styles.freshText}>
//     Fresh
//   </h1>
//   <h2 className={styles.subText}>How So?</h2>
//   <p className={styles.paragraphText}>Scroll down & we'll text you.</p>
// </div>
//       </section>
//     </>
//   );
// };

// export default Home;

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./css/style.module.css";
import Svg from "./components/Svg";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const container = useRef();
  const textContainerRef = useRef();
  const freshTextRef = useRef();
  const [show, setShow] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);

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

    ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "bottom top",
      onEnter: () => handleScroll(),
      onEnterBack: () => handleScroll(),
    });
  }, []);

  const animateText = () => {
    // Ensure textContainerRef.current is defined
    if (textContainerRef.current) {
      // Animate the Fresh heading
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
            // Animate the remaining text elements after the Fresh heading animation is complete
            gsap.fromTo(
              Array.from(textContainerRef.current.children).slice(1), // Skip the first child (Fresh heading)
              { opacity: 0, y: 0 },
              {
                opacity: 1,
                y: 0,
                duration: 2,
                ease: "power2.inOut",
                stagger: 1, // Adjust stagger time if needed
                delay: 0.5, // Adjust delay if needed to sync with SVG animation
              }
            );
          },
        }
      );
    }
  };

  const handleScroll = () => {
    // Hide clouds and fade out text
    gsap.to(`.${styles.cloud_img}`, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    gsap.to(textContainerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        setImageVisible(true);
        // Animate the fruit basket
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
      },
    });
  };

  return (
    <>
      <section
        ref={container}
        className={styles.contents}
        style={{
          backgroundImage:
            'url("https://img.crofarm.com/crofarmweb/branding/bg-1.png")',
          backgroundSize: "cover",
        }}
        data-scroll
        data-scroll-section
      >
        {imageVisible ? (
          <div
            className={styles.bottomImage}
            style={{
              backgroundImage:
                'url("https://img.crofarm.com/crofarmweb/branding/bg-1.png")',
              backgroundSize: "cover",
              minHeight: "100vh", // Adjust height as needed
            }}
          >
            h2
          </div>
        ) : (
          <>
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
              <p className={styles.paragraphText}>
                Scroll down & we'll text you.
              </p>
            </div>
          </>
        )}
        <div
          className={styles.fruitBasket}
          style={{ display: imageVisible ? "block" : "none" }}
        >
          <img
            src="https://img.crofarm.com/crofarmweb/branding/bg-2.png"
            alt="Fruit Basket"
          />
        </div>
      </section>
      <h3>hey</h3>
    </>
  );
};

export default Home;
