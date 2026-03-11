/* ======================================
   定投计划器 — 计算引擎
   dca-planner.js
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ------- DOM 引用 ------- */
    const monthlyInput = document.getElementById('monthly');
    const initialInput = document.getElementById('initial');
    const rateInput = document.getElementById('rate');
    const yearsInput = document.getElementById('years');
    const goalInput = document.getElementById('goal');
    const calcBtn = document.getElementById('calcBtn');

    // 结果区
    const totalAmountEl = document.getElementById('totalAmount');
    const principalEl = document.getElementById('principal');
    const interestEl = document.getElementById('interest');
    const roiEl = document.getElementById('roi');
    const goalSection = document.getElementById('goalSection');
    const goalBarEl = document.getElementById('goalBar');
    const goalPctEl = document.getElementById('goalPct');
    const goalStatusEl = document.getElementById('goalStatus');
    const needMonthlyEl = document.getElementById('needMonthly');
    const needMonthlyRow = document.getElementById('needMonthlyRow');

    // 里程碑卡
    const breakEvenEl = document.getElementById('breakEvenYear');
    const doubleEl = document.getElementById('doubleYear');
    const dailyWageEl = document.getElementById('dailyWage');

    let chart = null;

    /* ------- 核心计算 ------- */
    function simulate(monthly, initial, annualRate, years) {
        const monthlyRate = annualRate / 100 / 12;
        const months = years * 12;

        const labels = [];
        const principalData = [];
        const totalData = [];

        let balance = initial;
        let principal = initial;

        let breakEvenYear = null;  // 收益首次超过本金的年份
        let doubleYear = null;  // 总资产首次达到初始本金2倍的年份（若有初始本金）
        let firstDouble = principal > 0 ? principal * 2 : null;  // 以初始本金为基准翻倍

        for (let m = 1; m <= months; m++) {
            balance = (balance + monthly) * (1 + monthlyRate);
            principal += monthly;

            if (m % 12 === 0) {
                const year = m / 12;
                const interest = balance - principal;

                labels.push(`第${year}年`);
                principalData.push(Math.round(principal));
                totalData.push(Math.round(balance));

                // 里程碑检测
                if (breakEvenYear === null && interest >= principal) {
                    breakEvenYear = year;
                }
                if (doubleYear === null && firstDouble !== null && balance >= firstDouble * 2) {
                    // 改为：总资产翻倍（相对于总投入）
                }
                if (doubleYear === null && balance >= principal * 1.5) {
                    // 找收益达到本金50%的年份（不够直观，换个指标）
                }
            }
        }

        // 更简单的翻倍定义：总资产 >= 2 × 总本金
        for (let i = 0; i < totalData.length; i++) {
            if (doubleYear === null && totalData[i] >= principalData[i] * 2) {
                doubleYear = i + 1;
                break;
            }
        }

        return {
            finalBalance: balance,
            finalPrincipal: principal,
            finalInterest: balance - principal,
            labels,
            principalData,
            totalData,
            breakEvenYear,  // 利息超过本金
            doubleYear,     // 总资产 >= 2倍本金
        };
    }

    /* 逆向计算：已知目标金额、年化、年限，求每月需投多少 */
    function calcMonthlyNeeded(goal, initial, annualRate, years) {
        const r = annualRate / 100 / 12;
        const n = years * 12;

        // 目标 = 初始本金 * (1+r)^n + PMT * [(1+r)^n - 1] / r
        const futureInitial = initial * Math.pow(1 + r, n);
        const remaining = goal - futureInitial;

        if (remaining <= 0) return 0;
        if (r === 0) return remaining / n;

        // PMT = remaining * r / [(1+r)^n - 1]
        return remaining * r / (Math.pow(1 + r, n) - 1);
    }

    /* ------- 渲染 ------- */
    function fmt(n) {
        return '¥' + Math.round(n).toLocaleString('zh-CN');
    }

    function renderChart(labels, principalData, totalData) {
        const ctx = document.getElementById('dcaPlannerChart').getContext('2d');
        if (chart) chart.destroy();

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [
                    {
                        label: '累计本金',
                        data: principalData,
                        borderColor: 'rgba(148, 163, 184, 0.9)',
                        backgroundColor: 'rgba(148, 163, 184, 0.08)',
                        borderWidth: 2,
                        pointRadius: 0,
                        tension: 0.4,
                        fill: true,
                    },
                    {
                        label: '资产总额',
                        data: totalData,
                        borderColor: 'rgba(212, 167, 69, 1)',
                        backgroundColor: 'rgba(212, 167, 69, 0.12)',
                        borderWidth: 2.5,
                        pointRadius: 0,
                        tension: 0.4,
                        fill: true,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8', font: { size: 12 } }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        titleColor: '#f1f5f9',
                        bodyColor: '#94a3b8',
                        borderColor: 'rgba(255,255,255,0.08)',
                        borderWidth: 1,
                        callbacks: {
                            label: ctx => {
                                const val = ctx.parsed.y.toLocaleString('zh-CN', { maximumFractionDigits: 0 });
                                return ` ${ctx.dataset.label}: ¥${val}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#64748b',
                            maxTicksLimit: 10,
                        },
                        grid: { color: 'rgba(255,255,255,0.04)' }
                    },
                    y: {
                        ticks: {
                            color: '#64748b',
                            callback: v => {
                                if (v >= 10000) return '¥' + (v / 10000).toFixed(0) + '万';
                                return '¥' + v.toLocaleString();
                            }
                        },
                        grid: { color: 'rgba(255,255,255,0.04)' }
                    }
                }
            }
        });
    }

    /* ------- 主流程 ------- */
    function run() {
        const monthly = parseFloat(monthlyInput.value) || 0;
        const initial = parseFloat(initialInput.value) || 0;
        const rate = parseFloat(rateInput.value) || 0;
        const years = parseInt(yearsInput.value) || 1;
        const goal = parseFloat(goalInput.value) || 0;

        if (monthly <= 0 && initial <= 0) return;

        const result = simulate(monthly, initial, rate, years);

        /* — 主要数字 — */
        totalAmountEl.textContent = fmt(result.finalBalance);
        principalEl.textContent = fmt(result.finalPrincipal);
        interestEl.textContent = '+' + fmt(result.finalInterest);
        const roi = result.finalPrincipal > 0
            ? ((result.finalBalance / result.finalPrincipal - 1) * 100).toFixed(1)
            : '0.0';
        roiEl.textContent = roi + '%';

        /* — 目标区 — */
        if (goal > 0) {
            goalSection.style.display = 'block';
            const pct = Math.min(100, (result.finalBalance / goal * 100));
            goalBarEl.style.width = pct.toFixed(1) + '%';
            goalPctEl.textContent = pct.toFixed(1) + '%';

            if (result.finalBalance >= goal) {
                goalStatusEl.textContent = '✅ 按此计划可达成目标！';
                goalStatusEl.className = 'goal-status goal-ok';
            } else {
                const diff = goal - result.finalBalance;
                goalStatusEl.textContent = `距目标还差 ${fmt(diff)}`;
                goalStatusEl.className = 'goal-status goal-no';
            }

            // 逆向计算
            const needed = calcMonthlyNeeded(goal, initial, rate, years);
            needMonthlyRow.style.display = 'flex';
            needMonthlyEl.textContent = fmt(needed) + ' / 月';
        } else {
            goalSection.style.display = 'none';
            needMonthlyRow.style.display = 'none';
        }

        /* — 图表 — */
        renderChart(result.labels, result.principalData, result.totalData);

        /* — 里程碑卡片 — */
        breakEvenEl.textContent = result.breakEvenYear
            ? `第 ${result.breakEvenYear} 年`
            : `${years}年内未到达`;

        doubleEl.textContent = result.doubleYear
            ? `第 ${result.doubleYear} 年`
            : `${years}年内未翻倍`;

        // 每月等效日工资（月净收益 / 30）
        const monthlyGain = result.finalInterest / (years * 12);
        const dailyEquiv = monthlyGain / 30;
        dailyWageEl.textContent = fmt(dailyEquiv) + ' / 天';
    }

    calcBtn.addEventListener('click', run);
    run(); // 初始渲染
});
