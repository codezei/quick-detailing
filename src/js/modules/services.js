export default function () {
    const services = document.querySelector('.services')
    const servicesTitle = document.querySelector('.services__title')
    const servicesItems = document.querySelectorAll('.service')

    const servicesTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: services,
			start: "top 70%",
		}
	});

    servicesTimeline.from(servicesTitle, {
        opacity: 0,
        y: "-100%",
        duration: 0.6,
        ease: "power2.out"
    })
    .from(servicesItems, {
        opacity: 0,
        y:"-50%",
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out"
    }, "-=0.3");

    
}