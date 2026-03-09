document.addEventListener('DOMContentLoaded', () => {
    const initialInput = document.getElementById('initial');
    const monthlyInput = document.getElementById('monthly');
    const rateInput = document.getElementById('rate');
    const yearsInput = document.getElementById('years');
    const calcBtn = document.getElementById('calcBtn');

    const totalAmountEl = document.getElementById('totalAmount');
    const principalTotalEl = document.getElementById('principalTotal');
    const interestTotalEl = document.getElementById('interestTotal');

    let chart = null;

    function calculate() {
        const initial = parseFloat(initialInput.value) || 0;
        const P = parseFloat(monthlyInput.value) || 0;
        const r = (parseFloat(rateInput.value) || 0) / 100;
        const t = parseInt(yearsInput.value) || 0;

        const months = t * 12;
        const monthlyRate = r / 12;

        let labels = [];
        let principalData = [];
        let interestData = [];

        let currentTotal = initial;
        let totalPrincipal = initial;
        let currentInterestTotal = 0;

        // 按月模拟
        for (let m = 1; m <= months; m++) {
            // 月初投入
            currentTotal += P;
            totalPrincipal += P;

            // 月末计算本月利息
            const monthlyInterest = currentTotal * monthlyRate;
            currentInterestTotal += monthlyInterest;
            currentTotal += monthlyInterest;

            // 每年记录一次图表数据
            if (m % 12 === 0) {
                const year = m / 12;
                labels.push(`第${year}年`);
                principalData.push(totalPrincipal);
                interestData.push(currentInterestTotal);
            }
        }

        // 更新结果面板
        totalAmountEl.textContent = `¥${currentTotal.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        principalTotalEl.textContent = `¥${totalPrincipal.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        interestTotalEl.textContent = `+¥${currentInterestTotal.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        // 渲染图表
        renderChart(labels, principalData, interestData);
    }

    function renderChart(labels, principalData, interestData) {
        const ctx = document.getElementById('dcaChart').getContext('2d');

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '累计本金',
                        data: principalData,
                        backgroundColor: 'rgba(56, 189, 248, 0.8)',
                        stack: 'Stack 0',
                    },
                    {
                        label: '累计收益',
                        data: interestData,
                        backgroundColor: 'rgba(52, 211, 153, 0.8)',
                        stack: 'Stack 0',
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#e2e8f0' }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                if (context.parsed.y !== null) {
                                    label += '¥' + context.parsed.y.toLocaleString('zh-CN', { maximumFractionDigits: 0 });
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    },
                    y: {
                        stacked: true,
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    }
                }
            }
        });
    }

    calcBtn.addEventListener('click', calculate);

    // 初始计算
    calculate();
});
