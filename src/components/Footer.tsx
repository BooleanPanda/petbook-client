import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div className="footer_signature">
                <p className="footer_signature_text text text-normal text-white">Made by</p>
                <a href="https://github.com/BooleanPanda" target="_blank" rel="noopener noreferrer">
                    <div className="footer_signature_link"></div>
                </a>
            </div>
        </div>
    );
};

export default Footer;