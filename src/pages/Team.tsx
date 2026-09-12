import { useState } from 'react'
import { Arrow } from '../components/Arrow'
import { Reveal } from '../components/Reveal'

const members = [
  ['RS', 'Rikard Saqe', 'Faculty Lead', 'Research strategy, cultivated seafood, and building bridges between disciplines.', 'https://i.pravatar.cc/500?img=12'],
  ['AM', 'Amina Mensah', 'Project Coordinator', 'Community programming, partnerships, and making complex ideas accessible.', 'https://i.pravatar.cc/500?img=47'],
  ['JL', 'Jordan Li', 'Research Lead', 'Open-access tools for the next generation of alternative protein researchers.', 'https://i.pravatar.cc/500?img=11'],
  ['SK', 'Sofia Kaur', 'Education Lead', 'Curriculum design, workshops, and the questions that start conversations.', 'https://i.pravatar.cc/500?img=32'],
]

export function Team() {
  const [active, setActive] = useState<string | null>(null)
  return <main className="detail-page"><section className="page-hero shell"><div className="eyebrow"><span className="eyebrow-line" /> About · Our team</div><h1>Many disciplines.<br /><em>One shared table.</em></h1><p className="page-intro">The people behind the questions, experiments, and conversations moving our project forward.</p></section><section className="team-intro shell"><Reveal className="section-label">01 <span /> THE COMMUNITY</Reveal><Reveal className="team-intro-grid"><h2>Different paths.<br /><em>Shared purpose.</em></h2><p>Our community includes students, researchers, designers, and builders from across the University of Waterloo. Hover over a card to meet the people making this work happen.</p></Reveal></section><section className="team-section"><div className="shell"><Reveal className="section-label light">02 <span /> MEET THE TEAM</Reveal><div className="team-grid">{members.map(([, name, role, detail, image]) => <article className={`team-card ${active === name ? 'is-active' : ''}`} onMouseEnter={() => setActive(name)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(name)} key={name} tabIndex={0}><div className="avatar"><img src={image} alt="" /></div><div className="team-card-meta"><span>{role}</span><Arrow /></div><h3>{name}</h3><div className="team-detail"><p>{detail}</p><a href="mailto:unibadanaltprotein@gmail.com">Connect <Arrow /></a></div></article>)}</div></div></section></main>
}
