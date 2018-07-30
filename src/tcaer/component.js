import { genDOM } from "../tcaer-dom";

function updateComponent(instance) {
  console.log(instance.__prevVnode, '------prev');
  console.log(instance.dom.parentNode, '------parentNode');
}

export default class Component {
  constructor(props = {}) {
    this.state = this.state || {};
    this.props = props;
  }
  
  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState);
    console.log(this.render(), '---new vnode');
    updateComponent(this);
  }
  
}
