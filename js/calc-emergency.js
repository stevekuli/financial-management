/* 应急金计算器核心逻辑 */

document.addEventListener('DOMContentLoaded', () => {
    const monthlyExpInput = document.getElementById('monthlyExp');
    const jobTypeSelect = document.getElementById('jobType');
    const burdenChecks = document.querySelectorAll('input[name="burden"]');
    const calcBtn = document.getElementById('calcBtn');

    const totalExpEl = document.getElementById('totalExp');
    const monthCountEl = document.getElementById('monthCount');
    const riskBarEl = document.getElementById('riskBar');
    const riskDescEl = document.getElementById('riskDesc');
    const amtLiquidEl = document.getElementById('amtLiquid');
    const amtStableEl = document.getElementById('amtStable');

    // 初始化计算一次
    calculateEmergency();

    if (calcBtn) {
        calcBtn.addEventListener('click', calculateEmergency);
    }

    // 设置输入监听，动态变化
    [monthlyExpInput, jobTypeSelect].forEach(el => {
        el.addEventListener('change', calculateEmergency);
    });
    burdenChecks.forEach(cb => {
        cb.addEventListener('change', calculateEmergency);
    });

    function calculateEmergency() {
        const monthlyExp = parseFloat(monthlyExpInput.value) || 0;
        const jobType = jobTypeSelect.value;
        
        // 1. 基础月数计算
        let recommendedMonths = 3; // 默认最少储备3个月
        
        // 职业系数调整
        if (jobType === 'normal') recommendedMonths = 4;
        if (jobType === 'volatile') recommendedMonths = 6;
        
        // 家庭负担项额外增加月数
        let burdenCount = 0;
        burdenChecks.forEach(cb => {
            if (cb.checked) {
                burdenCount++;
                if (cb.value === 'child') recommendedMonths += 2;
                if (cb.value === 'mortgage') recommendedMonths += 1;
                if (cb.value === 'medical') recommendedMonths += 3;
            }
        });

        // 限制最大储备月数为 12
        recommendedMonths = Math.min(12, recommendedMonths);

        // 2. 计算总额
        const totalAmount = monthlyExp * recommendedMonths;

        // 3. 风险评分模拟 (0-100)
        // 体制内 + 无负担 = 低风险 (约20%)
        // 自由职业 + 全身负担 = 高风险 (约90%)
        let riskScore = 20;
        if (jobType === 'normal') riskScore += 20;
        if (jobType === 'volatile') riskScore += 40;
        riskScore += burdenCount * 15;
        riskScore = Math.min(100, riskScore);

        // 4. 渲染界面
        totalExpEl.textContent = `¥ ${totalAmount.toLocaleString()}`;
        monthCountEl.textContent = `相当于约 ${recommendedMonths} 个月的月生活支出`;
        
        riskBarEl.style.width = riskScore + '%';
        
        // 描述文字动态更新
        updateRiskDesc(jobType, recommendedMonths);

        // 分配比例建议 (40% 极高流动, 60% 稳健理财)
        const liquid = Math.round(totalAmount * 0.4);
        const stable = totalAmount - liquid;
        amtLiquidEl.textContent = liquid.toLocaleString();
        amtStableEl.textContent = stable.toLocaleString();
    }

    function updateRiskDesc(jobType, months) {
        let text = "";
        if (months <= 4) {
            text = "你的财务状况相对稳健。考虑到职业稳定性，储备 3-6 个月生活费足以应对绝大多数波动。";
        } else if (months <= 8) {
            text = "你的风险敞口处于中等水平。建议储备更多应急资金，以确保在求职空窗期或突发支出时依然保持从容。";
        } else {
            text = "你目前承担的责任较重或职业波动较大，强力建议储备 9-12 个月的“安全垫”，以免在极端环境下影响家庭生活。";
        }
        riskDescEl.textContent = text;
    }
});
