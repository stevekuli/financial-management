document.addEventListener('DOMContentLoaded', () => {
    const principalInput = document.getElementById('principal');
    const rateInput = document.getElementById('rate');
    const yearsInput = document.getElementById('years');
    const calcBtn = document.getElementById('calcBtn');

    const totalAmountEl = document.getElementById('totalAmount');
    const principalTotalEl = document.getElementById('principalTotal');
    const interestTotalEl = document.getElementById('interestTotal');

    const detailsTable = document.getElementById('detailsTable');
    const detailsTbody = document.getElementById('detailsTbody');
    const toggleDetailsBtn = document.getElementById('toggleDetailsBtn');

    let chart = null;

    function calculate() {
        const P = parseFloat(principalInput.value) || 0;
        const r = (parseFloat(rateInput.value) || 0) / 100;
        const t = parseInt(yearsInput.value) || 0;

        let labels = [];
        let principalData = [];
        let interestData = [];
        let detailsHTML = '';

        let currentPrincipal = P;
        let totalInterest = 0;

        for (let i = 1; i <= t; i++) {
            const yearStart = currentPrincipal;
            const interest = yearStart * r;
            const yearEnd = yearStart + interest;

            totalInterest += interest;
            currentPrincipal = yearEnd;

            labels.push(`第${i}年`);
            principalData.push(P);
            interestData.push(totalInterest);

            detailsHTML += `
        <tr>
          <td>第${i}年</td>
          <td>¥${yearStart.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td class="text-green">+¥${interest.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
          <td>¥${yearEnd.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        </tr>
      `;
        }

        // 更新结果面板
        totalAmountEl.textContent = `¥${currentPrincipal.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        principalTotalEl.textContent = `¥${P.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        interestTotalEl.textContent = `+¥${totalInterest.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        detailsTbody.innerHTML = detailsHTML;

        // 渲染图表
        renderChart(labels, principalData, interestData);
    }

    function renderChart(labels, principalData, interestData) {
        const ctx = document.getElementById('compoundChart').getContext('2d');

        if (chart) {
            chart.destroy();
        }

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '本金',
                        data: principalData,
                        backgroundColor: 'rgba(56, 189, 248, 0.8)',
                        stack: 'Stack 0',
                    },
                    {
                        label: '收益',
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

    toggleDetailsBtn.addEventListener('click', () => {
        if (detailsTable.style.display === 'none') {
            detailsTable.style.display = 'table';
            toggleDetailsBtn.textContent = '收起明细';
        } else {
            detailsTable.style.display = 'none';
            toggleDetailsBtn.textContent = '展开明细';
        }
    });

    // 初始计算
    calculate();
});
