import { Instagram, Profile, Link1, Global } from "iconsax-react";
import { Link } from "react-router-dom";
import { Brand } from "./Brand";

export function Footer() {
  return (
    <footer className="footer shell">
      <Brand />
      <p>Alternative futures, made together.</p>
      <div className="footer-contact">
        <strong>University of Ibadan Alt Protein Project</strong>
        <span>Ibadan, Nigeria</span>
      </div>
      <div className="footer-links">
        <Link to="/about/who-we-are">About</Link>
        <Link to="/research">Research</Link>
        <Link to="/contact">Contact</Link>
        <a href="#top">Back to top ↑</a>
      </div>
      <div className="social-links" aria-label="Social media links">
        <a href="https://www.instagram.com/unibadanaltprotein" target="_blank" rel="noreferrer" aria-label="Instagram">
          <Instagram className="icon-visible" color="currentColor" size={15} variant="Linear" />
        </a>
        <a href="https://www.linkedin.com/company/the-university-of-ibadan-alt-protein-project/home/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <Profile className="icon-visible" color="currentColor" size={15} variant="Linear" />
        </a>
        <a href="https://medium.com/@unibadanaltprotein" target="_blank" rel="noreferrer" aria-label="Medium">
          <Link1 className="icon-visible" color="currentColor" size={15} variant="Linear" />
        </a>
        <a href="https://gfi.org/directory/the-university-of-ibadan-alt-protein-project/" target="_blank" rel="noreferrer" aria-label="Good Food Institute directory">
          <Global className="icon-visible" color="currentColor" size={15} variant="Linear" />
        </a>
      </div>
      <small>
        © 2024 University of Ibadan Alt Protein Project
      </small>
    </footer>
  );
}
