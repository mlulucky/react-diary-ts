import DiaryEditor from "../components/DiaryEditor";
import useDiary from "../hooks/useDiary";

const Edit = () => {
	const diary = useDiary();

  if(!diary) {
		return <div>로딩중입니다...</div>
	}
	// 수정할 다이어리가 있으면, 수정컴포넌트를 보여주겠다.
	return <div>{diary && <DiaryEditor isEdit={true} writeDiary={diary} />}</div>;
};

export default Edit;
