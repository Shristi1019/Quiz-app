import React from "react";

function Footer() {
  return (
    <footer className="page-footer font-small blue pt-4">
      <div
        style={{ backgroundColor: "#029499" }}
        className="container-fluid text-md-left p-3"
      >
        <div className="row">
          <div className="col-md-3 mb-md-0 mb-3 mt-3 text-center">
            <img
              src={
                "https://proteconsol.com/static/media/logo2.da6edeb4a200af2db12c.png"
              }
              width="250"
              height="140"
              alt="Logo"
            />
          </div>

          <div className="col-md-3 mb-md-0 mb-3 mt-3">
            <p>Swastik Towers, CP-17/18,Mahanagar, Pilibhit Bypass Road, </p>
            <h4>Regd. Office: Bareilly</h4>
            <p>Bareilly, Uttar Pardesh - 243005 India</p>
          </div>

          <div className="col-md-3 mb-md-0 mb-3 mt-3">
            <h5>Branch Office : Bangalore</h5>
            <p>
              Indiqube ALPHA, Plot No. 19/4 & 27,Kadubeesanahalli Village,
              Varthur Hobli, Bangalore, Karnataka - 560103 India
            </p>
          </div>

          <div className="col-md-3 mb-md-0 mb-3 mt-3">
            <ul className="list-unstyled fw-bold text-white">
              <li>Home</li>
              <hr></hr>
              <li>Services</li>
              <hr></hr>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="footer-copyright text-center text-secondary py-3"
        style={{ backgroundColor: "#000000" }}
      >
        © Protecons 2024. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
