document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Slide-Up Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once it has become visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const slideUpElements = document.querySelectorAll('.slide-up');
    slideUpElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Quiz Interaction Logic
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizFeedback = document.getElementById('quiz-feedback');

    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Reset all options
            quizOptions.forEach(opt => {
                opt.style.background = 'rgba(0,0,0,0.3)';
                opt.style.borderColor = 'transparent';
            });

            // Check if correct
            const isCorrect = this.getAttribute('data-correct') === 'true';
            
            if (isCorrect) {
                this.style.background = 'rgba(0, 104, 71, 0.4)'; // Green background
                this.style.borderColor = 'var(--mexico-green)';
                quizFeedback.textContent = 'Resposta Correta! Muito bem.';
                quizFeedback.style.color = 'var(--mexico-green)';
            } else {
                this.style.background = 'rgba(206, 17, 38, 0.4)'; // Red background
                this.style.borderColor = 'var(--mexico-red)';
                quizFeedback.textContent = 'Resposta Incorreta. Tente novamente.';
                quizFeedback.style.color = 'var(--mexico-red)';
            }
            quizFeedback.style.display = 'block';
        });
    });
});
