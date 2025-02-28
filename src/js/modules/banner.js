export default function () {
    function createObserver(blockClasses) {
        const banner = document.querySelector('.banner');
        if (!banner) return;
        
        const blocks = blockClasses.map(cls => document.querySelector(cls)).filter(Boolean);
        
        const observer = new IntersectionObserver(entries => {
            const isVisible = entries.some(entry => entry.isIntersecting);
            if (isVisible) {
                console.log('1')
                banner.classList.add('hidden')
            } else {
                console.log('2')
                banner.classList.remove('hidden')
            }
        }, { threshold: 0.1 });
        
        blocks.forEach(block => observer.observe(block));
    }
    
    const blockClasses = ['.footer', '.promo'];
    
    createObserver(blockClasses)
}