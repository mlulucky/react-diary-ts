import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const id = searchParams.get("id");
	console.log("id: ", id);

	const mode = searchParams.get("mode");
	console.log("mode: ", mode);

	return (
		<div>
			<h1>이곳은 Edit 입니다.</h1>
			<button onClick={()=>{setSearchParams({id: "eddddd"});}}>쿼리스트링바꾸기</button>
			<br/>
			<button onClick={()=>{navigate("/")}}>Home으로 이동</button>
			<br/>
			<button onClick={()=>{navigate(-1)}}>뒤로가기</button>
		</div>
	)
}

export default Edit;