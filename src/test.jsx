import Tcaer from './tcaer';

const test = () => console.log(1);

const element = () => {
  const arr = [1, 2, 3];
  
  return (
    <div onClick={test} a="aaa" className={'sdf'} style={{width: 220, color: 'red'}} id='id1'>
      text node
      <ul>
        { arr.map((item) => <li>{item}</li>) }
      </ul>
      <i id='sdf'>other child node</i>
    </div>
  )
};

export default element();
