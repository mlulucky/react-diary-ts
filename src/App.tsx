import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Diary from "./pages/Diary";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import ReactRouteTest from "./components/ReactRouteTest";
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

function App() {
  // process.env 는 Node.js 에서 환경 변수에 접근하는데 사용되는 객체
  // 이 객체의 속성은 read-only 이므로 직접 수정하거나 새로운 속성을 할당할 수 없음.
  // 환경변수를 설정하려면 애플리케이션 시작하기전에 외부에서 설정. .env 파일을 프로젝트의 루트 디렉토리에 생성하여 환경변수 설정

  const env = process.env.PUBLIC_URL || ""; // 환경변수 없이 기본값 사용
  // process.env.PUBLIC_UR 환경변수가 있으면 그 값을 사용. 없으면 "" 을 할당

  return (
    <BrowserRouter>
      <div className="App">
        App.js
        {/* 🍒 process.env.PUBLIC_URL : public 폴더경로. 어떤 위치에 있던 /public 을 가리킴 */}
        <img src={process.env.PUBLIC_URL + `/assets/emotion1.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion2.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion3.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion4.png`} />
        <img src={process.env.PUBLIC_URL + `/assets/emotion5.png`} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diary/:id" element={<Diary />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/new" element={<New />} />
        </Routes>
        <a href={"/diary"}>diary 로 이동</a>
        <MyButton
          type="done"
          text="작성완료"
          onClick={() => {
            alert("작성완료");
          }}
        />
        <MyButton
          type="default"
          text="수정하기"
          onClick={() => {
            alert("수정하기");
          }}
        />
        <MyButton
          type="remove"
          text="삭제하기"
          onClick={() => {
            alert("삭제하기");
          }}
        />
        <MyHeader
          leftChild={
            <MyButton
              text="뒤로가기"
              onClick={() => {
                alert("뒤로가기");
              }}
            />
          }
          headText={"일기 수정하기"}
          rightChild={
            <MyButton
              type="remove"
              text="삭제하기"
              onClick={() => {
                alert("삭제하기");
              }}
            />
          }
        />
      </div>
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
