<template>
  <div class="home-wrap">
    <picture>
      <source media="screen and (min-width: 992px)" srcset="/images/throne.jpg">
      <img src="/images/img-1000/throne(1000).jpg" class="home-img" alt="">
    </picture>
    <div class="home-text">
      <h1 class="home-h1">Game<span>of</span><wbr>Thrones</h1>
      <p class="home-h3">Actors</p>
    </div>
    <BoxArtors/>
    <PopUp/>
  </div>
</template>

<script setup>
import {homeLeave, homeFromEnter} from "~/composables/transition";

definePageMeta({
    pageTransition: {
      mode: 'in-out',
      css: false,
      onBeforeEnter(el) {
        homeFromEnter(el);
      },
      onLeave(el, done) {
        homeLeave(el, done);
      }
    }
  })

useHead({
  title: 'Game of Thrones',
})

</script>

<style lang="sass" scoped>

.home-wrap
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100vh
  display: flex
  flex-direction: column
  justify-content: space-between
  overflow: hidden

.home-img
  position: absolute
  top: 0
  left: 0
  height: 100%
  object-fit: cover
  object-position: center top
  z-index: -1

.home-text
  margin: 0 auto 0
  text-align: center
  color: #c0c0c0

.home-h1
  font: 95px 'game-of-thrones'
  letter-spacing: 8px
  margin: 0
  span
    font-size: 60px
    margin: 0 0 0 5px

.home-h3
  font: 80px 'monument-extended'
  margin: 20px 0 0

@media only screen and (max-width: 1200px)
  .home-h1
    font: 7.5vw 'game-of-thrones'
    span
      font-size: 4.3vw

  .home-h3
    font: 6.7vw 'monument-extended'

@media only screen and (max-width: 500px)
  .home-h1
    font: 12vw 'game-of-thrones'
    span
      font-size: 8vw

  .home-h3
    font: 11vw 'monument-extended'

</style>
