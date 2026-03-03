document.addEventListener('DOMContentLoaded', () => {
    // AOS Init
    AOS.init({
        disableMutationObserver: true,
        once: true,
        offset: 100,
        duration: 800,
        easing: 'ease-out-cubic'
    });

    // Parallax effect with IntersectionObserver for optimization
    const heroSection = document.querySelector('.hero');
    let parallaxScheduled = false;
    let isHeroVisible = true;

    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            isHeroVisible = entries[0].isIntersecting;
        }, { threshold: 0 });

        heroObserver.observe(heroSection);

        document.addEventListener('mousemove', (e) => {
            if (!isHeroVisible) return; // Ignore if hero is not visible

            if (!parallaxScheduled) {
                requestAnimationFrame(() => {
                    const parallaxEls = document.querySelectorAll('.parallax-layer');
                    const x = (e.clientX / window.innerWidth - 0.5) * 15;
                    const y = (e.clientY / window.innerHeight - 0.5) * 15;

                    parallaxEls.forEach(el => {
                        el.style.transform = `translate(${x}px, ${y}px)`;
                    });
                    parallaxScheduled = false;
                });
                parallaxScheduled = true;
            }
        }, { passive: true });
    }

    // Intersection Observer for Lens AI Features
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -30% 0px',
        threshold: 0
    };

    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('feature-active');
            } else {
                entry.target.classList.remove('feature-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.lens-feature-item').forEach(feature => {
        featureObserver.observe(feature);
    });

    // 3D Tilt Effect for Calculator Mockup
    const tiltCard = document.querySelector('.tilt-3d-card');
    const calcWrapper = document.querySelector('.calc-spotlight-wrapper');

    if (calcWrapper && tiltCard) {
        let tiltScheduled = false;
        let isCalcVisible = true;

        const calcObserver = new IntersectionObserver((entries) => {
            isCalcVisible = entries[0].isIntersecting;
        }, { threshold: 0 });

        calcObserver.observe(calcWrapper);

        calcWrapper.addEventListener('mousemove', (e) => {
            if (!isCalcVisible) return;

            if (!tiltScheduled) {
                requestAnimationFrame(() => {
                    const rect = calcWrapper.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = ((y - centerY) / centerY) * -10;
                    const rotateY = ((x - centerX) / centerX) * 10;

                    tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                    tiltScheduled = false;
                });
                tiltScheduled = true;
            }
        }, { passive: true });

        calcWrapper.addEventListener('mouseleave', () => {
            tiltCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }

    // Interactive Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const indicator = document.querySelector('.tab-indicator');

    if (tabBtns.length > 0 && indicator) {
        // Init indicator
        const activeBtn = document.querySelector('.tab-btn.active');
        if (activeBtn) {
            const isVertical = window.innerWidth <= 768;
            if (isVertical) {
                indicator.style.width = 'calc(100% - 12px)';
                indicator.style.transform = `translateY(${activeBtn.offsetTop - 6}px)`;
            } else {
                indicator.style.width = `${activeBtn.offsetWidth}px`;
                indicator.style.transform = `translateX(${activeBtn.offsetLeft - 6}px)`;
            }
        }

        // Adjust on resize
        window.addEventListener('resize', () => {
            const actBtn = document.querySelector('.tab-btn.active');
            if (actBtn) {
                const isVertical = window.innerWidth <= 768;
                if (isVertical) {
                    indicator.style.width = 'calc(100% - 12px)';
                    indicator.style.transform = `translateY(${actBtn.offsetTop - 6}px)`;
                } else {
                    indicator.style.width = `${actBtn.offsetWidth}px`;
                    indicator.style.transform = `translateX(${actBtn.offsetLeft - 6}px)`;
                }
            }
        });

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const isVertical = window.innerWidth <= 768;

                if (isVertical) {
                    indicator.style.width = 'calc(100% - 12px)';
                    indicator.style.transform = `translateY(${btn.offsetTop - 6}px)`;
                } else {
                    indicator.style.width = `${btn.offsetWidth}px`;
                    indicator.style.transform = `translateX(${btn.offsetLeft - 6}px)`;
                }

                const targetId = btn.getAttribute('data-target');
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    if (pane.id === targetId) {
                        pane.classList.add('active');
                    }
                });
            });
        });
    }
});
