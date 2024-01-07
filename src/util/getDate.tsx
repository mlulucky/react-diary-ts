export const getCurDate = (date: Date) => {
  // date.toISOString() : date 객체를 문자열로 변환을 해준다.  YYYY-MM-DDHH:mm:ss:sss -> 오늘의 날짜를 초기값을 설정할 수 있게됨
  // console.log(date.toISOString()); // 2023-10-31T14:35:53.297Z
  return date.toISOString().slice(0, 10); // 2023-10-31 // input 달력 형식의 자릿수만큼 자르기 //
};