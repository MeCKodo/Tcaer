import Tcaer from './tcaer';

function Hello() {
  const arr = [1, 2, 3];
  
  return (
    <div  a="aaa"
          className={'sdf'}
          style={{width: 220, color: 'red'}}
          id='id1'
    >
      text node
      <ul>
        { arr.map((item) => <li>{item}</li>) }
      </ul>
      { arr.map((item) => <Hello1 item={item}/>) }
      <i id='sdf'>other child node</i>
    </div>
  )
}

function Hello1(props) {
  console.log(props, '----props');
  return <div id='hello1' className='hello1'><b>hello1</b></div>
}

class App extends Tcaer.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

// console.log(<Hello />); // 函数
console.log(new Hello()); // vnode
// console.log(<Hello1 />); // 函数
// console.log(new Hello1()); // vnode
// console.log(<App />); // 函数
// console.log(new App()); // component对象

export default Hello();
