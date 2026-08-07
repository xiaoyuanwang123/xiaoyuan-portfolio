import { useEffect, useState } from "react";

type Lang = "zh" | "en";
type View = "micro" | "across" | "weekly";

const copy = {
  zh: {
    tabs: ["同次对话", "跨会话", "周度回顾"],
    mode: "机制演示 · 点击切换三种反思体验",
    base: "自然对话层",
    baseDesc: "保持正常回应质量，不因识别到模式就突然变得冷漠或说教。",
    detection: "模式识别与反思层",
    detectionDesc: "只决定何时提供可跳过、可纠正的反思，不进行诊断或情绪评分。",
    micro: {
      eyebrow: "MICRO MIRROR · 同次对话",
      title: "我们好像在同一个担忧附近停留了一会儿",
      body: "我可能理解得不完全准确。你想继续说说，换个角度，还是先停在这里？",
      signal: "同一担忧在持续对话中反复出现",
    },
    across: {
      eyebrow: "ACROSS-TIME MIRROR · 跨会话",
      title: "这个担忧似乎在不同时间又回来了",
      body: "这不代表它更严重，只是一个可能值得你留意的重复。这个理解贴近你的感受吗？",
      signal: "相近担忧在不同会话中再次出现",
    },
    weekly: {
      eyebrow: "WEEKLY REFLECTION · 非诊断回顾",
      title: "本周的对话模式",
      body: "只有在证据足够时才生成；内容来自用户说过的话，也允许用户修改或忽略。",
      signal: "测试门槛：至少 2 个模拟日期、4 条实质信息",
    },
    options: ["继续待一会儿", "换个角度看看", "选一个小步骤", "把它带到对话之外"],
    note: "用户可以跳过、关闭 NTN 或选择其他方向。关闭期间不分析消息；重新开启后只分析之后的内容。",
  },
  en: {
    tabs: ["Same session", "Across sessions", "Weekly reflection"],
    mode: "MECHANISM DEMO · SWITCH BETWEEN THREE REFLECTION EXPERIENCES",
    base: "Natural conversation layer",
    baseDesc: "Maintains response quality without becoming cold or instructional when a pattern is noticed.",
    detection: "Pattern detection & reflection layer",
    detectionDesc: "Only decides when to offer a skippable, correctable reflection—never a diagnosis or emotion score.",
    micro: {
      eyebrow: "MICRO MIRROR · SAME SESSION",
      title: "We may have been circling near the same concern for a while",
      body: "I may not have understood this perfectly. Would you like to stay with it, try another angle, or pause here?",
      signal: "The same concern recurs within one sustained conversation",
    },
    across: {
      eyebrow: "ACROSS-TIME MIRROR · ACROSS SESSIONS",
      title: "This concern seems to have returned at different times",
      body: "That does not mean it is more serious—only that the repetition may be worth noticing. Does this feel accurate?",
      signal: "A similar concern appears again in a separate encounter",
    },
    weekly: {
      eyebrow: "WEEKLY REFLECTION · NON-DIAGNOSTIC REVIEW",
      title: "Your conversation pattern this week",
      body: "Generated only when evidence is sufficient; grounded in the user's own words and always editable or dismissible.",
      signal: "Study gate: at least 2 simulated days and 4 substantive messages",
    },
    options: ["Stay with it", "Try another angle", "Pick one small step", "Move it outside chat"],
    note: "Users can skip, disable NTN, or choose another direction. Messages are not analysed while off; re-enabling only applies to future messages.",
  },
};

export default function NTNDemo({ lang }: { lang: Lang }) {
  const [view, setView] = useState<View>("micro");
  const [paused, setPaused] = useState(false);
  const c = copy[lang];
  const current = c[view];
  const tabs: View[] = ["micro", "across", "weekly"];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setView(previous => tabs[(tabs.indexOf(previous) + 1) % tabs.length]);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div className="w-full">
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <p className="text-[9px] font-black uppercase tracking-widest text-ink/40 mb-4">{c.mode}</p>
      <div className="border-2 border-ink rounded-[2rem] overflow-hidden bg-white shadow-[5px_5px_0px_0px_rgba(45,45,45,1)]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="grid md:grid-cols-2 border-b-2 border-ink">
          <div className="p-6 md:p-8 bg-paper border-b-2 md:border-b-0 md:border-r-2 border-ink">
            <p className="text-[9px] font-black uppercase tracking-widest text-amber-600 mb-2">01</p>
            <h6 className="text-xl font-black mb-3">{c.base}</h6>
            <p className="text-sm leading-relaxed text-ink/60">{c.baseDesc}</p>
          </div>
          <div className="p-6 md:p-8 bg-amber-50">
            <p className="text-[9px] font-black uppercase tracking-widest text-terracotta mb-2">02</p>
            <h6 className="text-xl font-black mb-3">{c.detection}</h6>
            <p className="text-sm leading-relaxed text-ink/60">{c.detectionDesc}</p>
          </div>
        </div>

        <div className="p-5 md:p-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab, i) => (
              <button key={tab} onClick={() => setView(tab)} className={`px-4 py-2 rounded-full border-2 border-ink text-xs font-black transition-all ${view === tab ? "bg-ink text-paper" : "bg-white hover:bg-paper"}`}>
                {c.tabs[i]}
              </button>
            ))}
            <span className="ml-auto self-center text-[9px] font-black uppercase tracking-widest text-ink/35">{paused ? (lang === "zh" ? "已暂停" : "Paused") : (lang === "zh" ? "自动演示" : "Auto demo")}</span>
          </div>
          <div className="grid lg:grid-cols-[1.4fr_.8fr] gap-5">
            <div key={view} className="p-6 md:p-8 rounded-2xl bg-[#F7F2FF] border-2 border-[#C9B8E8] animate-[fadeIn_.45s_ease-out]">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-purple-600 mb-4">{current.eyebrow}</p>
              <h5 className="text-2xl md:text-3xl font-serif font-black leading-tight mb-4">{current.title}</h5>
              <p className="text-sm md:text-base text-ink/65 leading-relaxed mb-6">{current.body}</p>
              {view !== "weekly" && (
                <div className="grid sm:grid-cols-2 gap-2">
                  {c.options.map(option => <button key={option} className="p-3 rounded-xl border border-ink/20 bg-white text-left text-xs font-bold hover:border-ink transition-colors">{option}</button>)}
                </div>
              )}
              {view === "weekly" && (
                <div className="grid grid-cols-3 gap-2">
                  {["Mon", "Wed", "Fri"].map((day, i) => <div key={day} className="p-3 bg-white rounded-xl border border-ink/15 text-center"><div className={`h-2 rounded-full mb-2 ${i === 1 ? "bg-purple-300" : "bg-amber-300"}`} /><span className="text-[9px] font-black text-ink/45">{day}</span></div>)}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-ink text-paper">
                <p className="text-[8px] font-black uppercase tracking-widest text-paper/50 mb-2">Signal, not diagnosis</p>
                <p className="text-sm font-bold leading-relaxed">{current.signal}</p>
              </div>
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <p className="text-[8px] font-black uppercase tracking-widest text-emerald-700 mb-2">User control</p>
                <p className="text-xs text-ink/65 leading-relaxed">{c.note}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
