/* ======================================
   鐞嗚储鍏ラ棬鎸囧崡 鈥?鍐呭娓叉煋寮曟搸
   浠?JSON 鏁版嵁鍔犺浇骞舵覆鏌撻〉闈㈠唴瀹?
   ====================================== */

const Render = (() => {

    /* ---------- 閫氱敤宸ュ叿鍑芥暟 ---------- */

    /** 浠?URL search params 鑾峰彇鎸囧畾 key */
    function getParam(key) {
        return new URLSearchParams(window.location.search).get(key);
    }

    /** 鍔犺浇 JSON 鏁版嵁 */
    async function loadJSON(path) {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
        return res.json();
    }

    /* ---------- 瀵艰埅鏍?HTML 鐢熸垚 ---------- */

    function buildNavHTML(activePage) {
        return `
    <nav class="navbar">
      <div class="container">
        <a href="index.html" class="nav-logo"><span>馃拵</span> 鐞嗚储鍏ラ棬鎸囧崡</a>
        <button class="nav-toggle" aria-label="鑿滃崟"><span></span><span></span><span></span></button>
        <div class="nav-links">
          <a href="index.html" ${activePage === 'index' ? 'class="active"' : ''}>棣栭〉</a>

          <div class="nav-dropdown">
            <button class="nav-dropdown-btn ${activePage === 'category' ? 'active' : ''}">鎶曡祫鍝佺 <span class="dropdown-arrow">鈻?/span></button>
            <div class="nav-dropdown-menu" id="navCategoryMenu">
              <!-- JS 鍔ㄦ€佸～鍏?-->
            </div>
          </div>

          <div class="nav-dropdown">
            <button class="nav-dropdown-btn ${activePage === 'tool' ? 'active' : ''}">宸ュ叿 <span class="dropdown-arrow">鈻?/span></button>
            <div class="nav-dropdown-menu" id="navToolMenu">
              <a href="calculator.html">馃М 宸ュ叿绠?/a>
              <!-- JS 鍔ㄦ€佸～鍏?-->
            </div>
          </div>

          <div class="nav-dropdown">
            <button class="nav-dropdown-btn ${activePage === 'learn' ? 'active' : ''}">瀛︿範 <span class="dropdown-arrow">鈻?/span></button>
            <div class="nav-dropdown-menu">
              <a href="glossary.html">馃摉 鎶曡祫鏈琛?/a>
              <a href="mistakes.html">鈿狅笍 鏂版墜閬垮潙鎸囧崡</a>
              <a href="quiz.html">馃И 鎶曡祫椋庢牸娴嬭瘯</a>
            </div>
          </div>
        </div>
      </div>
    </nav>`;
    }

    /** 鍔ㄦ€佸～鍏呭鑸笅鎷夎彍鍗?*/
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

    /* ---------- 鍝佺被椤甸潰娓叉煋 ---------- */

    function renderSection(section) {
        let html = '';

        if (section.type === 'content') {
            html += `<div class="content-block">`;
            html += `<h2>${section.title}</h2>`;

            // 鍓嶇疆 tip
            if (section.tip) {
                html += renderTip(section.tip);
            }

            // 娈佃惤
            if (section.paragraphs) {
                section.paragraphs.forEach(p => {
                    html += `<p>${p}</p>`;
                });
            }

            // 瀛愮珷鑺?
            if (section.subsections) {
                section.subsections.forEach(sub => {
                    html += `<h3>${sub.title}</h3>`;
                    if (sub.text) html += `<p>${sub.text}</p>`;
                    if (sub.list) html += renderList(sub.list);
                    if (sub.afterList) html += `<p>${sub.afterList}</p>`;
                });
            }

            // 鍒楄〃
            if (section.list) {
                html += renderList(section.list);
            }

            // afterList 鏂囨湰
            if (section.afterList) {
                html += `<p>${section.afterList}</p>`;
            }

            // 鍒楄〃鍚?tip
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

    /** 娓叉煋鏁翠釜鍝佺被椤甸潰 */
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
                '<div class="container"><div class="content-block visible"><h2>椤甸潰鏈壘鍒?/h2><p>璇疯繑鍥?<a href="index.html">棣栭〉</a> 閫夋嫨鍏朵粬鏉垮潡銆?/p></div></div>';
            return;
        }

        // 璁剧疆 meta
        document.title = category.meta.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', category.meta.description);

        // 娓叉煋 hero
        document.getElementById('pageIcon').textContent = category.icon;
        document.getElementById('pageTitle').textContent = category.title;
        document.getElementById('pageSubtitle').textContent = category.subtitle;

        // 娓叉煋鍐呭
        let contentHTML = '';
        category.sections.forEach(section => {
            contentHTML += renderSection(section);
        });
        document.getElementById('pageContent').innerHTML = contentHTML;

        // 瑙﹀彂鍔ㄧ敾瑙傚療
        document.querySelectorAll('.content-block').forEach(el => {
            if (window._observer) window._observer.observe(el);
        });
    }

    /* ---------- 鏈椤甸潰娓叉煋 ---------- */

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

        // 瑙﹀彂鍔ㄧ敾
        grid.querySelectorAll('.glossary-item').forEach(el => {
            if (window._observer) window._observer.observe(el);
        });

        // 鎼滅储杩囨护
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

    /* ---------- 宸ュ叿绠卞叆鍙ｆ覆鏌?---------- */

    async function renderToolsHub() {
        const tools = await loadJSON('data/tools.json');
        const grid = document.getElementById('toolsGrid');
        if (!grid) return;

        grid.innerHTML = tools.map(t => `
      <a href="${t.page}" class="card" data-accent="${t.accent}">
        <span class="card-icon">${t.icon}</span>
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <span class="card-arrow">寮€濮嬩娇鐢?鈫?/span>
      </a>
    `).join('');

        // 瑙﹀彂鍔ㄧ敾
        grid.querySelectorAll('.card').forEach(el => {
            if (window._observer) window._observer.observe(el);
        });
    }

    /* ---------- 鍏紑鎺ュ彛 ---------- */

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

window.Render = Render;

