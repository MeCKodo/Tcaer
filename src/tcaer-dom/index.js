import { setAttributes } from './utils';

function createComponent(vnode, container) {
  const { attrs, type } = vnode;
  const props = attrs ? attrs : {};
  const component = new type(props);
  return component.render ?
    renderComponent(component, container) :
    renderFunctionalComponent(component, container);
}

function renderFunctionalComponent(component, container) {
  return genDOM(component, container);
}

function renderComponent(component, container) {
  const vnode = component.render();
  const DOM = genDOM(vnode, container);
  
  component.__prevVnode = vnode;
  component.dom = DOM;
  
  container.appendChild(DOM);
  
  if (component.componentDidMount) {
    component.componentDidMount();
  }
  
  return DOM;
}

export function genDOM(vnode, container) {
  // 如果差值表达式里有props没有的值会出错，渲染boolean会无效
  if (typeof vnode === 'undefined' || typeof vnode === 'boolean') vnode = '';
  
  if (typeof vnode.type === 'function') {
    return createComponent(vnode, container);
  }
  
  if (typeof vnode === 'number') vnode = String(vnode);
  
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode);
  }
  
  const parentDOM = document.createElement(vnode.type);
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach((item) => {
      setAttributes(parentDOM, item, vnode.attrs[item]);
    });
  }
  vnode.children.length && vnode.children.forEach((child) => {
    if (Array.isArray(child)) {
      child.forEach((item) => {
        parentDOM.appendChild(genDOM(item, container));
      });
      return;
    }
    parentDOM.appendChild(genDOM(child, container));
  });
  
  return parentDOM;
}

const TcaerDom = {
  render(vnode, container, callback) {
    container.innerHTML = '';
    const DOM = genDOM(vnode, container);
    container.appendChild(DOM);
    
    callback && callback();
  },
};

export default TcaerDom;
