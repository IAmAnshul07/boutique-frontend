import React, { ReactNode } from "react";
// eslint-disable-next-line import/named
import Select, { ActionMeta, FormatOptionLabelMeta, GroupBase, MultiValue, OptionsOrGroups } from "react-select";

export interface Option {
  value: string;
  label: string;
  hex?: string;
}

interface MultiSelectDropdownProps {
  options?: OptionsOrGroups<Option, GroupBase<Option>>;
  selectedOptions: MultiValue<Option>;
  onChange: (selected: MultiValue<Option>, actionMeta: ActionMeta<Option>) => void;
  formatOptionLabel: null | undefined | (((data: Option, formatOptionLabelMeta: FormatOptionLabelMeta<Option>) => ReactNode) | undefined);
}

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    borderRadius: "0.5rem",
    border: "1px solid #D1D5DB",
    padding: "0.1rem 0.1rem",
    fontSize: "1rem",
    minHeight: "1rem",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#D1D5DB",
    },
  }),
  indicatorSeparator: () => ({
    display: "none", // Remove the indicator separator line
  }),
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, selectedOptions, onChange, formatOptionLabel }) => {
  return (
    <div className="w-full max-w-full">
      <Select
        options={options}
        isMulti
        value={selectedOptions}
        onChange={onChange}
        className="react-select-container"
        classNamePrefix="react-select"
        formatOptionLabel={formatOptionLabel || undefined}
        styles={customStyles}
        placeholder="Select..."
      />
    </div>
  );
};

export default MultiSelectDropdown;
