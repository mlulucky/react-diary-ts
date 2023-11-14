import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext, StateType } from "../App";
import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: "완전좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: "그럭저럭",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: "끔직",
  },
];

const getCurDate = (date: Date) => {
  // date.toISOString() : date 객체를 문자열로 변환을 해준다.  YYYY-MM-DDHH:mm:ss:sss -> 오늘의 날짜를 초기값을 설정할 수 있게됨
  // console.log(date.toISOString()); // 2023-10-31T14:35:53.297Z
  return date.toISOString().slice(0, 10); // 2023-10-31 // input 달력 형식의 자릿수만큼 자르기 //
};

const DiaryEditor = ({isEdit, writeDiary} : {isEdit?: boolean, writeDiary?: StateType}) => {
  const [date, setDate] = useState(getCurDate(new Date())); // 오늘의 날짜를 기본값으로 설정하기 // new Date() : 오늘날짜 생성
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");
  const contentRef = useRef<HTMLTextAreaElement | null>(null); // 타입 + 초기값 null 설정 // 태그 참조용, focus 됬을때 컨트롤하기위해
  const navigate = useNavigate();
  const emotionHandler = (emotion: number) => {
    setEmotion(emotion);
  };

	const {onCreate, onEdit} = useContext(DiaryDispatchContext); // ContextApi 로 상태 직접전달 및 상태 공유. 

	useEffect(()=> {
		if(isEdit && writeDiary) { // 수정 Edit 컴포넌트인 경우에만 실행
			setDate(getCurDate(new Date(writeDiary.date)));
			setEmotion(writeDiary.emotion);
			setContent(writeDiary.content);
		}
	},[isEdit, writeDiary]);

	// 작성완료 버튼에 적용될 함수
	const submitHandler = () => {
		// 작성된 글자의 개수를 체크하여 focus 및 return 완료버튼 함수 종료 시키기
		if(contentRef.current && content.length < 1) { // contentRef.current, 즉 textArea 태그가 null 이 아닌 경우에 포커스 (null 일수있어서)
			contentRef.current.focus(); 
			return;
		}
		// 다이어리 목록에 추가 // 현재 다이어리목록추가 state CRUD 는 최상단 컴포넌트 App.tsx 에 있다 -> ContextApi 로 상태를 가져오기
		// 일기작성시 날짜는 string, 상태관리에서 날짜는 number -> 타입하나로 합치기
		// 문자열 -> 숫자로 바꾸기
		const numDate = new Date(date).getTime();
		
		if(window.confirm(isEdit? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
			if(!isEdit) {
				onCreate({date: numDate, content, emotion}); // date 라는 key 에 numDate 값을 할당 (onCreate 의 인자의 props 이름이 date 이므로. date key를 사용하기 위해서)
			}
			else {
				if(writeDiary) {
					onEdit({id: writeDiary.id, date: numDate, content, emotion}); // date string -> number 로 바꾸기 // id, date, content, emotion
				}
			}
		}
		
		// 메인 페이지 이동 (+ 이전페이지 이동 방지)
		navigate("/", {replace: true}) // replace: true 설정 // 뒤로가기 이전페이지 이동 방지
	}

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
      />
      <section>
        <h4>오늘은 언제인가요?</h4>
        <input
          className="input_date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </section>
      <section>
        <h4>오늘의 감정</h4>
        <div className="input_box emotion_list_wrapper">
          {emotionList.map((item, idx) => (
            <EmotionItem
              key={item.emotion_id}
              {...item}
              onClick={emotionHandler}
              isSelected={item.emotion_id === emotion}
            />
          ))}
        </div>
      </section>
      <section>
        <h4>오늘의 일기</h4>
        <div className="input_box text_wrapper">
          <textarea
					placeholder="오늘은 어땠나요"
            ref={contentRef}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
      </section>
			<section className="control_box">
				<MyButton text={"취소하기"} onClick={()=> {navigate(-1)}}/>
				<MyButton text="작성완료" type="done" onClick={submitHandler}/>
			</section>
    </div>
  );
};

export default DiaryEditor;
