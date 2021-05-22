// Library
import React, { Component } from 'react';
import Scrollchor from "react-scrollchor";
// Component

class AboutUsPage extends Component {

    easeOutQuint = (x, t, b, c, d) => {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    };

    render() {
        const hrefLink = '#';

        return (
            <div id="wrapper">
                {/* content*/}
                <div className="content">
                    {/*  section  */}
                    <section className="parallax-section single-par" data-scrollax-parent="true">
                        <div className="bg par-elem " style={{
                            float: 'left',
                            backgroundImage: `url('${window.location.origin}/images/BG.png')`,
                            translateY: '30%'
                        }}
                        />
                        <div />
                        <div className="container">
                            <div className="section-title center-align big-title">
                                <div className="section-title-separator"><span /></div>
                                <h2><span>About Our Company</span></h2>
                                <span className="section-separator" />
                                <h4>We are a passionate team with one major focus; indulging your social needs.
From games to concerts, movies to symposia, <br />we bring to you curated events you are assured,
would love.</h4>
                            </div>
                        </div>
                        <div className="header-sec-link">
                            <Scrollchor to={`#whyChooseUs`} animate={{ offset: -110, duration: 1000, easing: this.easeOutQuint }}
                                className={"custom-scroll-link color-bg"}>
                                <i className={'fa fa-angle-double-down'} />
                            </Scrollchor>
                        </div>
                    </section>
                    <section id="sec1" className="middle-padding">
                        <div className="container custom-container">
                            {/*about-wrap */}
                            <div className="about-wrap" style={{ marginTop: '4%' }}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="video-box fl-wrap">
                                            <iframe title="Video" width="100%" height="350px" src="https://www.youtube.com/embed/s2faEJIXJtI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="list-single-main-item-title fl-wrap">
                                            <h3>Our Awesome <span>Story</span></h3>
                                        </div>
                                        <p>Our journey has always been and still is about quality in service, entertainment and innovation.
                                            We are a passionate team with a major focus: indulging the social needs of others.</p>
                                        <p>
                                            For the longest time, finding events and getting tickets has presented most people with a lot of
                                            hassles considering the queues and unavailability of event tickets in the shortest time.
                                            After much market probing and research, we founded Ticketlake with the aim of putting an end
                                            to inconveniences and introducing easy access, security and reliability to both event organizers
                                            and attendees. Our platform offers unrivaled convenience in the market.
                                        </p>
                                        <a href="#sec2" className="btn  color-bg float-btn custom-scroll-link">View
                                            Our Team <i className="fa fa-users" /></a>
                                    </div>
                                </div>
                            </div>
                            {/* about-wrap end  */}

                        </div>
                    </section>
                    {/* section end */}
                    {/*section */}
                    <section className="color-bg hidden-section" id={"whyChooseUs"}>
                        <div className="wave-bg wave-bg2" />
                        <div className="container custom-container">
                            <div className="section-title">
                                <h2>Why Choose Us</h2>
                                <span className="section-separator" />
                                <p>Ticketlake compliments and upholds the entertainment industry by bringing customers and
                                    event organizers closer than ever.</p>
                            </div>
                            {/* */}
                            <div className="row">
                                <div className="col-md-4 mb-30">
                                    {/* process-item*/}
                                    <div className="process-item big-pad-pr-item">
                                        <span className="process-count"> </span>
                                        <div className="time-line-icon">
                                            <img alt='img' src="images/icons/livetickets.svg" className="chooseUsOnAboutImg" />
                                        </div>
                                        <h4><a href={hrefLink}> Box Office Ticket Sales</a></h4>
                                        <p>We are the only e-ticketing solutions company that offers on site Box office Ticket Sales if your allocated tickets are not sold out.

</p>
                                    </div>
                                    {/* process-item end */}
                                </div>
                                <div className="col-md-4 mb-30">
                                    {/* process-item*/}
                                    <div className="process-item big-pad-pr-item">
                                        <span className="process-count"> </span>
                                        <div className="time-line-icon">
                                            <img src="images/icons/global.svg" alt='img' className="chooseUsOnAboutImg" />
                                        </div>
                                        <h4><a href={hrefLink}>Global Ticketing Solutions</a></h4>
                                        <p>We are a true global ticketing platform and has your global ticketing needs truly covered.

</p>
                                    </div>
                                    {/* process-item end */}
                                </div>
                                <div className="col-md-4 mb-30">
                                    {/* process-item*/}
                                    <div className="process-item big-pad-pr-item nodecpre">
                                        <span className="process-count"> </span>
                                        <div className="time-line-icon">
                                            <img alt='img' src="images/icons/costeffective.svg" className="chooseUsOnAboutImg" />
                                        </div>
                                        <h4><a href={hrefLink}>Cost Efficiency</a></h4>
                                        <p>We cut out all the time and money it costs you in commuting to ticket outlets to look for events, movies and sports tickets.

</p>
                                    </div>
                                    {/* process-item end */}
                                </div>
                            </div>
                            {/*process-wrap   end*/}
                        </div>
                    </section>
                    {/* section end */}



                    {/*section */}
                    <section id="sec2">
                        <div className="container custom-container">
                            <div className="section-title">
                                <h2>Our Team</h2>
                                <span className="section-separator" />
                                <p>Meet the passionate and visionary team behind the game changing entertainment experience with Ticketlake</p>
                            </div>
                            <div className="team-holder section-team fl-wrap">
                                {/* team-item */}
                                <div className="team-box">
                                    <div className="team-photo">
                                        <img alt='img' src="images/team/shadrick.jpg" className="respimg" />
                                    </div>
                                    <div className="team-info">
                                        <h3>Shadrack Y. Gyasi</h3>
                                        <h4>Founder and CEO of Ticketlake</h4>
                                        <p>Shadrack is an enterprising executive known for morphing challenges into opportunities by amalgamating technology and people. </p>
                                        <div className="team-social">
                                            <ul>
                                                <li><a href="https://www.facebook.com/ticketlake/?modal=admin_todo_tour" target="_blank" rel="noopener noreferrer"><i
                                                    className="fab fa-facebook-f" /></a></li>
                                                <li><a href="https://twitter.com/ticketlake" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /></a>
                                                </li>
                                                <li><a href="https://www.instagram.com/ticketlake_official/" target="_blank" rel="noopener noreferrer"><i
                                                    className="fab fa-instagram" /></a></li>
                                            </ul>
                                            <a className="team-contact_link" href={hrefLink}><i
                                                className="fa fa-envelope" /></a>
                                        </div>
                                    </div>
                                </div>
                                {/* team-item  end*/}
                                {/* team-item */}
                                <div className="team-box">
                                    <div className="team-photo">
                                        <img src="images/team/Hassan.jpg" alt={"team"} className="respimg" />
                                    </div>
                                    <div className="team-info">
                                        <h3>Sadisu Hassan</h3>
                                        <h4>Chief Strategy Officer</h4>
                                        <p>A result-driven business strategist orchestrating win-win solutions that integrate a diversity of expectations and goals. </p>
                                        <div className="team-social">
                                            <ul>
                                                <li><a href="https://www.facebook.com/ticketlake/?modal=admin_todo_tour" target="_blank" rel="noopener noreferrer"><i
                                                    className="fab fa-facebook-f" /></a></li>
                                                <li><a href="https://twitter.com/ticketlake" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /></a>
                                                </li>
                                                <li><a href="https://www.instagram.com/ticketlake_official/" target="_blank" rel="noopener noreferrer"><i
                                                    className="fab fa-instagram" /></a></li>
                                            </ul>
                                            <a className="team-contact_link" href={hrefLink}><i
                                                className="fa fa-envelope" /></a>
                                        </div>
                                    </div>
                                </div>
                                {/* team-item end  */}
                                {/* team-item */}
                                <div className="team-box">
                                    <div className="team-photo">
                                        <img src="images/team/Hannry.jpg" alt={"team"} className="respimg" />
                                    </div>
                                    <div className="team-info">
                                        <h3>Henry Otoo</h3>
                                        <h4>Marketing Executive </h4>
                                        <p>Henry Otoo is an avid creative marketer who keeps his finger on the pulse for all things digital and has a real passion for marketing.</p>
                                        <div className="team-social">
                                            <ul>
                                                <li><a href="https://www.facebook.com/ticketlake/?modal=admin_todo_tour" target="_blank" rel="noopener noreferrer"><i
                                                    className="fab fa-facebook-f" /></a></li>
                                                <li><a href="https://twitter.com/ticketlake" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /></a>
                                                </li>
                                                <li><a href="https://www.instagram.com/ticketlake_official/" target="_blank" rel="noopener noreferrer"><i
                                                    className="fab fa-instagram" /></a></li>
                                            </ul>
                                            <a className="team-contact_link" href={hrefLink}><i
                                                className="fa fa-envelope" /></a>
                                        </div>
                                    </div>
                                </div>
                                {/* team-item end  */}
                                <div className="team-box">
                                    <div className="team-photo">
                                        <img src="images/team/Hillry.jpg" alt={"team"} className="respimg" />
                                    </div>
                                    <div className="team-info">
                                        <h3>Hillary Widanama Adare</h3>
                                        <h4>Research and Development Executive</h4>
                                        <p>From strategic planning to optimizing business operations Hillary has diversified experience
                                            in balancing all the facets of the business.</p>
                                        <div className="team-social">
                                            <ul>
                                                <li><a href="https://www.facebook.com/ticketlake/?modal=admin_todo_tour" target="_blank" rel="noopener noreferrer"><i
                                                    className="fab fa-facebook-f" /></a></li>
                                                <li><a href="https://twitter.com/ticketlake" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /></a>
                                                </li>
                                                <li><a href="https://www.instagram.com/ticketlake_official/" target="_blank" rel="noopener noreferrer"><i
                                                    className="fab fa-instagram" /></a></li>
                                            </ul>
                                            <a className="team-contact_link" href={hrefLink}><i
                                                className="fa fa-envelope" /></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* section end */}

                    <section className="parallax-section" data-scrollax-parent="true">
                        <div className="bg par-elem "
                            style={{
                                float: 'left',
                                backgroundImage: `url('${window.location.origin}/images/BG.png')`,
                                translateY: '30%'
                            }} />
                        <div />
                        {/*container*/}
                        <div className="container custom-container">
                            <div className="intro-item fl-wrap">
                                <h2>Need more information</h2>
                                <h3>Get in touch today and a member of our passionate and dedicated world class support team will be more than happy to assist.</h3>
                                <a className="btn  color-bg" href={'/contact-us'}>Get in Touch <i
                                    className="fa fa-envelope" /></a>
                            </div>
                        </div>
                    </section>

                    {/* <section>
                        <div className="container custom-container">
                            <div className="section-title">
                                <h2>Testimonials</h2>
                                <span className="section-separator"/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in pulvinar
                                    neque. Nulla finibus lobortis pulvinar.</p>
                            </div>
                        </div>
                        <div className="clearfix"/>
                        slider-carousel-wrap
                        <div className="container custom-container">
                            <div className="slider-carousel-wrap text-carousel-wrap fl-wrap">
                                <div className="swiper-button-prev sw-btn"><i className="fa fa-long-arrow-alt-left"/>
                                </div>
                                <div className="swiper-button-next sw-btn"><i className="fa fa-long-arrow-alt-right"/>
                                </div>
                                <div className="text-carousel single-carousel cur_carousel-slider-container fl-wrap">
                                    slick-item
                                    <div className="slick-item">
                                        <div className="text-carousel-item">
                                            <div className="popup-avatar"><img src="images/avatar/1.jpg" alt={"team"}/>
                                            </div>
                                            <div className="listing-rating card-popup-rainingvis"
                                                 data-starrating2={5}/>
                                            <div className="review-owner fl-wrap">Milka Antony
                                                - <span>Happy Client</span></div>
                                            <p> "In ut odio libero, at vulputate urna. Nulla tristique mi a massa
                                                convallis cursus. Nulla eu mi magna. Etiam suscipit commodo gravida.
                                                Lorem ipsum dolor sit amet, conse ctetuer adipiscing elit, sed diam nonu
                                                mmy nibh euismod tincidunt ut laoreet dolore magna aliquam erat."</p>
                                            <a href="#" className="testim-link">Via Facebook</a>
                                        </div>
                                    </div>
                                    slick-item end
                                    slick-item
                                    <div className="slick-item">
                                        <div className="text-carousel-item">
                                            <div className="popup-avatar"><img src="images/avatar/1.jpg" alt={"team"}/>
                                            </div>
                                            <div className="listing-rating card-popup-rainingvis"
                                                 data-starrating2={4}/>
                                            <div className="review-owner fl-wrap">Milka Antony
                                                - <span>Happy Client</span></div>
                                            <p> "In ut odio libero, at vulputate urna. Nulla tristique mi a massa
                                                convallis cursus. Nulla eu mi magna. Etiam suscipit commodo gravida.
                                                Lorem ipsum dolor sit amet, conse ctetuer adipiscing elit, sed diam nonu
                                                mmy nibh euismod tincidunt ut laoreet dolore magna aliquam erat."</p>
                                            <a href="#" className="testim-link">Via Facebook</a>
                                        </div>
                                    </div>
                                    slick-item end
                                    slick-item
                                    <div className="slick-item">
                                        <div className="text-carousel-item">
                                            <div className="popup-avatar"><img src="images/avatar/1.jpg" alt={"team"}/>
                                            </div>
                                            <div className="listing-rating card-popup-rainingvis"
                                                 data-starrating2={5}/>
                                            <div className="review-owner fl-wrap">Milka Antony
                                                - <span>Happy Client</span></div>
                                            <p> "In ut odio libero, at vulputate urna. Nulla tristique mi a massa
                                                convallis cursus. Nulla eu mi magna. Etiam suscipit commodo gravida.
                                                Lorem ipsum dolor sit amet, conse ctetuer adipiscing elit, sed diam nonu
                                                mmy nibh euismod tincidunt ut laoreet dolore magna aliquam erat."</p>
                                            <a href="#" className="testim-link">Via Facebook</a>
                                        </div>
                                    </div>
                                    slick-item end
                                    slick-item
                                    <div className="slick-item">
                                        <div className="text-carousel-item">
                                            <div className="popup-avatar"><img src="images/avatar/1.jpg" alt={"team"}/>
                                            </div>
                                            <div className="listing-rating card-popup-rainingvis"
                                                 data-starrating2={5}/>
                                            <div className="review-owner fl-wrap">Milka Antony
                                                - <span>Happy Client</span></div>
                                            <p> "In ut odio libero, at vulputate urna. Nulla tristique mi a massa
                                                convallis cursus. Nulla eu mi magna. Etiam suscipit commodo gravida.
                                                Lorem ipsum dolor sit amet, conse ctetuer adipiscing elit, sed diam nonu
                                                mmy nibh euismod tincidunt ut laoreet dolore magna aliquam erat."</p>
                                            <a href="#" className="testim-link">Via Facebook</a>
                                        </div>
                                    </div>
                                    slick-item end
                                </div>
                            </div>
                        </div>
                        slider-carousel-wrap end
                        <div className="section-decor"/>
                    </section>*/}

                </div>
                {/* content end*/}
            </div>

        );
    }
}

export default AboutUsPage;