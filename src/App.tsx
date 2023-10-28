import "./App.css";
import { useReducer, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Diary from "./pages/Diary";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import New from "./pages/New";
import React from "react";

// state: 상태 action: 상태변화 객체(dispatch 가 인자로 전달한 객체) 
// dispatch 는 상태변화에 필요한 액션 타입과, 액션에 필요한 데이터를 전달한다. (action 객체(상태변화))

type StateType = { // 일기데이터 배열의 요소 타입
	id: number;
	date: number;
	content: string;
	emotion: number;
}
// state 는 일기 데이터, 즉 배열이다. => StateType[]

type ActionType =  // action 객체는 타입과, 상태변화에 필요한 데이터를 갖는다.
	| {type: "INIT", data: StateType[]}
	| {type: "CREATE", data: StateType}
	| {type: "REMOVE", targetId: number}
	| {type: "EDIT", data: StateType}

const reducer = (state : StateType[], action: ActionType): StateType[] => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((item) =>
        item.id === action.data.id ? { ...action.data } : item
      ); // {...action.data} : 입력한 데이터로 전체 변경
      break;
    }
    default:
      return state;
  }
  return newState;
};

// Context 객체 생성
// 다른 컴포넌트에서 Context 로 전달받은 데이터를 사용하려면 해당 컴포넌트에서 컨텍스트 객체를 import 해야하므로, export 를 해준다!  
export const DiaryStateContext = React.createContext<StateType[]>([]);
export const DiaryDispatchContext = React.createContext({  // dispatch 를 실행하는 함수 객체들을 인자로 받아서, Context.Provider 의 props 로 전달
	onCreate: (data: Omit<StateType, 'id'>) => {}, // Omit<타입, 제외할필드> : 타입에서 일부 필드를 제외한 새로운 타입 // 빈 중괄호. 반환타입X 의미 JS 문법 // () => void 는 타입스크립트 문법
	onRemove: (targetId: number) => {},
	onEdit: (data: StateType) => {}
});

function App() {
	const initialData: StateType[] = []
  const [data, dispatch] = useReducer(reducer, initialData);

  // dispatch 함수
  const dataId = useRef(0);
  const onCreate = ({date, content, emotion} : Omit<StateType, 'id'>) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    }); // content: content , emotion: emotion
    dataId.current += 1;
  };

  const onRemove = (targetId: number) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = ({ id, date, content, emotion } : StateType) => { // 잘못된 예) 변수명과 타입을 혼동한다. targetId: number, date: number, content: string, emotion:numer
    dispatch({
      type: "EDIT",
      data: { id, date: new Date(date).getTime(), content, emotion },
    });
  };
  // process.env 는 Node.js 에서 환경 변수에 접근하는데 사용되는 객체
  // 이 객체의 속성은 read-only 이므로 직접 수정하거나 새로운 속성을 할당할 수 없음.
  // 환경변수를 설정하려면 애플리케이션 시작하기전에 외부에서 설정. .env 파일을 프로젝트의 루트 디렉토리에 생성하여 환경변수 설정
  const env = process.env.PUBLIC_URL || ""; // 환경변수 없이 기본값 사용
  // process.env.PUBLIC_UR 환경변수가 있으면 그 값을 사용. 없으면 "" 을 할당

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{onCreate, onRemove, onEdit}}>
        <BrowserRouter>
          <div className="App">
            App.js
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/new" element={<New />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
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
