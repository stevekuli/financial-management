/* ======================================
   理财入门指南 — 内容渲染引擎
   从 JSON 数据加载并渲染页面内容
   ====================================== */

const Render = (() => {

    /* ---------- 通用工具函数 ---------- */

    /** 从 URL search params 获取指定 key */
    function getParam(key) {
        return new URLSearchParams(window.location.search).get(key);
    }

    /** 加载 JSON 数据 */
    async function loadJSON(path) {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
        return res.json();
    }

    /* ---------- 导航栏 HTML 生成 ---------- */

    function buildNavHTML(activePage) {
        return `
    <nav class="navbar">
      <div class="container">
        <a href="index.html" class="nav-logo"><span>💎</span> 理财入门指南</a>
        <button class="nav-toggle" aria-label="菜单"><span></span><span></span><span></span></button>
        <div class="nav-links">
          <a href="index.html" ${activePage === 'index' ? 'class="active"' : ''}>首页</a>

          <div class="nav-dropdown">
            <button class="nav-dropdown-btn ${activePage === 'category' ? 'active' : ''}">投资品种 <span class="dropdown-arrow">▾</span></button>
            <div class="nav-dropdown-menu" id="navCategoryMenu">
              <!-- JS 动态填充 -->
            </div>
          </div>

          <div class="nav-dropdown">
            <button class="nav-dropdown-btn ${activePage === 'tool' ? 'active' : ''}">工具 <span class="dropdown-arrow">▾</span></button>
            <div class="nav-dropdown-menu" id="navToolMenu">
              <a href="calculator.html">🧮 工具箱</a>
              <!-- JS 动态填充 -->
            </div>
          </div>

          <div class="nav-dropdown">
            <button class="nav-dropdown-btn ${activePage === 'learn' ? 'active' : ''}">学习 <span class="dropdown-arrow">▾</span></button>
            <div class="nav-dropdown-menu">
              <a href="glossary.html">📖 投资术语表</a>
              <a href="mistakes.html">⚠️ 新手避坑指南</a>
              <a href="quiz.html">🧪 投资风格测试</a>
            </div>
          </div>
        </div>
      </div>
    </nav>`;
    }

    /** 动态填充导航下拉菜单 */
    async function populateNavMenus() {
        try {
            const [categories, tools] = await Promise.all([
                loadJSON('data/categories.json?v=' + Date.now()),
                loadJSON('data/tools.json?v=' + Date.now())
            ]);

            const catMenu = document.getElementById('navCategoryMenu');
            if (catMenu) {
                catMenu.innerHTML = categories.map(c =>
                    `<a href="category.html?id=${c.id}">${c.icon} ${c.title}</a>`
                ).join('');
            }

            const toolMenu = document.getElementById('navToolMenu');
            if (toolMenu) {
                const existingLinks = toolMenu.innerHTML;
                toolMenu.innerHTML = existingLinks + tools.map(t =>
                    `<a href="${t.page}">${t.icon} ${t.title}</a>`
                ).join('');
            }
        } catch (e) {
            console.warn('nav menus: fallback to static', e);
        }
    }

    /* ---------- 品类页面渲染 ---------- */

    function renderSection(section) {
        let html = '';

        if (section.type === 'content') {
            html += `<div class="content-block">`;
            html += `<h2>${section.title}</h2>`;

            // 前置 tip
            if (section.tip) {
                html += renderTip(section.tip);
            }

            // 段落
            if (section.paragraphs) {
                section.paragraphs.forEach(p => {
                    html += `<p>${p}</p>`;
                });
            }

            // 子章节
            if (section.subsections) {
                section.subsections.forEach(sub => {
                    html += `<h3>${sub.title}</h3>`;
                    if (sub.text) html += `<p>${sub.text}</p>`;
                    if (sub.list) html += renderList(sub.list);
                    if (sub.afterList) html += `<p>${sub.afterList}</p>`;
                });
            }

            // 列表
            if (section.list) {
                html += renderList(section.list);
            }

            // afterList 文本
            if (section.afterList) {
                html += `<p>${section.afterList}</p>`;
            }

            // 列表后 tip
            if (section.tipAfterList) {
                html += renderTip(section.tipAfterList);
            }

            html += `</div>`;
        }

        if (section.type === 'table') {
            html += `<div class="content-block">`;
            html += `<h2>${section.title}</h2>`;

            if (section.intro) {
                html += `<p>${section.intro}</p>`;
            }

            html += `<table class="compare-table"><thead><tr>`;
            section.headers.forEach(h => { html += `<th>${h}</th>`; });
            html += `</tr></thead><tbody>`;
            section.rows.forEach(row => {
                html += `<tr>`;
                row.forEach(cell => { html += `<td>${cell}</td>`; });
                html += `</tr>`;
            });
            html += `</tbody></table>`;

            if (section.footnote) {
                html += `<p style="margin-top: var(--space-md); color: var(--text-muted); font-size: 0.85rem;">${section.footnote}</p>`;
            }

            if (section.tip) {
                html += renderTip(section.tip);
            }

            html += `</div>`;
        }

        return html;
    }

    function renderTip(tip) {
        const typeClass = tip.type === 'warning' ? ' warning' : tip.type === 'info' ? ' info' : '';
        return `
      <div class="tip-box${typeClass}">
        <div class="tip-title">${tip.title}</div>
        <p>${tip.text}</p>
      </div>`;
    }

    function renderList(items) {
        let html = '<ul>';
        items.forEach(item => {
            if (item.bold) {
                html += `<li><strong>${item.bold}</strong>${item.text}</li>`;
            } else {
                html += `<li>${item.text}</li>`;
            }
        });
        html += '</ul>';
        return html;
    }

    /** 渲染整个品类页面 */
    async function renderCategoryPage() {
        const id = getParam('id');
        if (!id) {
            window.location.href = 'index.html';
            return;
        }

        const categories = await loadJSON('data/categories.json');
        const category = categories.find(c => c.id === id);

        if (!category) {
            document.getElementById('pageContent').innerHTML =
                '<div class="container"><div class="content-block visible"><h2>页面未找到</h2><p>请返回 <a href="index.html">首页</a> 选择其他板块。</p></div></div>';
            return;
        }

        // 设置 meta
        document.title = category.meta.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', category.meta.description);

        // 渲染 hero
        document.getElementById('pageIcon').textContent = category.icon;
        document.getElementById('pageTitle').textContent = category.title;
        document.getElementById('pageSubtitle').textContent = category.subtitle;

        // 渲染内容
        let contentHTML = '';
        category.sections.forEach(section => {
            contentHTML += renderSection(section);
        });
        document.getElementById('pageContent').innerHTML = contentHTML;

        // 触发动画观察
        document.querySelectorAll('.content-block').forEach(el => {
            if (window._observer) window._observer.observe(el);
        });
    }

    /* ---------- 术语页面渲染 ---------- */

    async function renderGlossaryPage() {
        const terms = await loadJSON('data/terms.json');
        const grid = document.getElementById('glossaryGrid');
        if (!grid) return;

        grid.innerHTML = terms.map(t => `
      <div class="glossary-item" data-term="${t.keywords}">
        <div class="term">${t.term}</div>
        <div class="definition">${t.definition}</div>
      </div>
    `).join('');

        // 触发动画
        grid.querySelectorAll('.glossary-item').forEach(el => {
            if (window._observer) window._observer.observe(el);
        });

        // 搜索过滤
        const searchInput = document.getElementById('glossarySearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                grid.querySelectorAll('.glossary-item').forEach(item => {
                    const term = item.getAttribute('data-term').toLowerCase();
                    const def = item.querySelector('.definition').textContent.toLowerCase();
                    item.style.display = (term.includes(query) || def.includes(query)) ? '' : 'none';
                });
            });
        }
    }

    /* ---------- 工具箱入口渲染 ---------- */

    async function renderToolsHub() {
        const tools = await loadJSON('data/tools.json');
        const grid = document.getElementById('toolsGrid');
        if (!grid) return;

        grid.innerHTML = tools.map(t => `
      <a href="${t.page}" class="card" data-accent="${t.accent}">
        <span class="card-icon">${t.icon}</span>
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <span class="card-arrow">开始使用 →</span>
      </a>
    `).join('');

        // 触发动画
        grid.querySelectorAll('.card').forEach(el => {
            if (window._observer) window._observer.observe(el);
        });
    }

    /* ---------- 公开接口 ---------- */

    return {
        getParam,
        loadJSON,
        buildNavHTML,
        populateNavMenus,
        renderCategoryPage,
        renderGlossaryPage,
        renderToolsHub
    };

})();
