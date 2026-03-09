const questions = [
    {
        target: "当你的投资组合在一个月内下跌了 20%，你的第一反应是？",
        options: [
            { text: "非常恐慌，立刻清仓止损", score: 1 },
            { text: "有点焦虑，但会继续观望", score: 3 },
            { text: "觉得是加仓的好机会，准备抄底", score: 5 }
        ]
    },
    {
        target: "你目前用于投资的资金，预计多久之后需要用到（买房、教育等）？",
        options: [
            { text: "随时可能用到（1年以内）", score: 1 },
            { text: "中短期大概会用（1-3年）", score: 3 },
            { text: "五年以上几乎用不到", score: 5 }
        ]
    },
    {
        target: "如果你的 10 万本金投资一年，哪种结果是你最能接受的？",
        options: [
            { text: "最高赚到 10.5 万，最差保本不亏", score: 1 },
            { text: "最高赚到 11.5 万，最差剩下 9.5 万", score: 3 },
            { text: "最高赚到 14 万，最差剩下 7.5 万", score: 5 }
        ]
    },
    {
        target: "对于投资的目标，你首要的追求是：",
        options: [
            { text: "本金绝对安全，能跑赢通胀就行", score: 1 },
            { text: "在风险可控的前提下，追求每年 8% 左右稳健回报", score: 3 },
            { text: "为了获得超额收益，甘愿承担较高的波动风险", score: 5 }
        ]
    },
    {
        target: "你对投资理财知识的了解程度属于：",
        options: [
            { text: "完全是新手，很少接触", score: 1 },
            { text: "了解基础概念，买过一些基金", score: 3 },
            { text: "经验丰富，有自己的分析框架", score: 5 }
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

    // 更新进度条
    const progressPercent = ((currentQuestion) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progressPercent + '%';
    document.getElementById('quizLabel').textContent = `题目 ${currentQuestion + 1} / ${questions.length}`;

    let html = `<div class="question-card active">
      <h3 class="question-title">${currentQuestion + 1}. ${q.target}</h3>
      <div class="option-list">`;

    q.options.forEach((opt, idx) => {
        // 用 data-score 暂存分数
        html += `<button class="option-btn" onclick="selectOption(${opt.score})">
                  <span style="font-weight:bold; color:var(--accent-gold); width:24px;">${String.fromCharCode(65 + idx)}.</span> 
                  ${opt.text}
               </button>`;
    });

    html += `</div></div>`;
    quizArea.innerHTML = html;
}

// 暴露给点击事件
window.selectOption = function (score) {
    totalScore += score;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        document.getElementById('progressFill').style.width = ((currentQuestion) / questions.length) * 100 + '%';
        renderQuestion();
    } else {
        document.getElementById('progressFill').style.width = '100%';
        document.getElementById('quizLabel').textContent = `测试完成！`;
        showResult();
    }
}

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

    // 满分25分，最低5分
    if (totalScore <= 10) {
        profile = '保守型投资者';
        desc = '你极度厌恶风险，非常看重本金的绝对安全。哪怕收益微薄，也不愿承受账面亏损。\n你的配置建议：以极其稳健的低风险资产为主，少量配置股票对抗长期通胀。';
        labels = ['货币基金/存款', '国债/稳健理财', '宽基股票基金', '黄金'];
        dataSets = [40, 40, 10, 10];
        bgColors = ['#94a3b8', '#38bdf8', '#fbbf24', '#f59e0b'];
    }
    else if (totalScore <= 18) {
        profile = '稳健型投资者';
        desc = '你在收益和风险之间寻求平衡，愿意承受适度的账面回撤以换取跑赢通胀和财富稳定增值。\n你的配置建议：经典的“股债平衡”策略最适合你，通过资产配置分散投资。';
        labels = ['债券基金', '宽基股票基金(A股/标普)', '货币基金备用', '黄金'];
        dataSets = [40, 40, 10, 10];
        bgColors = ['#38bdf8', '#f43f5e', '#94a3b8', '#f59e0b'];
    }
    else {
        profile = '激进型投资者';
        desc = '你有较强的风险承受能力，愿意为了追求超额的高回报而忍受短期的剧烈波动。\n你的配置建议：以高弹性的权益类资产（股票、基金）为核心，用长期闲钱做时间的朋友。';
        labels = ['股票/高弹性基(纳斯达克/科创)', '宽基股票基金', '债券/固收', '数字货币/高风险标的'];
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
