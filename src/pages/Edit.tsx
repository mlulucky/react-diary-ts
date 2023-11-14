import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DiaryStateContext, StateType } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // string 또는 파라미터없는경우 undefined 반환 // useParams 는 파라미터 /user/:id // useSearchParams 는 ? 쿼리파라미터 값 가져옴
  // const [searchParams, setSearchParams] = useSearchParams(); // 쿼리스트링 바꾸기 setSearchParams({id: "eddddd"})

  const diaryList = useContext(DiaryStateContext);
  const [diary, setDiary] = useState<StateType>();

  useEffect(() => {
    // 화면렌더시 자동실행
    if (diaryList.length > 1) {
      // 일기가 1개 이상일때 실행
      const data = diaryList.find((item) => item.id === parseInt(id!)); // id! == id 파라미터가 무조건 있음을 의미
			console.log(data);
			if (data) {
        setDiary(data);
      } else {
        // url 의 id 가 없는 데이터의 경우 undefined(==false) 반환
        navigate("/", { replace: true });
      }
    }
  }, [diaryList, id]); // diaryList || id 가 변경되는 경우에 재실행 // 일기 데이터가 변경되는 경우에 재실행

	// 수정할 다이어리가 있으면, 수정컴포넌트를 보여주겠다.
  return <div>{diary && <DiaryEditor isEdit={true} writeDiary={diary} />}</div>;
};

export default Edit;
