import { genDOM } from "../tcaer-dom";
import { setAttributes } from "../tcaer-dom/utils";

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

function updateComponent(instance) {
  const nextVnode = instance.render();
  const prevVnode = instance.__prevVnode;
  const dom = instance.dom;
  updateAttrs(dom, prevVnode, nextVnode);
  
}

export default class Component {
  constructor(props = {}) {
    this.state = this.state || {};
    this.props = props;
  }
  
  setState(partialState) {
    this.state = Object.assign({}, this.state, partialState);
    updateComponent(this);
  }
  
}
