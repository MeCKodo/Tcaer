import Component from './component';

const Tcaer = {
  h,
  Component,
};

function h( tag, attrs, ...children ) {
  return {
    tag,
    attrs,
    children
  }
}

export default Tcaer;
