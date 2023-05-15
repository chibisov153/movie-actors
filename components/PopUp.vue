<template>
  <div class="popup">
    <div class="popup-wrap">
      <div class="popup-blog">
        <h2 class="popup-h2">Pet-проект</h2>
        <p class="popup-text">фреймворк: Nuxt 3</p>
        <p class="popup-text">анимация: GSAP</p>
        <p class="popup-text">плагины: ScrollTrigger, ScrollSmoother</p>
        <p class="popup-text">задача: Создать бесшовное, адаптивное приложене и подружить его с плагинами</p>
        <button class="popup-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import {state} from '~/composables/state';

onMounted(()=>{
  const popup = document.querySelector('.popup');
  const popupBlog = document.querySelector('.popup-blog');
  const popupButton = document.querySelector('.popup-button');

  popupButton.addEventListener('click', () => {
    popupBlog.classList.remove('popup-blog-active');
    setTimeout(()=>{
      popup.classList.remove('popup-active');
    },1000);
  });

  if(!state.popup){
    setTimeout(()=>{
      popup.classList.add('popup-active');
      popupBlog.classList.add('popup-blog-active');
      state.popup = true;
    },1000);
  }
})
</script>

<style lang="sass" scoped>
.popup
  --color: #232629
  position: absolute
  top: 50%
  left: 0
  width: 100%
  transform: translateY(-50%)
  padding: 0 14px
  visibility: hidden

.popup-active
  visibility: visible

.popup-wrap
  max-width: 560px
  margin: 0 auto
  overflow: hidden

.popup-blog
  width: 100%
  padding: 0.1px 0 30px
  border-top: 2px solid var(--color)
  border-right: 2px solid var(--color)
  border-bottom: 2px solid var(--color)
  border-radius: 0 16px 16px 0
  backdrop-filter: blur(12px)
  background-color: rgba(225, 225, 225,0.4)
  transform: translateX(-100%)
  transition: 0.8s

.popup-blog-active
  transform: translateX(0)

.popup-h2
  width: max-content
  font: 40px 'Roboto-Regular'
  margin: 18px auto 0 auto
  color: var(--color)

.popup-text
  font: 20px 'Roboto-Regular'
  margin: 5px 16px 0 16px
  color: var(--color)

.popup-button
  display: block
  width: 100px
  height: 40px
  margin: 24px auto 0
  padding: 0
  font: 20px 'Roboto-Regular'
  text-transform: uppercase
  border: 2px solid var(--color)
  border-radius: 14px
  color: var(--color)
  background-color: transparent
  transition: 0.4s
  &:hover
    background-color: #31363B
    color: #AFB1B3

</style>
