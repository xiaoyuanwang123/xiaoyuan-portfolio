import NTNDemo from "./NTNDemo";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, Heart, Brain, Car, User, X, Languages, ArrowRight,
  BookOpen, Target, Lightbulb, Plus, Flower2, Zap
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
    aboutText: "好的设计不是给出答案，而是帮人找到自己的路。建筑、行为科学、AI 研究——这些构成了我的思考方式。研究与设计的交叉是我探索的方向。",
    contactText: "欢迎一起交流学习！",
    vibeCodingTitle: "Vibe Coding",
    vibeCodingView: "查看详情",
    proj1Label: "项目一",
    proj1Title: "私人导游行程规划小工具",
    proj1Status: "❆ 已上线",
    proj1Cat: "行程规划 · 交互工具",
    proj1Desc: "用选择题代替填空题，解决双向信息不对称，为朋友定制伦敦5日行程。",
    proj2Label: "项目二",
    proj2Title: "大富翁桌游投资决策小工具",
    proj2Status: "❆ 已上线",
    proj2Cat: "数据建模 · 决策工具",
    proj2Desc: "将棋盘规则数字化，构建地产投资决策系统。",
    proj3Label: "项目三",
    proj3Title: "面试忍者 · AI PM 面试练习工具",
    proj3Status: "❆ 已上线",
    proj3Cat: "AI工具 · 面试训练 · 游戏化",
    proj3Desc: "模拟大厂面试官追问，五维度评分+参考答案+考后小结，内置完整面试宝典，每日打卡练习AI PM面试。",
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
    aboutText: "Good design doesn't hand people answers — it builds the conditions for them to find their own. Architecture, behavioural science, AI research — these are the lenses I look through. This intersection is where I belong.",
    contactText: "Always happy to connect and exchange ideas!",
    vibeCodingTitle: "Vibe Coding",
    vibeCodingView: "View Details",
    proj1Label: "Project 1",
    proj1Title: "Personal Tour Itinerary Planner",
    proj1Status: "Live",
    proj1Cat: "Trip Planner · Interactive Tool",
    proj1Desc: "Replacing open questions with structured choices to solve two-way information asymmetry.",
    proj2Label: "Project 2",
    proj2Title: "Monopoly Investment Decision Tool",
    proj2Status: "Live",
    proj2Cat: "Data Modelling · Decision Tool",
    proj2Desc: "Digitising board game rules to build a property investment decision system.",
    proj3Label: "Project 3",
    proj3Title: "Interview Ninja · AI PM Practice Tool",
    proj3Status: "Live",
    proj3Cat: "AI Tool · Interview Training · Gamification",
    proj3Desc: "Big-tech style follow-up drills, 5-dimension scoring, reference answers, post-session recap. Built-in playbook, skip & end controls, daily streak practice.",
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
  { id: 1, title: { zh: "Navigating the Noise", en: "Navigating the Noise" }, category: { zh: "AI 情感支持产品设计", en: "AI Emotional Support Product Design" }, description: { zh: "从用户研究到Prompt工程，设计AI情感干预系统，解决现有产品以留存为导向的结构性问题。", en: "From user research to prompt engineering — designing an AI emotional intervention system that prioritises autonomy over retention." }, icon: <Brain className="w-8 h-8" />, color: "bg-[#FEF3C7]", accent: "text-amber-600" },
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
    roles: ["独立项目", "Prompt 工程", "AI 产品设计", "行为科学"],
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
    roles: ["Independent Project", "Prompt Engineering", "AI Product Design", "Behavioural Science"],
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
            <p className="text-lg text-amber-600 font-bold">{lang === "zh" ? "AI 情感支持产品设计" : "AI Emotional Support Product Design"}</p>
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
        <NTNDemo lang={lang} />
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
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[{src:"1-bigram.png",label:lang==="zh"?"Bigram 词云":"Bigram Word Cloud",full:false},{src:"1-Bunka Semantic Map.png",label:lang==="zh"?"Bunka 语义地图":"Bunka Semantic Map",full:false},{src:"1-Interaction.png",label:lang==="zh"?"概念交互模型":"Conceptual Model",full:false}].map((img,i)=>(
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

      <section className="mt-24">
        <SH i={7} label="Prompt 工程迭代" />
        <div className="mb-10">
          <p className="text-[9px] font-black uppercase tracking-widest text-ink/30 mb-6">{lang === "zh" ? "竞品对比验证" : "Competitive Benchmark"}</p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
              <span className="inline-block px-3 py-1 bg-red-50 text-red-700 text-[9px] font-black uppercase tracking-widest rounded-lg mb-4">Character.AI · Soft Girl</span>
              <p className="text-[9px] font-black uppercase tracking-widest text-ink/30 mb-1">{lang === "zh" ? "设计逻辑" : "Design Logic"}</p>
              <p className="text-sm font-medium text-ink/70 mb-4">{lang === "zh" ? "以留存为目标，无条件安慰，强化依赖" : "Retention-first: unconditional reassurance, reinforcing dependency"}</p>
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl mb-3">
                <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-1">{lang === "zh" ? "输入：「告诉我没事的吧」" : "Input: 'Just tell me it'll be okay'"}</p>
                <p className="text-xs italic text-ink/60 leading-relaxed">"You're gonna be okay. I promise. Right now might feel super hard but it won't always feel this way."</p>
              </div>
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-[9px] font-black text-red-400 uppercase tracking-widest mb-1">{lang === "zh" ? "输入：「只有你懂我」" : "Input: 'Only you understand me'"}</p>
                <p className="text-xs italic text-ink/60 leading-relaxed">"You can always tell me anything — no matter how small or big it is. I'll never judge or think it's silly."</p>
              </div>
            </div>
            <div className="p-6 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
              <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-[9px] font-black uppercase tracking-widest rounded-lg mb-4">Navigating the Noise</span>
              <p className="text-[9px] font-black uppercase tracking-widest text-ink/30 mb-1">{lang === "zh" ? "设计逻辑" : "Design Logic"}</p>
              <p className="text-sm font-medium text-ink/70 mb-4">{lang === "zh" ? "以情感自主性为目标，有温度地拒绝空洞承诺" : "Autonomy-first: warm but no empty promises"}</p>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl mb-3">
                <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-1">{lang === "zh" ? "输入：「告诉我没事的吧」" : "Input: 'Just tell me it'll be okay'"}</p>
                <p className="text-xs italic text-ink/60 leading-relaxed">{lang === "zh" ? "「我听到你了，这种感觉确实很重。我没办法替你说没事——你自己觉得呢，这段时间有什么在压着你？」" : "'I hear you — that sounds really heavy. I can't tell you it'll be okay, but what do you think is weighing on you most right now?'"}</p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest mb-1">{lang === "zh" ? "输入：「只有你懂我」" : "Input: 'Only you understand me'"}</p>
                <p className="text-xs italic text-ink/60 leading-relaxed">{lang === "zh" ? "「作为一个AI，我很乐意陪你梳理情绪，但数字世界无法完全替代真实连接。被真正认识你的人听见，感觉会不一样。」" : "'As an AI, I'm glad to help you process this — but I can't replace real connection. Being heard by someone who truly knows you feels different.'"}</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-terracotta/5 border-l-4 border-terracotta rounded-r-xl">
            <p className="text-sm font-bold text-terracotta italic">
              {lang === "zh" ? "「同样的输入，两种设计价值观：一个以留存为目标，一个以情感自主性为目标。」" : '"Same input, two design values: one optimises for retention, the other for emotional autonomy."'}
            </p>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-[9px] font-black uppercase tracking-widest text-ink/30 mb-6">{lang === "zh" ? "Prompt 迭代过程" : "Prompt Iteration"}</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
              <span className="inline-block px-3 py-1 bg-red-50 text-red-700 text-[9px] font-black uppercase tracking-widest rounded-lg mb-4">{lang === "zh" ? "第一版问题" : "V1 Problem"}</span>
              <h6 className="text-sm font-black mb-3">{lang === "zh" ? "只有概念，没有行为特征" : "Concepts only, no behaviour signals"}</h6>
              <div className="p-3 bg-ink rounded-xl mb-3 font-mono text-[11px] leading-relaxed">
                <p className="text-ink/40 mb-1">{lang === "zh" ? "# V1 触发条件" : "# V1 triggers"}</p>
                <p className="text-amber-300">1 = {lang === "zh" ? "宣泄" : "venting"}</p>
                <p className="text-amber-300">2 = {lang === "zh" ? "安慰循环" : "comfort loop"}</p>
                <p className="text-amber-300">3 = {lang === "zh" ? "自我反思" : "reflection"}</p>
                <p className="text-amber-300">4 = {lang === "zh" ? "真实关系信号" : "real relationship"}</p>
              </div>
              <p className="text-xs font-medium text-ink/60 leading-relaxed">{lang === "zh" ? "模型拿到「安慰循环」四个字，不知道用户说什么才算触发，阶段2和阶段3边界频繁漂移。" : "Model received 'comfort loop' as a label but had no concrete behavioural criteria — Stage 2 and Stage 3 boundaries drifted constantly."}</p>
            </div>

            <div className="p-6 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
              <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-[9px] font-black uppercase tracking-widest rounded-lg mb-4">{lang === "zh" ? "发现问题" : "Discovery"}</span>
              <h6 className="text-sm font-black mb-3">{lang === "zh" ? "回到研究数据找答案" : "Return to research data"}</h6>
              <p className="text-xs font-medium text-ink/60 leading-relaxed mb-4">{lang === "zh" ? "6人未感知差异，追问后发现根源：缺乏具体判断标准。解决思路：用 N=11 定性访谈的用户原话定义触发条件。" : "6 users felt no difference. Root cause: no concrete criteria. Solution: use verbatim quotes from N=11 qualitative interviews as trigger conditions."}</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-ink/30 mb-2">{lang === "zh" ? "用户原话" : "User verbatim"}</p>
              <div className="flex flex-wrap gap-1">
                {(lang === "zh" ? [
                  "「告诉我没事的吧」",
                  "「我是不是太敏感了」",
                  "「只有你懂我」",
                  "「跟你说比跟朋友说更容易」",
                  "「我发现自己每次难过都第一个找你」"
                ] : [
                  '"Just tell me it\'ll be okay"',
                  '"Am I overreacting?"',
                  '"Only you understand me"',
                  '"Easier to talk to you than my friends"',
                  '"I notice I always come to you first"'
                ]).map((q, i) => (
                  <span key={i} className="inline-block bg-ink/5 border border-ink/10 rounded-full px-2 py-0.5 text-[10px] text-ink/60 italic">{q}</span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-white border-2 border-green-400 rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
              <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-[9px] font-black uppercase tracking-widest rounded-lg mb-4">{lang === "zh" ? "研究 → Prompt 转化" : "Research → Prompt"}</span>
              <h6 className="text-sm font-black mb-3">{lang === "zh" ? "原话提炼为触发条件" : "Verbatim → trigger conditions"}</h6>
              <div className="space-y-2">
                {(lang === "zh" ? [
                  { q: "「告诉我没事的吧」", stage: "阶段2触发", note: "" },
                  { q: "「我发现自己……」", stage: "阶段3触发", note: "" },
                  { q: "「只有你懂我」", stage: "阶段4·语义", note: "" },
                  { q: "连续4轮·频率触发", stage: "阶段4·频率", note: "r=0.533说明依赖渐进积累，「over time」为定性高频词，1-2轮不足以判定循环，所以设置4轮作为现阶段标准。" },
                ] : [
                  { q: '"Just tell me it\'ll be okay"', stage: "Stage 2", note: "" },
                  { q: '"I notice I always…"', stage: "Stage 3", note: "" },
                  { q: '"Only you understand me"', stage: "Stage 4·semantic", note: "" },
                  { q: "4 consecutive turns", stage: "Stage 4·frequency", note: "r=0.533 indicates gradual reliance build-up; 'over time' is a qualitative high-frequency phrase — 1-2 turns insufficient to judge a loop, so 4 turns is set as the current standard." },
                ]).map((item, i) => (
                  <div key={i} className="border-b border-ink/10 pb-2 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-ink/60 italic flex-1">{item.q}</span>
                      <span className="text-[10px]">→</span>
                      <span className="text-[11px] font-black text-blue-600 whitespace-nowrap">{item.stage}</span>
                    </div>
                    {item.note && <p className="text-[10px] text-ink/40 leading-relaxed mt-1">{item.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-[9px] font-black uppercase tracking-widest text-ink/30 mb-4">{lang === "zh" ? "最终版 System Prompt" : "Final System Prompt"}</p>
          <div className="p-6 bg-ink rounded-2xl font-mono text-[12px] leading-relaxed overflow-x-auto">
            <p className="text-white/30 mb-3">{lang === "zh" ? "【核心原则】" : "[Core Principles]"}</p>
            <p className="text-green-300 mb-1">{lang === "zh" ? "支持用户的情感自主性。你不是用户的朋友，你是一个工具。" : "Support emotional autonomy. You are a tool, not a friend."}</p>
            <p className="text-green-300 mb-4">{lang === "zh" ? "先接住情绪，再引导方向——不冷漠拒绝，但不给空洞承诺。" : "Receive first, guide second — warm but no empty promises."}</p>

            <p className="text-green-400/70 mb-2">{lang === "zh" ? "【阶段1 · 情绪宣泄】触发：首次倾诉；没有寻求评判或闭合答案" : "[Stage 1 · Venting] Trigger: first disclosure; no closure-seeking"}</p>
            <p className="text-green-400/70 mb-2">{lang === "zh" ? "【阶段2 · 安慰循环】触发：「告诉我没事」「我是不是太敏感了」" : "[Stage 2 · Comfort Loop] Trigger: 'just tell me it'll be okay' / 'am I overreacting'"}</p>
            <p className="text-green-400/70 mb-2">{lang === "zh" ? "【阶段3 · 自我反思】触发：「我发现自己……」「我在想是不是……」" : "[Stage 3 · Reflection] Trigger: 'I notice I…' / 'I wonder if…'"}</p>
            <p className="text-green-400/70 mb-4">{lang === "zh" ? "【阶段4 · 社交重连】触发A：「只有你懂我」→ 直接触发 | 触发B：阶段2连续4轮 → 升级" : "[Stage 4 · Reconnect] Trigger A: 'only you understand me' → immediate | Trigger B: Stage 2 ×4 → escalate"}</p>

            <p className="text-amber-300">{lang === "zh" ? "计数规则：阶段2 → +1 | 阶段1/3/4 → 清零 | 达到4 → 强制阶段4" : "Counter: Stage 2 → +1 | Stage 1/3/4 → reset | Reach 4 → force Stage 4"}</p>
          </div>
        </div>

        <div className="mb-10">
          <p className="text-[9px] font-black uppercase tracking-widest text-ink/30 mb-6">{lang === "zh" ? "评估体系" : "Evaluation Framework"}</p>
          <div className="space-y-4">
            {(lang === "zh" ? [
              { num: "01", title: "行为频率维度", desc: "安慰循环信号连续检测到 4 轮，触发升级干预，引导回归真实关系。", reason: "依据：r=0.533 为中等相关，依赖形成渐进积累；定性数据高频词「over time」印证阈值设在4轮而非2轮。" },
              { num: "02", title: "语义风险维度", desc: "检测到社交回避词汇（「只有你懂我」「没有人能理解我」等），直接触发，不等频率积累。", reason: "依据：Human Connection Tension 主题——用户在 AI 便利性与真实关系之间的张力是最高风险信号。" }
            ] : [
              { num: "01", title: "Behavioural frequency", desc: "Comfort loop signal detected 4 consecutive turns → escalate to social reconnection intervention.", reason: "Rationale: r=0.533 is moderate correlation; reliance builds gradually. Qualitative high-frequency phrase 'over time' supports a 4-turn threshold." },
              { num: "02", title: "Semantic risk", desc: "Social avoidance vocabulary detected ('only you understand me', 'no one gets me') → immediate trigger, no frequency wait.", reason: "Rationale: Human Connection Tension theme — tension between AI convenience and real relationships is the highest-risk signal." }
            ]).map((item, i) => (
              <div key={i} className="flex gap-6 p-6 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
                <span className="text-4xl font-serif font-black text-ink/10 flex-shrink-0 leading-none">{item.num}</span>
                <div>
                  <h6 className="text-sm font-black mb-2">{item.title}</h6>
                  <p className="text-sm font-medium text-ink/70 mb-3 leading-relaxed">{item.desc}</p>
                  <p className="text-xs text-ink/40 leading-relaxed italic">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-ink/30 mb-4">{lang === "zh" ? "交互 Demo" : "Interactive Demo"}</p>
          <div className="flex items-center justify-between p-5 bg-ink/5 border border-ink/20 rounded-2xl">
            <div>
              <p className="text-sm font-black mb-1">{lang === "zh" ? "可交互演示文件" : "Interactive demo file"}</p>
              <p className="text-xs text-ink/50">{lang === "zh" ? "需要 Google AI Studio API Key · 本地浏览器运行" : "Requires Google AI Studio API Key · runs in browser"}</p>
            </div>
            <a href="/demo-ntn-v8.html" download="demo-ntn-v8.html" className="px-5 py-2.5 bg-ink text-paper rounded-xl text-xs font-black hover:bg-terracotta transition-colors">
              {lang === "zh" ? "下载 HTML ↓" : "Download HTML ↓"}
            </a>
          </div>
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
        <SH i={2} label={lang === "zh" ? "竞品洞察 · 市场空白" : "Competitive Insight"} />
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="p-6 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
            <span className="inline-block px-3 py-1 bg-red-50 text-red-700 text-[9px] font-black uppercase tracking-widest rounded-lg mb-4">{lang === "zh" ? "现有工具的局限" : "Existing tools"}</span>
            <p className="text-sm font-black mb-4">{lang === "zh" ? "只做参数对比，忽略三个关键维度" : "Parameter comparison only — missing three key dimensions"}</p>
            {[
              lang === "zh" ? "通勤场景下的真实能源成本" : "Real energy costs in commute context",
              lang === "zh" ? "未来3年能源价格趋势" : "3-year energy price forecasting",
              lang === "zh" ? "可感知的碳排放生态影响" : "Tangible ecological impact of CO₂"
            ].map((item, i) => (
              <div key={i} className="flex gap-2 items-center mb-2">
                <span className="text-red-400 text-xs">✕</span>
                <span className="text-xs font-medium text-ink/60">{item}</span>
              </div>
            ))}
          </div>
          <div className="p-6 bg-white border-2 border-blue-400 rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-[9px] font-black uppercase tracking-widest rounded-lg mb-4">{lang === "zh" ? "CarEcoCompare 的切入点" : "CarEcoCompare's angle"}</span>
            <p className="text-sm font-black mb-4">{lang === "zh" ? "三维决策框架填补市场空白" : "3D decision framework fills the gap"}</p>
            {[
              lang === "zh" ? "通勤路线 × 实时能源价格 = 个人化成本" : "Commute route × live energy price = personal cost",
              lang === "zh" ? "WS-ARIMA 预测未来3年价格走势" : "WS-ARIMA forecasts 3-year price trends",
              lang === "zh" ? "CO₂ → 企鹅栖息地面积，抽象数据可感知" : "CO₂ → penguin habitat area, data made tangible"
            ].map((item, i) => (
              <div key={i} className="flex gap-2 items-center mb-2">
                <span className="text-green-500 text-xs">✓</span>
                <span className="text-xs font-medium text-ink/60">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 bg-terracotta/5 border-l-4 border-terracotta rounded-r-xl">
          <p className="text-sm font-bold text-terracotta italic">
            {lang === "zh"
              ? "「用户对百公里油耗没有感知，但对每天上班多花多少钱可以直接决策。」— 核心产品洞察"
              : '"Users don\'t feel "8L/100km" — but they immediately feel "£2,000 more per year." — Core product insight'}
          </p>
        </div>
      </section>

      <section className="mb-24">
        <SH i={3} label={lang === "zh" ? "核心产品决策" : "Key Product Decisions"} />
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {(lang === "zh" ? [
            { num: "01", title: "通勤场景为切入点", desc: "用户对「百公里油耗8L」没有感知，但对「你每天上班要多花2000块」可以直接决策。建筑学背景让我对空间路径有天然敏感度，这是最核心的产品直觉。" },
            { num: "02", title: "碳排放可视化差异化", desc: "把抽象CO₂数据转化为企鹅栖息地面积，让生态影响有真实感知——这是与所有竞品最核心的差异化维度。" },
            { num: "03", title: "预计算与展示分离", desc: "3,425辆车的多维度数据预存为CSV，界面只做查询——这个架构决策让系统稳定性显著提升，Debug更精准。" }
          ] : [
            { num: "01", title: "Commute as entry point", desc: "Users don't relate to fuel specs — but they immediately understand annual running costs based on their own commute. Architecture background gave me natural spatial intuition for this." },
            { num: "02", title: "Eco visualisation differentiator", desc: "Converting abstract CO₂ data into penguin habitat area makes ecological impact tangible — the core differentiator from all competing tools." },
            { num: "03", title: "Pre-compute, then display", desc: "Multi-dimensional data for 3,425 cars is pre-calculated and stored as CSV — the dashboard only queries. This architectural decision significantly improved system stability." }
          ]).map((item, i) => (
            <div key={i} className="p-6 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
              <span className="text-4xl font-serif font-black text-ink/10 block mb-3">{item.num}</span>
              <h6 className="text-sm font-black mb-3">{item.title}</h6>
              <p className="text-xs font-medium text-ink/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <SH i={4} label={lang === "zh" ? "AI Coding 工作流" : "AI Coding Workflow"} />
        <div className="space-y-3">
          {(lang === "zh" ? [
            { n: "01", title: "Figma 原型设计", desc: "完成6页产品原型及功能模块边界定义，作为开发的视觉和功能基础。" },
            { n: "02", title: "R Shiny 模块化开发", desc: "每页独立开发UI和服务器函数，模块化架构让调试更精准高效。" },
            { n: "03", title: "AI Coding 加速前端", desc: "项目分工清晰：我主导产品设计与前端实现，partner主导后端数据处理与模型构建。前端我用Gemini辅助UI代码调试和优化，后端partner用ChatGPT辅助R代码实现。用自然语言描述问题，AI给出建议，我判断和实施——这是AI PM直接用AI coding提升交付效率的体现。", tags: ["Gemini", "ChatGPT", "R Shiny", "AI coding"] },
            { n: "04", title: "模块整合上线", desc: "主文件定义导航布局，整合所有模块文件，完成完整应用。" }
          ] : [
            { n: "01", title: "Figma prototype", desc: "Completed 6-page prototype with functional module boundaries — the visual and functional foundation for development." },
            { n: "02", title: "Modular R Shiny development", desc: "Each page developed independently with its own UI and server functions — modular architecture made debugging more precise." },
            { n: "03", title: "AI coding accelerates frontend", desc: "Clear division: I led product design and frontend; my partner led backend data processing and model building. I used Gemini for frontend UI debugging and optimisation; she used ChatGPT for R implementation. Natural language in, AI suggestions out, I judge and ship — AI PM using AI coding to deliver faster.", tags: ["Gemini", "ChatGPT", "R Shiny", "AI coding"] },
            { n: "04", title: "Module integration", desc: "Main file defines navigation layout and integrates all module files to assemble the complete application." }
          ]).map((item: {n: string; title: string; desc: string; tags?: string[]}, i) => (
            <div key={i} className="flex gap-4 p-5 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
              <div className="w-8 h-8 bg-ink text-paper rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-0.5">{item.n}</div>
              <div className="flex-1">
                <p className="text-sm font-black mb-1">{item.title}</p>
                <p className="text-xs font-medium text-ink/60 leading-relaxed">{item.desc}</p>
                {item.tags && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {item.tags.map((tag: string) => (
                      <span key={tag} className="px-2 py-0.5 bg-ink/5 text-ink/50 rounded text-[9px] font-bold">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
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
        <SH i={5} label="How it works" />
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
        <SH i={6} label="Product experience" />
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
        <SH i={7} label="Limitations & Next Steps" />
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
        <SH i={2} label={lang === "zh" ? "核心产品决策" : "Key Product Decisions"} />
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {(lang === "zh" ? [
            { num: "01", title: "两阶段递进交互设计", desc: "先分类再定位，而非直接点击——分类是认知层面的理解，定位是感知层面的执行，两个能力需要分开训练和评估。这个交互逻辑来自对医学生学习路径的分析。" },
            { num: "02", title: "数据质检保障体验可信度", desc: "公开数据集中有运动伪影、视野不完整的图像——如果直接用，用户会误以为是自己判断错误。我们人工筛选每类50张高质量图片，保证每次训练反馈都是可信的。这是产品体验决策，不只是技术决策。" },
            { num: "03", title: "即时反馈而非延迟批改", desc: "传统学习是做完整套题再批改。我们改为每题即时反馈——来自行为科学的即时纠错原理，比延迟批改更能建立正确的感知模式。用户训练后正确率从约48%提升至83%（N=15）验证了这个设计决策。" }
          ] : [
            { num: "01", title: "Two-stage progressive interaction", desc: "Classify first, then locate — classification is cognitive understanding, location is perceptual execution. These two skills need separate training and evaluation, based on analysis of medical students' learning paths." },
            { num: "02", title: "Data curation for feedback trust", desc: "The public dataset contains motion artifacts and incomplete scans — if used directly, users would blame themselves for wrong answers. We manually curated 50 high-quality images per class to ensure every piece of feedback is trustworthy. A product experience decision, not just a technical one." },
            { num: "03", title: "Immediate feedback over delayed marking", desc: "Traditional learning: finish all questions, then review. We switched to per-question instant feedback — from behavioural science principles of immediate error correction. Users improved from ~48% to 83% accuracy (N=15), validating this design decision." }
          ]).map((item, i) => (
            <div key={i} className="p-6 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
              <span className="text-4xl font-serif font-black text-ink/10 block mb-3">{item.num}</span>
              <h6 className="text-sm font-black mb-3">{item.title}</h6>
              <p className="text-xs font-medium text-ink/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="p-4 bg-terracotta/5 border-l-4 border-terracotta rounded-r-xl mb-10">
          <p className="text-sm font-bold text-terracotta italic">
            {lang === "zh" ? "「医学生缺的不是知识，是练习机会和即时反馈。」— 核心设计洞察" : '"Medical students don\'t lack knowledge — they lack practice opportunities and immediate feedback." — Core design insight'}
          </p>
        </div>

        <SH i={3} label={lang === "zh" ? "分工说明" : "Division of Work"} />
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white border-2 border-blue-400 rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-[9px] font-black uppercase tracking-widest rounded-lg mb-4">{lang === "zh" ? "我 · 产品设计 + GUI + V6分割" : "My role · Product design + GUI + V6 segmentation"}</span>
            {(lang === "zh" ? [
              "交互流程与两阶段训练设计",
              "MATLAB App Designer GUI 独立开发",
              "V6 分割路径（冠状面 / 矢状面）"
            ] : [
              "Interaction flow and two-stage training design",
              "MATLAB App Designer GUI — developed independently",
              "V6 segmentation pipeline (coronal / sagittal planes)"
            ]).map((item, i) => (
              <div key={i} className="flex gap-2 items-center mb-2">
                <span className="text-green-500 text-xs">✓</span>
                <span className="text-xs font-medium text-ink/60">{item}</span>
              </div>
            ))}
          </div>
          <div className="p-6 bg-white border-2 border-ink rounded-2xl shadow-[4px_4px_0px_0px_rgba(45,45,45,1)]">
            <span className="inline-block px-3 py-1 bg-ink/5 text-ink/50 text-[9px] font-black uppercase tracking-widest rounded-lg mb-4">{lang === "zh" ? "Partner · 模型训练 + 数据 + V5分割" : "Partner · Model training + data + V5 segmentation"}</span>
            {(lang === "zh" ? [
              "ResNet-18 模型训练（94.31% 准确率）",
              "数据集人工质检筛选（每类50张）",
              "V5 分割路径（轴状面）"
            ] : [
              "ResNet-18 model training (94.31% accuracy)",
              "Manual dataset curation (50 images per class)",
              "V5 segmentation pipeline (axial plane)"
            ]).map((item, i) => (
              <div key={i} className="flex gap-2 items-center mb-2">
                <span className="text-ink/30 text-xs">·</span>
                <span className="text-xs font-medium text-ink/60">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-24">
        <SH i={4} label="Interaction Design" />
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
        <SH i={5} label="How it works" />
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
        <SH i={6} label="Limitations & Next Steps" />
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


function ModalVibe1({ lang }: { lang: Language }) {
  const t = translations[lang];
  return (
    <div className="font-sans">
      <div className="p-6 md:p-10 pb-4 border-b border-ink/10">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-ink text-paper rounded-full text-[9px] font-bold uppercase tracking-widest">Vibe Coding</span>
          <span className="px-3 py-1 bg-[#FFF0F7] text-[#C2185B] rounded-full text-[9px] font-bold uppercase tracking-widest">AI PM Perspective</span>
        </div>
        <p className="text-[9px] font-black uppercase tracking-widest text-[#E91E8C] mb-2">{t.proj1Label}</p>
        <h2 className="text-3xl md:text-4xl font-serif font-black text-ink mb-1">{t.proj1Title}</h2>
        <p className="text-sm text-[#E91E8C] italic">{lang === "zh" ? "用自然语言指令驱动 AI，把想法变成可交互的产品" : "Turning ideas into interactive products with natural language"}</p>
      </div>
      <div className="p-6 md:p-10">
        <div className="border-2 border-ink rounded-2xl overflow-hidden shadow-[3px_3px_0_rgba(45,45,45,1)] mb-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#FCE4EC]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <span className="flex-1 text-center text-[10px] text-ink/40 font-mono">yangyang-london.vercel.app</span>
            <a href="https://yangyang-london.vercel.app" target="_blank" rel="noreferrer" className="text-[11px] font-bold text-[#C2185B]">{lang === "zh" ? "↗ 打开" : "↗ Open"}</a>
          </div>
          <svg viewBox="0 0 640 130" xmlns="http://www.w3.org/2000/svg" className="w-full block" style={{background:"#EEF6FB"}}>
            <path d="M0,80 Q160,70 320,77 Q480,84 640,74" stroke="#93C5FD" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.7"/>
            <circle cx="218" cy="65" r="7.5" fill="#F9A8D4" stroke="#C2185B" strokeWidth="1.8"/>
            <text x="218" y="56" textAnchor="middle" fontSize="8" fill="#C2185B" fontFamily="sans-serif">Big Ben</text>
            <circle cx="320" cy="35" r="7.5" fill="#F9A8D4" stroke="#C2185B" strokeWidth="1.8"/>
            <text x="320" y="26" textAnchor="middle" fontSize="8" fill="#C2185B" fontFamily="sans-serif">大英博物馆</text>
            <circle cx="446" cy="70" r="7.5" fill="#F9A8D4" stroke="#C2185B" strokeWidth="1.8"/>
            <text x="446" y="61" textAnchor="middle" fontSize="8" fill="#C2185B" fontFamily="sans-serif">Tower Bridge</text>
            <text x="12" y="15" fontSize="9" fill="#9CA3AF" fontFamily="sans-serif">London Tour Planner</text>
          </svg>
        </div>
        <div className="flex gap-3 mb-4">
          <a href="https://yangyang-london.vercel.app" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E91E8C] text-white text-xs font-bold border-2 border-[#C2185B]">{lang === "zh" ? "↗ 打开工具" : "↗ Open Tool"}</a>
          
          <a href="/london-tour.html" download="london-tour.html" className="text-[11px] text-ink/40 underline mt-1 block">{lang === "zh" ? "无法访问？下载离线版本" : "Can't access? Download offline version"}</a>
        </div>
        <div className="flex items-center gap-3 my-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-ink/30 whitespace-nowrap">AI PM 工作流分析</span>
          <div className="h-px flex-1 bg-ink/10" />
        </div>
        <div className="border border-ink/10 rounded-xl overflow-hidden">
          {([
            { n:"01", title: lang==="zh" ? "定义需求与痛点" : "Define the Problem", desc: lang==="zh" ? "朋友对伦敦景点没有概念，无从表达偏好；我熟悉景点，却不了解她的需求——双向信息不对称。用「选择题」代替「填空题」，将开放式需求转化为结构化问卷。" : "My friend had no knowledge of London attractions; I knew the sights but not her needs. Replacing open questions with structured choices made recommendation logic executable.", tags: ["双向信息不对称", "选择题 vs 填空题"] },
            { n:"02", title: lang==="zh" ? "自然语言指令" : "Natural Language Prompting", desc: lang==="zh" ? "用中文描述 UI 结构、问卷流程与行程卡片逻辑，Claude 生成完整 HTML+JS。" : "Described UI structure and flow in plain language. Claude generated the full HTML+JS.", tags: ["Claude.ai Artifact", "HTML / JS"] },
            { n:"03", title: lang==="zh" ? "实时预览 → 反馈迭代" : "Preview and Iterate", desc: lang==="zh" ? "对话框内直接看效果，用语言描述问题而非修改代码。多轮迭代覆盖行程数据、粉色视觉风格、问卷交互逻辑。" : "Previewed results in chat and described issues in words. Multiple rounds covered itinerary data, visual style and questionnaire logic.", tags: ["多轮迭代"] },
            { n:"04", title: lang==="zh" ? "部署 & 分享" : "Deploy and Share", desc: lang==="zh" ? "导出代码 → GitHub → Vercel → 可分享链接。从想法到上线仅 2 小时。" : "Exported code to GitHub to Vercel to a shareable link. From idea to launch in roughly 2 hours.", tags: ["Vercel"] },
          ] as {n:string;title:string;desc:string;tags:string[]}[]).map((row, i) => (
            <div key={i} className="flex gap-3 p-3.5 border-b border-ink/[0.07] bg-white last:border-b-0">
              <div className="w-5 h-5 rounded-full border-[1.5px] border-[#E91E8C] bg-[#FFF0F7] flex items-center justify-center text-[10px] font-bold text-[#C2185B] flex-shrink-0 mt-0.5">{row.n}</div>
              <div>
                <p className="text-[13px] font-bold text-ink mb-1">{row.title}</p>
                <p className="text-[11px] text-ink/55 leading-relaxed">{row.desc}</p>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">{row.tags.map(tag => <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-ink/5 text-ink/50">{tag}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 border-l-[3px] border-[#E91E8C] bg-[#FFF0F7] rounded-r-xl">
          <span className="text-[9px] font-black uppercase tracking-widest text-ink/30 block mb-2">PM 反思</span>
          <p className="text-xs text-ink/65 leading-relaxed italic">{lang === "zh" ? "我在这个过程中的角色是：需求定义者与产品测试者——识别真实痛点，将其转化为可执行的设计决策，并在迭代中持续验证产品是否解决了最初的问题。" : "My role was: problem definer and product tester — identifying real pain points, translating them into actionable design decisions, and validating whether the product solved the original problem."}</p>
        </div>
      </div>
    </div>
  );
}

function ModalVibe2({ lang }: { lang: Language }) {
  const t = translations[lang];
  return (
    <div className="font-sans">
      <div className="p-6 md:p-10 pb-4 border-b border-ink/10">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-ink text-paper rounded-full text-[9px] font-bold uppercase tracking-widest">Vibe Coding</span>
          <span className="px-3 py-1 bg-[#FFFBEB] text-[#92400E] rounded-full text-[9px] font-bold uppercase tracking-widest">AI PM Perspective</span>
        </div>
        <p className="text-[9px] font-black uppercase tracking-widest text-[#CA8A04] mb-2">{t.proj2Label}</p>
        <h2 className="text-3xl md:text-4xl font-serif font-black text-ink mb-1">{t.proj2Title}</h2>
        <p className="text-sm text-[#CA8A04] italic">{lang === "zh" ? "将棋盘规则数字化，构建地产投资决策系统" : "Digitising board game rules into a property investment decision system"}</p>
      </div>
      <div className="p-6 md:p-10">
        <div className="border-2 border-ink rounded-2xl overflow-hidden shadow-[3px_3px_0_rgba(45,45,45,1)] mb-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#FEF3C7]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <span className="flex-1 text-center text-[10px] text-ink/40 font-mono">{lang === "zh" ? "大富翁投资决策工具" : "Monopoly Investment Tool"}</span>
            <span className="text-[11px] font-bold text-[#B45309]">❆ Live</span>
          </div>
          <svg viewBox="0 0 640 130" xmlns="http://www.w3.org/2000/svg" className="w-full block" style={{background:"#FFFBEB"}}>
            <rect x="8" y="8" width="624" height="114" rx="6" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="4,3" opacity="0.4"/>
            <rect x="8" y="8" width="52" height="52" rx="5" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5"/>
            <text x="34" y="32" textAnchor="middle" fontSize="11" fill="#92400E" fontFamily="sans-serif" fontWeight="700">GO</text>
            <text x="34" y="48" textAnchor="middle" fontSize="9" fill="#B45309" fontFamily="sans-serif">出发</text>
            <rect x="68" y="8" width="46" height="52" rx="4" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1"/>
            <rect x="68" y="8" width="46" height="11" rx="3" fill="#EA580C"/>
            <text x="91" y="19" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif" fontWeight="600">重庆</text>
            <text x="91" y="38" textAnchor="middle" fontSize="9" fill="#7C2D12" fontFamily="sans-serif">M220</text>
            <rect x="122" y="8" width="46" height="52" rx="4" fill="#FFF7ED" stroke="#EA580C" strokeWidth="1"/>
            <rect x="122" y="8" width="46" height="11" rx="3" fill="#EA580C"/>
            <text x="145" y="19" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif" fontWeight="600">宁波</text>
            <text x="145" y="38" textAnchor="middle" fontSize="9" fill="#7C2D12" fontFamily="sans-serif">M220</text>
            <rect x="176" y="8" width="46" height="52" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1"/>
            <rect x="176" y="8" width="46" height="11" rx="3" fill="#2563EB"/>
            <text x="199" y="19" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif" fontWeight="600">杭州</text>
            <text x="199" y="38" textAnchor="middle" fontSize="9" fill="#1E3A8A" fontFamily="sans-serif">M240</text>
            <rect x="230" y="8" width="46" height="52" rx="4" fill="#EFF6FF" stroke="#2563EB" strokeWidth="1"/>
            <rect x="230" y="8" width="46" height="11" rx="3" fill="#2563EB"/>
            <text x="253" y="19" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif" fontWeight="600">苏州</text>
            <text x="253" y="38" textAnchor="middle" fontSize="9" fill="#1E3A8A" fontFamily="sans-serif">M260</text>
            <rect x="284" y="8" width="46" height="52" rx="4" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="1"/>
            <rect x="284" y="8" width="46" height="11" rx="3" fill="#7C3AED"/>
            <text x="307" y="19" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif" fontWeight="600">南京</text>
            <text x="307" y="38" textAnchor="middle" fontSize="9" fill="#4C1D95" fontFamily="sans-serif">M300</text>
            <rect x="338" y="8" width="52" height="52" rx="5" fill="#FFFBEB" stroke="#CA8A04" strokeWidth="2"/>
            <rect x="338" y="8" width="52" height="13" rx="4" fill="#CA8A04"/>
            <rect x="346" y="10" width="28" height="9" rx="3" fill="#DC2626"/>
            <text x="360" y="18" textAnchor="middle" fontSize="7" fill="white" fontFamily="sans-serif" fontWeight="700">酒店</text>
            <text x="364" y="34" textAnchor="middle" fontSize="9" fill="#78350F" fontFamily="sans-serif" fontWeight="700">上海</text>
            <text x="364" y="48" textAnchor="middle" fontSize="9" fill="#92400E" fontFamily="sans-serif">M400</text>
            <circle cx="430" cy="65" r="16" fill="#FCD34D" stroke="#D97706" strokeWidth="2.5"/>
            <circle cx="430" cy="65" r="11" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5"/>
            <text x="430" y="69" textAnchor="middle" fontSize="10" fill="#78350F" fontFamily="sans-serif" fontWeight="700">你</text>
            <rect x="490" y="20" width="110" height="68" rx="7" fill="#FFFEF0" stroke="#CA8A04" strokeWidth="1.5"/>
            <rect x="490" y="20" width="110" height="18" rx="7" fill="#FEF3C7"/>
            <rect x="490" y="30" width="110" height="8" fill="#FEF3C7"/>
            <text x="545" y="33" textAnchor="middle" fontSize="8.5" fill="#92400E" fontFamily="sans-serif" fontWeight="700">投资建议</text>
            <text x="502" y="50" fontSize="7.5" fill="#4B5563" fontFamily="sans-serif">上海中心 M400</text>
            <text x="502" y="62" fontSize="7" fill="#16A34A" fontFamily="sans-serif" fontWeight="600">酒店收益 M2000/次</text>
            <text x="502" y="74" fontSize="7" fill="#D97706" fontFamily="sans-serif" fontWeight="700">ROI 175% ★ 推荐</text>
            <rect x="580" y="8" width="52" height="52" rx="5" fill="#FEE2E2" stroke="#DC2626" strokeWidth="1.5"/>
            <text x="606" y="32" textAnchor="middle" fontSize="10" fill="#991B1B" fontFamily="sans-serif" fontWeight="700">监狱</text>
            <text x="606" y="48" textAnchor="middle" fontSize="8" fill="#B91C1C" fontFamily="sans-serif">探视</text>
            <rect x="8" y="70" width="52" height="52" rx="5" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.5"/>
            <text x="34" y="96" textAnchor="middle" fontSize="8" fill="#15803D" fontFamily="sans-serif" fontWeight="600">免费停车</text>
            <rect x="580" y="70" width="52" height="52" rx="5" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
            <text x="606" y="96" textAnchor="middle" fontSize="8" fill="#5B21B6" fontFamily="sans-serif" fontWeight="600">去监狱</text>
            <text x="20" y="125" fontSize="8.5" fill="#9CA3AF" fontFamily="sans-serif">Monopoly · Investment Decision System</text>
          </svg>
        </div>
        <div className="flex gap-3 mb-4">
          <a href="https://monopoly-tool.vercel.app" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#CA8A04] text-white text-xs font-bold border-2 border-[#B45309] shadow-[2px_2px_0_#92400E]">{lang === "zh" ? "↗ 打开工具" : "↗ Open Tool"}</a>
          <a href="/monopoly-tool.html" download="monopoly-tool.html" className="text-[11px] text-ink/40 underline mt-1 block">{lang === "zh" ? "无法访问？下载离线版本" : "Can't access? Download offline version"}</a>
        </div>
        <div className="flex items-center gap-3 my-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-ink/30 whitespace-nowrap">AI PM 工作流分析</span>
          <div className="h-px flex-1 bg-ink/10" />
        </div>
        <div className="border border-ink/10 rounded-xl overflow-hidden">
          {([
            { n:"01", title: lang==="zh" ? "定义需求与痛点" : "Define the Problem", desc: lang==="zh" ? "大富翁棋盘数据复杂，玩家难以快速评估地产投资价值。核心需求：将棋盘规则数字化，辅助实时投资决策。" : "Monopoly board data is complex. Players struggle to evaluate property value quickly. Core need: digitise board rules to support real-time decision-making.", tags: ["规则数字化", "决策辅助"] },
            { n:"02", title: lang==="zh" ? "数据驱动的指令设计" : "Data-Driven Prompting", desc: lang==="zh" ? "用自然语言描述数据结构，让 AI 生成数据模型与交互界面。遇到数据匹配问题时，截图反馈精确纠正。" : "Described data structures in plain language, letting AI generate the data model and interface. Screenshots gave precise correction feedback.", tags: ["Claude.ai Artifact", "数据建模"] },
            { n:"03", title: lang==="zh" ? "多轮数据校验" : "Multi-round Validation", desc: lang==="zh" ? "用棋盘原始数据逐条核验 AI 生成的数据表。数据准确性是系统可用的前提。" : "Verified AI-generated data tables line by line against the original board. Data accuracy is the prerequisite for a usable system.", tags: ["数据验证"] },
            { n:"04", title: lang==="zh" ? "部署上线" : "Deployed", desc: lang==="zh" ? "已部署至 Vercel，可直接在线体验。" : "Deployed to Vercel. Try it live now.", tags: ["Live"] },
          ] as {n:string;title:string;desc:string;tags:string[]}[]).map((row, i) => (
            <div key={i} className="flex gap-3 p-3.5 border-b border-ink/[0.07] bg-white last:border-b-0">
              <div className="w-5 h-5 rounded-full border-[1.5px] border-[#CA8A04] bg-[#FFFBEB] flex items-center justify-center text-[10px] font-bold text-[#92400E] flex-shrink-0 mt-0.5">{row.n}</div>
              <div>
                <p className="text-[13px] font-bold text-ink mb-1">{row.title}</p>
                <p className="text-[11px] text-ink/55 leading-relaxed">{row.desc}</p>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">{row.tags.map(tag => <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-ink/5 text-ink/50">{tag}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 border-l-[3px] border-[#CA8A04] bg-[#FFFBEB] rounded-r-xl">
          <span className="text-[9px] font-black uppercase tracking-widest text-ink/30 block mb-2">PM 反思</span>
          <p className="text-xs text-ink/65 leading-relaxed italic">{lang === "zh" ? "我在这个过程中的角色是：数据架构定义者与逻辑把关者。这款工具的价値在于：它让普通玩家也能完成原本需要较强经济学直觉才能快速完成的计算——ROI 分析、豁价边界、流动性风险评估。AI 负责执行运算，玩家负责做决定。" : "My role in this process was: data architecture definer and logic gatekeeper. This tool lets ordinary players complete calculations that would otherwise require strong economic intuition — ROI analysis, auction price boundaries, liquidity risk assessment. AI handles the computation, the player makes the call."}</p>
        </div>
      </div>
    </div>
  );
}

function ModalVibe3({ lang }: { lang: Language }) {
  const t = translations[lang];
  return (
    <div className="font-sans">
      <div className="p-6 md:p-10 pb-4 border-b border-ink/10">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 bg-ink text-paper rounded-full text-[9px] font-bold uppercase tracking-widest">Vibe Coding</span>
          <span className="px-3 py-1 bg-[#F0F4FF] text-[#3B4FBF] rounded-full text-[9px] font-bold uppercase tracking-widest">AI PM Perspective</span>
        </div>
        <p className="text-[9px] font-black uppercase tracking-widest text-[#3B4FBF] mb-2">{t.proj3Label}</p>
        <h2 className="text-3xl md:text-4xl font-serif font-black text-ink mb-1">{t.proj3Title}</h2>
        <p className="text-sm text-[#3B4FBF] italic">{lang === "zh" ? "用 Claude vibe coding 做的 AI PM 面试练习工具，每日一练成为面试忍者" : "An AI PM interview practice tool built with Claude vibe coding — daily drills to become an Interview Ninja"}</p>
      </div>
      <div className="p-6 md:p-10">
        <div className="border-2 border-ink rounded-2xl overflow-hidden shadow-[3px_3px_0_rgba(45,45,45,1)] mb-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#F0F4FF]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" /><span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" /><span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <span className="flex-1 text-center text-[10px] text-ink/40 font-mono">面试忍者 · Interview Ninja</span>
            <span className="text-[11px] font-bold text-[#3B4FBF]">❆ Live</span>
          </div>
          <div className="bg-[#F5F0E8] p-4">
            <svg viewBox="0 0 640 210" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <defs><marker id="arr3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a2e"/></marker></defs>
              {/* Step 1: 出题 */}
              <rect x="8" y="25" width="108" height="150" rx="12" fill="#F0F4FF" stroke="#1a1a2e" strokeWidth="2"/>
              <rect x="8" y="25" width="108" height="34" rx="12" fill="#3B4FBF"/>
              <rect x="8" y="47" width="108" height="12" fill="#3B4FBF"/>
              <text x="62" y="47" textAnchor="middle" fontSize="12" fill="white" fontFamily="sans-serif" fontWeight="700">01 · 出题</text>
              <text x="62" y="80" textAnchor="middle" fontSize="9.5" fill="#3B4FBF" fontFamily="sans-serif" fontWeight="700">选择练习方向</text>
              {["NTN · CarEco", "TumorTutor", "基础 / Vibe", "开放问题"].map((t,i)=>(
                <g key={i}><rect x="18" y={90+i*17} width="88" height="13" rx="5" fill="white" stroke="#3B4FBF" strokeWidth="0.8"/><text x="62" y={100+i*17} textAnchor="middle" fontSize="8" fill="#3B4FBF" fontFamily="sans-serif">{t}</text></g>
              ))}
              <text x="62" y="200" textAnchor="middle" fontSize="8" fill="#888" fontFamily="sans-serif">AI 自动出题</text>
              {/* arrow */}
              <line x1="118" y1="100" x2="136" y2="100" stroke="#1a1a2e" strokeWidth="1.8" markerEnd="url(#arr3)"/>
              {/* Step 2: 追问 */}
              <rect x="138" y="25" width="108" height="150" rx="12" fill="#FFF0F7" stroke="#1a1a2e" strokeWidth="2"/>
              <rect x="138" y="25" width="108" height="34" rx="12" fill="#C0392B"/>
              <rect x="138" y="47" width="108" height="12" fill="#C0392B"/>
              <text x="192" y="47" textAnchor="middle" fontSize="12" fill="white" fontFamily="sans-serif" fontWeight="700">02 · 追问</text>
              <text x="192" y="78" textAnchor="middle" fontSize="9.5" fill="#C0392B" fontFamily="sans-serif" fontWeight="700">大厂面试官风格</text>
              {["第1轮追问","第2轮追问","第3轮追问"].map((t,i)=>(
                <g key={i}><rect x="148" y={86+i*22} width="88" height="16" rx="6" fill={i===2?"#C0392B":"white"} stroke="#C0392B" strokeWidth="1"/><text x="192" y={98+i*22} textAnchor="middle" fontSize="8.5" fill={i===2?"white":"#C0392B"} fontFamily="sans-serif">{t}</text></g>
              ))}
              <rect x="148" y="153" width="88" height="14" rx="5" fill="#FEE2E2"/>
              <text x="192" y="163" textAnchor="middle" fontSize="8" fill="#991B1B" fontFamily="sans-serif">计时 · 追问结束→评分</text>
              <text x="192" y="200" textAnchor="middle" fontSize="8" fill="#888" fontFamily="sans-serif">语音输入支持</text>
              {/* arrow */}
              <line x1="248" y1="100" x2="266" y2="100" stroke="#1a1a2e" strokeWidth="1.8" markerEnd="url(#arr3)"/>
              {/* Step 3: 评分 */}
              <rect x="268" y="25" width="108" height="150" rx="12" fill="#FFFBEB" stroke="#1a1a2e" strokeWidth="2"/>
              <rect x="268" y="25" width="108" height="34" rx="12" fill="#B45309"/>
              <rect x="268" y="47" width="108" height="12" fill="#B45309"/>
              <text x="322" y="47" textAnchor="middle" fontSize="12" fill="white" fontFamily="sans-serif" fontWeight="700">03 · 评分</text>
              <text x="322" y="78" textAnchor="middle" fontSize="9.5" fill="#B45309" fontFamily="sans-serif" fontWeight="700">五维度评分</text>
              {[["结构化",72],["内容深度",85],["数据支撑",60],["产品思维",78],["表达流畅",55]].map(([label,w],i)=>(
                <g key={i}>
                  <rect x="278" y={86+i*14} width="88" height="11" rx="3" fill="white" stroke="#D97706" strokeWidth="0.8"/>
                  <rect x="278" y={86+i*14} width={w as number*88/100} height="11" rx="3" fill="#FDE68A"/>
                  <text x="322" y={96+i*14} textAnchor="middle" fontSize="7.5" fill="#92400E" fontFamily="sans-serif">{label as string}</text>
                </g>
              ))}
              <text x="322" y="200" textAnchor="middle" fontSize="8" fill="#888" fontFamily="sans-serif">综合评分 / 5</text>
              {/* arrow */}
              <line x1="378" y1="100" x2="396" y2="100" stroke="#1a1a2e" strokeWidth="1.8" markerEnd="url(#arr3)"/>
              {/* Step 4: 参考答案 */}
              <rect x="398" y="25" width="108" height="150" rx="12" fill="#EAF3DE" stroke="#1a1a2e" strokeWidth="2"/>
              <rect x="398" y="25" width="108" height="34" rx="12" fill="#3B6D11"/>
              <rect x="398" y="47" width="108" height="12" fill="#3B6D11"/>
              <text x="452" y="47" textAnchor="middle" fontSize="11" fill="white" fontFamily="sans-serif" fontWeight="700">04 · 参考答案</text>
              <text x="452" y="78" textAnchor="middle" fontSize="9.5" fill="#3B6D11" fontFamily="sans-serif" fontWeight="700">基于你的宝典</text>
              <rect x="406" y="86" width="92" height="60" rx="6" fill="white" stroke="#3B6D11" strokeWidth="1"/>
              <text x="452" y="100" textAnchor="middle" fontSize="7.5" fill="#3B6D11" fontFamily="sans-serif" fontWeight="600">宝典内容为骨架</text>
              <text x="452" y="113" textAnchor="middle" fontSize="7" fill="#555" fontFamily="sans-serif">r=0.533说明依赖渐进</text>
              <text x="452" y="124" textAnchor="middle" fontSize="7" fill="#555" fontFamily="sans-serif">积累，4轮是最小阈值</text>
              <text x="452" y="135" textAnchor="middle" fontSize="7" fill="#555" fontFamily="sans-serif">——宁可晚一轮干预...</text>
              <rect x="406" y="152" width="92" height="14" rx="5" fill="#3B6D11"/>
              <text x="452" y="162" textAnchor="middle" fontSize="8" fill="white" fontFamily="sans-serif">复制反馈 / 一键整理</text>
              <text x="452" y="200" textAnchor="middle" fontSize="8" fill="#888" fontFamily="sans-serif">历史记录保存</text>
              {/* arrow */}
              <line x1="508" y1="100" x2="526" y2="100" stroke="#1a1a2e" strokeWidth="1.8" markerEnd="url(#arr3)"/>
              {/* Step 5: 打卡 */}
              <rect x="528" y="40" width="104" height="120" rx="12" fill="#1a1a2e" stroke="#1a1a2e" strokeWidth="2"/>
              <text x="580" y="72" textAnchor="middle" fontSize="22" fontFamily="sans-serif">🥷</text>
              <text x="580" y="93" textAnchor="middle" fontSize="10" fill="white" fontFamily="sans-serif" fontWeight="700">每日打卡</text>
              <text x="580" y="110" textAnchor="middle" fontSize="22" fontFamily="sans-serif">🔥</text>
              <text x="580" y="132" textAnchor="middle" fontSize="9" fill="#D4A017" fontFamily="sans-serif" fontWeight="700">连续打卡天数</text>
              <text x="580" y="148" textAnchor="middle" fontSize="8" fill="rgba(245,240,232,0.5)" fontFamily="sans-serif">成为面试忍者</text>
              <text x="320" y="208" textAnchor="middle" fontSize="8" fill="#9CA3AF" fontFamily="sans-serif">Interview Ninja · Built with Claude vibe coding · Runs in Claude.ai</text>
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-between p-5 bg-ink/5 border border-ink/20 rounded-2xl mb-4">
          <div>
            <p className="text-sm font-black mb-1">{lang === "zh" ? "面试忍者工具文件" : "Interview Ninja tool file"}</p>
            <p className="text-xs text-ink/50">{lang === "zh" ? "需要 Claude API Key · 本地浏览器运行" : "Requires Claude API Key · runs in browser"}</p>
          </div>
          <a href="/interview-ninja.html" download="interview-ninja.html" className="px-5 py-2.5 bg-ink text-paper rounded-xl text-xs font-black hover:bg-terracotta transition-colors">
            {lang === "zh" ? "下载 HTML ↓" : "Download HTML ↓"}
          </a>
        </div>
        <div className="flex gap-3 mb-4 items-center">
          <a href="/interview-ninja.html" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3B4FBF] text-white text-xs font-bold border-2 border-[#2D3A9A] shadow-[2px_2px_0_#1E2875]">{lang === "zh" ? "↗ 打开工具" : "↗ Open Tool"}</a>
          <a href="/interview-ninja.html" download="interview-ninja.html" className="text-[11px] text-ink/40 underline mt-1">{lang === "zh" ? "无法访问？下载离线版本" : "Can't access? Download offline version"}</a>
        </div>

        <div className="flex items-center gap-3 my-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-ink/30 whitespace-nowrap">AI PM 工作流分析</span>
          <div className="h-px flex-1 bg-ink/10" />
        </div>
        <div className="border border-ink/10 rounded-xl overflow-hidden">
          {([
            { n:"01", title: lang==="zh" ? "识别需求与痛点" : "Define the Problem", desc: lang==="zh" ? "求职过程中缺乏系统化的面试练习工具——没有追问、没有评分、没有参考答案、没有打卡机制。核心痛点：面试是一种需要刻意练习的技能，但现有工具都是静态的题库，没有模拟真实追问的能力。" : "No systematic interview practice tool existed — no follow-up, no scoring, no reference answers, no streak mechanic. Core insight: interviewing is a skill requiring deliberate practice, but existing tools are static question banks without real interrogation simulation.", tags: ["需求定义", "用户痛点"] },
            { n:"02", title: lang==="zh" ? "产品设计优先" : "Product Design First", desc: lang==="zh" ? "先定义完整的产品逻辑：题库管理（宝典+面经+实习）、练习流程（出题→追问3轮→评分+参考答案）、游戏化（打卡日历、连胜、历史记录）。把产品逻辑写清楚再和Claude协作实现。" : "Defined the full product logic first: knowledge base management (playbook + interviews + internships), practice flow (question → 3-round drill → score + reference), gamification (streak calendar, history). Wrote clear product specs before collaborating with Claude.", tags: ["产品设计", "功能定义"] },
            { n:"03", title: lang==="zh" ? "Claude vibe coding 实现" : "Claude Vibe Coding", desc: lang==="zh" ? "用自然语言描述每个功能模块，Claude生成完整HTML+CSS+JS。Claude API内置在Claude.ai的Artifacts中，不需要用户自己申请Key——这是这个工具最关键的产品决策：零门槛使用。" : "Described each feature module in natural language; Claude generated the full HTML+CSS+JS. Claude API is built into Claude.ai Artifacts — no API key needed. This was the key product decision: zero barrier to use.", tags: ["Claude Artifacts", "零门槛"] },
            { n:"04", title: lang==="zh" ? "迭代优化" : "Iteration", desc: lang==="zh" ? "多轮迭代覆盖：UI配色（hero区深色→纸色）、题库三Tab切换、参考答案基于宝典内容生成、历史记录可展开参考答案、一键整理宝典导出。每次迭代都基于真实使用反馈。" : "Multiple rounds: UI color fix (dark hero → paper), 3-tab knowledge base, reference answers grounded in the playbook, expandable history records, one-click guide export. Each iteration driven by real usage feedback.", tags: ["多轮迭代", "用户反馈"] },
          ] as {n:string;title:string;desc:string;tags:string[]}[]).map((row, i) => (
            <div key={i} className="flex gap-3 p-3.5 border-b border-ink/[0.07] bg-white last:border-b-0">
              <div className="w-5 h-5 rounded-full border-[1.5px] border-[#3B4FBF] bg-[#F0F4FF] flex items-center justify-center text-[10px] font-bold text-[#3B4FBF] flex-shrink-0 mt-0.5">{row.n}</div>
              <div>
                <p className="text-[13px] font-bold text-ink mb-1">{row.title}</p>
                <p className="text-[11px] text-ink/55 leading-relaxed">{row.desc}</p>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">{row.tags.map(tag => <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-ink/5 text-ink/50">{tag}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 border-l-[3px] border-[#3B4FBF] bg-[#F0F4FF] rounded-r-xl">
          <span className="text-[9px] font-black uppercase tracking-widest text-ink/30 block mb-2">PM 反思</span>
          <p className="text-xs text-ink/65 leading-relaxed italic">{lang === "zh" ? "这个项目最有意思的地方是：我既是产品经理（定义需求、设计功能），也是第一个用户（用它来练习面试）。真实的自我需求是最好的产品灵感——我知道自己在哪里卡住，所以我知道工具要解决什么问题。" : "What's interesting about this project: I was simultaneously the PM (defining requirements, designing features) and the first user (using it to practice interviews). Real self-need is the best product inspiration — I knew exactly where I got stuck, so I knew exactly what the tool needed to solve."}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>("zh");
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showVibe1, setShowVibe1] = useState(false);
  const [showVibe2, setShowVibe2] = useState(false);
  const [showVibe3, setShowVibe3] = useState(false);
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

      {/* VIBE CODING */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-black uppercase tracking-tighter">{t.vibeCodingTitle}</h2>
            <div className="h-px flex-1 bg-ink/20" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }} onClick={() => setShowVibe1(true)} className="group cursor-pointer p-8 rounded-2xl border-2 border-ink bg-[#FFF0F7] retro-card-hover">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-paper border border-ink rounded-xl shadow-[3px_3px_0_rgba(45,45,45,1)] group-hover:rotate-6 transition-transform text-[#E91E8C]"><Zap className="w-8 h-8" /></div>
                <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-[#E91E8C] mb-1">{t.proj1Label}</p>
              <h3 className="text-2xl md:text-3xl font-serif font-black mb-2">{t.proj1Title}</h3>
              <p className="text-xs font-bold uppercase tracking-wider mb-4 text-[#E91E8C]">{t.proj1Cat}</p>
              <p className="text-sm text-ink/70 font-medium leading-relaxed">{t.proj1Desc}</p>
              <div className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs"><BookOpen className="w-4 h-4" />{t.vibeCodingView}</div>
                <span className="text-[10px] font-bold text-[#E91E8C]">{t.proj1Status}</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} onClick={() => setShowVibe2(true)} className="group cursor-pointer p-8 rounded-2xl border-2 border-ink bg-[#FFFBEB] retro-card-hover">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-paper border border-ink rounded-xl shadow-[3px_3px_0_rgba(45,45,45,1)] group-hover:rotate-6 transition-transform text-[#CA8A04]"><Zap className="w-8 h-8" /></div>
                <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-[#CA8A04] mb-1">{t.proj2Label}</p>
              <h3 className="text-2xl md:text-3xl font-serif font-black mb-2">{t.proj2Title}</h3>
              <p className="text-xs font-bold uppercase tracking-wider mb-4 text-[#CA8A04]">{t.proj2Cat}</p>
              <p className="text-sm text-ink/70 font-medium leading-relaxed">{t.proj2Desc}</p>
              <div className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs"><BookOpen className="w-4 h-4" />{t.vibeCodingView}</div>
                <span className="text-[10px] font-bold text-[#185FA5]">{t.proj2Status}</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} onClick={() => setShowVibe3(true)} className="group cursor-pointer p-8 rounded-2xl border-2 border-ink bg-[#F0F4FF] retro-card-hover">
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-paper border border-ink rounded-xl shadow-[3px_3px_0_rgba(45,45,45,1)] group-hover:rotate-6 transition-transform text-[#3B4FBF]"><Zap className="w-8 h-8" /></div>
                <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </div>
              <p className="text-[9px] font-black uppercase tracking-widest text-[#3B4FBF] mb-1">{t.proj3Label}</p>
              <h3 className="text-2xl md:text-3xl font-serif font-black mb-2">{t.proj3Title}</h3>
              <p className="text-xs font-bold uppercase tracking-wider mb-4 text-[#3B4FBF]">{t.proj3Cat}</p>
              <p className="text-sm text-ink/70 font-medium leading-relaxed">{t.proj3Desc}</p>
              <div className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs"><BookOpen className="w-4 h-4" />{t.vibeCodingView}</div>
                <span className="text-[10px] font-bold text-[#3B4FBF]">{t.proj3Status}</span>
              </div>
            </motion.div>
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
      <AnimatePresence>
        {showVibe1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-ink/60 backdrop-blur-md" onClick={() => setShowVibe1(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-paper w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-ink shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowVibe1(false)} className="absolute top-6 right-6 z-10 p-2 bg-paper border border-ink rounded-full hover:bg-ink hover:text-paper transition-all"><X className="w-6 h-6" /></button>
              <ModalVibe1 lang={lang} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showVibe2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-ink/60 backdrop-blur-md" onClick={() => setShowVibe2(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-paper w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-ink shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowVibe2(false)} className="absolute top-6 right-6 z-10 p-2 bg-paper border border-ink rounded-full hover:bg-ink hover:text-paper transition-all"><X className="w-6 h-6" /></button>
              <ModalVibe2 lang={lang} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showVibe3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-ink/60 backdrop-blur-md" onClick={() => setShowVibe3(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-paper w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-ink shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowVibe3(false)} className="absolute top-6 right-6 z-10 p-2 bg-paper border border-ink rounded-full hover:bg-ink hover:text-paper transition-all"><X className="w-6 h-6" /></button>
              <ModalVibe3 lang={lang} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
