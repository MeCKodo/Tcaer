import { setAttributes, isChange } from "../tcaer-dom/utils";
import {genDOM} from "../tcaer-dom";

const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const REPLACE = 'REPLACE';
const REMOVE = 'REMOVE';

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

function diffChildren(nextVnode, prevVnode) {
  const { children: prevChildren } = prevVnode;
  const { children: nextChildren } = nextVnode;
  const patches = [];
  const maxLen = Math.max(prevChildren.length, nextChildren.length);
  for(let i = 0;i < maxLen; i++) {
    patches[i] = diffNode(
      nextChildren[i],
      prevChildren[i],
    )
  }
  return patches;
}

function diffNode(newNode, oldNode) {
  if (typeof newNode === 'number') newNode = String(newNode);
  if (typeof oldNode === 'number') oldNode = String(oldNode);
  
  if (!oldNode) {
    return {
      type: CREATE,
      newNode,
    }
  }
  if (!newNode) {
    return { type: REMOVE }
  }
  if (isChange(newNode, oldNode)) {
    // TODO component replace
    return {
      type: REPLACE,
      newNode
    }
  }
  if (newNode.tag) {
    console.log(newNode, '---newNode');
    if (typeof newNode.tag === 'function') {
    
    } else {
      return {
        type: UPDATE,
        tag: newNode.tag,
        children: diffChildren(newNode, oldNode)
      }
    }
  }
}

function updateDOM(parent, patches) {
  if (!patches) return;
  
  switch (patches.type) {
    case CREATE: {
      const { newNode } = patches;
      const newEl = genDOM(newNode);
      return parent.parentNode.appendChild(newEl);
    }
    case REMOVE: {
      return parent.parentNode.removeChild(parent);
    }
    case REPLACE: {
      const { newNode } = patches;
      const newEl = genDOM(newNode);
      if (parent.nodeType === 3) {
        return parent.parentNode.replaceChild(newEl, parent);
      }
      return parent.parentNode.replaceChild(newEl, parent);
    }
    case UPDATE: {
      const { children } = patches;
      
      for( let i = 0; i < children.length; i++ ) {
        updateDOM(parent.childNodes[i], children[i]);
      }
    }
  }
}

function update(dom, nextVnode, prevVnode) {
  console.log(nextVnode, prevVnode);
  const patchs = diffNode(nextVnode, prevVnode);
  console.log(patchs, '---patch');
  
  updateDOM(dom, patchs);
}

export {
  updateAttrs,
  update,
}
