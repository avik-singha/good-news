import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row justify-content-around">
          <div className="col-8 col-md-5">
            <h5 className={styles.title}>Good News</h5>
            <p className={styles.description}>
              Get positive news from around the world
            </p>
          </div>
          <div className="col-2">
            <ul className="list-unstyled">
              <li>
                <a className={styles.footerlink} target="_blank" rel="noreferrer" href="https://www.mongodb.com/world-2022/hackathon">
                  MongoDB Hackathon 22
                </a>
              </li> 
              <li>
                <a className={styles.footerlink} target="_blank" rel="noreferrer" href="https://www.gdeltproject.org/">
                  GDELT Website
                </a>
              </li>              
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;