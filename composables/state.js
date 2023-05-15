import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import ScrollSmoother from "gsap/dist/ScrollSmoother.min"
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
export let state = {
  path: null,
  check: null,
  t: 0.6,
  scroll: null,
  popup: null
};
export function scroller(a,b,c) {
  ScrollSmoother.create({
    wrapper: a,
    content: b,
    smooth: 4,
    smoothTouch: true
  }).scrollTo(0);
  function trigger() {
    state.scroll = ScrollTrigger.create({
      trigger: c,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      animation: gsap.to(a, {'--opacity': 0.85, '--blur': '6px', '--value': '100%'}),
    })
  }
  state.check ? gsap.delayedCall(state.t,trigger) : trigger();
}



