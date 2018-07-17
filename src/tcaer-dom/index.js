import { setAttributes } from './utils';

function render(vnode, container) {
  if ( typeof vnode === 'string' ) {
    const textNode = document.createTextNode( vnode );
    return container.appendChild( textNode );
  }
  
  const parentDOM = document.createElement(vnode.tag);
  
  if (vnode.attrs) {
    Object.keys(vnode.attrs).forEach((item) => {
      setAttributes(parentDOM, item, vnode.attrs[item]);
    });
  }
  
  vnode.children.length && vnode.children.forEach((child) => render(child, parentDOM));
  
  container.appendChild(parentDOM);
}

const tcaerDom = {
  render(vnode, container, callback) {
    container.innerHTML = '';
    render(vnode,container);
    callback && callback();
  },
};

export default tcaerDom;
