import {gsap} from "gsap";
import {state} from '~/composables/state'

let boxX, boxY,width,height;
export const dataImg = new Map();
export const useDataXY = () => {
  if (dataImg.get(state.path)) {
    let {x} = dataImg.get(state.path)
    boxX = x;
  }
}
export const useDataImg = (data,windowH) => {
  width = data.width;
  height = data.height
  boxY = windowH - data.height - 20;
}
function preventScroll(e){
  e.preventDefault();
  e.stopPropagation();
  return false;
}

function disable(el){
  el.addEventListener('wheel', preventScroll);
}
function enable(el){
  el.removeEventListener('wheel', preventScroll);
}
export const actorFromEnterTrue = (el) => {
  disable(el);
  gsap.set(el.childNodes[0],{width: width, height: height});
}
export const actorFromEnterFalse = (el) => {
  gsap.set(el,{inset: "0px auto auto 0px"});
  gsap.set(el.childNodes[0],{width: '100%',height: '100%'});
}
export const actorEnterTrue = (el, done) => {
  const tl = gsap.timeline();
  tl.to(el,{duration:0.01,inset:`${boxY}px auto auto ${boxX}px`,zIndex: 1})
    .to(el,{duration: state.t,inset:`0px auto auto 0px`},'start')
    .to(el.childNodes[0], {duration: state.t, width: '100%',height: '100%'},'start')
    .then(done)
    .then(()=>enable(el));
}

export const actorEnterFalse = (el, done) => {
  done();
}

export const actorBeforeLeaveTrue = (el) => {
  state.scroll.kill();
}

export const actorLeave = (el, done) => {

  const tl = gsap.timeline();
  tl.set(el,{zIndex: 1,position: 'fixed',width: '100%',height: '100%',overflow: 'hidden',inset:`0px auto auto 0px`})
    .to(el,{duration: state.t,inset:`${boxY}px auto auto ${boxX}px`},'start')
    .to(el.childNodes[0], {duration: state.t,width: width, height: height},'start')
    .set(el,{'--opacity': 0, '--blur': '0px', '--value': '0%'},'start')
    .set([el.childNodes[1],el.childNodes[2]],{opacity: 0},'start')
    .then(done);
}

export const actorLeaveTrue = (el,done) => {
  const tl = gsap.timeline();
  tl.set(el,{duration: 0.01,position: 'fixed',inset: 0,height: '100%',width: '100%', zIndex: -1,
      '--opacity': 0.85, '--blur': '6px', '--value': '100%'})
  .to(el,{duration: state.t}).then(done);
}

export const homeFromEnter = (el) => {
  gsap.set(document.body,{height: '100vh'});
}

export const homeLeave = (el, done) => {
  gsap.to(el,{duration: state.t,zIndex: 1}).then(done);
}



