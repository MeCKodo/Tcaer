import Tcaer from './tcaer';

class App extends Tcaer.Component {
  componentDidMount() {
    console.log('componentDidMount()', document.getElementById('app'));
  }
  
  render() {
    return (
      <div className="App" id='app'>
        <span>我是App组件，data=</span>
      </div>
    );
  }
}

function Hello1(props) {
  const { item, b } = props;
  // console.log(b, '----bbb');
  return <div id={`hello${item}`} className='hello1'><b>hello{item}, {b}</b></div>
}

function Hello() {
  const arr = [1, 2, 3];
  
  return (
    <div  a="aaa"
          className={'sdf'}
          style={{width: 220, color: 'red'}}
          id='id1'
    >
      <ul>
        { arr.map((item) => <li>{item}</li>) }
      </ul>
      { arr.map((item) => <Hello1 item={item} />) }
      <App data={'data1'} />
      <i id='sdf'>other child node</i>
    </div>
  )
}

// console.log(<Hello />); // 函数
// console.log(new Hello()); // vnode
// console.log(<Hello1 />); // 函数
// console.log(new Hello1({x:1})); // vnode
// console.log(<App />); // 函数
// console.log(new App()); // component对象

export default Hello;
