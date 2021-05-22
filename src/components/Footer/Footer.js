import './Footer.css';
import insta from "../../assets/Instagram.png";
import facebook from "../../assets/Facebook.png";
import linkedin from "../../assets/LinkedIn.png";
import github from "../../assets/GitHub.png";
import twitter from "../../assets/Twitter.png";

function Footer() {
    return (
        <div className="footer-container">
            <div className="social_icons-container">
                <a className="social-icon" target="__blank" href="https://www.instagram.com/ieeevitvellore/">
                    <img src={insta} alt="instagram" />
                </a>
                <a className="social-icon" target="__blank" href="https://www.facebook.com/IEEEVIT/">
                    <img src={facebook} alt="facebook" />
                </a>
                <a className="social-icon" target="__blank" href="https://www.linkedin.com/company/ieee-vit-vellore/">
                    <img src={linkedin} alt="linkedin" />
                </a>
                <a className="social-icon" target="__blank" href="https://github.com/ieee-vit">
                    <img src={github} alt="github" />
                </a>
                <a className="social-icon" target="__blank" href="https://twitter.com/ieeevitvellore">
                    <img src={twitter} alt="twitter" />
                </a>
            </div>
            <div className="policy-container">
                Your email ID will never be shared or used for promotional purposes
            </div>
        </div>
    );
}

export default Footer;
