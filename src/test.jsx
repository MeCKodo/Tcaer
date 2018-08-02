import Tcaer from './tcaer';

// class App extends Tcaer.Component {
//   render() {
//     const { data } = this.props;
//     return (
//       <div className="App">
//         <span>我是App组件，data={data}</span>
//       </div>
//     );
//   }
// }
//
// function Hello1(props) {
//   const { item, b } = props;
//   console.log(b, '----bbb');
//   return <div id='hello1' className='hello1'><b>hello{item}, {b}</b></div>
// }
//
// function Hello() {
//   const arr = [1, 2, 3];
//
//   return (
//     <div  a="aaa"
//           className={'sdf'}
//           style={{width: 220, color: 'red'}}
//           id='id1'
//     >
//       text node
//       <ul>
//         { arr.map((item) => <li>{item}</li>) }
//       </ul>
//       { arr.map((item) => <Hello1 item={item} />) }
//       <App data={'data1'} />
//       <i id='sdf'>other child node</i>
//     </div>
//   )
// }

// console.log(<Hello />); // 函数
// console.log(new Hello()); // vnode
// console.log(<Hello1 />); // 函数
// console.log(new Hello1({x:1})); // vnode
// console.log(<App />); // 函数
// console.log(new App()); // component对象

const Hello = () => {
  const arr = [1, 2, 3];
  
  return (
    <div>
      那个人好像一条<b style={{color:'red'}}>狗</b>啊
      <ul>
        { arr.map((num) => <li>狗{num}</li>) }
      </ul>
    </div>
  );
};
console.log(Hello());
export default Hello;
