import { useState, useEffect } from "react";

const COLORS = {
  bg: "#E8E4D9",
  black: "#1A1A1A",
  white: "#FAFAF7",
  accent: "#FF4D00",
  blue: "#0038FF",
  green: "#00C853",
  yellow: "#FFD600",
  pink: "#FF6B9D",
  gray: "#B8B4A8",
};

const experiences = [
  { role: "Fullstack Developer", company: "Trustmedis", period: "Dec 2025 – Present", location: "Surabaya", color: COLORS.accent, desc: "Develop and maintain healthcare applications in an optimal, efficient, and scalable manner. Support application implementation and fulfill business requirements. Integrate applications with other systems for seamless interoperability across healthcare platforms." },
  { role: "Junior Backend Engineer", company: "PT Uniktif Media Indonesia", period: "Feb – May 2025", location: "Jakarta", color: COLORS.blue, desc: "Built Room Booking, Real Time Sync CMS, and AI-Integrated CMS managing 1,000+ data products. Implemented RBAC, WebSocket, and WebRTC for real-time communication. Designed synchronized multi-touchscreen displays for exhibitions with ~2,000 product images." },
  { role: "Backend Developer", company: "PT Nordspec Mandala Persada", period: "Sep 2023 – Jul 2024", location: "Remote", color: COLORS.green, desc: "Key contributor in 6-person team building Logistics, HRIS, and Government systems for 1,000+ users. Led geofencing, attendance tracking, ML integration, and accounting features. Built real-time chat for Web/Android/iOS and optimized Laravel queries." },
  { role: "Frontend Engineer", company: "PT Sagara Technology", period: "Aug – Nov 2022", location: "Jakarta", color: COLORS.yellow, desc: "Developed Total Politik political news system with React. Translated Figma designs into reusable code. Implemented Redux Toolkit state management and built comments, likes, dashboards features." },
  { role: "Frontend Developer", company: "Travens Indonesia", period: "Feb – Jun 2022", location: "Remote", color: COLORS.pink, desc: "Built tourism promotion and ticketing system. Created intuitive dashboards with Bootstrap and React. Implemented landing page, auth, payment, and profile pages." },
  { role: "Mentor", company: "CfDS UGM", period: "Aug – Oct 2021", location: "Remote", color: COLORS.blue, desc: "Digital Program Mentor via Progate, delivering live HTML/CSS/JS mentoring sessions to 950–1,000 participants. Provided private mentoring and project assessments." },
];

const skills = [
  { cat: "LANG", items: ["JavaScript", "TypeScript", "Golang", "PHP", "Python", "SQL"] },
  { cat: "FRAMEWORK", items: ["React", "NestJS", "Laravel", "Gin", "Django", "React Native"] },
  { cat: "TOOLS", items: ["Docker", "Git", "Linux", "AWS", "GCP", "GitHub Actions", "MySQL", "PostgreSQL"] },
];

const projects = [
  { name: "Bookshop", tech: "Golang/Gin + React", url: "https://books.cguritno.my.id", desc: "Full-stack bookstore with Rajaongkir API & CI/CD", color: COLORS.accent },
  { name: "Point of Sales", tech: "Laravel + MySQL", url: "https://pos.cguritno.my.id", desc: "POS for UMKM with RBAC & inventory management", color: COLORS.blue },
  { name: "AI Detector", tech: "React + Flask + OpenAI", url: "https://ai-detector-dashboard.vercel.app", desc: "GPT-4 & RoBERTa text classification system", color: COLORS.green },
];

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

function MarqueeText({ text, speed = 25, enabled = true }) {
  const anim = enabled ? `marquee ${speed}s linear infinite` : "none";
  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap", width: "100%" }}>
      <div style={{ display: "inline-block", animation: anim }}>
        {Array(6).fill(null).map((_, i) => (
          <span key={i} style={{ marginRight: 48 }}>{text}</span>
        ))}
      </div>
    </div>
  );
}

function Card({ children, style, hover = true, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `3px solid ${COLORS.black}`,
        background: COLORS.white,
        position: "relative",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        transform: hover && hovered ? "translate(-3px, -3px)" : "translate(0, 0)",
        boxShadow: hover && hovered ? `6px 6px 0px ${COLORS.black}` : `3px 3px 0px ${COLORS.black}`,
        transition: "all 0.15s cubic-bezier(0.2, 0, 0, 1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SkillTag({ label, color = COLORS.black }) {
  return (
    <span style={{
      display: "inline-block", padding: "4px 10px", border: `2px solid ${color}`,
      fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700,
      letterSpacing: 0.5, textTransform: "uppercase", margin: "3px",
      background: `${color}15`, color,
    }}>
      {label}
    </span>
  );
}

function TimeIndicator() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, fontWeight: 700 }}>
      {time.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "Asia/Jakarta" })} WIB
    </span>
  );
}

function SectionHead({ children }) {
  return (
    <div style={{
      fontFamily: "'Instrument Serif', serif", fontSize: "clamp(24px, 4vw, 32px)",
      fontStyle: "italic", color: COLORS.black, padding: "20px 0 4px",
      borderBottom: `3px solid ${COLORS.black}`,
    }}>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeExp, setActiveExp] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const w = useWindowWidth();
  const mobile = w < 700;
  const tablet = w >= 700 && w < 1024;

  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  const stagger = (i) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `all 0.5s cubic-bezier(0.2, 0, 0, 1) ${i * 0.06}s`,
  });

  const colorMap = [COLORS.accent, COLORS.blue, COLORS.green];

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "'IBM Plex Mono', monospace" }}>
      <style>{`
        
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes grain { 0%, 100% { transform: translate(0,0); } 10% { transform: translate(-5%,-10%); } 50% { transform: translate(12%,9%); } 90% { transform: translate(-1%,7%); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.black}; }
        body { overflow-x: hidden; }
      `}</style>

      {/* Grain */}
      <div style={{
        position: "fixed", top: "-50%", left: "-50%", width: "200%", height: "200%",
        background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
        pointerEvents: "none", zIndex: 999, animation: "grain 8s steps(10) infinite",
      }} />

      {/* Marquee */}
      <div style={{
        background: COLORS.black, color: COLORS.white, padding: mobile ? "8px 0" : "10px 0",
        fontFamily: "'IBM Plex Mono', monospace", fontSize: mobile ? 10 : 12, fontWeight: 700,
        letterSpacing: 2, textTransform: "uppercase", borderBottom: `3px solid ${COLORS.accent}`,
      }}>
        <MarqueeText text="★ SOFTWARE ENGINEER ★ FULL-STACK DEVELOPER ★ BACKEND SPECIALIST ★ OPEN FOR OPPORTUNITIES ★" enabled={!mobile} />
      </div>

      {/* Container */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: mobile ? "16px 12px 48px" : "24px 20px 60px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: mobile ? 12 : 16 }}>

          {/* === ROW 1: Hero + Location === */}
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "2fr 1fr",
            gap: mobile ? 12 : 16,
            ...stagger(0),
          }}>
            {/* Hero */}
            <Card style={{
              padding: mobile ? 24 : 32, display: "flex", flexDirection: "column",
              justifyContent: "space-between", background: COLORS.black, color: COLORS.white,
              minHeight: mobile ? 180 : 200,
            }} hover={false}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: COLORS.accent, marginBottom: 8, fontWeight: 700 }}>
                  PORTFOLIO / 2025
                </div>
                <h1 style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: mobile ? 36 : tablet ? 44 : "clamp(42px, 5vw, 64px)",
                  fontWeight: 400, lineHeight: 1.05, color: COLORS.white, margin: 0,
                }}>
                  Febriari Candra<br />
                  <span style={{ fontStyle: "italic", color: COLORS.accent }}>Guritno</span>
                </h1>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.green, animation: "blink 2s ease-in-out infinite", flexShrink: 0 }} />
                <span style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: COLORS.gray }}>Available for work</span>
              </div>
            </Card>

            {/* Location + Badge stacked */}
            <div style={{ display: "flex", flexDirection: "column", gap: mobile ? 12 : 16 }}>
              <Card style={{
                padding: mobile ? 18 : 20, display: "flex", flexDirection: "column",
                justifyContent: "center", background: COLORS.accent, flex: 1,
              }}>
                <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, color: COLORS.black, opacity: 0.6, marginBottom: 4 }}>BASED IN</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: mobile ? 20 : 22, fontWeight: 700, color: COLORS.black }}>Surabaya, ID</div>
                <div style={{ marginTop: 8, color: COLORS.black }}><TimeIndicator /></div>
              </Card>
              <Card style={{
                padding: mobile ? 16 : 20, display: "flex", alignItems: "center",
                justifyContent: "center", background: COLORS.yellow, flex: 0,
              }}>
                  <div style={{ textAlign: "center", padding: "4px 0" }}>
                    <a
                      href="/cv.pdf"
                      download
                      style={{
                        display: "inline-block",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 16,
                        fontWeight: 700,
                        color: COLORS.black,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        textDecoration: "none",
                      }}
                    >
                      DOWNLOAD CV
                    </a>
                  </div>
              </Card>
            </div>
          </div>

          {/* === ROW 2: About + Contact + Edu === */}
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "1fr 1fr",
            gap: mobile ? 12 : 16,
            ...stagger(2),
          }}>
            {/* About */}
            <Card style={{ padding: mobile ? 22 : 28 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, color: COLORS.accent, marginBottom: 12 }}>ABOUT</div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: mobile ? 14 : 15, lineHeight: 1.7, color: COLORS.black }}>
                Full-stack engineer with a proven track record building customer-centric systems serving <strong style={{ color: COLORS.accent }}>1,000+ users</strong>. Deep expertise in <strong>PHP/JS/Golang</strong> ecosystem with sharp business acumen in IT consulting infrastructure.
              </p>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: mobile ? 14 : 15, lineHeight: 1.7, color: COLORS.black, marginTop: 12 }}>
                Demonstrated ability to drive significant improvements in system performance and security while maintaining mission-critical reliability.
              </p>
            </Card>

            {/* Contact + Education stacked */}
            <div style={{ display: "flex", flexDirection: "column", gap: mobile ? 12 : 16 }}>
              <Card style={{ padding: mobile ? 18 : 20 }}>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, color: COLORS.accent, marginBottom: 12 }}>CONNECT</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[
                    { label: "EMAIL →", href: "mailto:febriaricandraproduction@gmail.com" },
                    { label: "LINKEDIN →", href: "https://linkedin.com/in/febriaricandra-guritno" },
                    { label: "GITHUB →", href: "https://github.com/febriaricandra" },
                    { label: "WEBSITE →", href: "https://me.cguritno.my.id" },
                  ].map((l) => (
                    <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{
                      padding: "8px 12px", border: `2px solid ${COLORS.black}`, background: "transparent",
                      fontFamily: "'IBM Plex Mono', monospace", fontSize: mobile ? 10 : 11, fontWeight: 700,
                      color: COLORS.black, textDecoration: "none", textTransform: "uppercase", letterSpacing: 0.5,
                      transition: "all 0.1s",
                    }}
                    onMouseEnter={e => { e.target.style.background = COLORS.black; e.target.style.color = COLORS.white; }}
                    onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = COLORS.black; }}
                    >{l.label}</a>
                  ))}
                </div>
              </Card>
              <Card style={{ padding: mobile ? 18 : 20, background: COLORS.blue, color: COLORS.white, flex: 1 }}>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, opacity: 0.6, marginBottom: 8 }}>EDUCATION</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: mobile ? 14 : 16, marginBottom: 4 }}>
                  B.Sc Informatics (Computer Science)
                </div>
                <div style={{ fontSize: 13, opacity: 0.8 }}>Universitas Teknologi Digital Indonesia</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 12, opacity: 0.7 }}>
                  <span>2019 – 2023</span>
                  <span style={{ fontWeight: 700, color: COLORS.yellow }}>GPA 3.29</span>
                </div>
              </Card>
            </div>
          </div>

          {/* === SKILLS === */}
          <div style={stagger(4)}>
            <SectionHead>Skills & Stack</SectionHead>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : "1fr 1fr 1fr",
            gap: mobile ? 12 : 16,
            ...stagger(5),
          }}>
            {skills.map((s, i) => (
              <Card key={s.cat} style={{ padding: mobile ? 18 : 20 }}>
                <div style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, color: colorMap[i], marginBottom: 12 }}>{s.cat}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                  {s.items.map(sk => <SkillTag key={sk} label={sk} color={colorMap[i]} />)}
                </div>
              </Card>
            ))}
          </div>

          {/* === EXPERIENCE === */}
          <div style={stagger(6)}>
            <SectionHead>Experience</SectionHead>
          </div>

          {mobile ? (
            /* Mobile: Accordion style */
            <div style={{ display: "flex", flexDirection: "column", gap: 12, ...stagger(7) }}>
              {experiences.map((exp, i) => (
                <Card key={i} style={{ padding: 0, overflow: "hidden" }} hover={false}>
                  <div
                    onClick={() => setActiveExp(activeExp === i ? -1 : i)}
                    style={{
                      padding: "16px 18px",
                      background: activeExp === i ? exp.color : COLORS.white,
                      color: activeExp === i ? (exp.color === COLORS.yellow ? COLORS.black : COLORS.white) : COLORS.black,
                      cursor: "pointer",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{exp.role}</div>
                      <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{exp.company}</div>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 700, transform: activeExp === i ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>+</span>
                  </div>
                  {activeExp === i && (
                    <div style={{ padding: "16px 18px", borderTop: `2px solid ${COLORS.black}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                        <span style={{ fontSize: 11, color: COLORS.gray, fontWeight: 700 }}>{exp.period}</span>
                        <span style={{
                          padding: "3px 8px", background: exp.color, fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                          color: exp.color === COLORS.yellow ? COLORS.black : COLORS.white,
                        }}>{exp.location}</span>
                      </div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, lineHeight: 1.7, color: COLORS.black, opacity: 0.85 }}>
                        {exp.desc}
                      </p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            /* Desktop/Tablet: Side panel */
            <div style={{
              display: "grid",
              gridTemplateColumns: tablet ? "1fr 2fr" : "1fr 2fr",
              gap: 16,
              ...stagger(7),
            }}>
              <Card style={{ padding: 0, overflow: "hidden", alignSelf: "start" }} hover={false}>
                {experiences.map((exp, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveExp(i)}
                    style={{
                      padding: "14px 18px",
                      borderBottom: i < experiences.length - 1 ? `2px solid ${COLORS.black}` : "none",
                      background: activeExp === i ? exp.color : COLORS.white,
                      color: activeExp === i ? (exp.color === COLORS.yellow ? COLORS.black : COLORS.white) : COLORS.black,
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 12, letterSpacing: 0.5 }}>{exp.company}</div>
                    <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>{exp.period}</div>
                  </div>
                ))}
              </Card>
              <Card style={{
                padding: tablet ? 24 : 32,
                borderLeft: `6px solid ${experiences[activeExp].color}`,
                alignSelf: "start",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: tablet ? 18 : 22, fontWeight: 700, color: COLORS.black }}>
                      {experiences[activeExp].role}
                    </div>
                    <div style={{ fontSize: 13, color: COLORS.accent, fontWeight: 700, marginTop: 4 }}>
                      @ {experiences[activeExp].company}
                    </div>
                  </div>
                  <div style={{
                    padding: "6px 12px", background: experiences[activeExp].color,
                    color: experiences[activeExp].color === COLORS.yellow ? COLORS.black : COLORS.white,
                    fontSize: 11, fontWeight: 700, letterSpacing: 1,
                  }}>
                    {experiences[activeExp].location}
                  </div>
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, lineHeight: 1.8,
                  color: COLORS.black, marginTop: 20, opacity: 0.85,
                }}>
                  {experiences[activeExp].desc}
                </div>
                <div style={{ marginTop: 16, fontSize: 12, color: COLORS.gray, fontWeight: 700, letterSpacing: 1 }}>
                  {experiences[activeExp].period}
                </div>
              </Card>
            </div>
          )}

          {/* === PROJECTS === */}
          <div style={stagger(8)}>
            <SectionHead>Projects</SectionHead>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: mobile ? "1fr" : tablet ? "1fr 1fr" : "1fr 1fr 1fr",
            gap: mobile ? 12 : 16,
            ...stagger(9),
          }}>
            {projects.map((p) => (
              <Card key={p.name} style={{ padding: 0, overflow: "hidden" }} onClick={() => window.open(p.url, "_blank")}>
                <div style={{ height: 8, background: p.color }} />
                <div style={{ padding: mobile ? 18 : 20 }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: mobile ? 16 : 18, fontWeight: 700, color: COLORS.black, marginBottom: 4 }}>
                    {p.name}
                  </div>
                  <div style={{
                    display: "inline-block", padding: "3px 8px", background: `${p.color}18`,
                    border: `1.5px solid ${p.color}`, fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                    color: p.color, marginBottom: 10, textTransform: "uppercase",
                  }}>{p.tech}</div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, lineHeight: 1.6, color: COLORS.black, opacity: 0.8 }}>
                    {p.desc}
                  </p>
                  <div style={{ marginTop: 12, fontSize: 11, fontWeight: 700, color: p.color, letterSpacing: 1 }}>
                    VIEW PROJECT →
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* === FOOTER === */}
          <div style={{
            borderTop: `3px solid ${COLORS.black}`, paddingTop: 20, marginTop: 8,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 12, ...stagger(10),
          }}>
            <div style={{ fontSize: mobile ? 10 : 12, color: COLORS.black, opacity: 0.5, letterSpacing: 1 }}>
              © 2025 FEBRIARI CANDRA GURITNO
            </div>
            <div style={{
              fontFamily: "'Instrument Serif', serif", fontSize: mobile ? 14 : 18,
              fontStyle: "italic", color: COLORS.black,
            }}>
              Built with passion & purpose ✦
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}