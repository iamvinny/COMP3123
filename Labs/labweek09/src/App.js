import logo from './logo.svg';
import './App.css';

// define props
App.defaultProps = {
  name: 'Vinicius Amparo',
  student_id: '101314822'
}

function App(props) {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Welcome to Fullstack Development - I<br></br>
        <p>React Js Programming Week09 Lab Exercise</p>
        Student ID: {props.student_id} <br></br>
        Student Name: {props.name} <br></br>
        <p>George Brown College, Toronto - Canada</p>
      </header>
    </div>
  );

}

export default App;
