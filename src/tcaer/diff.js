import { setAttributes } from "../tcaer-dom/utils";
import {genDOM} from "../tcaer-dom";

function diffAttrs(prevVnode, nextVnode) {
  const { attrs: prevAttrs } = prevVnode;
  const { attrs: nextAttrs } = nextVnode;
  const needAdd = {};
  const needUpdate = {};
  const needRemove = {};
  Object.keys(nextAttrs).forEach((attrKey) => {
    if (prevAttrs[attrKey]) {
      // 如果修改前的vnode存在该属性
      // 则判断是否有变化
      if (prevAttrs[attrKey] !== nextAttrs[attrKey]) {
        // 没有变化不需要修改
        needUpdate[attrKey] = nextAttrs[attrKey];
      }
    } else {
      // 修改前的vnode 不存在该属性，新增的attr
      needAdd[attrKey] = nextAttrs[attrKey];
    }
  });
  
  // Get need remove attrs
  Object.keys(prevAttrs).forEach((attrKey) => {
    if (!nextAttrs[attrKey]) {
      // 如果下次的vnode 不存在这个attr 则直接删除
      needRemove[attrKey] = attrKey;
    }
  });
  
  return {
    needAdd,
    needUpdate,
    needRemove
  }
}

function updateAttrs(dom, prevVnode, nextVnode) {
  const { needAdd, needUpdate, needRemove } = diffAttrs(prevVnode, nextVnode);
  Object.keys(needAdd).forEach((attr) => {
    setAttributes(dom, attr, needAdd[attr]);
  });
  
  Object.keys(needUpdate).forEach((attr) => {
    setAttributes(dom, attr, needUpdate[attr]);
  });
  
  Object.keys(needRemove).forEach((attr) => {
    setAttributes(dom, attr, '');
  });
}

function diffChildren(dom, prevVnode, nextVnode) {
  const { children: prevChildren } = prevVnode;
  const { children: nextChildren } = nextVnode;
  console.log(prevChildren, nextChildren);
  const newChildren = [];
  nextChildren.forEach((node, index) => {
    // node 为string（textNode）情况
    if (!node || typeof node === 'boolean') node = '';
    
    if (typeof node === 'number') node = String(node);
    
    if (typeof node === 'string') {
      if (prevChildren[index] !== nextChildren[index]) {
        newChildren.push(node);
      }
    } else {
      // node 为对象有两种情况
      if (typeof node.tag === 'string') {
        //   1. 一种tag直接是DOM的vnode
        if (prevChildren[index].tag !== nextChildren[index].tag) {
          // span -> b
          newChildren.push(nextChildren[index]);
        } else {
          console.log(nextChildren[index], 'sdfdsfsf');
          newChildren.push('');
          // 递归 diffChildren
          // const newChildren = diffChildren(dom)
        }
      } else {
        //   2. 一种tag是fn的component
        
      }
    }
  });
  console.log(newChildren);
  return newChildren;
}

function updateChildren(dom, prevVnode, nextVnode) {
  const newChild = diffChildren(dom, prevVnode, nextVnode);
  const childNodes = dom.childNodes;
  // update dom
  newChild.forEach((node, index) => {
    const targetDom = childNodes[index];
    if (!node) return;
    
    if (typeof node === 'string') {
      dom.childNodes[index].textContent = node;
    } else {
      if (typeof node.tag === 'string') {
        console.log(targetDom, node, '-------');
        const parentNode = targetDom.parentNode;
        const dom = genDOM(node, parentNode);
        console.log(dom, '----domdomdomdom')
        parentNode.replaceChild(dom, targetDom);
      } else {
      
      }
    }
  });
}

export {
  updateAttrs,
  updateChildren,
}
