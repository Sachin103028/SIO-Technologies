import { useState, useEffect, useRef } from "react";

// ─── REAL COMPANY INFO ───────────────────────────────────────────────
const COMPANY = {
  name: "SIO Technologies",
  tagline: "Seamless Intelligence Operations",
  email: "skthakur2589@gmail.com",
  whatsapp: "+91 85211 15578",
  whatsappLink: "https://wa.me/918521115578",
  location: "Motihari, Bihar 845401, India",
  instagram: "https://www.instagram.com/sio.technologies",
  linkedin: "https://www.linkedin.com/in/sachin-kumar-0a6bb6298/",
};

const NAV_LINKS = ["About", "Services", "Why Us", "Portfolio", "Testimonials", "FAQ", "Contact"];

const SERVICES = [
  { icon: "🤖", title: "AI Automation", desc: "Eliminate repetitive workflows with intelligent automation engines trained on your business logic. From lead processing to data pipelines — we automate it end-to-end.", tag: "Core" },
  { icon: "🌐", title: "Website Development", desc: "Lightning-fast, conversion-optimized websites and web apps built with modern stacks. From portfolio sites to enterprise platforms with pixel-perfect precision.", tag: "Popular" },
  { icon: "⚡", title: "SaaS Solutions", desc: "We architect and launch complete SaaS products — from MVP to scale. Multi-tenant systems, billing infrastructure, user management, and growth-ready architecture.", tag: "Enterprise" },
  { icon: "🏗️", title: "Business Systems", desc: "Custom ERP, CRM, and internal tooling that fits your exact workflows. Replace bloated off-the-shelf software with systems built around how you actually operate.", tag: "Custom" },
  { icon: "🔗", title: "API Integrations", desc: "Connect your entire tech stack. We integrate payment gateways, communication tools, data sources, and third-party platforms into a seamless, unified system.", tag: "Technical" },
  { icon: "📈", title: "Digital Growth", desc: "Strategy, analytics, and automation systems that drive measurable growth. SEO infrastructure, performance marketing tech, and conversion optimization at scale.", tag: "Growth" },
];

const WHY_US = [
  { icon: "🚀", title: "Fast Delivery", desc: "Agile sprints, clear milestones. Most projects ship in weeks, not months. We move fast without cutting corners." },
  { icon: "🔧", title: "Scalable Systems", desc: "Every system we build is designed to handle 10x your current load. Scale without rebuilding." },
  { icon: "🎨", title: "Premium Design", desc: "Interfaces that convert and impress. We obsess over every pixel, animation, and micro-interaction." },
  { icon: "🧠", title: "Smart Automation", desc: "AI-powered workflows that learn and improve over time. Your business gets smarter while you sleep." },
  { icon: "🛡️", title: "Long-Term Support", desc: "We're not a one-and-done shop. Ongoing maintenance, updates, and strategic guidance as your partner." },
];

const STATS = [
  { value: 120, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 40, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "x", label: "Avg ROI Delivered" },
];

const PORTFOLIO = [
  { title: "NeuralHire AI", category: "AI Platform", desc: "End-to-end AI recruitment platform with resume parsing, candidate ranking, and automated interview scheduling. 300% faster hiring cycle.", color: "#00f5d4" },
  { title: "QuantumPay", category: "FinTech SaaS", desc: "Multi-currency payment orchestration SaaS processing $2M+ monthly. Real-time fraud detection with 99.97% uptime.", color: "#7c3aed" },
  { title: "LogiFleet Pro", category: "Business System", desc: "Fleet management system for 500+ vehicles with live GPS, predictive maintenance, and automated dispatch routing.", color: "#0ea5e9" },
  { title: "ContentForge", category: "AI Tool", desc: "AI content generation platform used by 10,000+ marketers. GPT-powered writing, SEO scoring, and brand voice training.", color: "#f59e0b" },
  { title: "MediSync", category: "Healthcare SaaS", desc: "Hospital workflow automation connecting EMR, billing, and scheduling. Reduced admin overhead by 65% across 12 hospitals.", color: "#10b981" },
  { title: "RetailOS", category: "E-commerce System", desc: "Unified retail operating system with inventory AI, demand forecasting, and omnichannel order management for enterprise retail.", color: "#f43f5e" },
];

const TESTIMONIALS = [
  { name: "Arjun Mehta", role: "CEO, NeuralHire", avatar: "AM", text: "SIO Technologies transformed our hiring process completely. Their AI automation work was leagues ahead of anything we'd seen. Delivered on time, under budget, and exceeded every expectation.", rating: 5 },
  { name: "Sarah Chen", role: "CTO, QuantumPay", avatar: "SC", text: "The SaaS infrastructure they built for us is rock solid. Two years later, we've scaled 10x and haven't had to rebuild a single core system. These people know engineering.", rating: 5 },
  { name: "Rahul Verma", role: "Operations Director, LogiFleet", avatar: "RV", text: "Our fleet management was chaos before SIO. Now it's our competitive advantage. The system they delivered was so good, we use it as a selling point to clients.", rating: 5 },
  { name: "Emily Torres", role: "Founder, ContentForge", avatar: "ET", text: "From idea to launch in 8 weeks. The design quality, the speed, the attention to detail — I've worked with a lot of agencies. SIO is genuinely different. They feel like a co-founder.", rating: 5 },
];

const FAQ = [
  { q: "How long does a typical project take?", a: "Timelines vary by scope. A landing site takes 1-2 weeks. A full SaaS MVP typically takes 6-10 weeks. Enterprise systems are scoped individually. We provide a detailed timeline before any engagement begins." },
  { q: "Do you work with startups or only enterprises?", a: "Both. We love working with early-stage founders who have ambitious visions, and we have the enterprise experience to handle complex, large-scale systems. Our pricing and packages are structured for both." },
  { q: "What technologies do you specialize in?", a: "React, Next.js, Node.js, Python, PostgreSQL, AWS/GCP, and modern AI frameworks (OpenAI, LangChain, Pinecone). We choose the right stack for your specific needs, not the trendy one." },
  { q: "Do you offer post-launch support?", a: "Yes. All projects include 30 days of post-launch support. We offer ongoing retainer plans for maintenance, feature additions, and technical advisory — many clients stay with us for years." },
  { q: "How is pricing structured?", a: "We offer fixed-price project engagements for well-scoped work, and time-and-materials retainers for ongoing partnerships. Book a consultation and we'll give you a transparent breakdown." },
  { q: "Can you integrate with our existing systems?", a: "Absolutely. API integration is one of our core services. We've connected hundreds of third-party services and can work with virtually any system that has an API or data export capability." },
];

// ─── SVG LOGO — faithful recreation of the circuit-S mark ────────────
function SIOLogo({ size = 36, showText = false }) {
  const id = `g${size}`;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`${id}a`} x1="20" y1="10" x2="80" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4FC3F7" />
            <stop offset="45%" stopColor="#00f5d4" />
            <stop offset="100%" stopColor="#1565C0" />
          </linearGradient>
          <filter id={`${id}glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Upper arc of S */}
        <path d="M60 14 C76 14 84 26 78 37 C72 48 57 49 50 50" stroke={`url(#${id}a)`} strokeWidth="6.5" strokeLinecap="round" fill="none" />
        {/* Lower arc of S */}
        <path d="M40 86 C24 86 16 74 22 63 C28 52 43 51 50 50" stroke={`url(#${id}a)`} strokeWidth="6.5" strokeLinecap="round" fill="none" />
        {/* Center glowing node */}
        <circle cx="50" cy="50" r="6" fill="#00f5d4" filter={`url(#${id}glow)`} opacity="0.85" />
        <circle cx="50" cy="50" r="3.5" fill="#fff" />
        {/* Terminal nodes */}
        <circle cx="60" cy="14" r="4.5" fill="none" stroke="#4FC3F7" strokeWidth="2.5" />
        <circle cx="40" cy="86" r="4.5" fill="none" stroke="#4FC3F7" strokeWidth="2.5" />
        {/* Branch endpoints upper-right */}
        <circle cx="80" cy="26" r="3.5" fill="none" stroke="#00f5d4" strokeWidth="2" />
        <line x1="80" y1="26" x2="92" y2="20" stroke="#1565C0" strokeWidth="2" strokeLinecap="round" />
        <line x1="80" y1="26" x2="92" y2="32" stroke="#1565C0" strokeWidth="2" strokeLinecap="round" />
        {/* Branch endpoints lower-left */}
        <circle cx="20" cy="74" r="3.5" fill="none" stroke="#00f5d4" strokeWidth="2" />
        <line x1="20" y1="74" x2="8" y2="68" stroke="#1565C0" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="74" x2="8" y2="80" stroke="#1565C0" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {showText && (
        <div style={{ lineHeight: 1.1 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: Math.round(size * 0.42), color: "#fff", letterSpacing: "-0.02em" }}>SIO</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: Math.round(size * 0.21), color: "#64748b", letterSpacing: "0.04em", textTransform: "uppercase" }}>Technologies</div>
        </div>
      )}
    </div>
  );
}

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, suffix, label, animate }) {
  const count = useCountUp(value, 1800, animate);
  return (
    <div style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
      <div style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, background: "linear-gradient(135deg, #00f5d4, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ color: "#94a3b8", fontSize: "0.82rem", marginTop: "0.5rem", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
    </div>
  );
}

function GridBg() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,245,212,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,212,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div style={{ position: "absolute", top: "8%", left: "18%", width: "42vw", height: "42vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.11) 0%, transparent 70%)", filter: "blur(50px)", animation: "bgpulse 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "15%", right: "8%", width: "32vw", height: "32vw", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,245,212,0.07) 0%, transparent 70%)", filter: "blur(50px)", animation: "bgpulse 11s ease-in-out infinite 2s" }} />
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, transition: "all 0.3s", background: scrolled ? "rgba(2,6,23,0.94)" : "transparent", backdropFilter: scrolled ? "blur(22px)" : "none", borderBottom: scrolled ? "1px solid rgba(0,245,212,0.07)" : "none", padding: "0 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
        <div style={{ cursor: "pointer" }} onClick={() => go("hero")}><SIOLogo size={44} showText={true} /></div>
        <div className="desktop-nav" style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => go(l.toLowerCase().replace(" ", "-"))}
              style={{ background: "none", border: "none", color: "#94a3b8", fontSize: "0.875rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "color 0.2s", letterSpacing: "0.01em" }}
              onMouseEnter={e => e.target.style.color = "#00f5d4"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>{l}
            </button>
          ))}
          <button onClick={() => window.open(COMPANY.whatsappLink, "_blank")}
            style={{ background: "linear-gradient(135deg, #00f5d4, #0ea5e9)", border: "none", borderRadius: 8, padding: "0.5rem 1.2rem", color: "#000", fontWeight: 700, fontSize: "0.875rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
            Get Started
          </button>
        </div>
        <button className="hamburger" onClick={() => setOpen(!open)}
          style={{ display: "none", background: "none", border: "1px solid rgba(0,245,212,0.25)", borderRadius: 8, color: "#00f5d4", fontSize: 20, cursor: "pointer", padding: "0.3rem 0.75rem" }}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      {open && (
        <div style={{ background: "rgba(2,6,23,0.98)", backdropFilter: "blur(20px)", padding: "1rem 2rem 2rem", borderTop: "1px solid rgba(0,245,212,0.08)" }}>
          {NAV_LINKS.map(l => (
            <div key={l} onClick={() => go(l.toLowerCase().replace(" ", "-"))}
              style={{ padding: "0.85rem 0", color: "#94a3b8", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "1rem" }}>{l}</div>
          ))}
          <button onClick={() => { window.open(COMPANY.whatsappLink, "_blank"); setOpen(false); }}
            style={{ marginTop: "1.25rem", width: "100%", background: "linear-gradient(135deg, #25D366, #128C7E)", border: "none", borderRadius: 10, padding: "0.9rem", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem" }}>
            💬 Chat on WhatsApp
          </button>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const words = ["AI Automation", "Scalable SaaS", "Smart Systems", "Digital Growth"];
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => { setWordIdx(i => (i + 1) % words.length); setFade(true); }, 400);
    }, 2800);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8rem 2rem 4rem", position: "relative" }}>
      <div style={{ maxWidth: 920, position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(0,245,212,0.07)", border: "1px solid rgba(0,245,212,0.18)", borderRadius: 100, padding: "0.4rem 1.2rem", marginBottom: "2.5rem" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#00f5d4", animation: "bgpulse 2s ease-in-out infinite" }} />
          <span style={{ color: "#00f5d4", fontSize: "0.78rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", textTransform: "uppercase" }}>Seamless Intelligence Operations</span>
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem, 7vw, 5.5rem)", lineHeight: 1.06, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 0.35rem" }}>
          We Build the Tech<br />Powering Tomorrow's
        </h1>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem, 7vw, 5.5rem)", lineHeight: 1.06, letterSpacing: "-0.03em", background: "linear-gradient(135deg, #00f5d4 0%, #7c3aed 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 1.75rem", transition: "opacity 0.38s", opacity: fade ? 1 : 0, minHeight: "1.15em" }}>
          {words[idx]}
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "clamp(1rem, 2.4vw, 1.2rem)", lineHeight: 1.8, maxWidth: 640, margin: "0 auto 2.5rem", fontFamily: "'DM Sans', sans-serif" }}>
          SIO Technologies is an elite software studio based in Bihar, India. We design, build, and launch AI-powered products, custom business systems, and scalable SaaS platforms for ambitious teams worldwide.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={COMPANY.whatsappLink} target="_blank" rel="noreferrer"
            style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", border: "none", borderRadius: 10, padding: "0.9rem 1.8rem", color: "#fff", fontWeight: 700, fontSize: "1rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 0 30px rgba(37,211,102,0.25)", display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(37,211,102,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(37,211,102,0.25)"; }}>
            💬 WhatsApp Us
          </a>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ background: "linear-gradient(135deg, #00f5d4, #0ea5e9)", border: "none", borderRadius: 10, padding: "0.9rem 1.8rem", color: "#000", fontWeight: 700, fontSize: "1rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", boxShadow: "0 0 30px rgba(0,245,212,0.25)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(0,245,212,0.45)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,245,212,0.25)"; }}>
            Book a Consultation →
          </button>
        </div>
        <div style={{ marginTop: "3.5rem", display: "flex", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap" }}>
          {["Trusted by clients worldwide", "Fast delivery guaranteed", "Built to scale"].map(t => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#475569", fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ color: "#00f5d4", fontWeight: 700 }}>✓</span> {t}
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "3rem", left: "50%", animation: "bounce 2s ease-in-out infinite" }}>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, rgba(0,245,212,0.45))", margin: "0 auto" }} />
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00f5d4", margin: "4px auto 0" }} />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
        <div>
          <div style={{ color: "#00f5d4", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: "1rem" }}>About SIO Technologies</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
            Where Engineering<br />Meets <span style={{ background: "linear-gradient(135deg, #00f5d4, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Intelligence</span>
          </h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", marginBottom: "1.25rem" }}>
            SIO Technologies — <em>Seamless Intelligence Operations</em> — was founded with one mission: to give businesses access to the same caliber of technology that powers the world's most successful companies, regardless of their size.
          </p>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", marginBottom: "2rem" }}>
            Based in Motihari, Bihar, we're a team of engineers, AI researchers, and product designers obsessed with building systems that are fast, beautiful, and built to last. From early-stage startups to scaling enterprises, we architect technology that becomes a genuine competitive advantage.
          </p>
          <div style={{ display: "flex", gap: "2.5rem" }}>
            {[["6+", "Years"], ["120+", "Projects"], ["40+", "Clients"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#00f5d4" }}>{n}</div>
                <div style={{ color: "#64748b", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative" }}>
          {/* Logo showcase */}
          <div style={{ background: "linear-gradient(135deg, rgba(0,245,212,0.05), rgba(124,58,237,0.06))", border: "1px solid rgba(0,245,212,0.12)", borderRadius: 24, padding: "2.5rem", backdropFilter: "blur(20px)", textAlign: "center", marginBottom: "1.25rem" }}>
            <SIOLogo size={90} />
            <div style={{ marginTop: "1.25rem" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.9rem", color: "#fff", letterSpacing: "-0.02em" }}>SIO Technologies</div>
              <div style={{ color: "#00f5d4", fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginTop: "0.35rem" }}>Seamless Intelligence Operations</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
            {[{ title: "AI-First Mindset", icon: "🧠", desc: "Every solution is designed with AI augmentation at its core." },
              { title: "Full-Stack Team", icon: "⚡", desc: "From backend infra to pixel-perfect UI — all in-house." },
              { title: "Product Thinking", icon: "🎯", desc: "We solve business problems, not just write code." },
              { title: "Radical Transparency", icon: "🔍", desc: "Clear pricing, real timelines, and honest updates — always." }
            ].map(({ title, icon, desc }) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "1.1rem" }}>
                <div style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>{icon}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#e2e8f0", fontSize: "0.875rem", marginBottom: "0.35rem" }}>{title}</div>
                <div style={{ color: "#64748b", fontSize: "0.78rem", lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [hov, setHov] = useState(null);
  return (
    <section id="services" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ color: "#00f5d4", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: "1rem" }}>What We Do</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "1rem" }}>
            Services Built for the<br /><span style={{ background: "linear-gradient(135deg, #00f5d4, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Modern Enterprise</span>
          </h2>
          <p style={{ color: "#64748b", maxWidth: 480, margin: "0 auto", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, fontSize: "0.95rem" }}>
            Six core service lines engineered to deliver measurable business outcomes.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: "1.1rem" }}>
          {SERVICES.map((s, i) => (
            <div key={s.title} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ background: hov === i ? "rgba(0,245,212,0.035)" : "rgba(255,255,255,0.02)", border: `1px solid ${hov === i ? "rgba(0,245,212,0.22)" : "rgba(255,255,255,0.06)"}`, borderRadius: 16, padding: "1.85rem", transition: "all 0.28s", transform: hov === i ? "translateY(-4px)" : "none", boxShadow: hov === i ? "0 20px 60px rgba(0,245,212,0.07)" : "none" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div style={{ fontSize: "1.85rem" }}>{s.icon}</div>
                <span style={{ background: "rgba(0,245,212,0.09)", border: "1px solid rgba(0,245,212,0.18)", borderRadius: 100, padding: "0.18rem 0.65rem", fontSize: "0.68rem", color: "#00f5d4", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.06em" }}>{s.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#e2e8f0", marginBottom: "0.65rem" }}>{s.title}</h3>
              <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: "0.875rem", fontFamily: "'DM Sans', sans-serif", margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section ref={ref} style={{ padding: "4rem 2rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", background: "linear-gradient(135deg, rgba(0,245,212,0.04), rgba(124,58,237,0.04))", border: "1px solid rgba(0,245,212,0.09)", borderRadius: 24, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{ borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
            <StatCard {...s} animate={vis} />
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section id="why-us" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ color: "#00f5d4", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: "1rem" }}>Why SIO</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            The <span style={{ background: "linear-gradient(135deg, #00f5d4, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SIO Advantage</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "1.25rem" }}>
          {WHY_US.map((w) => (
            <div key={w.title} style={{ textAlign: "center", padding: "2rem 1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, transition: "all 0.28s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,245,212,0.2)"; e.currentTarget.style.background = "rgba(0,245,212,0.03)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <div style={{ fontSize: "2.3rem", marginBottom: "0.9rem" }}>{w.icon}</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#e2e8f0", fontSize: "0.95rem", marginBottom: "0.65rem" }}>{w.title}</h3>
              <p style={{ color: "#64748b", fontSize: "0.845rem", lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const [hov, setHov] = useState(null);
  return (
    <section id="portfolio" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ color: "#00f5d4", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: "1rem" }}>Our Work</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Projects That <span style={{ background: "linear-gradient(135deg, #00f5d4, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Define Industries</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: "1.1rem" }}>
          {PORTFOLIO.map((p, i) => (
            <div key={p.title} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ position: "relative", overflow: "hidden", borderRadius: 16, border: `1px solid ${hov === i ? p.color + "44" : "rgba(255,255,255,0.06)"}`, background: "rgba(255,255,255,0.02)", transition: "all 0.35s", transform: hov === i ? "translateY(-6px)" : "none", boxShadow: hov === i ? `0 28px 60px ${p.color}14` : "none", minHeight: 210, padding: "1.85rem" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${p.color}, transparent)`, opacity: hov === i ? 1 : 0, transition: "opacity 0.28s" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: p.color, background: p.color + "14", border: `1px solid ${p.color}28`, borderRadius: 100, padding: "0.18rem 0.65rem", letterSpacing: "0.06em" }}>{p.category}</span>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: p.color + "14", border: `1px solid ${p.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>⬡</div>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#e2e8f0", fontSize: "1.2rem", marginBottom: "0.65rem" }}>{p.title}</h3>
              <p style={{ color: "#64748b", fontSize: "0.845rem", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ color: "#00f5d4", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: "1rem" }}>Testimonials</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            What Our Clients <span style={{ background: "linear-gradient(135deg, #00f5d4, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Say</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "1.1rem" }}>
          {TESTIMONIALS.map((t) => (
            <div key={t.name} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "1.85rem", transition: "all 0.28s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,245,212,0.15)"; e.currentTarget.style.background = "rgba(0,245,212,0.02)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
              <div style={{ color: "#00f5d4", fontSize: "1.1rem", marginBottom: "0.9rem" }}>{"★".repeat(t.rating)}</div>
              <p style={{ color: "#94a3b8", lineHeight: 1.75, fontFamily: "'DM Sans', sans-serif", fontSize: "0.875rem", marginBottom: "1.4rem", fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, #00f5d4, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#000", flexShrink: 0 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#e2e8f0", fontSize: "0.875rem" }}>{t.name}</div>
                  <div style={{ color: "#64748b", fontSize: "0.775rem", fontFamily: "'DM Sans', sans-serif" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ color: "#00f5d4", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: "1rem" }}>FAQ</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Frequently Asked <span style={{ background: "linear-gradient(135deg, #00f5d4, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Questions</span>
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
          {FAQ.map((f, i) => (
            <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${open === i ? "rgba(0,245,212,0.2)" : "rgba(255,255,255,0.06)"}`, borderRadius: 12, overflow: "hidden", transition: "border-color 0.25s" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "1.2rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: "#e2e8f0", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "0.92rem", textAlign: "left", gap: "1rem" }}>
                <span>{f.q}</span>
                <span style={{ color: "#00f5d4", fontSize: "1.4rem", transition: "transform 0.28s", transform: open === i ? "rotate(45deg)" : "none", flexShrink: 0, lineHeight: 1 }}>+</span>
              </button>
              {open === i && <div style={{ padding: "0 1.5rem 1.2rem", color: "#64748b", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.72, fontSize: "0.875rem" }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const iStyle = { width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "0.85rem 1rem", color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" };
  const socials = [
    { label: "WhatsApp", color: "#25D366", icon: "💬", href: COMPANY.whatsappLink },
    { label: "Instagram", color: "#E1306C", icon: "📸", href: COMPANY.instagram },
    { label: "LinkedIn", color: "#0A66C2", icon: "in", href: COMPANY.linkedin },
  ];
  return (
    <section id="contact" style={{ padding: "6rem 2rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div style={{ color: "#00f5d4", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: "1rem" }}>Get In Touch</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Ready to Build Something <span style={{ background: "linear-gradient(135deg, #00f5d4, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Extraordinary?</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "3rem", alignItems: "start" }}>
          <div>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#e2e8f0", marginBottom: "1.5rem", fontSize: "1.2rem" }}>Contact Information</h3>
            {[
              { icon: "✉️", label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
              { icon: "💬", label: "WhatsApp", value: COMPANY.whatsapp, href: COMPANY.whatsappLink },
              { icon: "📍", label: "Location", value: COMPANY.location, href: null },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.4rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(0,245,212,0.09)", border: "1px solid rgba(0,245,212,0.18)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ color: "#64748b", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.2rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.label}</div>
                  {c.href
                    ? <a href={c.href} target="_blank" rel="noreferrer" style={{ color: "#00f5d4", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, textDecoration: "none", fontSize: "0.92rem" }}
                        onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
                        onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}>{c.value}</a>
                    : <div style={{ color: "#e2e8f0", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.92rem" }}>{c.value}</div>
                  }
                </div>
              </div>
            ))}
            {/* WhatsApp CTA button */}
            <a href={COMPANY.whatsappLink} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "0.85rem", background: "linear-gradient(135deg, #25D366, #128C7E)", borderRadius: 12, padding: "1rem 1.4rem", textDecoration: "none", marginBottom: "1.5rem", marginTop: "0.5rem", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
              <span style={{ fontSize: "1.4rem" }}>💬</span>
              <div>
                <div style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.92rem" }}>Chat on WhatsApp</div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.775rem", fontFamily: "'DM Sans', sans-serif" }}>{COMPANY.whatsapp}</div>
              </div>
            </a>
            <div style={{ color: "#475569", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>Follow Us</div>
            <div style={{ display: "flex", gap: "0.7rem" }}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                  style={{ width: 46, height: 46, borderRadius: 10, background: s.color + "14", border: `1px solid ${s.color}38`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: s.icon.length > 2 ? "1.1rem" : "0.85rem", color: s.color, fontWeight: 800, fontFamily: "sans-serif", transition: "all 0.2s", textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.background = s.color + "2a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = s.color + "14"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "2.25rem" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✅</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#00f5d4", fontWeight: 700, marginBottom: "0.65rem", fontSize: "1.4rem" }}>Message Sent!</h3>
                <p style={{ color: "#64748b", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65, fontSize: "0.92rem" }}>We'll reply within 24 hours.<br />For faster response, reach us on WhatsApp.</p>
                <a href={COMPANY.whatsappLink} target="_blank" rel="noreferrer"
                  style={{ display: "inline-block", marginTop: "1.5rem", background: "#25D366", borderRadius: 10, padding: "0.75rem 1.5rem", color: "#fff", fontWeight: 700, textDecoration: "none", fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem" }}>
                  💬 Open WhatsApp
                </a>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#e2e8f0", marginBottom: "1.4rem", fontSize: "1.05rem" }}>Send Us a Message</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "0.85rem" }}>
                  <div>
                    <label style={{ display: "block", color: "#64748b", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Your Name *</label>
                    <input name="name" value={form.name} onChange={handle} placeholder="Your name" required style={iStyle}
                      onFocus={e => e.target.style.borderColor = "rgba(0,245,212,0.38)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                  </div>
                  <div>
                    <label style={{ display: "block", color: "#64748b", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handle} placeholder="you@email.com" required style={iStyle}
                      onFocus={e => e.target.style.borderColor = "rgba(0,245,212,0.38)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                  </div>
                </div>
                <div style={{ marginBottom: "0.85rem" }}>
                  <label style={{ display: "block", color: "#64748b", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Company (optional)</label>
                  <input name="company" value={form.company} onChange={handle} placeholder="Your company" style={iStyle}
                    onFocus={e => e.target.style.borderColor = "rgba(0,245,212,0.38)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
                <div style={{ marginBottom: "1.4rem" }}>
                  <label style={{ display: "block", color: "#64748b", fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Your Project *</label>
                  <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us what you want to build..." required rows={4} style={{ ...iStyle, resize: "vertical", minHeight: 105 }}
                    onFocus={e => e.target.style.borderColor = "rgba(0,245,212,0.38)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
                <button type="submit" style={{ width: "100%", background: "linear-gradient(135deg, #00f5d4, #0ea5e9)", border: "none", borderRadius: 10, padding: "0.95rem", color: "#000", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s", boxShadow: "0 0 28px rgba(0,245,212,0.18)" }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  Send Message →
                </button>
                <p style={{ color: "#334155", fontSize: "0.72rem", fontFamily: "'DM Sans', sans-serif", textAlign: "center", marginTop: "0.75rem" }}>
                  Or email directly: <a href={`mailto:${COMPANY.email}`} style={{ color: "#00f5d4", textDecoration: "none" }}>{COMPANY.email}</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "4rem 2rem 2rem", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "2.5rem", marginBottom: "3rem" }}>
          <div>
            <div style={{ marginBottom: "1rem" }}><SIOLogo size={50} showText={true} /></div>
            <p style={{ color: "#64748b", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, fontSize: "0.845rem", maxWidth: 260, marginBottom: "0.85rem" }}>
              Elite software engineering for ambitious businesses. We build the technology that powers tomorrow.
            </p>
            <div style={{ color: "#475569", fontSize: "0.775rem", fontFamily: "'DM Sans', sans-serif" }}>📍 {COMPANY.location}</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem", fontSize: "0.875rem" }}>Services</div>
            {["AI Automation", "Website Development", "SaaS Solutions", "API Integrations", "Business Systems"].map(l => (
              <div key={l} style={{ color: "#64748b", fontSize: "0.845rem", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.55rem" }}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem", fontSize: "0.875rem" }}>Company</div>
            {[["About Us", "about"], ["Portfolio", "portfolio"], ["Testimonials", "testimonials"], ["FAQ", "faq"]].map(([l, id]) => (
              <div key={l} onClick={() => go(id)} style={{ color: "#64748b", fontSize: "0.845rem", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.55rem", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#00f5d4"}
                onMouseLeave={e => e.currentTarget.style.color = "#64748b"}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#e2e8f0", marginBottom: "1rem", fontSize: "0.875rem" }}>Connect</div>
            {[
              { label: "💬 WhatsApp", href: COMPANY.whatsappLink },
              { label: "📸 Instagram", href: COMPANY.instagram },
              { label: "in LinkedIn", href: COMPANY.linkedin },
              { label: "✉️ " + COMPANY.email, href: `mailto:${COMPANY.email}` },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{ display: "block", color: "#64748b", fontSize: "0.845rem", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.55rem", cursor: "pointer", transition: "color 0.2s", textDecoration: "none", wordBreak: "break-all" }}
                onMouseEnter={e => e.currentTarget.style.color = "#00f5d4"}
                onMouseLeave={e => e.currentTarget.style.color = "#64748b"}>{l.label}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ color: "#334155", fontSize: "0.775rem", fontFamily: "'DM Sans', sans-serif" }}>© 2025 SIO Technologies. All rights reserved.</div>
          <div style={{ color: "#334155", fontSize: "0.775rem", fontFamily: "'DM Sans', sans-serif" }}>Seamless Intelligence Operations · Motihari, Bihar, India</div>
        </div>
      </div>
    </footer>
  );
}

function Loader({ done }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#020617", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "opacity 0.6s, visibility 0.6s", opacity: done ? 0 : 1, visibility: done ? "hidden" : "visible" }}>
      <SIOLogo size={72} />
      <div style={{ marginTop: "1.1rem", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#fff", letterSpacing: "-0.02em" }}>SIO Technologies</div>
      <div style={{ color: "#00f5d4", fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginTop: "0.3rem", marginBottom: "2rem" }}>Seamless Intelligence Operations</div>
      <div style={{ width: 220, height: 2, background: "rgba(255,255,255,0.05)", borderRadius: 1, overflow: "hidden" }}>
        <div style={{ height: "100%", background: "linear-gradient(90deg, #00f5d4, #7c3aed)", borderRadius: 1, animation: "loadbar 1.7s ease-in-out forwards" }} />
      </div>
      <div style={{ marginTop: "0.9rem", color: "#1e293b", fontSize: "0.72rem", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}>INITIALIZING SYSTEMS...</div>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 2100); return () => clearTimeout(t); }, []);
  return (
    <div style={{ background: "#020617", minHeight: "100vh", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        @keyframes bgpulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.7;transform:scale(1.06)}}
        @keyframes bounce{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(9px)}}
        @keyframes loadbar{from{width:0}to{width:100%}}
        @media(max-width:768px){.desktop-nav{display:none!important}.hamburger{display:flex!important;align-items:center}}
        @media(max-width:860px){
          #about>div{grid-template-columns:1fr!important}
          #contact .contact-grid{grid-template-columns:1fr!important}
        }
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:#020617}
        ::-webkit-scrollbar-thumb{background:rgba(0,245,212,0.28);border-radius:3px}
        input::placeholder,textarea::placeholder{color:#334155}
      `}</style>
      <Loader done={loaded} />
      <GridBg />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <WhyUsSection />
      <PortfolioSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
