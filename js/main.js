/* ======================================
   投资理财知识分享站 — 全局交互
   作者：程序员柚子
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- 移动端导航菜单 ----
    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        // 点击链接后关闭菜单（仅非下拉链接）
        navLinks.querySelectorAll('a:not(.nav-dropdown-menu a)').forEach(link => {
            // 直接链接点击关闭侧栏
        });
        navLinks.querySelectorAll('.nav-dropdown-menu a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                navLinks.classList.remove('open');
                // 关闭下拉
                link.closest('.nav-dropdown')?.classList.remove('open');
            });
        });
    }

    // ---- 下拉菜单交互 ----
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    const isMobile = () => window.innerWidth <= 768;

    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.nav-dropdown-btn');

        // 点击打开/关闭（移动端和桌面端通用）
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = dropdown.classList.contains('open');

            // 关闭其他下拉
            dropdowns.forEach(d => {
                if (d !== dropdown) d.classList.remove('open');
            });

            dropdown.classList.toggle('open', !isOpen);
        });

        // 桌面端 hover 打开
        if (!isMobile()) {
            dropdown.addEventListener('mouseenter', () => {
                dropdown.classList.add('open');
            });
            dropdown.addEventListener('mouseleave', () => {
                dropdown.classList.remove('open');
            });
        }
    });

    // 点击页面其他区域关闭下拉
    document.addEventListener('click', () => {
        dropdowns.forEach(d => d.classList.remove('open'));
    });

    // ---- 滚动入场动画 ----
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // 为卡片添加依次入场的延迟
                const delay = entry.target.classList.contains('card')
                    ? index * 80
                    : 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 暴露给 render.js 使用
    window._observer = observer;

    // 观察所有需要动画的元素
    document.querySelectorAll('.card, .content-block, .mistake-card, .glossary-item').forEach(el => {
        observer.observe(el);
    });

    // ---- 导航栏滚动效果 ----
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.background = 'rgba(10, 15, 30, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 15, 30, 0.85)';
        }

        lastScroll = currentScroll;
    }, { passive: true });

});
