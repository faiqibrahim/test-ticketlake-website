import React, {Component} from 'react';
import {GetBulletWrapView, GetBulletInnerData} from './TermsViewComponents';

class Terms extends Component {

    getBulletDataPointView = (point, data) => {
        return(
            <div className={'bullet-data-points'}>
                <span className={'bullet-data-point'}>{point}</span>
                <span>{data}</span>
            </div>
        )
    };

    render() {
        return (
            <div id="wrapper">
                <div className="content">
                    <div className="Term-of-use-wrp custom-container">
                        <h5 className="top-heading underline marginTop">TICKETLAKE™</h5>
                        <h5 className="top-heading underline">TERMS OF SERVICE</h5>
                        <div className="description">
                            <b>This Terms of Service Agreement (“Agreement”) is entered into by and between Ticketlake (“Ticketlake”)
                            and you (“you” or “You” or “User”).</b> You and Ticketlake may also be referred to individually as a “Party” and,
                                collectively, as the “Parties.” <br/>
                            <div className={"quote"}>
                                IT IS IMPORTANT TO READ THE FOLLOWING TERMS OF SERVICE AS THEY <br/>IMPACT AND, IN SOME CASES, LIMIT YOUR RIGHTS.
                                YOUR <br/>ACKNOWLEDGMENT OF THESE TERMS OF SERVICE AND SUBSEQUENT USE <br/>OF THE SITE CONSTITUTES ACCEPTANCE OF EACH AND
                                EVERY PROVISION <br/>OF THESE  TERMS OF SERVICE.
                            </div>
                            <div className={'intro-points'}>
                                <b>WHEREAS,</b> Ticketlake has developed, owns and operates the platform known as TICKETLAKE.COM
                                and such other related sites and mobile applications as Ticketlake may create (collectively, the “Site”); and
                            </div>
                            <div className={'intro-points'}>
                                <b>WHEREAS,</b> the Site provides organizers of events (each, an “Organizer”) a platform through which it can sell
                                tickets to concerts, sporting events, movies, conferences, workshops, gigs, entertainment and other activities for
                                which such Organizer is authorized to sell tickets (each, an “Event”) to persons desiring to attend such Event(s)
                                (each, a User”); and
                            </div>
                            <div className={'intro-points'}>
                                <b>WHEREAS,</b> Ticketlake is a conduit for the purchase of tickets to the Events and is not in any way responsible
                                for the Event; and
                            </div>
                            <div className={'intro-points'}>
                                <b>WHEREAS,</b> any services provided by Ticketlake, whether it is to provide information about Events or to sell
                                tickets to Events (collectively, the “Services”)
                                shall be included in any reference to “use” of the Site.
                            </div>
                            <div className={'intro-points'}><b>THEREFORE,</b> , the Parties agree as follows:</div>

                            <GetBulletWrapView bulletVal={'1'} heading={'AGREEMENT TO BE BOUND'}>
                                <div className={'bullet-data'}>
                                    As a condition of using the Site, you acknowledge that you have read this Agreement,
                                    you understand this Agreement and you agree with each and every term of this Agreement.
                                    <div className={"quote"}>
                                        USE OF THE SITE IS AN EXPRESS AFFIRMATION THAT YOU HAVE<br/>READ AND AGREE TO THE TERMS OF<br/>
                                        THE USER AGREEMENT AND THE PRIVACY POLICY.
                                    </div>
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'2'} heading={'USE OF THE SITE'}>
                                <div className={'bullet-data'}>
                                    Ticketlake provides the Platform for the sale of tickets to Events by Organizers.  Ticketlake does not evaluate, qualify
                                    or verify the Organizers or the Events. All information presented is solely that of the Organizers. Ticketlake assumes no
                                    responsibility for the information provided to Ticketlake by the Organizers.
                                </div>
                                <div className={'bullet-data'}>
                                    Organizers are solely responsible for the Events, including but not limited to content, quality, timeliness, cancellation
                                    and any matter involving personnel associated with the Events.
                                </div>
                                <div className={'bullet-data'}>
                                    Searching the Site does not require any personal information to be provided by a User.    For information required to make
                                    a purchase and the conditions of a purchase. see the <span className={'underline'}><b>User Agreement</b></span>.
                                    For the ways in which Ticketlake may use the information provided by Users, see the <span className={'underline'}><b>Privacy Policy</b></span>.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'3'} heading={'REPRESENTATIONS AND WARRANTIES'}>
                                <div className={'bullet-data'}>
                                    You are over the age of eighteen (18) and authorized to enter into this Agreement.
                                </div>
                                <div className={'bullet-data'}>
                                    The information provided in establishing your account with Ticketlake is true and accurate in all respects,
                                    and that you will immediately update your account should any account information change.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'4'} heading={'SECURITY'}>
                                <div className={'bullet-data'}>
                                    You are solely and exclusively responsible for the security of your username and password.
                                    Ticketlake shall be entitled to rely on the authority of any person using the username and password in providing information to
                                    and taking all actions that the authorized user would be entitled to take or direct.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'5'} heading={'WARRANTY DISCLAIMER'}>
                                <div className={'bullet-data'}>
                                    Ticketlake makes no representations or warranties as to the Site or the Services.  To the maximum extent of the law,
                                    Ticketlake disclaims all representations, warranties and conditions, express and implied, including the warranties of
                                    merchantability, fitness for particular purpose, title and non-infringement.  The Site is provided “as is.”
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'6'} heading={'WAIVER'}>
                                <div className={'bullet-data'}>
                                    You expressly and unconditionally waive any and all claims against Ticketlake, regardless the bases upon which such
                                    claim(s) may be made, that may be based on, arise in connection with or be related to any of the following acts, circumstances or conditions:
                                    {this.getBulletDataPointView('a.',
                                        'any unauthorized person uses your username and password to the Site for any purpose and with any result;')}
                                    {this.getBulletDataPointView('b.',
                                        'the Site is partially or totally inoperative or inaccessible;')}
                                    {this.getBulletDataPointView('c.',
                                        'your use of the Site;')}
                                    {this.getBulletDataPointView('d.',
                                        'viruses or other malicious software are transferred to your computer by using the Site;')}
                                    {this.getBulletDataPointView('e.',
                                        'there are bugs, errors or inaccuracies in the Site;')}
                                    {this.getBulletDataPointView('f.',
                                        'third-party content, actions or inactions on or with respect to the Site;')}
                                    {this.getBulletDataPointView('g.',
                                        'any claim relating to a change in this Agreement by Ticketlake.')}
                                </div>
                                <div className={'bullet-data'}>
                                    For purposes of this section, any reference to “Ticketlake” shall include Ticketlake’s affiliates,
                                    officers, employees, principals, agents and contractors.
                                </div>
                                <div className={'bullet-data'}>
                                    No waiver by Ticketlake of any breach by you of any condition or provision of this Agreement shall be deemed a waiver
                                    of any similar or dissimilar provision or condition at the same or any prior or subsequent time, nor shall the failure
                                    of or delay by Ticketlake in exercising any right, power, or privilege under this Agreement operate as a waiver to preclude
                                    any other or further exercise thereof or the exercise of any other such right, power, or privilege.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'7'} heading={'TERMINATION'}>
                                <div className={'bullet-data'}>
                                    Subject to specified provisions of this Agreement and the User Agreement or Organizer Agreement surviving termination,
                                    Ticketlake may terminate this Agreement upon written notice to you at any time without cause.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'8'} heading={'DISPUTES'}>
                                <div className={'bullet-data'}>
                                    If and to the extent any dispute or claim as between you and Ticketlake relating to this Agreement cannot be resolved
                                    as the result of good faith negotiations, such dispute or claim shall be resolved exclusively by arbitration in Acrra, Ghana,
                                    under and pursuant to the rules of the Ghana Association of Certified Mediators & Arbitrators (“GHACMA”), in accordance with the
                                    laws of Ghana, without regard to its conflict of law provisions.  The prevailing Party shall be entitled to recover its cost and
                                    reasonable attorneys’ fees incurred in connection with such action from the other party.
                                </div>
                                <div className={'bullet-data'}>
                                    You agree that any dispute you may bring to arbitration shall be as an individual only, not as a class or with or behalf of anyone else.
                                    You expressly waive any right to bring a class or collective action, or be a member in a class or collective proceeding.
                                </div>
                                <div className={'bullet-data'}>
                                    Notwithstanding the foregoing, in the event that monetary damages are not a sufficient remedy for any threatened or actual breach of this Agreement,
                                    in addition to monetary damages, either Party shall be entitled to seek other remedies at law, injunctive or other equitable relief and/or specific
                                    performance to remedy or prevent any threatened or actual breach of this Agreement in any court of competent jurisdiction without the requirement of a bond.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'9'} heading={'LIMITATION OF LIABILITY'}>
                                <div className={'bullet-data word-spacing'}>
                                    IN NO EVENT WILL HEXAGRAM BE LIABLE FOR ANY SPECIAL, CONSEQUENTIAL, INCIDENTAL, PUNITIVE, EXEMPLARY, OR INDIRECT COSTS OR DAMAGES INCLUDING BUT NOT
                                    LIMITED TO THE LOSS OF PROFITS OR BUSINESS OPPORTUNITY, EVEN IF YOU HAD BEEN ADVISED OF SUCH POSSIBILITY.
                                </div>
                                <div className={'bullet-data'}>
                                    For purposes of this section, any reference to “Ticketlake” shall include Ticketlake’s affiliates,
                                    officers, employees, principals, agents and contractors.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'10'} heading={'FORCE MAJEURE'}>
                                <div className={'bullet-data'}>
                                     Ticketlake shall not be responsible or liable for any delay or failure to fulfill any provision of this Agreement if such a delay or failure
                                    results directly or indirectly from any act of God, war, riot, insurrection, embargoes, acts of civil or military authorities, fires, floods,
                                    explosions, accidents, or any other cause beyond the reasonable control of Ticketlake.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'11'} heading={'MODIFICATIONS'}>
                                <div className={'bullet-data'}>
                                    Ticketlake may amend this Agreement at any time, in its sole and absolute discretion; provided any changes in fees and costs and/or services
                                    shall not apply to tickets already purchased by a User.  Your continued use of the Site after the effective date of any such modification
                                    shall be conclusive evidence of your consent to be bound by such modification.
                                </div>
                                <div className={'bullet-data'}>
                                    No amendment, modification or waiver of any of the terms of this Agreement will be binding upon Ticketlake except by a written instrument
                                    signed by a duly authorized representative of Ticketlake or posted on the Site by Ticketlake.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'12'} heading={'SECTION HEADINGS'}>
                                <div className={'bullet-data'}>
                                    Section headings are included for ease of reference only and have no binding effect.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'13'} heading={'INTERPRETATION'}>
                                <div className={'bullet-data'}>
                                    You acknowledge and agree that you had sufficient time and opportunity to have this Agreement reviewed by your legal counsel. If this
                                    Agreement is ever construed, whether by a court or arbitrator, such court or arbitrator will not construe this Agreement, or any provision
                                    hereof, against any party as drafter.
                                </div>
                                <div className={'bullet-data'}>
                                    This Agreement is written in English and, notwithstanding the translation or translatability into other languages,
                                    the English language version of this Agreement shall be controlling.
                                </div>
                                <div className={'bullet-data'}>
                                    The headings used herein are for convenience only and shall not be deemed to define, limit or construe the contents of any provision
                                    of this Agreement. The meanings given to terms defined herein will be equally applicable to both the singular and plural forms of such terms.
                                    Whenever the context may require, any pronoun includes the corresponding masculine, feminine and neuter forms.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'14'} heading={'SEVERABILITY'}>
                                <div className={'bullet-data'}>
                                    If any provision of this Agreement is unenforceable under any applicable law or is held invalid, such holding shall not affect any other
                                    provision hereof, and the defective provision shall, if applicable law permits, be modified and interpreted in a manner that it is enforceable.
                                    Otherwise, the offending term or provision shall be omitted and not affect any other term or provision of this Agreement or invalidate or
                                    render unenforceable such term or provision in any other jurisdiction.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'15'} heading={'VIOLATIONS OF THESE RULES'}>
                                <div className={'bullet-data'}>
                                    Failure to abide by the terms of this Agreement may, in the sole discretion of Ticketlake,
                                    result in suspension or termination of your account.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'16'} heading={'SURVIVAL'}>
                                <div className={'bullet-data'}>
                                    Notwithstanding anything to the contrary contained herein, the terms of this Agreement that expressly or by their nature contemplate performance,
                                    after this Agreement terminates or expires, will survive and continue in full force and effect.
                                </div>
                                <div className={'bullet-data'}>
                                    Specifically, Sections 1, 3, 5-9, 11-13, 16-17 shall survive termination of this Agreement.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'17'} heading={'NOTICES'}>
                                <div className={'bullet-data'}>
                                    Any notices or other communications required or permitted hereunder shall be sufficiently given if in writing and delivered in person or sent
                                    by registered or certified mail (return receipt requested) or nationally recognized overnight delivery service, postage prepaid,
                                    or delivered via telecopier or facsimile transmission addressed as follows, or to such other address as such Party may notify to the other
                                    Parties in writing:
                                </div>

                                <GetBulletInnerData value={'To Ticketlake:'}>
                                    <span>Hexagram Enterprises, LLC <br/>Hse No. 13, Assemblies of God<br/>
                                        Dzorwulu, Accra<br/>Ghana</span>
                                </GetBulletInnerData>
                                <GetBulletInnerData value={'To You:'}>
                                    <span>At such address and email as you indicate in the registration of your <br/>Ticketlake account.</span>
                                </GetBulletInnerData>

                                <div className={'bullet-data'}>
                                    Notices, demands or requests which Ticketlake or you are required or desire to give the other hereunder shall be deemed to have been properly
                                    given for all purposes if (A) hand-delivered to the Party's notice address, (B) delivered to a nationally recognized overnight courier to
                                    its addressee at such Party's notice address, or (C) delivered via telecopier or facsimile transmission to the Party's facsimile number.
                                    Each such notice, demand or request shall be deemed to have been received upon the earlier of (i) actual receipt or refusal by the addressee
                                    if hand-delivered in accordance with clause (A) or (B) above, or (ii) the date and time of transmission if sent during business hours in accordance
                                    with clause (C) above. The Parties shall notify the other of any change in address, which notification must be at least two business days in advance
                                    of it being effective. Notices may be given on behalf of any Party by such Party's legal counsel.  For a notice to be valid and effective, an email
                                    copy of such shall notice shall be sent concurrently to the addressee’s email.  An email notice alone shall be sufficient upon acknowledgment of
                                    receipt by the recipient or the recipient’s reply to such email, direct or indirect.
                                </div>
                            </GetBulletWrapView>

                            <GetBulletWrapView bulletVal={'18'} heading={'ENTIRE AGREEMENT'}>
                                <div className={'bullet-data'}>
                                    This Agreement sets forth the entire agreement and understanding between you and Ticketlake relating to the subject matter hereof and
                                    thereof and supersedes any prior or contemporaneous discussions, agreements, representations, warranties and other communications
                                    between you and Ticketlake, written or oral, to the extent they relate in any way to the subject matter hereof.
                                </div>
                            </GetBulletWrapView>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Terms