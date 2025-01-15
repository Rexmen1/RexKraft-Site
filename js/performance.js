// Performance Optimization Techniques
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Defer non-critical CSS
    const nonCriticalStyles = document.querySelectorAll('link[data-href]');
    nonCriticalStyles.forEach(link => {
        link.href = link.dataset.href;
    });

    // Preload critical resources
    const criticalResources = [
        'styles/main.css',
        'js/main.js',
        'assets/logo.png'
    ];
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.includes('.css') ? 'style' : 
                  resource.includes('.js') ? 'script' : 
                  resource.includes('.png') ? 'image' : 'fetch';
        document.head.appendChild(link);
    });

    // Minimize repaints and reflows
    function optimizeRendering() {
        const elements = document.querySelectorAll('.optimize-render');
        elements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
    }
    optimizeRendering();

    // Performance logging
    window.addEventListener('load', () => {
        const timing = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', timing.loadEventEnd - timing.startTime, 'ms');
    });
});
