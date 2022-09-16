import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
function Footer() {
  return (
      <footer className="text-center text-white background-color-two mt-3" >
        <div className="container pt-4">
          <section className="mb-4">

            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <LinkedInIcon/>
            </a>
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <GitHubIcon/>
            </a>
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <FacebookIcon/>
            </a>
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </section>
        </div>
        <div
          className="text-center text-dark p-3 background-color-three"
        >
          © 2022 Copyright:
          <a className="text-dark" href="https://mdbootstrap.com/">
            JamesOng-hub
          </a>
        </div>
      </footer>

  );
}

export default Footer;
