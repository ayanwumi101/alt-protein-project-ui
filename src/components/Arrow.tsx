import { ArrowRight } from 'iconsax-react'

export function Arrow({ size = 16 }: { size?: number }) {
  return <ArrowRight className="arrow icon-visible arrow-tilted" color="currentColor" size={size} variant="Linear" aria-hidden="true" />
}
