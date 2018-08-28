import { genDOM } from "../tcaer-dom";
import { updateAttrs, update } from "./diff";

function updateComponent(instance) {
  const nextVnode = instance.render();
  const prevVnode = instance.__prevVnode;
  const dom = instance.dom;
  
  // updateAttrs(dom, prevVnode, nextVnode);
  update(dom, nextVnode, prevVnode, instance);
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
