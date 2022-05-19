import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Student from './components/Student'
import Teacher from './components/Teacher'
import About from './components/About'
import Sregister from './components/Sregister'
import Tregister from './components/Tregister'
import StudentHome from './components/student/StudentHome'
import Dashboard from './components/student/Dashboard'
import Instructions from './components/exam/Instructions'
import TeacherHome from './components/teacher/TeacherHome'
import StartExam from './components/exam/StartExam'
import Question from './components/teacher/Question'
import Treport from './components/teacher/Treport'
import Report from './components/teacher/Report'

 
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/student" element={<Student/>}></Route>
          <Route exact path="/teacher" element={<Teacher/>}></Route>
          <Route exact path="/student/register" element={<Sregister/>}></Route>
          <Route exact path="/teacher/register" element={<Tregister/>}></Route>
          <Route exact path="/student/home" element={<StudentHome/>}></Route>
          <Route exact path="/student/dashboard" element={<Dashboard/>}></Route>
          <Route exact path="/teacher/home" element={<TeacherHome/>}></Route>
          <Route exact path="/teacher/reports" element={<Treport/>}></Route>
          <Route exact path="/:examName" element={<Question/>}></Route>
          <Route exact path="/student/:examName" element={<Instructions/>}></Route>
          <Route exact path="/student/:examName/startExam" element={<StartExam/>}></Route>
          <Route exact path="/report/:examName" element={<Report/>}></Route>
          <Route exact path="/about" element={<About/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
