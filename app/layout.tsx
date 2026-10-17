import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
export const metadata: Metadata = {title:{default:'Smart City India — Explore the technology shaping tomorrow',template:'%s · Smart City India'},description:'Explore the technology behind a smarter India through interactive animations. Discover microchips, computing, and the ideas that connect our world.',applicationName:'Smart City India'};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en" data-scroll-behavior="smooth"><body><a href="#main" className="skip-link">Skip to content</a><div className="site-shell"><Header/>{children}<Footer/></div></body></html>}
