import React from "react";

type EmotionItemProps = {
  emotion_id: number;
  emotion_img: string;
  emotion_descript: string;
  onClick: (emotion_id: number) => void;
	isSelected: boolean;
};
const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
	isSelected
}: EmotionItemProps) => {
	// 컴포넌트 재렌더링 원인 체크
	// useEffect(()=>{console.log("EmotionItem")},[onClick]);

  return (
    <div
      className={["EmotionItem", isSelected ? `EmotionItem_on_${emotion_id}` : "EmotionItem_off"].join(" ")}
      onClick={() => {
        onClick(emotion_id);
      }} 
    >
      <img src={emotion_img} alt="" />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
