document.addEventListener('DOMContentLoaded', () => {
    const principalInput = document.getElementById('principal');
    const rateInput = document.getElementById('rate');
    const yearsInput = document.getElementById('years');
    const calcBtn = document.getElementById('calcBtn');
    const repayTypeRadios = document.getElementsByName('repayType');

    const monthlyPaymentStr = document.getElementById('monthlyPaymentStr');
    const monthlyPaymentLabel = document.getElementById('monthlyPaymentLabel');
    const totalPaymentStr = document.getElementById('totalPaymentStr');
    const totalInterestStr = document.getElementById('totalInterestStr');

    let chart = null;

    function getRepayType() {
        for (const radio of repayTypeRadios) {
            if (radio.checked) return radio.value;
        }
        return 'equal-installment';
    }

    function calculate() {
        const pTotal = (parseFloat(principalInput.value) || 0) * 10000; // 万元转元
        const r = (parseFloat(rateInput.value) || 0) / 100 / 12; // 月利率
        const m = (parseInt(yearsInput.value) || 1) * 12; // 总期数(月)
        const type = getRepayType();

        let totalPayment = 0;
        let totalInterest = 0;

        // 图表数据
        let labels = ['贷款本金', '总利息'];
        let dataVals = [0, 0];

        if (type === 'equal-installment') {
            // 等额本息
            // 每月还款： [本金 * 月利率 * (1+月利率)^还款月数] / [(1+月利率)^还款月数 - 1]
            monthlyPaymentLabel.textContent = '每月还款额 (元)';
            const factor = Math.pow(1 + r, m);
            const monthly = (pTotal * r * factor) / (factor - 1);

            totalPayment = monthly * m;
            totalInterest = totalPayment - pTotal;

            monthlyPaymentStr.textContent = `¥${monthly.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            dataVals = [pTotal, totalInterest];

        } else {
            // 等额本金
            // 每月还款 = (贷款本金 / 还款月数) + (本金 — 已归还本金累计额) × 每月利率
            monthlyPaymentLabel.textContent = '首月还款额 (元)';
            const calcPrincipalPerMonth = pTotal / m;
            let firstMonth = 0;

            // 累加计算总利息
            for (let i = 0; i < m; i++) {
                const interestThisMonth = (pTotal - calcPrincipalPerMonth * i) * r;
                if (i === 0) firstMonth = calcPrincipalPerMonth + interestThisMonth;
                totalInterest += interestThisMonth;
            }
            totalPayment = pTotal + totalInterest;

            monthlyPaymentStr.textContent = `¥${firstMonth.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (以后逐月递减)`;
            dataVals = [pTotal, totalInterest];
        }

        totalPaymentStr.textContent = `¥${totalPayment.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
        totalInterestStr.textContent = `¥${totalInterest.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

        renderChart(labels, dataVals);
    }

    function renderChart(labels, dataVals) {
        const ctx = document.getElementById('mortgageChart').getContext('2d');
        if (chart) chart.destroy();

        chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: dataVals,
                    backgroundColor: [
                        'rgba(56, 189, 248, 0.8)', // 本金，蓝色
                        'rgba(244, 63, 94, 0.8)'   // 利息，红色
                    ],
                    borderColor: 'rgba(15, 23, 42, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#e2e8f0' }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let val = context.parsed;
                                return ` ¥${val.toLocaleString('zh-CN', { maximumFractionDigits: 0 })}`;
                            }
                        }
                    }
                }
            }
        });
    }

    calcBtn.addEventListener('click', calculate);
    for (const radio of repayTypeRadios) {
        radio.addEventListener('change', calculate);
    }

    calculate();
});
