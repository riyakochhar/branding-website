import React, { useState } from "react";
import styles from "./css/style.module.css";
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";

const Home = () => {
  const [showScreen2, setShowScreen2] = useState(false);
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    setShowScreen2(true);
  };

  return (
    <section className={styles.section}>
      {!showScreen2 ? (
        <Screen1 onScroll={handleScroll} show={show} setShow={setShow} />
      ) : (
        <Screen2 show={show} setShow={setShow} />
      )}
    </section>
  );
};

export default Home;
