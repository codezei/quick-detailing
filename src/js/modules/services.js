export default function () {
    let servicesSwiper = new Swiper(".services-swiper", {
        slidesPerView: 1,
        spaceBetween: 16,
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true,
        // },
        breakpoints: {
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
          // 1200: {
          //   slidesPerView: 5,
          // },
        },
        navigation: {
          nextEl: ".services-button-next",
          prevEl: ".services-button-prev",
        },
      });
}