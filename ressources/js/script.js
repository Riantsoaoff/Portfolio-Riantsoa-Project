// ======================================================
// PORTFOLIO - ANIMATIONS JAVASCRIPT
// ======================================================

document.addEventListener('DOMContentLoaded', function() {

    // ======================================================
    // 1. ANIMATION AU SCROLL (FADE-IN DES ÉLÉMENTS)
    // ======================================================
    
    // Sélectionner tous les éléments à animer
    const animatedElements = document.querySelectorAll('.section, .project-item, .skill-card, .social-item, .about-text, .header-text, .avatar-wrapper, .contact-banner');
    
    // Observer pour détecter l'apparition des éléments
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Ajouter la classe 'fade-in' à chaque élément et l'observer
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });


    // ======================================================
    // 2. ANIMATION DES STATISTIQUES (COMPTEUR)
    // ======================================================
    
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        statsAnimated = true;
        
        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const number = parseInt(text);
            const suffix = text.replace(/[0-9]/g, '');
            
            if (isNaN(number)) return;
            
            let current = 0;
            const increment = Math.ceil(number / 40);
            const duration = 1500;
            const stepTime = Math.floor(duration / 40);
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                stat.textContent = current + suffix;
            }, stepTime);
        });
    }
    
    // Observer pour la section About
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(aboutSection);
    }


    // ======================================================
    // 3. EFFET DE SURVOL SUR LES PROJETS (LUEUR)
    // ======================================================
    
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function(e) {
            this.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease';
        });
        
        item.addEventListener('mouseleave', function(e) {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
    });


    // ======================================================
    // 4. ANIMATION DES BULLES FLOTTANTES
    // ======================================================
    
    const bubbles = document.querySelectorAll('.bubble');
    
    bubbles.forEach((bubble, index) => {
        // Mouvement aléatoire lent
        const randomX = (Math.random() - 0.5) * 60;
        const randomY = (Math.random() - 0.5) * 60;
        const duration = 15 + Math.random() * 15;
        const delay = index * 2;
        
        bubble.style.animation = `floatBubble ${duration}s ease-in-out ${delay}s infinite alternate`;
        bubble.style.setProperty('--float-x', randomX + 'px');
        bubble.style.setProperty('--float-y', randomY + 'px');
    });


    // ======================================================
    // 5. EFFET DE TEXTE TAPEUR POUR LE TITRE HERO
    // ======================================================
    
    const heroTitle = document.querySelector('.main-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        const highlightSpan = heroTitle.querySelector('.highlight');
        const highlightText = highlightSpan ? highlightSpan.textContent : '';
        
        // Option: animation de texte au survol
        heroTitle.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
            this.style.transform = 'scale(1.02)';
        });
        
        heroTitle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }


    // ======================================================
    // 6. ANIMATION D'APPARITION DES ICÔNES SOCIALES
    // ======================================================
    
    const socialIcons = document.querySelectorAll('.social-item');
    
    socialIcons.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`;
        
        const socialObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        socialObserver.observe(item);
    });


    // ======================================================
    // 7. NAVBAR SCROLL EFFECT
    // ======================================================
    
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 8px 32px rgba(179, 139, 252, 0.15)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.boxShadow = '0 8px 32px 0 rgba(179, 139, 252, 0.05)';
            navbar.style.background = 'rgba(255, 255, 255, 0.85)';
        }
        
        lastScroll = currentScroll;
    });


    // ======================================================
    // 8. ANIMATION DES BOUTONS "SEE DETAILS"
    // ======================================================
    
    const detailsLinks = document.querySelectorAll('.project-details');
    
    detailsLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });


    // ======================================================
    // 9. PARALLAX DOUX SUR LES BULLES
    // ======================================================
    
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        bubbles.forEach((bubble, index) => {
            const speed = 0.02 + (index * 0.01);
            const x = (mouseX - 0.5) * 40 * speed;
            const y = (mouseY - 0.5) * 40 * speed;
            bubble.style.transform = `translate(${x}px, ${y}px)`;
        });
    });


    // ======================================================
    // 10. ANIMATION DES COMPÉTENCES AU SURVOL
    // ======================================================
    
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

});


// ======================================================
// STYLES CSS DYNAMIQUES POUR LES ANIMATIONS
// ======================================================

// Ajout des styles pour les animations directement via JS
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    /* FADE-IN ANIMATION */
    .fade-in {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* BULLES FLOTTANTES */
    @keyframes floatBubble {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(var(--float-x, 20px), var(--float-y, 20px));
        }
    }
    
    /* DELAIS D'ANIMATION POUR LES ÉLÉMENTS */
    .header-text { transition-delay: 0.1s; }
    .avatar-wrapper { transition-delay: 0.2s; }
    .about-text { transition-delay: 0.1s; }
    .about-avatar-container { transition-delay: 0.2s; }
    .skill-card { transition-delay: 0.1s; }
    .skill-card:nth-child(2) { transition-delay: 0.15s; }
    .skill-card:nth-child(3) { transition-delay: 0.2s; }
    .skill-card:nth-child(4) { transition-delay: 0.25s; }
    .project-item { transition-delay: 0.1s; }
    .project-item:nth-child(2) { transition-delay: 0.15s; }
    .project-item:nth-child(3) { transition-delay: 0.2s; }
    .project-item:nth-child(4) { transition-delay: 0.25s; }
    .contact-banner { transition-delay: 0.1s; }
    
    /* ANIMATION DE TEXTE POUR LE BADGE */
    .badge {
        transition: all 0.3s ease;
    }
    
    .badge:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 20px rgba(179, 139, 252, 0.2);
    }
`;
document.head.appendChild(animationStyles);