import Tcaer from './tcaer';

class Bbb extends Tcaer.Component {
  componentDidMount() {
    console.log('componentDidMount() BBBBBBB');
  }
  render() {
    return <div> bbbbbb </div>
  }
}

class App extends Tcaer.Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 'old',
      className: 'App',
      text: '修改前的文本节点',
      isSpan: true,
      num: 0,
      list: [1,2,3],
    }
  }
  
  componentDidMount() {
    console.log('componentDidMount()', document.getElementById('app'));
  }
  
  onClick() {
    // this.setState({
    //   a: 'new',
    //   dataId: 'dataId',
    //   className: '',
    //   text: '修改后的文本节点',
    //   isSpan: false,
    // });
    console.log('span');
  };
  toggleSpan() {
    const { isSpan, num } = this.state;
    this.setState({
      text: '修改后的文本节点',
      isSpan: !isSpan,
      num: num + 1
    });
  }
  plus() {
    const { num } = this.state;
    this.setState({
      num: num + 1
    });
    console.log('plus func');
  }
  appendList(type) {
    const { list } = this.state;
    const a = [...list];
    if (type === 'add') {
      a.push(a.length + 1);
    } else {
      a.shift();
    }
    this.setState({
      list: a,
    })
  }
  render() {
    const { text, isSpan, num, list } = this.state;
    console.log(list);
    return (
      <div >
        <button onClick={this.appendList.bind(this, 'add')}>list加数据</button>
        <br />
        <button onClick={this.appendList.bind(this, 'remove')}>list减数据</button>
          <br/>
        <button onClick={this.toggleSpan.bind(this)}>组件切换{num}</button>
          <br/>
        {/*{ isSpan && <span>我是span，data=</span> }*/}
        {/*{text}*/}
        { isSpan ? <DiffTest num={num} /> : <Bbb /> }
        {isSpan ?
          <b onClick={this.onClick.bind(this)}>b，bbbbbbbbb=</b> :
          <div onClick={this.plus.bind(this)}>我切换<b>{num}</b>标签</div>
        }
        <ul>
        { list.map((item) => <li>{item}</li>) }
        </ul>
      </div>
    );
  }
}

function DiffTest({ num }) {
  return <div>Diff test component{num}</div>
}
function DiffTest1({num}) {
  return <div>co1m23123123123ponent{num}</div>
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
          style={{width: 620, color: 'red'}}
          id='id1'
    >
      {/*<ul>*/}
        {/*{ arr.map((item) => <li>{item}</li>) }*/}
      {/*</ul>*/}
      {/*{ arr.map((item) => <Hello1 item={item} />) }*/}
      <App data={'data1'} />
      {/*<i id='sdf'>other child node</i>*/}
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
