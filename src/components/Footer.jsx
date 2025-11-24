import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { TbPlant } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content mt-20">
      <div className="container mx-auto p-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <aside className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 text-2xl font-serif font-bold mb-4">
            <TbPlant className="text-primary" />
            <span>TreePlant</span>
          </div>
          <p className="opacity-70 leading-relaxed">
            Cultivating a greener future, one tree at a time. Join our community to make a real impact on the environment.
          </p>
        </aside>

        <nav className="flex flex-col gap-2">
          <h6 className="footer-title opacity-100 text-accent">Services</h6>
          <a className="link link-hover">Tree Plantation</a>
          <a className="link link-hover">Urban Cleaning</a>
          <a className="link link-hover">Awareness Campaigns</a>
          <a className="link link-hover">Relief Support</a>
        </nav>

        <nav className="flex flex-col gap-2">
          <h6 className="footer-title opacity-100 text-accent">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Success Stories</a>
          <a className="link link-hover">Volunteer</a>
        </nav>

        <nav className="flex flex-col gap-2">
          <h6 className="footer-title opacity-100 text-accent">Social</h6>
          <div className="grid grid-flow-col gap-4 text-2xl">
            <a className="cursor-pointer hover:text-primary transition-colors"><FaFacebook /></a>
            <a className="cursor-pointer hover:text-primary transition-colors"><FaTwitter /></a>
            <a className="cursor-pointer hover:text-primary transition-colors"><FaInstagram /></a>
            <a className="cursor-pointer hover:text-primary transition-colors"><FaLinkedin /></a>
          </div>
        </nav>
      </div>

      <div className="bg-base-300 text-base-content text-center p-4 text-sm">
        <p>Copyright © {new Date().getFullYear()} - All right reserved by TreePlant Org.</p>
      </div>
    </footer>
  );
};

export default Footer;