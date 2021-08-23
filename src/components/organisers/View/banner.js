import React from "react";

const Banner = () => {
  return (
    <section
      className="list-single-hero organiser-sec"
      data-scrollax-parent="true"
      id="sec1"
    >
      <div className="bg par-elem bannerStyling" />
      <div className="list-single-hero-title fl-wrap remove-padding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="title-new-padding">
                <h2 className="mb-0">
                  <span>Event Organisers</span>
                </h2>
                <p className="bannerText">
                  Get more out of your favourite event planners with Ticketlake
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
