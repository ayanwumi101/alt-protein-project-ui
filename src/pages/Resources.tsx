import { Link } from 'react-router-dom'
import { Arrow } from '../components/Arrow'
import { Reveal } from '../components/Reveal'

const resources = [['Career Guide', '/resources/career-guide', 'Find your place in the movement.'], ['Recipes', '/resources/recipes', 'Good food, new possibilities.'], ['Alt Protein in Waterloo', '/resources/alt-protein-in-waterloo', 'Discover the local ecosystem.'], ['Cultivating Careers', '/resources/cultivating-careers', 'Stories from people doing the work.'], ['Fermentation Database', '/resources/fermentation-database', 'A knowledge base for curious minds.']]
export function Resources() {
  return <main className="detail-page"><section className="page-hero shell"><div className="eyebrow"><span className="eyebrow-line" /> Resources</div><h1>Start with<br /><em>curiosity.</em></h1><p className="page-intro">Guides, stories, recipes, and references to help you take your next step into alternative protein.</p></section><section className="resources-list shell"><Reveal className="section-label">01 <span /> THE LIBRARY</Reveal>{resources.map(([title, to, text], index) => <Reveal className="resource-row" key={to}><span>0{index + 1}</span><div><h2>{title}</h2><p>{text}</p></div><Link to={to}><Arrow /></Link></Reveal>)}</section></main>
}
