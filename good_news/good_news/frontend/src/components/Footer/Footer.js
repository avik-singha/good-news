import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    // <div className={styles.footer}>

    <div className={styles.footer}>
      <div className="container">
        <div className="row justify-content-center">
          <a className={styles.footerlink} target="_blank" rel="noreferrer" href="https://www.mongodb.com/world-2022/hackathon">
            MongoDB Hackathon 22
          </a>
        </div>

      </div>
    </div>
  );
}
export default Footer;