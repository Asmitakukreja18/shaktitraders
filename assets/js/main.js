/* Unified Shared Javascript for Shakti Royale B2B */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Progress bar initialization & automatic exit
    const loaderBar = document.getElementById('loader-bar');
    const loader = document.getElementById('loader');
    
    if (loaderBar) {
        loaderBar.style.width = '100%';
    }

    // Fail-safe: Fade out loader after 800ms regardless of slow images/resources
    setTimeout(() => {
        if (loader && !loader.classList.contains('opacity-0')) {
            loader.classList.add('opacity-0', 'pointer-events-none');
        }
    }, 800);
    
    // 2. Custom Cursor Logic (Only enabled on non-touch devices)
    const cursor = document.getElementById('custom-cursor');
    const ring = document.getElementById('custom-cursor-ring');
    if (cursor && ring && window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            ring.style.left = e.clientX + 'px';
            ring.style.top = e.clientY + 'px';
        });

        // Hover expansions for links, buttons, and inputs
        const targetElements = document.querySelectorAll('a, button, input, select, textarea, [role="button"], .cursor-pointer');
        targetElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                ring.style.transform = 'translate(-50%, -50%) scale(1.6)';
                ring.style.backgroundColor = 'rgba(107, 44, 145, 0.08)';
                ring.style.borderColor = '#6B2C91';
                cursor.style.backgroundColor = '#4F1E73';
            });
            el.addEventListener('mouseleave', () => {
                ring.style.transform = 'translate(-50%, -50%) scale(1)';
                ring.style.backgroundColor = 'transparent';
                ring.style.borderColor = 'rgba(107, 44, 145, 0.4)';
                cursor.style.backgroundColor = '#6B2C91';
            });
        });
    } else {
        // Hide custom cursor elements on touch devices
        if (cursor) cursor.style.display = 'none';
        if (ring) ring.style.display = 'none';
    }

    // 3. Navbar Shrink & Style Change on Scroll
    const header = document.getElementById('mainNav') || document.querySelector('nav');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('h-20', 'shadow-md', 'bg-[#FCFAF8]/95');
                header.classList.remove('h-24');
            } else {
                header.classList.add('h-24');
                header.classList.remove('h-20', 'shadow-md', 'bg-[#FCFAF8]/95');
            }
        });
    }

    // 4. Initialize GSAP ScrollTrigger Animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // A. Fade-in-up animations for text reveals
        gsap.utils.toArray('.text-reveal').forEach((el) => {
            gsap.fromTo(el, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // B. Staggered fade-up animations
        const staggerLists = ['.grid', '.columns-1', '.flex-wrap', '.marquee-content'];
        staggerLists.forEach(parentSelector => {
            const parent = document.querySelector(parentSelector);
            if (parent) {
                const children = parent.querySelectorAll('.text-reveal, .masonry-item, .p-8, .glass-card');
                if (children.length > 0) {
                    gsap.fromTo(children,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            stagger: 0.15,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: parent,
                                start: 'top 80%'
                            }
                        }
                    );
                }
            }
        });

        // C. Count-up statistics animations
        gsap.utils.toArray('.count-up').forEach(el => {
            const target = parseInt(el.getAttribute('data-target') || '0');
            const suffix = el.getAttribute('data-suffix') || '';
            const valueObj = { val: 0 };
            
            gsap.to(valueObj, {
                val: target,
                duration: 2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%'
                },
                onUpdate: () => {
                    el.innerText = Math.floor(valueObj.val) + suffix;
                }
            });
        });
    }

    // 5. Initialize Lenis Smooth Scroll
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    }
});

// 6. Page Fade-out Loading Complete (Backup event handler)
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader && !loader.classList.contains('opacity-0')) {
        loader.classList.add('opacity-0', 'pointer-events-none');
    }
});
