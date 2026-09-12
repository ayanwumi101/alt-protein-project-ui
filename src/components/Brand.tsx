import { Link } from 'react-router-dom'
import logo from '../assets/alt-protein-logo.png'

export function Brand() {
  return <Link to="/" className="brand" aria-label="University of Ibadan Alt Protein Project home"><img className="brand-logo" src={logo} alt="University of Ibadan Alt Protein Project logo" /><span>ALT<span className="brand-dot">.</span>PROTEIN</span></Link>
}
