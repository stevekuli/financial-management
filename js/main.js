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

        // 点击链接后关闭菜单
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

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

    // 观察所有需要动画的元素
    document.querySelectorAll('.card, .content-block, .mistake-card, .glossary-item').forEach(el => {
        observer.observe(el);
    });

    // ---- 导航栏高亮当前页面 ----
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === currentPage);
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
