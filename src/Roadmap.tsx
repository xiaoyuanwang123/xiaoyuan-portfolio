import { useEffect, useRef } from "react";
import { motion } from "motion/react";

type Language = "zh" | "en";
type Jump = "london" | "weekend" | "monopoly" | "ninja" | "ntn";

// 非线性时间刻度：早年压缩，2025 年以后展开
const ANCHORS: [number, number][] = [
  [2017.667, 0],
  [2022.5, 15],
  [2025.0, 28],
  [2026.0, 48],
  [2026.917, 86],
];
const ym = (y: number, m: number) => y + (m - 1) / 12;
function pos(t: number) {
  if (t <= ANCHORS[0][0]) return 0;
  for (let i = 1; i < ANCHORS.length; i++) {
    const [t0, p0] = ANCHORS[i - 1];
    const [t1, p1] = ANCHORS[i];
    if (t <= t1) return p0 + ((t - t0) / (t1 - t0)) * (p1 - p0);
  }
  return 86;
}
const NOW = ym(2026, 10.35);

const L = {
  zh: { tracks: ["教育", "实习", "研究", "作品"], next: "下一站 ……", scroll: "左右滑动查看" },
  en: { tracks: ["Education", "Internship", "Research", "Work"], next: "Next ……", scroll: "Swipe to explore" },
};

type Item = { track: number; start: number; end?: number; title: { zh: string; en: string }; sub: string; ongoing?: boolean; jump?: Jump; minW?: number; lane?: number };

const ITEMS: Item[] = [
  { track: 0, start: ym(2017, 9), end: ym(2022, 6), title: { zh: "武汉理工 · 建筑学学士", en: "WHUT · B.Arch" }, sub: "2017.09 – 2022.06" },
  { track: 0, start: ym(2022, 9), end: ym(2025, 6), title: { zh: "南京大学 · 建筑学硕士", en: "NJU · M.Arch" }, sub: "2022.09 – 2025.06" },
  { track: 0, start: ym(2025, 9), end: ym(2026, 12), title: { zh: "帝国理工 · 行为科学设计硕士", en: "Imperial · MSc Design with Behavioural Science" }, sub: "2025.09 – 2026.12", ongoing: true },
  { track: 1, start: ym(2025, 5), end: ym(2025, 9), title: { zh: "腾讯 · 视频号 AI 直播助手", en: "Tencent · Channels AI Live Assistant" }, sub: "2025.05 – 09" },
  { track: 1, start: ym(2026, 6), end: NOW, title: { zh: "百度 · 实时交互数字人", en: "Baidu · Real-time Digital Human" }, sub: "2026.06 –", ongoing: true },
  { track: 2, start: ym(2026, 1), end: ym(2026, 9), title: { zh: "回声之外 · 毕设", en: "Navigating the Noise · Thesis" }, sub: "2026.01 – 09", jump: "ntn" },
  { track: 3, start: ym(2026, 5), lane: 0, title: { zh: "伦敦行程 V1", en: "London V1" }, sub: "2026.05", jump: "london" },
  { track: 3, start: ym(2026, 5.3), lane: 1, title: { zh: "大富翁", en: "Monopoly" }, sub: "2026.05", jump: "monopoly" },
  { track: 3, start: ym(2026, 5.6), lane: 2, title: { zh: "面试忍者", en: "Interview Ninja" }, sub: "2026.05", jump: "ninja" },
  { track: 3, start: ym(2026, 10), lane: 0, title: { zh: "周末指南 V2", en: "Weekend V2" }, sub: "2026.10", jump: "weekend" },
];

const TICKS: [number, string][] = [[ym(2017, 9), "2017"], [2022.5, "2022"], [2025.0, "2025"], [2026.0, "2026"], [ym(2026, 6), "2026.06"]];

export default function Roadmap({ lang, onJump }: { lang: Language; onJump: (j: Jump) => void }) {
  const s = L[lang];
  const ROW = 70, WROW = 116;
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (el && el.scrollWidth > el.clientWidth) el.scrollLeft = el.scrollWidth;
  }, []);
  const hRow = (i: number) => (i === 3 ? WROW : ROW);
  const london = ITEMS.find(i => i.jump === "london")!, weekend = ITEMS.find(i => i.jump === "weekend")!;

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-16">
      <div className="flex items-end justify-between mb-6">
        <h3 className="text-xl font-serif font-black text-ink/80 uppercase tracking-[0.2em]">Roadmap</h3>
        <span className="text-[10px] text-ink/35 md:hidden">{s.scroll}</span>
      </div>

      <div className="overflow-x-auto" ref={scroller}>
        <div className="flex min-w-[820px]">
          {/* 轨道名 */}
          <div className="w-16 md:w-20 flex-shrink-0 sticky left-0 z-20 bg-paper">
            <div className="h-8" />
            {s.tracks.map((t, i) => (
              <div key={t} className="flex items-start pt-3 text-[11px] font-bold text-ink/40 tracking-wider" style={{ height: hRow(i) }}>{t}</div>
            ))}
          </div>

          {/* 时间区 */}
          <div className="relative flex-1 pr-6">
            {/* 刻度与向下延伸的细线 */}
            <div className="relative h-8">
              {TICKS.map(([t, label], i) => (
                <span key={label} className={`absolute top-1 text-[10px] font-mono text-ink/35 whitespace-nowrap ${i === 0 ? "" : "-translate-x-1/2"}`} style={{ left: `${pos(t)}%` }}>{label}</span>
              ))}
              <span className="absolute top-1 text-[10px] text-ink/35 whitespace-nowrap" style={{ left: `${pos(NOW) + 3}%` }}>{s.next}</span>
            </div>
            <div className="absolute left-0 right-6 top-8 bottom-0 pointer-events-none">
              {TICKS.map(([t, label]) => (
                <div key={label} className="absolute top-0 bottom-0 w-px bg-ink/10" style={{ left: `${pos(t)}%` }} />
              ))}
            </div>

            {s.tracks.map((_, ti) => (
              <div key={ti} className="relative border-t border-ink/10" style={{ height: hRow(ti) }}>
                {ti === 3 && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" preserveAspectRatio="none" viewBox={`0 0 100 ${WROW}`}>
                    <path d={`M ${pos(london.start)} 14 C ${pos(london.start) + 5} 104, ${pos(weekend.start) - 5} 104, ${pos(weekend.start)} 14`}
                      fill="none" stroke="rgba(45,45,45,.28)" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                  </svg>
                )}
                {ITEMS.filter(it => it.track === ti).map((it, k) => {
                  const left = pos(it.start);
                  const clickable = !!it.jump;
                  if (it.end === undefined) {
                    return (
                      <button key={k} type="button" onClick={() => it.jump && onJump(it.jump)}
                        className="group absolute flex items-center gap-1.5 whitespace-nowrap text-left"
                        style={{ left: `${left}%`, top: 8 + (it.lane ?? 0) * 26, transform: "translateX(-4px)" }}>
                        <span className="w-[7px] h-[7px] rounded-full bg-ink/45 group-hover:bg-ink" />
                        <span className="text-[11px] font-semibold text-ink/70 group-hover:text-ink group-hover:underline underline-offset-2">{it.title[lang]}</span>
                        <span className="text-[9px] font-mono text-ink/30">{it.sub}</span>
                      </button>
                    );
                  }
                  const width = Math.max(pos(it.end) - left, 3);
                  const inner = (
                    <>
                      <div className="relative h-[7px] flex items-center">
                        <span className="absolute left-0 w-[7px] h-[7px] rounded-full bg-ink/40" />
                        <span className={`absolute left-[3px] right-0 ${it.ongoing ? "border-t border-dashed border-ink/35" : "h-px bg-ink/35"}`} />
                        {!it.ongoing && <span className="absolute right-0 w-px h-[7px] bg-ink/35" />}
                      </div>
                      <span className={`block mt-2 text-[11px] font-semibold text-ink/75 leading-tight whitespace-nowrap ${clickable ? "group-hover:text-ink group-hover:underline underline-offset-2" : ""}`}>{it.title[lang]}</span>
                      <span className="block text-[9px] font-mono text-ink/35 mt-0.5 whitespace-nowrap">{it.sub}</span>
                    </>
                  );
                  const style = { left: `${left}%`, width: `${width}%`, minWidth: it.minW };
                  return clickable ? (
                    <button key={k} type="button" onClick={() => onJump(it.jump!)} className="group absolute top-3 text-left cursor-pointer" style={style}>{inner}</button>
                  ) : (
                    <div key={k} className="group absolute top-3 text-left" style={style}>{inner}</div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
