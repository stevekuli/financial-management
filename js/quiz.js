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
    document.getElementById('progressFill').style.width = progressPercent + '%';
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

    html += `</div></div>`;
    quizArea.innerHTML = html;
}

window.selectOption = function (score) {
    totalScore += score;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        renderQuestion();
    } else {
        document.getElementById('progressFill').style.width = '100%';
        document.getElementById('quizLabel').textContent = '测试完成';
        showResult();
    }
};

function showResult() {
    document.getElementById('quizArea').style.display = 'none';
    const resultArea = document.getElementById('resultArea');
    resultArea.classList.add('active');

    const typeEl = document.getElementById('resultType');
    const descEl = document.getElementById('resultDesc');

    let profile = '';
    let desc = '';
    let labels = [];
    let dataSets = [];
    let bgColors = [];

    const averageScore = totalScore / questions.length;

    if (averageScore <= 2.2) {
        profile = '保守型投资者';
        desc = '你非常看重本金安全，宁愿收益低一些，也不愿承担明显的账面亏损。你的配置更适合以低波动资产为主，优先保证资金稳定性。';
        labels = ['货币基金/存款', '国债/稳健理财', '宽基股票基金', '黄金'];
        dataSets = [40, 40, 10, 10];
        bgColors = ['#94a3b8', '#38bdf8', '#fbbf24', '#f59e0b'];
    }
    else if (averageScore <= 3.6) {
        profile = '稳健型投资者';
        desc = '你希望在收益和风险之间找到平衡，愿意承受适度波动来换取长期增值。股债搭配、分散配置会更适合你的节奏。';
        labels = ['债券基金', '宽基股票基金(A股/标普)', '货币基金备用', '黄金'];
        dataSets = [40, 40, 10, 10];
        bgColors = ['#38bdf8', '#f43f5e', '#94a3b8', '#f59e0b'];
    }
    else {
        profile = '进取型投资者';
        desc = '你有较强的风险承受能力，愿意为了更高回报接受更大的阶段性波动。更适合以权益类资产为核心，但仍要注意仓位和长期纪律。';
        labels = ['股票/高弹性基金', '宽基股票基金', '债券/固收', '高风险尝试仓位'];
        dataSets = [50, 30, 15, 5];
        bgColors = ['#f43f5e', '#f472b6', '#38bdf8', '#8b5cf6'];
    }

    typeEl.textContent = profile;
    descEl.textContent = desc;

    renderAllocationChart(labels, dataSets, bgColors);
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
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: '#e2e8f0', padding: 20 }
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return ` ${context.label}: ${context.parsed}%`;
                        }
                    }
                }
            }
        }
    });
}
