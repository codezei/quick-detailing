export default function () {
    const reviews = document.querySelector('.reviews')
    const reviewsTitle = document.querySelector('.reviews__title')
    const reviewsItems = document.querySelectorAll('.review')

    const reviewsTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: reviews,
			start: "top 70%",
		}
	});

    reviewsTimeline.from(reviewsTitle, {
        opacity: 0,
        y: "-100%",
        duration: 0.6,
        ease: "power2.out"
    })
    .from(reviewsItems, {
        opacity: 0,
        y:"-50%",
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out"
    }, "-=0.3");

    
}