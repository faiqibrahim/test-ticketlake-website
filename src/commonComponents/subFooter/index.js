// Library
import React from 'react';
import {NavLink} from 'react-router-dom';

// Data Array
const footerMenu = [
    {
        menuName: 'Terms of Service',
        menuLink: '/terms'
    },
    {
        menuName: 'Privacy Policy',
        menuLink: '/policies'
    },
];
const subFooter = () => {
    return (
        <div className="sub-footer">
            <div className="container">
                <div className="copyright"> © Ticketlake 2020 - All Rights Reserved</div>

                <div className="subfooter-nav" style={{marginRight: '0px'}}>
                    <ul>
                        {footerMenu.map((menu, i) => (
                            <li key={i}>
                                <NavLink to={menu.menuLink}>{menu.menuName}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default subFooter;