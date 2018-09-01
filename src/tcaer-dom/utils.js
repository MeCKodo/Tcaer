function isChange(newNode, oldNode) {
  return typeof newNode !== typeof oldNode ||
    typeof newNode === 'string' && newNode !== oldNode ||
    newNode.type !== oldNode.type
}

function setAttributes(node, name, value = '') {
  if (name === 'className') name = 'class';
  
  // event
  if (/on\w+/.test(name)) {
    name = name.toLowerCase();
    node[name] = value;
    return;
  }
  
  // style
  if (name === 'style') {
    Object.keys(value).forEach((item) => {
      const styleValue = value[item];
      node.style[item] = typeof styleValue === 'number' ? `${styleValue}px` : styleValue;
    });
    return;
  }
  
  node.setAttribute(name, value);
  
}

export {
  setAttributes,
  isChange
}