import { useEffect } from 'react';
import DiaryEditor from '../components/DiaryEditor';

const New = () => {
	useEffect(()=>{
		const title = document.getElementsByTagName('title')[0];
		title.innerHTML=`diary- 새 일기`;
	},[]);

	return (
		<div>
			<DiaryEditor />
		</div>
	)
}

export default New;