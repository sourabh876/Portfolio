import { useEffect, useState } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { me, experience, education, certifications, skills, techBand, projects } from './data'

const P = {"sun": "M12 17a5 5 0 100-10 5 5 0 000 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4", "moon": "M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z", "menu": "M4 6h16M4 12h16M4 18h16", "x": "M6 6l12 12M18 6L6 18", "mail": "M3 6h18v12H3zM3 7l9 6 9-6", "phone": "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z", "linkedin": "M4 9h4v11H4zM6 4a2 2 0 100 .01M10 9h4v2c1-1.5 2.5-2.3 4-2.3 3 0 4 2 4 5V20h-4v-5.5c0-1.5-.6-2.3-2-2.3s-2 1-2 2.5V20h-4z", "github": "M15 22v-4a4.8 4.8 0 00-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 004 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2", "arrow": "M7 17L17 7M8 7h9v9", "arrowr": "M5 12h14M13 6l6 6-6 6", "arrowup": "M12 19V5M5 12l7-7 7 7", "download": "M12 3v12M7 10l5 5 5-5M4 21h16", "grad": "M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5", "award": "M12 14a6 6 0 100-12 6 6 0 000 12zM8.5 13L7 22l5-3 5 3-1.5-9", "braces": "M8 4C6 4 5 5 5 7v2c0 1.5-1 2.5-2 3 1 .5 2 1.5 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.5 1 2.5 2 3-1 .5-2 1.5-2 3v2c0 2-1 3-3 3", "code": "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16", "server": "M3 4h18v6H3zM3 14h18v6H3zM7 7h.01M7 17h.01", "db": "M12 3c4.4 0 8 1.1 8 2.5S16.4 8 12 8 4 6.9 4 5.5 7.6 3 12 3zM4 5.5v13C4 19.9 7.6 21 12 21s8-1.1 8-2.5v-13M4 12c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5", "wrench": "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z", "layers": "M12 2l10 5-10 5L2 7zM2 12l10 5 10-5M2 17l10 5 10-5", "send": "M22 2L11 13M22 2l-7 20-4-9-9-4z"}
const Icon = ({ n, s = 18 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={P[n]} /></svg>
const SECTIONS = ['home', 'about', 'experience', 'skills', 'projects', 'contact']
const ICONS = { Languages: 'braces', Frontend: 'code', 'Backend & APIs': 'server', Databases: 'db', 'Tools & Deployment': 'wrench', 'Core Concepts': 'layers' }
const RESUME = 'https://drive.google.com/file/d/1k7voPJclO6jQqcMcrVbeaOfyXXizQc7u/view?usp=drive_link'
const img = (p) => 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 220'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${p.hue},95%,55%)'/><stop offset='1' stop-color='hsl(${p.hue + 25},70%,10%)'/></linearGradient></defs><rect width='400' height='220' fill='url(#g)'/><circle cx='340' cy='40' r='90' fill='white' opacity='.1'/><circle cx='50' cy='200' r='70' fill='white' opacity='.08'/><rect x='60' y='60' width='280' height='100' rx='12' fill='black' opacity='.35'/><circle cx='78' cy='76' r='4' fill='#ff5f56'/><circle cx='92' cy='76' r='4' fill='#ffbd2e'/><circle cx='106' cy='76' r='4' fill='#27c93f'/><text x='200' y='125' font-family='monospace' font-size='30' font-weight='700' fill='white' text-anchor='middle'>${p.title.slice(0, 18)}</text><text x='200' y='148' font-family='monospace' font-size='12' fill='white' opacity='.7' text-anchor='middle'>${p.tech.slice(0, 3).join(' · ')}</text></svg>`)

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && e.target.classList.add('in')), { threshold: .12 })
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  })
}
const spot = (e) => { const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', e.clientX - r.left + 'px'); e.currentTarget.style.setProperty('--my', e.clientY - r.top + 'px') }

function useRepos() {
  const [repos, setRepos] = useState([])
  useEffect(() => {
    const user = me.github.split('/').pop(), have = projects.map(p => p.source.toLowerCase())
    const hue = (n) => [...n].reduce((a, c) => a + c.charCodeAt(0), 0) % 40 + 8
    fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`).then(r => r.ok ? r.json() : []).then(list => setRepos(list
      .filter(r => !r.fork && !have.includes(r.html_url.toLowerCase()))
      .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 9)
      .map(r => ({ title: r.name.replace(/[^\w.-]/g, ' ').replace(/[-_]/g, ' '), subtitle: (r.stargazers_count ? '★ ' + r.stargazers_count + ' · ' : '') + (r.language || 'GitHub repo'),
        date: new Date(r.pushed_at).toLocaleDateString('en', { month: 'short', year: 'numeric' }), desc: r.description || 'Open-source project on GitHub.',
        tech: [r.language, ...(r.topics || [])].filter(Boolean).slice(0, 5), live: r.homepage || r.html_url, source: r.html_url, hue: hue(r.name) })))).catch(() => {})
  }, [])
  return repos
}

function Typer({ words }) {
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[i], t = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1)
      else if (!del) setDel(true)
      else if (n > 0) setN(n - 1)
      else { setDel(false); setI((i + 1) % words.length) } }, del ? 40 : n === w.length ? 1200 : 80)
    return () => clearTimeout(t) }, [n, del, i, words])
  return <span className="accent">{words[i].slice(0, n)}<span className="caret">|</span></span>
}

function Card({ p, idx }) {
  return (<article className="card reveal" onMouseMove={spot} style={{ transitionDelay: idx * 80 + 'ms' }}>
    <div className="thumb"><img src={img(p)} alt={p.title + ' preview'} loading="lazy" /><span className="date">{p.date}</span>
      <div className="over"><a className="btn sm" href={p.live} target="_blank" rel="noreferrer">Live <Icon n="arrow" s={14} /></a><a className="btn sm ghost" href={p.source} target="_blank" rel="noreferrer">Code</a></div></div>
    <div className="cb"><h3>{p.title}</h3><p className="sub2">{p.subtitle}</p><p>{p.desc}</p>
      <div className="tags">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
      <div className="btns"><a className="btn" href={p.live} target="_blank" rel="noreferrer">View live <Icon n="arrow" s={15} /></a>
        <a className="btn ghost" href={p.source} target="_blank" rel="noreferrer"><Icon n="github" s={15} /> Source</a></div></div></article>)
}

function Nav({ theme, toggle, active }) {
  const [open, setOpen] = useState(false), [hide, setHide] = useState(false), [prog, setProg] = useState(0), [solid, setSolid] = useState(false)
  const nav = useNavigate(), loc = useLocation()
  useEffect(() => { let last = 0
    const f = () => { const y = scrollY, h = document.documentElement.scrollHeight - innerHeight
      setProg(h > 0 ? y / h * 100 : 0); setSolid(y > 20); setHide(false); last = y }
    addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [open])
  const go = (id) => { setOpen(false)
    const sc = () => id === 'home' ? scrollTo({ top: 0, behavior: 'smooth' }) : document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    if (loc.pathname !== '/') { nav('/'); setTimeout(sc, 150) } else sc() }
  return (<header className={'nav' + (hide ? ' hide' : '') + (solid ? ' solid' : '')}>
    <div className="bar" style={{ width: prog + '%' }} />
    <button className="logo" onClick={() => go('home')}>soni<span>.dev</span></button>
    <nav className={open ? 'open' : ''}>{SECTIONS.map(s => <button key={s} className={active === s && loc.pathname === '/' ? 'on' : ''} onClick={() => go(s)}>{s}</button>)}</nav>
    <button className="icon" onClick={toggle} aria-label="Toggle theme"><Icon n={theme === 'dark' ? 'sun' : 'moon'} /></button>
    <a className="btn talk" href={`mailto:${me.email}`}>Let's talk</a><button className="icon burger" onClick={() => setOpen(!open)} aria-label="Menu"><Icon n={open ? 'x' : 'menu'} /></button></header>)
}

function Footer() {
  const nav = useNavigate(), loc = useLocation()
  const go = (id) => { const sc = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); loc.pathname !== '/' ? (nav('/'), setTimeout(sc, 150)) : sc() }
  return (<footer><div className="fgrid">
    <div><div className="logo">soni<span>.dev</span></div><p>{me.role} building secure, real-time web apps.</p></div>
    <div><h4>Explore</h4>{SECTIONS.slice(1).map(s => <button key={s} onClick={() => go(s)}>{s}</button>)}</div>
    <div><h4>Connect</h4><a href={me.github} target="_blank" rel="noreferrer">GitHub</a><a href={me.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={`mailto:${me.email}`}>Email</a></div></div>
    <div className="fbot"><span>© {new Date().getFullYear()} {me.name}. Built with React.</span><button className="top" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })}><Icon n="arrowup" s={14} /> Back to top</button></div><div className="mark" aria-hidden="true">soni.dev</div></footer>)
}

function Home({ setActive }) {
  useReveal()
  const [t, setT] = useState({ x: 0, y: 0 }), [f, setF] = useState({ name: '', email: '', message: '', website: '' }), [st, setSt] = useState({ type: '', msg: '' })
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    SECTIONS.forEach(s => document.getElementById(s) && io.observe(document.getElementById(s))); return () => io.disconnect() }, [])
  const move = (e) => { const r = e.currentTarget.getBoundingClientRect()
    setT({ x: ((e.clientY - r.top) / r.height - .5) * -14, y: ((e.clientX - r.left) / r.width - .5) * 14 }) }
  const send = async (e) => { e.preventDefault(); setSt({ type: 'load', msg: 'Sending…' })
    try { const r = await fetch((import.meta.env.VITE_API_URL || '') + '/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) })
      const d = await r.json().catch(() => ({})); if (!r.ok) throw new Error(d.error || 'Failed to send')
      setSt({ type: 'ok', msg: "Message sent! I'll get back to you soon." }); setF({ name: '', email: '', message: '', website: '' })
    } catch (err) { setSt({ type: 'err', msg: err.message === 'Failed to fetch' ? 'Server not reachable. Please email me directly.' : err.message }) } }
  const stats = [['6', 'Months of internships'], ['2', 'Companies shipped for'], ['150k+', 'Lines of codebase navigated']]
  const links = [['mail', 'Email', me.email, `mailto:${me.email}`], ['phone', 'Phone', me.phone, `tel:${me.phone}`], ['linkedin', 'LinkedIn', 'sourabhsonight', me.linkedin], ['github', 'GitHub', 'sourabh876', me.github]]
  return (<>
    <section id="home" className="hero"><div className="blob b1" /><div className="blob b2" />
      <div><p className="mono accent line">Hello, I'm</p>
        <h1><span className="line l1">{me.name.split(' ')[0]}</span><span className="line l2 outline">{me.name.split(' ')[1]}<em>.</em></span></h1>
        <p className="role mono line l3">I'm a <Typer words={['Full-Stack Developer', 'MERN Specialist', 'React Developer', 'API Builder']} /></p>
        <p className="lead line l3">{me.tagline}</p>
        <div className="btns line l3"><button className="btn" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>See my work</button>
          <button className="btn plain" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Get in touch</button>
          <a className="btn outline-btn" href={RESUME} download>Download Resume <Icon n="download" s={16} /></a></div></div>
      <div className="tiltwrap"><svg className="badge" viewBox="0 0 100 100"><defs><path id="c" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs><text fontSize="9.5" letterSpacing="2.4" fill="currentColor"><textPath href="#c">FULL-STACK · DEVELOPER · MERN ·</textPath></text></svg><span className="chip">MERN · Next · TS</span>
      <div className="tilt" onMouseMove={move} onMouseLeave={() => setT({ x: 0, y: 0 })} style={{ transform: `perspective(700px) rotateX(${t.x}deg) rotateY(${t.y}deg)` }}>
        <div className="dots"><i /><i /><i /><span className="mono fn">sourabh.config.ts</span></div>
        <pre className="mono"><u>const</u> dev = {'{'}{'\n'}  name: <b>'{me.name}'</b>,{'\n'}  stack: <b>['React','Node','Mongo']</b>,{'\n'}  auth: <b>['JWT','RBAC']</b>,{'\n'}  realtime: <b>'Socket.io'</b>,{'\n'}  openToWork: <b>true</b>{'\n'}{'}'}</pre></div></div></section>
    <div className="band"><div className="track">{[...techBand, ...techBand].map((s, i) => <span key={i}>{s} ✦</span>)}</div></div>

    <section id="about" className="sec about">
      <div className="ab-left"><p className="eyebrow mono reveal"><b>01</b><i />ABOUT</p>
        <h2 className="reveal">Code that holds up <span className="accent">in production.</span></h2>
        <div className="stats">{stats.map(([n, l]) => <div key={l} className="stat reveal"><b>{n}</b><span>{l}</span></div>)}</div></div>
      <div className="ab-right"><p className="lead2 reveal">{me.aboutLead}</p><p className="more reveal">{me.aboutMore}</p>
        <div className="edu">{[...education.map(e => ({ ...e, ic: 'grad' })), ...certifications.map(e => ({ ...e, ic: 'award' }))].map(e => <div key={e.title} className="erow reveal"><span className="accent"><Icon n={e.ic} s={20} /></span><div><h4>{e.title}</h4><small>{e.sub}</small></div></div>)}</div></div></section>

    <section id="experience" className="sec"><h2 className="reveal"><small>02 — Experience</small>Where I've <span className="accent">shipped.</span></h2>
      <div className="timeline">{experience.map(x => <div key={x.org} className="tl reveal" onMouseMove={spot}><span className="dot" /><small>{x.date}</small><h3>{x.role}</h3><p className="org">{x.org}</p><ul>{x.points.map(t => <li key={t}>{t}</li>)}</ul></div>)}</div></section>

    <section id="skills" className="sec"><h2 className="reveal"><small>03 — Skills</small>Tools I <span className="accent">build with.</span></h2>
      <div className="bento">{Object.entries(skills).map(([k, v], i) => <div key={k} className={'box reveal' + (i === 1 ? ' feat' : '')} onMouseMove={spot} style={{ transitionDelay: i * 70 + 'ms' }}><h3><span>{k}</span><i><Icon n={ICONS[k]} s={20} /></i></h3><div className="tags">{v.map(s => <span key={s}>{s}</span>)}</div></div>)}</div></section>

    <section id="projects" className="sec"><h2 className="reveal"><small>04 — Projects</small>Selected <span className="accent">work.</span></h2>
      <div className="grid">{projects.map((p, i) => <Card key={p.title} p={p} idx={i} />)}</div>
      <div className="center"><Link className="btn" to="https://github.com/sourabh876/">View all projects <Icon n="arrowr" s={16} /></Link></div></section>

    <section id="contact" className="sec"><h2 className="reveal"><small>05 — Contact</small>Let's build something <span className="accent">real.</span></h2>
      <div className="grid2">
        <form className="box reveal" onSubmit={send}>
          <input required minLength="2" placeholder="Your name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
          <input required type="email" placeholder="Your email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
          <textarea required minLength="5" rows="5" placeholder="Your message" value={f.message} onChange={e => setF({ ...f, message: e.target.value })} />
          <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" name="website" value={f.website} onChange={e => setF({ ...f, website: e.target.value })} />
          <button className="btn" disabled={st.type === 'load'}>{st.type === 'load' ? 'Sending…' : <>Send message <Icon n="send" s={16} /></>}</button>
          {st.msg && <p className={'note ' + st.type} role="status">{st.msg}</p>}</form>
        <div className="links">{links.map(([ic, l, v, h]) => <a key={l} className="box reveal" onMouseMove={spot} href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noreferrer"><span className="ic"><Icon n={ic} s={22} /></span><span><small>{l}</small><br />{v}</span></a>)}</div></div></section></>)
}

function AllProjects() {
  useReveal(); useEffect(() => scrollTo(0, 0), [])
  const gh = useRepos(), all = ['All', ...new Set([...projects, ...gh].flatMap(p => p.tech))]
  const [tag, setTag] = useState('All')
  const ok = p => tag === 'All' || p.tech.includes(tag), list = projects.filter(ok), more = gh.filter(ok)
  return (<section className="sec top"><Link to="/" className="mono accent">← Back home</Link>
    <h2>All <span className="accent">projects</span></h2>
    <div className="filters">{all.map(t => <button key={t} className={t === tag ? 'on' : ''} onClick={() => setTag(t)}>{t}</button>)}</div>
    <div className="grid" key={tag}>{list.map((p, i) => <Card key={p.title} p={p} idx={i} />)}</div>
    {more.length > 0 && <><h3 className="sub">More from GitHub</h3><div className="grid" key={'g' + tag}>{more.map((p, i) => <Card key={p.source} p={p} idx={i} />)}</div></>}</section>)
}

export default function App() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'dark'), [active, setActive] = useState('home')
  useEffect(() => { document.documentElement.dataset.theme = theme; try { localStorage.setItem('theme', theme) } catch (e) {} }, [theme])
  return (<><Nav theme={theme} toggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} active={active} />
    <Routes><Route path="/" element={<Home setActive={setActive} />} /><Route path="/projects" element={<AllProjects />} /></Routes><Footer /></>)
}
