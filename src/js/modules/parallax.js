export default function () {
    gsap.utils.toArray(".parallax-item").forEach((item) => {
        let speed = +item.dataset.speed
        gsap.to(item, {
          y: (i, el) => -el.offsetHeight * speed, // Чем выше, тем сильнее эффект
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom", // Начинает анимацию, когда элемент появляется
            scrub: true, // Плавный эффект
          },
        });
      });
      
}