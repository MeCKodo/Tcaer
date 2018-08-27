import { setAttributes, isChange } from "../tcaer-dom/utils";
import {genDOM} from "../tcaer-dom";

const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const REPLACE = 'REPLACE';
const REMOVE = 'REMOVE';

function diffChildren(parent, nextVnode, prevVnode) {
  const { children: prevChildren } = prevVnode;
  const { children: nextChildren } = nextVnode;
  const patches = [];
  const maxLen = Math.max(prevChildren.length, nextChildren.length);
  for(let i = 0;i < maxLen; i++) {
    patches[i] = diffNode(
      parent,
      nextChildren[i],
      prevChildren[i],
    )
  }
  return patches;
}

function diffNode(parent, newNode, oldNode) {
  if (typeof newNode === 'number') newNode = String(newNode);
  if (typeof oldNode === 'number') oldNode = String(oldNode);
  
  if (!newNode && !oldNode) return;
  
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
  
  if (newNode.type) {
    console.log(newNode, '---newNode');
    if (typeof newNode.type === 'function') {
      const prevComponent = oldNode.type(oldNode.attrs || {});
      const nextComponent = newNode.type(newNode.attrs || {});
      const prevVnode = prevComponent.render ? prevComponent.render() : prevComponent;
      const nextVnode = nextComponent.render ? nextComponent.render() : nextComponent;
      return diffNode(parent, nextVnode, prevVnode);
    } else {
      return {
        type: UPDATE,
        tag: newNode.type,
        children: diffChildren(parent, newNode, oldNode)
      }
    }
  }
  
}

function updateDOM(parent, patches, index = 0) {
  console.log(parent);
  if (!patches) return;
  
  const el = parent.childNodes[index];
  
  switch (patches.type) {
    case CREATE: {
      const { newNode } = patches;
      const newEl = genDOM(newNode);
      // if (insertAdjacentType === 'beforebegin') {
      //   return node.insertAdjacentElement(insertAdjacentType, newEl);
      // }
      return parent.appendChild(newEl);
    }
    case REMOVE: {
      return parent.parentNode.removeChild(parent);
    }
    case REPLACE: {
      const { newNode } = patches;
      const newEl = genDOM(newNode);
      return parent.parentNode.replaceChild(newEl, parent);
    }
    case UPDATE: {
      const { children } = patches;
      const childrenLen = children.length;
      console.log(patches, '----patches');
      for(let i = 0; i < childrenLen; i++) {
        const childNodes = parent.childNodes;
        const needUpdateChild = children[i];
        let node = childNodes[i];
        if (needUpdateChild) {
          if (needUpdateChild.type === REMOVE) {
            children.splice(i, 1);
          }
          updateDOM(node, needUpdateChild);
        }
      }
    }
  }
}

function update(parent, nextVnode, prevVnode) {
  console.log(nextVnode, prevVnode);
  const patches = diffNode(parent, nextVnode, prevVnode);
  console.log(patches, '----patches');
  updateDOM(parent, patches);
}

export {
  update,
}

/**
 * for( let i = 0; i < childrenLen; i++ ) {
        const needUpdateChild = children[i];
        let node = childNodes[i];
        if (needUpdateChild) {
          if (needUpdateChild.type === CREATE) {
            if (i === childrenLen - 1) { // 添加到末尾
              updateDOM(parent, needUpdateChild);
            } else { // 在某元素之前添加
              updateDOM(parent, needUpdateChild, 'beforebegin', node);
            }
          } else {
            if (!node) node = childNodes[i - 1];
            if (childNodes.length !== childrenLen) node = childNodes[i - 1];
            updateDOM(node, needUpdateChild);
          }
        }
      }
 */
