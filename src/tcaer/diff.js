import { setAttributes, isChange } from "../tcaer-dom/utils";
import {genDOM} from "../tcaer-dom";

const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const REPLACE = 'REPLACE';
const REMOVE = 'REMOVE';

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
  if (newNode.type) {
    console.log(newNode, '---newNode');
    if (typeof newNode.type === 'function') {
    
    } else {
      return {
        type: UPDATE,
        tag: newNode.type,
        children: diffChildren(newNode, oldNode)
      }
    }
  }
}

function updateDOM(parent, patches, child) {
  console.log(parent);
  if (!patches) return;
  
  switch (patches.type) {
    case CREATE: {
      const { newNode } = patches;
      const newEl = genDOM(newNode);
      if (child) {
        return child.parentNode.insertBefore(newEl, child);
      }
      return parent.appendChild(newEl);
    }
    case REMOVE: {
      return child.parentNode.removeChild(child);
    }
    case REPLACE: {
      const { newNode } = patches;
      const newEl = genDOM(newNode);
      return child.parentNode.replaceChild(newEl, child);
    }
    case UPDATE: {
      const { children } = patches;
      const childNodes = (child || parent).childNodes;
      console.log(patches, '----patches');
      for(let i = 0; i < children.length; i++) {
        const needUpdateChild = children[i];
        const node = childNodes[i];
        if (needUpdateChild) {
          console.log(node);
          if (needUpdateChild.type === REMOVE) {
            i++;
          }
          updateDOM(parent, needUpdateChild, node);
        }
      }
    }
  }
}

function update(dom, nextVnode, prevVnode) {
  console.log(nextVnode, prevVnode);
  const patchs = diffNode(nextVnode, prevVnode);
  
  updateDOM(dom, patchs);
}

export {
  update,
}
