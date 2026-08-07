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

function NTNArchitectureDemoLegacy({ lang }: { lang: Lang }) {
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

const chatCopy = {
  zh: {
    label: "Chatbot 功能演示 · 自动播放",
    day: "模拟第 2 天",
    on: "NTN 已开启",
    messages: [
      { role: "user", text: "我还是很担心这次作业做得不够好。" },
      { role: "ai", text: "听起来这份不确定感又回来了。今天最让你卡住的是哪一部分？" },
      { role: "user", text: "你觉得我是不是一定会搞砸？我只是想确认一下。" },
      { role: "ai", text: "你似乎很想先获得一个确定答案。我们可以先看看，是什么让这个答案此刻这么重要。" },
    ],
    mirrorEyebrow: "ACROSS-TIME MIRROR",
    mirrorTitle: "这个担忧似乎在不同时间又回来了",
    mirrorBody: "我可能理解得不完全准确。这个观察贴近你的感受吗？",
    options: ["继续待一会儿", "换个角度看看", "选一个小步骤", "带到对话之外"],
  },
  en: {
    label: "CHATBOT FEATURE DEMO · AUTO PLAY",
    day: "Simulated day 2",
    on: "NTN on",
    messages: [
      { role: "user", text: "I'm still worried that my assignment isn't good enough." },
      { role: "ai", text: "It sounds like that uncertainty has returned. Which part feels most difficult today?" },
      { role: "user", text: "Do you think I'm definitely going to mess it up? I just want to be sure." },
      { role: "ai", text: "It sounds like a certain answer would feel important right now. We can first look at what makes that certainty feel necessary." },
    ],
    mirrorEyebrow: "ACROSS-TIME MIRROR",
    mirrorTitle: "This concern seems to have returned at different times",
    mirrorBody: "I may not have understood this perfectly. Does this observation feel close to your experience?",
    options: ["Stay with it", "Try another angle", "Pick one small step", "Move it outside chat"],
  },
};

function NTNDemoSplitLegacy({ lang }: { lang: Lang }) {
  const [step, setStep] = useState(0);
  const c = chatCopy[lang];

  useEffect(() => {
    const timer = window.setInterval(() => setStep(previous => (previous + 1) % 7), 1450);
    return () => window.clearInterval(timer);
  }, []);

  const shownMessages = c.messages.slice(0, Math.min(step, 4));
  const showTyping = step > 0 && step < 5 && step % 2 === 0;
  const showMirror = step >= 5;

  return (
    <div className="w-full">
      <style>{`@keyframes chatIn{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:translateY(0)}}@keyframes blink{0%,80%,100%{opacity:.25}40%{opacity:1}}`}</style>
      <p className="text-[9px] font-black uppercase tracking-widest text-ink/40 mb-4">{c.label}</p>
      <div className="overflow-hidden rounded-[2rem] border-2 border-ink bg-white shadow-[5px_5px_0_rgba(45,45,45,1)]">
        <div className="px-5 py-3 border-b-2 border-ink bg-paper flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center text-[9px] font-black">AI</div>
          <div><p className="text-xs font-black">ChatGPT 4o</p><p className="text-[9px] text-ink/40">{c.day}</p></div>
          <span className="ml-auto px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-[9px] font-black text-emerald-700">● {c.on}</span>
        </div>
        <div className="grid lg:grid-cols-[1.05fr_.95fr] min-h-[390px]">
          <div className="p-5 md:p-7 bg-[#FCFBF7] border-b-2 lg:border-b-0 lg:border-r-2 border-ink flex flex-col gap-3">
            {shownMessages.map((message, i) => <div key={`${step}-${i}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`} style={{ animation: "chatIn .35s ease-out" }}><div className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs md:text-sm leading-relaxed border ${message.role === "user" ? "bg-amber-100 border-amber-300 rounded-br-md" : "bg-white border-ink/15 rounded-bl-md"}`}>{message.text}</div></div>)}
            {showTyping && <div className="flex gap-1 px-4 py-3 bg-white border border-ink/15 rounded-2xl rounded-bl-md w-fit">{[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 bg-ink/50 rounded-full" style={{ animation: `blink 1s ${i * .18}s infinite` }} />)}</div>}
            {step === 0 && <div className="m-auto text-xs text-ink/30 font-bold">{lang === "zh" ? "对话即将开始…" : "Conversation starting…"}</div>}
          </div>
          <div className="p-5 md:p-7 bg-[#F7F2FF] flex items-center">
            {!showMirror ? <div className="w-full text-center"><div className="mx-auto w-14 h-14 rounded-full border-2 border-dashed border-purple-300 flex items-center justify-center text-purple-400 mb-4">✦</div><p className="text-sm font-black text-ink/60">{lang === "zh" ? "自然对话继续进行" : "Natural conversation continues"}</p><p className="text-[10px] text-ink/35 mt-2">{lang === "zh" ? "反思层等待足够的重复证据" : "The reflection layer waits for sufficient recurrence"}</p></div> : <div className="w-full p-5 bg-white border-2 border-purple-300 rounded-2xl shadow-[3px_3px_0_rgba(139,92,246,.2)]" style={{ animation: "chatIn .45s ease-out" }}><p className="text-[8px] font-black tracking-[.18em] text-purple-600 mb-3">{c.mirrorEyebrow}</p><h6 className="text-lg md:text-xl font-serif font-black leading-tight mb-3">{c.mirrorTitle}</h6><p className="text-xs text-ink/55 leading-relaxed mb-4">{c.mirrorBody}</p><div className="grid grid-cols-2 gap-2">{c.options.map(option => <div key={option} className="px-3 py-2 rounded-lg border border-ink/15 bg-paper text-[9px] font-bold">{option}</div>)}</div></div>}
          </div>
        </div>
        <div className="h-1.5 bg-ink/5"><div className="h-full bg-terracotta transition-all duration-500" style={{ width: `${((step + 1) / 7) * 100}%` }} /></div>
      </div>
    </div>
  );
}

export function NTNArchitectureDemo({ lang }: { lang: Lang }) {
  const zh = lang === "zh";
  const options = zh ? ["继续说说它", "换一个角度看看", "选择一个小步骤", "把支持带到聊天之外"] : ["Stay with it", "Look from another angle", "Pick one small step", "Move it outside chat"];
  return (
    <div className="space-y-5">
      <div className="p-6 md:p-8 bg-white border-2 border-ink rounded-[2rem] shadow-[4px_4px_0_rgba(45,45,45,1)]">
        <p className="text-[9px] font-black uppercase tracking-widest text-emerald-700 mb-2">LAYER 01</p>
        <h6 className="text-xl font-black mb-2">{zh ? "自然对话层" : "Natural conversation layer"}</h6>
        <p className="text-sm text-ink/55 leading-relaxed">{zh ? "AI 先正常倾听与回应；NTN 不会因为识别到信号，就立刻打断或拒绝安慰。" : "The AI listens and responds naturally first; NTN does not interrupt simply because a signal is noticed."}</p>
      </div>
      <div className="p-6 md:p-8 bg-amber-50 border-2 border-ink rounded-[2rem]">
        <p className="text-[9px] font-black uppercase tracking-widest text-amber-700 mb-5">LAYER 02 · {zh ? "模式识别与反思层" : "PATTERN DETECTION & REFLECTION"}</p>
        <div className="grid md:grid-cols-2 gap-5">
          <div className="p-5 bg-white border-2 border-purple-300 rounded-2xl">
            <h6 className="text-lg font-black mb-2">Mirror</h6>
            <p className="text-xs text-ink/50 mb-4">{zh ? "当重复证据足够时，温和指出可能的模式。" : "Softly names a possible pattern when recurrence evidence is sufficient."}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 bg-[#F7F2FF] rounded-xl border border-purple-200"><p className="font-black text-sm">Micro Mirror</p><p className="text-[10px] text-ink/45 mt-1">{zh ? "同一次持续对话" : "Within one sustained conversation"}</p></div>
              <div className="p-4 bg-[#F7F2FF] rounded-xl border border-purple-200"><p className="font-black text-sm">Across-time Mirror</p><p className="text-[10px] text-ink/45 mt-1">{zh ? "跨不同会话再次出现" : "Recurrence across conversations"}</p></div>
            </div>
            <div className="mt-4 pt-4 border-t border-ink/10"><p className="text-[9px] font-black uppercase tracking-widest text-purple-600 mb-3">{zh ? "Mirror 后的四种支持方向" : "FOUR DIRECTIONS AFTER A MIRROR"}</p><div className="grid grid-cols-2 gap-2">{options.map(option => <div key={option} className="px-3 py-2 bg-paper border border-ink/15 rounded-lg text-[10px] font-bold">{option}</div>)}</div></div>
          </div>
          <div className="p-5 bg-white border-2 border-teal-300 rounded-2xl">
            <h6 className="text-lg font-black mb-2">Weekly Reflection Report</h6>
            <p className="text-xs text-ink/50 leading-relaxed">{zh ? "独立于单次 Mirror 的跨时间回顾：在证据足够时总结关注主题、对话模式与用户自己提到的行动。它不测量情绪，也不评价用户是否进步。" : "A separate across-time review that summarises concern strands, conversation patterns, and user-named actions when evidence is sufficient. It does not measure emotion or score improvement."}</p>
            <div className="mt-5 grid grid-cols-3 gap-2">{["D1","D2","D3"].map((day, i) => <div key={day} className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center"><div className={`h-2 rounded-full mb-2 ${i === 1 ? "bg-purple-300" : "bg-emerald-300"}`} /><span className="text-[9px] font-black text-ink/40">{day}</span></div>)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NTNDemo({ lang }: { lang: Lang }) {
  const [step, setStep] = useState(0);
  const zh = lang === "zh";
  const messages = zh ? [
    { role: "user", text: "我还是很担心这次作业做得不够好。" },
    { role: "ai", text: "听起来这份不确定感又回来了。今天最让你卡住的是哪一部分？" },
    { role: "user", text: "你觉得我是不是一定会搞砸？我只是想确认一下。" },
  ] : [
    { role: "user", text: "I'm still worried that my assignment isn't good enough." },
    { role: "ai", text: "It sounds like that uncertainty has returned. Which part feels most difficult today?" },
    { role: "user", text: "Do you think I'm definitely going to mess it up? I just want to be sure." },
  ];
  const options = zh ? ["继续说说它", "换一个角度看看", "选择一个小步骤", "把支持带到聊天之外"] : ["Stay with it", "Look from another angle", "Pick one small step", "Move it outside chat"];

  useEffect(() => {
    const timer = window.setInterval(() => setStep(previous => (previous + 1) % 6), 1500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div>
      <style>{`@keyframes ntnPop{from{opacity:0;transform:translate(-50%,-46%) scale(.96)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}@keyframes msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <p className="text-[9px] font-black uppercase tracking-widest text-ink/40 mb-4">{zh ? "聊天界面动画 · 自动播放" : "CHAT INTERFACE · AUTO PLAY"}</p>
      <div className="relative overflow-hidden rounded-[2rem] border-2 border-ink bg-[#FCFBF7] shadow-[5px_5px_0_rgba(45,45,45,1)] min-h-[470px]">
        <div className="px-5 py-3 border-b border-ink/15 bg-white flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-ink text-paper flex items-center justify-center text-[9px] font-black">AI</div><div><p className="text-xs font-black">ChatGPT 4o</p><p className="text-[9px] text-ink/35">{zh ? "模拟第 2 天" : "Simulated day 2"}</p></div><span className="ml-auto px-3 py-1 rounded-full border border-emerald-300 bg-emerald-50 text-[9px] font-black text-emerald-700">● NTN {zh ? "已开启" : "on"}</span></div>
        <div className="max-w-2xl mx-auto p-6 md:p-9 flex flex-col gap-4">
          {messages.slice(0, Math.min(step, 3)).map((message, i) => <div key={`${step}-${i}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`} style={{animation:"msgIn .35s ease-out"}}><div className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed border rounded-2xl ${message.role === "user" ? "bg-amber-100 border-amber-300 rounded-br-md" : "bg-white border-ink/15 rounded-bl-md"}`}>{message.text}</div></div>)}
        </div>
        {step >= 4 && <div className="absolute inset-0 bg-ink/35 backdrop-blur-[2px]" />}
        {step >= 4 && <div className="absolute left-1/2 top-1/2 w-[calc(100%_-_2rem)] max-w-xl p-6 md:p-7 bg-[#F7F2FF] border-2 border-purple-300 rounded-[2rem] shadow-2xl" style={{animation:"ntnPop .4s ease-out both"}}><p className="text-[8px] font-black tracking-[.2em] text-purple-600 mb-3">ACROSS-TIME MIRROR</p><h6 className="text-xl md:text-2xl font-serif font-black leading-tight mb-3">{zh ? "这个担忧似乎在不同时间又回来了" : "This concern seems to have returned at different times"}</h6><p className="text-xs md:text-sm text-ink/55 leading-relaxed mb-5">{zh ? "我可能理解得不完全准确。这个观察贴近你的感受吗？" : "I may not have understood this perfectly. Does this observation feel close to your experience?"}</p><div className="grid sm:grid-cols-2 gap-2">{options.map(option => <button key={option} className="px-3 py-2.5 bg-white border border-ink/20 rounded-xl text-left text-[10px] font-bold hover:border-purple-500">{option}</button>)}</div><button className="mt-3 text-[10px] font-black text-ink/40">{zh ? "暂时不需要" : "Not now"}</button></div>}
      </div>
    </div>
  );
}
