```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') { // If href is just '#', scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight; // Adjust for sticky header
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                const mainNav = document.querySelector('.main-nav');
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
        });
    }

    // Scroll-to-Top Button
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    if (scrollToTopBtn) {
        window.addEventListener("scroll", () => {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        });

        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Reveal elements on scroll using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        threshold: 0.15 // Percentage of the element that needs to be visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });
});
```