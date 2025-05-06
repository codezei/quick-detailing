export default function () {
    let reviewsSwiper = new Swiper(".reviews-swiper", {
        slidesPerView: 1,
        spaceBetween: 0,
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
          1200: {
            slidesPerView: 4,
          },
        //   1200: {
        //     slidesPerView: 5,
        //   },
        },
        navigation: {
          nextEl: ".reviews-button-next",
          prevEl: ".reviews-button-prev",
        },
      });
    
}