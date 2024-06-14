import React from "react";
import Select, { ActionMeta, MultiValue } from "react-select";

interface Option {
  value: string;
  label: string;
  hex: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  selectedOptions: MultiValue<Option>;
  onChange: (selected: MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, selectedOptions, onChange }) => {
  const formatOptionLabel = ({ label, hex }: Option) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div className="rounded-full" style={{ backgroundColor: hex, width: 20, height: 20, marginRight: 10 }}></div>
      <span>{label}</span>
    </div>
  );

  return (
    <div className="w-full max-w-full">
      <Select
        options={options}
        isMulti
        value={selectedOptions}
        onChange={onChange}
        className="react-select-container"
        classNamePrefix="react-select"
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
};

export default MultiSelectDropdown;
