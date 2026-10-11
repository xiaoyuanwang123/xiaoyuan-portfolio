import { motion } from "motion/react";
import { ArrowRight, BookOpen, Zap } from "lucide-react";

type Language = "zh" | "en";
type Row = { n: string; title: string; desc: string; tags: string[] };

const WEEKEND_URL = "https://wxy-weekend-guide-meituan2026.netlify.app";

export const vibeText = {
  zh: {
    intro: "为朋友规划行程、为棋盘给出建议、为大学生促成出发、为自己练习面试：先找准“谁在做什么判断”，再决定界面怎么帮他。",
    iterKicker: "迭代组合 · V1 → V2",
    iterTitle: "同一个问卷原型的两次迭代",
    iterSub: "从为一个人规划，到为一群人促成出发",
    iterKeep: "有意保留：选择题代替填空题 · 固定锚点 · 陪伴语气",
    wkLabel: "项目二 · V2",
    wkTitle: "周末城市探索指南",
    wkStatus: "❆ 已上线",
    wkCat: "推荐决策 · 组队闭环",
    wkDesc: "伦敦行程的迭代版：偏好、预算、人数、实时天气和距离一起算分，从推荐一路走到组队出发。",
    njLabel: "项目四",
    njTitle: "面试忍者 · AI PM 面试练习工具",
    njStatus: "❆ 已上线",
    njCat: "AI工具 · 面试训练 · 游戏化",
    njDesc: "模拟大厂面试官追问，五维度评分+参考答案+考后小结，内置完整面试宝典，每日打卡练习AI PM面试。",
    view: "查看详情",
  },
  en: {
    intro: "Planning a trip for a friend, advising a board-game player, getting students out the door, drilling myself for interviews: first find who is making which decision, then decide how the interface should help.",
    iterKicker: "Iteration · V1 → V2",
    iterTitle: "One questionnaire prototype, two iterations",
    iterSub: "From planning for one person to getting a group out the door",
    iterKeep: "Kept on purpose: choices over blanks · a fixed anchor · a companion's voice",
    wkLabel: "Project 2 · V2",
    wkTitle: "Weekend City Explorer",
    wkStatus: "Live",
    wkCat: "Recommendation · Group Loop",
    wkDesc: "The London planner, iterated: preferences, budget, group size, live weather and distance are scored together, from recommendation all the way to heading out as a group.",
    njLabel: "Project 4",
    njTitle: "Interview Ninja · AI PM Practice Tool",
    njStatus: "Live",
    njCat: "AI Tool · Interview Training · Gamification",
    njDesc: "Big-tech style follow-up drills, 5-dimension scoring, reference answers and a post-session recap. Built-in playbook and a daily streak.",
    view: "View Details",
  },
};

/* ---------- 卡片 ---------- */

function MiniCard({ color, bg, label, title, cat, desc, status, view, onClick }: {
  color: string; bg: string; label: string; title: string; cat: string; desc: string; status: string; view: string; onClick: () => void;
}) {
  return (
    <div onClick={onClick} className="group cursor-pointer p-6 md:p-7 rounded-2xl border-2 border-ink retro-card-hover flex flex-col" style={{ background: bg }}>
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-paper border border-ink rounded-xl shadow-[3px_3px_0_rgba(45,45,45,1)] group-hover:rotate-6 transition-transform" style={{ color }}><Zap className="w-6 h-6" /></div>
        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
      </div>
      <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color }}>{label}</p>
      <h3 className="text-xl md:text-2xl font-serif font-black mb-2">{title}</h3>
      <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color }}>{cat}</p>
      <p className="text-sm text-ink/70 font-medium leading-relaxed flex-1">{desc}</p>
      <div className="mt-6 pt-5 border-t border-ink/10 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xs"><BookOpen className="w-4 h-4" />{view}</div>
        <span className="text-[10px] font-bold" style={{ color }}>{status}</span>
      </div>
    </div>
  );
}

export function IterationCard({ lang, t, onLondon, onWeekend }: {
  lang: Language;
  t: { proj1Label: string; proj1Title: string; proj1Cat: string; proj1Desc: string; proj1Status: string; vibeCodingView: string };
  onLondon: () => void; onWeekend: () => void;
}) {
  const v = vibeText[lang];
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="md:col-span-2 p-5 md:p-8 rounded-3xl border-2 border-ink bg-white shadow-[5px_5px_0_rgba(45,45,45,1)]">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 mb-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#C2185B] mb-2">{v.iterKicker}</p>
          <h3 className="text-2xl md:text-3xl font-serif font-black">{v.iterTitle}</h3>
          <p className="text-sm text-ink/60 font-medium mt-1">{v.iterSub}</p>
        </div>
        <p className="text-[11px] text-ink/45 font-bold">{v.iterKeep}</p>
      </div>
      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-5 items-stretch">
        <MiniCard color="#E91E8C" bg="#FFF0F7" label={t.proj1Label} title={t.proj1Title} cat={t.proj1Cat} desc={t.proj1Desc} status={t.proj1Status} view={t.vibeCodingView} onClick={onLondon} />
        <div className="flex md:flex-col items-center justify-center gap-2 py-1">
          <span className="px-2.5 py-1 rounded-full bg-ink text-paper text-[10px] font-black whitespace-nowrap">V1 → V2</span>
          <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0 text-ink/60" />
        </div>
        <MiniCard color="#D97706" bg="#FFF8DB" label={v.wkLabel} title={v.wkTitle} cat={v.wkCat} desc={v.wkDesc} status={v.wkStatus} view={v.view} onClick={onWeekend} />
      </div>
    </motion.div>
  );
}

export function NinjaCard({ lang, onClick }: { lang: Language; onClick: () => void }) {
  const v = vibeText[lang];
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} onClick={onClick}
      className="group cursor-pointer p-8 rounded-2xl border-2 border-ink bg-[#F0F4FF] retro-card-hover">
      <div className="flex justify-between items-start mb-8">
        <div className="p-4 bg-paper border border-ink rounded-xl shadow-[3px_3px_0_rgba(45,45,45,1)] group-hover:rotate-6 transition-transform text-[#3B4FBF]"><Zap className="w-8 h-8" /></div>
        <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
      </div>
      <p className="text-[9px] font-black uppercase tracking-widest text-[#3B4FBF] mb-1">{v.njLabel}</p>
      <h3 className="text-2xl md:text-3xl font-serif font-black mb-2">{v.njTitle}</h3>
      <p className="text-xs font-bold uppercase tracking-wider mb-4 text-[#3B4FBF]">{v.njCat}</p>
      <p className="text-sm text-ink/70 font-medium leading-relaxed">{v.njDesc}</p>
      <div className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xs"><BookOpen className="w-4 h-4" />{v.view}</div>
        <span className="text-[10px] font-bold text-[#3B4FBF]">{v.njStatus}</span>
      </div>
    </motion.div>
  );
}



/* ---------- 通用：开头的结论 ---------- */

export function Verdict({ lang, color, text, facts, role }: {
  lang: Language; color: string; text: string; facts: [string, string][]; role?: string;
}) {
  return (
    <div className="mb-8 rounded-2xl border-2 border-ink bg-white overflow-hidden shadow-[3px_3px_0_rgba(45,45,45,1)]">
      <div className="grid md:grid-cols-[1.25fr_1fr]">
        <div className="p-5 md:p-6 border-b-2 md:border-b-0 md:border-r-2 border-ink/10" style={{ borderLeft: `5px solid ${color}` }}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2" style={{ color }}>{lang === "zh" ? "结论" : "Takeaway"}</p>
          <p className="text-lg md:text-xl font-serif font-black leading-snug text-ink">{text}</p>
          {role && <p className="text-xs text-ink/55 mt-3 leading-relaxed"><span className="font-black text-ink/70">{lang === "zh" ? "我的角色　" : "My role　"}</span>{role}</p>}
        </div>
        <div className="grid grid-cols-3">
          {facts.map(([n, d], i) => (
            <div key={i} className={`p-4 md:p-5 flex flex-col justify-center ${i < facts.length - 1 ? "border-r border-ink/10" : ""}`}>
              <span className="text-xl md:text-2xl font-serif font-black leading-none" style={{ color }}>{n}</span>
              <span className="text-[10px] md:text-[11px] text-ink/55 mt-2 leading-snug">{d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 通用：开头的真实截图条 ---------- */

export function ShotStrip({ url, href, openLabel, bar, link, bg, kind = "phone", shots }: {
  url: string; href?: string; openLabel?: string; bar: string; link: string; bg: string;
  kind?: "phone" | "desktop"; shots: { src: string; cap: string }[];
}) {
  return (
    <div className="border-2 border-ink rounded-2xl overflow-hidden shadow-[3px_3px_0_rgba(45,45,45,1)] mb-4">
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: bar }}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <span className="flex-1 text-center text-[10px] text-ink/40 font-mono truncate">{url}</span>
        {href && <a href={href} target="_blank" rel="noreferrer" className="text-[11px] font-bold" style={{ color: link }}>{openLabel}</a>}
      </div>
      <div className="p-4 md:p-6" style={{ background: bg }}>
        <div className={`grid gap-3 md:gap-6 ${kind === "phone" ? "grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
          {shots.map(s => (
            <figure key={s.src}>
              <div className={`rounded-xl overflow-hidden border-2 border-ink bg-white shadow-[3px_3px_0_rgba(45,45,45,1)] ${kind === "phone" ? "aspect-[390/860]" : "aspect-[16/10]"}`}>
                <img src={s.src} alt={s.cap} className="w-full h-full object-cover object-top" loading="lazy" />
              </div>
              <figcaption className="text-[10px] md:text-[11px] text-ink/55 mt-2 leading-snug">{s.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- 通用：工作流列表 ---------- */

function Rows({ rows, ring, fill, ink }: { rows: Row[]; ring: string; fill: string; ink: string }) {
  return (
    <div className="border border-ink/10 rounded-xl overflow-hidden">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-3 p-3.5 border-b border-ink/[0.07] bg-white last:border-b-0">
          <div className="w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5" style={{ borderColor: ring, background: fill, color: ink }}>{row.n}</div>
          <div>
            <p className="text-[13px] font-bold text-ink mb-1">{row.title}</p>
            <p className="text-[11px] text-ink/55 leading-relaxed">{row.desc}</p>
            <div className="flex gap-1.5 mt-1.5 flex-wrap">{row.tags.map(tag => <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-ink/5 text-ink/50">{tag}</span>)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-3 my-5">
      <span className="text-[10px] font-black uppercase tracking-widest text-ink/30 whitespace-nowrap">{children}</span>
      <div className="h-px flex-1 bg-ink/10" />
    </div>
  );
}

/* ---------- 周末指南弹窗 ---------- */

export function ModalWeekend({ lang }: { lang: Language }) {
  const zh = lang === "zh";
  const v = vibeText[lang];
  const shots = [
    { src: "weekend-1.jpg", cap: zh ? "① 首页即设计说明" : "① Design notes on the first screen" },
    { src: "weekend-2.jpg", cap: zh ? "② 可解释推荐：每张卡都写明理由" : "② Explainable picks: every card says why" },
    { src: "weekend-3.jpg", cap: zh ? "③ 地图：从学校出发按顺路连线" : "③ Map: a route that starts from campus" },
  ];
  const rows: Row[] = zh ? [
    { n: "01", title: "定义问题", desc: "大学生周末没出门，卡点往往不是缺信息，而是凑不齐人、怕踩坑、临时变天、不知道远不远。所以目标不是展示更多活动，而是提高「周末成行率」。", tags: ["核心洞察", "北极星指标"] },
    { n: "02", title: "可解释的推荐打分", desc: "偏好命中 +25；预算内 +15，超出 −35 并标出差额；人数适配 +10；雨天室内 +12、户外 −30；离学校 6 km 内 +8。每张卡都写明「为什么推荐」。", tags: ["规则设计", "可解释性"] },
    { n: "03", title: "从推荐到出发的闭环", desc: "人数不够时，主按钮从「组队」变成「人不够？组队」；地图从学校出发按顺路连线，算出公里数、耗时和人均花费；打卡一键转攻略，攻略又能一键组队。", tags: ["闭环", "UGC"] },
    { n: "04", title: "限时 30 分钟，先上线再迭代", desc: "先拿到可访问链接，再在同一链接上迭代：微卡通 + 毛玻璃视觉、首页设计说明与逐页引导、地图规划；并为国内访问去掉了外部依赖。", tags: ["Netlify", "先上线再迭代"] },
  ] : [
    { n: "01", title: "Define the Problem", desc: "Students often stay in on weekends not for lack of information, but because they can't get a group together, fear a bad pick, get caught by the weather, or can't tell how far things are. The goal is the weekend go-out rate, not more listings.", tags: ["Core insight", "North-star metric"] },
    { n: "02", title: "Explainable Scoring", desc: "Preference match +25; within budget +15, over budget −35 with the gap shown; group-size fit +10; rain: indoor +12, outdoor −30; within 6 km of campus +8. Every card says why it was picked.", tags: ["Rule design", "Explainability"] },
    { n: "03", title: "From Pick to Departure", desc: "When the group is too small, the main button turns into “Not enough people? Form a team”. The map routes stops from campus and shows distance, time and cost. Check-ins turn into guides, and guides turn into teams.", tags: ["Closed loop", "UGC"] },
    { n: "04", title: "30 Minutes, Ship Then Iterate", desc: "Got a public link first, then iterated on the same link: cartoon + glass visuals, design notes and step-by-step onboarding, map planning — and removed external dependencies for access from mainland China.", tags: ["Netlify", "Ship then iterate"] },
  ];
  const cmp: [string, string, string][] = zh ? [
    ["用户", "1 个具体的人", "一个群体（在校大学生）"],
    ["核心问题", "双向信息不对称", "凑人、踩坑、变天、距离"],
    ["问卷作用", "生成偏好标签，行程内容基本固定", "驱动打分排序，选项一变推荐就变"],
    ["天气", "按月份的静态气候表", "实时预报，直接参与排序"],
    ["空间", "只有时间线", "地图 + 顺路连线 + 公里 / 耗时 / 花费"],
    ["终点", "看完行程即结束", "组队 → 打卡 → 攻略，形成闭环"],
  ] : [
    ["User", "One specific person", "A group (university students)"],
    ["Core problem", "Two-way information gap", "Group, risk, weather, distance"],
    ["Questionnaire", "Produces tags; itinerary mostly fixed", "Drives the ranking; change an answer, the picks change"],
    ["Weather", "Static monthly climate table", "Live forecast, part of the score"],
    ["Space", "Timeline only", "Map + route + distance / time / cost"],
    ["End point", "Ends after reading the plan", "Team up → check in → guide, a closed loop"],
  ];
  return (
    <div className="font-sans max-w-5xl mx-auto">
      <div className="p-6 md:p-10 pb-4 border-b border-ink/10">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-ink text-paper rounded-full text-[9px] font-bold uppercase tracking-widest">Vibe Coding</span>
          <span className="px-3 py-1 bg-[#FFF8DB] text-[#B45309] rounded-full text-[9px] font-bold uppercase tracking-widest">AI PM Perspective</span>
        </div>
        <p className="text-[9px] font-black uppercase tracking-widest text-[#D97706] mb-2">{v.wkLabel}</p>
        <h2 className="text-3xl md:text-4xl font-serif font-black text-ink mb-1">{v.wkTitle}</h2>
        <p className="text-sm text-[#D97706] italic">{zh ? "伦敦行程的 V2：从「为一个人规划」到「为一群人促成出发」" : "V2 of the London planner: from planning for one person to getting a group out the door"}</p>
      </div>
      <div className="p-6 md:p-10">
        <Verdict lang={lang} color="#D97706"
          text={zh ? "大学生周末出不去，卡点不是缺信息，而是凑不齐人、怕踩坑、临时变天、不知道远不远；所以目标是提高周末成行率。" : "Students stay in not for lack of information but because of groups, risk, weather and distance — so the goal is the weekend go-out rate."}
          facts={zh ? [["30 分钟", "限时做出首版并上线"], ["5 个因素", "偏好、预算、人数、天气、距离一起打分"], ["V1 → V2", "伦敦行程的迭代版"]] : [["30 min", "first version shipped"], ["5 factors", "scored together"], ["V1 → V2", "iterates the London planner"]]}
          role={zh ? "独立完成需求定义、规则设计和验收，AI 负责写代码" : "Defined the problem, designed the rules and verified the output; AI wrote the code"} />
        <ShotStrip url="wxy-weekend-guide-meituan2026.netlify.app" href={WEEKEND_URL} openLabel={zh ? "↗ 打开" : "↗ Open"} bar="#FFF4C2" link="#B45309"
          bg="linear-gradient(135deg,#FFF6D6,#FFE9E0 55%,#E8F0FF)" shots={shots} />
        <div className="flex flex-wrap gap-3 mb-2 items-center">
          <a href={WEEKEND_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F59E0B] text-white text-xs font-bold border-2 border-[#B45309] shadow-[2px_2px_0_#92400E]">{zh ? "↗ 打开工具" : "↗ Open Tool"}</a>
          <a href="weekend-guide.html" download="weekend-guide.html" className="text-[11px] text-ink/40 underline">{zh ? "无法访问？下载离线版本" : "Can't access? Download offline version"}</a>
        </div>
        <p className="text-[10px] text-ink/35">{zh ? "活动为示例数据，天气为实时接口。" : "Activities are sample data; weather is live."}</p>

        <SectionLabel>{zh ? "AI PM 工作流分析" : "AI PM Workflow"}</SectionLabel>
        <Rows rows={rows} ring="#D97706" fill="#FFF8DB" ink="#B45309" />

        <SectionLabel>{zh ? "V1 → V2 迭代对照" : "V1 → V2 Comparison"}</SectionLabel>
        <div className="border-2 border-ink rounded-xl overflow-hidden bg-white">
          <div className="grid grid-cols-[72px_1fr_1fr] md:grid-cols-[110px_1fr_1fr] text-[11px] md:text-xs font-black bg-ink text-paper">
            <div className="p-2.5">{zh ? "维度" : "Aspect"}</div>
            <div className="p-2.5 text-[#F9A8D4]">V1 · {zh ? "伦敦五日行程" : "London planner"}</div>
            <div className="p-2.5 text-[#FCD34D]">V2 · {zh ? "周末城市探索指南" : "Weekend explorer"}</div>
          </div>
          {cmp.map(([k, a, b]) => (
            <div key={k} className="grid grid-cols-[72px_1fr_1fr] md:grid-cols-[110px_1fr_1fr] text-[11px] md:text-xs border-t border-ink/10">
              <div className="p-2.5 font-bold text-ink">{k}</div>
              <div className="p-2.5 text-ink/55">{a}</div>
              <div className="p-2.5 text-ink font-medium">{b}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 border-l-[3px] border-[#D97706] bg-[#FFF8DB] rounded-r-xl">
          <span className="text-[9px] font-black uppercase tracking-widest text-ink/30 block mb-2">{zh ? "PM 反思" : "PM Reflection"}</span>
          <p className="text-xs text-ink/65 leading-relaxed italic">{zh ? "迭代不等于推倒重来：我保留了「选择题代替填空题」和「固定锚点」（V1 是带你逛学校那一天，V2 是从学校出发），改掉的是 V1 里问卷只影响标签、行程内容写死的部分——让每个选项都真正改变结果。" : "Iterating isn't starting over. I kept “choices over blanks” and the fixed anchor (a campus day in V1, starting from campus in V2), and fixed what V1 got wrong: the questionnaire mostly produced tags while the itinerary was fixed. In V2 every answer changes the result."}</p>
        </div>
      </div>
    </div>
  );
}

/* ---------- 面试忍者弹窗（v5） ---------- */

export function ModalNinja({ lang }: { lang: Language }) {
  const zh = lang === "zh";
  const v = vibeText[lang];
  const rows: Row[] = zh ? [
    { n: "01", title: "识别需求与痛点", desc: "求职过程中缺乏系统化的面试练习工具——没有追问、没有评分、没有参考答案、没有打卡机制。核心痛点：面试是一种需要刻意练习的技能，但现有工具都是静态的题库，没有模拟真实追问的能力。", tags: ["需求定义", "用户痛点"] },
    { n: "02", title: "产品设计优先", desc: "先定义完整的产品逻辑：题库管理（宝典+面经+实习）、练习流程（出题→追问3轮→评分+参考答案）、游戏化（打卡日历、连胜、历史记录）。把产品逻辑写清楚再和Claude协作实现。", tags: ["产品设计", "功能定义"] },
    { n: "03", title: "Claude vibe coding 实现", desc: "用自然语言描述每个功能模块，Claude生成完整HTML+CSS+JS。单文件独立运行，无需安装部署，填入Claude API Key即可本地使用。内置完整面试宝典作为DEFAULT_KB，开箱即用。", tags: ["Claude vibe coding", "单文件部署"] },
    { n: "04", title: "多轮迭代至 v5", desc: "v1基础追问框架 → v2加参考答案+打卡日历 → v3加三Tab题库管理 → v4加内置宝典（DEFAULT_KB）+考后小结+跳过/结束按钮+💡看答案 → v5题库扩充：Agent 系统设计、Vibe Coding 成果。每次都基于真实使用反馈驱动。", tags: ["多轮迭代", "v1→v5"] },
  ] : [
    { n: "01", title: "Define the Problem", desc: "No systematic interview practice tool existed — no follow-up, no scoring, no reference answers, no streak mechanic. Core insight: interviewing is a skill requiring deliberate practice, but existing tools are static question banks without real interrogation simulation.", tags: ["Problem definition", "User pain"] },
    { n: "02", title: "Product Design First", desc: "Defined the full product logic first: knowledge base management (playbook + interviews + internships), practice flow (question → 3-round drill → score + reference), gamification (streak calendar, history). Wrote clear product specs before collaborating with Claude.", tags: ["Product design", "Feature spec"] },
    { n: "03", title: "Claude Vibe Coding", desc: "Described each feature module in natural language; Claude generated the full HTML+CSS+JS. Single-file, no install needed — just add a Claude API Key and run locally. Built-in playbook as DEFAULT_KB, ready out of the box.", tags: ["Claude vibe coding", "Single file"] },
    { n: "04", title: "Iterated to v5", desc: "v1 basic drill framework → v2 reference answers + streak calendar → v3 three-tab knowledge base → v4 built-in playbook (DEFAULT_KB) + post-session recap + skip/end controls + cheat button → v5 expanded question bank: agent system design and vibe coding results. Each driven by real usage feedback.", tags: ["Iteration", "v1→v5"] },
  ];
  const flow = zh
    ? [["01 · 出题", "选择练习方向", "#3B4FBF", "#F0F4FF"], ["02 · 追问", "大厂面试官风格 3 轮", "#C0392B", "#FFF0F7"], ["03 · 评分", "五维度评分", "#B45309", "#FFFBEB"], ["04 · 考后小结", "逐题回顾 + 参考答案", "#3B6D11", "#EAF3DE"], ["05 · 打卡 🥷", "连续打卡，成为面试忍者", "#F5F0E8", "#1a1a2e"]]
    : [["01 · Question", "Pick a track", "#3B4FBF", "#F0F4FF"], ["02 · Drill", "3 big-tech style follow-ups", "#C0392B", "#FFF0F7"], ["03 · Score", "5 dimensions", "#B45309", "#FFFBEB"], ["04 · Recap", "Per-question review + reference", "#3B6D11", "#EAF3DE"], ["05 · Streak 🥷", "Daily streak", "#F5F0E8", "#1a1a2e"]];
  return (
    <div className="font-sans max-w-5xl mx-auto">
      <div className="p-6 md:p-10 pb-4 border-b border-ink/10">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-ink text-paper rounded-full text-[9px] font-bold uppercase tracking-widest">Vibe Coding</span>
          <span className="px-3 py-1 bg-[#F0F4FF] text-[#3B4FBF] rounded-full text-[9px] font-bold uppercase tracking-widest">AI PM Perspective</span>
        </div>
        <p className="text-[9px] font-black uppercase tracking-widest text-[#3B4FBF] mb-2">{v.njLabel}</p>
        <h2 className="text-3xl md:text-4xl font-serif font-black text-ink mb-1">{v.njTitle}</h2>
        <p className="text-sm text-[#3B4FBF] italic">{zh ? "用 Claude vibe coding 做的 AI PM 面试练习工具，每日一练成为面试忍者" : "An AI PM interview practice tool built with Claude vibe coding — daily drills to become an Interview Ninja"}</p>
      </div>
      <div className="p-6 md:p-10">
        <Verdict lang={lang} color="#3B4FBF"
          text={zh ? "面试是需要刻意练习的技能；我既是产品经理，也是第一个用户，真实的自我需求决定了工具要解决什么。" : "Interviewing is a skill that needs deliberate practice; as both PM and first user, my own sticking points defined the tool."}
          facts={zh ? [["3 轮", "大厂风格追问"], ["5 维", "评分 + 参考答案"], ["v1 → v5", "按真实使用反馈迭代"]] : [["3 rounds", "of follow-ups"], ["5 dims", "scoring + reference"], ["v1 → v5", "usage-driven iteration"]]}
          role={zh ? "独立完成产品设计，用 Claude vibe coding 实现" : "Designed the product end to end and built it with Claude vibe coding"} />
        <ShotStrip url="面试忍者 · Interview Ninja" href="interview-ninja.html" openLabel={zh ? "↗ 打开" : "↗ Open"} bar="#F0F4FF" link="#3B4FBF" bg="#F5F0E8" kind="desktop"
          shots={[{ src: "ninja-1.jpg", cap: zh ? "① 首页：选练习方向、题数与难度，左侧是本周战绩和打卡日历" : "① Home: pick a track, count and difficulty; weekly stats and streak on the left" },
                  { src: "ninja-2.jpg", cap: zh ? "② 练习：大厂风格追问，计时，可跳过或看答案" : "② Drill: big-tech style follow-ups with a timer, skip or peek at the answer" }]} />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
          {flow.map(([a, b, c, bg], i) => (
            <div key={i} className="rounded-lg border border-ink/15 px-3 py-2" style={{ background: i === 4 ? "#1a1a2e" : bg }}>
              <div className="text-[11px] font-black" style={{ color: i === 4 ? "#F5F0E8" : c }}>{a}</div>
              <div className="text-[10px] mt-0.5" style={{ color: i === 4 ? "#D4A017" : "rgba(45,45,45,.6)" }}>{b}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between p-5 bg-ink/5 border border-ink/20 rounded-2xl mb-4">
          <div>
            <p className="text-sm font-black mb-1">{zh ? "面试忍者工具文件" : "Interview Ninja tool file"}</p>
            <p className="text-xs text-ink/50">{zh ? "需要 Claude API Key · 本地浏览器运行" : "Requires Claude API Key · runs in browser"}</p>
          </div>
          <a href="interview-ninja.html" download="interview-ninja.html" className="px-5 py-2.5 bg-ink text-paper rounded-xl text-xs font-black hover:bg-terracotta transition-colors">{zh ? "下载 HTML ↓" : "Download HTML ↓"}</a>
        </div>
        <div className="flex gap-3 mb-4 items-center">
          <a href="interview-ninja.html" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3B4FBF] text-white text-xs font-bold border-2 border-[#2D3A9A] shadow-[2px_2px_0_#1E2875]">{zh ? "↗ 打开工具" : "↗ Open Tool"}</a>
        </div>
        <SectionLabel>{zh ? "AI PM 工作流分析" : "AI PM Workflow"}</SectionLabel>
        <Rows rows={rows} ring="#3B4FBF" fill="#F0F4FF" ink="#3B4FBF" />
        <div className="mt-4 p-4 border-l-[3px] border-[#3B4FBF] bg-[#F0F4FF] rounded-r-xl">
          <span className="text-[9px] font-black uppercase tracking-widest text-ink/30 block mb-2">{zh ? "PM 反思" : "PM Reflection"}</span>
          <p className="text-xs text-ink/65 leading-relaxed italic">{zh ? "这个项目最有意思的地方是：我既是产品经理（定义需求、设计功能），也是第一个用户（用它来练习面试）。真实的自我需求是最好的产品灵感——我知道自己在哪里卡住，所以我知道工具要解决什么问题。" : "What's interesting about this project: I was simultaneously the PM (defining requirements, designing features) and the first user (using it to practice interviews). Real self-need is the best product inspiration — I knew exactly where I got stuck, so I knew exactly what the tool needed to solve."}</p>
        </div>
      </div>
    </div>
  );
}
