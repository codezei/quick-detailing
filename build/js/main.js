(function () {
	'use strict';

	function promo () {
	  var promoTimeline = gsap.timeline();
	  var promoTitle = document.querySelector('.promo__title');
	  var promoSubtitle = document.querySelector('.promo__subtitle');
	  var promoBtn = document.querySelector('.promo__btn');
	  var promoCar = document.querySelector('.promo__car');
	  var promoBg = document.querySelector('.promo__bg');
	  var promoCta = document.querySelector('.promo__cta');
	  var promoServices = document.querySelectorAll('.car-navbar__item');
	  promoTimeline.from(promoCar, {
	    x: "100%",
	    y: "30%",
	    opacity: 1,
	    duration: 1,
	    ease: "power2.in"
	  }, "-=0.5").from(promoServices, {
	    x: "-100%",
	    opacity: 0,
	    duration: 0.2,
	    ease: "power2.out",
	    stagger: 0.2
	  }).from(promoTitle, {
	    x: "-100%",
	    opacity: 0,
	    duration: 1,
	    ease: "power2.out"
	  }, "-=0.5").from(promoSubtitle, {
	    x: "-100%",
	    opacity: 0,
	    duration: 1,
	    ease: "power2.out"
	  }, "-=0.5").from(promoBtn, {
	    opacity: 0,
	    duration: 0.1,
	    ease: "power2.in"
	  }).from(promoBg, {
	    opacity: 0,
	    duration: 1
	  }).from(promoCta, {
	    opacity: 0,
	    duration: 1
	  });
	}

	function about () {
	  gsap.registerPlugin(ScrollTrigger);
	  var about = document.querySelector('.about');
	  var aboutInfo = document.querySelector('.about__info');
	  var aboutTitle = document.querySelector('.about__title');
	  var aboutBtn = document.querySelector('.about__btn');
	  var aboutImg = document.querySelector('.about__img');
	  var aboutTimeline = gsap.timeline({
	    scrollTrigger: {
	      trigger: about,
	      start: "top 100%"
	    }
	  });
	  aboutTimeline.from(aboutTitle, {
	    opacity: 0,
	    y: "-100%",
	    duration: 0.5,
	    ease: "power2.inOut"
	  }).from(aboutInfo, {
	    opacity: 0,
	    x: "-100%",
	    duration: 0.5,
	    ease: "power2.inOut"
	  }).from(aboutBtn, {
	    opacity: 0,
	    y: "100%",
	    duration: 0.5,
	    ease: "power2.inOut"
	  }).from(aboutImg, {
	    opacity: 0,
	    duration: 0.5,
	    ease: "power2.inOut"
	  });
	}

	function parallax () {
	  gsap.utils.toArray(".parallax-item").forEach(function (item) {
	    var speed = +item.dataset.speed;
	    gsap.to(item, {
	      y: function y(i, el) {
	        return -el.offsetHeight * speed;
	      },
	      // Чем выше, тем сильнее эффект
	      ease: "none",
	      scrollTrigger: {
	        trigger: item,
	        start: "top bottom",
	        // Начинает анимацию, когда элемент появляется
	        scrub: true // Плавный эффект

	      }
	    });
	  });
	}

	function faq () {
	  var items = document.querySelectorAll('.faq__item');
	  var activeItem = document.querySelector('.faq__item.active');

	  for (var i = 0; i < items.length; i++) {
	    items[i].addEventListener('click', function (e) {
	      if (e.currentTarget !== activeItem && !!activeItem) {
	        activeItem.classList.remove('active');
	      }

	      if (e.currentTarget.classList.contains('active')) {
	        e.currentTarget.classList.remove('active');
	      } else {
	        e.currentTarget.classList.add('active');
	        activeItem = e.currentTarget;
	      }
	    });
	  }
	}

	function works () {
	  var columns = gsap.utils.toArray(".works__col");
	  window.addEventListener("load", function () {
	    var loops = columns.map(function (column, i) {
	      var items = gsap.utils.toArray(".work", column);
	      return verticalLoop(items, {
	        repeat: -1,
	        paddingBottom: 10,
	        paused: false
	      });
	    });
	    gsap.set(loops, {
	      time: function time(i) {
	        return i % 2 + 1;
	      },
	      timeScale: 0
	    });
	    gsap.set(columns, {
	      autoAlpha: 1
	    });
	    Observer.create({
	      target: window,
	      type: "wheel, touch",
	      onUp: function onUp() {
	        gsap.timeline().to(loops, {
	          timeScale: function timeScale(i) {
	            return i % 2 > 0 ? 2 : 2.5;
	          },
	          overwrite: true,
	          duration: 0.2
	        }).to(loops, {
	          timeScale: 0,
	          ease: "power1.in"
	        }, 1);
	      },
	      onDown: function onDown() {
	        gsap.timeline().to(loops, {
	          timeScale: function timeScale(i) {
	            return i % 2 > 0 ? -2 : -2.5;
	          },
	          overwrite: true,
	          duration: 0.2
	        }).to(loops, {
	          timeScale: 0,
	          ease: "power1.in"
	        }, 1);
	      }
	    });
	  });
	  /*
	        This helper function makes a group of elements animate along the y-axis in a seamless, responsive loop.
	      
	        Features:
	          - Uses yPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
	          - When each item animates up or down enough, it will loop back to the other side
	          - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, enterAnimation, leaveAnimation, and paddingBottom.
	          - The returned timeline will have the following methods added to it:
	          - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
	          - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
	          - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
	          - current() - returns the current index (if an animation is in-progress, it reflects the final index)
	          - times - an Array of the times on the timeline where each element hits the "starting" spot.
	          - elements - an Array of the elements that are being controlled by the timeline
	      */

	  function verticalLoop(items, config) {
	    var timeline;
	    items = gsap.utils.toArray(items);
	    config = config || {};
	    gsap.context(function () {
	      var onChange = config.onChange,
	          lastIndex = 0,
	          tl = gsap.timeline({
	        repeat: config.repeat,
	        onUpdate: onChange && function () {
	          var i = tl.closestIndex();

	          if (lastIndex !== i) {
	            lastIndex = i;
	            onChange(items[i], i);
	          }
	        },
	        paused: config.paused,
	        defaults: {
	          ease: "none"
	        },
	        onReverseComplete: function onReverseComplete() {
	          return tl.totalTime(tl.rawTime() + tl.duration() * 100);
	        }
	      }),
	          length = items.length,
	          startY = items[0].offsetTop,
	          times = [],
	          heights = [],
	          spaceBefore = [],
	          yPercents = [],
	          curIndex = 0,
	          center = config.center,
	          clone = function clone(obj) {
	        var result = {},
	            p;

	        for (p in obj) {
	          result[p] = obj[p];
	        }

	        return result;
	      },
	          pixelsPerSecond = (config.speed || 1) * 100,
	          snap = config.snap === false ? function (v) {
	        return v;
	      } : gsap.utils.snap(config.snap || 1),
	          // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
	      timeOffset = 0,
	          container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
	          totalHeight,
	          getTotalHeight = function getTotalHeight() {
	        return items[length - 1].offsetTop + yPercents[length - 1] / 100 * heights[length - 1] - startY + spaceBefore[0] + items[length - 1].offsetHeight * gsap.getProperty(items[length - 1], "scaleY") + (parseFloat(config.paddingBottom) || 0);
	      },
	          populateHeights = function populateHeights() {
	        var b1 = container.getBoundingClientRect(),
	            b2;
	        startY = items[0].offsetTop;
	        items.forEach(function (el, i) {
	          heights[i] = parseFloat(gsap.getProperty(el, "height", "px"));
	          yPercents[i] = snap(parseFloat(gsap.getProperty(el, "y", "px")) / heights[i] * 100 + gsap.getProperty(el, "yPercent"));
	          b2 = el.getBoundingClientRect();
	          spaceBefore[i] = b2.top - (i ? b1.bottom : b1.top);
	          b1 = b2;
	        });
	        gsap.set(items, {
	          // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
	          yPercent: function yPercent(i) {
	            return yPercents[i];
	          }
	        });
	        totalHeight = getTotalHeight();
	      },
	          timeWrap,
	          populateOffsets = function populateOffsets() {
	        timeOffset = center ? tl.duration() * (container.offsetWidth / 2) / totalHeight : 0;
	        center && times.forEach(function (t, i) {
	          times[i] = timeWrap(tl.labels["label" + i] + tl.duration() * heights[i] / 2 / totalHeight - timeOffset);
	        });
	      },
	          getClosest = function getClosest(values, value, wrap) {
	        var i = values.length,
	            closest = 1e10,
	            index = 0,
	            d;

	        while (i--) {
	          d = Math.abs(values[i] - value);

	          if (d > wrap / 2) {
	            d = wrap - d;
	          }

	          if (d < closest) {
	            closest = d;
	            index = i;
	          }
	        }

	        return index;
	      },
	          populateTimeline = function populateTimeline() {
	        var i, item, curY, distanceToStart, distanceToLoop;
	        tl.clear();

	        for (i = 0; i < length; i++) {
	          item = items[i];
	          curY = yPercents[i] / 100 * heights[i];
	          distanceToStart = item.offsetTop + curY - startY + spaceBefore[0];
	          distanceToLoop = distanceToStart + heights[i] * gsap.getProperty(item, "scaleY");
	          tl.to(item, {
	            yPercent: snap((curY - distanceToLoop) / heights[i] * 100),
	            duration: distanceToLoop / pixelsPerSecond
	          }, 0).fromTo(item, {
	            yPercent: snap((curY - distanceToLoop + totalHeight) / heights[i] * 100)
	          }, {
	            yPercent: yPercents[i],
	            duration: (curY - distanceToLoop + totalHeight - curY) / pixelsPerSecond,
	            immediateRender: false
	          }, distanceToLoop / pixelsPerSecond).add("label" + i, distanceToStart / pixelsPerSecond);
	          times[i] = distanceToStart / pixelsPerSecond;
	        }

	        timeWrap = gsap.utils.wrap(0, tl.duration());
	      },
	          customAnimations = function customAnimations() {
	        var _config = config,
	            enterAnimation = _config.enterAnimation,
	            leaveAnimation = _config.leaveAnimation,
	            eachDuration = tl.duration() / items.length;
	        items.forEach(function (item, i) {
	          var anim = enterAnimation && enterAnimation(item, eachDuration, i),
	              isAtEnd = anim && tl.duration() - timeWrap(times[i] - Math.min(eachDuration, anim.duration())) < eachDuration - 0.05;
	          anim && tl.add(anim, isAtEnd ? 0 : timeWrap(times[i] - anim.duration()));
	          anim = leaveAnimation && leaveAnimation(item, eachDuration, i);
	          isAtEnd = times[i] === tl.duration();
	          anim && anim.duration() > eachDuration && anim.duration(eachDuration);
	          anim && tl.add(anim, isAtEnd ? 0 : times[i]);
	        });
	      },
	          refresh = function refresh(deep) {
	        var progress = tl.progress();
	        tl.progress(0, true);
	        populateHeights();
	        deep && populateTimeline();
	        populateOffsets();
	        customAnimations();
	        deep && tl.draggable ? tl.time(times[curIndex], true) : tl.progress(progress, true);
	      },
	          onResize = function onResize() {
	        return refresh(true);
	      },
	          proxy;

	      gsap.set(items, {
	        y: 0
	      });
	      populateHeights();
	      populateTimeline();
	      populateOffsets();
	      customAnimations();
	      window.addEventListener("resize", onResize);

	      function toIndex(index, vars) {
	        vars = clone(vars);
	        Math.abs(index - curIndex) > length / 2 && (index += index > curIndex ? -length : length); // always go in the shortest direction

	        var newIndex = gsap.utils.wrap(0, length, index),
	            time = times[newIndex];

	        if (time > tl.time() !== index > curIndex) {
	          // if we're wrapping the timeline's playhead, make the proper adjustments
	          time += tl.duration() * (index > curIndex ? 1 : -1);
	        }

	        if (vars.revolutions) {
	          time += tl.duration() * Math.round(vars.revolutions);
	          delete vars.revolutions;
	        }

	        if (time < 0 || time > tl.duration()) {
	          vars.modifiers = {
	            time: timeWrap
	          };
	        }

	        curIndex = newIndex;
	        vars.overwrite = true;
	        gsap.killTweensOf(proxy);
	        return tl.tweenTo(time, vars);
	      }

	      tl.elements = items;

	      tl.next = function (vars) {
	        return toIndex(curIndex + 1, vars);
	      };

	      tl.previous = function (vars) {
	        return toIndex(curIndex - 1, vars);
	      };

	      tl.current = function () {
	        return curIndex;
	      };

	      tl.toIndex = function (index, vars) {
	        return toIndex(index, vars);
	      };

	      tl.closestIndex = function (setCurrent) {
	        var index = getClosest(times, tl.time(), tl.duration());
	        setCurrent && (curIndex = index);
	        return index;
	      };

	      tl.times = times;
	      tl.progress(1, true).progress(0, true); // pre-render for performance

	      if (config.reversed) {
	        tl.vars.onReverseComplete();
	        tl.reverse();
	      }

	      if (config.draggable && typeof Draggable === "function") {
	        proxy = document.createElement("div");

	        var wrap = gsap.utils.wrap(0, 1),
	            ratio,
	            startProgress,
	            draggable,
	            align = function align() {
	          return tl.progress(wrap(startProgress + (draggable.startY - draggable.y) * ratio));
	        },
	            syncIndex = function syncIndex() {
	          return tl.closestIndex(true);
	        };

	        typeof InertiaPlugin === "undefined" && console.warn("InertiaPlugin required for momentum-based scrolling and snapping. https://gsap.com/pricing");
	        draggable = Draggable.create(proxy, {
	          trigger: items[0].parentNode,
	          type: "y",
	          onPressInit: function onPressInit() {
	            gsap.killTweensOf(tl);
	            startProgress = tl.progress();
	            refresh();
	            ratio = 1 / totalHeight;
	            gsap.set(proxy, {
	              y: startProgress / -ratio
	            });
	          },
	          onDrag: align,
	          onThrowUpdate: align,
	          inertia: true,
	          snap: function snap(value) {
	            var time = -(value * ratio) * tl.duration(),
	                wrappedTime = timeWrap(time),
	                snapTime = times[getClosest(times, wrappedTime, tl.duration())],
	                dif = snapTime - wrappedTime;
	            Math.abs(dif) > tl.duration() / 2 && (dif += dif < 0 ? tl.duration() : -tl.duration());
	            return (time + dif) / tl.duration() / -ratio;
	          },
	          onRelease: syncIndex,
	          onThrowComplete: syncIndex
	        })[0];
	        tl.draggable = draggable;
	      }

	      tl.closestIndex(true);
	      onChange && onChange(items[curIndex], curIndex);
	      timeline = tl;
	      return function () {
	        return window.removeEventListener("resize", onResize);
	      }; // cleanup
	    });
	    return timeline;
	  }
	}

	function xScroll () {
	  // let items = gsap.utils.toArray(".js-scroll-x-section")
	  // let pageWrapper = document.querySelector('.js-scroll-x-wrapper')
	  // items.forEach((container, i) => {
	  // let localItems = container.querySelectorAll(".js-scroll-x-item"),
	  //     distance = () => {
	  //         let lastItemBounds = localItems[localItems.length-1].getBoundingClientRect(),
	  //             containerBounds = container.getBoundingClientRect();
	  //         return Math.max(0, lastItemBounds.right - containerBounds.right);
	  //     };
	  //     gsap.to(container, {
	  //         x: () => -distance(),
	  //         ease: "none",
	  //         scrollTrigger: {
	  //         trigger: pageWrapper,
	  //         start: "top top",
	  //         pinnedContainer: pageWrapper,
	  //         end: () => "+=" + distance(),
	  //         pin: pageWrapper,
	  //         scrub: true,
	  //         invalidateOnRefresh: true 
	  //         }
	  //     })
	  // });
	  var wrappers = gsap.utils.toArray(".js-scroll-x-wrapper");
	  wrappers.forEach(function (wrapper, i) {
	    var section = wrapper.querySelector('.js-scroll-x-section');
	    var localItems = wrapper.querySelectorAll(".js-scroll-x-item");

	    var distance = function distance() {
	      var lastItemBounds = localItems[localItems.length - 1].getBoundingClientRect(),
	          containerBounds = section.getBoundingClientRect();
	      return Math.max(0, lastItemBounds.right - containerBounds.right);
	    };

	    gsap.to(section, {
	      x: function x() {
	        return -distance();
	      },
	      ease: "none",
	      scrollTrigger: {
	        trigger: wrapper,
	        start: "top top",
	        pinnedContainer: wrapper,
	        end: function end() {
	          return "+=" + distance();
	        },
	        pin: wrapper,
	        scrub: true,
	        invalidateOnRefresh: true
	      }
	    });
	  });
	}

	function header() {
	  var header = document.querySelector('.header');
	  var burger = document.querySelector('.js-burger');
	  burger.addEventListener('click', function (e) {
	    document.documentElement.classList.toggle('open-menu');
	  });
	  header.addEventListener('click', function (e) {
	    if (e.target.tagName === 'A') {
	      document.documentElement.classList.remove('open-menu');
	    }
	  });
	  var linkNav = document.querySelectorAll('[href^="#"]');
	  var headerHeight = header.getBoundingClientRect().height;
	  var V = 0.2;

	  for (var i = 0; i < linkNav.length; i++) {
	    linkNav[i].addEventListener('click', function (e) {
	      e.preventDefault();
	      var w = window.pageYOffset;
	      var hash = this.href.replace(/[^#]*(.*)/, '$1');
	      var tar = document.querySelector(hash);
	      var t = tar.getBoundingClientRect().top - headerHeight;
	      var start = null;
	      requestAnimationFrame(step);

	      function step(time) {
	        if (start === null) {
	          start = time;
	        }

	        var progress = time - start,
	            r = t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t);
	        window.scrollTo(0, r);

	        if (r != w + t) {
	          requestAnimationFrame(step);
	        } else {
	          location.hash = hash;
	        }
	      }

	      if (t > 1 || t < -1) {
	        requestAnimationFrame(step);
	      }
	    });
	    gsap.to(".logo span", {
	      opacity: 0.3,
	      duration: 0.1,
	      repeat: 5,
	      yoyo: true,
	      ease: "power1.inOut",
	      onComplete: function onComplete() {
	        gsap.to(".logo span", {
	          opacity: 1,
	          duration: 0.5
	        });
	      }
	    });
	  }
	}

	function services () {
	  var services = document.querySelector('.services');
	  var servicesTitle = document.querySelector('.services__title');
	  var servicesItems = document.querySelectorAll('.service');
	  var servicesTimeline = gsap.timeline({
	    scrollTrigger: {
	      trigger: services,
	      start: "top 70%"
	    }
	  });
	  servicesTimeline.from(servicesTitle, {
	    opacity: 0,
	    y: "-100%",
	    duration: 0.6,
	    ease: "power2.out"
	  }).from(servicesItems, {
	    opacity: 0,
	    y: "-50%",
	    duration: 0.6,
	    stagger: 0.2,
	    ease: "power2.out"
	  }, "-=0.3");
	}

	function reviews () {
	  var reviews = document.querySelector('.reviews');
	  var reviewsTitle = document.querySelector('.reviews__title');
	  var reviewsItems = document.querySelectorAll('.review');
	  var reviewsTimeline = gsap.timeline({
	    scrollTrigger: {
	      trigger: reviews,
	      start: "top 70%"
	    }
	  });
	  reviewsTimeline.from(reviewsTitle, {
	    opacity: 0,
	    y: "-100%",
	    duration: 0.6,
	    ease: "power2.out"
	  }).from(reviewsItems, {
	    opacity: 0,
	    y: "-50%",
	    duration: 0.6,
	    stagger: 0.2,
	    ease: "power2.out"
	  }, "-=0.3");
	}

	function banner () {
	  function createObserver(blockClasses) {
	    var banner = document.querySelector('.banner');
	    if (!banner) return;
	    var blocks = blockClasses.map(function (cls) {
	      return document.querySelector(cls);
	    }).filter(Boolean);
	    var observer = new IntersectionObserver(function (entries) {
	      var isVisible = entries.some(function (entry) {
	        return entry.isIntersecting;
	      });

	      if (isVisible) {
	        banner.classList.add('hidden');
	      } else {
	        banner.classList.remove('hidden');
	      }
	    }, {
	      threshold: 0.1
	    });
	    blocks.forEach(function (block) {
	      return observer.observe(block);
	    });
	  }

	  var blockClasses = ['.footer', '.promo'];
	  createObserver(blockClasses);
	}

	document.addEventListener('DOMContentLoaded', function () {
	  promo();
	  about();
	  parallax();
	  faq();
	  xScroll();
	  header();
	  services();
	  reviews();
	  banner();
	});
	works();

}());
//# sourceMappingURL=main.js.map
