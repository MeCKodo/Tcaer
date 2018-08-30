import { isChange } from "../tcaer-dom/utils";

const Type = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  REPLACE: 'REPLACE',
  REMOVE: 'REMOVE',
};

function diffChildren(parent, nextVnode, prevVnode) {
  const prevChildren = prevVnode.children || prevVnode;
  const nextChildren = nextVnode.children || nextVnode;
  const patches = [];
  const maxLen = Math.max(prevChildren.length, nextChildren.length);
  for(let i = 0; i < maxLen; i++) {
    patches.push(diffNode(
      parent,
      nextChildren[i],
      prevChildren[i],
    ))
  }
  return patches;
}

function diffNode(parent, newNode, oldNode) {
  if (typeof newNode === 'number') newNode = String(newNode);
  if (typeof oldNode === 'number') oldNode = String(oldNode);
  
  if (!newNode && !oldNode) return;
  
  if (!oldNode) {
    return {
      type: Type.CREATE,
      newNode,
    }
  }
  
  if (!newNode) {
    return { type: Type.REMOVE }
  }
  
  if (isChange(newNode, oldNode)) {
    return {
      type: Type.REPLACE,
      newNode
    }
  }
  
  if (newNode.type) {
    if (typeof newNode.type === 'function') {
      return diffComponent(parent, newNode, oldNode);
    }
    
    return {
      type: Type.UPDATE,
      tag: newNode.type,
      children: diffChildren(parent, newNode, oldNode)
    }
  } else if (Array.isArray(newNode)) {
    return deepDiff(parent, newNode, oldNode);
  }
}

function deepDiff(parent, newNode, oldNode) {
  const maxLen = Math.max(newNode.length, oldNode.length);
  const patches = [];
  for (let i = 0; i < maxLen; i++) {
    patches.push(diffNode(parent, newNode[i], oldNode[i]))
  }
  return patches;
}

function diffComponent(parent, newNode, oldNode) {
  const prevComponent = oldNode.type(oldNode.attrs || {});
  const nextComponent = newNode.type(newNode.attrs || {});
  const prevVnode = prevComponent.render ? prevComponent.render() : prevComponent;
  const nextVnode = nextComponent.render ? nextComponent.render() : nextComponent;
  return diffNode(parent, nextVnode, prevVnode);
}

export {
  Type,
  diffNode,
}
