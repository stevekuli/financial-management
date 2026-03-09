document.addEventListener('DOMContentLoaded', () => {
    const principalInput = document.getElementById('principal');
    const rateInput = document.getElementById('rate');
    const yearsInput = document.getElementById('years');
    const calcBtn = document.getElementById('calcBtn');

    const futureValueStr = document.getElementById('futureValueStr');
    const lostValueStr = document.getElementById('lostValueStr');

    let chart = null;

    function calculate() {
        const pv = parseFloat(principalInput.value) || 0;
        const r = (parseFloat(rateInput.value) || 0) / 100;
        const t = parseInt(yearsInput.value) || 0;

        // 今年的100万，在未来相当于今天的多少钱？
        // 公式: FV = PV / (1 + r)^t

        let labels = [];
        let dataVals = [];

        let currentVal = pv;

        for (let i = 0; i <= t; i++) {
            if (i % 5 === 0 || i === t || i === 0) {
                labels.push(i === 0 ? '现在' : `第${i}年`);
                dataVals.push(pv / Math.pow(1 + r, i));
            }
        }

        const fv = pv / Math.pow(1 + r, t);
        const diffPercent = ((pv - fv) / pv) * 100;

        futureValueStr.textContent = `¥${fv.toLocaleString('zh-CN', { maximumFractionDigits: 0 })}`;
        lostValueStr.textContent = `-${diffPercent.toFixed(1)}%`;

        renderChart(labels, dataVals);
    }

    function renderChart(labels, dataVals) {
        const ctx = document.getElementById('inflationChart').getContext('2d');
        if (chart) chart.destroy();

        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '实际购买力',
                    data: dataVals,
                    borderColor: 'rgba(244, 63, 94, 1)',   // 红色，代表贬值
                    backgroundColor: 'rgba(244, 63, 94, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: 'rgba(244, 63, 94, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let val = context.parsed.y;
                                return `¥${val.toLocaleString('zh-CN', { maximumFractionDigits: 0 })}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    },
                    y: {
                        min: 0,
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    }
                }
            }
        });
    }

    calcBtn.addEventListener('click', calculate);
    calculate();
});
