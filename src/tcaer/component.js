import { genDOM } from "../tcaer-dom";
import { updateAttrs, updateChildren } from "./diff";

function updateComponent(instance) {
  const nextVnode = instance.render();
  const prevVnode = instance.__prevVnode;
  const dom = instance.dom;
  
  // updateAttrs(dom, prevVnode, nextVnode);
  updateChildren(dom, prevVnode, nextVnode, instance);
  instance.__prevVnode = instance.render();
}

export default class Component {
  constructor(props = {}) {
    this.state = this.state || {};
    this.props = props;
  }
  
  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState);
    updateComponent(this);
  }
  
}
