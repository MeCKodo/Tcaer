import Tcaer from './tcaer';

class App extends Tcaer.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 'old',
      className: 'App',
      text: '修改前的文本节点',
      isSpan: true,
      num: 0,
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
      text: '修改后的文本节点',
      isSpan: false,
    });
    console.log('span');
  };
  toggleSpan() {
    const { isSpan, num } = this.state;
    this.setState({
      isSpan: !isSpan,
      num: num + 1
    });
  }
  plus() {
    const { num } = this.state;
    this.setState({
      num: num + 1
    })
  }
  render() {
    const { text, isSpan, num } = this.state;
    return (
      <div id={'test1'} >
        {text}
        { isSpan && <span>我是span，data=</span> }
  
        <button onClick={this.toggleSpan.bind(this)}>ssss{num}</button>
        
        
        {/*{isSpan ?*/}
          {/*<span onClick={this.onClick.bind(this)}>我是span，data=</span> :*/}
          {/*<div onClick={this.plus.bind(this)}>我切换<b>{num}</b>标签</div>*/}
        {/*}*/}
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
