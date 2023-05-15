import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export let useSlider = {
  check: true
}

let arr = [];
let last;
export function sliderStart(array){
  arr = [];
  arr = array;
  last = array.length - 1;
}

export function moveSliderLeft() {
  useSlider.check = false;

  let tl = gsap.timeline({smoothChildTiming: true});

  tl.to(arr[1],{duration: 0.2,maxWidth: '40%',scale:1},'one')
    .to(arr[1].childNodes[0],{duration: 0.2,filter: 'grayscale(100%)'},'one')

    .set(arr[last],{x: '110%',zIndex: -1,opacity: 1},'two')
    .to(arr[0],{duration: 0.4,x: '0%',zIndex: 30,ease: "none"},'two')
    .to(arr[1],{duration: 0.4,x: '-110%',zIndex: 0,ease: "none"},'two')
    .set(arr[2],{x: '-110%',zIndex: -1},'two')
    .set(arr[3],{x: '0%',zIndex: -1,opacity: 0},'two')

    .to(arr[0],{duration: 0.2,maxWidth: '80%',scale:1.1},'three')
    .to(arr[0].childNodes[0],{duration: 0.2,filter: 'grayscale(0%)'},'three')

    .then(() => {
      useSlider.check = true;
      arr.unshift(arr.pop());
    });
}
export function moveSliderRight() {
  useSlider.check = false;

  let tl = gsap.timeline({smoothChildTiming: true});

  tl.to(arr[1],{duration: 0.2,maxWidth: '40%',scale:1},'one')
    .to(arr[1].childNodes[0],{duration: 0.2,filter: 'grayscale(100%)'},'one')
    .to(arr[3],{duration: 0.2,x: '-110%',zIndex: -1,opacity: 0},'one')

    .set(arr[last],{x: '0%',zIndex: -1,opacity: 0},'two')
    .to(arr[0],{duration: 0.4,zIndex: -1,ease: "none"},'two')
    .to(arr[1],{duration: 0.4,x: '110%',zIndex: 0,ease: "none"},'two')
    .to(arr[2],{duration: 0.4,zIndex: 30,x: '0%',ease: "none"},'two')
    .to(arr[3],{duration: 0.4,opacity: 1},'two')

    .to(arr[2],{duration: 0.2,maxWidth: '80%',scale:1.1},'three')
    .to(arr[2].childNodes[0],{duration: 0.2,filter: 'grayscale(0%)'},'three')

    .then(() => {
      useSlider.check = true;
      arr.push(arr.shift());
    });
}

export function observerSlider(el) {

  ScrollTrigger.observe({
    target: el,
    type: "touch",
    tolerance: 5,
    onLeft: () => {
      if (useSlider.check) moveSliderLeft();
    },
    onRight: () => {
      if (useSlider.check) moveSliderRight();
    }
  })
}


