import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

//TODO Web Template Studio: Add a new link in the NavBar for your page here.
// A skip link is included as an accessibility best practice. For more information visit https://www.w3.org/WAI/WCAG21/Techniques/general/G1.
const NavBar = () => {
  return (
    <React.Fragment>
      {/* <div className={styles.skipLink}>
        <a href="#mainContent">Skip to Main Content</a>
      </div>
      <nav className="navbar navbar-expand-sm navbar-light border-bottom justify-content-between">
        <Link className="navbar-brand" to="/" role="heading" aria-level="1">
          Good News
        </Link>
        <div className="navbar-nav">
          <Link className="nav-item nav-link active" to="/">
            News
          </Link>
          <Link className="nav-item nav-link active" to="Map">
            Map
          </Link>
          <Link className="nav-item nav-link active" to="About">
            About
          </Link>
        </div>
      </nav> */}

      <nav className="navbar navbar-expand-lg py-3 navbar-dark shadow-sm" style={{ backgroundColor: "#2c3e50" }}>
        <div className="container">
          <a href="/" className="navbar-brand">
            {/* <!-- Logo Image --> */}
            <img src="https://1.bp.blogspot.com/-b8gUc48IHx8/YAKcN5bBEfI/AAAAAAAAAMs/89zm6U1OrBQd6wXyvEo_Lmn5etWHlULlQCNcBGAsYHQ/s500/PNGKH_0000125.png" width="45" alt="" className="d-inline-block align-middle mr-2" />
            {/* <!-- Logo Text --> */}
            <span className="text-uppercase font-weight-bold">Good News</span>
          </a>

          <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler"><span className="navbar-toggler-icon"></span></button>

          <div id="navbarSupportedContent" className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav ml-auto ">
              <li className="nav-item active tc"> <Link className="nav-item nav-link active" to="/">News</Link></li>
              <li className="nav-item tc"> <Link className="nav-item nav-link active" to="Map">Map</Link></li>
              <li className="nav-item tc"><Link className="nav-item nav-link active" to="About">About</Link></li>
              {/* <li className="nav-item"><Link className="nav-item nav-link" to="/">Chart</Link></li> */}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default NavBar;
