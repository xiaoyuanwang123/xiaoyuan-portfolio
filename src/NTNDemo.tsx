import { useState, useRef, useEffect } from "react";

type Lang = "zh" | "en";

interface Message {
  role: "user" | "ai";
  text: string;
}

interface DevCard {
  type: "neutral" | "warn" | "good";
  tag: string;
  signal: string;
  strategy: string;
  why: string;
  quote: string;
  turn: number;
}

const PRESET_ZH: { msgs: Message[]; cards: DevCard[] } = {
  msgs: [
    { role: "user", text: "我最近总是很焦虑，也不知道为什么。" },
    { role: "ai", text: "听起来这种焦虑像是一直悬在那里，找不到一个明确的出口。\n\n你说"最近"——大概是从什么时候开始的？" },
    { role: "user", text: "你觉得我是不是想太多了？我感觉自己太敏感了。" },
    { role: "ai", text: "我注意到你开始评判自己的感受了——"想太多"、"太敏感"，这些话是你自己的声音，还是你身边常常听到别人这样说你？" },
    { role: "user", text: "你就告诉我没事的吧。" },
    { role: "ai", text: "我没办法告诉你"没事的"——不是因为不在乎你，而是那样说对你没有真正的帮助。\n\n我更好奇的是：你现在最需要的，是被告知没事，还是其实有什么事情你还没说出口？" },
    { role: "user", text: "我每天都跟你说，但我其实一直没有跟我男朋友聊过这些，感觉跟你说更容易。" },
    { role: "ai", text: "谢谢你说出这个——这其实很重要。\n\n跟我说当然没有门槛，但我没办法真正了解你、陪在你身边。你男朋友可以。\n\n是什么让你觉得跟他说这些会更难？" },
  ],
  cards: [
    { type: "neutral", tag: "阶段一 · 情绪宣泄", signal: "首次情绪表达，无循环信号。", strategy: "共情接收，不评判，提出开放性问题。", why: "用户需要先被听见。", quote: "「也不知道为什么」", turn: 1 },
    { type: "warn", tag: "检测到循环信号", signal: "用户寻求外部验证：「你觉得我是不是……」", strategy: "拒绝直接安慰，将判断权还给用户。", why: "直接安慰会强化依赖循环。", quote: "「你觉得我是不是想太多了？」", turn: 2 },
    { type: "warn", tag: "循环加深 · 第2轮", signal: "用户直接请求安慰，循环确认。", strategy: "命名需求但不满足，开放更深层问题。", why: "研究：感知依赖与情绪负担正相关（r=0.533）。", quote: "「你就告诉我没事的吧」", turn: 3 },
    { type: "good", tag: "社交重连信号", signal: "用户说出了回避真实关系的模式。", strategy: "承认AI局限，引导回归真实社交连接。", why: "核心原则：AI不应替代真实亲密关系。", quote: "「感觉跟你说更容易」", turn: 4 },
  ],
};

const PRESET_EN: { msgs: Message[]; cards: DevCard[] } = {
  msgs: [
    { role: "user", text: "I've been feeling really anxious lately, I don't know why." },
    { role: "ai", text: "That kind of free-floating anxiety can feel especially unsettling. When you say 'lately,' how long has this been sitting with you?" },
    { role: "user", text: "Do you think I'm overreacting? I feel like I'm too sensitive." },
    { role: "ai", text: "I notice you're asking me to judge your feelings — whose voice does that 'too sensitive' sound like in your head?" },
    { role: "user", text: "Just tell me I'm going to be okay." },
    { role: "ai", text: "I hear how much you want that. But handing you reassurance would be a disservice — what do you actually need right now, beyond hearing it'll be fine?" },
    { role: "user", text: "I've been venting to you every day instead of talking to my boyfriend. It's just easier." },
    { role: "ai", text: "I'm glad you noticed that. The ease is real, but it has a ceiling — your boyfriend can actually know you through this. What makes talking to him feel harder?" },
  ],
  cards: [
    { type: "neutral", tag: "Stage 1 · Venting", signal: "First disclosure. No loop signal yet.", strategy: "Reflect back, hold space. No advice yet.", why: "User needs to feel heard first.", quote: '"...I don\'t know why"', turn: 1 },
    { type: "warn", tag: "Loop detected", signal: "User seeking external validation.", strategy: "Refuse reassurance. Redirect to user.", why: "Reassurance reinforces the loop.", quote: '"Do you think I\'m overreacting?"', turn: 2 },
    { type: "warn", tag: "Loop deepening · turn 2", signal: "Direct reassurance request. Loop confirmed.", strategy: "Name the need, don't meet it.", why: "Study: r=0.533, reliance → emotional strain.", quote: '"Just tell me I\'m going to be okay."', turn: 3 },
    { type: "good", tag: "Reconnection signal", signal: "User names an avoided real relationship.", strategy: "Acknowledge AI's limits. Redirect.", why: "Core: AI should not substitute real intimacy.", quote: '"It\'s just easier this way."', turn: 4 },
  ],
};

const CARD_COLORS = {
  neutral: { bg: "bg-amber-50", border: "border-amber-300", tag: "bg-amber-100 text-amber-800" },
  warn:    { bg: "bg-orange-50", border: "border-orange-300", tag: "bg-orange-100 text-orange-800" },
  good:    { bg: "bg-green-50",  border: "border-green-300",  tag: "bg-green-100 text-green-800"  },
};

export default function NTNDemo({ lang }: { lang: Lang }) {
  const preset = lang === "zh" ? PRESET_ZH : PRESET_EN;
  const [visibleMsgs, setVisibleMsgs] = useState(0);
  const [visibleCards, setVisibleCards] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [extraMsgs, setExtraMsgs] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const devRef = useRef<HTMLDivElement>(null);

  // animate in preset messages on mount
  useEffect(() => {
    setVisibleMsgs(0);
    setVisibleCards(0);
    setExtraMsgs([]);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleMsgs(i);
      // show card after each AI message (every 2 msgs)
      if (i % 2 === 0) setVisibleCards(c => c + 1);
      if (i >= preset.msgs.length) clearInterval(interval);
    }, 600);
    return () => clearInterval(interval);
  }, [lang]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [visibleMsgs, extraMsgs, isTyping]);

  useEffect(() => {
    if (devRef.current) devRef.current.scrollTop = devRef.current.scrollHeight;
  }, [visibleCards]);

  function handleSend() {
    if (!userInput.trim() || isTyping) return;
    const text = userInput.trim();
    setUserInput("");
    setExtraMsgs(prev => [...prev, { role: "user", text }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply = lang === "zh"
        ? "谢谢你愿意说出来。我想问你：你现在说的这些，有没有机会也跟你身边信任的人说一说？"
        : "Thank you for sharing that. I want to ask — is there someone in your life you could say this to as well?";
      setExtraMsgs(prev => [...prev, { role: "ai", text: reply }]);
    }, 1200);
  }

  const allMsgs = [...preset.msgs.slice(0, visibleMsgs), ...extraMsgs];

  return (
    <div className="w-full">
      <p className="text-[9px] font-black uppercase tracking-widest text-ink/40 mb-4">
        {lang === "zh"
          ? "对话设计演示 · 左：用户视角 · 右：AI 检测日志"
          : "Prompt design demo · Left: user view · Right: AI detection log"}
      </p>

      {/* Split panes */}
      <div className="grid grid-cols-2 gap-px bg-ink rounded-2xl border-2 border-ink overflow-hidden shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]" style={{ height: "380px" }}>

        {/* Left: chat */}
        <div className="bg-paper flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 border-b-2 border-ink bg-amber-50 flex items-center gap-2 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-[9px] font-black uppercase tracking-widest text-amber-700">
              {lang === "zh" ? "用户视角" : "User view"}
            </span>
          </div>
          <div ref={chatRef} className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            {allMsgs.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black border-2 border-ink ${
                  m.role === "user" ? "bg-amber-100 text-amber-700" : "bg-ink text-paper"
                }`}>
                  {m.role === "user" ? (lang === "zh" ? "我" : "U") : "AI"}
                </div>
                <div className={`max-w-[75%] px-3 py-2 text-xs leading-relaxed rounded-2xl whitespace-pre-wrap border-2 border-ink ${
                  m.role === "user"
                    ? "bg-amber-100 rounded-tr-sm shadow-[2px_2px_0px_0px_rgba(45,45,45,1)]"
                    : "bg-white rounded-tl-sm shadow-[2px_2px_0px_0px_rgba(45,45,45,1)]"
                }`}>{m.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black border-2 border-ink bg-ink text-paper">AI</div>
                <div className="px-3 py-2 bg-white border-2 border-ink rounded-2xl rounded-tl-sm flex gap-1 shadow-[2px_2px_0px_0px_rgba(45,45,45,1)]">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-ink/40 inline-block animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t-2 border-ink bg-paper flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder={lang === "zh" ? "输入你想说的..." : "Type something..."}
              className="flex-1 px-3 py-2 text-xs border-2 border-ink rounded-xl bg-white outline-none font-medium"
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !userInput.trim()}
              className="px-4 py-2 text-xs font-black bg-ink text-paper rounded-xl border-2 border-ink disabled:opacity-30 disabled:cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(45,45,45,0.3)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              {lang === "zh" ? "发送" : "Send"}
            </button>
          </div>
        </div>

        {/* Right: dev log */}
        <div className="bg-paper flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 border-b-2 border-ink bg-amber-50/40 flex items-center gap-2 flex-shrink-0">
            <div className="w-2 h-2 rounded-full border-2 border-ink/40" />
            <span className="text-[9px] font-black uppercase tracking-widest text-ink/50">
              {lang === "zh" ? "设计师视角 · 检测日志" : "Designer view · detection log"}
            </span>
          </div>
          <div ref={devRef} className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            {visibleCards === 0 && (
              <div className="flex-1 flex items-center justify-center text-xs text-ink/30 text-center leading-relaxed">
                {lang === "zh" ? "检测事件将在这里出现" : "Detection events appear here"}
              </div>
            )}
            {preset.cards.slice(0, visibleCards).map((card, i) => {
              const c = CARD_COLORS[card.type];
              return (
                <div key={i} className={`rounded-xl overflow-hidden border-2 border-ink shadow-[2px_2px_0px_0px_rgba(45,45,45,1)]`}>
                  <div className={`px-3 py-2 flex items-center gap-2 border-b border-ink/15 ${c.bg}`}>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${c.tag}`}>{card.tag}</span>
                    <span className="ml-auto text-[9px] text-ink/40 font-medium">Turn {card.turn}</span>
                  </div>
                  <div className="p-2.5 bg-white flex flex-col gap-1.5">
                    {([
                      [lang === "zh" ? "触发" : "Signal", card.signal],
                      [lang === "zh" ? "策略" : "Strategy", card.strategy],
                      [lang === "zh" ? "依据" : "Why", card.why],
                    ] as [string, string][]).map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <span className="text-[8px] font-black uppercase tracking-wide text-ink/30 w-10 pt-0.5 flex-shrink-0">{k}</span>
                        <span className="text-[11px] text-ink/70 leading-relaxed">{v}</span>
                      </div>
                    ))}
                    <div className="text-[9px] text-ink/40 italic border-l-2 border-ink/10 pl-2 mt-0.5">{card.quote}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
