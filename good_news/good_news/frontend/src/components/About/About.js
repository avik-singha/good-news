import React from "react";

const About = () => {
  return (
    <main id="mainContent" className="container">
      <div className="row justify-content-center py-5">
        <h2>About the Project</h2>
      </div>
      <div className="row justify-content-left py-2 px-5 tc">
        <p>
        <b>Good News</b> is a web application that showcases positive news
          around the world.<br/>
          It has been shown that in recent times, world news is
          ever-increasingly leaning towards the negative, so we created{" "}
          <b>Good News</b> as a breath of fresh air to give viewers a break from
          the everyday disaster update and instead showcase solely the good,
          genuine things happening all around the world that sometimes gets lost
          in all the negativity.
        </p>
        <p>
          The information in the <b>Good News</b> website is gotten from the
          <a
            href="https://www.gdeltproject.org/"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            GDELT Dataset{" "}
          </a>
          and consists of news and other related information in 100 different
          languages from over 10,000 countries in the world.
        </p>
      </div>
    </main>
  );
};

export default About;
