import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [location.pathname])
  return <><Header /><div className="route-transition" key={location.pathname}>{children}</div><Footer /></>
}
