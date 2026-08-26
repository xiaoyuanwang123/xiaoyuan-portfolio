import { useState } from "react";
import { ArrowRight, MessageCircle, ScanSearch, Sparkles, Waypoints } from "lucide-react";

type Lang = "zh" | "en";

export default function NTNDemo({ lang, activeStep, onStepChange, showSelector = true }: { lang: Lang; activeStep?: number; onStepChange?: (step: number) => void; showSelector?: boolean }) {
  const [internalActive, setInternalActive] = useState(0);
  const active = activeStep ?? internalActive;
  const setActive = (step: number) => { setInternalActive(step); onStepChange?.(step); };
  const zh = lang === "zh";
  const steps = zh ? [
    { title: "读取当前需要", label: "PRESENT TURN", text: "当前需要直接塑造普通回应：情绪表达得到简短承接，具体任务得到直接帮助，用户已经觉察时只按需引导。三条路径随后都回到自然对话。", icon: MessageCircle },
    { title: "检查同次停留", label: "SAME SESSION", text: "判断同一段持续对话中的担忧是否仍在停留。证据仍在移动或信息不足时，继续、暂停或把控制交还用户；只有证据充分时才出现 Micro Mirror。", icon: ScanSearch },
    { title: "检查跨时重复", label: "LATER SESSIONS", text: "跨日期证据需要可追溯且足够稳定。没有重复模式就继续普通对话；证据充分才出现 Across-time Mirror；证据冲突时停止跨会话推断。", icon: Sparkles },
    { title: "Mirror 后交还选择", label: "AFTER A MIRROR", text: "任一 Mirror 后先读取用户回应。接受或纠正后可选择四个支持方向；拒绝或跳过则直接返回普通对话。完成一次选择后关闭状态。", icon: Waypoints },
  ] : [
    { title: "Read the current need", label: "PRESENT TURN", text: "The present need shapes the ordinary reply: acknowledge emotional venting briefly, answer practical needs directly, and guide only as requested when the user already recognises the pattern.", icon: MessageCircle },
    { title: "Check same-session dwelling", label: "SAME SESSION", text: "Ask whether sustained dwelling remains. Moving or low-information evidence returns control; sufficient same-session evidence can qualify a Micro Mirror.", icon: ScanSearch },
    { title: "Check recurrence across time", label: "LATER SESSIONS", text: "Across-day evidence must be traceable and stable. No recurrence continues ordinary conversation; sufficient evidence qualifies a Mirror; uncertainty stops cross-session inference.", icon: Sparkles },
    { title: "Return choice after a Mirror", label: "AFTER A MIRROR", text: "Read the user's response after either Mirror. Accepting or correcting opens four support directions; rejecting or skipping returns directly to ordinary conversation. Then close the state.", icon: Waypoints },
  ];
  const routes = zh ? ["继续待一会儿", "换个角度看看", "选择一个小步骤", "把支持带到聊天之外"] : ["Stay with it", "Try another angle", "Pick one small step", "Move support outside chat"];
  const sidePanels = zh ? [
    { heading: "用户输入分成三条当前需要", note: "三条路径都继续自然对话。", items: [["需要情绪承接", "简短承接；默认不持续追问"], ["需要任务帮助", "回答具体请求或协助组织任务"], ["用户已觉察反刍／反复求证模式", "确认其自我觉察；只在用户提出时继续引导"]] },
    { heading: "持续停留仍然存在吗？", note: "同一次会话内的二路判断。", items: [["仍在移动／信息不足", "继续、暂停或把返回控制交给用户"], ["同次证据充分", "展示暂定、可纠正的 Micro Mirror"]] },
    { heading: "相同证据跨日期再次出现吗？", note: "跨时间判断包含安全降级。", items: [["没有重复模式", "继续普通对话"], ["证据充分", "展示来源并允许纠正或跳过的 Across-time Mirror"], ["证据不确定／冲突", "停止跨会话推断，改用无记忆回应"]] },
    { heading: "用户回应决定出口", note: "接受／纠正后才展开四个方向。", items: routes.map((route, i) => [route, ["继续倾听，不重复分析", "提供不同的观察框架", "形成一个可完成的小行动", "提供适度的现实支持路线"][i]] as string[]) },
  ] : [
    { heading: "User input branches into three present needs", note: "All three return to ordinary conversation.", items: [["Needs acknowledgement", "Acknowledge briefly; do not keep probing by default"], ["Needs task help", "Answer the concrete request or organise the task"], ["Pattern already noticed", "Acknowledge awareness; guide only as requested"]] },
    { heading: "Does sustained dwelling remain?", note: "A two-way same-session decision.", items: [["Still moving / low information", "Continue, pause, or return control"], ["Enough same-session evidence", "Offer a tentative, correctable Micro Mirror"]] },
    { heading: "Does evidence recur across days?", note: "The cross-time decision includes a safe fallback.", items: [["No recurring pattern", "Continue ordinary conversation"], ["Evidence sufficient", "Show source in an Across-time Mirror; allow correction or skip"], ["Evidence uncertain / conflicting", "Stop cross-session inference and use a memoryless response"]] },
    { heading: "The user's response determines the exit", note: "Four directions open after accept / correct.", items: routes.map((route, i) => [route, ["Listen without repeating analysis", "Offer a genuinely different frame", "Form one completable action", "Offer proportionate real-world support"][i]] as string[]) },
  ];
  const current = steps[active];
  const panel = sidePanels[active];

  return (
    <div className="rounded-[2rem] border-2 border-ink bg-white overflow-hidden shadow-[5px_5px_0px_0px_rgba(45,45,45,1)]">
      <div className="p-5 border-b-2 border-ink bg-amber-50"><p className="text-[9px] font-black uppercase tracking-[.2em] text-amber-700">{zh ? "链路解释 · 点击上方链路图切换对应判断" : "PATHWAY EXPLANATION · CLICK THE PATHWAY ABOVE TO CHANGE STAGE"}</p></div>
      {showSelector && <div className="grid grid-cols-2 md:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return <button key={step.label} onClick={() => setActive(i)} className={`relative origin-center p-4 md:p-5 text-left border-b md:border-b-0 md:border-r last:border-r-0 border-ink/15 transition-colors duration-200 ${active === i ? "bg-ink text-paper z-20" : "bg-white hover:bg-paper z-0"}`}><span className="text-[8px] font-black tracking-widest opacity-50">0{i + 1} · {step.label}</span><Icon className="w-5 h-5 my-3" /><strong className="block text-xs md:text-sm">{step.title}</strong>{i < steps.length - 1 && <ArrowRight className="hidden md:block absolute -right-2.5 top-1/2 z-30 w-5 h-5 p-1 rounded-full bg-amber-300 text-ink" />}</button>;
        })}
      </div>}
      <div key={active} className="p-6 md:p-8 grid md:grid-cols-[.85fr_1.15fr] gap-6 items-start animate-[fadeIn_.28s_ease-out]">
        <div><p className="text-[9px] font-black uppercase tracking-widest text-terracotta mb-2">{current.label}</p><h6 className="text-xl font-serif font-black mb-3">{current.title}</h6><p className="text-sm leading-relaxed text-ink/65">{current.text}</p></div>
        <div className={`rounded-2xl border border-ink/15 p-4 ${active === 1 ? "bg-amber-50" : active === 2 ? "bg-violet-50" : active === 3 ? "bg-blue-50" : "bg-emerald-50"}`}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 mb-3"><h6 className="text-sm font-black">{panel.heading}</h6><p className="text-[9px] text-ink/45">{panel.note}</p></div>
          {active === 3 && <div className="mb-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-[10px] font-bold"><div className="rounded-lg border border-blue-300 bg-white p-2 text-center">{zh ? "任一有效 Mirror" : "Either valid Mirror"}</div><ArrowRight className="w-4 h-4 text-blue-600" /><div className="rounded-lg border border-blue-300 bg-white p-2 text-center">{zh ? "接受／纠正 → 展开方向\n拒绝／跳过 → 返回对话" : "Accept / correct → directions\nReject / skip → conversation"}</div></div>}
          <div className={`grid gap-2 ${active === 0 ? "sm:grid-cols-3" : active === 1 ? "sm:grid-cols-2" : active === 2 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
            {panel.items.map(([title, text], i) => <div key={title} className={`p-3 rounded-xl border bg-white ${active === 1 ? "border-amber-300" : active === 2 && i === 2 ? "border-rose-400" : active === 2 ? "border-violet-300" : active === 3 ? "border-blue-300" : "border-emerald-300"}`}><strong className="block text-[11px] mb-1">{title}</strong><span className="block text-[9px] text-ink/55 leading-relaxed">{text}</span></div>)}
          </div>
          {active > 0 && active < 3 && <div className="mt-3 flex items-center justify-end gap-2 text-[9px] font-bold text-ink/45"><span>{zh ? "所有出口" : "Every exit"}</span><ArrowRight className="w-3 h-3" /><span>{zh ? "返回普通对话" : "Return to ordinary conversation"}</span></div>}
          {active === 3 && <div className="mt-3 rounded-lg border border-blue-300 bg-white px-3 py-2 text-center text-[9px] font-bold">{zh ? "关闭状态 · 仅记录一次 · 返回普通对话 · 不重复展示" : "Close state · record once · return to ordinary conversation · do not repeat"}</div>}
        </div>
      </div>
      <div className="px-6 py-4 bg-emerald-50 border-t border-emerald-200 text-[10px] text-ink/60"><strong className="text-emerald-800">{zh ? "控制原则：" : "Control principle: "}</strong>{zh ? "不诊断、不评分；用户可跳过、纠正或关闭 NTN。" : "No diagnosis or scoring; the user can skip, correct, or disable NTN."}</div>
    </div>
  );
}

export function NTNArchitectureDemo({ lang }: { lang: Lang }) {
  return <NTNDemo lang={lang} />;
}
