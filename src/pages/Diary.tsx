import { useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import useDiary from "../hooks/useDiary";
import { getCurDate } from "../util/getDate";
import { emotionList } from "../util/emotionList";

const Diary = () => {
  const diary = useDiary();
  const navigate = useNavigate();

  if (!diary) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const emotionData = emotionList.find(
      (item) => item.emotion_id === diary.id
    );
    console.log("emotionData", emotionData);
    return (
      <div className="DiaryPage">
        <MyHeader
          leftChild={
            <MyButton text={"<뒤로가기"} onClick={() => navigate(-1)} />
          }
          headText={`${getCurDate(new Date(diary.date))} 기록`}
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${diary.id}`)}
            />
          }
        />
        <article>
          <section>
            <h3>오늘의 감정</h3>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${emotionData?.emotion_id}`,
              ].join(" ")}
            >
              <img src={emotionData?.emotion_img} alt="" />
              <div className="emotion_descript">
                {emotionData?.emotion_descript}
              </div>
            </div>
          </section>
					<section>
						<h3>오늘의 일기</h3>
						<div className="diary_content_wrapper">
							<p>{diary.content}</p>
						</div>
					</section>
				</article>
				
      </div>
    );
  }
};

export default Diary;
