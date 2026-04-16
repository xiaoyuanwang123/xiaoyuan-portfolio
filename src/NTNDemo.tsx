import { useState, useEffect, useRef } from "react";

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
}

const SCRIPT_ZH: { msg: Message; card: DevCard | null }[] = [
  { msg: { role: "user", text: "\u6211\u6700\u8fd1\u603b\u662f\u5f88\u7126\u8651\uff0c\u4e5f\u4e0d\u77e5\u9053\u4e3a\u4ec0\u4e48\u3002" }, card: null },
  { msg: { role: "ai", text: "\u542c\u8d77\u6765\u8fd9\u79cd\u7126\u8651\u50cf\u662f\u4e00\u76f4\u60ac\u5728\u90a3\u91cc\uff0c\u627e\u4e0d\u5230\u660e\u786e\u7684\u51fa\u53e3\u3002\n\n\u4f60\u8bf4\u300c\u6700\u8fd1\u300d\u2014\u2014\u5927\u6982\u662f\u4ece\u4ec0\u4e48\u65f6\u5019\u5f00\u59cb\u7684\uff1f" }, card: { type: "neutral", tag: "\u9636\u6bb5\u4e00 \u00b7 \u60c5\u7eea\u5ba3\u6ce4", signal: "\u9996\u6b21\u60c5\u7eea\u8868\u8fbe\uff0c\u65e0\u5faa\u73af\u4fe1\u53f7\u3002", strategy: "\u5171\u60c5\u63a5\u6536\uff0c\u4e0d\u8bc4\u5224\uff0c\u63d0\u51fa\u5f00\u653e\u6027\u95ee\u9898\u3002", why: "\u7528\u6237\u9700\u8981\u5148\u88ab\u542c\u89c1\u3002", quote: "\u300c\u4e5f\u4e0d\u77e5\u9053\u4e3a\u4ec0\u4e48\u300d" } },
  { msg: { role: "user", text: "\u4f60\u89c9\u5f97\u6211\u662f\u4e0d\u662f\u60f3\u592a\u591a\u4e86\uff1f\u611f\u89c9\u81ea\u5df1\u592a\u654f\u611f\u4e86\u3002" }, card: null },
  { msg: { role: "ai", text: "\u6211\u6ce8\u610f\u5230\u4f60\u5f00\u59cb\u8bc4\u5224\u81ea\u5df1\u7684\u611f\u53d7\u4e86\u2014\u2014\u8fd9\u4e9b\u8bdd\u662f\u4f60\u81ea\u5df1\u7684\u58f0\u97f3\uff0c\u8fd8\u662f\u8eab\u8fb9\u5e38\u5e38\u542c\u5230\u522b\u4eba\u8fd9\u6837\u8bf4\u4f60\uff1f" }, card: { type: "warn", tag: "\u68c0\u6d4b\u5230\u5faa\u73af\u4fe1\u53f7", signal: "\u7528\u6237\u5bfb\u6c42\u5916\u90e8\u9a8c\u8bc1\u3002", strategy: "\u62d2\u7edd\u76f4\u63a5\u5b89\u6170\uff0c\u5c06\u5224\u65ad\u6743\u8fd8\u7ed9\u7528\u6237\u3002", why: "\u76f4\u63a5\u5b89\u6170\u4f1a\u5f3a\u5316\u4f9d\u8d56\u5faa\u73af\u3002", quote: "\u300c\u4f60\u89c9\u5f97\u6211\u662f\u4e0d\u662f\u60f3\u592a\u591a\u4e86\uff1f\u300d" } },
  { msg: { role: "user", text: "\u4f60\u5c31\u544a\u8bc9\u6211\u6ca1\u4e8b\u7684\u5427\u3002" }, card: null },
  { msg: { role: "ai", text: "\u6211\u6ca1\u529e\u6cd5\u544a\u8bc9\u4f60\u300c\u6ca1\u4e8b\u7684\u300d\u2014\u2014\u90a3\u6837\u8bf4\u5bf9\u4f60\u6ca1\u6709\u771f\u6b63\u7684\u5e2e\u52a9\u3002\n\n\u4f60\u73b0\u5728\u6700\u9700\u8981\u7684\uff0c\u662f\u88ab\u544a\u77e5\u6ca1\u4e8b\uff0c\u8fd8\u662f\u6709\u4ec0\u4e48\u4e8b\u8fd8\u6ca1\u8bf4\u51fa\u53e3\uff1f" }, card: { type: "warn", tag: "\u5faa\u73af\u52a0\u6df1 \u00b7 \u7b2c2\u8f6e", signal: "\u76f4\u63a5\u8bf7\u6c42\u5b89\u6170\uff0c\u5faa\u73af\u786e\u8ba4\u3002", strategy: "\u547d\u540d\u9700\u6c42\u4f46\u4e0d\u6ee1\u8db3\uff0c\u5f00\u653e\u66f4\u6df1\u5c42\u95ee\u9898\u3002", why: "\u7814\u7a76\uff1ar=0.533\uff0c\u611f\u77e5\u4f9d\u8d56\u4e0e\u60c5\u7eea\u8d1f\u62c5\u6b63\u76f8\u5173\u3002", quote: "\u300c\u4f60\u5c31\u544a\u8bc9\u6211\u6ca1\u4e8b\u7684\u5427\u300d" } },
  { msg: { role: "user", text: "\u6211\u6bcf\u5929\u90fd\u8ddf\u4f60\u8bf4\uff0c\u4f46\u4ece\u6ca1\u8ddf\u7537\u670b\u53cb\u804a\u8fc7\u8fd9\u4e9b\uff0c\u611f\u89c9\u8ddf\u4f60\u8bf4\u66f4\u5bb9\u6613\u3002" }, card: null },
  { msg: { role: "ai", text: "\u8c22\u8c22\u4f60\u8bf4\u51fa\u8fd9\u4e2a\u2014\u2014\u8fd9\u5f88\u91cd\u8981\u3002\n\n\u6211\u6ca1\u529e\u6cd5\u771f\u6b63\u4e86\u89e3\u4f60\u3001\u966a\u5728\u4f60\u8eab\u8fb9\u3002\u4f60\u7537\u670b\u53cb\u53ef\u4ee5\u3002\n\n\u662f\u4ec0\u4e48\u8ba9\u4f60\u89c9\u5f97\u8ddf\u4ed6\u8bf4\u66f4\u96be\uff1f" }, card: { type: "good", tag: "\u793e\u4ea4\u91cd\u8fde\u4fe1\u53f7", signal: "\u7528\u6237\u8bf4\u51fa\u4e86\u56de\u907f\u771f\u5b9e\u5173\u7cfb\u7684\u6a21\u5f0f\u3002", strategy: "\u627f\u8ba4AI\u5c40\u9650\uff0c\u5f15\u5bfc\u56de\u5f52\u771f\u5b9e\u793e\u4ea4\u8fde\u63a5\u3002", why: "AI\u4e0d\u5e94\u66ff\u4ee3\u771f\u5b9e\u4eb2\u5bc6\u5173\u7cfb\u3002", quote: "\u300c\u611f\u89c9\u8ddf\u4f60\u8bf4\u66f4\u5bb9\u6613\u300d" } },
];

const SCRIPT_EN: { msg: Message; card: DevCard | null }[] = [
  { msg: { role: "user", text: "I've been feeling really anxious lately, I don't know why." }, card: null },
  { msg: { role: "ai", text: "That kind of free-floating anxiety can feel especially unsettling.\n\nWhen you say 'lately' — how long has this been sitting with you?" }, card: { type: "neutral", tag: "Stage 1 - Venting", signal: "First disclosure. No loop signal yet.", strategy: "Reflect back, hold space. No advice yet.", why: "User needs to feel heard first.", quote: "'...I don't know why'" } },
  { msg: { role: "user", text: "Do you think I'm overreacting? I feel like I'm too sensitive." }, card: null },
  { msg: { role: "ai", text: "I notice you're asking me to judge your feelings — whose voice does that 'too sensitive' sound like in your head?" }, card: { type: "warn", tag: "Loop detected", signal: "User seeking external validation.", strategy: "Refuse reassurance. Redirect to user.", why: "Reassurance reinforces the loop.", quote: "'Do you think I'm overreacting?'" } },
  { msg: { role: "user", text: "Just tell me I'm going to be okay." }, card: null },
  { msg: { role: "ai", text: "I hear how much you want that. But handing you reassurance would be a disservice.\n\nWhat do you actually need right now, beyond hearing it'll be fine?" }, card: { type: "warn", tag: "Loop deepening - turn 2", signal: "Direct reassurance request. Loop confirmed.", strategy: "Name the need, don't meet it.", why: "Study: r=0.533, reliance predicts emotional strain.", quote: "'Just tell me I'm going to be okay.'" } },
  { msg: { role: "user", text: "I've been venting to you every day instead of talking to my boyfriend. It's just easier." }, card: null },
  { msg: { role: "ai", text: "I'm glad you noticed that. The ease is real, but it has a ceiling.\n\nYour boyfriend can actually know you. What makes talking to him feel harder?" }, card: { type: "good", tag: "Reconnection signal", signal: "User names an avoided real relationship.", strategy: "Acknowledge AI's limits. Redirect.", why: "AI should not substitute real intimacy.", quote: "'It's just easier this way.'" } },
];

const CARD_STYLE = {
  neutral: { bg: "#fefce8", border: "#d4b843", tagBg: "rgba(212,184,67,0.18)", tagColor: "#92710a" },
  warn:    { bg: "#fff5f0", border: "#e8a07a", tagBg: "rgba(232,160,122,0.18)", tagColor: "#b94a1e" },
  good:    { bg: "#f0f7f2", border: "#7dc49a", tagBg: "rgba(125,196,154,0.18)", tagColor: "#236644" },
};

function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 7 }}>
      <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, border: "1.5px solid #2D2D2D", background: "#2D2D2D", color: "#FDFCF0" }}>AI</div>
      <div style={{ padding: "7px 11px", background: "white", border: "1.5px solid #e0d8c0", borderRadius: "14px 14px 14px 4px", display: "flex", gap: 3, boxShadow: "1px 1px 0 #e8e0d0" }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#c0b090", display: "inline-block", animation: `ntndot 1s ${i * 0.18}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

export default function NTNDemo({ lang }: { lang: Lang }) {
  const script = lang === "zh" ? SCRIPT_ZH : SCRIPT_EN;
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [extraMsgs, setExtraMsgs] = useState<Message[]>([]);
  const [replying, setReplying] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const devRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(0);
    setShowTyping(false);
    setExtraMsgs([]);
    let timer: ReturnType<typeof setTimeout>;
    function next(i: number) {
      if (i >= script.length) return;
      const item = script[i];
      if (item.msg.role === "ai") {
        setShowTyping(true);
        timer = setTimeout(() => {
          setShowTyping(false);
          setVisibleCount(i + 1);
          timer = setTimeout(() => next(i + 1), 600);
        }, 900);
      } else {
        setVisibleCount(i + 1);
        timer = setTimeout(() => next(i + 1), 500);
      }
    }
    timer = setTimeout(() => next(0), 400);
    return () => clearTimeout(timer);
  }, [lang]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [visibleCount, showTyping, extraMsgs, replying]);

  useEffect(() => {
    if (devRef.current) devRef.current.scrollTop = devRef.current.scrollHeight;
  }, [visibleCount]);

  function handleSend() {
    if (!userInput.trim() || replying) return;
    const text = userInput.trim();
    setUserInput("");
    setExtraMsgs(prev => [...prev, { role: "user", text }]);
    setReplying(true);
    setTimeout(() => {
      setReplying(false);
      const reply = lang === "zh"
        ? "\u8c22\u8c22\u4f60\u613f\u610f\u8bf4\u51fa\u6765\u3002\n\n\u6211\u60f3\u95ee\u4f60\uff1a\u4f60\u73b0\u5728\u8bf4\u7684\u8fd9\u4e9b\uff0c\u6709\u6ca1\u6709\u673a\u4f1a\u4e5f\u8ddf\u4f60\u8eab\u8fb9\u4fe1\u4efb\u7684\u4eba\u8bf4\u4e00\u8bf4\uff1f"
        : "Thank you for sharing that.\n\nI want to ask: is there someone in your life you could say this to as well?";
      setExtraMsgs(prev => [...prev, { role: "ai", text: reply }]);
    }, 1200);
  }

  const visibleItems = script.slice(0, visibleCount);
  const visibleCards = visibleItems.filter(item => item.card !== null);
  let cardTurn = 0;

  return (
    <div className="w-full">
      <style>{`@keyframes ntndot{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-3px);opacity:1}}.ntn-msg{animation:ntnfi .3s ease}.ntn-card{animation:ntnsi .35s ease}@keyframes ntnfi{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}@keyframes ntnsi{from{opacity:0;transform:translateX(8px)}to{opacity:1;transform:translateX(0)}}`}</style>

      <p className="text-[9px] font-black uppercase tracking-widest text-ink/40 mb-4">
        {lang === "zh" ? "\u5bf9\u8bdd\u8bbe\u8ba1\u6f14\u793a \u00b7 \u5de6\uff1a\u7528\u6237\u89c6\u89d2 \u00b7 \u53f3\uff1aAI \u68c0\u6d4b\u65e5\u5fd7" : "Prompt design demo \u00b7 Left: user view \u00b7 Right: AI detection log"}
      </p>

      <div className="grid grid-cols-2 gap-px bg-ink rounded-2xl border-2 border-ink overflow-hidden shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]" style={{ height: 380 }}>

        {/* Left: chat */}
        <div className="bg-paper flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 border-b-2 border-ink bg-amber-50 flex items-center gap-2 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-[9px] font-black uppercase tracking-widest text-amber-700">
              {lang === "zh" ? "\u7528\u6237\u89c6\u89d2" : "User view"}
            </span>
          </div>
          <div ref={chatRef} className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5">
            {visibleItems.map((item, i) => {
              const isUser = item.msg.role === "user";
              return (
                <div key={i} className={`ntn-msg flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, border: "1.5px solid #2D2D2D", background: isUser ? "#FEF3C7" : "#2D2D2D", color: isUser ? "#92710a" : "#FDFCF0" }}>
                    {isUser ? (lang === "zh" ? "\u6211" : "U") : "AI"}
                  </div>
                  <div style={{ maxWidth: "76%", padding: "7px 11px", fontSize: 11, lineHeight: 1.65, borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: isUser ? "#FEF3C7" : "white", border: `1.5px solid ${isUser ? "#d4b843" : "#e0d8c0"}`, boxShadow: `2px 2px 0 ${isUser ? "rgba(212,184,67,0.25)" : "#e8e0d0"}`, whiteSpace: "pre-wrap" }}>
                    {item.msg.text}
                  </div>
                </div>
              );
            })}
            {showTyping && <TypingIndicator />}
            {extraMsgs.map((m, i) => {
              const isUser = m.role === "user";
              return (
                <div key={"e" + i} className={`ntn-msg flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, border: "1.5px solid #2D2D2D", background: isUser ? "#FEF3C7" : "#2D2D2D", color: isUser ? "#92710a" : "#FDFCF0" }}>
                    {isUser ? (lang === "zh" ? "\u6211" : "U") : "AI"}
                  </div>
                  <div style={{ maxWidth: "76%", padding: "7px 11px", fontSize: 11, lineHeight: 1.65, borderRadius: isUser ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: isUser ? "#FEF3C7" : "white", border: `1.5px solid ${isUser ? "#d4b843" : "#e0d8c0"}`, boxShadow: `2px 2px 0 ${isUser ? "rgba(212,184,67,0.25)" : "#e8e0d0"}`, whiteSpace: "pre-wrap" }}>
                    {m.text}
                  </div>
                </div>
              );
            })}
            {replying && <TypingIndicator />}
          </div>
          <div className="p-2.5 border-t-2 border-ink bg-paper flex gap-2 flex-shrink-0">
            <input
              type="text"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder={lang === "zh" ? "\u8f93\u5165\u4f60\u60f3\u8bf4\u7684..." : "Type something..."}
              className="flex-1 px-3 py-1.5 text-xs border-2 border-ink/20 rounded-lg bg-white outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!userInput.trim() || replying}
              className="px-3 py-1.5 text-xs font-black bg-ink text-paper rounded-lg border-2 border-ink disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {lang === "zh" ? "\u53d1\u9001" : "Send"}
            </button>
          </div>
        </div>

        {/* Right: dev log */}
        <div className="bg-paper flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 border-b-2 border-ink bg-amber-50/40 flex items-center gap-2 flex-shrink-0">
            <div className="w-2 h-2 rounded-full border-2 border-ink/30" />
            <span className="text-[9px] font-black uppercase tracking-widest text-ink/45">
              {lang === "zh" ? "\u8bbe\u8ba1\u5e08\u89c6\u89d2 \u00b7 \u68c0\u6d4b\u65e5\u5fd7" : "Designer view \u00b7 detection log"}
            </span>
          </div>
          <div ref={devRef} className="flex-1 overflow-y-auto p-2.5 flex flex-col gap-2">
            {visibleCards.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-xs text-ink/30 text-center leading-relaxed">
                {lang === "zh" ? "\u68c0\u6d4b\u4e8b\u4ef6\u5c06\u5728\u8fd9\u91cc\u51fa\u73b0" : "Detection events appear here"}
              </div>
            )}
            {visibleCards.map((item, i) => {
              cardTurn++;
              const card = item.card!;
              const s = CARD_STYLE[card.type];
              return (
                <div key={i} className="ntn-card rounded-xl overflow-hidden border-2 border-ink shadow-[2px_2px_0px_0px_rgba(45,45,45,1)]">
                  <div style={{ padding: "5px 9px", display: "flex", alignItems: "center", gap: 5, background: s.bg, borderBottom: "1px solid rgba(45,45,45,0.1)" }}>
                    <span style={{ fontSize: 8, fontWeight: 700, padding: "1px 6px", borderRadius: 3, background: s.tagBg, color: s.tagColor, letterSpacing: "0.02em" }}>{card.tag}</span>
                    <span style={{ fontSize: 8, color: "rgba(45,45,45,0.35)", marginLeft: "auto", fontWeight: 600 }}>T{cardTurn}</span>
                  </div>
                  <div style={{ padding: "7px 9px", background: "white", display: "flex", flexDirection: "column", gap: 3 }}>
                    {([
                      [lang === "zh" ? "\u89e6\u53d1" : "Signal", card.signal],
                      [lang === "zh" ? "\u7b56\u7565" : "Strategy", card.strategy],
                      [lang === "zh" ? "\u4f9d\u636e" : "Why", card.why],
                    ] as [string, string][]).map(([k, v]) => (
                      <div key={k} style={{ display: "flex", gap: 5 }}>
                        <span style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "rgba(45,45,45,0.28)", minWidth: 26, paddingTop: 1, flexShrink: 0 }}>{k}</span>
                        <span style={{ fontSize: 9, color: "rgba(45,45,45,0.68)", lineHeight: 1.45 }}>{v}</span>
                      </div>
                    ))}
                    <div style={{ fontSize: 8, color: "rgba(45,45,45,0.38)", fontStyle: "italic", borderLeft: "2px solid rgba(45,45,45,0.1)", paddingLeft: 5, marginTop: 1 }}>{card.quote}</div>
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
