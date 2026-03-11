/* ======================================
   Global interactions and conversion analytics
   ====================================== */

(() => {
    const seenExposureKeys = new Set();

    function getPageName() {
        const file = window.location.pathname.split('/').pop() || 'index.html';
        return file.replace(/\.html$/i, '') || 'index';
    }

    function cleanText(value, maxLength = 80) {
        if (!value) return '';
        return String(value).replace(/\s+/g, ' ').trim().slice(0, maxLength);
    }

    function sanitizeData(data) {
        const result = {};
        Object.entries(data || {}).forEach(([key, value]) => {
            if (value === undefined) return;
            if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) {
                result[key] = value;
            }
        });
        return result;
    }

    function track(name, data = {}) {
        if (typeof window.va !== 'function') return;

        const payload = sanitizeData({ page: getPageName(), ...data });

        try {
            if (Object.keys(payload).length > 0) {
                window.va('event', { name, data: payload });
            } else {
                window.va('event', { name });
            }
        } catch (error) {
            console.warn('analytics track failed', error);
        }
    }

    function trackOnce(key, name, data = {}) {
        if (seenExposureKeys.has(key)) return;
        seenExposureKeys.add(key);
        track(name, data);
    }

    function inferCardGroup(card) {
        const href = card.getAttribute('href') || '';
        if (href.includes('quiz.html')) return 'quiz';
        if (href.includes('category.html')) return 'category';
        if (href.includes('glossary.html') || href.includes('mistakes.html')) return 'learn';
        if (href.includes('fund-group.html')) return 'group';
        return 'tool';
    }

    const unifiedCtaCopy = {
        calculator: {
            badge: '\uD83E\uDDEE \u7B97\u5B8C\u4E4B\u540E\uFF0C\u4E0B\u4E00\u6B65\u66F4\u91CD\u8981',
            title: '\u52A0\u7FA4\uFF0C\u628A\u590D\u5229\u76EE\u6807\u53D8\u6210\u53EF\u6267\u884C\u7684\u8BA1\u5212',
            description: '\u7B97\u6E05\u7ED3\u679C\u53EA\u662F\u7B2C\u4E00\u6B65\uFF0C\u66F4\u5173\u952E\u7684\u662F\u628A\u6295\u5165\u8282\u594F\u548C\u8D44\u4EA7\u914D\u7F6E\u843D\u4E0B\u6765\u3002\u7FA4\u91CC\u4F1A\u7EE7\u7EED\u804A\u8D44\u4EA7\u914D\u7F6E\u3001\u5B9A\u6295\u8282\u594F\u548C\u65B0\u624B\u5E38\u89C1\u95EE\u9898\u3002<br>\u626B\u7801\u52A0\u5FAE\u4FE1\uFF0C\u5907\u6CE8\u300C\u57FA\u91D1\u7FA4\u300D\u5373\u53EF\u3002',
            hint: '\u52A0\u597D\u53CB\u540E\u5907\u6CE8\u300C\u57FA\u91D1\u7FA4\u300D\uFF0C\u6211\u4F1A\u62C9\u4F60\u8FDB\u6765'
        },
        'calc-compound': {
            badge: '\uD83D\uDCC8 \u770B\u5230\u957F\u671F\u5DEE\u8DDD\u4E86\uFF1F',
            title: '\u52A0\u7FA4\uFF0C\u628A\u590D\u5229\u601D\u8DEF\u53D8\u6210\u53EF\u6267\u884C\u7684\u8BA1\u5212',
            description: '\u590D\u5229\u6700\u6015\u7684\u4E0D\u662F\u6536\u76CA\u7387\u4F4E\uFF0C\u800C\u662F\u4E2D\u9014\u65AD\u6389\u3002\u7FA4\u91CC\u4F1A\u7EE7\u7EED\u804A\u8D44\u4EA7\u914D\u7F6E\u3001\u5B9A\u6295\u8282\u594F\u548C\u65B0\u624B\u5E38\u89C1\u95EE\u9898\u3002<br>\u626B\u7801\u52A0\u5FAE\u4FE1\uFF0C\u5907\u6CE8\u300C\u57FA\u91D1\u7FA4\u300D\u5373\u53EF\u3002',
            hint: '\u52A0\u597D\u53CB\u540E\u5907\u6CE8\u300C\u57FA\u91D1\u7FA4\u300D\uFF0C\u6211\u4F1A\u62C9\u4F60\u8FDB\u6765'
        },
        'calc-dca': {
            badge: '\uD83D\uDCC5 \u5B9A\u6295\u7ED3\u679C\u7B97\u51FA\u6765\u4E86\uFF1F',
            title: '\u52A0\u7FA4\uFF0C\u628A\u5B9A\u6295\u601D\u8DEF\u53D8\u6210\u53EF\u6267\u884C\u7684\u8BA1\u5212',
            description: '\u4F1A\u7B97\u5B9A\u6295\u53EA\u662F\u8D77\u70B9\uFF0C\u66F4\u91CD\u8981\u7684\u662F\u628A\u8282\u594F\u3001\u4ED3\u4F4D\u548C\u575A\u6301\u673A\u5236\u5B9A\u4E0B\u6765\u3002\u7FA4\u91CC\u4F1A\u7EE7\u7EED\u804A\u8D44\u4EA7\u914D\u7F6E\u3001\u5B9A\u6295\u8282\u594F\u548C\u65B0\u624B\u5E38\u89C1\u95EE\u9898\u3002<br>\u626B\u7801\u52A0\u5FAE\u4FE1\uFF0C\u5907\u6CE8\u300C\u57FA\u91D1\u7FA4\u300D\u5373\u53EF\u3002',
            hint: '\u52A0\u597D\u53CB\u540E\u5907\u6CE8\u300C\u57FA\u91D1\u7FA4\u300D\uFF0C\u6211\u4F1A\u62C9\u4F60\u8FDB\u6765'
        },
        'dca-planner': {
            badge: '\uD83D\uDCCC \u8BA1\u5212\u6709\u4E86\uFF0C\u6267\u884C\u66F4\u5173\u952E',
            title: '\u52A0\u7FA4\uFF0C\u628A\u5B9A\u6295\u8BA1\u5212\u53D8\u6210\u53EF\u6267\u884C\u7684\u8282\u594F',
            description: '\u8BA1\u5212\u505A\u51FA\u6765\u4EE5\u540E\uFF0C\u66F4\u5173\u952E\u7684\u662F\u957F\u671F\u6267\u884C\u548C\u590D\u76D8\u3002\u7FA4\u91CC\u4F1A\u7EE7\u7EED\u804A\u8D44\u4EA7\u914D\u7F6E\u3001\u5B9A\u6295\u8282\u594F\u548C\u65B0\u624B\u5E38\u89C1\u95EE\u9898\u3002<br>\u626B\u7801\u52A0\u5FAE\u4FE1\uFF0C\u5907\u6CE8\u300C\u57FA\u91D1\u7FA4\u300D\u5373\u53EF\u3002',
            hint: '\u52A0\u597D\u53CB\u540E\u5907\u6CE8\u300C\u57FA\u91D1\u7FA4\u300D\uFF0C\u6211\u4F1A\u62C9\u4F60\u8FDB\u6765'
        },
        'calc-inflation': {
            badge: '\uD83D\uDCB8 \u770B\u61C2\u901A\u80C0\u4E4B\u540E',
            title: '\u52A0\u7FA4\uFF0C\u628A\u6297\u901A\u80C0\u601D\u8DEF\u53D8\u6210\u53EF\u6267\u884C\u7684\u8BA1\u5212',
            description: '\u610F\u8BC6\u5230\u901A\u80C0\u538B\u529B\u4E4B\u540E\uFF0C\u66F4\u91CD\u8981\u7684\u662F\u628A\u8D44\u4EA7\u914D\u7F6E\u505A\u8D77\u6765\u3002\u7FA4\u91CC\u4F1A\u7EE7\u7EED\u804A\u8D44\u4EA7\u914D\u7F6E\u3001\u5B9A\u6295\u8282\u594F\u548C\u65B0\u624B\u5E38\u89C1\u95EE\u9898\u3002<br>\u626B\u7801\u52A0\u5FAE\u4FE1\uFF0C\u5907\u6CE8\u300C\u57FA\u91D1\u7FA4\u300D\u5373\u53EF\u3002',
            hint: '\u52A0\u597D\u53CB\u540E\u5907\u6CE8\u300C\u57FA\u91D1\u7FA4\u300D\uFF0C\u6211\u4F1A\u62C9\u4F60\u8FDB\u6765'
        },
        'calc-mortgage': {
            badge: '\uD83C\uDFE0 \u623F\u8D37\u7B97\u6E05\u4E4B\u540E',
            title: '\u52A0\u7FA4\uFF0C\u628A\u73B0\u91D1\u6D41\u5B89\u6392\u53D8\u6210\u53EF\u6267\u884C\u7684\u8BA1\u5212',
            description: '\u7B97\u6E05\u623F\u8D37\u53EA\u662F\u7B2C\u4E00\u6B65\uFF0C\u66F4\u91CD\u8981\u7684\u662F\u628A\u5BB6\u5EAD\u73B0\u91D1\u6D41\u548C\u6295\u8D44\u8282\u594F\u4E00\u8D77\u7406\u987A\u3002\u7FA4\u91CC\u4F1A\u7EE7\u7EED\u804A\u8D44\u4EA7\u914D\u7F6E\u3001\u5B9A\u6295\u8282\u594F\u548C\u65B0\u624B\u5E38\u89C1\u95EE\u9898\u3002<br>\u626B\u7801\u52A0\u5FAE\u4FE1\uFF0C\u5907\u6CE8\u300C\u57FA\u91D1\u7FA4\u300D\u5373\u53EF\u3002',
            hint: '\u52A0\u597D\u53CB\u540E\u5907\u6CE8\u300C\u57FA\u91D1\u7FA4\u300D\uFF0C\u6211\u4F1A\u62C9\u4F60\u8FDB\u6765'
        }
    };
    function applyUnifiedCtaCopy() {
        const config = unifiedCtaCopy[getPageName()];
        if (!config) return;

        const cta = document.querySelector('.wechat-cta');
        if (!cta) return;

        const badge = cta.querySelector('.wechat-cta-badge');
        const title = cta.querySelector('.wechat-cta-title');
        const desc = cta.querySelector('.wechat-cta-desc');
        const hint = cta.querySelector('.wechat-cta-hint');

        if (badge) badge.textContent = config.badge;
        if (title) title.textContent = config.title;
        if (desc) desc.innerHTML = config.description;
        if (hint) hint.textContent = config.hint;
    }

    function setupConversionTracking() {
        const heroCta = document.querySelector('.cta-button');
        if (heroCta) {
            heroCta.addEventListener('click', () => {
                track('hero_cta_click', {
                    destination: heroCta.getAttribute('href') || '',
                    label: cleanText(heroCta.textContent)
                });
            });
        }

        document.addEventListener('click', (event) => {
            const resultLink = event.target.closest('.result-link-card');
            if (resultLink) {
                track('result_link_click', {
                    href: resultLink.getAttribute('href') || '',
                    title: cleanText(resultLink.querySelector('.result-link-title')?.textContent)
                });
                return;
            }

            const card = event.target.closest('.card');
            if (card) {
                const surface = card.closest('#homeCardsGrid')
                    ? 'home_grid'
                    : card.closest('#toolsGrid')
                        ? 'tools_grid'
                        : 'content';

                track('card_click', {
                    href: card.getAttribute('href') || '',
                    title: cleanText(card.querySelector('h3')?.textContent),
                    group: inferCardGroup(card),
                    surface
                });
                return;
            }

            const calcButton = event.target.closest('.calc-btn');
            if (calcButton) {
                track('tool_calculate_click', {
                    label: cleanText(calcButton.textContent)
                });
                return;
            }

            const detailButton = event.target.closest('.detail-toggle-btn');
            if (detailButton) {
                track('tool_detail_toggle', {
                    label: cleanText(detailButton.textContent)
                });
                return;
            }

            const groupCta = event.target.closest('.wechat-cta');
            if (groupCta) {
                track('group_cta_click', {
                    area: event.target.closest('.wechat-cta-qr') ? 'qr' : 'body',
                    title: cleanText(groupCta.querySelector('.wechat-cta-title')?.textContent)
                });
            }
        });

        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (!entry.isIntersecting) return;

                const cta = entry.target;
                const title = cleanText(cta.querySelector('.wechat-cta-title')?.textContent);
                trackOnce(`cta:${getPageName()}:${index}:${title}`, 'group_cta_exposed', { title });
            });
        }, { threshold: 0.45 });

        document.querySelectorAll('.wechat-cta').forEach((cta) => ctaObserver.observe(cta));
    }

    window.SiteAnalytics = {
        track,
        trackOnce,
        getPageName,
        cleanText
    };

    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (toggle && navLinks) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                navLinks.classList.toggle('open');
            });

            navLinks.querySelectorAll('.nav-dropdown-menu a').forEach((link) => {
                link.addEventListener('click', () => {
                    toggle.classList.remove('active');
                    navLinks.classList.remove('open');
                    link.closest('.nav-dropdown')?.classList.remove('open');
                });
            });
        }

        const dropdowns = document.querySelectorAll('.nav-dropdown');
        const isMobile = () => window.innerWidth <= 768;

        dropdowns.forEach((dropdown) => {
            const button = dropdown.querySelector('.nav-dropdown-btn');
            if (!button) return;

            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const isOpen = dropdown.classList.contains('open');

                dropdowns.forEach((item) => {
                    if (item !== dropdown) item.classList.remove('open');
                });

                dropdown.classList.toggle('open', !isOpen);
            });

            if (!isMobile()) {
                dropdown.addEventListener('mouseenter', () => {
                    dropdown.classList.add('open');
                });
                dropdown.addEventListener('mouseleave', () => {
                    dropdown.classList.remove('open');
                });
            }
        });

        document.addEventListener('click', () => {
            dropdowns.forEach((dropdown) => dropdown.classList.remove('open'));
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (!entry.isIntersecting) return;

                const delay = entry.target.classList.contains('card') ? index * 80 : 0;
                window.setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            });
        }, observerOptions);

        window._observer = observer;

        document.querySelectorAll('.card, .content-block, .mistake-card, .glossary-item').forEach((element) => {
            observer.observe(element);
        });

        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 50) {
                    navbar.style.background = 'rgba(10, 15, 30, 0.95)';
                } else {
                    navbar.style.background = 'rgba(10, 15, 30, 0.85)';
                }
            }, { passive: true });
        }

        applyUnifiedCtaCopy();
        setupConversionTracking();
    });
})();