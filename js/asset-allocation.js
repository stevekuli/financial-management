/* 资产配置建议器核心逻辑 */

document.addEventListener('DOMContentLoaded', () => {
    // 获取 DOM 元素
    const ageInput = document.getElementById('age');
    const riskInputs = document.querySelectorAll('input[name="risk"]');
    const totalAmountInput = document.getElementById('totalAmount');
    const calcBtn = document.getElementById('calcBtn');

    const pctStockEl = document.getElementById('pctStock');
    const pctBondEl = document.getElementById('pctBond');
    const pctCashEl = document.getElementById('pctCash');
    
    const amtStockEl = document.getElementById('amtStock');
    const amtBondEl = document.getElementById('amtBond');
    const amtCashEl = document.getElementById('amtCash');
    const modelNameEl = document.getElementById('modelName');

    Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
    Chart.defaults.font.family = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    let allocationChart = null;

    // 初始化运行计算
    calculateAllocation();

    // 绑定事件
    if (calcBtn) {
        calcBtn.addEventListener('click', calculateAllocation);
    }
    
    // 输入或修改金额时即时响应
    if (totalAmountInput) {
        totalAmountInput.addEventListener('input', calculateAllocation);
    }
    
    if (ageInput) {
        ageInput.addEventListener('change', calculateAllocation);
    }
    
    riskInputs.forEach(input => {
        input.addEventListener('change', calculateAllocation);
    });

    function calculateAllocation() {
        const age = parseInt(ageInput.value, 10) || 30;
        let risk = 'balanced';
        riskInputs.forEach(input => {
            if (input.checked) risk = input.value;
        });
        const totalAmount = parseFloat(totalAmountInput.value) || 0;

        // 核心公式：
        // 1. 基准权益比例 = 100 - age
        let stockPct = 100 - age;
        
        // 2. 根据风险偏好调整
        if (risk === 'conservative') {
            stockPct -= 15;
            modelNameEl.textContent = "保守型";
        } else if (risk === 'aggressive') {
            stockPct += 15;
            modelNameEl.textContent = "积极型";
        } else {
            modelNameEl.textContent = "平衡型";
        }
        
        // 边界控制，最多95%，最少0%
        stockPct = Math.max(0, Math.min(95, stockPct));
        
        // 3. 现金比例
        // 默认预留 10% 现金，对保守型留 15%，积极型留 5%
        let cashPct = 10;
        if (risk === 'conservative') cashPct = 15;
        if (risk === 'aggressive') cashPct = 5;
        
        // 4. 固收比例
        let bondPct = 100 - stockPct - cashPct;
        
        // 如果固收比例小于0，优先级：先砍股票，再看现金
        if (bondPct < 0) {
            stockPct = 100 - cashPct;
            bondPct = 0;
        }

        // 保证总和为100（可能会有浮点问题，强制取整）
        stockPct = Math.round(stockPct);
        cashPct = Math.round(cashPct);
        bondPct = 100 - stockPct - cashPct;

        // 渲染页面文本
        pctStockEl.textContent = `${stockPct}%`;
        pctBondEl.textContent = `${bondPct}%`;
        pctCashEl.textContent = `${cashPct}%`;

        // 处理金额显示
        if (totalAmount > 0) {
            const amtStock = Math.round(totalAmount * (stockPct / 100));
            const amtBond = Math.round(totalAmount * (bondPct / 100));
            const amtCash = totalAmount - amtStock - amtBond; // 避免最后1分钱的误差

            amtStockEl.textContent = `¥ ${amtStock.toLocaleString()}`;
            amtBondEl.textContent = `¥ ${amtBond.toLocaleString()}`;
            amtCashEl.textContent = `¥ ${amtCash.toLocaleString()}`;

            amtStockEl.style.display = 'block';
            amtBondEl.style.display = 'block';
            amtCashEl.style.display = 'block';
        } else {
            amtStockEl.style.display = 'none';
            amtBondEl.style.display = 'none';
            amtCashEl.style.display = 'none';
        }

        updateChart(stockPct, bondPct, cashPct);
    }

    function updateChart(stock, bond, cash) {
        const ctx = document.getElementById('allocationChart').getContext('2d');
        
        const data = {
            labels: ['股票权益类', '固定收益类', '现金管理'],
            datasets: [{
                data: [stock, bond, cash],
                backgroundColor: [
                    '#f97316', // orange
                    '#3b82f6', // blue
                    '#10b981'  // green
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        };

        if (allocationChart) {
            allocationChart.data = data;
            allocationChart.update();
        } else {
            allocationChart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '75%', // 控制内圈大小
                    plugins: {
                        legend: {
                            display: false // 我们自己手写了legend，不需要默认的
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return ' ' + context.label + ': ' + context.parsed + '%';
                                }
                            },
                            backgroundColor: 'rgba(15, 23, 42, 0.9)',
                            titleColor: '#fff',
                            bodyColor: 'rgba(255, 255, 255, 0.8)',
                            padding: 12,
                            borderColor: 'rgba(255,255,255,0.1)',
                            borderWidth: 1
                        }
                    }
                }
            });
        }
    }
});
