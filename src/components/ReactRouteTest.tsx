import { Link } from "react-router-dom"

const ReactRouteTest = () => {
	return (
		<div>
			<h3>Link 이동 _ SPA 페이지 라우팅</h3>
			<Link to={'/'}>HOME</Link>
			<br/>
			<Link to={'/diary'}>DIARY</Link>
			<br/>
			<Link to={'/new'}>NEW</Link>
			<br/>
			<Link to={'/edit'}>EDIT</Link>
		</div>
	)
}

export default ReactRouteTest;