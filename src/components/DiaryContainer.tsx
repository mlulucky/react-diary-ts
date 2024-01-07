import React from "react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext, StateType } from "../App";
import ControlMenu from "./ControlMenu";
import DiaryList from "./DiaryList";
import MyButton from "./MyButton";

// 필터 옵션리스트 (날짜순 / 감정순)
const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된순" },
];

const sortEmotionOtionList = [
  { value: "all", name: "전체" },
  { value: "good", name: "좋은 감정" },
  { value: "bad", name: "안좋은 감정" },
];

// Home 컴포넌트에서 날짜 curDate 에 따라 diaryList 를 새로 변경을 하는데 그 변경된 diaryList 를 DiaryContainer 컴포넌트에 props 로 전달
// 이유) DiaryContainer 에 context 로 데이터를 바로 불러오게 되는경우. Home 컴포넌트에서 변경했던 diaryList 가 반영이 안된다.
const DiaryContainer = ({ diaryList }: { diaryList: StateType[] }) => {
  // 🍒 일기목록 정렬 _ 날짜순
  const [sortType, setSortType] = useState("latest");
  // 🍒 일기목록 정렬 _ 감정순
  const [emotionType, setEmotionType] = useState("all");
  // onClick 시, 페이지 이동 -> useNavigate()
  const navigate = useNavigate();

  // 🍒 필터링된 데이터목록 (날짜순 / 감정순)
  const filteredList = () => {
    // 날짜순 정렬(최신순 / 오래된순)
    const compareList = (a: StateType, b: StateType) => {
      // 독립된 객체인 경우에는 {} 감싸는 구조분해 할당을 하지 않고, 각각의 독립된 변수를 받는다.
      if (sortType === "latest") {
        // 최신순
        return b.date - a.date; // 내림차순
      } else {
        return a.date - b.date; // 오름차순
      }
    };

    // 감정순 정렬
    const emotionFilter = (item: StateType) => {
      if (emotionType === "good") {
        return item.emotion <= 3;
      } else {
        return item.emotion > 3;
      }
    };

    const newList = [...diaryList]; // 깊은복사 - JSON.parse(JSON.stringify(diaryList))
    // 감정순 정렬
    const sortedEmtionList =
      emotionType === "all"
        ? newList
        : newList.filter((item) => emotionFilter(item)); // return true 인 값을 반환
    const sortedList = sortedEmtionList.sort(compareList); // 감정순 정렬 + 내림차순, 오름차순 정렬 적용
    return sortedList;
  };

  return (
    <div className="DiaryContainer">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={emotionType}
            onChange={setEmotionType}
            optionList={sortEmotionOtionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"done"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>
      <DiaryList diaryList={filteredList()} />
    </div>
  );
};

export default DiaryContainer;
