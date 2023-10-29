import { StateType } from "../App";
import DiaryItem from "./DiaryItem";

// React 에서 props 는 기본적으로 객체 형태로 전달된다.
// 그래서 타입스크립트에서 컴포넌트의 props 를 타입으로 정의할때 객체의 형태를 반영해야 한다.
// props 객체를 객체 형태로 나타내고 해당 객체의 타입을 명시
const DiaryList = ({diaryList} : {diaryList : StateType[]}) => {
	return (
		<div>
			{
				diaryList.map((item, index) =>(<DiaryItem key={item.id} {...item} />))
			}
		</div>
	)
}

DiaryList.defaultProps = {
	diaryList : [],
}

export default DiaryList;