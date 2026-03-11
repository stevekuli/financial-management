const questions = [
    {
        target: '当你的投资组合在一个月内下跌了 20%，你的第一反应是？',
        options: [
            { text: '非常恐慌，立刻减仓止损', score: 1 },
            { text: '有点焦虑，但会继续观察', score: 3 },
            { text: '觉得是加仓的好机会，准备逢低布局', score: 5 }
        ]
    },
    {
        target: '你目前用于投资的资金，预计多久之后需要用到？',
        options: [
            { text: '1 年内随时可能要用', score: 1 },
            { text: '1 到 3 年内可能会用', score: 3 },
            { text: '5 年以上基本不会动用', score: 5 }
        ]
    },
    {
        target: '如果你有 10 万元投资一年，哪种结果更容易让你安心？',
        options: [
            { text: '最高赚到 10.5 万，最差保本不亏', score: 1 },
            { text: '最高赚到 11.5 万，最差剩下 9.5 万', score: 3 },
            { text: '最高赚到 14 万，最差剩下 7.5 万', score: 5 }
        ]
    },
    {
        target: '对于投资目标，你更看重哪一点？',
        options: [
            { text: '本金尽量安全，能跑赢通胀就可以', score: 1 },
            { text: '收益和风险平衡，稳步增值最重要', score: 3 },
            { text: '愿意承受较大波动，追求更高回报', score: 5 }
        ]
    },
    {
        target: '你对投资理财知识的了解程度更接近哪一种？',
        options: [
            { text: '完全是新手，很少接触', score: 1 },
            { text: '知道基础概念，也买过一些基金', score: 3 },
            { text: '经验比较多，有自己的分析框架', score: 5 }
        ]
    },
    {
        target: '如果你买入的基金连续 6 个月收益都不理想，你会怎么做？',
        options: [
            { text: '尽快卖掉，不想再忍受波动', score: 1 },
            { text: '先复盘原因，再决定是否继续持有', score: 3 },
            { text: '只要逻辑没变，就继续定投甚至补仓', score: 5 }
        ]
    },
    {
        target: '用于投资的这笔钱，占你家庭流动资产的大概比例是？',
        options: [
            { text: '比例比较高，一旦亏损会影响生活安排', score: 1 },
            { text: '占比适中，亏了会难受但不至于伤筋动骨', score: 3 },
            { text: '占比不高，属于明确的长期闲钱', score: 5 }
        ]
    },
    {
        target: '看到朋友推荐一只近期涨得很猛的热门基金，你更可能怎么做？',
        options: [
            { text: '先回避，热门波动太大让我不舒服', score: 1 },
            { text: '先研究一下，不会因为热度立刻买入', score: 3 },
            { text: '如果趋势强，我愿意拿一部分仓位尝试', score: 5 }
        ]
    },
    {
        target: '下面哪类投资方式更符合你的长期习惯？',
        options: [
            { text: '存款、货币基金、短债这类低波动产品', score: 1 },
            { text: '股债搭配、指数基金定投这类均衡配置', score: 3 },
            { text: '高弹性行业基金、股票或主题机会', score: 5 }
        ]
    },
    {
        target: '如果一项长期年化回报更高，但期间可能出现 25% 的回撤，你会怎么看？',
        options: [
            { text: '很难接受，我更希望波动尽量小', score: 1 },
            { text: '可以接受，但前提是仓位和节奏可控', score: 3 },
            { text: '能接受，只要长期回报足够有吸引力', score: 5 }
        ]
    }
];

const profiles = {
    conservative: {
        key: 'conservative',
        icon: '🛡️',
        title: '保守型投资者',
        description: '你非常看重本金安全，宁愿收益低一些，也不愿承担明显的账面亏损。你的配置更适合以低波动资产为主。',
        insight: '真正适合你的，不是看起来最刺激的机会，而是你能长期拿得住、睡得着的配置。',
        chartNote: '核心目标是先把底仓、备用金和执行纪律搭起来，再慢慢提升收益弹性。',
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
            { eyebrow: '先避坑', title: '新手避坑指南', description: '先把追涨杀跌、频繁交易和情绪化止损这些问题避开。', href: 'mistakes.html' },
            { eyebrow: '补基础', title: '债券投资入门', description: '保守型配置离不开债券和稳健资产，先把底仓逻辑看明白。', href: 'category.html?id=bond' },
            { eyebrow: '看术语', title: '投资术语表', description: '先搞懂回撤、波动、宽基和定投这些高频词，再做判断会更稳。', href: 'glossary.html' }
        ],
        toolLinks: [
            { eyebrow: '先量化', title: '复利计算器', description: '看清长期慢慢滚出来的差距，适合先建立收益预期。', href: 'calculator.html' },
            { eyebrow: '先规划', title: '定投计划器', description: '用目标金额反推每月投入，找到自己能坚持的节奏。', href: 'dca-planner.html' },
            { eyebrow: '防忽视', title: '通胀计算器', description: '理解“只求不亏”也可能输给通胀，帮助你接受合理波动。', href: 'calc-inflation.html' }
        ],
        groupTopics: [
            '闲钱、备用金和投资金该怎么分，才不会一跌就慌。',
            '低波动底仓该怎么搭，哪些产品更适合新手起步。',
            '什么时候可以从纯保守，慢慢过渡到稳健配置。'
        ],
        cta: {
            badge: '🛡️ 先把配置稳下来',
            title: '加群，把保守思路变成可执行的计划',
            description: '你这类风格更适合继续聊闲钱比例、低波动底仓和定投起步节奏。群里会继续聊资产配置、执行纪律和新手常见问题。扫码加微信，备注「基金群」即可。',
            hint: '加好友后备注「基金群」，我会按你的测试结果继续和你聊'
        }
    },
    balanced: {
        key: 'balanced',
        icon: '⚖️',
        title: '稳健型投资者',
        description: '你希望在收益和风险之间找到平衡，愿意承受适度波动来换取长期增值。股债搭配和分散配置会更适合你。',
        insight: '你的优势不是一把梭，而是愿意用时间换空间。把节奏守住，复利才有机会真正跑出来。',
        chartNote: '核心是股债搭配和分散持有，避免被短期情绪牵着走。',
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
            { eyebrow: '先搭框架', title: '国内基金入门', description: '如果你想做稳健配置，基金分类、选基逻辑和定投节奏是核心。', href: 'category.html?id=fund' },
            { eyebrow: '补底仓', title: '债券投资入门', description: '债券不是“没意思”，而是帮你把组合波动拉回可承受区间。', href: 'category.html?id=bond' },
            { eyebrow: '避常错', title: '新手避坑指南', description: '稳健型最怕因为短期回撤打乱长期计划，这页很值得反复看。', href: 'mistakes.html' }
        ],
        toolLinks: [
            { eyebrow: '做计划', title: '定投计划器', description: '根据目标金额和年化预期，反推适合自己的每月投入。', href: 'dca-planner.html' },
            { eyebrow: '做测算', title: '定投计算器', description: '模拟不同周期和收益率下，长期定投大概能走到哪里。', href: 'calc-dca.html' },
            { eyebrow: '看长期', title: '复利计算器', description: '把“慢慢变富”具象化，更容易坚持自己的中长期节奏。', href: 'calc-compound.html' }
        ],
        groupTopics: [
            '宽基指数和债基该怎么搭，比例怎么调才适合自己。',
            '定投应该周投、月投还是分批加仓，怎样更容易坚持。',
            '遇到回撤时怎么复盘，而不是一着急就把计划打乱。'
        ],
        cta: {
            badge: '⚖️ 让配置长期跑下去',
            title: '加群，把稳健思路变成可执行的计划',
            description: '你这类风格更适合继续聊股债配比、定投节奏和长期复盘。群里会继续聊资产配置、执行纪律和新手常见问题。扫码加微信，备注「基金群」即可。',
            hint: '加好友后备注「基金群」，我会按你的测试结果继续和你聊'
        }
    },
    aggressive: {
        key: 'aggressive',
        icon: '🚀',
        title: '进取型投资者',
        description: '你有较强的风险承受能力，愿意为了更高回报接受更大的阶段性波动。更适合以权益类资产为核心，但仍要注意仓位管理。',
        insight: '能承受波动是一种优势，但真正拉开差距的不是冲得快，而是高波动里也能保持长期章法。',
        chartNote: '会把增长资产放在核心位，同时保留缓冲仓，避免在剧烈波动时被情绪带偏。',
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
            { eyebrow: '看主线', title: '标普 500 投资入门', description: '进取风格不等于瞎冲，先把长期优秀权益资产的核心逻辑看明白。', href: 'category.html?id=sp500' },
            { eyebrow: '看成长', title: '纳斯达克投资入门', description: '高成长伴随高波动，更适合放在你真正看得懂的一部分仓位里。', href: 'category.html?id=nasdaq' },
            { eyebrow: '防踩坑', title: '新手避坑指南', description: '进取型最容易在追热点和频繁交易上翻车，这页一定要反复看。', href: 'mistakes.html' }
        ],
        toolLinks: [
            { eyebrow: '看长期', title: '复利计算器', description: '把长期收益目标、收益率假设和时间成本一起看清楚。', href: 'calc-compound.html' },
            { eyebrow: '做约束', title: '定投计划器', description: '用固定计划给高波动资产加纪律，避免情绪化 All in。', href: 'dca-planner.html' },
            { eyebrow: '练节奏', title: '定投计算器', description: '模拟分批入场和长期持有，避免把所有判断押在单次择时上。', href: 'calc-dca.html' }
        ],
        groupTopics: [
            '高波动资产里，核心仓和试错仓应该怎么分。',
            '出现大回撤时，什么时候该扛、什么时候该减仓。',
            '怎样把进取风格做成有纪律的长期策略，而不是只追短期刺激。'
        ],
        cta: {
            badge: '🚀 高波动也要有章法',
            title: '加群，把进取思路变成可执行的计划',
            description: '你这类风格更适合继续聊仓位纪律、权益配置和回撤管理。群里会继续聊资产配置、执行纪律和新手常见问题。扫码加微信，备注「基金群」即可。',
            hint: '加好友后备注「基金群」，我会按你的测试结果继续和你聊'
        }
    }
};

let currentQuestion = 0;
let totalScore = 0;
let chartInstance = null;
let currentProfile = null;
let posterBusy = false;
let quizStartedTracked = false;

function trackQuizEvent(name, data = {}) {
    if (window.SiteAnalytics && typeof window.SiteAnalytics.track === 'function') {
        window.SiteAnalytics.track(name, data);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderQuestion();
});

function renderQuestion() {
    const quizArea = document.getElementById('quizArea');
    const question = questions[currentQuestion];
    const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById('progressFill').style.width = progressPercent + '%';
    document.getElementById('quizLabel').textContent = '题目 ' + (currentQuestion + 1) + ' / ' + questions.length;

    let html = '<div class="question-card active">';
    html += '<h3 class="question-title">' + (currentQuestion + 1) + '. ' + question.target + '</h3>';
    html += '<div class="option-list">';

    question.options.forEach((option, index) => {
        html += '<button class="option-btn" onclick="selectOption(' + option.score + ')">';
        html += '<span style="font-weight:bold; color:var(--accent-gold); width:24px;">' + String.fromCharCode(65 + index) + '.</span>';
        html += option.text;
        html += '</button>';
    });

    html += '</div></div>';
    quizArea.innerHTML = html;
}

window.selectOption = function (score) {
    if (!quizStartedTracked) {
        quizStartedTracked = true;
        trackQuizEvent('quiz_started', { questions: questions.length });
    }

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

window.downloadResultPoster = function () {
    return handlePosterAction('download');
};

window.shareResultPoster = function () {
    return handlePosterAction('share');
};

function getProfile() {
    const averageScore = totalScore / questions.length;
    if (averageScore <= 2.2) return profiles.conservative;
    if (averageScore <= 3.6) return profiles.balanced;
    return profiles.aggressive;
}

function showResult() {
    const profile = getProfile();
    const averageScore = Number((totalScore / questions.length).toFixed(1));
    currentProfile = profile;

    document.getElementById('quizArea').style.display = 'none';
    document.getElementById('resultArea').classList.add('active');

    document.getElementById('resultIcon').textContent = profile.icon;
    document.getElementById('resultType').textContent = profile.title;
    document.getElementById('resultDesc').textContent = profile.description;
    document.getElementById('resultInsight').textContent = profile.insight;
    document.getElementById('resultChartNote').textContent = profile.chartNote;
    document.getElementById('resultCtaBadge').textContent = profile.cta.badge;
    document.getElementById('resultCtaTitle').textContent = profile.cta.title;
    document.getElementById('resultCtaDesc').textContent = profile.cta.description;
    document.getElementById('resultCtaHint').textContent = profile.cta.hint;
    document.getElementById('shareFeedback').textContent = '保存后可以直接发给朋友、群聊或朋友圈。';

    trackQuizEvent('quiz_completed', {
        profile: profile.key,
        questions: questions.length,
        average_score: averageScore
    });

    renderFocusPoints(profile.focusPoints);
    renderLinkCards('learnLinks', profile.learnLinks);
    renderLinkCards('toolLinks', profile.toolLinks);
    renderTopicItems(profile.groupTopics);
    renderAllocationChart(profile.chart.labels, profile.chart.data, profile.chart.colors);

    window.requestAnimationFrame(() => {
        document.getElementById('resultArea').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

function renderFocusPoints(items) {
    document.getElementById('focusPoints').innerHTML = items.map((item) => '<li>' + item + '</li>').join('');
}

function renderLinkCards(containerId, items) {
    document.getElementById(containerId).innerHTML = items.map((item) => {
        return '<a class="result-link-card" href="' + item.href + '">' +
            '<div class="result-link-meta">' + item.eyebrow + '</div>' +
            '<div class="result-link-title">' + item.title + '</div>' +
            '<div class="result-link-desc">' + item.description + '</div>' +
        '</a>';
    }).join('');
}

function renderTopicItems(items) {
    document.getElementById('groupTopic').innerHTML = items.map((item) => '<div class="result-topic-item">' + item + '</div>').join('');
}

function renderAllocationChart(labels, dataArray, bgColors) {
    const ctx = document.getElementById('allocationChart').getContext('2d');
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
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
                        font: { size: window.innerWidth < 760 ? 11 : 12 }
                    }
                },
                tooltip: {
                    callbacks: {
                        label(context) {
                            return ' ' + context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

async function handlePosterAction(mode) {
    if (!currentProfile || posterBusy) return;

    posterBusy = true;
    setShareFeedback(mode === 'share' ? '正在准备分享海报...' : '正在生成海报...');

    try {
        const blob = await buildPosterBlob(currentProfile);
        const filename = '投资风格测试-' + currentProfile.title + '.png';

        if (mode === 'share') {
            const shared = await tryNativeShare(blob, filename, currentProfile);
            if (shared) {
                trackQuizEvent('quiz_poster_shared', { profile: currentProfile.key });
                setShareFeedback('已调起系统分享，可以直接发送给朋友或群聊。');
                return;
            }
        }

        downloadBlob(blob, filename);
        trackQuizEvent(mode === 'share' ? 'quiz_poster_share_fallback_download' : 'quiz_poster_downloaded', {
            profile: currentProfile.key
        });
        setShareFeedback(mode === 'share'
            ? '当前浏览器不支持系统分享，已改为下载海报。'
            : '海报已保存到下载目录，可以直接发给朋友或群聊。');
    } catch (error) {
        console.error(error);
        trackQuizEvent('quiz_poster_failed', {
            profile: currentProfile ? currentProfile.key : null,
            mode: mode
        });
        setShareFeedback('海报生成失败，请稍后重试。');
    } finally {
        posterBusy = false;
    }
}

function setShareFeedback(message) {
    const feedback = document.getElementById('shareFeedback');
    if (feedback) feedback.textContent = message;
}

async function buildPosterBlob(profile) {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    const theme = getPosterTheme(profile);
    const toolNames = profile.toolLinks.slice(0, 3).map((item) => item.title);
    const posterQrImagePath = 'assets/https___financial-management.chipniq.com_quiz.html.png';


    drawPosterBackground(ctx, canvas.width, canvas.height, theme);
    fillRoundedRect(ctx, 48, 36, 1104, 1848, 44, 'rgba(8, 14, 35, 0.9)', 'rgba(255, 255, 255, 0.08)', 2);

    ctx.textBaseline = 'top';
    ctx.textAlign = 'left';

    ctx.fillStyle = '#dbe7f6';
    ctx.font = '600 30px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillText('\uD83D\uDC8E \u7406\u8D22\u5165\u95E8\u6307\u5357', 92, 74);

    fillRoundedRect(ctx, 892, 74, 216, 48, 24, theme.stickerFill, theme.stickerBorder, 1.2);
    ctx.fillStyle = '#f8fafc';
    ctx.font = '600 20px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('\u9002\u5408\u53D1\u7ED9\u670B\u53CB\u4E00\u8D77\u6D4B', 1000, 88);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#f8fafc';
    ctx.font = '700 52px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillText(theme.headlineTop, 92, 138);

    ctx.fillStyle = theme.accent;
    ctx.font = '700 88px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillText(profile.title, 92, 208);

    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.font = '700 138px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillStyle = theme.accent;
    ctx.fillText(profile.icon, 962, 162);
    ctx.restore();

    const pillWidth = Math.ceil(ctx.measureText(theme.coverTag).width) + 46;
    fillRoundedRect(ctx, 92, 344, pillWidth, 50, 25, theme.tagFill, theme.tagBorder, 1);
    ctx.fillStyle = '#f8fafc';
    ctx.font = '600 22px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillText(theme.coverTag, 115, 357);

    ctx.fillStyle = theme.headlineColor;
    ctx.font = '700 30px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillText(theme.coverHook, 92, 412);

    ctx.fillStyle = '#d5deeb';
    ctx.font = '400 30px "Microsoft YaHei", "PingFang SC", sans-serif';
    drawWrappedText(ctx, profile.insight, 92, 462, 828, 44, '#d5deeb', 2);

    fillRoundedRect(ctx, 92, 580, 1016, 470, 34, 'rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.08)', 1.5);

    const chartCenterX = 314;
    const chartCenterY = 808;
    drawDonutChart(ctx, profile.chart, chartCenterX, chartCenterY, 122, 34);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#f8fafc';
    ctx.font = '700 30px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillText('\u6838\u5FC3\u914D\u7F6E', chartCenterX, chartCenterY - 16);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 21px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillText('\u4EC5\u4F9B\u5B66\u4E60', chartCenterX, chartCenterY + 18);
    ctx.textAlign = 'left';

    let legendY = 704;
    profile.chart.labels.forEach((label, index) => {
        fillRoundedRect(ctx, 522, legendY - 10, 486, 56, 18, 'rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.05)', 1);
        ctx.beginPath();
        ctx.fillStyle = profile.chart.colors[index];
        ctx.arc(554, legendY + 18, 9, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#eef2ff';
        ctx.font = '600 24px "Microsoft YaHei", "PingFang SC", sans-serif';
        ctx.fillText(label, 578, legendY + 4);

        ctx.fillStyle = theme.accent;
        ctx.font = '700 24px "Microsoft YaHei", "PingFang SC", sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(String(profile.chart.data[index]) + '%', 978, legendY + 4);
        ctx.textAlign = 'left';
        legendY += 68;
    });

    fillRoundedRect(ctx, 128, 978, 944, 56, 16, theme.noteFill, theme.noteBorder, 1);
    ctx.font = '400 20px "Microsoft YaHei", "PingFang SC", sans-serif';
    drawWrappedText(ctx, profile.chartNote, 152, 994, 896, 26, '#9fb0c4', 1);

    fillRoundedRect(ctx, 92, 1102, 1016, 470, 34, 'rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.08)', 1.5);
    ctx.fillStyle = '#f8fafc';
    ctx.font = '700 36px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillText('\u73B0\u5728\u5148\u505A\u8FD9 3 \u4EF6\u4E8B', 128, 1152);

    let pointY = 1242;
    profile.focusPoints.forEach((item, index) => {
        fillRoundedRect(ctx, 128, pointY - 6, 944, 86, 24, 'rgba(255, 255, 255, 0.035)', 'rgba(255, 255, 255, 0.045)', 1);
        fillRoundedRect(ctx, 148, pointY + 18, 54, 34, 17, theme.numberFill, theme.numberBorder, 1);
        ctx.fillStyle = theme.accent;
        ctx.font = '700 19px "Microsoft YaHei", "PingFang SC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('0' + String(index + 1), 175, pointY + 26);
        ctx.textAlign = 'left';

        ctx.font = '400 25px "Microsoft YaHei", "PingFang SC", sans-serif';
        drawWrappedText(ctx, item, 224, pointY + 18, 806, 32, '#dbe4f0', 2);
        pointY += 114;
    });

    fillRoundedRect(ctx, 92, 1630, 690, 150, 30, theme.toolFill, theme.toolBorder, 1.5);
    ctx.fillStyle = '#9fb0c4';
    ctx.font = '500 22px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillText('\u53EF\u4EE5\u5148\u4ECE\u8FD9\u4E9B\u5DE5\u5177\u5F00\u59CB', 128, 1660);
    drawPillList(ctx, toolNames, 128, 1700, 618, {
        fillStyle: theme.pillFill,
        strokeStyle: theme.pillBorder,
        textColor: '#f8fafc'
    });

    const qrCardX = 826;
    const qrCardY = 1588;
    const qrCardW = 282;
    const qrCardH = 224;
    fillRoundedRect(ctx, qrCardX, qrCardY, qrCardW, qrCardH, 30, 'rgba(255, 255, 255, 0.06)', 'rgba(255, 255, 255, 0.08)', 1.5);
    ctx.fillStyle = '#f8fafc';
    ctx.font = '700 28px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillText('\u626B\u7801\u505A\u6D4B\u8BD5', qrCardX + 26, qrCardY + 24);
    ctx.fillStyle = '#9fb0c4';
    ctx.font = '400 18px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.fillText('\u670B\u53CB\u626B\u4E00\u626B\uFF0C\u76F4\u63A5\u8FDB\u5165\u6D4B\u8BD5\u9875', qrCardX + 26, qrCardY + 64);

    const qrBoxX = qrCardX + 26;
    const qrBoxY = qrCardY + 94;
    const qrBoxSize = 122;
    fillRoundedRect(ctx, qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 18, '#ffffff', 'rgba(255, 255, 255, 0.14)', 1);

    try {
        const qrImage = await loadImage(posterQrImagePath);
        ctx.drawImage(qrImage, qrBoxX + 12, qrBoxY + 12, qrBoxSize - 24, qrBoxSize - 24);
    } catch (error) {
        ctx.fillStyle = '#0f172a';
        ctx.font = '700 16px "Microsoft YaHei", "PingFang SC", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('\u6253\u5F00', qrBoxX + qrBoxSize / 2, qrBoxY + 38);
        ctx.fillText('\u6D4B\u8BD5\u9875', qrBoxX + qrBoxSize / 2, qrBoxY + 62);
        ctx.textAlign = 'left';
    }

    ctx.fillStyle = '#64748b';
    ctx.font = '400 20px "Microsoft YaHei", "PingFang SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('\u53D1\u7ED9\u670B\u53CB\u4E00\u8D77\u6D4B\u6D4B\uFF0C\u4F60\u4EEC\u7684\u6295\u8D44\u98CE\u683C\u53EF\u80FD\u5B8C\u5168\u4E0D\u4E00\u6837', canvas.width / 2, 1850);
    ctx.textAlign = 'left';


    return canvasToBlob(canvas);
}

function getQuizShareUrl() {
    if (typeof window.QUIZ_SHARE_URL === 'string' && window.QUIZ_SHARE_URL.trim()) {
        return window.QUIZ_SHARE_URL.trim();
    }

    const metaShareUrl = document.querySelector('meta[name="quiz-share-url"]');
    if (metaShareUrl && metaShareUrl.content.trim()) {
        return metaShareUrl.content.trim();
    }

    const url = new URL(window.location.href);
    url.hash = '';
    return url.toString();
}

function getShareUrlLabel(url) {
    try {
        const parsed = new URL(url);
        return parsed.host + parsed.pathname.replace(/\/$/, '');
    } catch (error) {
        return 'quiz.html';
    }
}

async function getPosterQrDataUrl(shareUrl, theme) {
    if (!window.QRCode || typeof window.QRCode.toDataURL !== 'function') {
        return '';
    }

    try {
        return await window.QRCode.toDataURL(shareUrl, {
            width: 220,
            margin: 1,
            color: {
                dark: '#0f172a',
                light: '#ffffff'
            }
        });
    } catch (error) {
        console.warn('poster qr generation failed', error);
        return '';
    }
}

function getPosterTheme(profile) {
    const themes = {
        conservative: {
            accent: '#5fd5b5',
            stickerFill: 'rgba(95, 213, 181, 0.14)',
            stickerBorder: 'rgba(95, 213, 181, 0.28)',
            tagFill: 'rgba(95, 213, 181, 0.16)',
            tagBorder: 'rgba(95, 213, 181, 0.26)',
            noteFill: 'rgba(95, 213, 181, 0.10)',
            noteBorder: 'rgba(95, 213, 181, 0.18)',
            numberFill: 'rgba(95, 213, 181, 0.12)',
            numberBorder: 'rgba(95, 213, 181, 0.2)',
            toolFill: 'rgba(95, 213, 181, 0.08)',
            toolBorder: 'rgba(95, 213, 181, 0.14)',
            pillFill: 'rgba(95, 213, 181, 0.12)',
            pillBorder: 'rgba(95, 213, 181, 0.2)',
            coverTag: '先稳住，再慢慢提升',
            coverHook: '适合慢慢变富的长期派',
            headlineTop: '测出来了，你属于',
            headlineColor: '#dffcf4',
            bgTop: '#06182a',
            bgBottom: '#0b1430',
            glowA: 'rgba(95, 213, 181, 0.34)',
            glowB: 'rgba(245, 200, 98, 0.18)'
        },
        balanced: {
            accent: '#69b9ff',
            stickerFill: 'rgba(105, 185, 255, 0.14)',
            stickerBorder: 'rgba(105, 185, 255, 0.28)',
            tagFill: 'rgba(105, 185, 255, 0.14)',
            tagBorder: 'rgba(105, 185, 255, 0.24)',
            noteFill: 'rgba(105, 185, 255, 0.08)',
            noteBorder: 'rgba(105, 185, 255, 0.18)',
            numberFill: 'rgba(105, 185, 255, 0.12)',
            numberBorder: 'rgba(105, 185, 255, 0.2)',
            toolFill: 'rgba(105, 185, 255, 0.08)',
            toolBorder: 'rgba(105, 185, 255, 0.14)',
            pillFill: 'rgba(105, 185, 255, 0.12)',
            pillBorder: 'rgba(105, 185, 255, 0.2)',
            coverTag: '讲节奏，也讲纪律',
            coverHook: '拿得住，也更跑得远',
            headlineTop: '测出来了，你属于',
            headlineColor: '#e0f1ff',
            bgTop: '#07142f',
            bgBottom: '#0a173d',
            glowA: 'rgba(105, 185, 255, 0.34)',
            glowB: 'rgba(245, 200, 98, 0.18)'
        },
        aggressive: {
            accent: '#ff7b72',
            stickerFill: 'rgba(255, 123, 114, 0.16)',
            stickerBorder: 'rgba(255, 123, 114, 0.30)',
            tagFill: 'rgba(255, 123, 114, 0.16)',
            tagBorder: 'rgba(255, 123, 114, 0.26)',
            noteFill: 'rgba(255, 123, 114, 0.10)',
            noteBorder: 'rgba(255, 123, 114, 0.18)',
            numberFill: 'rgba(255, 123, 114, 0.12)',
            numberBorder: 'rgba(255, 123, 114, 0.2)',
            toolFill: 'rgba(255, 123, 114, 0.08)',
            toolBorder: 'rgba(255, 123, 114, 0.14)',
            pillFill: 'rgba(255, 123, 114, 0.12)',
            pillBorder: 'rgba(255, 123, 114, 0.2)',
            coverTag: '敢去拿波动，也要能扛得住',
            coverHook: '有冲劲，也要有章法',
            headlineTop: '测出来了，你属于',
            headlineColor: '#ffe6e2',
            bgTop: '#170d28',
            bgBottom: '#09122f',
            glowA: 'rgba(255, 123, 114, 0.34)',
            glowB: 'rgba(244, 114, 182, 0.18)'
        }
    };

    return themes[profile.key] || themes.balanced;
}

function drawPosterBackground(ctx, width, height, theme) {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, theme.bgTop);
    gradient.addColorStop(0.55, '#081536');
    gradient.addColorStop(1, theme.bgBottom);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.globalAlpha = 0.26;
    for (let i = 0; i < 16; i += 1) {
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 255, 255, 0.025)' : 'rgba(255, 255, 255, 0.012)';
        ctx.fillRect(64 + i * 64, 0, 26, height);
    }
    ctx.restore();

    const glowA = ctx.createRadialGradient(980, 210, 24, 980, 210, 280);
    glowA.addColorStop(0, theme.glowA);
    glowA.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glowA;
    ctx.beginPath();
    ctx.arc(980, 210, 280, 0, Math.PI * 2);
    ctx.fill();

    const glowB = ctx.createRadialGradient(180, 1480, 10, 180, 1480, 230);
    glowB.addColorStop(0, theme.glowB);
    glowB.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glowB;
    ctx.beginPath();
    ctx.arc(180, 1480, 230, 0, Math.PI * 2);
    ctx.fill();
}

function drawDonutChart(ctx, chart, centerX, centerY, radius, thickness) {
    const total = chart.data.reduce((sum, value) => sum + value, 0);
    let startAngle = -Math.PI / 2;

    chart.data.forEach((value, index) => {
        const angle = (value / total) * Math.PI * 2;
        ctx.beginPath();
        ctx.strokeStyle = chart.colors[index];
        ctx.lineWidth = thickness;
        ctx.lineCap = 'butt';
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + angle);
        ctx.stroke();
        startAngle += angle;
    });

    ctx.beginPath();
    ctx.fillStyle = '#101a3d';
    ctx.arc(centerX, centerY, radius - thickness / 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, color, maxLines = Number.POSITIVE_INFINITY) {
    ctx.fillStyle = color;
    const characters = Array.from(text);
    let line = '';
    let lineCount = 0;

    for (const char of characters) {
        const testLine = line + char;
        if (ctx.measureText(testLine).width > maxWidth && line) {
            ctx.fillText(line, x, y);
            y += lineHeight;
            lineCount += 1;
            if (lineCount >= maxLines) return y;
            line = char;
        } else {
            line = testLine;
        }
    }

    if (line) {
        ctx.fillText(line, x, y);
        y += lineHeight;
    }

    return y;
}

function fillRoundedRect(ctx, x, y, width, height, radius, fillStyle, strokeStyle, lineWidth) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.fillStyle = fillStyle;
    ctx.fill();

    if (strokeStyle) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }
}

function drawPillList(ctx, labels, x, y, maxWidth, options = {}) {
    ctx.font = '600 21px "Microsoft YaHei", "PingFang SC", sans-serif';
    let cursorX = x;
    let cursorY = y;
    const fillStyle = options.fillStyle || 'rgba(255, 255, 255, 0.08)';
    const strokeStyle = options.strokeStyle || 'rgba(255, 255, 255, 0.10)';
    const textColor = options.textColor || '#f8fafc';

    labels.forEach((label) => {
        const pillWidth = Math.ceil(ctx.measureText(label).width) + 34;
        if (cursorX + pillWidth > x + maxWidth) {
            cursorX = x;
            cursorY += 46;
        }

        fillRoundedRect(ctx, cursorX, cursorY - 4, pillWidth, 34, 17, fillStyle, strokeStyle, 1);
        ctx.fillStyle = textColor;
        ctx.fillText(label, cursorX + 17, cursorY + 2);
        cursorX += pillWidth + 12;
    });
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

function canvasToBlob(canvas) {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
                return;
            }
            reject(new Error('无法生成海报图片'));
        }, 'image/png');
    });
}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

async function tryNativeShare(blob, filename, profile) {
    if (!navigator.share || !navigator.canShare) return false;

    const file = new File([blob], filename, { type: 'image/png' });
    if (!navigator.canShare({ files: [file] })) return false;

    await navigator.share({
        title: '我的投资风格测试结果：' + profile.title,
        text: '我刚做了投资风格测试，结果是 ' + profile.title + '。',
        files: [file]
    });
    return true;
}