import { useParams } from "react-router-dom";

const Diary = () => {
	const {id} = useParams();
	console.log("id: ", id);

	return (
		<div>
			<h1>이곳은 Diary 입니다.</h1>
		</div>
	)
}

export default Diary;