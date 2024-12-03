"use strict";

const page = document.querySelector('.page');
const burger = document.querySelector('.burger');
const menu = document.querySelector('.header__menu');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.menu__link[data-goto]');
const form = document.querySelector('.form');
const transitionTime = 400;
const pageTitle = document.querySelector('.main__title');

document.addEventListener('DOMContentLoaded', () => {
  setImgParallax();
});

window.addEventListener('scroll', () => {
  toggleAnimItems();
  addGlassmorphToHeader();
});

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  menu.classList.toggle('active');
  lockPage();
})

if (navLinks.length) {
  for (const link of navLinks) {
    link.addEventListener('click', (e) => {
      if (burger.classList.contains('active')) {
        burger.classList.remove('active');
        menu.classList.remove('active');
        unLockPage();
      }
      e.preventDefault();

      window.scrollTo({
				top: getScrollValue(link),
				behavior: "smooth"
			});

    })
  }
}

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    e.target.reset();
  })
}

function getScrollValue(link) {
  const blockName = link.dataset.goto;
  const block = document.querySelector(blockName);
  const scrollValue = block.getBoundingClientRect().top + pageYOffset - header.offsetHeight;
  return scrollValue || 0;
}

function setImgParallax() {
  const parallaxBlock = document.querySelector('.parallax-block-img');
  if (parallaxBlock) {
    const parallaxImg = parallaxBlock.querySelector('.parallax-img');
    const newImageUrl = parallaxImg.getAttribute('src');
    parallaxBlock.style.setProperty('--image-url', 'url('+ '../.' + newImageUrl + ')');
  }
}

function toggleAnimItems(selector = '.scroll-anim') {
const animItems = document.querySelectorAll(selector);

  animItems.forEach(item => {
    if (isInView(item)) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  })
}

function isInView(elem) {
  const rect = elem.getBoundingClientRect();
  const elemHeight = elem.offsetHeight;
  const persent = 0.35;
  const visiblePart = elemHeight * persent;
  
  return rect.bottom > 0 && rect.top < (
    window.innerHeight - visiblePart || document.documentElement.clientHeight - visiblePart);
}

function lockPage() {
  const rightPaddingValue = window.innerWidth - document.documentElement.clientWidth + 'px';
  setRightPadding(rightPaddingValue);
  page.classList.toggle('lock');
}

function unLockPage() {
  setTimeout(() => {
    setRightPadding('0px');
    page.classList.toggle('lock');
  }, transitionTime);
}

function setRightPadding(rightPadding) {
  const rightPaddingItems = document.querySelectorAll('.right-padding');
  if (rightPaddingItems.length) {
    for (const item of rightPaddingItems) {
      item.style.paddingRight = rightPadding;
    }
  }
}

function addGlassmorphToHeader() {
  const valueToTitle = pageTitle.getBoundingClientRect().top;
  if (valueToTitle <= header.offsetHeight) {
    header.style.setProperty('--before-opacity', '1');
  } else {
    header.style.setProperty('--before-opacity', '0');
  }
}

