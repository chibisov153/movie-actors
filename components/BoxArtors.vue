<template>
  <div class="box-actors">

    <button class="box-arrow box_sb-left">
      <svg>
        <use xlink:href="/images/sprite.svg#arrow"></use>
      </svg>
    </button>

    <button class="box-arrow box_sb-right">
      <svg>
        <use xlink:href="/images/sprite.svg#arrow"></use>
      </svg>
    </button>

    <div class="box-wrap">

      <NuxtLink to="/emilia-clarke" data-href="/emilia-clarke" class="box-images">
        <div class="box-picture">
          <img src="/images/img-500/emilia-clarke(500).jpg" alt="">
        </div>
      </NuxtLink>
      <NuxtLink to="/kit-harington" data-href="/kit-harington" class="box-images">
        <div class="box-picture">
          <img src="/images/img-500/kit-harington(500).jpg" alt="">
        </div>
      </NuxtLink>
      <NuxtLink to="/maisie-williams" data-href="/maisie-williams" class="box-images">
        <div class="box-picture">
          <img src="/images/img-500/maisie-williams(500).jpg" alt="">
        </div>
      </NuxtLink>
      <NuxtLink to="/peter-dinklage" data-href="/peter-dinklage" class="box-images">
        <div class="box-picture">
          <img src="/images/img-500/peter-dinklage(500).jpg" alt="">
        </div>
      </NuxtLink>
      <NuxtLink to="/natalie-dormer" data-href="/natalie-dormer" class="box-images">
        <div class="box-picture">
          <img src="/images/img-500/natalie-dormer(500).jpg" alt="">
        </div>
      </NuxtLink>
      <NuxtLink to="/nikolai-coster-waldau" data-href="/nikolai-coster-waldau" class="box-images">
        <div class="box-picture">
          <img src="/images/img-500/nikolai-coster-waldau(500).jpg" alt="">
        </div>
      </NuxtLink>
      <NuxtLink to="/lena-headey" data-href="/lena-headey" class="box-images">
        <div class="box-picture">
          <img src="/images/img-500/lena-headey(500).jpg" alt="">
        </div>
      </NuxtLink>
      <NuxtLink to="/sean-bean" data-href="/sean-bean" class="box-images">
        <div class="box-picture">
          <img src="/images/img-500/sean-bean(500).jpg" alt="">
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"
import {state} from '~/composables/state'
import {onMounted, ref, watch} from 'vue'
import {
  dataImg,
  useDataImg,
  useDataXY
} from "~/composables/transition";

let startBoxWrap = ref(true);

const eventSlider = defineEmits();

onMounted(()=>{

  const config = {
    childList: true,
    subtree: true,
  };

  const callback = function(mutationsList) {
    for (let mr of mutationsList) {
      if (mr.removedNodes.length > 0 && mr.removedNodes[0].className) {
        startBoxWrap.value = !startBoxWrap.value;
      }
    }
  };

  const observer = new MutationObserver(callback)
  observer.observe(document.body, config);

  watch(startBoxWrap, () => {
    eventSlider('eventSlider');
    loadingBoxWrap();
    observer.disconnect();
  });

  gsap.registerPlugin(ScrollTrigger);

  let $boxWrap = document.querySelector('.box-wrap');
  let arrBoxImages = [...document.querySelectorAll('.box-images')];
  let windowW, windowH, boxWrapWidth;
  let observerCheck = false;
  let check = true;
  let count = 0;

  const router = useRouter();

  function windowSize() {
    windowH = window.innerHeight;
    windowW = window.innerWidth;
  }
  windowSize();

  (()=> {
    if (windowW <= 992 && !state.check) {
      setTimeout(() => {
        document.documentElement.scrollIntoView(false);
      }, 0)
    }
    if (windowW >= 992 && state.check) {
      boxWrapWidth = $boxWrap.offsetWidth - 150
    } else boxWrapWidth = $boxWrap.offsetWidth
  })();

  router.beforeResolve((to, from, next) => {
    if(check){
      let {current, forward} = history.state
      if (current === to.href && (forward) || to.href === '/') {
        if (dataImg.has(state.path) === true) {
          state.check = false;
          state.path = from.href;
          useDataXY();
          next();
        } else next({ path: "/" })
      } else {
        document.documentElement.scrollIntoView(false);
        let elem = document.querySelector('a[href="' + to.href + '"]');
        let data = elem.getBoundingClientRect();
        dataImg.set(to.href, {x: data.x, position: count});
        state.path = to.href;
        state.check = true;
        useDataXY();
        useDataImg(data,windowH);
        next();
      }
      check = false;
    } else next();
  });

  if (state.path) {
    let arr = arrBoxImages.filter(item => item.dataset.href === `${state.path}`)
    if (arr.length === 2) {
      arr.splice(arr.findIndex(e => e.className ===
          "router-link-active router-link-exact-active box-images"),1);
      if (boxWrapWidth >= windowW){
        let {position} = dataImg.get(state.path);
        gsap.set(arr[0].parentNode, {x: position});
        count = position;
      }
      if (windowW >= 992){
        let ctx = gsap.context(() => {
          gsap.set(arr[0], {width: 300})
          gsap.set(arr[0].childNodes[0], {x: 0});
        });
        gsap.delayedCall(state.t, () => {
          ctx.revert();
        });
      }
    }
  }

  function loadingBoxWrap() {
    arrBoxImages = [...document.querySelectorAll('.box-images')];
    $boxWrap = document.querySelector('.box-wrap');
    const boxArrow = [...document.querySelectorAll('.box-arrow')];

    function visibilityBoxWrap() {
      if (boxWrapWidth >= windowW && windowW >= 480){
        boxArrow.forEach(el => el.classList.add('active-box-arrow'));
      } else {
        boxArrow.forEach(el => el.classList.remove('active-box-arrow'));
      }
    }
    visibilityBoxWrap();

    window.addEventListener('resize', () => {
      windowSize();
      visibilityBoxWrap();
    });

    function moveImag(ifVar, value) {
      if (ifVar === 'left' && (windowW + (count * -1)) >= boxWrapWidth) return false
      if (ifVar === 'right' && count === 0) return false
      count += value;
      gsap.to($boxWrap, {duration: 0.6, x: count});
    }

    boxArrow[0].addEventListener('click', () => moveImag('left', -160));

    boxArrow[1].addEventListener('click', () => moveImag('right', 160));

    if (ScrollTrigger.isTouch === 1) {
      ScrollTrigger.observe({
        target: $boxWrap,
        type: "touch",
        tolerance: 5,
        onDragEnd: () => {
          setTimeout(() => observerCheck = false, 400)
        },
        onLeft: () => {
          if (observerCheck) return false
          moveImag('left', -160);
          observerCheck = true;
        },
        onRight: () => {
          if (observerCheck) return false
          moveImag('right', 160);
          observerCheck = true;
        }
      })
    }
  }
  if (state.path === null) loadingBoxWrap();
})

</script>

<style lang="sass" scoped>
.box-actors
  position: relative
  width: calc(100vw - 10px)
  padding: 0 0 0 5px
  margin: 0 0 20px 0
  overflow: hidden
  border-radius: 10px

.box-arrow
  --fill: #D3D3D3
  position: absolute
  height: 50px
  width: 50px
  border-radius: 50%
  top: 50%
  transform: translateY(-50%)
  border: none
  fill: var(--fill)
  background-color: transparent
  background-image: radial-gradient(closest-side,#202020, transparent)
  z-index: 1
  visibility: hidden
  svg
    width: 30px
    height: 30px
  &:hover,
  &:focus
    --fill: #F5B416

.box_sb-left
  left: 0
  transform: translateY(-50%) rotate(-180deg)

.box_sb-right
  right: -8px

.active-box-arrow
  visibility: visible

.box-wrap
  width: max-content
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  padding: 0 0 0 -10px
  margin: 0 auto

.box-images
  width: 150px
  margin: 0 5px
  overflow: hidden
  border-radius: 10px
  transition: 0.5s
  outline: none
  &:hover,
  &:focus
    width: 300px
    .box-picture
      transform: translateX(0)

.box-picture
  width: 300px
  transform: translateX(-75px)
  transition: 0.5s

@media only screen and (max-width: 992px)
  .box-images
    &:hover,
    &:focus
      width: 150px
      .box-picture
        transform: translateX(-75px)

</style>
