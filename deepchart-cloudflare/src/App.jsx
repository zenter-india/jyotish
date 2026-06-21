import { useState } from "react";

const tabs = [
  { id: "chart", title: "Chart", icon: "📐" },
  { id: "personality", title: "Personality", icon: "🧬" },
  { id: "shadow", title: "Shadow Self", icon: "🌑" },
  { id: "past5", title: "Past 5 Years", icon: "⏪" },
  { id: "career", title: "Career", icon: "💼" },
  { id: "marriage", title: "Marriage", icon: "💍" },
  { id: "wealth", title: "Wealth", icon: "💰" },
  { id: "health", title: "Health", icon: "🏥" },
  { id: "future", title: "What's Next", icon: "🔮" },
];

const planets = [
  { name: "Surya (Sun)", rashi: "Mesha", deg: "7°11'", nak: "Ashwini P3", house: 2, dignity: "EXALTED", color: "#fbbf24" },
  { name: "Chandra (Moon)", rashi: "Kanya", deg: "15°58'", nak: "Hasta P2", house: 7, dignity: "", color: "#e2e8f0" },
  { name: "Mangal (Mars)", rashi: "Simha", deg: "23°21'", nak: "P.Phalguni P3", house: 6, dignity: "", color: "#f87171" },
  { name: "Budha (Mercury)", rashi: "Mesha", deg: "14°17'", nak: "Bharani P1", house: 2, dignity: "", color: "#4ade80" },
  { name: "Guru (Jupiter)", rashi: "Makara", deg: "24°40'", nak: "Dhanishta P1", house: 11, dignity: "DEBILITATED", color: "#fb923c" },
  { name: "Shukra (Venus)", rashi: "Mesha", deg: "11°86'", nak: "Ashwini P4", house: 2, dignity: "", color: "#f472b6" },
  { name: "Shani (Saturn)", rashi: "Meena", deg: "19°05'", nak: "Revati P1", house: 1, dignity: "", color: "#60a5fa" },
  { name: "Rahu", rashi: "Kanya", deg: "3°41'", nak: "U.Phalguni P3", house: 7, dignity: "", color: "#a78bfa" },
  { name: "Ketu", rashi: "Meena", deg: "3°41'", nak: "U.Bhadra P1", house: 1, dignity: "", color: "#a78bfa" },
];

export default function DeepChart() {
  const [active, setActive] = useState("chart");

  const bg = "#06060e";
  const accent = "#f59e0b";
  const cyan = "#22d3ee";
  const green = "#4ade80";
  const red = "#f87171";
  const blue = "#60a5fa";
  const pink = "#f472b6";
  const text1 = "#f0ece4";
  const text2 = "rgba(255,255,255,0.45)";
  const card = "rgba(255,255,255,0.025)";
  const bdr = "rgba(255,255,255,0.07)";

  const Tag = ({ color, children }) => (
    <span style={{ background: `${color}15`, color, padding: "3px 9px", borderRadius: 11, fontSize: 9, fontWeight: 700, display: "inline-block", marginRight: 4, marginBottom: 4 }}>{children}</span>
  );

  const Card = ({ title, color, children }) => (
    <div style={{ background: card, border: `1px solid ${bdr}`, borderLeft: `3px solid ${color || accent}`, borderRadius: 8, padding: 12, marginBottom: 10 }}>
      {title && <div style={{ fontSize: 12, fontWeight: 700, color: color || accent, marginBottom: 8 }}>{title}</div>}
      <div style={{ fontSize: 11, color: text2, lineHeight: 1.85 }}>{children}</div>
    </div>
  );

  const Score = ({ label, value, color }) => (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, marginBottom: 3 }}>
        <span style={{ color: text2 }}>{label}</span><span style={{ color, fontWeight: 700 }}>{value}%</span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 3 }}>
        <div style={{ height: "100%", width: `${value}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, borderRadius: 3 }} />
      </div>
    </div>
  );

  const SouthChart = () => {
    const lagnaRashi = 11;
    const planetsByHouse = {};
    planets.forEach(p => { if (!planetsByHouse[p.house]) planetsByHouse[p.house] = []; planetsByHouse[p.house].push(p.name.split(" ")[0]); });
    const gridPos = [[0,0],[0,1],[0,2],[0,3],[1,0],[1,3],[2,0],[2,3],[3,0],[3,1],[3,2],[3,3]];
    const houseOrder = [12,1,2,3,4,5,6,7,8,9,10,11];
    const R = ['Mesha','Vrishabha','Mithuna','Kataka','Simha','Kanya','Thulam','Vrischika','Dhanus','Makara','Kumbha','Meena'];
    return (
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gridTemplateRows:"repeat(4,1fr)", width:"100%", maxWidth:340, aspectRatio:"1", gap:2, margin:"0 auto" }}>
        {gridPos.map(([r,c],i) => {
          const house=houseOrder[i]; const ri=(lagnaRashi+house-1)%12;
          const pl=planetsByHouse[house]||[]; const isL=house===1;
          return (<div key={i} style={{gridRow:r+1,gridColumn:c+1,background:isL?"rgba(245,158,11,0.12)":card,border:`1px solid ${isL?"rgba(245,158,11,0.4)":bdr}`,borderRadius:5,padding:3,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:accent,fontWeight:700,fontSize:8}}>{R[ri]}</span><span style={{color:text2,fontSize:7}}>H{house}</span>
            <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:1,marginTop:1}}>{pl.map(p=><span key={p} style={{background:"rgba(34,211,238,0.12)",color:cyan,padding:"0 3px",borderRadius:2,fontSize:7,fontWeight:600}}>{p}</span>)}</div>
          </div>);
        })}
        <div style={{gridRow:"2/4",gridColumn:"2/4",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"rgba(245,158,11,0.04)",border:`1px solid ${bdr}`,borderRadius:6}}>
          <span style={{fontSize:10,color:accent,fontWeight:800}}>ராசி கட்டம்</span>
          <span style={{fontSize:8,color:text2}}>Lagna: Meena</span><span style={{fontSize:8,color:text2}}>Moon: Kanya</span><span style={{fontSize:8,color:text2}}>Hasta Pada 2</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily:"'Georgia','Noto Serif',serif", background:`linear-gradient(160deg,${bg},#0e0818,#060e14)`, color:text1, minHeight:"100vh", paddingBottom:40 }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{height:3px}::-webkit-scrollbar-thumb{background:rgba(245,158,11,0.3);border-radius:4px}`}</style>

      <div style={{padding:"20px 16px 14px",textAlign:"center",borderBottom:`1px solid ${bdr}`,background:"linear-gradient(180deg,rgba(245,158,11,0.06) 0%,transparent 100%)"}}>
        <div style={{fontSize:9,letterSpacing:4,color:accent,textTransform:"uppercase"}}>Jyotish AI — Brutally Honest Analysis</div>
        <div style={{fontSize:22,fontWeight:800,color:accent,marginTop:4}}>திருக்கணித ஜாதகம்</div>
        <div style={{fontSize:10,color:text2,marginTop:6}}>April 21, 1997 • 5:30 AM • Pudukkottai • Male</div>
        <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:8,flexWrap:"wrap"}}>
          <Tag color={accent}>Meena Lagna</Tag><Tag color={cyan}>Hasta Moon</Tag><Tag color={green}>Sun Exalted ↑</Tag><Tag color={red}>Jupiter Debilitated ↓</Tag>
        </div>
      </div>

      <div style={{display:"flex",overflowX:"auto",gap:2,padding:"8px 10px",borderBottom:`1px solid ${bdr}`}}>
        {tabs.map(t=><button key={t.id} onClick={()=>setActive(t.id)} style={{background:active===t.id?"rgba(245,158,11,0.12)":"transparent",border:active===t.id?`1px solid rgba(245,158,11,0.3)`:"1px solid transparent",color:active===t.id?accent:text2,padding:"4px 7px",borderRadius:12,fontSize:8,fontWeight:600,whiteSpace:"nowrap",cursor:"pointer"}}>{t.icon} {t.title}</button>)}
      </div>

      <div style={{padding:16}}>

        {active==="chart" && (<div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:14}}>
            {[["லக்னம்","Meena (Pisces)"],["ராசி","Kanya (Virgo)"],["நட்சத்திரம்","Hasta P2"],["ஆத்மகாரகன்","Jupiter"],["தாரகாரகன்","Sun"],["தசா","Rahu (current)"]].map(([k,v])=>(
              <div key={k} style={{background:card,border:`1px solid ${bdr}`,borderRadius:6,padding:6}}>
                <div style={{fontSize:7,color:text2}}>{k}</div><div style={{fontSize:10,fontWeight:700,color:accent,marginTop:1}}>{v}</div>
              </div>))}
          </div>
          <SouthChart />
          <div style={{marginTop:14}}>
            {planets.map(p=>(<div key={p.name} style={{display:"flex",justifyContent:"space-between",padding:"5px 0",borderBottom:`1px solid ${bdr}`,fontSize:10}}>
              <span style={{color:p.color,fontWeight:600,width:"30%"}}>{p.name}</span>
              <span style={{color:text2,width:"18%"}}>{p.rashi}</span>
              <span style={{color:cyan,width:"22%",fontSize:9}}>{p.nak}</span>
              <span style={{color:accent,width:"8%"}}>H{p.house}</span>
              {p.dignity && <span style={{fontSize:7,color:p.dignity==="EXALTED"?green:red,fontWeight:700,width:"15%",textAlign:"right"}}>{p.dignity}</span>}
            </div>))}
          </div>
          <div style={{marginTop:12,background:"rgba(74,222,128,0.06)",border:"1px solid rgba(74,222,128,0.15)",borderRadius:8,padding:10}}>
            <div style={{fontSize:10,fontWeight:700,color:green,marginBottom:4}}>Yogas Detected</div>
            <div style={{fontSize:10,color:text2,lineHeight:1.7}}>
              <strong style={{color:text1}}>★ Sun EXALTED in Aries (H2)</strong> — Exceptional willpower and authority. Strongest Sun placement possible.<br/>
              <strong style={{color:text1}}>Budhaditya Yoga</strong> — Sun+Mercury in H2: sharp intellect, commanding speech.<br/>
              <strong style={{color:text1}}>Mars in 6th</strong> — Defeats enemies, overcomes obstacles, strong immunity.<br/>
              <strong style={{color:text1}}>No Mangal Dosha</strong> — Mars in H6 exempt.<br/>
              <strong style={{color:red}}>Jupiter Debilitated</strong> — Lagna lord weakened. Self-confidence issues. Gains require extra effort.
            </div>
          </div>
        </div>)}

        {active==="personality" && (<div>
          <Card title="The Core Duality — Soft Outside, Fire Inside" color={accent}>
            <span style={{color:text1}}>Pisces Lagna with Saturn + Ketu on it</span> gives the world a gentle, compassionate, spiritually-inclined person. He appears older than his age, serious, and naturally caring. People sense wisdom and a slight emotional distance. First impression: "he's a nice guy, soft-spoken, someone you can trust."
            <div style={{marginTop:8}}>But underneath, the <span style={{color:green}}>Sun is EXALTED in Aries</span> — the inner core is a fierce, authoritative warrior with real ambition. Soft outside, fire inside. When pushed, the gentle exterior cracks and reveals a commanding force that surprises everyone who thought they knew him.</div>
          </Card>
          <Card title="Revati Rising — The Final Star" color={blue}>
            Revati is the 27th and final nakshatra — ruled by Pushan, the shepherd god who guides souls to safety. This nakshatra is associated with <span style={{color:text1}}>healing, nurturing, completion, and safe journeys</span>. He is instinctively drawn to caring for others, fixing broken things, and making sure people around him are okay — often at the cost of his own needs.
          </Card>
          <Card title="Moon in Virgo (Hasta) — The Analyzing Mind" color={cyan}>
            Hasta means <span style={{color:text1}}>"the hand"</span> — extraordinary skill with hands, detail-oriented precision, and craftsmanship. His mind is <span style={{color:text1}}>analytical, perfectionist, and service-oriented</span>. He doesn't just feel emotions — he dissects them, examines them, tries to understand WHY he feels what he feels. This is brilliant for professional precision but exhausting for personal peace. The inner critic never sleeps.
            <div style={{marginTop:6}}>Virgo Moon in the <span style={{color:text1}}>7th house</span> means his emotional identity is completely tied to relationships. When partnerships are good, he feels good. When they're troubled, his entire sense of self destabilizes. This is the chart's single biggest vulnerability.</div>
          </Card>
          <Card title="Three Planets in 2nd House — Voice, Money, Values" color={green}>
            <span style={{color:text1}}>Sun (exalted) + Mercury + Venus all in Aries, 2nd house.</span> This stacks enormous energy in the house of wealth, speech, and family values. His voice carries authority when he uses it (exalted Sun). His communication is sharp and persuasive (Mercury). His aesthetic sense and appreciation for quality are refined (Venus). He is particular about money, food, and comfort — more than he admits to anyone.
          </Card>
          <Card title="Personality Meters" color={accent}>
            <Score label="Outer Gentleness (Pisces mask)" value={85} color={blue} />
            <Score label="Inner Ambition (Exalted Sun)" value={82} color={green} />
            <Score label="Emotional Dependency (Moon-Rahu H7)" value={88} color={red} />
            <Score label="Self-Confidence (Jupiter debilitated)" value={38} color={red} />
            <Score label="Resilience Under Pressure (Mars H6)" value={80} color={green} />
            <Score label="Analytical Ability (Hasta Moon)" value={90} color={cyan} />
            <Score label="Trust in Own Judgment" value={32} color={red} />
          </Card>
        </div>)}

        {active==="shadow" && (<div>
          <Card title="🌑 The Shadows — What He Won't Tell You" color={red}>
            Every chart has darkness. This one has specific, identifiable patterns that operate beneath conscious awareness. These aren't flaws to be ashamed of — they're blind spots that control behavior until made conscious.
          </Card>
          <Card title="1. The Confidence Wound" color={red}>
            <Tag color={red}>JUPITER DEBILITATED — LAGNA LORD + ATMAKARAKA</Tag>
            <div style={{marginTop:6}}><span style={{color:text1}}>Jupiter is both the Lagna lord (identity) AND the Atmakaraka (soul significator). And it's debilitated.</span> This is the deepest wound in the chart. He does not trust himself. He second-guesses every major decision. He seeks external validation before acting — asking friends, family, or anyone who'll listen to confirm what he already knows inside. His gut instinct is sharp (exalted Sun + Hasta Moon), but his debilitated Jupiter refuses to trust it. He'll research for weeks, ask 10 people, then still feel unsure. Meanwhile, people with half his ability are already doing what he's still planning.</div>
          </Card>
          <Card title="2. The Relationship Obsession" color={pink}>
            <Tag color={pink}>MOON + RAHU IN 7TH HOUSE</Tag>
            <div style={{marginTop:6}}><span style={{color:text1}}>His emotional world orbits around relationships.</span> Not in a romantic way — in an anxious, "what are they really thinking about me" way. He reads into every word, every silence, every delayed reply. He creates mental scenarios that don't exist. When in a relationship, his entire identity merges with the other person — which is suffocating for both parties. When single, there's an emptiness that nothing else fills. Rahu's influence means he's attracted to unconventional, complicated, or somehow unavailable people. The simple and stable feels boring. The dramatic and uncertain feels "real." This pattern guarantees emotional turbulence until he learns to ground his identity in himself, not in another person.</div>
          </Card>
          <Card title="3. The Hidden Ego" color={accent}>
            <Tag color={accent}>EXALTED SUN BEHIND PISCES MASK</Tag>
            <div style={{marginTop:6}}><span style={{color:text1}}>He WANTS power, recognition, and status</span> — but the Pisces-Saturn-Ketu exterior won't let him show it openly. So he pursues ambition through indirect channels. He won't say "I want to be on top." He'll frame it as "I'm doing this to help others" or "this is my duty." The ambition is disguised as service. This isn't hypocrisy — he genuinely cares. But the exalted Sun's ego is equally real and equally driving decisions. The shadow appears when he doesn't get the recognition he privately craves — resentment builds silently, and eventually explodes in unexpected ways.</div>
          </Card>
          <Card title="4. Saturn's Heaviness — The Early Burden" color={blue}>
            <Tag color={blue}>SATURN + KETU ON LAGNA</Tag>
            <div style={{marginTop:6}}><span style={{color:text1}}>He grew up fast.</span> Whether through family responsibility, health issues, financial pressure, or emotional isolation — childhood wasn't carefree. He became the "mature one" before he was ready. Saturn on the Lagna ages the body and the spirit. Ketu adds existential detachment — a feeling of "I don't fully belong here" that he's carried since childhood. He can be in a room full of people who love him and still feel fundamentally alone. This isn't depression (though it can look like it). It's Ketu's signature: the soul remembering it's just passing through.</div>
          </Card>
          <Card title="5. The Giving Trap" color={accent}>
            <Tag color={accent}>REVATI + PISCES + VENUS IN H2</Tag>
            <div style={{marginTop:6}}><span style={{color:text1}}>He gives too much — time, money, energy, emotional labor — and then quietly resents that nobody reciprocates at the same level.</span> Revati is the nurturer who feeds everyone but forgets to eat. Pisces absorbs other people's problems. Venus in the 2nd house makes him spend generously on people he cares about. The pattern: give freely → feel unappreciated → bottle the resentment → eventually either explode or withdraw completely. He needs to learn that setting boundaries isn't selfish — it's survival.</div>
          </Card>
        </div>)}

        {active==="past5" && (<div>
          <Card title="⏪ PAST 5 YEARS (2021–2026) — What Happened" color={accent}>
            The entire past 5 years falls within <span style={{color:text1}}>Rahu Mahadasha</span> (Nov 2009 – Nov 2027). Rahu is in the 7th house with Moon — meaning this entire 18-year period is relationship-and-partnership-dominated. Three distinct sub-periods shaped the last 5 years:
          </Card>

          <Card title="May 2021 – May 2024: Rahu-Venus (3 Years)" color={pink}>
            <Tag color={pink}>ROMANCE · MONEY · INTENSE CONNECTIONS</Tag>
            <div style={{marginTop:6}}>Venus sits in the 2nd house (Aries) — wealth, speech, and family. Rahu amplifying Venus during a period where Rahu is natally in the 7th house = this 3-year window was almost certainly <span style={{color:text1}}>dominated by a significant relationship or romantic chapter</span>. Someone entered his life who consumed his emotional attention entirely. The connection felt destined, intoxicating, and larger than life — because Rahu makes everything feel that way.</div>
            <div style={{marginTop:6}}>Financially, this was a period of <span style={{color:text1}}>fluctuating income</span> — money came in bursts but left just as fast. Venus in Aries makes spending impulsive, especially on people he cared about. He likely spent more than he should have on someone or something during this window.</div>
            <div style={{marginTop:6}}>Career had an <span style={{color:text1}}>unconventional, unstable quality</span> — growth was happening but the path felt uncertain. Like being on a moving train without knowing the final destination. Relocation, education changes, or career pivots are common during Rahu-Venus.</div>
          </Card>

          <Card title="May 2024 – April 2025: Rahu-Sun (11 Months)" color={green}>
            <Tag color={green}>RECOGNITION · CONFIDENCE · EGO SURGE</Tag>
            <div style={{marginTop:6}}>Sun is EXALTED in his 2nd house. When the strongest planet in the chart activates during Rahu Mahadasha, it creates a burst of <span style={{color:text1}}>authority, recognition, and confidence</span>. This was likely a period where he passed an important milestone, received recognition, gained a new position, or felt a surge of "I can actually do this." The exalted Sun's fire burned through Rahu's fog for 11 months.</div>
            <div style={{marginTop:6}}>However: Rahu + exalted Sun can <span style={{color:red}}>inflate ego past sustainability</span>. Promises or commitments made during mid-2024 to early-2025 that were driven by pride rather than practicality may have created complications that are being dealt with now.</div>
          </Card>

          <Card title="April 2025 – October 2026: Rahu-Moon (CURRENT)" color={red}>
            <Tag color={red}>EMOTIONAL INTENSITY · RELATIONSHIP CRISIS · ANXIETY</Tag>
            <div style={{marginTop:6}}>This is the most <span style={{color:text1}}>emotionally vulnerable window in years</span>. Moon is in the 7th house WITH Rahu natally. Now Moon is the active Antardasha lord within Rahu Mahadasha. Double activation of the 7th house = <span style={{color:red}}>partnership/relationship matters are consuming almost all emotional bandwidth</span>.</div>
            <div style={{marginTop:6}}>If there's a relationship situation happening right now — an active relationship in crisis, a breakup he can't get over, confusion about a partner, or someone who keeps appearing and disappearing — this Dasha combination is exactly why. Every relationship issue feels magnified to existential proportions.</div>
            <div style={{marginTop:6}}>Physically: irregular sleep, digestive issues, heightened anxiety, racing thoughts at night. Moon-Rahu activating together disturbs the mind's peace. Mental health is not optional during this period — it's a necessity.</div>
            <div style={{marginTop:6,color:green}}>This ends October 2026. The fog lifts. Mars period follows and restores action-oriented clarity.</div>
          </Card>

          <Card title="The 5-Year Arc in One Line" color={accent}>
            <div style={{fontSize:12,color:text1,lineHeight:1.8}}>
              A 3-year romantic/financial roller-coaster (2021-2024) → an 11-month ego boost and milestone (2024-2025) → an 18-month emotional reckoning that's still happening (2025-now). The throughline: Rahu kept him searching, unsettled, and growing through discomfort rather than through peace.
            </div>
          </Card>
        </div>)}

        {active==="career" && (<div>
          <Card title="Career DNA" color={cyan}>
            <span style={{color:text1}}>10th house is Dhanus (Sagittarius), lord Jupiter in 11th (debilitated).</span> Career connects to education, philosophy, healing, travel, law, consulting, or international work. Jupiter as 10th lord in 11th is structurally good (career → income connection), but debilitation means professional success requires extraordinary persistence. Nothing comes easily. Every promotion, opportunity, and milestone must be earned through relentless effort. No shortcuts work for this chart.
          </Card>
          <Card title="The 2nd House Power" color={green}>
            Three planets in the wealth house = <span style={{color:text1}}>his voice and communication are his most powerful career tools</span>. Exalted Sun gives commanding authority when he speaks. Mercury adds intellectual precision. Venus adds charm and aesthetic sense. Any career requiring persuasion, diagnosis, teaching, or client-facing interaction benefits enormously from this combination.
          </Card>
          <Card title="Mars in 6th — The Competitor" color={red}>
            Mars in the house of enemies, disease, and service = <span style={{color:text1}}>he excels in competitive environments, overcomes obstacles that stop others, and thrives in service-oriented roles</span>. When his back is against the wall, he doesn't collapse — he fights harder. This placement is classically associated with healing, law enforcement, military, competitive exams, and any field where defeating opposition is the daily job.
          </Card>
          <Card title="Career Timing" color={accent}>
            <span style={{color:text1}}>Rahu Mahadasha (until Nov 2027)</span> kept the career path unconventional and somewhat unstable. The real career establishment happens during <span style={{color:green}}>Jupiter Mahadasha (Nov 2027 – Nov 2043)</span>. Despite Jupiter being debilitated, it's the Lagna lord in the 11th house of gains — slow but steady career building over 16 years. Professional reputation solidifies by 2032-2035.
          </Card>
        </div>)}

        {active==="marriage" && (<div>
          <Card title="7th House — The Storm Center" color={pink}>
            <span style={{color:text1}}>Moon + Rahu together in the 7th house (Virgo)</span> is the defining marriage signature. Relationships are emotionally intense, magnetically attractive, and inherently turbulent. He doesn't do casual connections — every relationship feels like destiny. But Rahu adds illusion, amplification, and obsession. The partner may be from a different background, unconventional in some way, or connected to him through unusual circumstances.
          </Card>
          <Card title="Partner Profile" color={blue}>
            <span style={{color:text1}}>7th house sign: Kanya (Virgo)</span> — the partner is intelligent, detail-oriented, analytical, possibly health-conscious or in a service-oriented profession. <span style={{color:text1}}>7th lord Mercury in 2nd house with exalted Sun and Venus</span> — the partner is well-spoken, attractive, financially aware, and has a strong sense of self-worth. <span style={{color:text1}}>Darakaraka (spouse significator) is Sun — EXALTED</span> — the destined partner has a powerful personality, authority, dignity, and refuses to be dominated. A strong, independent partner who is his equal, not his follower.
          </Card>
          <Card title="Love vs Arranged" color={accent}>
            <span style={{color:text1}}>5th lord Moon in the 7th house</span> = love converts to marriage. He falls in love first, then marries. But Moon-Rahu makes the love path complicated — the person he falls for may not be the "expected" choice. Family may have reservations. The relationship has intensity that outsiders don't understand.
          </Card>
          <Card title="Marriage Timing" color={green}>
            <span style={{color:text1}}>Current Rahu-Moon period (until Oct 2026)</span> is the most emotionally charged relationship window — but NOT the best time for marriage decisions. Too much Rahu fog. <span style={{color:green}}>Best marriage window: 2028-2029</span> during early Jupiter Mahadasha when the Lagna lord stabilizes emotions and brings clarity. Marriage decisions made during Jupiter period have stronger foundations.
          </Card>
          <Card title="The Marriage Challenge — Honest Truth" color={red}>
            Debilitated Jupiter as 7th lord from Moon + Moon-Rahu in 7th = <span style={{color:text1}}>relationships are this chart's hardest lesson</span>. Not because he's bad at love — because he's TOO invested. He merges so completely with partners that he loses himself. Every relationship tests whether he can maintain his own identity while loving deeply. Until he solves this, the pattern repeats: intense attraction → emotional merging → anxiety → turbulence → painful growth or painful separation. The lesson isn't to love less. It's to love without losing himself.
          </Card>
        </div>)}

        {active==="wealth" && (<div>
          <Card title="Exceptional Wealth Potential" color={green}>
            <span style={{color:text1}}>Three planets in the 2nd house — Sun EXALTED + Mercury + Venus — in Aries</span> is one of the strongest wealth combinations in Vedic astrology. The earning potential is genuinely high. Authority, communication skills, and aesthetic sense all convert into income. This person WILL build significant wealth over their lifetime — but due to Jupiter debilitation, it comes through relentless effort rather than luck.
          </Card>
          <Card title="Income Pattern" color={blue}>
            <span style={{color:text1}}>Jupiter in 11th house (gains)</span> — despite debilitation, the Lagna lord in the income house connects identity directly to earning. Self-employment or entrepreneurship will eventually outperform salaried work. <span style={{color:text1}}>Saturn (11th lord) on Lagna</span> — personal effort is the engine of wealth. Nobody hands him anything. Everything is earned.
          </Card>
          <Card title="Financial Shadow" color={red}>
            Venus in Aries in 2nd = <span style={{color:text1}}>impulsive spending, especially on people he loves</span>. Generous to a fault. Pisces Lagna adds financial impracticality — compassion can lead to financial loss through lending or giving. The exalted Sun counters this with discipline but the tension exists: generous heart vs practical wallet.
          </Card>
          <Card title="Wealth Timing" color={accent}>
            Wealth grows significantly <span style={{color:text1}}>after age 30-32</span> as the exalted Sun matures. Jupiter Mahadasha (2027-2043) brings steady income growth through sustained effort. By late 30s, financial security is well-established.
          </Card>
        </div>)}

        {active==="health" && (<div>
          <Card title="Saturn + Ketu on Lagna — Primary Concern" color={red}>
            Saturn directly on the 1st house (body) can bring: <span style={{color:text1}}>bone, joint, and knee issues (especially after 30), dental problems, skin dryness, lower back pain, and slow-developing chronic conditions</span>. Ketu adds unexplained symptoms, sensitivity to environments, and psychosomatic patterns — stress directly becomes physical symptoms.
          </Card>
          <Card title="Mental Health — Non-Negotiable Attention Needed" color={pink}>
            <span style={{color:text1}}>Moon + Rahu in 7th</span> is the primary mental health concern. Anxiety, racing thoughts, sleep disturbances, and emotional turbulence are built into the chart's wiring. During the current Rahu-Moon period (until Oct 2026), these symptoms are at their peak intensity. Meditation, therapy, or structured mental health practices aren't luxury — they're survival tools.
          </Card>
          <Card title="Strengths" color={green}>
            <span style={{color:text1}}>Mars in 6th house</span> = strong disease-fighting ability, quick recovery, and powerful immunity when physically active. This is the saving grace. Regular exercise dramatically improves both physical and mental health. A sedentary lifestyle turns Mars energy inward and creates inflammation, anger, and restlessness.
          </Card>
          <Card title="Recommendations" color={blue}>
            Exercise 4x/week minimum — Mars in 6th NEEDS a physical outlet. Bone and joint care after 28 (calcium, vitamin D). Avoid alcohol and self-medication (Pisces + Rahu = substance sensitivity). Sleep hygiene is critical — Moon-Rahu disturbs sleep. Pranayama and meditation specifically benefit Revati rising natives. Regular health checkups — don't ignore chronic symptoms.
          </Card>
        </div>)}

        {active==="future" && (<div>
          <Card title="🔮 WHAT'S COMING" color={accent}>
            <span style={{color:text1}}>The next 18 months are a bridge between two life chapters.</span> Rahu Mahadasha ends November 2027. Jupiter Mahadasha begins. Everything changes.
          </Card>
          {[
            { period:"Now – Oct 2026", title:"Rahu-Moon (Current)", score:55, color:red, text:"The most emotionally intense phase. Relationship matters dominate. Anxiety peaks. Sleep struggles. The lesson: can you exist without defining yourself through another person? Endure this — it ends October 2026 and doesn't come back." },
            { period:"Oct 2026 – Nov 2027", title:"Rahu-Mars", score:72, color:green, text:"Energy returns. Mars in 6th activates — competition, career push, physical vitality, and enemy-defeating energy. The emotional fog lifts and action replaces anxiety. Career moves made here have teeth. Health improves through physical discipline. Possibly the most productive 13 months in years." },
            { period:"Nov 2027 – Dec 2029", title:"Jupiter-Jupiter (New Chapter)", score:65, color:accent, text:"The Lagna lord begins its 16-year reign. The first 2 years feel slow — Jupiter debilitated means the new chapter starts with uncertainty and self-doubt. But foundations being laid here determine everything for the next decade. Marriage is most likely during this window. Career finds its permanent direction." },
            { period:"2030 – 2032", title:"Jupiter matures", score:72, color:blue, text:"Sub-periods of stronger planets begin. Career establishment accelerates. Wealth grows steadily. Family responsibilities increase. The debilitated Jupiter starts delivering through sheer accumulated effort. By 32-35, this person is recognized and respected in their field." },
          ].map(y=>(<div key={y.period} style={{background:card,border:`1px solid ${bdr}`,borderRadius:12,padding:14,marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div><div style={{fontSize:12,fontWeight:800,color:y.color}}>{y.period}</div><div style={{fontSize:10,color:text2}}>{y.title}</div></div>
              <div style={{textAlign:"right"}}><div style={{fontSize:20,fontWeight:800,color:y.color}}>{y.score}</div><div style={{fontSize:8,color:text2}}>/100</div></div>
            </div>
            <div style={{fontSize:11,color:text2,lineHeight:1.8}}>{y.text}</div>
          </div>))}

          <Card title="The One Truth This Chart Keeps Repeating" color={accent}>
            <div style={{fontSize:12,color:text1,lineHeight:1.9}}>
              Every layer of this chart says the same thing: <span style={{color:accent,fontWeight:700}}>stop looking for yourself in other people.</span> Moon-Rahu in 7th seeks identity through relationships. Debilitated Jupiter seeks validation through external approval. Pisces Lagna absorbs other people's realities. But the exalted Sun in the 2nd house says the truth is the opposite — <span style={{color:green}}>your power is already inside you, fully formed, waiting to be claimed.</span> The moment you stop asking "do they love me, do they approve of me, do they see my value" and start saying "I know my value" — that exalted Sun ignites. And nothing in the zodiac burns brighter than an exalted Sun that finally believes in itself.
            </div>
          </Card>
        </div>)}
      </div>

      <div style={{padding:16,borderTop:`1px solid ${bdr}`,textAlign:"center"}}>
        <div style={{fontSize:7,color:"rgba(255,255,255,0.15)",lineHeight:1.6}}>Jyotish AI • Thirukkanitha Method • Lahiri Ayanamsa • Swiss Ephemeris • Classical Parashari + Jaimini Analysis • Brutally Honest Edition</div>
      </div>
    </div>
  );
}