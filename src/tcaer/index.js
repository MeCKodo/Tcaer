import Component from './component';

const Tcaer = {
  h,
  Component,
};

function h(type, attrs, ...children) {
  // console.log(children);
  return {
    type,
    attrs,
    children
  }
}

export default Tcaer;
