type OptionListType = {
  value: string;
  name: string;
};

type ControlMenuType = {
  value: string;
  onChange: (value: string) => void;
  optionList: OptionListType[];
};
const ControlMenu = ({ value, onChange, optionList }: ControlMenuType) => {
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
};

export default ControlMenu;
