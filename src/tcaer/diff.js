import { setAttributes } from "../tcaer-dom/utils";
import {genDOM} from "../tcaer-dom";

const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const REPLACE = 'REPLACE';
const REMOVE = 'REMOVE';

function changed(newNode, oldNode) {
  return typeof newNode !== typeof oldNode ||
        typeof newNode === 'string' && newNode !== oldNode ||
    newNode.tag !== oldNode.tag
}

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
  const patches = [];
  const maxLen = Math.max(prevChildren.length, nextChildren.length);
  for(let i = 0;i< maxLen; i++) {
    patches[i] = diff(
      nextChildren[i],
      prevChildren[i],
    )
  }
  return patches;
}

function diff(newNode, oldNode) {
  if (!oldNode) {
    return {
      type: CREATE,
      newNode,
    }
  }
  if (!newNode) {
    return { type: REMOVE }
  }
  if (changed(newNode, oldNode)) {
    return {
      type: REPLACE,
      newNode
    }
  }
  if (newNode.tag) {
   return {
     type: UPDATE,
     children: diffChildren('', newNode, oldNode)
   }
  }
}

function updateChildren(dom, prevVnode, nextVnode) {
  // const newChild = diffChildren(dom, prevVnode, nextVnode);
  const childNodes = dom.childNodes;
  console.log(prevVnode, nextVnode);
  console.log(diffChildren(dom, prevVnode, nextVnode))
  // update dom
  // newChild.forEach((node, index) => {
  //   const targetDom = childNodes[index];
  //   if (!node) return;
  //
  //   if (typeof node === 'string') {
  //     dom.childNodes[index].textContent = node;
  //   } else {
  //     if (typeof node.tag === 'string') {
  //       console.log(targetDom, node, '-------');
  //       const parentNode = targetDom.parentNode;
  //       const dom = genDOM(node, parentNode);
  //       console.log(dom, '----domdomdomdom')
  //       parentNode.replaceChild(dom, targetDom);
  //     } else {
  //
  //     }
  //   }
  // });
}

export {
  updateAttrs,
  updateChildren,
}
