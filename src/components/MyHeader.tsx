import MyButton, {ButtonProps} from './MyButton'

type MyHeaderProps = {
	leftChild : React.ReactNode; // React 컴포넌트, 문자열, 숫자, 배열 등 거의 모든 것을 포함하는 넓은 타입
	headText : string;
	rightChild : React.ReactElement<typeof MyButton>; //MyButton 컴포넌트만 허용하기
}

const MyHeader = ({leftChild, headText, rightChild} : MyHeaderProps) => {
	return (
		<header>
			<div className="head_btn_left">{leftChild}</div>
			<div className="head_text">{headText}</div>
			<div className="head_btn_right">{rightChild}</div>
		</header>
	)
}

export default MyHeader;