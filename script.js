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
        { title: 'Lens AI', subtitle: 'Tire Sua Dúvida em Segundos', desc: 'Acesse a Lens AI, perguntas rápidas, condutas e todas as ferramentas do Oftbook direto da tela inicial. Interface intuitiva pensada para o dia a dia do oftalmologista.' },
        { title: 'Ferramentas', subtitle: 'Tudo em Um Só Lugar', desc: 'Condutas, Angiografia Fluoresceínica, Lentes de Contato, Bulário, Guia Cirúrgico, Videoaulas e Guias especializados de Retinopatia Diabética e Edema Macular Diabético.' },
        { title: 'Condutas Clínicas', subtitle: '300+ Protocolos Atualizados', desc: 'Condutas completas com manejo inicial, investigação diagnóstica e tratamento farmacológico. Organizadas por especialidade para acesso rápido no consultório.' },
        { title: 'Tratamento Detalhado', subtitle: 'Protocolos Farmacológicos Completos', desc: 'Cada conduta inclui tratamento farmacológico detalhado com doses, frequências, critérios de gravidade e orientações de manejo.' },
        { title: 'Atlas de Imagens', subtitle: 'Referência Visual Clínica', desc: 'Imagens clínicas detalhadas organizadas por patologia para apoio diagnóstico. Visualize achados oftalmológicos reais com descrições e classificações integradas.' },
        { title: 'Chat Inteligente', subtitle: 'Lens AI — IA Especializada em Oftalmologia', desc: 'Faça perguntas clínicas complexas e receba respostas detalhadas com protocolos de tratamento, posologias e referências bibliográficas. Treinada exclusivamente com literatura oftalmológica.' },
        { title: 'Calculadoras Clínicas', subtitle: '8+ Calculadoras Especializadas', desc: 'Glaucoma OHTS, Acuidade Visual, PIO/Lasik, Hidroxicloroquina, PIO/Paquimetria, Trauma Ocular, Ishihara e Equiascopia. Resultados precisos com faixas de referência integradas.' },
        { title: 'Códigos e Classificações', subtitle: 'CID-10, CID-11 e Classificações', desc: 'Acesso rápido a todos os códigos e classificações oftalmológicas organizados de forma prática. Busca inteligente para encontrar o código certo em segundos.' }
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
        const phoneScreen = document.querySelector('.phone-mockup');
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
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (autoPlaying) clearInterval(autoPlayInterval);
        } else {
            if (autoPlaying) startAutoPlay();
        }
    });

    // =========================================================================
    // i18n — Language Switcher
    // =========================================================================
    const langBtns = document.querySelectorAll('.lang-btn');
    let currentTranslations = {};
    let currentLang = localStorage.getItem('oftbook-lang') || 'pt';

    async function setLanguage(lang) {
        try {
            const res = await fetch(`locales/${lang}.json`);
            if (!res.ok) throw new Error('Locale not found');
            currentTranslations = await res.json();
        } catch (e) {
            console.warn('i18n: could not load', lang, e);
            return;
        }

        // Update text nodes
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (currentTranslations[key] !== undefined) {
                el.innerHTML = currentTranslations[key];
            }
        });

        // Update attributes (placeholder, aria-label, alt)
        document.querySelectorAll('[data-i18n-attr]').forEach(el => {
            const pairs = el.getAttribute('data-i18n-attr').split(',');
            pairs.forEach(pair => {
                const [attr, key] = pair.trim().split(':');
                if (currentTranslations[key] !== undefined) {
                    el.setAttribute(attr, currentTranslations[key]);
                }
            });
        });

        // Update carousel slideData
        for (let i = 0; i < 8; i++) {
            const n = i + 1;
            if (currentTranslations[`carousel.slide${n}_title`]) {
                slideData[i] = {
                    title: currentTranslations[`carousel.slide${n}_title`],
                    subtitle: currentTranslations[`carousel.slide${n}_subtitle`],
                    desc: currentTranslations[`carousel.slide${n}_desc`]
                };
            }
        }
        // Refresh current slide text
        goToSlide(currentSlide);

        // Update html lang & title
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en';
        if (currentTranslations['meta.title']) {
            document.title = currentTranslations['meta.title'];
        }

        // Save preference & update badges
        currentLang = lang;
        localStorage.setItem('oftbook-lang', lang);
        langBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    // Bind click events
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    // Load saved language on init (skip if PT since HTML is already in PT)
    if (currentLang !== 'pt') {
        setLanguage(currentLang);
    }

    // ========================================================================
    // LEAD MODAL — captura de dados antes de redirecionar pra App Store
    // ========================================================================
    (function initLeadModal() {
        const SAVE_LEAD_ENDPOINT = '/.netlify/functions/save-lead';
        const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
        const UTM_STORAGE_KEY = 'oftbook_utm';

        const modal = document.getElementById('leadModal');
        const form = document.getElementById('leadForm');
        const submitBtn = document.getElementById('leadSubmit');
        if (!modal || !form) return;

        let pendingUrl = null;
        let pendingSource = null;

        // ------ Captura de UTMs (persiste na sessão) ------
        function captureUTMs() {
            const url = new URL(window.location.href);
            const stored = JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) || '{}');
            let updated = false;
            UTM_KEYS.forEach(k => {
                const v = url.searchParams.get(k);
                if (v) { stored[k] = v; updated = true; }
            });
            if (updated) sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(stored));
            return stored;
        }

        function getUTMs() {
            return JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) || '{}');
        }

        // ------ Cookies do Meta (fbp / fbc) ------
        function getCookie(name) {
            const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
            return match ? decodeURIComponent(match[2]) : null;
        }

        // ------ Formata telefone BR ------
        const phoneInput = document.getElementById('leadTelefone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '').slice(0, 11);
                if (v.length > 6) {
                    v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
                } else if (v.length > 2) {
                    v = `(${v.slice(0,2)}) ${v.slice(2)}`;
                } else if (v.length > 0) {
                    v = `(${v}`;
                }
                e.target.value = v;
            });
        }

        // ------ Abre modal ------
        function openModal(url, source) {
            pendingUrl = url;
            pendingSource = source;
            modal.hidden = false;
            requestAnimationFrame(() => modal.classList.add('is-open'));
            document.body.classList.add('modal-open');
            setTimeout(() => document.getElementById('leadNome')?.focus(), 300);
        }

        function closeModal() {
            modal.classList.remove('is-open');
            document.body.classList.remove('modal-open');
            setTimeout(() => { modal.hidden = true; }, 250);
        }

        // ------ Intercepta CTAs ------
        document.querySelectorAll('[data-download-trigger]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(el.getAttribute('href'), el.dataset.ctaSource || 'unknown');
            });
        });

        // ------ Fechar modal ------
        modal.querySelectorAll('[data-close-modal]').forEach(el => {
            el.addEventListener('click', closeModal);
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.hidden) closeModal();
        });

        // ------ Submit ------
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!form.checkValidity()) { form.reportValidity(); return; }

            const labelEl = submitBtn.querySelector('.lead-modal__submit-label');
            const loadingEl = submitBtn.querySelector('.lead-modal__submit-loading');
            submitBtn.disabled = true;
            if (labelEl) labelEl.hidden = true;
            if (loadingEl) loadingEl.hidden = false;

            const eventId = 'lead_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
            const utms = getUTMs();
            const payload = {
                nome: form.nome.value.trim(),
                email: form.email.value.trim().toLowerCase(),
                telefone: form.telefone.value.trim(),
                cta_source: pendingSource,
                page_url: window.location.href,
                referrer: document.referrer || null,
                utm_source: utms.utm_source || null,
                utm_medium: utms.utm_medium || null,
                utm_campaign: utms.utm_campaign || null,
                utm_term: utms.utm_term || null,
                utm_content: utms.utm_content || null,
                event_id: eventId,
                fbc: getCookie('_fbc'),
                fbp: getCookie('_fbp'),
                user_agent: navigator.userAgent
            };

            // 1) Meta Pixel browser-side (com eventID pra dedup com CAPI)
            try {
                if (typeof fbq === 'function') {
                    fbq('track', 'Lead', {
                        content_name: 'Download App',
                        content_category: pendingSource
                    }, { eventID: eventId });
                }
            } catch (err) { console.warn('[lead] Pixel falhou:', err); }

            // 2) Backend: grava no Supabase + envia Meta CAPI (server-side)
            try {
                fetch(SAVE_LEAD_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    keepalive: true
                }).catch(() => {});
            } catch (err) { console.warn('[lead] save-lead falhou:', err); }

            // 4) Redireciona pra App Store (pequeno delay pra garantir envio)
            setTimeout(() => {
                if (pendingUrl) window.open(pendingUrl, '_blank', 'noopener');
                closeModal();
                form.reset();
                submitBtn.disabled = false;
                if (labelEl) labelEl.hidden = false;
                if (loadingEl) loadingEl.hidden = true;
            }, 350);
        });

        // Captura UTMs assim que carrega
        captureUTMs();
    })();

});
