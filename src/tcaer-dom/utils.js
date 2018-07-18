function setAttributes(dom, name, value) {
  if ( name === 'className' ) name = 'class';
  
  // event
  if (/on\w+/.test(name)) {
    name = name.toLowerCase();
    dom[name] = value;
    return;
  }
  
  // style
  if (name === 'style') {
    Object.keys(value).forEach((item) => {
      const styleValue = value[item];
      dom.style[item] = typeof styleValue === 'number' ? `${styleValue}px` : styleValue;
    });
    return;
  }
  
  dom.setAttribute(name, value);
  
}

export {
  setAttributes
}