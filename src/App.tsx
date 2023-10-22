import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Diary from './pages/Diary';
import Home from './pages/Home';
import Edit from './pages/Edit';
import New from './pages/New';
import ReactRouteTest from './components/ReactRouteTest';


function App() {

  return (
		<BrowserRouter>
			<div className="App">
				App.js
			</div>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/diary/:id" element={<Diary/>}/>
				<Route path="/edit" element={<Edit/>}/>
				<Route path="/new" element={<New/>}/>
			</Routes>
			<a href={'/diary'}>diary 로 이동</a>
			<ReactRouteTest/>
		</BrowserRouter>
  );
}

// <Route /> : url 경로와 컴포넌트 페이지를 맵핑
// url 경로가 일치하는 컴포넌트가 없는 경우 라우트는 안보인다. => ex) /dflkja;sdlfj;a 경로입력시 
// 페이지가 바뀔때 변화하는 부분은 Route 안의 부분만

// a 태그 이동은 MPA 이동, 즉 페이지가 새로고침되는 이동 (리액트의 SPA 특징 - (빠른 페이지 이동, 페이지 변환시 깜빡임x) x)
// => a 태그는 SPA 페이지 외부로 이동할때 사용
// <a href={'/diary'}>diary 로 이동</a>

// 리액트 경로이동
// <Link to={'/diary'}></Link>


export default App;
