import Tcaer from './tcaer';
import TcaerDOM from './tcaer-dom';
import Demo from './test';
// console.log(t);
TcaerDOM.render(<Demo />, document.getElementById('container'));
//
// function tick() {
//   const element = (
//       <div>
//         <h1>Hello, world!</h1>
//         <h2>It is {new Date().toLocaleTimeString()}.</h2>
//       </div>
//   );
//   TcaerDOM.render(element, document.getElementById('container'));
// }
//
// setInterval(tick, 1000);
