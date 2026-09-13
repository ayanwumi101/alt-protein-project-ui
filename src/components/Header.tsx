import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown2, HambergerMenu, CloseSquare } from "iconsax-react";
import { Instagram, Profile, Link1, Global } from "iconsax-react";
import { Arrow } from "./Arrow";
import { Brand } from "./Brand";

const menus = [
  {
    label: "About",
    items: [
      ["Who we are", "/about/who-we-are"],
      ["Our Team", "/about/team"],
    ],
  },
  { label: "Research", items: [["About", "/research"]] },
  {
    label: "Resources",
    items: [
      ["Career Guide", "/resources/career-guide"],
      ["Recipes", "/resources/recipes"],
      ["Alt Protein in Waterloo", "/resources/alt-protein-in-waterloo"],
      ["Cultivating Careers Podcast", "/resources/cultivating-careers"],
      ["Fermentation Database", "/resources/fermentation-database"],
    ],
  },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const close = () => {
    setMenuOpen(false);
    setOpenMenu(null);
  };
  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) close();
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", menuOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [menuOpen]);
  return (
    <>
      {/* <div className="announcement">
        <span className="pulse" /> Waterloo Alt Protein Project{" "}
        <span className="announcement-separator">·</span> Building a better food
        system, together <Arrow />
      </div> */}
      <nav
        className={`nav shell ${isScrolled ? "nav-scrolled" : ""}`}
        ref={ref}
      >
        <Brand />
        <div className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>
          {menus.map((menu) => (
            <div className="nav-dropdown" key={menu.label}>
              <button
                className="nav-link nav-dropdown-trigger"
                onClick={() =>
                  setOpenMenu(openMenu === menu.label ? null : menu.label)
                }
                aria-expanded={openMenu === menu.label}
              >
                {menu.label}{" "}
                <ArrowDown2
                  className="chevron icon-visible"
                  color="currentColor"
                  size={14}
                  variant="Linear"
                />
              </button>
              {openMenu === menu.label && (
                <div className="dropdown-panel">
                  {menu.items.map(([label, to]) => (
                    <Link to={to} key={to} onClick={close}>
                      {label} <Arrow />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link to="/course" className="nav-link" onClick={close}>
            Course
          </Link>
          <Link to="/gallery" className="nav-link" onClick={close}>
            Gallery
          </Link>
          <Link to="/contact" className="nav-link" onClick={close}>
            Contact
          </Link>
          <a
            href="https://forms.gle/vsY8mqn7Cm27NFDH9"
            target="_blank"
            rel="noreferrer"
            className="mobile-contact"
            onClick={close}
          >
            Join <Arrow />
          </a>
          <div className="mobile-socials" aria-label="Social media links">
            <a
              href="https://www.instagram.com/unibadanaltprotein"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram color="currentColor" size={18} variant="Linear" />
            </a>
            <a
              href="https://www.linkedin.com/company/the-university-of-ibadan-alt-protein-project/home/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Profile color="currentColor" size={18} variant="Linear" />
            </a>
            <a
              href="https://medium.com/@unibadanaltprotein"
              target="_blank"
              rel="noreferrer"
              aria-label="Medium"
            >
              <Link1 color="currentColor" size={18} variant="Linear" />
            </a>
            <a
              href="https://gfi.org/directory/the-university-of-ibadan-alt-protein-project/"
              target="_blank"
              rel="noreferrer"
              aria-label="GFI directory"
            >
              <Global color="currentColor" size={18} variant="Linear" />
            </a>
          </div>
        </div>
        <a
          href="https://forms.gle/vsY8mqn7Cm27NFDH9"
          target="_blank"
          rel="noreferrer"
          className="nav-cta"
        >
          Join <Arrow />
        </a>
        <button
          className="menu-toggle icon-visible"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <CloseSquare color="currentColor" size={24} variant="Linear" />
          ) : (
            <HambergerMenu color="currentColor" size={24} variant="Linear" />
          )}
        </button>
      </nav>
    </>
  );
}
