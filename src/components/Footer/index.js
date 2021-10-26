import { Android, Apple } from '@material-ui/icons';
import React from 'react';
import './styles.scss';

const Footer = props => {
    return (
        <footer className="footer">
            <div className="wrap">
                <div className="row">

                    <div className="footer-col-1">
                        <h3>
                            © Rediva
                        </h3>
                        <p>Download Our App</p>
                        <p> <a className="sml" href="/androidapp" > <Android /> Android</a></p>
                        <li><Apple /> IOS Coming Soon.</li>
                    </div>
                    <div className="footer-col-2">
                        <p style={{ color: 'gray', fontStyle: 'italic', fontSize: '30px' }}>Find your perfect Apparel</p>
                    </div>


                    <div className="footer-col-3">
                        <h3>
                            Useful Links
                        </h3>
                        <ul>
                            <li><a className="sml" href="https://rediva-lifestyle.web.app/about">About</a></li>
                            <li><a className="sml" href="https://rediva-lifestyle.web.app/returnpolicy">Return Policy</a></li>
                            <li><a className="sml" href="https://rediva-lifestyle.web.app/privacypolicy">Privacy Policy</a></li>
                            <li>Copouns</li>


                        </ul>
                    </div>
                    <div className="footer-col-4">
                        <h3>Follow Us</h3>
                        <ul>
                            <li><a className="sml" href="https://www.facebook.com/rediva.in/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                            <li><a className="sml" href="https://www.instagram.com/rediva.in/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                            <li><a className="sml" href="https://in.pinterest.com/rediva_in/" target="_blank" rel="noopener noreferrer">Pinterest</a></li>
                            {/* <li><a className="sml" href="https://www.youtube.com/" target="_blank">Youtube</a></li> */}
                        </ul>
                    </div>
                </div>
            </div>


        </footer>
    );
}

export default Footer;