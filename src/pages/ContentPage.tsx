import { Arrow } from '../components/Arrow'
import { Reveal } from '../components/Reveal'
import type { PageData } from './pageData'
import { FoodTicker } from '../components/Ticker'

export function ContentPage({ data }: { data: PageData }) {
  return <main className="content-page"><section className="page-hero shell"><div className="eyebrow"><span className="eyebrow-line" /> {data.eyebrow}</div><h1>{data.title}</h1><p className="page-intro">{data.intro}</p></section><FoodTicker /><section className="page-body shell"><Reveal className="page-body-copy">{data.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a className="button button-dark" href={data.source} target="_blank" rel="noreferrer">Visit original resource <Arrow /></a></Reveal>{data.image && <Reveal className="page-image"><img src={data.image} alt="" /></Reveal>}</section></main>
}
