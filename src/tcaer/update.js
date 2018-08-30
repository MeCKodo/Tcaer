import { genDOM } from "../tcaer-dom";
import { Type, diffNode } from "./diff";

function updateDOM(parent, patches, isParent) {
  if (!patches) return;
  
  switch (patches.type) {
    case Type.CREATE: {
      const { newNode } = patches;
      const newEl = genDOM(newNode, parent);
      if (isParent) {
        return parent.appendChild(newEl);
      }
      return parent.parentNode.appendChild(newEl);
    }
    case Type.REMOVE: {
      return parent.parentNode.removeChild(parent);
    }
    case Type.REPLACE: {
      const { newNode } = patches;
      const newEl = genDOM(newNode, parent);
      return parent.parentNode.replaceChild(newEl, parent);
    }
    case Type.UPDATE: {
      const { children } = patches;
      const childrenLen = children.length;
      for(let i = 0; i < childrenLen; i++) {
        const childNodes = parent.childNodes;
        const needUpdateChild = children[i];
        if (Array.isArray(needUpdateChild)) {
          deepUpdateDOM(parent, needUpdateChild, childNodes);
        } else {
          let node = childNodes[i];
          if (needUpdateChild) {
            updateDOM(node, needUpdateChild);
          }
        }
      }
    }
  }
}

function deepUpdateDOM(parent, needUpdateChild, childNodes) {
  for (let i = 0; i < needUpdateChild.length; i++) {
    const patches = needUpdateChild[i];
    let node = childNodes[i];
    if (node) {
      updateDOM(node, patches);
    } else {
      updateDOM(parent, patches, true);
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
