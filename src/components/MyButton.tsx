export type ButtonProps = {
  type: string;
  text: string;
  onClick: () => void;
};

const MyButton = ({ type, text, onClick }: ButtonProps) => {
	// 타입은 3가지로 고정하기 (이상한 타입이 오면 default 타입으로 바꾸기)
	// done, remove 타입에 포함되면 그 타입을 반환. 아니면 default 타입을 반환
	const defaultType = ["done", "remove"].includes(type) ? type : "default";

  return (
    <button
      className={["MyButton", `MyButton_${defaultType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
  // 배열.join(" ") => " " 문자열로 반환
};

// 컴포넌트.defaultProps = {} 
MyButton.defaultProps = {
	type: "default" // type props 를 전달하지 않은경우, 기본값으로 default 적용
}

export default MyButton;
