<template>
  <div class="maisie-smooth-wrapper actors-wrap">

    <picture class="actors-container">
      <source media="screen and (min-width: 992px)" srcset="/images/maisie-williams.jpg">
      <img src="/images/img-1000/maisie-williams(1000).jpg" class="actors-img" alt="">
    </picture>

    <NuxtLink to="/" class="actors-link">
      <img src="/images/logo-Targaryen.png" alt="">
    </NuxtLink>
    <div class="maisie-smooth-content actors-section">
      <div class="maisie-blog actors-blog">
        <h1 class="actors-h1">Maisie<br/>Williams</h1>
        <div class="actors-wrapper">
          <div class="actors-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias excepturi
            iusto
            perspiciatis sunt ullam! Beatae dolore est iste numquam optio perspiciatis porro sequi unde velit. Ad
            adipisci
            animi asperiores cumque distinctio eaque earum explicabo illum impedit ipsam ipsum iure labore minima nam
            necessitatibus nesciunt officiis porro provident quae quas quibusdam, quisquam reiciendis repellat
            repellendus
            sapiente sed tenetur veritatis vero vitae voluptas! Ab amet animi aspernatur commodi consectetur corporis,
            cupiditate dolores eos est excepturi facere itaque labore magnam maiores minima molestiae molestias
            mollitia
            natus nemo nihil non nulla officiis pariatur perspiciatis, porro quasi quibusdam quo recusandae rerum
            totam,
            unde velit!
          </div>

          <div class="actors-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus alias excepturi
            iusto
            perspiciatis sunt ullam! Beatae dolore est iste numquam optio perspiciatis porro sequi unde velit. Ad
            adipisci
            animi asperiores cumque distinctio eaque earum explicabo illum impedit ipsam ipsum iure labore minima nam
            necessitatibus nesciunt officiis porro provident quae quas quibusdam, quisquam reiciendis repellat
            repellendus
            sapiente sed tenetur veritatis vero vitae voluptas! Ab amet animi aspernatur commodi consectetur corporis,
            cupiditate dolores eos est excepturi facere itaque labore magnam maiores minima molestiae molestias
            mollitia
            natus nemo nihil non nulla officiis pariatur perspiciatis, porro quasi quibusdam quo recusandae rerum
            totam,
            unde velit!
          </div>
        </div>
      </div>
      <div class="maisie-slider actors-slider">

        <h2 class="slider-h2">Filmography</h2>

        <button class="button-slider sb-left">
          <svg>
            <use xlink:href="/images/sprite.svg#arrow"></use>
          </svg>
        </button>

        <button class="button-slider sb-right">
          <svg>
            <use xlink:href="/images/sprite.svg#arrow"></use>
          </svg>
        </button>

        <div class="slider-wrap">
          <div class="slider-item kit">
            <img src="/maisie-williams-movies/cyberbully.jpg" alt="" class="slider-img">
          </div>
          <div class="slider-item">
            <img src="/maisie-williams-movies/crickley-hall.jpg" alt="" class="slider-img">
          </div>
          <div class="slider-item">
            <img src="/maisie-williams-movies/book-love.jpg" alt="" class="slider-img">
          </div>
          <div class="slider-item">
            <img src="/maisie-williams-movies/mary-shelley.jpg" alt="" class="slider-img">
          </div>
          <div class="slider-item">
            <img src="/maisie-williams-movies/the-falling.jpg" alt="" class="slider-img">
          </div>
          <div class="slider-item">
            <img src="/maisie-williams-movies/then-came-you.jpg" alt="" class="slider-img">
          </div>
          <div class="slider-item">
            <img src="/maisie-williams-movies/two-weeks.jpg" alt="" class="slider-img last">
          </div>
          <div class="slider-spacer"></div>
        </div>

      </div>
      <BoxArtors @eventSlider="startSlider"/>
    </div>
  </div>

</template>

<script setup>
import {state, scroller} from '~/composables/state'
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {onMounted, ref, watch} from 'vue'
import {moveSliderRight, moveSliderLeft, sliderStart, useSlider, observerSlider} from "~/composables/slider"
import {
  actorFromEnterFalse,
  actorFromEnterTrue,
  actorEnterFalse,
  actorEnterTrue,
  actorLeave,
  actorLeaveTrue,
  actorBeforeLeaveTrue
} from "~/composables/transition";

definePageMeta({
  pageTransition: {
    mode: 'in-out',
    css: false,
    onBeforeEnter(el) {
      (!state.check) ? actorFromEnterFalse(el):actorFromEnterTrue(el);
    },
    onEnter(el, done) {
      (!state.check) ? actorEnterFalse(el, done) : actorEnterTrue(el, done);
    },
    onBeforeLeave(el) {
      actorBeforeLeaveTrue(el);
    },
    onLeave(el, done) {
      (!state.check) ? actorLeave(el, done):actorLeaveTrue(el, done);
    }
  }
})

useHead({
  title: 'Maisie Williams',
})

let start = ref(true)

const startSlider = ()=>{
  start.value = !start.value;
}

onMounted(() => {

  watch(start, () => setSlider());

  gsap.registerPlugin(ScrollTrigger);

  const $actorsSmoothWrap = document.querySelector('.maisie-smooth-wrapper');
  const $actorsSmoothContent = document.querySelector('.maisie-smooth-content');
  const $blog = document.querySelector('.maisie-blog');
  const $actorsSlider = document.querySelector('.maisie-slider');

  function setSlider() {

    let sliderArr = [...document.querySelectorAll('.slider-item')];

    sliderStart(sliderArr);

    const arrButtonSlider = [...document.querySelectorAll('.button-slider')];

    const resizeObserver = new ResizeObserver(entries =>{
      for(let entry of entries){
        const width = entry.contentBoxSize[0].inlineSize;
        if (width >= 768){
          arrButtonSlider.forEach(el => el.classList.add('active-button-slider'));
        } else {arrButtonSlider.forEach(el => el.classList.remove('active-button-slider'));}
      }
    })
    resizeObserver.observe($actorsSlider);

    arrButtonSlider[0].addEventListener('click', () => {
      if (useSlider.check) moveSliderLeft();
    });

    arrButtonSlider[1].addEventListener('click', () => {
      if (useSlider.check) moveSliderRight();
    });

    if (ScrollTrigger.isTouch === 1) {
      observerSlider($actorsSlider);
    }

    document.addEventListener("keydown", (e) => {
      if (useSlider.check && e.code === 'ArrowLeft') moveSliderLeft();
      if (useSlider.check && e.code === 'ArrowRight') moveSliderRight();
    });
  }
  if (state.path === null) setSlider();

  scroller($actorsSmoothWrap,$actorsSmoothContent,$blog);
})

</script>

<style lang="sass" scoped>

.actors-wrap
  --value: 0
  --grayscale: grayscale(var(--value))
  --blur: 0
  --opacity: 0
  --fill: #D3D3D3

.actors-link
  position: absolute
  top: 20px
  left: 20px
  width: 60px
  z-index: 2

.actors-section
  padding-bottom: 1px

.actors-container
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  will-change: width, height
  z-index: -1
  &:before
    position: absolute
    content: ''
    inset: 0
    background-color: #000000
    z-index: 1
    opacity: var(--opacity)

.actors-img
  width: 100%
  height: 100%
  filter: var(--grayscale) blur(var(--blur))
  object-fit: cover

.actors-blog
  max-width: 1400px
  margin: 0 auto
  padding-top: 100vh

.actors-h1
  font: 80px 'monument-extended'
  margin: 0 0 0 20px
  color: #D3D3D3

.actors-wrapper
  display: flex

.actors-text
  font-size: 20px
  margin: 30px 20px 0
  color: #D3D3D3

//______ slider ____________________//

.actors-slider
  position: relative
  max-width: 1400px
  height: max-content
  margin: 50px auto 100px

.slider-h2
  width: max-content
  font: 60px 'monument-extended'
  margin: 60px auto 80px
  color: #D3D3D3

.button-slider
  position: absolute
  height: 60px
  width: 60px
  border-radius: 50%
  top: 60%
  transform: translateY(-50%)
  border: none
  fill: var(--fill)
  background-color: transparent
  background-image: radial-gradient(closest-side,#202020, transparent)
  outline: none
  z-index: 1
  visibility: hidden
  svg
    width: 40px
    height: 40px
  &:hover,
  &:focus
    --fill: #F5B416

.sb-left
  left: 10px
  transform: translateY(-50%) rotate(-180deg)

.sb-right
  right: 10px

.active-button-slider
  visibility: visible

.slider-wrap
  position: relative
  max-width: 800px
  margin: 0 auto
  height: 100%
  contain: layout

.slider-spacer
  width: 100%
  padding-top: 75%

.slider-item
  display: flex
  justify-content: center
  position: absolute
  inset: 0
  max-width: 40%
  margin: 0 auto
  overflow: hidden
  border-radius: 20px
  opacity: 0
  z-index: -1
  will-change: transform, max-width, z-index
  &:first-child
    opacity: 1
    transform: translate(110%, 0) scale(1)
    z-index: 0
  &:nth-child(2)
    opacity: 1
    z-index: 30
    transform: scale(1.1)
    max-width: 80%
    img
      filter: grayscale(0)
  &:nth-child(3)
    opacity: 1
    transform: translate(-110%, 0) scale(1)
    z-index: 0
  &:nth-child(4)
    opacity: 1
    z-index: -1
    transform: translate(-110%, 0) scale(1)
  &:last-child
    opacity: 1
    z-index: -1
    transform: translate(110%, 0) scale(1)

.slider-img
  width: auto
  height: 100%
  border-radius: 20px
  filter: grayscale(100%)
  will-change: filter

@media only screen and (max-width: 1060px)
  .slider-wrap
    max-width: 75.47vw

@media only screen and (max-width: 992px)
  .actors-text
    font-size: 16px

@media only screen and (max-width: 768px)
  .actors-link
    top: 10px
    left: 10px
    width: 50px

  .actors-h1
    font: 10.5vw 'monument-extended'

  .slider-h2
    font: 7.8vw 'monument-extended'

@media only screen and (max-width: 480px)
  .actors-wrapper
    flex-direction: column

</style>
