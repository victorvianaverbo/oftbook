document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // AOS Init
    // =========================================================================
    AOS.init({
        disableMutationObserver: true,
        once: true,
        offset: 100,
        duration: 800,
        easing: 'ease-out-cubic'
    });

    // =========================================================================
    // CAROUSEL — Split layout with iPhone mockup
    // =========================================================================
    const slideData = [
        { title: 'Página Inicial', subtitle: 'Tudo ao Alcance dos Seus Dedos', desc: 'Acesse rapidamente a Lens AI, perguntas rápidas, condutas e todas as ferramentas do Oftbook direto da tela inicial. Interface intuitiva pensada para o dia a dia do oftalmologista.' },
        { title: 'Inteligência Artificial', subtitle: 'Lens AI — IA Especializada em Oftalmologia', desc: 'Faça perguntas clínicas complexas e receba respostas detalhadas com protocolos de tratamento, posologias e referências bibliográficas. Treinada exclusivamente com literatura oftalmológica.' },
        { title: 'Calculadoras Clínicas', subtitle: '8+ Calculadoras Especializadas', desc: 'Glaucoma OHTS, Acuidade Visual, PIO/Lasik, Hidroxicloroquina, PIO/Paquimetria, Trauma Ocular, Ishihara e Equiascopia. Resultados precisos com faixas de referência integradas.' },
        { title: 'Condutas Clínicas', subtitle: '300+ Protocolos Atualizados', desc: 'Condutas completas com manejo inicial, investigação diagnóstica e tratamento farmacológico. Organizadas por especialidade para acesso rápido no plantão ou consultório.' },
        { title: 'Tratamento Detalhado', subtitle: 'Protocolos Farmacológicos Completos', desc: 'Cada conduta inclui tratamento farmacológico detalhado com doses, frequências, critérios de gravidade e orientações de manejo.' },
        { title: 'Ferramentas', subtitle: 'Tudo em Um Só Lugar', desc: 'Condutas, Angiografia Fluoresceínica, Lentes de Contato, Bulário, Guia Cirúrgico, Videoaulas e Guias especializados de Retinopatia Diabética e Edema Macular Diabético.' },
        { title: 'Códigos e Classificações', subtitle: 'CID-10, CID-11 e Classificações', desc: 'Acesso rápido a todos os códigos e classificações oftalmológicas organizados de forma prática. Busca inteligente para encontrar o código certo em segundos.' },
        { title: 'Atlas de Imagens', subtitle: 'Referência Visual Clínica', desc: 'Imagens clínicas detalhadas organizadas por patologia para apoio diagnóstico. Visualize achados oftalmológicos reais com descrições e classificações integradas.' }
    ];

    const carouselTrack = document.getElementById('carousel-track');
    const carouselSlides = carouselTrack ? carouselTrack.querySelectorAll('.carousel-slide') : [];
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const counterBadge = document.getElementById('counter-badge');
    const slideTitle = document.getElementById('slide-title');
    const slideSubtitle = document.getElementById('slide-subtitle');
    const slideDesc = document.getElementById('slide-desc');
    const dots = document.querySelectorAll('.carousel-dot');
    const autoToggle = document.getElementById('auto-toggle');

    let currentSlide = 0;
    const totalSlides = slideData.length;
    let autoPlayInterval;
    let autoPlaying = true;

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentSlide = index;

        // Move track
        if (carouselTrack) {
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        }

        // Update text
        const data = slideData[currentSlide];
        if (counterBadge) counterBadge.textContent = `${currentSlide + 1}/${totalSlides}`;
        if (slideTitle) slideTitle.textContent = data.title;
        if (slideSubtitle) slideSubtitle.textContent = data.subtitle;
        if (slideDesc) slideDesc.textContent = data.desc;

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
        autoPlaying = true;
        if (autoToggle) autoToggle.innerHTML = '&#9646;&#9646; Auto';
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlaying = false;
        if (autoToggle) autoToggle.innerHTML = '&#9654; Auto';
    }

    function resetAutoPlay() {
        if (autoPlaying) { clearInterval(autoPlayInterval); startAutoPlay(); }
    }

    if (prevBtn && nextBtn && totalSlides > 0) {
        prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoPlay(); });
        nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoPlay(); });

        // Dots click
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.index));
                resetAutoPlay();
            });
        });

        // Auto toggle
        if (autoToggle) {
            autoToggle.addEventListener('click', () => {
                if (autoPlaying) stopAutoPlay();
                else startAutoPlay();
            });
        }

        startAutoPlay();

        // Touch swipe on phone screen
        const phoneScreen = document.querySelector('.phone-screen');
        if (phoneScreen) {
            let touchStartX = 0;
            phoneScreen.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            phoneScreen.addEventListener('touchend', (e) => {
                const diff = touchStartX - e.changedTouches[0].screenX;
                if (Math.abs(diff) > 50) {
                    if (diff > 0) goToSlide(currentSlide + 1);
                    else goToSlide(currentSlide - 1);
                    resetAutoPlay();
                }
            }, { passive: true });
        }
    }

    // =========================================================================
    // FAQ ACCORDION — Reveal on Demand with spring chevron
    // =========================================================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                // Close all others
                faqItems.forEach(other => other.classList.remove('active'));
                // Toggle current
                if (!isActive) item.classList.add('active');
            });
        }
    });

    // =========================================================================
    // HERO — Mouse Parallax on mockup (cached DOM, pauses off-screen)
    // =========================================================================
    const heroSection = document.querySelector('.hero');
    const parallaxEls = document.querySelectorAll('.parallax-layer'); // cached
    let parallaxScheduled = false;
    let isHeroVisible = true;

    if (heroSection && parallaxEls.length > 0) {
        const heroObserver = new IntersectionObserver((entries) => {
            isHeroVisible = entries[0].isIntersecting;
            // Pause/resume float animation when off-screen
            const mockup = document.querySelector('.mockup-container');
            if (mockup) mockup.style.animationPlayState = isHeroVisible ? 'running' : 'paused';
        }, { threshold: 0 });

        heroObserver.observe(heroSection);

        document.addEventListener('mousemove', (e) => {
            if (!isHeroVisible) return;
            if (!parallaxScheduled) {
                requestAnimationFrame(() => {
                    const x = (e.clientX / window.innerWidth - 0.5) * 12;
                    const y = (e.clientY / window.innerHeight - 0.5) * 12;
                    parallaxEls.forEach(el => {
                        el.style.transform = `translate(${x}px, ${y}px)`;
                    });
                    parallaxScheduled = false;
                });
                parallaxScheduled = true;
            }
        }, { passive: true });
    }

    // =========================================================================
    // LENS AI — Scroll-linked feature reveal
    // =========================================================================
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('feature-active');
            else entry.target.classList.remove('feature-active');
        });
    }, { root: null, rootMargin: '-30% 0px -30% 0px', threshold: 0 });

    document.querySelectorAll('.lens-feature-item').forEach(feature => {
        featureObserver.observe(feature);
    });

    // =========================================================================
    // CALCULADORAS — 3D Tilt Effect
    // =========================================================================
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
                    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -10;
                    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
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

    // =========================================================================
    // TABS — Interactive tab switcher
    // =========================================================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const tabIndicator = document.querySelector('.tab-indicator');

    function updateTabIndicator(btn) {
        if (!tabIndicator || !btn) return;
        const isVertical = window.innerWidth <= 768;
        if (isVertical) {
            tabIndicator.style.width = 'calc(100% - 12px)';
            tabIndicator.style.transform = `translateY(${btn.offsetTop - 6}px)`;
        } else {
            tabIndicator.style.width = `${btn.offsetWidth}px`;
            tabIndicator.style.transform = `translateX(${btn.offsetLeft - 6}px)`;
        }
    }

    if (tabBtns.length > 0 && tabIndicator) {
        updateTabIndicator(document.querySelector('.tab-btn.active'));

        window.addEventListener('resize', () => {
            updateTabIndicator(document.querySelector('.tab-btn.active'));
        });

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateTabIndicator(btn);

                const targetId = btn.getAttribute('data-target');
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    if (pane.id === targetId) pane.classList.add('active');
                });
            });
        });
    }

    // =========================================================================
    // COUNTER ANIMATION — Stats count up from 0
    // =========================================================================
    function animateCounter(el, target, suffix, duration) {
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            // Format with dot separator for thousands
            let formatted = current.toLocaleString('pt-BR');
            el.innerHTML = formatted + suffix;

            if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    const statItems = document.querySelectorAll('.stat-item strong');
    let statsAnimated = false;

    if (statItems.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !statsAnimated) {
                statsAnimated = true;

                statItems.forEach(el => {
                    const text = el.textContent.trim();

                    if (text.includes('2.000')) {
                        animateCounter(el, 2000, '+', 2000);
                    } else if (text.includes('4.9')) {
                        // Special case for rating
                        const startTime = performance.now();
                        function updateRating(t) {
                            const progress = Math.min((t - startTime) / 2000, 1);
                            const eased = 1 - Math.pow(1 - progress, 3);
                            const val = (eased * 4.9).toFixed(1);
                            el.innerHTML = val + '<span class="star">&#9733;</span>';
                            if (progress < 1) requestAnimationFrame(updateRating);
                        }
                        requestAnimationFrame(updateRating);
                    } else if (text.includes('98')) {
                        animateCounter(el, 98, '%', 2000);
                    }
                });

                statsObserver.disconnect();
            }
        }, { threshold: 0.3 });

        const statsContainer = document.querySelector('.testimonial-stats');
        if (statsContainer) statsObserver.observe(statsContainer);
    }

    // =========================================================================
    // PAUSE CAROUSEL ON TAB INACTIVE (save battery)
    // =========================================================================

    // =========================================================================
    // PAUSE CAROUSEL ON TAB INACTIVE (save battery)
    // =========================================================================
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (autoPlaying) clearInterval(autoPlayInterval);
        } else {
            if (autoPlaying) startAutoPlay();
        }
    });

});
