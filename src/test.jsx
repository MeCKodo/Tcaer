import Tcaer from './tcaer';

const test = () => console.log(1);

const element = (
  <div onClick={test} a="aaa" className={'sdf'} style={{width: 10, color: 'red'}} id='id1'>
    sdf
  </div>
);

export default element;
