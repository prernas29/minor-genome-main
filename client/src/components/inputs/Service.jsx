import React,{useState} from "react";
const Service = () => {

return(
<div class="container-xxl py-5">
        <div class="container">
            <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 class="section-title bg-white text-center text-primary px-3">Services</h6>
                <h1 class="mb-5">Our Services</h1>
            </div>
            <div class="row g-4">
                <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="service-item rounded pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-globe text-primary mb-4"></i>
                            <h5>IPFS based fie sharing</h5>
                           <p>IPFS (InterPlanetary File System)  where files are identified by content rather than location, allowing for faster and more efficient sharing of data.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="service-item rounded pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-building text-primary mb-4 "aria-hidden="true"></i>
                            <h5>Peer-to-Peer Network</h5>
                            <p>nodes (peers) act as both clients and servers, enabling direct communication and file sharing between participants without relying on a central server.</p>
                          
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div class="service-item rounded pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-th text-primary mb-4"></i>
                            <h5>Blockchain</h5>
                            <p>decentralized digital ledger technology that enables secure, transparent, and tamper-proof storage and transfer of data.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                    <div class="service-item rounded pt-3">
                        <div class="p-4">
                            <i class="fa fa-3x fa-dna text-primary mb-4"></i>
                            <h5>Genome Sequencing</h5>
                            <p>process of determining the complete DNA sequence of an organism's genome, providing insight</p>
                           
                        </div>
                    </div>
                </div>
               
                
            </div>
        </div>
    </div>
)
}
export default Service;