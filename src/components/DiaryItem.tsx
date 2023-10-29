import { useNavigate } from "react-router-dom";
import { StateType } from "../App";
import MyButton from "./MyButton";

const DiaryItem = ({ id, date, content, emotion }: StateType) => {
  const env = process.env.PUBLIC_URL || "";
  const diaryDate = new Date(date).toLocaleDateString();
  // new Date(date) : 밀리세컨즈 데이트를 기준으로 시간객체 생성
  const navigate = useNavigate();

	// 상세페이지 이동
	const goDetail = () => {
		navigate(`/diary/${id}`);
	}
	// 수정페이지 이동
	const goEdit = () => {
		navigate(`/edit/${id}`);
	}

  return (
    <div className="DiaryItem">
      <div className="img_info_wrapper" onClick={goDetail}>
        <div
          className={[
            "emotion_img_wrapper",
            `emotion_img_wrapper_${emotion}`,
          ].join(" ")}
        >
          <img
            src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
            alt=""
          />
        </div>
        <div className="info_wrapper">
          <div className="diary_date">{diaryDate}</div>
          <div className="diary_content_preview">{content.slice(0, 20)}</div>
          {/* content.slice() : 내용이 너무 길어지는경우 미리보기처럼 앞에서부터 몇글자까지 잘라서 보여주기 */}
        </div>
      </div>
      <div className="btn_wrapper">
        <MyButton
          text={"수정하기"}
          onClick={goEdit}
        />
      </div>
    </div>
  );
};

export default DiaryItem;
