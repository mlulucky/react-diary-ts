import { useState, useContext, useEffect } from "react";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { DiaryStateContext, StateType } from "../App";
import DiaryContainer from "../components/DiaryContainer";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  // 일기목록 데이터 받아쓰기
  const initialData: StateType[] = [];
  const [data, setData] = useState(initialData);
  // 🍒 날짜 이동시 해당되는 월에 해당하는 일기목록 리스트만 보여주기! // -> 일기목록 리스트를 저장할 상태 state 만들기
  const [curDate, setCurDate] = useState(new Date());
  // 🍒 버튼 클릭으로 날짜 이동하기위해 날짜 데이터를 저장할 상태 state 만들기
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;
  // 자바스크립트의 날짜 월은 +1 을 해줘야 현재 월이 된다. (1월이 0 부터 시작됨)

  // 날짜 증가, 감소 함수
  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  // 🍒 useEffect() 사용
	useEffect(()=>{
		const title = document.getElementsByTagName('title')[0];
		title.innerHTML=`diary 홈`;
	},[]);

  // curDate 날짜가 변경되는 경우에, 일기목록 diaryList 불러오기
  useEffect(() => {
    if (diaryList.length >= 1) {
      // 다이어리 목록이 있을때만 실행하기
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1 // 월의 첫번째 날
      ).getTime(); // 해당월의 첫쨋날
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1, // 다음달
        0, // 이전 월의 마지막날
        23, // 시간 23시
        59, // 분
        59 // 초
      ).getTime(); // 해당월의 마지막날
      // 해당월의 첫째날, 마지막째날을 이용해 filter 로 해당 월에 해당되는 일기목록 데이터 반환하기

      setData(
        diaryList.filter(
          (item) => item.date >= firstDay && item.date <= lastDay
        )
      );
      // diaryList 를 data 로 저장
    }
  }, [diaryList, curDate]); // 🍒 diaryList 일기목록에 일기가 추가, 삭제 되었을때도 리스트를 새로 업데이트 setData 해야하므로, 의존배열에 diaryList 도 추가한다.

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text="<" onClick={decreaseMonth} />}
        rightChild={<MyButton text=">" onClick={increaseMonth} />}
      />
      <DiaryContainer diaryList={data} />
    </div>
  );
};

export default Home;
