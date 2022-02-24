"use strict";

///////////////////////////////////////
// Modal window
const section1 = document.querySelector("#section--1");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach(function (curr) {
  curr.addEventListener("click", openModal);
});
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
const navlink = document.querySelector(".nav__links");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

navlink.addEventListener("click", function (e) {
  e.preventDefault();

  if (!e.target.classList.contains("nav__link")) {
    return;
  }
  const ele = document.querySelector(e.target.getAttribute("href"));
  ele.scrollIntoView({ behavior: "smooth" });
});

tabsContainer.addEventListener("click", function (e) {
  const val = e.target.closest(".operations__tab");
  if (!val) return;
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((t) => t.classList.remove("operations__content--active"));
  val.classList.add("operations__tab--active");
  //active content area
  document
    .querySelector(`.operations__content--${val.dataset.tab}`)
    .classList.add("operations__content--active");
});
const hadleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

navlink.addEventListener("mouseover", hadleHover.bind(0.5));
navlink.addEventListener("mouseout", hadleHover.bind(1));
const navheigh = nav.getBoundingClientRect().height;
const obsCallback = function (entries, observer) {
  entries.forEach((entry) => {
    // nav.style.transition = "all 2s";
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  });
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `${navheigh}px`,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);

//reveal sections
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  sectionObserver.unobserve(entry.target);
};
const revOptions = {
  root: null,
  threshold: 0.15,
};
const sectionObserver = new IntersectionObserver(revealSection, revOptions);
const sections = document.querySelectorAll("section");
[...sections].forEach(function (e) {
  sectionObserver.observe(e);
  e.classList.add("section--hidden");
});
// LAZY LOADING IMAGES
const imgSelecter = document.querySelectorAll("img[data-src]");
const loading = function (entries, observer) {
  entries.forEach(function (ele) {
    if (!ele.isIntersecting) return;
    ele.target.setAttribute("src", ele.target.dataset.src);
    ele.target.addEventListener("load", function () {
      ele.target.classList.remove("lazy-img");
    });
    observer.unobserve(ele.target);
  });
};
const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
imgSelecter.forEach(function (ele) {
  imgObserver.observe(ele);
});
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");

const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

let currSlide = 0;
const maxSlide = slides.length;
const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};
goToSlide(0);
const dotContainer = document.querySelector(".dots");

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide= "${i}"></button>`
    );
  });
};
createDots();
const nextSlide = function () {
  if (currSlide === maxSlide - 1) currSlide = 0;
  else {
    currSlide++;
  }
  goToSlide(currSlide);
  dotmov(currSlide);
};
const preSlide = function () {
  if (currSlide === 0) currSlide = maxSlide - 1;
  else currSlide--;
  goToSlide(currSlide);
  dotmov(currSlide);
};
btnRight.addEventListener("click", function () {
  nextSlide();
});

btnLeft.addEventListener("click", function () {
  preSlide();
});
document.addEventListener("keydown", function (e) {
  e.key === "ArrowLeft" && preSlide();
  e.key === "ArrowRight" && nextSlide();
});
const dotsDot = document.querySelectorAll(".dots__dot");
console.log(dotsDot);

const dotsRem = function () {
  dotsDot.forEach((ele) => ele.classList.remove("dots__dot--active"));
};
const dotmov = function (slide) {
  dotsRem();
  const val = document.querySelector(`.dots__dot[data-slide="${slide}`);
  val.classList.add("dots__dot--active");
};
dotContainer.addEventListener("click", function (e) {
  dotsRem();
  if (!e.target.classList.contains("dots__dot")) return;
  dotmov(e.target.dataset.slide);
  currSlide = e.target.dataset.slide - 1;
  nextSlide();
});
