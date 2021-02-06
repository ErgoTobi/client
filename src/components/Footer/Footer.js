import React from 'react';
import styled from 'styled-components'
import LanguageToggle from "../Header/LanguageToggle";
import LanguageSelector from "../Header/LanguageSelector";
import LanguageGiver from "../Header/LanguageGiver";

const Footer = () => {
    return (
        <FooterContainer className="main-footer">
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                        {/* Column 1*/}
                        <div className="col-md-3 col-sm-6">
                            <h4>Contact us</h4>
                            <ul className="list-unstyled">
                                <li>BRD GmbH</li>
                                <li>Heavenhausen</li>
                                <li>666 Hell</li>
                            </ul>
                        </div>
                        {/* Column 2*/}
                        <div className="col-md-3 col-sm-6">
                            <h4>Lorem ipsum</h4>
                            <ul className="list-unstyled">
                                <li><a href="https://www.xing.com/"> blarum</a></li>
                                <li>blarum</li>
                                <li>blarum</li>
                            </ul>
                        </div>
                        {/* Column 3*/}
                        <div className="col-md-3 col-sm-6">
                            <h4>Lorem ipsum</h4>
                            <ul className="list-unstyled">
                                <li>blarum</li>
                                <li>blarum</li>
                                <li>blarum</li>
                            </ul>
                        </div>
                        {/* Column 4*/}
                        <div className="col-md-3 col-sm-6">
                            <h4>Language</h4>
                            <ul className="list-unstyled">
                                <li>
                                    <LanguageGiver />
                                </li>
                            </ul>
                        </div>
                        {/* Footer Bottom */}
                        <div className="footer-bottom">
                            <p className="text-xs-center">
                                &copy;{new Date().getFullYear()} Memoires - All Rights Reserved
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </FooterContainer>
    )
}

export default Footer;



// 1rem = 16 pixels
const FooterContainer = styled.footer`
    .footer-middle {
        background: var(--mainDark);
        padding-top: 3rem;
        color: var(--mainWhite);
    }
    .footer-bottom {
        padding-top: 3rem;
    }
    
    ul li a {
        color: var(--mainGrey);
    }
    
    ul li a:hover {
        color: var(--mainLightGrey);
    }
`;