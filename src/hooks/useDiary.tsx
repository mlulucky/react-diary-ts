import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext, StateType } from "../App";

const useDiary = () => {
	const {id} = useParams();
	const navigate = useNavigate();
	const diaryList = useContext(DiaryStateContext);
	const [diary, setDiary] = useState<StateType>();

	useEffect(()=>{
		if(diaryList.length > 1) {
			const diary = diaryList.find((item)=> item.id === parseInt(id!));
			// console.log(diary);
			if(diary) { // 일기가 존재할때
				setDiary(diary);
			} else { // 일기가 존재하지 않는 id 경우
				alert("없는 일기입니다.");
				navigate("/", {replace: true}); // 뒤로가기 불가 // diaryList || id 가 변경되는 경우에 재실행 // 일기 데이터가 변경되는 경우에 재실행
			}	
		}
	}, [id, diaryList]);
	
	return diary;
}

export default useDiary;