import React,{useState} from "react";
import image from "../../img/ipfs.png"

const About = () => {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5">
          <div
            className="col-lg-6 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ minHeight: "400px" }}
          >
            <div className="position-relative h-100">
              <img
                class="img-fluid position-absolute w-100 h-100"
                src={image}
                alt=""
                style={{
                  objectFit: "cover",
                  position: "relative",
                  right: "0cm",
                }}
              />
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
            <h6 className="section-title bg-white text-start text-primary pe-3">
              About Us
            </h6>
            <h1 className="mb-4">
              Welcome to <span className="text-primary">CryptoBox</span>
            </h1>
            <p className="mb-4">
              Here we offer a unique and secure way to share files using IPFS
              and Ethereum blockchain technology.
            </p>
            <p className="mb-4">
              Moreover, our platform is powered by smart contracts, which ensure
              that only authorized parties have access to the files. This
              eliminates the risk of unauthorized access or tampering with the
              shared files.
            </p>
            <div className="row gy-2 gx-4 mb-4">
              <div className="col-sm-6">
                <p className="mb-0">
                  <i className="fa fa-arrow-right text-primary me-2"></i>IPFS
                </p>
              </div>
              <div className="col-sm-6">
                <p className="mb-0">
                  <i className="fa fa-arrow-right text-primary me-2"></i>
                  Ethereum
                </p>
              </div>
              <div className="col-sm-6">
                <p className="mb-0">
                  <i className="fa fa-arrow-right text-primary me-2"></i>Genome Sequencing
                </p>
              </div>
              <div className="col-sm-6">
                <p className="mb-0">
                  <i className="fa fa-arrow-right text-primary me-2"></i>Blockchain
                </p>
              </div>
            </div>
            <a className="btn btn-dark py-3 px-5 mt-2" href="">
              Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );



}
export default About;
