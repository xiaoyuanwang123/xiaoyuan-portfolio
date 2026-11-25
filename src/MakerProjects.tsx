import { BookOpen, TreeDeciduous, createLucideIcon, type LucideIcon } from "lucide-react";

const YarnAndHook = createLucideIcon("YarnAndHook", [
  ["circle", { cx: "9", cy: "15", r: "7", key: "ball" }],
  ["path", { d: "M3.1 11.2c3.8 1 7.2 4 9.9 9.5M5.9 8.7c4 1.3 7.4 4 10 7.4M9.7 8c2.5 1.2 4.4 2.7 5.8 4.5M4.8 20.6c1.1-1.4 2.5-2.7 4.1-3.8", key: "strands" }],
  ["path", { d: "m17.5 21 4.2-14.4a1.9 1.9 0 0 0-3.6-1.2l-.5 1.5", key: "hook" }],
]);

type Language = "zh" | "en";
type Bilingual = { zh: string; en: string };
export type MakerProjectId = "garden-simulator" | "crochet-architect";

type Project = {
  id: MakerProjectId;
  name: Bilingual;
  category: Bilingual;
  hook: Bilingual;
  cardDescription: Bilingual;
  description: Bilingual;
  status: Bilingual;
  hero: string;
  heroAlt: Bilingual;
  icon: LucideIcon;
  palette: string;
  pages: { path: string; title: Bilingual }[];
};

const portfolioPdf = "/maker/wang-xiaoyuan-maker-portfolio-v2.pdf";

const projects: Project[] = [
  {
    id: "garden-simulator",
    name: { zh: "Garden Simulator（园林模拟器）", en: "Garden Simulator" },
    category: { zh: "实体交互装置", en: "Tangible interaction" },
    hook: { zh: "搭建你心中的园林", en: "Build the garden you imagine" },
    cardDescription: { zh: "插卡搭建园林，在屏幕上看它实时成形。", en: "Build a garden with cards and watch it take shape on screen." },
    description: {
      zh: "把亭台、树木和水面变成可自由拼搭的卡片。我完成了园林三维建模与卡片制作，并用 RFID 识别把每次插卡同步到显示器。玩家边搭边看，自己的园林随摆放逐步成形。",
      en: "I turned pavilions, trees and water into cards players can arrange freely. I modelled the garden, made the cards and used RFID to bring each placement to the screen, so players can watch their garden take shape as they build it.",
    },
    status: {
      zh: "实体拼搭与屏幕反馈已实现。戴上头显游览自建园林是后续概念。",
      en: "The tabletop build and live screen feedback are working. Touring your own garden in VR is a concept for a future iteration.",
    },
    hero: "/maker/garden-board.jpg",
    heroAlt: { zh: "手把一张建筑卡插入网格底板", en: "A hand inserts a building card into the gridded base" },
    icon: TreeDeciduous,
    palette: "bg-[#E2EBD5] text-[#385340]",
    pages: [
      { path: "/maker/portfolio-v2-pages/page-02.png", title: { zh: "搭建你心中的园林", en: "Build the garden you imagine" } },
      { path: "/maker/portfolio-v2-pages/page-03.png", title: { zh: "从中式园林提取可组合的元素", en: "Modular elements from Chinese gardens" } },
      { path: "/maker/portfolio-v2-pages/page-04.png", title: { zh: "定义用户怎样拼搭、查看和调整", en: "How visitors build, view and revise" } },
      { path: "/maker/portfolio-v2-pages/page-05.png", title: { zh: "做出卡片、底板与识别原型", en: "Cards, base plate and recognition prototype" } },
      { path: "/maker/portfolio-v2-pages/page-06.png", title: { zh: "从手绘卡片到虚拟园林", en: "From hand-drawn cards to a virtual garden" } },
      { path: "/maker/portfolio-v2-pages/page-07.png", title: { zh: "演示园林如何随插卡逐步生成", en: "Demonstration of the garden taking shape" } },
    ],
  },
  {
    id: "crochet-architect",
    name: { zh: "Crochet Architect（钩织建筑师）", en: "Crochet Architect" },
    category: { zh: "3D 打印与钩织实验", en: "3D printing and crochet" },
    hook: { zh: "让钩织作品立起来", en: "Give crochet a shape that holds" },
    cardDescription: { zh: "用 3D 打印骨架给立体钩织作品定形。", en: "Use 3D-printed frames to shape three-dimensional crochet." },
    description: {
      zh: "访谈 2 位钩织爱好者后，我提出用 3D 打印骨架帮助复杂钩织作品定形，并设计了把三维模型转化为可打印骨架的工具界面。随后用 Rhino 建模、打印打样，通过 3 组形态实验验证了骨架的辅助成型作用。",
      en: "Interviews with two crochet makers led me to explore printed frames for complex forms. I designed a tool interface for turning a 3D model into a printable frame. I modelled the frames in Rhino, printed samples and tested the method across three shapes.",
    },
    status: {
      zh: "完成三角形、方形和圆锥共 3 组打样实验。骨架生成工具为界面概念。",
      en: "I completed triangle, square and cone samples. The frame-generation tool is an interface concept.",
    },
    hero: "/maker/crochet-tower.jpg",
    heroAlt: { zh: "带灯光的手工钩织塔楼样件和毛线", en: "An illuminated handmade crochet tower beside balls of yarn" },
    icon: YarnAndHook,
    palette: "bg-[#F5E7BF] text-[#694F29]",
    pages: [
      { path: "/maker/portfolio-v2-pages/page-08.png", title: { zh: "立体钩织怎样成型", en: "How crochet takes three-dimensional form" } },
      { path: "/maker/portfolio-v2-pages/page-09.png", title: { zh: "了解钩织创作者的制作难点", en: "Understanding where crochet makers struggle" } },
      { path: "/maker/portfolio-v2-pages/page-10.png", title: { zh: "从两位爱好者的访谈到骨架假设", en: "From two interviews to the frame hypothesis" } },
      { path: "/maker/portfolio-v2-pages/page-11.png", title: { zh: "把骨架生成过程做成界面概念", en: "The frame-generation interface concept" } },
      { path: "/maker/portfolio-v2-pages/page-12.png", title: { zh: "用建模、打印和钩织验证成型", en: "Testing form through modelling, printing and crochet" } },
      { path: "/maker/portfolio-v2-pages/page-13.png", title: { zh: "用手工样件检验塔楼细节", en: "Checking tower details with a handmade prototype" } },
    ],
  },
];

export default function MakerProjects({ lang, onSelect }: { lang: Language; onSelect: (id: MakerProjectId) => void }) {
  const zh = lang === "zh";
  return (
    <section id="maker" aria-labelledby="maker-title" className="scroll-mt-24 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-center gap-4">
          <h2 id="maker-title" tabIndex={-1} className="font-serif text-3xl font-black tracking-tighter font-elegant md:text-5xl">
            {zh ? "创客与交互设计" : "Maker & Interaction Works"}
          </h2>
          <div aria-hidden="true" className="h-px flex-1 bg-ink/20" />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map(project => (
            <button key={project.id} type="button" onClick={() => onSelect(project.id)} aria-haspopup="dialog" aria-labelledby={`${project.id}-title`} className={`group retro-card-hover flex min-h-56 w-full cursor-pointer flex-col items-start rounded-2xl border-2 border-ink p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:min-h-64 md:p-8 ${project.palette}`}>
              <span aria-hidden="true" className="mb-5 rounded-xl border border-ink bg-paper p-3 shadow-[3px_3px_0px_0px_rgba(45,45,45,1)] transition-transform group-hover:rotate-6">
                <project.icon className="h-7 w-7" strokeWidth={1.8} />
              </span>
              <span className="mb-4 text-base font-bold">{project.category[lang]}</span>
              <span id={`${project.id}-title`} className="mb-2 font-serif text-2xl font-black leading-tight text-ink md:text-3xl">{project.name[lang]}</span>
              <span className="mb-6 text-sm font-medium leading-relaxed text-ink/75">{project.cardDescription[lang]}</span>
              <span className="mt-auto flex w-full items-center gap-2 border-t border-ink/15 pt-4 text-base font-bold text-ink">
                <BookOpen className="h-4 w-4" aria-hidden="true" /> {zh ? "查看详情" : "View details"}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MakerProjectDetail({ id, lang }: { id: MakerProjectId; lang: Language }) {
  const project = projects.find(item => item.id === id)!;
  const zh = lang === "zh";
  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-24 md:pt-28">
      <header className="mb-8 max-w-4xl">
        <p className="mb-3 text-base font-bold text-terracotta">{project.category[lang]}</p>
        <h1 id="maker-detail-title" className="mb-3 font-serif text-[clamp(1.7rem,5vw,3.5rem)] font-black leading-tight">{project.name.en}</h1>
        <p className="font-serif text-xl font-bold text-ink/75 md:text-2xl">{project.hook[lang]}</p>
      </header>

      <div className="mb-12 grid items-center gap-7 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-12">
        <figure className={`w-full max-w-[420px] overflow-hidden rounded-2xl border-2 border-ink ${project.palette}`}>
          <img src={project.hero} alt={project.heroAlt[lang]} className="max-h-64 w-full object-contain" />
        </figure>

        <section aria-labelledby="maker-implementation" className="space-y-4">
          <h2 id="maker-implementation" className="font-serif text-2xl font-black md:text-3xl">{zh ? "设计与实现" : "Design and implementation"}</h2>
          <p className="text-[1.15rem] leading-relaxed text-ink/75">{project.description[lang]}</p>
          <p className="border-l-2 border-terracotta pl-4 text-base leading-relaxed text-ink/75">{project.status[lang]}</p>
        </section>
      </div>

      <section aria-labelledby="maker-process" className="space-y-6 border-t border-ink/15 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 id="maker-process" className="font-serif text-2xl font-black md:text-3xl">{zh ? "制作过程" : "Making process"}</h2>
          <a href={`${portfolioPdf}#page=${id === "garden-simulator" ? 2 : 8}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded text-base font-bold text-ink/75 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            <BookOpen aria-hidden="true" className="h-4 w-4" /> {zh ? "打开作品集 PDF" : "Open portfolio PDF"}
          </a>
        </div>
        {project.pages.map(page => (
          <a key={page.path} href={page.path} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-ink/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            <img src={page.path} alt={page.title[lang]} width={2000} height={1125} loading="lazy" decoding="async" className="h-auto w-full" />
          </a>
        ))}
      </section>
    </main>
  );
}
