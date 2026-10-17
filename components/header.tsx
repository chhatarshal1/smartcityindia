import Link from 'next/link';
import { ArrowUpRight, Building2 } from 'lucide-react';
export function Header() {
 return <header className="site-header"><Link href="/" className="brand" aria-label="Smart City India home"><span className="brand-mark"><Building2 size={24} strokeWidth={1.6}/></span><span className="brand-name">Smart City<span className="brand-country">INDIA<span className="brand-stripe"/></span></span></Link><nav aria-label="Main navigation"><Link href="/#library">Explorations</Link><Link href="/#about">Our vision</Link></nav><Link className="nav-cta" href="/#library">Start exploring <ArrowUpRight size={16}/></Link></header>;
}
