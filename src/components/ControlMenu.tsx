import React from "react";

type OptionListType = {
  value: string;
  name: string;
};

type ControlMenuType = {
  value: string;
  onChange: (value: string) => void;
  optionList: OptionListType[];
};
const ControlMenu = React.memo(({ value, onChange, optionList }: ControlMenuType) => {
  // 컴포넌트 재렌더링 원인 체크
	// useEffect(()=>{
	// 	console.log("ControlMenu");
	// },[optionList]);

	return (
    <select 
			className="ControlMenu"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {optionList.map((item, index) => (
        <option key={index} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
});

export default ControlMenu;
