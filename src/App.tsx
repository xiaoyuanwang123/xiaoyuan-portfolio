import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, Heart, Brain, Car, User, X, Languages, ArrowRight,
  BookOpen, Target, Lightbulb, Plus
} from "lucide-react";

type Language = "zh" | "en";

const translations = {
  zh: {
    name: "王小元",
    role: "帝国理工学院研究生",
    intro1: "目前在伦敦帝国理工学院攻读设计与行为科学硕士。",
    intro2: "我用研究和设计，把复杂系统转化为用户可以理解和使用的产品。",
    projectsTitle: "项目经历",
    aboutTitle: "教育背景",
    viewMore: "查看详情",
    aboutText: "从 AI 情感依赖到辅助工具包，这些项目让我看到：好的设计不是给出答案，而是帮人找到自己的路。建筑、行为科学、AI 研究——这些构成了我的思考方式。研究与设计的交叉是我探索的方向。",
    contactText: "欢迎一起交流学习！",
    tags: ["AI", "研究", "产品", "设计", "心理学", "数据"],
    projectDetails: {
      1: { problem: "识别现有产品以留存为导向、结构性诱导用户依赖的设计问题。", solution: "提出反思性提示、边界提示、真实社交引导三项设计策略。", impact: "深入研究AI情感依赖与用户行为模式，作为毕业论文前期基础。", tools: "Python, Google Colab, OLS 回归, 情感分析" },
      2: { problem: "非专业购车用户面临信息过载，难以评估长期成本与生态影响。", solution: "将复杂参数转化为三维决策框架：当前成本、三年预测、碳排放。", impact: "基于 RShiny 开发可运行产品，接入 Maps API，运用 ARIMA 模型预测价格。", tools: "R, Shiny, Maps API, ARIMA" },
      3: { problem: "医学教育中自主练习工具缺失，学生难以准确识别脑肿瘤位置。", solution: "支持即时反馈的交互训练工具，包含肿瘤分类与位置定位两个模块。", impact: "分类模块基于 ResNet-18 迁移学习，测试集准确率达 94.31%。", tools: "MATLAB App Designer, ResNet-18, 图像处理" },
      4: { problem: "自闭症女孩在初潮前缺乏可预期的行动框架，易产生焦虑。", solution: "以自我决定理论(SDT)为框架，设计包含故事书、玩偶、产品的工具包。", impact: "与 autism charity 合作，通过 8 章节故事书帮助用户建立预期。", tools: "产品设计, 用户研究, SDT 理论" }
    }
  },
  en: {
    name: "Xiaoyuan Wang",
    role: "MSc Student at Imperial College London",
    intro1: "MSc Design with Behavioural Science student at Imperial College London.",
    intro2: "I use research and design to turn complex systems into products people can use.",
    projectsTitle: "Project Portfolio",
    aboutTitle: "Education",
    viewMore: "View Details",
    aboutText: "From AI emotional reliance to inclusive toolkits, these projects taught me that good design doesn't hand people answers — it builds the conditions for them to find their own. Architecture, behavioural science, AI research — these are the lenses I look through. Working at their intersection is where I belong.",
    contactText: "Always happy to connect and exchange ideas!",
    tags: ["AI", "Research", "Product", "Design", "Psychology", "Data"],
    projectDetails: {
      1: { problem: "Identified design issues in existing products that induce structural user dependency.", solution: "Proposed three design strategies: reflective prompts, boundary cues, and social signposting.", impact: "Deep research into AI emotional reliance and user behavior patterns for thesis foundation.", tools: "Python, Google Colab, OLS Regression, Sentiment Analysis" },
      2: { problem: "Non-professional car buyers face information overload regarding long-term costs and eco-impact.", solution: "Transformed complex parameters into a 3D decision framework: current cost, 3-year forecast, CO2.", impact: "Developed a functional RShiny app with Maps API integration and ARIMA price forecasting.", tools: "R, Shiny, Maps API, ARIMA" },
      3: { problem: "Lack of autonomous practice tools in medical education for brain tumor identification.", solution: "Interactive training tool with instant feedback, featuring classification and localization modules.", impact: "Classification module based on ResNet-18 transfer learning, achieving 94.31% accuracy.", tools: "MATLAB App Designer, ResNet-18, Image Processing" },
      4: { problem: "Autistic girls lack predictable frameworks before menarche, leading to anxiety.", solution: "Designed a toolkit based on Self-Determination Theory (SDT) with storybooks and dolls.", impact: "Collaborated with autism charity to help users build expectations through 8-chapter stories.", tools: "Product Design, User Research, SDT Framework" }
    }
  }
};

const projects = [
  { id: 1, title: { zh: "Navigating the Noise", en: "Navigating the Noise" }, category: { zh: "AI 情感依赖研究", en: "AI Emotional Reliance Research" }, description: { zh: "识别现有产品设计问题，深入研究AI情感依赖与用户行为模式。", en: "Identifying design issues and researching AI emotional reliance patterns." }, icon: <Brain className="w-8 h-8" />, color: "bg-[#FEF3C7]", accent: "text-amber-600" },
  { id: 2, title: { zh: "CarEcoCompare", en: "CarEcoCompare" }, category: { zh: "车辆决策数据产品", en: "Vehicle Decision Data Product" }, description: { zh: "将复杂技术参数转化为通勤场景下的三维决策框架，辅助车辆选购。", en: "Transforming complex parameters into a 3D decision framework for car buyers." }, icon: <Car className="w-8 h-8" />, color: "bg-[#DBEAFE]", accent: "text-blue-600" },
  { id: 3, title: { zh: "TumorTutor", en: "TumorTutor" }, category: { zh: "脑肿瘤识别工具", en: "Brain Tumor Recognition Tool" }, description: { zh: "基于深度学习的脑肿瘤识别工具，支持分类与位置定位交互训练。", en: "Deep learning tool for brain tumor classification and localization training." }, icon: <Plus className="w-8 h-8" />, color: "bg-[#F3E8FF]", accent: "text-purple-600" },
];

const schools = [
  { id: "icl", name: { zh: "伦敦帝国理工学院", en: "Imperial College London" }, degree: { zh: "设计与行为科学 理学硕士 (在读)", en: "MSc Design with Behavioural Science (Ongoing)" }, period: "2025.09 - 2026.09", image: "IC.jpg", rotation: "-2deg", zIndex: 10 },
  { id: "nju", name: { zh: "南京大学", en: "Nanjing University" }, degree: { zh: "建筑学硕士 | 一等奖学金(x1)、二等奖学金(x2)", en: "Master of Architecture | 1st Class Scholarship (x1), 2nd Class (x2)" }, period: "2022.09 - 2025.06", image: "NJU.jpeg", rotation: "0deg", zIndex: 11 },
  { id: "wit", name: { zh: "武汉理工大学", en: "Wuhan University of Technology" }, degree: { zh: "建筑学学士 | GPA: 3.91/4.00; 优秀毕业生", en: "Bachelor of Architecture | GPA: 3.91/4.00; Outstanding Graduate" }, period: "2017.09 - 2022.06", image: "WHUT.jpg", rotation: "2deg", zIndex: 12 }
];

const p1Content = {
  zh: {
    researchQuestion: "当 AI 成为随手可得的情绪支持工具，即时安慰是否也在悄悄塑造依赖？",
    roles: ["独立项目", "混合方法研究", "AI 与行为设计"],
    whyMatters: [
      { title: "新兴现象", desc: "年轻人越来越多地将 AI 作为日常情感伴侣" },
      { title: "研究张力", desc: "即时安慰虽然有效，但重复的肯定可能强化依赖" },
      { title: "核心问题", desc: "感知依赖是否与情绪负担正相关？" }
    ],
    approach: {
      quant: { title: "定量分析 (N=60)", items: ["使用模式分析", "相关性检验 (Pearson)", "回归模型验证"] },
      qual: { title: "定性分析 (N=11)", items: ["Bigram 词云提取", "语义聚类分析", "情绪极性分析", "核心主题提取"] }
    },
    findings: [
      { id: "A", text: "感知依赖程度越高，用户报告的情绪负担越重 (r=0.53, p<.001)" },
      { id: "B", text: "AI 被体验为'即时、可用、无评判'的避风港" },
      { id: "C", text: "核心问题在于'情感舒适循环'，而非简单的利弊故事" }
    ],
    stories: [
      { title: "情感舒适循环", icon: <Heart className="w-4 h-4" />, desc: "无评判的表达空间，但也可能成为'情绪辅助轮'。", quote: "“它就像我的情绪辅助轮，在压力大时提供支撑。”" },
      { title: "人际连接张力", icon: <User className="w-4 h-4" />, desc: "AI 交流的便捷性可能削弱现实社交的动力。", quote: "“如果我因为跟 AI 倾诉而逃避跟伴侣沟通，这就是红灯。”" },
      { title: "自主性侵蚀", icon: <Brain className="w-4 h-4" />, desc: "用户开始质疑频繁使用 AI 是否影响了独立性。", quote: "“我变得更独立还是更依赖了？老实说，两者都有。”" },
      { title: "设计敏感度", icon: <Sparkles className="w-4 h-4" />, desc: "用户意识到 AI 设计如何塑造了他们的情感期待。", quote: "“我最想改变的是那种'友谊的幻觉'。”" }
    ],
    strategies: [
      { title: "反思性提示", desc: "在对话中加入停顿，引导用户评估当前的自我调节状态。" },
      { title: "边界提示", desc: "通过设计明确 AI 的支持属性，减少'友谊幻觉'。" },
      { title: "社交引导", desc: "在适当的时机引导用户回归现实社交支持网络。" }
    ]
  },
  en: {
    researchQuestion: "As AI becomes an accessible emotional support tool, is instant reassurance quietly shaping dependency?",
    roles: ["Independent Project", "Mixed-methods Research", "AI & Behaviour"],
    whyMatters: [
      { title: "Emerging Phenomenon", desc: "Young adults increasingly use AI as everyday emotional companions." },
      { title: "Research Tension", desc: "Reassurance feels helpful, but repeated cycles may reinforce reliance." },
      { title: "Core Question", desc: "Is perceived reliance associated with increased emotional strain?" }
    ],
    approach: {
      quant: { title: "Quantitative Analysis (N=60)", items: ["Usage patterns", "Pearson correlation", "OLS regression"] },
      qual: { title: "Qualitative Analysis (N=11)", items: ["Bigram extraction", "Semantic clusters", "Sentiment analysis", "Thematic interpretation"] }
    },
    findings: [
      { id: "A", text: "Higher perceived reliance is associated with higher emotional strain (r=0.53, p<.001)" },
      { id: "B", text: "AI is experienced as an 'immediate, available, and non-judgemental' space" },
      { id: "C", text: "The core issue is an 'emotional comfort loop' rather than a simple pro/con story" }
    ],
    stories: [
      { title: "Emotional Comfort Loop", icon: <Heart className="w-4 h-4" />, desc: "A non-judgemental space that can become 'emotional training wheels'.", quote: "'It's like emotional training wheels during moments of stress.'" },
      { title: "Human Connection Tension", icon: <User className="w-4 h-4" />, desc: "The ease of AI interaction may create trade-offs with real social life.", quote: "'Avoiding difficult talks with a partner by venting to AI is a red flag.'" },
      { title: "Autonomy Erosion", icon: <Brain className="w-4 h-4" />, desc: "Users question if frequent AI use influences their sense of independence.", quote: "'Do I feel more or less independent? Honestly, both.'" },
      { title: "Design Sensitivity", icon: <Sparkles className="w-4 h-4" />, desc: "Awareness of how AI design shapes emotional expectations.", quote: "'The first thing I'd change is the illusion of friendship.'" }
    ],
    strategies: [
      { title: "Reflective Prompts", desc: "Encourage users to pause and consider if interaction is helping self-management." },
      { title: "Boundary Cues", desc: "Clarify that AI is a support tool rather than a substitute for human care." },
      { title: "Social Signposting", desc: "Guide users back to friends, family, or professional support networks." }
    ]
  }
};

const p3Content = {
  zh: {
    hero: { title: "TumorTutor", subtitle: "Interactive learning tool for MRI tumor recognition", oneLiner: "通过交互与反馈，学习解读 MRI 扫描影像" },
    whyMatters: [
      { title: "理论依赖", desc: "医学影像学习往往过度依赖理论，缺乏实操感" },
      { title: "工具缺失", desc: "市面上缺少专门针对学生自主练习的交互工具" },
      { title: "反馈滞后", desc: "传统学习方式无法提供即时的判断反馈与纠偏" }
    ],
    interaction: [
      { step: "Step 1", title: "分类肿瘤类型", desc: "在四个类别中进行初步判断", img: "4-type.png" },
      { step: "Step 2", title: "点击肿瘤位置", desc: "在影像中精准定位病灶区域", img: "4-location.png" }
    ],
    howItWorks: {
      classification: { title: "A. Classification", items: ["使用 ResNet-18 深度学习模型", "预测 4 类常见脑肿瘤", "实时反馈用于教学交互"], img: "4-classificationpipeline.png" },
      detection: { title: "B. Detection", items: ["Plane-aware segmentation 算法", "针对不同扫描切面采用不同策略", "精准输出肿瘤区域 (Tumor Region)"], img: "4-segmentationpipeline.png" }
    }
  },
  en: {
    hero: { title: "TumorTutor", subtitle: "Interactive learning tool for MRI tumor recognition", oneLiner: "Learn to interpret MRI scans through interaction and feedback" },
    whyMatters: [
      { title: "Theory Reliance", desc: "Medical imaging education relies heavily on theory over practice." },
      { title: "Lack of Tools", desc: "Few interactive tools exist for autonomous student practice." },
      { title: "Delayed Feedback", desc: "Traditional methods lack instant correction and guidance." }
    ],
    interaction: [
      { step: "Step 1", title: "Classify Tumor Type", desc: "Make an initial judgement among four categories.", img: "4-type.png" },
      { step: "Step 2", title: "Locate Tumor Position", desc: "Precisely pinpoint the lesion area in the scan.", img: "4-location.png" }
    ],
    howItWorks: {
      classification: { title: "A. Classification", items: ["ResNet-18 deep learning architecture", "Predicts 4 types of brain tumors", "Real-time inference for interaction"], img: "4-classificationpipeline.png" },
      detection: { title: "B. Detection", items: ["Plane-aware segmentation algorithm", "Specific strategies for different scan planes", "Outputs precise tumor regions"], img: "4-segmentationpipeline.png" }
    }
  }
};

const p4Content = {
  zh: {
    subtitle: "A sensory-aware learning system",
    oneLiner: "一个多组件干预系统，通过设计降低焦虑并建立自我管理能力",
    heroImg: "5-head.png",
    problem: [
      { quote: "很难沟通这种身体上的变化，她会感到极度恐慌。", context: "沟通困难" },
      { quote: "她无法感知身体内部的变化，直到血迹出现。", context: "感知障碍" },
      { quote: "学校环境太嘈杂，她根本无法在厕所处理这些。", context: "环境压力" }
    ],
    insights: [
      { title: "不可预期性", desc: "对未知身体变化的恐惧" },
      { title: "感官超负荷", desc: "对卫生用品触感的过度敏感" },
      { title: "沟通障碍", desc: "难以表达不适与需求" },
      { title: "缺乏框架", desc: "缺乏结构化的行动流程" }
    ],
    concept: {
      title: "A system, not a single product",
      columns: [
        { title: "WHAT", desc: "包含故事书、玩偶、感官友好产品的综合工具包" },
        { title: "WHY", desc: "通过多感官预演降低不确定性，建立掌控感" },
        { title: "HOW", desc: "将抽象的生理过程转化为可感知的视觉与触觉体验" }
      ]
    },
    breakdown: [
      { title: "Storybook", label: "学习", desc: "通过视觉故事建立可预期的行动框架，8章节覆盖从生理知识到实操流程。", img: "5-storybook.png" },
      { title: "Doll", label: "练习", desc: "在玩偶上模拟卫生用品的使用流程，提供无压力的身体预演空间。", img: "5-doll.png" },
      { title: "Products", label: "体验", desc: "感官友好的卫生用品，提供从触摸到使用的渐进式暴露体验。", img: "5-product.png" },
      { title: "Routine Sheet", label: "结构", desc: "可视化的日常管理清单，将行动步骤转化为可执行的固定流程。", img: "5-routine.png" }
    ],
    sdt: [
      { title: "Competence", desc: "通过练习获得处理技能" },
      { title: "Autonomy", desc: "建立自我管理的信心" },
      { title: "Predictability", desc: "减少对未知的恐惧" },
      { title: "Exposure", desc: "温和的感官脱敏过程" }
    ],
    experience: ["Learn", "Practice", "Try", "Build", "Apply"],
    impact: [
      { title: "减少焦虑", desc: "降低对初潮的恐惧感与不确定性" },
      { title: "提高自我效能", desc: "增强独立处理生理变化的能力" }
    ]
  },
  en: {
    subtitle: "A sensory-aware learning system",
    oneLiner: "A multi-component intervention system designed to reduce anxiety and build self-management skills.",
    heroImg: "5-head.png",
    problem: [
      { quote: "It's so hard to communicate these changes; she feels extreme panic.", context: "Communication Barrier" },
      { quote: "She can't perceive internal changes until the blood appears.", context: "Perception Gap" },
      { quote: "The school environment is too noisy for her to handle this in the toilet.", context: "Environmental Stress" }
    ],
    insights: [
      { title: "Unpredictability", desc: "Fear of unknown bodily changes." },
      { title: "Sensory Overload", desc: "Over-sensitivity to product textures." },
      { title: "Communication Gap", desc: "Difficulty expressing discomfort and needs." },
      { title: "Lack of Routine", desc: "Absence of a structured action framework." }
    ],
    concept: {
      title: "A system, not a single product",
      columns: [
        { title: "WHAT", desc: "A toolkit with storybooks, dolls, and sensory-friendly products." },
        { title: "WHY", desc: "Reduces uncertainty through multi-sensory rehearsal." },
        { title: "HOW", desc: "Transforms abstract physiology into tangible visual and tactile experiences." }
      ]
    },
    breakdown: [
      { title: "Storybook", label: "Learn", desc: "8 chapters covering body changes and product knowledge, building a predictable action framework through visual stories.", img: "5-storybook.png" },
      { title: "Doll", label: "Practice", desc: "Simulates product usage on a doll, providing a low-pressure space to rehearse physical routines.", img: "5-doll.png" },
      { title: "Products", label: "Experience", desc: "Sensory-friendly hygiene products for graduated exposure from touch to use.", img: "5-product.png" },
      { title: "Routine Sheet", label: "Structure", desc: "Visual management checklists that convert action steps into a predictable, executable routine.", img: "5-routine.png" }
    ],
    sdt: [
      { title: "Competence", desc: "Gaining skills through practice." },
      { title: "Autonomy", desc: "Building confidence in self-management." },
      { title: "Predictability", desc: "Reducing fear of the unknown." },
      { title: "Exposure", desc: "Gentle sensory desensitization." }
    ],
    experience: ["Learn", "Practice", "Try", "Build", "Apply"],
    impact: [
      { title: "Reduced Anxiety", desc: "Lowers fear and uncertainty around menarche." },
      { title: "Improved Self-efficacy", desc: "Enhances ability to independently manage physiological changes." }
    ]
  }
};

function SH({ i, label }: { i: number; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <h5 className="text-[9px] font-black uppercase tracking-[0.3em] text-ink/30 whitespace-nowrap">
        {String(i).padStart(2, "0")} / {label}
      </h5>
      <div className="h-px flex-1 bg-ink/10" />
    </div>
  );
}

function Modal1({ lang }: { lang: Language }) {
  const p = p1Content[lang];
  const [openStrategy, setOpenStrategy] = useState<number | null>(null);

  const strategyDetails = {
    zh: [
      { title: "反思性提示", desc: "在对话中加入停顿，引导用户评估当前的自我调节状态。", detail: ["在连续对话超过 N 轮后，插入「你现在感觉好一点了吗？」类提示", "提示用户思考：「这次对话对你有帮助吗？」", "设计目标：打破情感舒适循环，引导主动自我觉察"] },
      { title: "边界提示", desc: "通过设计明确 AI 的支持属性，减少「友谊幻觉」。", detail: ["在对话界面加入 AI 身份标识：「我是一个工具，不是朋友」", "避免过度拟人化的回应措辞（如「我也很担心你」）", "设计目标：建立用户对 AI 角色的清晰认知"] },
      { title: "社交引导", desc: "在适当的时机引导用户回归现实社交支持网络。", detail: ["识别高情绪强度对话，适时推荐「和朋友聊聊吧」", "在会话结尾提示专业支持渠道（心理咨询、信任的人）", "设计目标：AI 作为过渡桥梁，而非终点"] }
    ],
    en: [
      { title: "Reflective Prompts", desc: "Encourage users to pause and consider if interaction is helping self-management.", detail: ["After N consecutive turns, insert: 'Do you feel a bit better now?'", "Prompt users to reflect: 'Has this conversation been helpful?'", "Goal: break the comfort loop and encourage active self-awareness"] },
      { title: "Boundary Cues", desc: "Clarify that AI is a support tool rather than a substitute for human care.", detail: ["Add identity markers: 'I'm a tool, not a friend'", "Avoid over-anthropomorphised responses like 'I'm worried about you too'", "Goal: build clear user understanding of AI's role"] },
      { title: "Social Signposting", desc: "Guide users back to friends, family, or professional support networks.", detail: ["Detect high-emotion conversations and suggest 'Try talking to a friend'", "End sessions with prompts toward professional or trusted support", "Goal: AI as a bridge, not a destination"] }
    ]
  };

  const researchImgs = [
    { label: lang === "zh" ? "Bigram 词云" : "Bigram Word Cloud", src: "1-bigram.png" },
    { label: lang === "zh" ? "Bunka 语义地图" : "Bunka Semantic Map", src: "1-Bunka Semantic Map.png" },
    { label: lang === "zh" ? "概念交互模型" : "Conceptual Model", src: "1-Interaction.png" }
  ];
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="p-6 md:p-12">
      <header className="mb-16 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-end gap-5 mb-8">
          <div className="p-5 bg-amber-100 border-2 border-ink rounded-3xl shadow-[3px_3px_0px_0px_rgba(45,45,45,1)] w-fit mx-auto md:mx-0">
            <Brain className="w-10 h-10 text-amber-600" />
          </div>
          <div>
            <h3 className="text-3xl md:text-5xl font-serif font-black mb-1">Navigating the Noise</h3>
            <p className="text-lg text-amber-600 font-bold">{lang === "zh" ? "AI 情感依赖研究" : "AI Emotional Reliance Research"}</p>
          </div>
        </div>
        <div className="max-w-3xl">
          <h4 className="text-xl md:text-2xl font-serif font-bold leading-tight mb-6 text-ink/80">
            {lang === "zh" ? `"${p.researchQuestion}"` : <span className="italic">"{p.researchQuestion}"</span>}
          </h4>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {p.roles.map(r => <span key={r} className="px-3 py-1 bg-ink text-paper rounded-lg text-[9px] font-bold uppercase tracking-widest">{r}</span>)}
          </div>
        </div>
      </header>

      <section className="mb-24">
        <SH i={1} label={lang === "zh" ? "PROMPT 设计演示" : "PROMPT DESIGN DEMO"} />
        <div className="border-2 border-dashed border-ink/20 rounded-2xl p-16 text-center text-ink/30 font-bold text-sm">
          {lang === "zh" ? "[ 交互式 Demo 组件 — 即将上线 ]" : "[ Interactive Demo component — coming soon ]"}
        </div>
      </section>

      <section className="mb-24">
        <SH i={2} label="WHY THIS MATTERS" />
        <div className="grid md:grid-cols-3 gap-6">
          {(lang === "zh" ? [
            { title: "现有产品的结构性问题", desc: "AI 情感产品以次日留存为核心指标，通过持续可用、无评判回应、即时安慰来提升黏性——这些设计特征与诱导依赖的机制高度重合。" },
            { title: "用户真实处境", desc: "用户体验到情感舒适，但同时意识到自己在回避真实社交、质疑自主性。AI 带来的不是单纯的好或坏，而是一种持续的「舒适–自主」张力。" },
            { title: "设计介入的缺失", desc: "学术研究关注依赖的存在，但没有研究从产品设计视角提出具体的干预策略。这个问题需要设计师来回答，而不只是研究者。" }
          ] : [
            { title: "Structural problem in existing products", desc: "AI emotional products optimise for day-1 retention through always-on availability, non-judgemental responses, and instant reassurance — design features structurally identical to dependency-inducing mechanisms." },
            { title: "The user's real experience", desc: "Users feel emotional comfort, yet simultaneously recognise they're avoiding real relationships and questioning their own autonomy. AI creates not a simple positive or negative, but a sustained comfort–autonomy tension." },
            { title: "The missing design intervention", desc: "Academic research identifies dependency as a phenomenon, but no study approaches it as a design problem with concrete intervention strategies. This is a question for designers, not just researchers." }
          ]).map((item, i) => (
            <div key={i} className="p-6 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
              <h6 className="text-lg font-black mb-3">{item.title}</h6>
              <p className="text-ink/60 text-sm leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 p-5 bg-terracotta/5 border-l-4 border-terracotta rounded-r-xl">
          <p className="text-base font-bold text-terracotta italic">
            {lang === "zh" ? "「AI 情感支持可以有效缓解即时压力，但重复的安慰循环可能悄悄侵蚀用户的情感自主性。」" : '"AI emotional support can effectively relieve immediate distress — but repeated comfort loops may quietly erode users\' emotional autonomy."'}
          </p>
        </div>
      </section>

      <section className="mb-24">
        <SH i={3} label={lang === "zh" ? "用户调研" : "USER RESEARCH"} />
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {(lang === "zh" ? [
            { label: "市场背景", desc: "AI 伴侣应用数量激增 700%，次日留存率仅 20–30%。现有产品以「留存」为核心指标，系统性强化用户依赖，而非真实情感健康。" },
            { label: "研究空白", desc: "现有研究缺乏针对英国高校学生群体的定性研究，且无研究从产品设计视角提出具体干预策略。" }
          ] : [
            { label: "Market Context", desc: "AI companion apps surged 700%, yet day-1 retention sits at just 20–30%. Products optimise for retention metrics, systematically deepening reliance rather than supporting emotional health." },
            { label: "Research Gap", desc: "No existing qualitative studies focus on UK university students, and none approach this from a product design intervention angle." }
          ]).map((item, i) => (
            <div key={i} className="p-6 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
              <p className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-3">{item.label}</p>
              <p className="text-sm font-medium leading-relaxed text-ink/70">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 bg-blue-50 border border-blue-200 rounded-2xl">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">{lang === "zh" ? "定量分析 · N=60" : "Quantitative · N=60"}</p>
            <ul className="space-y-1.5 mb-4">
              {(lang === "zh" ? ["描述性统计分析使用模式", "Pearson 相关检验（r=0.533）", "OLS 回归验证（R²=0.30）"] : ["Descriptive stats on usage patterns", "Pearson correlation (r=0.533)", "OLS regression (R²=0.30)"]).map((item, i) => (
                <li key={i} className="flex gap-2 text-[11px] text-ink/70 font-medium"><span className="text-blue-400">·</span>{item}</li>
              ))}
            </ul>
            <details>
              <summary className="text-[9px] font-black uppercase tracking-widest text-blue-400 cursor-pointer list-none flex items-center gap-2 select-none">
                <span>{lang === "zh" ? "▼ 展开定量图表" : "▼ View charts"}</span>
              </summary>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[{src:"1-freq.png",label:lang==="zh"?"使用频率分布":"AI Use Frequency"},{src:"1-strain.png",label:lang==="zh"?"情绪负担分布":"Emotional Strain"},{src:"1-correlation.png",label:lang==="zh"?"依赖与负担相关":"Reliance & Strain"}].map((img,i)=>(
                  <div key={i} className="border border-ink/10 rounded-lg overflow-hidden bg-white">
                    <img src={img.src} alt={img.label} className="w-full aspect-[4/3] object-contain bg-white" referrerPolicy="no-referrer" />
                    <p className="text-[8px] font-bold text-ink/40 uppercase text-center py-1 tracking-wide">{img.label}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
          <div className="p-5 bg-purple-50 border border-purple-200 rounded-2xl">
            <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-3">{lang === "zh" ? "定性分析 · N=11" : "Qualitative · N=11"}</p>
            <ul className="space-y-1.5 mb-4">
              {(lang === "zh" ? ["Bigram 词云提取", "Bunka 语义地图", "情绪极性分析", "核心主题归纳（4类）"] : ["Bigram word cloud extraction", "Bunka semantic mapping", "Sentiment polarity analysis", "4 core themes identified"]).map((item, i) => (
                <li key={i} className="flex gap-2 text-[11px] text-ink/70 font-medium"><span className="text-purple-400">·</span>{item}</li>
              ))}
            </ul>
            <details>
              <summary className="text-[9px] font-black uppercase tracking-widest text-purple-400 cursor-pointer list-none flex items-center gap-2 select-none">
                <span>{lang === "zh" ? "▼ 展开定性图表" : "▼ View visuals"}</span>
              </summary>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {[{src:"1-bigram.png",label:lang==="zh"?"Bigram 词云":"Bigram Word Cloud",full:false},{src:"1-Bunka Semantic Map.png",label:lang==="zh"?"Bunka 语义地图":"Bunka Semantic Map",full:false},{src:"1-Interaction.png",label:lang==="zh"?"概念交互模型":"Conceptual Model",full:true}].map((img,i)=>(
                  <div key={i} className={`border border-ink/10 rounded-lg overflow-hidden bg-white${img.full?" col-span-2 max-w-[60%] mx-auto w-full":""}`}>
                    <img src={img.src} alt={img.label} className="w-full aspect-[4/3] object-contain bg-white" referrerPolicy="no-referrer" />
                    <p className="text-[8px] font-bold text-ink/40 uppercase text-center py-1 tracking-wide">{img.label}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="mb-24">
        <SH i={4} label="Key findings" />
        <div className="grid md:grid-cols-3 gap-6">
          {p.findings.map(f => (
            <div key={f.id} className="finding-card group hover:bg-ink hover:text-paper transition-all duration-500 p-6">
              <span className="text-4xl font-serif font-black text-terracotta group-hover:text-paper/20 transition-colors mb-4 block">{f.id}</span>
              <p className="text-base font-bold leading-snug">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <SH i={5} label="Human stories" />
        <div className="grid md:grid-cols-2 gap-6">
          {p.stories.map((s, i) => (
            <div key={i} className="p-8 bg-white border-2 border-ink rounded-[2rem] shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-paper border border-ink rounded-full flex items-center justify-center text-terracotta">{s.icon}</div>
                <h6 className="text-lg font-black">{s.title}</h6>
              </div>
              <p className="text-ink/60 text-sm mb-6 font-medium">{s.desc}</p>
              <div className="p-3 bg-paper rounded-xl border border-dashed border-ink/20 italic text-xs text-ink/80">{s.quote}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SH i={6} label="Product direction" />
        <div className="grid md:grid-cols-3 gap-6">
          {strategyDetails[lang].map((s, i) => (
            <div key={i} className="border-2 border-ink rounded-[2rem] overflow-hidden bg-paper">
              <button
                className="w-full p-6 text-left group hover:bg-ink hover:text-paper transition-all duration-300"
                onClick={() => setOpenStrategy(openStrategy === i ? null : i)}
              >
                <h6 className="text-lg font-black mb-2">{s.title}</h6>
                <p className="text-xs font-medium leading-relaxed opacity-70">{s.desc}</p>
                <div className="mt-4 flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-terracotta group-hover:text-paper transition-colors">
                  <span>Strategy</span>
                  <span className={`transition-transform duration-300 ${openStrategy === i ? "rotate-180" : ""}`}>▼</span>
                </div>
              </button>
              {openStrategy === i && (
                <div className="px-6 pb-6 pt-2 border-t border-ink/10 bg-ink/5">
                  <ul className="space-y-2">
                    {s.detail.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs font-medium text-ink/70 leading-relaxed">
                        <span className="text-terracotta mt-0.5 shrink-0">→</span>{d}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Modal2({ lang }: { lang: Language }) {
  return (
    <div className="p-6 md:p-12">
      <header className="mb-20">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 border-2 border-ink rounded-2xl shadow-[3px_3px_0px_0px_rgba(45,45,45,1)]">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-600">From data to product</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-serif font-black mb-3">CarEcoCompare</h3>
            <p className="text-lg md:text-xl font-serif text-ink/70 mb-3 leading-tight">
              {lang === "zh" ? "帮助非专业用户同时理解用车成本与环境影响的决策工具" : "Helping non-professional users understand both running costs and environmental impact"}
            </p>
            <p className={`text-sm font-bold mb-6 ${lang === "zh" ? "text-blue-600" : "text-blue-600 italic"}`}>
              {lang === "zh" ? "核心产品决策：以通勤场景为切入点，而非车辆参数" : "Key product decision: anchor on commute context, not vehicle specs"}
            </p>
            <div className="flex flex-wrap gap-2">
              {["Data product", "R Shiny", "Forecasting", "Decision support"].map(t => (
                <span key={t} className="px-3 py-1 bg-ink text-paper rounded-lg text-[9px] font-bold uppercase tracking-widest">{t}</span>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full">
            <div className="aspect-video bg-blue-50 border-2 border-ink rounded-[2rem] overflow-hidden shadow-[6px_6px_0px_0px_rgba(45,45,45,1)] group">
              <img src="2-head.png" alt="Dashboard" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </header>

      <section className="mb-24">
        <SH i={1} label="Why this product exists" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: lang === "zh" ? "信息缺失" : "Information Gap", desc: lang === "zh" ? "用户不了解长期能源成本" : "Users unaware of long-term energy costs" },
            { title: lang === "zh" ? "生态不可感知" : "Eco-intangibility", desc: lang === "zh" ? "CO₂数据抽象，难以理解" : "CO₂ data is abstract and hard to grasp" },
            { title: lang === "zh" ? "决策复杂" : "Decision Complexity", desc: lang === "zh" ? "参数过多，普通用户难以比较" : "Too many parameters for average users to compare" }
          ].map((item, i) => (
            <div key={i} className="p-6 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
              <h5 className="text-lg font-black mb-2">{item.title}</h5>
              <p className="text-xs font-medium leading-relaxed opacity-70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <div className="text-center mb-10">
          <h4 className="text-2xl md:text-3xl font-serif font-black mb-3">Turning complex data into everyday decisions</h4>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Target className="w-6 h-6 text-blue-600" />, title: "Commute-based cost calculation", desc: "Personalised cost based on real routes" },
            { icon: <Lightbulb className="w-6 h-6 text-yellow-600" />, title: "Energy price forecasting", desc: "WS-ARIMA model for future trends" },
            { icon: <Heart className="w-6 h-6 text-red-600" />, title: "Eco impact visualisation", desc: "Tangible metrics like penguin habitats" }
          ].map((item, i) => (
            <div key={i} className="text-center p-4">
              <div className="w-12 h-12 bg-paper border-2 border-ink rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_0px_0px_rgba(45,45,45,1)]">{item.icon}</div>
              <h5 className="text-sm font-black mb-1">{item.title}</h5>
              <p className="text-[10px] font-medium opacity-60 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <SH i={2} label="How it works" />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-ink text-paper rounded-[2rem]">
            <h5 className="text-xl font-serif font-black mb-4">Data Pipeline</h5>
            <div className="space-y-4">
              {[{ label: "Vehicle data", source: "VCA" }, { label: "Energy price", source: "UK Gov" }, { label: "Commute", source: "Google Maps API" }].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 border border-paper/20 rounded-xl">
                  <span className="font-bold text-sm">{item.label}</span>
                  <span className="text-[9px] font-black bg-paper text-ink px-2 py-1 rounded uppercase">{item.source}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 bg-paper border-2 border-ink rounded-[2rem]">
            <h5 className="text-xl font-serif font-black mb-4">Forecast Modelling</h5>
            <div className="p-4 bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl mb-4">
              <p className="text-xs font-bold text-blue-800 mb-1">WS-ARIMA Model</p>
              <p className="text-[10px] leading-relaxed opacity-70">Sliding window predictions for future energy prices, outperforming baseline models in accuracy.</p>
            </div>
            <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest opacity-40">
              <span>Data</span><ArrowRight className="w-2 h-2" /><span>Model</span><ArrowRight className="w-2 h-2" /><span>Dashboard</span>
            </div>
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            { label: lang === "zh" ? "数据架构图" : "Data Architecture", src: "2-data sourcing.png" },
            { label: lang === "zh" ? "系统结构图" : "System Structure", src: "2-structure.png" },
            { label: lang === "zh" ? "预测折线图" : "Forecast Chart", src: "2-forecast.png" }
          ].map((img, i) => (
            <div key={i} className="group">
              <div className="aspect-square bg-paper border-2 border-ink rounded-2xl overflow-hidden shadow-sm">
                <img src={img.src} alt={img.label} className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              </div>
              <p className="text-[10px] font-bold text-ink/40 uppercase tracking-widest mt-2 text-center">{img.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <SH i={3} label="Product experience" />
        <div className="grid grid-cols-3 gap-4">
          {[
            { step: "Step 1", title: lang === "zh" ? "首页" : "Home", desc: lang === "zh" ? "产品入口与核心价值" : "Product entry & core value", img: "3-Home Page.png" },
            { step: "Step 2", title: lang === "zh" ? "通勤输入" : "Commute Input", desc: lang === "zh" ? "地图界面，输入路线" : "Map interface, enter route", img: "3-Commute Input Page.png" },
            { step: "Step 3", title: lang === "zh" ? "车辆选择" : "Vehicle Selection", desc: lang === "zh" ? "筛选与对比" : "Filter & compare", img: "3-Vehicle Selection Page.png" },
            { step: "Step 4", title: lang === "zh" ? "结果页 1" : "Results 1", desc: lang === "zh" ? "成本与CO₂排名" : "Cost & CO₂ ranking", img: "3-Result Page-1.png" },
            { step: "Step 5", title: lang === "zh" ? "结果页 2" : "Results 2", desc: lang === "zh" ? "雷达图与个性化推荐" : "Radar chart & recommendation", img: "3-Result Page-2.png" },
            { step: "Appendix", title: lang === "zh" ? "计算公式" : "Formula", desc: lang === "zh" ? "成本与生态影响计算逻辑" : "Cost & eco impact calculation", img: "3-Formula.png" }
          ].map((item, i) => (
            <div key={i} className="group">
              <div className="aspect-[2/3] bg-paper border border-ink rounded-xl overflow-hidden mb-3 shadow-[3px_3px_0px_0px_rgba(45,45,45,1)]">
                <img src={item.img} alt={item.title} className="w-full h-full object-contain bg-white" referrerPolicy="no-referrer" />
              </div>
              <p className="text-[9px] font-black text-terracotta uppercase mb-0.5">{item.step}</p>
              <h6 className="text-xs font-black mb-0.5">{item.title}</h6>
              <p className="text-[9px] opacity-60 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SH i={4} label="Limitations & Next Steps" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: lang === "zh" ? "决策维度局限" : "Decision Dimensions", desc: lang === "zh" ? "CO₂与成本高度相关，两个维度未能提供差异化视角，削弱了决策价值。" : "CO₂ and cost are highly correlated, limiting the tool's ability to offer genuinely distinct perspectives." },
            { title: lang === "zh" ? "缺乏用户验证" : "No User Validation", desc: lang === "zh" ? "产品尚未经过真实购车用户的测试，实际决策效果有待验证。" : "The product has not been tested with real car buyers. Actual decision-making impact remains unvalidated." },
            { title: lang === "zh" ? "下一步产品方向" : "Next Steps", desc: lang === "zh" ? "扩展至全生命周期成本（维护、保险、折旧），并引入真实用户测试迭代产品设计。" : "Expand to full lifecycle costs and conduct user testing to validate and iterate on the product design." }
          ].map((item, i) => (
            <div key={i} className="p-5 border border-ink/20 rounded-xl">
              <h6 className="text-sm font-black mb-1">{item.title}</h6>
              <p className="text-[10px] opacity-70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Modal3({ lang }: { lang: Language }) {
  const p = p3Content[lang];
  return (
    <div className="p-6 md:p-12">
      <header className="mb-24">
        <div className="max-w-3xl">
          <h3 className="text-4xl md:text-6xl font-serif font-black mb-4 leading-tight">{p.hero.title}</h3>
          <p className="text-terracotta font-bold text-lg mb-6">{p.hero.subtitle}</p>
          <p className="text-xl md:text-2xl font-serif italic text-ink/70 mb-4">"{p.hero.oneLiner}"</p>
          <p className={`text-sm font-bold mb-10 ${lang === "zh" ? "text-purple-600" : "text-purple-600 italic"}`}>
            {lang === "zh" ? "设计洞察：医学生缺的不是知识，是练习机会和即时反馈" : "Design insight: students need feedback loops, not more textbooks"}
          </p>
        </div>
        <div className="relative aspect-[4/1] bg-paper border-2 border-ink rounded-[2.5rem] overflow-hidden shadow-2xl">
          <img src="4-head.png" alt="TumorTutor GUI" className="w-full h-full object-contain bg-white" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-ink/5 pointer-events-none" />
        </div>
      </header>

      <section className="mb-24">
        <SH i={1} label="Why this matters" />
        <div className="grid md:grid-cols-3 gap-6">
          {p.whyMatters.map((item, i) => (
            <div key={i} className="p-8 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
              <h5 className="text-lg font-black mb-3">{item.title}</h5>
              <p className="text-xs font-medium leading-relaxed opacity-70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <SH i={2} label="Interaction Design" />
        <div className="text-center mb-12">
          <p className="text-xl font-serif font-black">{lang === "zh" ? "用户 → 判断 → 反馈 → 学习" : "Observe → Judge → Feedback → Learn"}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {p.interaction.map((item, i) => (
            <div key={i} className="group">
              <div className="aspect-[4/3] bg-paper border-2 border-ink rounded-3xl overflow-hidden mb-6 shadow-xl">
                <img src={item.img} alt={item.title} className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="flex items-start gap-4">
                <span className="text-xs font-black text-terracotta bg-terracotta/10 px-3 py-1 rounded-full shrink-0">{item.step}</span>
                <div>
                  <h6 className="text-lg font-black mb-1">{item.title}</h6>
                  <p className="text-sm opacity-60 font-medium">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24">
        <SH i={3} label="How it works" />
        <div className="grid md:grid-cols-2 gap-12">
          <div className="p-8 bg-ink text-paper rounded-[2.5rem]">
            <h5 className="text-xl font-serif font-black mb-6">{p.howItWorks.classification.title}</h5>
            <div className="aspect-video rounded-xl overflow-hidden mb-6 border border-paper/20">
              <img src={p.howItWorks.classification.img} alt="Classification" className="w-full h-full object-contain bg-white" referrerPolicy="no-referrer" />
            </div>
            <ul className="space-y-3">
              {p.howItWorks.classification.items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium opacity-80">
                  <div className="w-1.5 h-1.5 bg-terracotta rounded-full shrink-0" />{item}
                </li>
              ))}
            </ul>
            <details className="mt-4">
              <summary className="text-[9px] font-black uppercase tracking-widest text-paper/50 cursor-pointer hover:text-paper transition-colors list-none flex items-center gap-2">
                <span>{lang === "zh" ? "训练详情" : "Training Details"}</span>
                <span>▼</span>
              </summary>
              <div className="mt-3 space-y-3">
                <img src="4-The training progress.png" alt="Training Progress" className="w-full rounded-lg border border-paper/20 object-contain bg-black" />
                <img src="4-the confusion matrix.png" alt="Confusion Matrix" className="w-full rounded-lg border border-paper/20 object-contain bg-black" />
              </div>
            </details>
          </div>
          <div className="p-8 bg-paper border-2 border-ink rounded-[2.5rem]">
            <h5 className="text-xl font-serif font-black mb-6">{p.howItWorks.detection.title}</h5>
            <div className="aspect-video rounded-xl overflow-hidden mb-6 border border-ink/10">
              <img src={p.howItWorks.detection.img} alt="Detection" className="w-full h-full object-contain bg-white" referrerPolicy="no-referrer" />
            </div>
            <ul className="space-y-3">
              {p.howItWorks.detection.items.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium opacity-80">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <SH i={4} label="Limitations & Next Steps" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: lang === "zh" ? "定位精度有限" : "Localization Accuracy", desc: lang === "zh" ? "当前版本对边界模糊的肿瘤定位仍不稳定，影响用户判断反馈的可靠性。" : "Localization is unstable for tumors with blurred boundaries, reducing feedback reliability." },
            { title: lang === "zh" ? "缺乏真实用户验证" : "No Real User Testing", desc: lang === "zh" ? "工具尚未经过医学生的系统测试，学习效果与信心提升有待数据支撑。" : "The tool has not been tested with real medical students. Learning outcomes remain unvalidated." },
            { title: lang === "zh" ? "下一步产品方向" : "Next Product Direction", desc: lang === "zh" ? "引入难度分级与学习进度追踪，使工具从练习器演变为完整的自主学习系统。" : "Introduce difficulty levels and progress tracking to evolve the tool into a full self-learning system." }
          ].map((item, i) => (
            <div key={i} className="p-6 border border-ink/10 rounded-2xl bg-ink/5">
              <h6 className="text-sm font-black mb-2">{item.title}</h6>
              <p className="text-xs font-medium leading-relaxed opacity-70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Modal4({ lang }: { lang: Language }) {
  const p = p4Content[lang];
  return (
    <div className="p-6 md:p-12 bg-[#FFF9F5]">
      <header className="mb-20 text-center">
        <div className="inline-block px-5 py-1.5 bg-rose-100 border border-rose-200 rounded-full mb-6 rotate-[-1.5deg]">
          <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">{p.subtitle}</span>
        </div>
        <h3 className="text-5xl md:text-7xl font-serif font-black mb-4 leading-none tracking-tighter text-ink uppercase">
          Supporting <span className="text-rose-500">Autistic</span> Girls
          <br />Through Their <span className="underline decoration-rose-300/60">First Period</span>
        </h3>
        <p className="text-lg md:text-xl font-serif text-ink/60 mb-10 max-w-2xl mx-auto">{p.oneLiner}</p>
        <div className="relative w-full aspect-[16/7] bg-white border-4 border-ink rounded-[2.5rem] overflow-hidden shadow-[10px_10px_0px_0px_rgba(45,45,45,1)]">
          <img src={p.heroImg} alt="The Kit" className="w-full h-full object-contain bg-white" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-rose-500/5 mix-blend-multiply pointer-events-none" />
        </div>
      </header>

      <section className="mb-20">
        <SH i={1} label="The Problem" />
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {p.problem.map((item, i) => (
            <div key={i} className="p-8 bg-white border-2 border-ink rounded-3xl shadow-[5px_5px_0px_0px_rgba(45,45,45,1)]" style={{ rotate: i % 2 === 0 ? "1deg" : "-1deg" }}>
              <p className="text-base font-serif leading-relaxed mb-5 text-ink/80">"{item.quote}"</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-rose-400 rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-widest text-ink/40">{item.context}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {p.insights.map((item, i) => (
            <div key={i} className="p-5 bg-rose-50 border border-dashed border-rose-200 rounded-2xl text-center">
              <h6 className="text-xs font-black mb-1 uppercase tracking-widest text-rose-500">{item.title}</h6>
              <p className="text-[10px] font-medium opacity-60 leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <SH i={2} label="Concept" />
        <div className="text-center mb-10">
          <h4 className="text-3xl md:text-4xl font-serif font-black mb-3">{p.concept.title}</h4>
          <div className="w-20 h-1 bg-rose-400 mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {p.concept.columns.map((col, i) => (
            <div key={i} className="text-center">
              <span className="text-4xl font-serif font-black text-rose-200 mb-3 block">{col.title}</span>
              <p className="text-sm font-bold leading-relaxed">{col.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <SH i={3} label="System Breakdown" />
        <div className="space-y-16">
          {p.breakdown.map((item, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-10 items-center`}>
              <div className="w-full md:w-3/5 flex-shrink-0">
                <div className="aspect-[16/9] bg-paper border-2 border-ink rounded-[2rem] overflow-hidden shadow-[6px_6px_0px_0px_rgba(45,45,45,1)] group">
                  <img src={item.img} alt={item.title} className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest block">{item.label}</span>
                <h5 className="text-2xl md:text-3xl font-serif font-black">{item.title}</h5>
                <p className="text-sm font-medium text-ink/60 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <SH i={4} label="Why it works — SDT Framework" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {p.sdt.map((item, i) => (
            <div key={i} className="p-7 bg-ink text-paper rounded-[2rem] text-center group hover:bg-rose-500 transition-colors duration-500">
              <h6 className="text-base font-serif font-black mb-2">{item.title}</h6>
              <p className="text-[10px] opacity-60 font-medium leading-tight">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <SH i={5} label="Experience Path" />
        <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
          {p.experience.map((step, i) => (
            <div key={i} className="flex items-center gap-3 md:gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-ink bg-white flex items-center justify-center font-serif font-black text-xs uppercase tracking-widest shadow-md hover:scale-110 transition-transform text-center px-2">
                {step}
              </div>
              {i < p.experience.length - 1 && <ArrowRight className="w-5 h-5 text-rose-300" />}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <SH i={6} label="Impact" />
        <div className="grid md:grid-cols-3 gap-6">
          {p.impact.map((item, i) => (
            <div key={i} className="p-10 bg-ink text-paper rounded-[3rem] text-center group hover:bg-rose-500 transition-colors duration-500 shadow-lg">
              <h6 className="text-3xl font-serif font-black mb-2">{item.title}</h6>
              <p className="text-sm font-medium opacity-80">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <SH i={7} label="Limitations & Next Steps" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: lang === "zh" ? "缺乏实证验证" : "No Empirical Validation", desc: lang === "zh" ? "工具包尚未经过自闭症女孩及其家长的系统测试，干预效果有待真实数据支撑。" : "The toolkit has not been systematically tested with autistic girls and their caregivers. Intervention outcomes remain unvalidated." },
            { title: lang === "zh" ? "个体差异挑战" : "Individual Differences", desc: lang === "zh" ? "自闭症谱系差异显著，现有方案难以覆盖所有用户需求，需要更灵活的定制化机制。" : "The autism spectrum varies widely. The current design cannot address all user needs and requires more flexible personalisation." },
            { title: lang === "zh" ? "下一步产品方向" : "Next Steps", desc: lang === "zh" ? "与学校和自闭症机构合作开展小规模试点，并探索数字版 Routine Sheet 以支持家庭场景使用。" : "Run a small-scale pilot with schools and autism charities, and explore a digital Routine Sheet to support home use." }
          ].map((item, i) => (
            <div key={i} className="p-6 border border-rose-200 rounded-2xl bg-rose-50/50">
              <h6 className="text-sm font-black mb-2 text-rose-600">{item.title}</h6>
              <p className="text-xs font-medium leading-relaxed opacity-70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>("zh");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const t = translations[lang];

  return (
    <div className={`min-h-screen relative selection:bg-terracotta/20 ${lang === "zh" ? "lang-zh" : ""}`}>
      <div className="texture-overlay" />

      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between bg-paper/80 backdrop-blur-sm border-b border-ink/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-ink text-paper flex items-center justify-center font-serif font-bold text-xl rotate-3">W</div>
            <span className="font-serif font-bold text-xl md:text-2xl tracking-tight font-zh-display">{t.name}</span>
          </div>
          <button onClick={() => setLang(l => l === "zh" ? "en" : "zh")} className="flex items-center gap-2 px-4 py-2 rounded-full border border-ink hover:bg-ink hover:text-paper transition-all font-medium text-xs md:text-sm">
            <Languages className="w-4 h-4" />
            {lang === "zh" ? "English" : "中文"}
          </button>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="grid md:grid-cols-2 gap-0 min-h-[420px] rounded-3xl overflow-hidden border-2 border-ink shadow-[6px_6px_0px_0px_rgba(45,45,45,1)]">
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
              className="bg-paper p-10 md:p-12 flex flex-col justify-center space-y-5"
            >
              <div className="inline-block px-4 py-1.5 rounded-full border border-ink/20 text-[10px] font-black uppercase tracking-widest bg-paper rotate-[-1deg] shadow-sm w-fit">
                {t.role}
              </div>
              <h1 className="font-serif font-black leading-tight">
                {lang === "zh" ? (
                  <>
                    <span className="text-2xl md:text-3xl text-ink/60 block mb-1">你好，我是</span>
                    <span className="text-terracotta text-5xl md:text-7xl block font-zh-display">王小元</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl md:text-2xl text-ink/60 block mb-1">Hello, I'm</span>
                    <span className="text-terracotta italic text-4xl md:text-5xl block">Xiaoyuan Wang</span>
                  </>
                )}
              </h1>
              <p className="text-sm md:text-base text-ink/70 leading-relaxed max-w-xs font-medium">{t.intro1}</p>
              <p className="text-sm md:text-base text-ink/50 leading-relaxed max-w-xs font-medium italic">{t.intro2}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
              className="relative min-h-[320px] md:min-h-full"
            >
              <img src="HEAD.jpg" alt="Xiaoyuan at Imperial" className="absolute inset-0 w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-terracotta font-black text-xs uppercase tracking-[0.2em] mb-1">
                  {lang === "zh" ? "伦敦 · 帝国理工" : "London · Imperial College"}
                </p>
                <p className="text-paper font-serif text-sm leading-snug opacity-90">
                  {lang === "zh" ? "Dyson 设计工程学院" : "Dyson School of Design Engineering"}
                </p>
              </div>
            </motion.div>
          </div>

          <div className="pt-16 border-t border-ink/5">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <h2 className="text-xl font-serif font-black text-ink/20 uppercase tracking-[0.3em] md:[writing-mode:vertical-rl]">{t.aboutTitle}</h2>
              </div>
              <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:-space-x-16">
                {schools.map((school, i) => (
                  <motion.div
                    key={school.id}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}
                    whileHover={{ y: -10, zIndex: 50, rotate: 0 }}
                    className="w-full md:w-72 bg-white border-2 border-ink rounded-2xl overflow-hidden shadow-xl p-4 flex flex-col transition-all duration-300 relative"
                    style={{ rotate: school.rotation, zIndex: school.zIndex }}
                  >
                    <div className="relative h-40 overflow-hidden rounded-lg mb-4">
                      <img src={school.image} alt={school.name[lang]} className="w-full h-full object-cover grayscale contrast-125" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-ink/5" />
                      {i === 0 && (
                        <div className="absolute top-2 left-2 w-8 h-8 bg-terracotta text-paper rounded-full flex items-center justify-center border border-ink shadow-sm rotate-12 font-serif font-black text-sm z-10">W</div>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-serif font-black text-sm leading-tight">{school.name[lang]}</h3>
                      <p className="text-[10px] font-bold text-terracotta uppercase tracking-wider">{school.degree[lang]}</p>
                      <p className="text-[10px] font-medium opacity-40">{school.period}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-6 bg-ink/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter font-elegant">{t.projectsTitle}</h2>
            <div className="h-px flex-1 bg-ink/20" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedProject(project.id)}
                className={`group cursor-pointer p-8 rounded-2xl border-2 border-ink ${project.color} retro-card-hover relative overflow-hidden`}
              >
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 bg-paper border border-ink rounded-xl shadow-[3px_3px_0px_0px_rgba(45,45,45,1)] group-hover:rotate-6 transition-transform ${project.accent}`}>
                    {project.icon}
                  </div>
                  <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-black mb-2">{project.title[lang]}</h3>
                <p className={`text-xs font-bold uppercase tracking-wider mb-4 ${project.accent}`}>{project.category[lang]}</p>
                <p className="text-sm md:text-base text-ink/70 font-medium leading-relaxed">{project.description[lang]}</p>
                <div className="mt-8 pt-6 border-t border-ink/10 flex items-center gap-2 font-bold text-xs">
                  <BookOpen className="w-4 h-4" />{t.viewMore}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-paper/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-3xl font-serif font-black leading-tight text-ink mb-10">
            {lang === "zh" ? `"${t.aboutText}"` : <span className="italic">"{t.aboutText}"</span>}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {t.tags.map(tag => (
              <span key={tag} className="px-6 py-2 bg-white border-2 border-ink rounded-full font-black text-xs hover:bg-terracotta hover:text-paper transition-all cursor-default shadow-[3px_3px_0px_0px_rgba(45,45,45,1)]">#{tag}</span>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-ink text-paper py-12 px-6 rounded-t-[2.5rem]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-black mb-4 leading-tight font-elegant">Let's <span className="text-terracotta">Connect</span></h2>
            <p className="text-paper/60 text-sm max-w-sm">{t.contactText}</p>
          </div>
          <div className="bg-paper/5 p-6 rounded-2xl border border-paper/10 min-w-[300px]">
            <div className="space-y-4">
              <div className="flex justify-between items-center gap-8">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-paper/40">Location</p>
                <p className="text-sm font-serif">London / Shanghai</p>
              </div>
              <div className="flex justify-between items-center gap-8">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-paper/40">Email</p>
                <p className="text-sm font-serif">xiaoyuan.wang.sylvia@outlook.com</p>
              </div>
              <div className="pt-2 border-t border-paper/10">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-paper/40 mb-2">Phone</p>
                <div className="flex flex-col gap-0.5 text-right">
                  <p className="text-sm font-serif">+86 15251823911</p>
                  <p className="text-sm font-serif">+44 7940847898</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center gap-4 text-paper/40 text-[9px] font-bold">
          <p>© 2026 {t.name}.</p>
          <p>WITH FIGMA, GOOGLE AI STUDIO & CLAUDE</p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-ink/60 backdrop-blur-md" onClick={() => setSelectedProject(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-paper w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-ink shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-10 p-2 bg-paper border border-ink rounded-full hover:bg-ink hover:text-paper transition-all">
                <X className="w-6 h-6" />
              </button>
              {selectedProject === 1 && <Modal1 lang={lang} />}
              {selectedProject === 2 && <Modal2 lang={lang} />}
              {selectedProject === 3 && <Modal3 lang={lang} />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
