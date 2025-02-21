export default function () {
    gsap.registerPlugin(ScrollTrigger);

	
    const aboutCar = document.querySelector('.about__car');
	const aboutCarHeadlights = document.querySelector('.about-car__headlights');
	const aboutInfo = document.querySelector('.about__info');
	const aboutTitle = document.querySelector('.about__title')
	
	const aboutCarTl = gsap.timeline({
	  scrollTrigger: {
		trigger: aboutCarHeadlights,
		start: "top 100%",
	  }
	});
	
	aboutCarTl.from([aboutCar, aboutInfo], { x: "-30%", opacity: 0, duration: 1, ease: "power2.in" })
	.from(aboutTitle, { y: "-100px", opacity: 0, duration: 0.5, ease: "power2.inOut" })
	
	
	const headlightsTl = gsap.timeline({
	  scrollTrigger: {
		trigger: aboutCarHeadlights,
		start: "top 100%",
	  }
	});
	
	headlightsTl.to(aboutCarHeadlights, { opacity: 0, duration: 0.7 })
	  .to(aboutCarHeadlights, { opacity: 0.7, duration: 0.1 })
	  .to(aboutCarHeadlights, { opacity: 0, duration: 0.1 })
	  .to(aboutCarHeadlights, { opacity: 0.2, duration: 0.1 })
	  .to(aboutCarHeadlights, { opacity: 0, duration: 0.1 })
	  .to(aboutCarHeadlights, { opacity: 1, duration: 1, ease: "power2.inOut" })
}