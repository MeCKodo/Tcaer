import Tcaer from './tcaer';

class App extends Tcaer.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 'old',
      className: 'App',
    }
  }
  componentDidMount() {
    console.log('componentDidMount()', document.getElementById('app'));
  }
  
  onClick() {
    this.setState({
      a: 'new',
      dataId: 'dataId',
      className: '',
    });
    console.log(this.state);
  };
  
  render() {
    const { a, dataId, className } = this.state;
    return (
      <div className={className} id={a} data-id={dataId} >
        <span onClick={this.onClick.bind(this)}>我是App组件，data={a}</span>
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
