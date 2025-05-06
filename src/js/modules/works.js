export default function () {
  let galleries = document.querySelectorAll('.gallery')
  let categories = document.querySelectorAll('.category')



  // var categoriesSwiper = new Swiper(".categories-swiper ", {
  //   spaceBetween: 10,
  //   slidesPerView: 4,
  //   freeMode: true,
  //   watchSlidesProgress: true,
  //   on: {
  //     slideChange: function (slider) {
  //         if (worksSwiper) {
  //           worksSwiper.slideTo(slider.activeIndex);
  //         }
          
  //     }
  // }
  // });
  var worksSwiper = new Swiper(".works-swiper", {
    spaceBetween: 10,
    // thumbs: {
    //   swiper: categoriesSwiper,
    //   multipleActiveThumbs: false,
    // },
    on: {
      slideChange: function (e) {
        document.querySelector('.category.active').classList.remove('active')
        document.querySelector(`.category[data-slide="${e.activeIndex}"]`).classList.add('active')
      }
    }
  });

  for(let c = 0; c < categories.length; c++) {
    categories[c].addEventListener('click', function (e) {
      worksSwiper.slideTo(e.currentTarget.dataset.slide)
    })
  }

  for(let i = 0; i < galleries.length; i++) {
    lightGallery(galleries[i], {
      animateThumb: false,
      zoomFromOrigin: false,
      allowMediaOverlap: true,
      toggleThumb: true,
  });
  
  }





  // init: function (e) {
  //   for (let i = 0; i < e.slides.length; i++) {
  //     let imageSrc = e.slides[i].querySelector("img").getAttribute("src");
  //     e.slides[i].setAttribute("href", imageSrc);
  //   }
  //   const lg = lightGallery(e.slidesEl, {
  //     controls: true, 
  //     mobileSettings: {
  //         controls: true,
  //     }});
  //   e.slidesEl.addEventListener("lgBeforeClose", () => {
  //     e.slideTo(lg.index, 0);
  //   });
  // },
}