const questions = [
    {
        target: "当你的投资组合在一个月内下跌了 20%，你的第一反应是？",
        options: [
            { text: "非常恐慌，立刻减仓止损", score: 1 },
            { text: "有点焦虑，但会继续观察", score: 3 },
            { text: "觉得是加仓的好机会，准备逢低布局", score: 5 }
        ]
    },
    {
        target: "你目前用于投资的资金，预计多久之后需要用到？",
        options: [
            { text: "1 年内随时可能要用", score: 1 },
            { text: "1 到 3 年内可能会用", score: 3 },
            { text: "5 年以上基本不会动用", score: 5 }
        ]
    },
    {
        target: "如果你有 10 万元投资一年，哪种结果更容易让你安心？",
        options: [
            { text: "最高赚到 10.5 万，最差保本不亏", score: 1 },
            { text: "最高赚到 11.5 万，最差剩下 9.5 万", score: 3 },
            { text: "最高赚到 14 万，最差剩下 7.5 万", score: 5 }
        ]
    },
    {
        target: "对于投资目标，你更看重哪一点？",
        options: [
            { text: "本金尽量安全，能跑赢通胀就可以", score: 1 },
            { text: "收益和风险平衡，稳步增值最重要", score: 3 },
            { text: "愿意承受较大波动，追求更高回报", score: 5 }
        ]
    },
    {
        target: "你对投资理财知识的了解程度更接近哪一种？",
        options: [
            { text: "完全是新手，很少接触", score: 1 },
            { text: "知道基础概念，也买过一些基金", score: 3 },
            { text: "经验比较多，有自己的分析框架", score: 5 }
        ]
    },
    {
        target: "如果你买入的基金连续 6 个月收益都不理想，你会怎么做？",
        options: [
            { text: "尽快卖掉，不想再忍受波动", score: 1 },
            { text: "先复盘原因，再决定是否继续持有", score: 3 },
            { text: "只要逻辑没变，就继续定投甚至补仓", score: 5 }
        ]
    },
    {
        target: "用于投资的这笔钱，占你家庭流动资产的大概比例是？",
        options: [
            { text: "比例比较高，一旦亏损会影响生活安排", score: 1 },
            { text: "占比适中，亏了会难受但不至于伤筋动骨", score: 3 },
            { text: "占比不高，属于明确的长期闲钱", score: 5 }
        ]
    },
    {
        target: "看到朋友推荐一只近期涨得很猛的热门基金，你更可能怎么做？",
        options: [
            { text: "先回避，热门波动太大让我不舒服", score: 1 },
            { text: "先研究一下，不会因为热度立刻买入", score: 3 },
            { text: "如果趋势强，我愿意拿一部分仓位尝试", score: 5 }
        ]
    },
    {
        target: "下面哪类投资方式更符合你的长期习惯？",
        options: [
            { text: "存款、货币基金、短债这类低波动产品", score: 1 },
            { text: "股债搭配、指数基金定投这类均衡配置", score: 3 },
            { text: "高弹性行业基金、股票或主题机会", score: 5 }
        ]
    },
    {
        target: "如果一项长期年化回报更高，但期间可能出现 25% 的回撤，你会怎么看？",
        options: [
            { text: "很难接受，我更希望波动尽量小", score: 1 },
            { text: "可以接受，但前提是仓位和节奏可控", score: 3 },
            { text: "能接受，只要长期回报足够有吸引力", score: 5 }
        ]
    }
];

const profiles = {
    conservative: {
        icon: '🛡️',
        title: '保守型投资者',
        description: '你非常看重本金安全，宁愿收益低一些，也不愿承担明显的账面亏损。你的配置更适合以低波动资产为主，先建立安全感，再逐步提高收益弹性。',
        insight: '真正适合你的，不是看起来最刺激的机会，而是你能长期拿得住、睡得着的配置。',
        chartNote: '这是一份偏稳的参考配置，目标是先把底仓、备用金和纪律搭起来，再慢慢提升收益弹性。',
        chart: {
            labels: ['货币基金/存款', '债券基金/稳健理财', '宽基指数基金', '黄金'],
            data: [35, 35, 20, 10],
            colors: ['#94a3b8', '#38bdf8', '#fbbf24', '#f59e0b']
        },
        focusPoints: [
            '先把 6 到 12 个月生活备用金和投资资金分开，减少投资时的心理压力。',
            '从货基、短债、一级债这类低波动资产开始建立底仓，不要一上来就满仓权益。',
            '先用小仓位尝试指数定投，练习纪律和节奏，再决定是否增加权益比例。'
        ],
        learnLinks: [
            {
                eyebrow: '先避坑',
                title: '新手避坑指南',
                description: '先把追涨杀跌、频繁交易和情绪化止损这些问题避开。',
                href: 'mistakes.html'
            },
            {
                eyebrow: '补基础',
                title: '债券投资入门',
                description: '保守型配置离不开债券和稳健资产，先把底仓逻辑看明白。',
                href: 'category.html?id=bond'
            },
            {
                eyebrow: '看术语',
                title: '投资术语表',
                description: '先搞懂回撤、波动、宽基和定投这些高频词，再做判断会更稳。',
                href: 'glossary.html'
            }
        ],
        toolLinks: [
            {
                eyebrow: '先量化',
                title: '复利计算器',
                description: '看清长期慢慢滚出来的差距，适合先建立收益预期。',
                href: 'calculator.html'
            },
            {
                eyebrow: '先规划',
                title: '定投计划器',
                description: '用目标金额反推每月投入，找到自己能坚持的节奏。',
                href: 'dca-planner.html'
            },
            {
                eyebrow: '防忽视',
                title: '通胀计算器',
                description: '理解“只求不亏”也可能输给通胀，帮助你接受合理波动。',
                href: 'calc-inflation.html'
            }
        ],
        groupTopics: [
            '闲钱、备用金和投资金该怎么分，才不会一跌就慌。',
            '低波动底仓该怎么搭，哪些产品更适合新手起步。',
            '什么时候可以从纯保守，慢慢过渡到稳健配置。'
        ],
        cta: {
            badge: '🛡️ 适合先求稳',
            title: '加群，把保守配置做成能长期执行的计划',
            description: '如果你更在意本金安全，群里适合聊闲钱比例、低波动底仓和定投起步节奏。扫码加微信，备注「基金群」即可。',
            hint: '加好友后备注「基金群」，我会按你的风格给你建议'
        }
    },
    balanced: {
        icon: '⚖️',
        title: '稳健型投资者',
        description: '你希望在收益和风险之间找到平衡，愿意承受适度波动来换取长期增值。股债搭配、分散配置和稳定的定投节奏会更适合你。',
        insight: '你的优势不是一把梭，而是愿意用时间换空间。把节奏守住，复利才有机会真正跑出来。',
        chartNote: '这是一份偏均衡的参考配置，核心是股债搭配和分散持有，避免被短期情绪牵着走。',
        chart: {
            labels: ['债券基金', '宽基指数基金', '货币基金备用', '黄金'],
            data: [35, 40, 15, 10],
            colors: ['#38bdf8', '#f43f5e', '#94a3b8', '#f59e0b']
        },
        focusPoints: [
            '先明确自己的长期目标，是为资产增值、买房储备，还是退休准备，不同目标决定不同节奏。',
            '把宽基指数和债券基金作为主仓，减少对热点主题和短期消息的依赖。',
            '固定好每月定投日和复盘频率，让执行比情绪更重要。'
        ],
        learnLinks: [
            {
                eyebrow: '先搭框架',
                title: '国内基金入门',
                description: '如果你想做稳健配置，基金分类、选基逻辑和定投节奏是核心。',
                href: 'category.html?id=fund'
            },
            {
                eyebrow: '补底仓',
                title: '债券投资入门',
                description: '债券不是“没意思”，而是帮你把组合波动拉回可承受区间。',
                href: 'category.html?id=bond'
            },
            {
                eyebrow: '避常错',
                title: '新手避坑指南',
                description: '稳健型最怕因为短期回撤打乱长期计划，这页很值得反复看。',
                href: 'mistakes.html'
            }
        ],
        toolLinks: [
            {
                eyebrow: '做计划',
                title: '定投计划器',
                description: '根据目标金额和年化预期，反推适合自己的每月投入。',
                href: 'dca-planner.html'
            },
            {
                eyebrow: '做测算',
                title: '定投计算器',
                description: '模拟不同周期和收益率下，长期定投大概能走到哪里。',
                href: 'calc-dca.html'
            },
            {
                eyebrow: '看长期',
                title: '复利计算器',
                description: '把“慢慢变富”具象化，更容易坚持自己的中长期节奏。',
                href: 'calc-compound.html'
            }
        ],
        groupTopics: [
            '宽基指数和债基该怎么搭，比例怎么调才适合自己。',
            '定投应该周投、月投还是分批加仓，怎样更容易坚持。',
            '遇到回撤时怎么复盘，而不是一着急就把计划打乱。'
        ],
        cta: {
            badge: '⚖️ 适合长期配置',
            title: '加群，把稳健思路变成真正跑得久的策略',
            description: '你这类风格最适合讨论股债配比、定投节奏和长期复盘。群里能帮你把“知道该怎么做”慢慢变成“真的做得到”。扫码加微信，备注「基金群」即可。',
            hint: '加好友后备注「基金群」，我会按你的风格给你建议'
        }
    },
    aggressive: {
        icon: '🚀',
        title: '进取型投资者',
        description: '你有较强的风险承受能力，愿意为了更高回报接受更大的阶段性波动。更适合以权益类资产为核心，但仍要注意仓位管理和长期纪律。',
        insight: '能承受波动是一种优势，但真正拉开差距的不是冲得快，而是高波动里也能保持长期章法。',
        chartNote: '这是一份偏权益的参考配置，会把增长资产放在核心位，同时保留缓冲仓，避免在剧烈波动时被情绪带偏。',
        chart: {
            labels: ['宽基股票基金', '行业/主题基金', '债券/现金缓冲', '高风险尝试仓位'],
            data: [45, 25, 20, 10],
            colors: ['#f43f5e', '#f472b6', '#38bdf8', '#8b5cf6']
        },
        focusPoints: [
            '把核心仓和尝试仓分开，避免因为热点情绪把长期仓位也一起带偏。',
            '提前写下最大回撤能接受到哪里，别等跌下来时再临时决定去留。',
            '优先做自己看得懂、能长期跟踪的权益资产，不要把“进取”做成“冲动”。'
        ],
        learnLinks: [
            {
                eyebrow: '看主线',
                title: '标普 500 投资入门',
                description: '进取风格不等于瞎冲，先把长期优秀权益资产的核心逻辑看明白。',
                href: 'category.html?id=sp500'
            },
            {
                eyebrow: '看成长',
                title: '纳斯达克投资入门',
                description: '高成长伴随高波动，更适合放在你真正看得懂的一部分仓位里。',
                href: 'category.html?id=nasdaq'
            },
            {
                eyebrow: '防踩坑',
                title: '新手避坑指南',
                description: '进取型最容易在追热点和频繁交易上翻车，这页一定要反复看。',
                href: 'mistakes.html'
            }
        ],
        toolLinks: [
            {
                eyebrow: '看长期',
                title: '复利计算器',
                description: '把长期收益目标、收益率假设和时间成本一起看清楚。',
                href: 'calc-compound.html'
            },
            {
                eyebrow: '做约束',
                title: '定投计划器',
                description: '用固定计划给高波动资产加纪律，避免情绪化 All in。',
                href: 'dca-planner.html'
            },
            {
                eyebrow: '练节奏',
                title: '定投计算器',
                description: '模拟分批入场和长期持有，避免把所有判断押在单次择时上。',
                href: 'calc-dca.html'
            }
        ],
        groupTopics: [
            '高波动资产里，核心仓和试错仓应该怎么分。',
            '出现大回撤时，什么时候该扛、什么时候该减仓。',
            '怎样把进取风格做成有纪律的长期策略，而不是只追短期刺激。'
        ],
        cta: {
            badge: '🚀 高波动也要有纪律',
            title: '加群，把进取风格变成有章法的长期策略',
            description: '你适合聊仓位纪律、权益配置和回撤管理。群里更适合把“敢承担波动”进一步变成“扛得住波动、拿得住主线”。扫码加微信，备注「基金群」即可。',
            hint: '加好友后备注「基金群」，我会按你的风格给你建议'
        }
    }
};

let currentQuestion = 0;
let totalScore = 0;
let chartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    renderQuestion();
});

function renderQuestion() {
    const quizArea = document.getElementById('quizArea');
    const q = questions[currentQuestion];

    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progressPercent}%`;
    document.getElementById('quizLabel').textContent = `题目 ${currentQuestion + 1} / ${questions.length}`;

    let html = `<div class="question-card active">
      <h3 class="question-title">${currentQuestion + 1}. ${q.target}</h3>
      <div class="option-list">`;

    q.options.forEach((opt, idx) => {
        html += `<button class="option-btn" onclick="selectOption(${opt.score})">
                  <span style="font-weight:bold; color:var(--accent-gold); width:24px;">${String.fromCharCode(65 + idx)}.</span>
                  ${opt.text}
               </button>`;
    });

    html += '</div></div>';
    quizArea.innerHTML = html;
}

window.selectOption = function (score) {
    totalScore += score;
    currentQuestion += 1;

    if (currentQuestion < questions.length) {
        renderQuestion();
        return;
    }

    document.getElementById('progressFill').style.width = '100%';
    document.getElementById('quizLabel').textContent = '测试完成';
    showResult();
};

function getProfile() {
    const averageScore = totalScore / questions.length;

    if (averageScore <= 2.2) {
        return profiles.conservative;
    }

    if (averageScore <= 3.6) {
        return profiles.balanced;
    }

    return profiles.aggressive;
}

function showResult() {
    const profile = getProfile();
    document.getElementById('quizArea').style.display = 'none';

    const resultArea = document.getElementById('resultArea');
    resultArea.classList.add('active');

    document.getElementById('resultIcon').textContent = profile.icon;
    document.getElementById('resultType').textContent = profile.title;
    document.getElementById('resultDesc').textContent = profile.description;
    document.getElementById('resultInsight').textContent = profile.insight;
    document.getElementById('resultChartNote').textContent = profile.chartNote;
    document.getElementById('resultCtaBadge').textContent = profile.cta.badge;
    document.getElementById('resultCtaTitle').textContent = profile.cta.title;
    document.getElementById('resultCtaDesc').textContent = profile.cta.description;
    document.getElementById('resultCtaHint').textContent = profile.cta.hint;

    renderFocusPoints(profile.focusPoints);
    renderLinkCards('learnLinks', profile.learnLinks);
    renderLinkCards('toolLinks', profile.toolLinks);
    renderTopicItems(profile.groupTopics);
    renderAllocationChart(profile.chart.labels, profile.chart.data, profile.chart.colors);

    window.requestAnimationFrame(() => {
        resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

function renderFocusPoints(items) {
    document.getElementById('focusPoints').innerHTML = items
        .map((item) => `<li>${item}</li>`)
        .join('');
}

function renderLinkCards(containerId, items) {
    document.getElementById(containerId).innerHTML = items
        .map((item) => `
            <a class="result-link-card" href="${item.href}">
                <div class="result-link-meta">${item.eyebrow}</div>
                <div class="result-link-title">${item.title}</div>
                <div class="result-link-desc">${item.description}</div>
            </a>
        `)
        .join('');
}

function renderTopicItems(items) {
    document.getElementById('groupTopic').innerHTML = items
        .map((item) => `<div class="result-topic-item">${item}</div>`)
        .join('');
}

function renderAllocationChart(labels, dataArray, bgColors) {
    const ctx = document.getElementById('allocationChart').getContext('2d');

    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data: dataArray,
                backgroundColor: bgColors,
                borderColor: 'rgba(15, 23, 42, 1)',
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '50%',
            plugins: {
                legend: {
                    position: window.innerWidth < 760 ? 'bottom' : 'right',
                    labels: {
                        color: '#e2e8f0',
                        padding: 18,
                        boxWidth: 16,
                        boxHeight: 16,
                        font: {
                            size: window.innerWidth < 760 ? 11 : 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label(context) {
                            return ` ${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            }
        }
    });
}