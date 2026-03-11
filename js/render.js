/* ======================================
   Shared content rendering helpers
   ====================================== */

const Render = (() => {
    function getParam(key) {
        return new URLSearchParams(window.location.search).get(key);
    }

    async function loadJSON(path) {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`Failed to load ${path}: ${response.status}`);
        }
        return response.json();
    }

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
            <div class="nav-dropdown-menu" id="navCategoryMenu"></div>
          </div>

          <div class="nav-dropdown">
            <button class="nav-dropdown-btn ${activePage === 'tool' ? 'active' : ''}">工具 <span class="dropdown-arrow">▾</span></button>
            <div class="nav-dropdown-menu" id="navToolMenu">
              <a href="calculator.html">🧮 工具箱</a>
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

    async function populateNavMenus() {
        try {
            const [categories, tools] = await Promise.all([
                loadJSON('data/categories.json'),
                loadJSON('data/tools.json')
            ]);

            const categoryMenu = document.getElementById('navCategoryMenu');
            if (categoryMenu) {
                categoryMenu.innerHTML = categories
                    .map((category) => `<a href="category.html?id=${category.id}">${category.icon} ${category.title}</a>`)
                    .join('');
            }

            const toolMenu = document.getElementById('navToolMenu');
            if (toolMenu) {
                const baseLinks = toolMenu.innerHTML;
                toolMenu.innerHTML = baseLinks + tools
                    .map((tool) => `<a href="${tool.page}">${tool.icon} ${tool.title}</a>`)
                    .join('');
            }
        } catch (error) {
            console.warn('nav menus fallback to static content', error);
        }
    }

    function renderTip(tip) {
        const typeClass = tip.type === 'warning'
            ? ' warning'
            : tip.type === 'info'
                ? ' info'
                : '';

        return `
      <div class="tip-box${typeClass}">
        <div class="tip-title">${tip.title}</div>
        <p>${tip.text}</p>
      </div>`;
    }

    function renderList(items) {
        let html = '<ul>';
        items.forEach((item) => {
            if (item.bold) {
                html += `<li><strong>${item.bold}</strong>${item.text}</li>`;
            } else {
                html += `<li>${item.text}</li>`;
            }
        });
        html += '</ul>';
        return html;
    }

    function renderSection(section) {
        let html = '';

        if (section.type === 'content') {
            html += '<div class="content-block">';
            html += `<h2>${section.title}</h2>`;

            if (section.tip) {
                html += renderTip(section.tip);
            }

            if (section.paragraphs) {
                section.paragraphs.forEach((paragraph) => {
                    html += `<p>${paragraph}</p>`;
                });
            }

            if (section.subsections) {
                section.subsections.forEach((subsection) => {
                    html += `<h3>${subsection.title}</h3>`;
                    if (subsection.text) html += `<p>${subsection.text}</p>`;
                    if (subsection.list) html += renderList(subsection.list);
                    if (subsection.afterList) html += `<p>${subsection.afterList}</p>`;
                });
            }

            if (section.list) {
                html += renderList(section.list);
            }

            if (section.afterList) {
                html += `<p>${section.afterList}</p>`;
            }

            if (section.tipAfterList) {
                html += renderTip(section.tipAfterList);
            }

            html += '</div>';
        }

        if (section.type === 'table') {
            html += '<div class="content-block">';
            html += `<h2>${section.title}</h2>`;

            if (section.intro) {
                html += `<p>${section.intro}</p>`;
            }

            html += '<table class="compare-table"><thead><tr>';
            section.headers.forEach((header) => {
                html += `<th>${header}</th>`;
            });
            html += '</tr></thead><tbody>';

            section.rows.forEach((row) => {
                html += '<tr>';
                row.forEach((cell) => {
                    html += `<td>${cell}</td>`;
                });
                html += '</tr>';
            });

            html += '</tbody></table>';

            if (section.footnote) {
                html += `<p style="margin-top: var(--space-md); color: var(--text-muted); font-size: 0.85rem;">${section.footnote}</p>`;
            }

            if (section.tip) {
                html += renderTip(section.tip);
            }

            html += '</div>';
        }

        return html;
    }

    async function renderCategoryPage() {
        const id = getParam('id');
        if (!id) {
            window.location.href = 'index.html';
            return;
        }

        const categories = await loadJSON('data/categories.json');
        const category = categories.find((item) => item.id === id);

        if (!category) {
            document.getElementById('pageContent').innerHTML =
                '<div class="container"><div class="content-block visible"><h2>页面未找到</h2><p>请返回 <a href="index.html">首页</a> 选择其他板块。</p></div></div>';
            return;
        }

        document.title = category.meta.title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', category.meta.description);
        }

        document.getElementById('pageIcon').textContent = category.icon;
        document.getElementById('pageTitle').textContent = category.title;
        document.getElementById('pageSubtitle').textContent = category.subtitle;

        const pageContent = category.sections.map(renderSection).join('');
        document.getElementById('pageContent').innerHTML = pageContent;

        document.querySelectorAll('.content-block').forEach((element) => {
            if (window._observer) {
                window._observer.observe(element);
            }
        });
    }

    async function renderGlossaryPage() {
        const terms = await loadJSON('data/terms.json');
        const grid = document.getElementById('glossaryGrid');
        if (!grid) return;

        grid.innerHTML = terms.map((term) => `
      <div class="glossary-item" data-term="${term.keywords}">
        <div class="term">${term.term}</div>
        <div class="definition">${term.definition}</div>
      </div>
    `).join('');

        grid.querySelectorAll('.glossary-item').forEach((element) => {
            if (window._observer) {
                window._observer.observe(element);
            }
        });

        const searchInput = document.getElementById('glossarySearch');
        if (searchInput) {
            searchInput.addEventListener('input', (event) => {
                const query = event.target.value.toLowerCase().trim();
                grid.querySelectorAll('.glossary-item').forEach((item) => {
                    const keywordText = item.getAttribute('data-term').toLowerCase();
                    const definitionText = item.querySelector('.definition').textContent.toLowerCase();
                    item.style.display = (keywordText.includes(query) || definitionText.includes(query)) ? '' : 'none';
                });
            });
        }
    }

    async function renderToolsHub() {
        const tools = await loadJSON('data/tools.json');
        const grid = document.getElementById('toolsGrid');
        if (!grid) return;

        grid.innerHTML = tools.map((tool) => `
      <a href="${tool.page}" class="card" data-accent="${tool.accent}" data-card-kind="tool">
        <span class="card-icon">${tool.icon}</span>
        <h3>${tool.title}</h3>
        <p>${tool.description}</p>
        <span class="card-arrow">开始使用 →</span>
      </a>
    `).join('');

        grid.querySelectorAll('.card').forEach((element) => {
            if (window._observer) {
                window._observer.observe(element);
            }
        });
    }

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