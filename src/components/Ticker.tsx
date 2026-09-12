import Ticker from 'framer-motion-ticker'
import { Arrow } from './Arrow'

const message = 'THE FUTURE OF FOOD IS OPEN'

export function FoodTicker() {
  return <div className="ticker">
    <Ticker duration={22} gap={34}>
      {[0, 1, 2, 3].map((item) => <span className="ticker-item" key={item}>{message} <Arrow size={14} /></span>)}
    </Ticker>
  </div>
}
