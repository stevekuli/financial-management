const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'data', 'categories.json');
const categories = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

const newCategories = [
    {
        "id": "bond",
        "title": "债券市场",
        "icon": "📜",
        "accent": "blue",
        "subtitle": "比存款收益高，比股票风险低，资产配置的稳定器",
        "description": "了解国债、企业债的投资逻辑，以及为何机构投资者都偏爱债券",
        "meta": {
            "title": "债券投资 — 理财入门指南",
            "description": "债券入门：国债、可转债、企业债基础知识与投资方式"
        },
        "sections": [
            {
                "type": "content",
                "title": "什么是债券？",
                "paragraphs": [
                    "债券（Bond）本质上就是一张<strong>借条</strong>。政府、企业为了借钱，向投资者发行债券，承诺在固定时间支付利息，并在到期时偿还本金。",
                    "相对于股票的\"当股东\"，买债券就是\"当债主\"。因此其收益相对固定，风险更低。"
                ]
            },
            {
                "type": "table",
                "title": "常见债券类型",
                "headers": ["类型", "发行主体", "风险", "收益特点"],
                "rows": [
                    ["<strong>国债</strong>", "国家财政部", "<span class=\"tag tag-green\">极低</span>", "最为安全，收益通常高于同期定期存款。"],
                    ["<strong>地方债</strong>", "地方政府", "<span class=\"tag tag-green\">低</span>", "安全性较高，收益略高于国债。"],
                    ["<strong>企业债/公司债</strong>", "各类企业", "<span class=\"tag tag-blue\">中等</span>", "风险视企业信用而定，收益较高。"],
                    ["<strong>可转债</strong>", "上市公司", "<span class=\"tag tag-gold\">中高</span>", "既有债券的保底，又可以转换为股票享受上涨收益，被称为\"下有保底，上不封顶\"。"]
                ]
            },
            {
                "type": "content",
                "title": "普通人如何投资债券？",
                "list": [
                    { "bold": "电子式储蓄国债", "text": "：通过银行网银直接购买，按年付息或到期一次还本付息。适合老年人或极度保守的资金。" },
                    { "bold": "债券基金（推荐）", "text": "：把钱交给基金经理去买一篮子债券。门槛极低（10元起），流动性好，随时可赎回。" },
                    { "bold": "可转债打新", "text": "：通过股票账户参与可转债申购（俗称\"打新债\"），中签率虽低但几乎属于稳定薅羊毛。" }
                ],
                "tipAfterList": {
                    "type": "warning",
                    "title": "⚠️ 注意事项",
                    "text": "债券并不是绝对保本的！如果企业倒闭（违约），公司债可能血本无归。此外，市场利率上升时，已发行的债券价格会下跌。"
                }
            }
        ]
    },
    {
        "id": "crypto",
        "title": "数字货币",
        "icon": "🪙",
        "accent": "orange",
        "subtitle": "游离于传统金融之外的野蛮生长，高收益与极高风险并存",
        "description": "了解比特币、以太坊等加密资产的运作逻辑及风险警告",
        "meta": {
            "title": "数字货币 — 理财入门指南",
            "description": "数字货币与加密资产基础科普，比特币与区块链风险解析"
        },
        "sections": [
            {
                "type": "content",
                "title": "什么是数字货币（加密资产）？",
                "paragraphs": [
                    "数字货币通常指基于<strong>区块链技术</strong>的去中心化虚拟资产。它们不由任何中央银行发行，而是通过密码学原理确保交易安全并控制新单位的创建。",
                    "最具代表性的就是比特币（Bitcoin, BTC）和以太坊（Ethereum, ETH）。"
                ],
                "tip": {
                    "type": "warning",
                    "title": "⚠️ 监管声明",
                    "text": "在中国大陆，相关部门已明确叫停代币发行融资（ICO），并宣布虚拟货币相关业务活动属于非法金融活动。本文仅作为基础知识科普，不鼓励参与相关投机炒作。"
                }
            },
            {
                "type": "table",
                "title": "主流代表资产",
                "headers": ["资产名称", "地位与特点"],
                "rows": [
                    ["<strong>比特币 (BTC)</strong>", "世界上第一种加密货币，被支持者称为\"数字黄金\"，总量恒定 2100 万枚。"],
                    ["<strong>以太坊 (ETH)</strong>", "内置智能合约的区块链平台，是绝大多数去中心化应用（DeFi）、NFT 运行的基础设施。"],
                    ["<strong>稳定币 (USDT/USDC)</strong>", "价格挂钩美元（1:1），用于在剧烈波动的加密市场中作为避险和交易媒介。"]
                ]
            },
            {
                "type": "content",
                "title": "极高的风险",
                "list": [
                    { "bold": "无底层资产支撑", "text": "：其价格完全取决于共识和资金炒作，没有实体经济利润作为支撑。" },
                    { "bold": "剧烈波动", "text": "：单日涨跌 10%-20% 十分常见，历史上比特币曾多次暴跌超过 70%。" },
                    { "bold": "安全风险", "text": "：黑客攻击、交易所跑路、不慎丢失私钥等事件频发，资产一旦丢失无法找回。" },
                    { "bold": "合规风险", "text": "：不同国家和地区监管政策差异巨大，随时面临被封禁的风险。" }
                ]
            }
        ]
    },
    {
        "id": "insurance",
        "title": "保险配置",
        "icon": "🛡️",
        "accent": "green",
        "subtitle": "理财的护城河：先保风险，再求增值",
        "description": "四大基础险种全解析，教你用最少的钱买对保障，拒绝被坑",
        "meta": {
            "title": "保险配置指南 — 理财入门指南",
            "description": "家庭保险配置入门：重疾险、医疗险、意外险、寿险解析"
        },
        "sections": [
            {
                "type": "content",
                "title": "为什么理财要先买保险？",
                "paragraphs": [
                    "投资理财是为了让生活更好，而保险是为了防止生活被改变。一场大病或意外，可能瞬间清空一个家庭所有的理财积蓄。",
                    "建立财务安全网的正确顺序是：<strong>先保障，后投资。</strong>"
                ]
            },
            {
                "type": "table",
                "title": "必买的四大核心险种",
                "headers": ["险种", "解决的问题", "怎么赔", "建议保额"],
                "rows": [
                    ["<strong>重疾险</strong>", "得了大病无法工作时的收入损失、康复费用", "确诊即赔（一笔钱买断）", "家庭年收入的 3-5 倍"],
                    ["<strong>百万医疗险</strong>", "看病住院的高昂医疗费", "凭发票报销（花多少报多少）", "几百块保上百万，无脑买"],
                    ["<strong>意外险</strong>", "突发意外导致的残疾、身故或门诊治疗", "按残疾等级赔 / 发票报销", "年收入的 5-10 倍"],
                    ["<strong>定期寿险</strong>", "家庭经济支柱不幸身故，家人的生活费/房贷", "身故或全残即给付", "覆盖房贷及未来5-10年生活费"]
                ]
            },
            {
                "type": "content",
                "title": "买保险的四大原则",
                "list": [
                    { "bold": "先大人，后小孩", "text": "：大人才是孩子最大的保险。先给承担家庭经济责任的成年人买齐，再考虑老人和小孩。" },
                    { "bold": "保额优先", "text": "：买保险就是买保额！预算有限时，宁可缩短保障期限（如保到 70 岁），也要把保额做高。保额太低起不到转移风险的作用。" },
                    { "bold": "先保障，后理财", "text": "：什么分红险、万能险、教育金，在没有把上述四大基础险种买齐之前，一律不要碰。保障功能越纯粹的保险性价比越高。" },
                    { "bold": "如实告知", "text": "：购买前健康告知环节千万不要隐瞒病史，否则将来一旦出险，保险公司有权拒赔。" }
                ],
                "tipAfterList": {
                    "type": "info",
                    "title": "💡 预算建议",
                    "text": "一个健康家庭的年交总保费，建议控制在家庭年收入的 <strong>5%~10%</strong> 之间，切勿因为买保险给自己造成巨大经济负担。"
                }
            }
        ]
    }
];

categories.push(...newCategories);
fs.writeFileSync(targetPath, JSON.stringify(categories, null, 2));
console.log('Successfully appended Batch B categories!');
