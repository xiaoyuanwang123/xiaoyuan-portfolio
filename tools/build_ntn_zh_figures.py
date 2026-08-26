from pathlib import Path
import csv
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.font_manager import FontProperties
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT.parent / "0822最终冲刺/04_测试数据/ntn_all_sessions_2026-08-22T13-37-16-599Z_formal-only_13P_3E_enriched.csv"
OUT = ROOT / "public"
FONT_PATH = "/System/Library/Fonts/STHeiti Medium.ttc"
FONT = FontProperties(fname=FONT_PATH)
INK, MUTED, CREAM, LINE = "#252525", "#6F6A63", "#FBF8F1", "#D9D0C4"
TEAL, PURPLE, GOLD, RED = "#21867D", "#6B4BB5", "#B87512", "#A74B3F"
TL, PL, GL, RL = "#E6F2F0", "#F0EBFA", "#FBF1DC", "#FAEEEB"

plt.rcParams.update({"axes.unicode_minus": False, "text.color": INK, "axes.labelcolor": INK, "xtick.color": INK, "ytick.color": INK})

def txt(ax, x, y, s, **kwargs):
    kwargs.setdefault("fontproperties", FONT)
    return ax.text(x, y, s, **kwargs)

def box(ax, x, y, w, h, title, body, edge, fill, fs=8):
    ax.add_patch(FancyBboxPatch((x, y), w, h, boxstyle="round,pad=.012,rounding_size=.018", fc=fill, ec=edge, lw=1.4))
    txt(ax, x + .018, y + h - .03, title, weight="bold", fontsize=fs + 1, color=edge, va="top")
    txt(ax, x + .018, y + h - .066, body, fontsize=fs, va="top", linespacing=1.2)

def arrow(ax, a, b, color=LINE):
    ax.add_patch(FancyArrowPatch(a, b, arrowstyle="-|>", mutation_scale=13, lw=1.25, color=color))

def finish(fig, name):
    fig.savefig(OUT / name, dpi=220, bbox_inches="tight", facecolor=CREAM)
    plt.close(fig)

# Final interaction architecture - Chinese counterpart of the English thesis figure.
fig, ax = plt.subplots(figsize=(11.2, 6.7), facecolor=CREAM)
ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")
txt(ax, .04, .94, "NTN 最终交互架构", fontsize=20, weight="bold")
txt(ax, .04, .905, "由参与者测试与专家评审共同塑造的有限边界对话系统", fontsize=9.5, color=MUTED)
ys = [.74, .56, .38, .20]
box(ax, .05, ys[0], .90, .12, "1  自然对话", "读取当前需要 → 直接回应具体请求 → 简短承接情绪 → 避免重复追问", TEAL, TL, 9)
box(ax, .05, ys[1], .90, .12, "2  条件式模式识别", "综合多轮信号 → 停止低信息确认循环 → 区分同次停留与跨时间返回", GOLD, GL, 9)
box(ax, .05, ys[2], .90, .12, "3  反思与用户选择", "提供柔和、非诊断的 Mirror → 接受、纠正、跳过或关闭 → 由用户选择下一方向", PURPLE, PL, 9)
box(ax, .05, ys[3], .90, .12, "4  跨时间回顾", "汇总可追溯的关注线索与用户选择 → 说明证据来源 → 允许纠正与删除", TEAL, TL, 9)
for y1, y2 in zip(ys, ys[1:]): arrow(ax, (.5, y1), (.5, y2 + .12))
txt(ax, .05, .14, "贯穿系统的边界", fontsize=9.5, weight="bold", color=RED)
for i, label in enumerate(["边界只说明一次", "最少必要记忆", "低置信度回退", "不诊断、不评分", "现实支持与安全路线"]):
    x = .05 + i * .184
    ax.add_patch(FancyBboxPatch((x, .065), .17, .052, boxstyle="round,pad=.008,rounding_size=.012", fc=RL, ec=RED, lw=1))
    txt(ax, x + .085, .091, label, ha="center", va="center", fontsize=7.4, color=RED, weight="bold")
txt(ax, .05, .025, "概念设计逻辑；当前阈值仍是原型假设，而非经过临床验证的规则。", fontsize=7.8, color=MUTED)
finish(fig, "ntn-v5-interaction-architecture-zh.png")

# Final conversational response pathway.
fig, ax = plt.subplots(figsize=(12.4, 7.1), facecolor=CREAM)
ax.set_xlim(0, 1); ax.set_ylim(0, 1); ax.axis("off")
txt(ax, .035, .95, "NTN 最终对话回应链路", fontsize=19, weight="bold")
txt(ax, .035, .915, "以可观察的对话信号匹配适度支持，并由用户选择关闭每条分支", fontsize=9.5, color=MUTED)
txt(ax, .04, .855, "01｜先判断当前需要，再判断是否具备反思证据", fontsize=11.5, weight="bold")
for x, title, body, color, fill in [(.04,"用户输入","当前消息\n近期语境\n已知信息",TEAL,TL),(.27,"是否为具体请求？","若是，先直接回答；\n不要转向情绪追问。",TEAL,TL),(.53,"读取当前需要","简短承接；使用综合证据，\n不依据单个词或单轮。",GOLD,GL),(.79,"继续对话","自然交流；只有证据充分\n才进入 Mirror 判断。",TEAL,TL)]: box(ax,x,.65,.17 if x in (.04,.79) else .20,.13,title,body,color,fill)
for a,b in [((.21,.715),(.27,.715)),((.47,.715),(.53,.715)),((.73,.715),(.79,.715))]: arrow(ax,a,b,TEAL)
txt(ax, .04, .565, "02｜Mirror 之后归还控制权，并明确关闭状态", fontsize=11.5, weight="bold")
for x, title, body, color, fill in [(.04,"出现 Mirror","可纠正的观察\n不诊断、不评分\n可跳过或关闭",GOLD,GL),(.27,"用户回应","接受、纠正或拒绝；\n简短确认后停止继续解释。",PURPLE,PL),(.53,"用户控制的转向","继续探索／获得鼓励\n选择一个小步骤\n走出聊天",PURPLE,PL),(.79,"状态关闭","只记录一次；返回对话；\n不重复展示卡片。",TEAL,TL)]: box(ax,x,.37,.17 if x in (.04,.79) else .20,.13,title,body,color,fill)
for a,b in [((.21,.435),(.27,.435)),((.47,.435),(.53,.435)),((.73,.435),(.79,.435))]: arrow(ax,a,b,PURPLE)
txt(ax, .04, .285, "03｜跨会话信息不确定时的安全回退", fontsize=11.5, weight="bold")
box(ax,.04,.105,.27,.115,"低置信度或状态冲突","存储状态与当前状态冲突、\n语境不完整或权限不确定。",RED,RL)
box(ax,.365,.105,.27,.115,"降低推断等级","停止跨会话推断；\n使用无记忆回应；只询问必要信息。",GOLD,GL)
box(ax,.69,.105,.27,.115,"归还选择","简短说明；允许纠正、删除、\n寻求人类支持或继续普通对话。",TEAL,TL)
for a,b in [((.31,.162),(.365,.162)),((.635,.162),(.69,.162))]: arrow(ax,a,b,RED)
finish(fig, "ntn-v5-response-pathway-zh.png")

# Evaluation charts from the same formal CSV used by the thesis figures.
rows = list(csv.DictReader(open(DATA, encoding="utf-8-sig", newline="")))
participants = [r for r in rows if not r["expertRole"]]
experts = [r for r in rows if r["expertRole"]]
metrics = [("清晰度","ratingClarity"),("时机","ratingTiming"),("语气","ratingTone"),("有用性","ratingUsefulness"),("两类 Mirror 区分度","ratingDistinguishability"),("推断透明度","ratingInferenceTransparency"),("压缩测试时机","ratingCompressedTiming"),("周度回顾","ratingWeeklyReport")]
counts = np.array([[sum(int(r[k]) == s for r in participants if r[k]) for s in range(1,6)] for _, k in metrics]); shares = counts / 13 * 100
fig, ax = plt.subplots(figsize=(8.4,5.2), facecolor=CREAM); ax.set_facecolor(CREAM)
left=np.zeros(len(metrics)); colors=["#C48A22","#E3BF72","#D9D4CC","#B9A7DF",TEAL]
for j,s in enumerate(range(1,6)):
    ax.barh(range(len(metrics)),shares[:,j],left=left,color=colors[j],edgecolor=CREAM,height=.64,label=str(s))
    for i,v in enumerate(shares[:,j]):
        if v>=14: txt(ax,left[i]+v/2,i,str(counts[i,j]),ha="center",va="center",fontsize=8)
    left += shares[:,j]
ax.set_yticks(range(len(metrics)), [m[0] for m in metrics], fontproperties=FONT); ax.invert_yaxis(); ax.set_xlim(0,100)
ax.set_xlabel("参与者评分占比（%）", fontproperties=FONT); ax.set_title("参与者评分分布",loc="left",pad=25,fontproperties=FONT,fontsize=14,weight="bold")
txt(ax,0,1.02,"正式参与者会话，n=13；色块内数字为回应人数",transform=ax.transAxes,color=MUTED,fontsize=9)
ax.legend(ncol=5,frameon=False,loc="lower center",bbox_to_anchor=(.5,-.24),prop=FONT); ax.grid(axis="x",color=LINE,lw=.6)
for s in ax.spines.values(): s.set_visible(False)
finish(fig,"ntn-participant-evaluation-zh.png")

expert_metrics=[("逻辑一致性","expertLogicCoherence"),("回应路由","expertResponseRouting"),("可实施性","expertFeasibility"),("风险控制","expertRiskControl"),("评估有效性","expertEvaluationValidity")]
roles={"ai-security":("AI 安全",TEAL),"ai-product":("AI 产品",GOLD),"psychology":("心理学",PURPLE)}
fig,ax=plt.subplots(figsize=(8.4,4.7),facecolor=CREAM); ax.set_facecolor(CREAM); y=np.arange(len(expert_metrics))
for off,r in zip([-.18,0,.18],experts):
    label,color=roles[r["expertRole"]]; ax.scatter([int(r[k]) for _,k in expert_metrics],y+off,s=80,color=color,edgecolor=CREAM,lw=1,label=label,zorder=3)
ax.set_yticks(y,[x[0] for x in expert_metrics],fontproperties=FONT); ax.invert_yaxis(); ax.set_xlim(.8,5.2); ax.set_xticks(range(1,6)); ax.set_xlabel("专家评分（1–5）",fontproperties=FONT)
ax.set_title("不同领域的专家评估",loc="left",pad=25,fontproperties=FONT,fontsize=14,weight="bold"); txt(ax,0,1.02,"三位专家评审；圆点保留个体判断",transform=ax.transAxes,color=MUTED,fontsize=9)
ax.grid(axis="x",color=LINE,lw=.7); ax.legend(frameon=False,ncol=3,loc="lower center",bbox_to_anchor=(.5,-.27),prop=FONT)
for s in ax.spines.values(): s.set_visible(False)
finish(fig,"ntn-expert-evaluation-zh.png")

# Full Chinese participant evidence figure matching the English unified layout.
fig = plt.figure(figsize=(12.8, 7.8), facecolor=CREAM)
ax = fig.add_axes([.11, .54, .84, .34]); ax.set_facecolor(CREAM)
left=np.zeros(len(metrics)); unified_colors=["#B65337","#E2A94C","#D5D9DC","#9B91C2",TEAL]
for j,s in enumerate(range(1,6)):
    ax.barh(range(len(metrics)),shares[:,j],left=left,color=unified_colors[j],edgecolor=CREAM,height=.62,label=str(s))
    for i,v in enumerate(shares[:,j]):
        if v>=14: txt(ax,left[i]+v/2,i,str(counts[i,j]),ha="center",va="center",fontsize=8)
    left += shares[:,j]
ax.set_yticks(range(len(metrics)),[m[0] for m in metrics],fontproperties=FONT); ax.invert_yaxis(); ax.set_xlim(0,100)
ax.set_xlabel("参与者评分占比（%）",fontproperties=FONT); ax.grid(axis="x",color=LINE,lw=.6); ax.set_axisbelow(True)
ax.legend(ncol=5,frameon=False,loc="upper right",bbox_to_anchor=(1.0,1.18),prop=FONT)
for s in ax.spines.values(): s.set_visible(False)
txt(fig.axes[0],-.035,1.27,"参与者评估如何转化为 V5 条件式设计决策",transform=ax.transAxes,fontsize=17,weight="bold")
txt(ax,-.035,1.15,"正式参与者会话，n=13；色块内数字为回应人数",transform=ax.transAxes,fontsize=9,color=MUTED)
bottom=fig.add_axes([.08,.06,.87,.40]); bottom.set_xlim(0,1); bottom.set_ylim(0,1); bottom.axis("off")
txt(bottom,.04,.95,"相互对照的定性证据",fontsize=11.5,weight="bold"); txt(bottom,.57,.95,"设计回应",fontsize=11.5,weight="bold")
participant_rows=[
    ("渐进式探索被认为有价值","P02、P07 与 P12 重视先被倾听，再进入引导。","保留探索，但由用户选择","仅在用户选择“继续想一想”时展开。",TEAL,TL),
    ("过深或重复追问会形成压力","P06、P08、P10 与 P13 反馈打断、过度解释或深度过高。","增加用户控制的停止规则","低信息回应后提供“只听听／暂停”，不继续追问。",RED,RL),
    ("具体行动最容易转化","小步骤支持与直接学业帮助被反复认可。","优先提供适度的任务支持","先回答具体请求，并保留“小步骤”作为独立方向。",GOLD,GL),
    ("部分分支缺少完成感","参与者指出流程碎片化、卡片重复与结束不清。","明确关闭并返回普通对话","每条路线只记录一次，显示继续／切换动作后返回聊天。",PURPLE,PL),
]
for i,(lt,lb,rt,rb,color,fill) in enumerate(participant_rows):
    y=.77-i*.205
    box(bottom,.04,y,.37,.14,lt,lb,color,fill,7.2); box(bottom,.57,y,.36,.14,rt,rb,color,fill,7.2); arrow(bottom,(.41,y+.07),(.57,y+.07),color)
finish(fig,"ntn-participant-evaluation-zh.png")

# Full Chinese expert evidence figure with exact ratings, radar profiles, review emphasis and synthesis.
fig=plt.figure(figsize=(12.8,8.1),facecolor=CREAM)
txt(fig.add_axes([0,0,1,1],frameon=False),.03,.965,"互补专家证据如何转化为 V5 安全机制",fontsize=18,weight="bold")
fig.axes[0].axis("off"); txt(fig.axes[0],.03,.935,"三个领域评审；左侧保留精确评分，右侧比较不同专业判断轮廓",fontsize=9,color=MUTED)
left_ax=fig.add_axes([.12,.53,.47,.30]); left_ax.set_facecolor(CREAM); y=np.arange(len(expert_metrics))
role_styles={"ai-security":("AI 安全",TEAL,"o","-"),"ai-product":("AI 产品",GOLD,"s","--"),"psychology":("心理学",PURPLE,"^",":")}
for off,r in zip([-.17,0,.17],experts):
    label,color,marker,_=role_styles[r["expertRole"]]; left_ax.scatter([int(r[k]) for _,k in expert_metrics],y+off,s=70,color=color,edgecolor=CREAM,lw=1,label=label,zorder=3,marker=marker)
left_ax.set_yticks(y,[x[0] for x in expert_metrics],fontproperties=FONT); left_ax.invert_yaxis(); left_ax.set_xlim(.8,5.2); left_ax.set_xticks(range(1,6)); left_ax.set_xlabel("专家评分（1–5）",fontproperties=FONT); left_ax.grid(axis="x",color=LINE,lw=.6)
left_ax.set_title("专家个体评分",loc="left",fontproperties=FONT,fontsize=12,weight="bold",pad=10); left_ax.legend(frameon=False,loc="upper left",prop=FONT)
for s in left_ax.spines.values(): s.set_visible(False)
rad=fig.add_axes([.69,.51,.24,.34],polar=True); angles=np.linspace(0,2*np.pi,len(expert_metrics),endpoint=False).tolist(); angles+=angles[:1]
for r in experts:
    label,color,marker,ls=role_styles[r["expertRole"]]; vals=[int(r[k]) for _,k in expert_metrics]; vals+=vals[:1]; rad.plot(angles,vals,color=color,lw=1.6,ls=ls,marker=marker,ms=4)
rad.set_xticks(angles[:-1],["逻辑","路由","可实施性","风险","有效性"],fontproperties=FONT,fontsize=8); rad.set_yticks([2,3,4,5],["2","3","4","5"],fontsize=7); rad.set_ylim(1,5); rad.grid(color=LINE,lw=.6); rad.set_title("专业判断轮廓比较",fontproperties=FONT,fontsize=12,weight="bold",pad=14)
cards=fig.add_axes([.04,.17,.92,.28]); cards.set_xlim(0,1); cards.set_ylim(0,1); cards.axis("off")
expert_cards=[
    ("AI 安全｜审查重点","优势：延迟、可选的干预。\n风险：状态陈旧、语境不完整与记忆冲突。\n\n反馈 → 设计策略\n→ 最少必要记忆\n→ 允许纠正／删除\n→ 低置信度时无记忆回退",TEAL,TL),
    ("AI 产品｜审查重点","优势：可选模式与现实支持。\n风险：具体帮助不足、语境丢失和关闭不完整。\n\n反馈 → 设计策略\n→ 直接回答任务请求\n→ 保留相关语境\n→ 简短关闭并返回",GOLD,GL),
    ("心理学｜审查重点","优势：渐进探索与小步骤行动。\n风险：测试负担、未完成分支和严重困扰情境。\n\n反馈 → 设计策略\n→ 用户控制节奏\n→ 可见的暂停／切换\n→ 独立安全支持路线",PURPLE,PL),
]
for i,(title,body,color,fill) in enumerate(expert_cards): box(cards,.01+i*.335,.05,.30,.86,title,body,color,fill,7.3)
synth=fig.add_axes([.04,.025,.92,.105]); synth.set_xlim(0,1); synth.set_ylim(0,1); synth.axis("off")
synth.add_patch(FancyBboxPatch((0,0),1,1,boxstyle="round,pad=.012,rounding_size=.018",fc="#FFF9F7",ec=RED,lw=1.4))
txt(synth,.02,.78,"跨专家综合",weight="bold",fontsize=8.5,color=RED,va="top")
txt(synth,.02,.48,"专家认为该机制作为研究原型具有一致性与可实施性。共同优先级是条件式提供：在用户愿意时保留探索；形成压力时停止；语境不可靠时降低跨会话推断；并始终保留现实支持路线。",fontsize=7.4,va="top")
finish(fig,"ntn-expert-evaluation-zh.png")
