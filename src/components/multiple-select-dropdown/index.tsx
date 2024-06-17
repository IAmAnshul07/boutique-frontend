import React, { ReactNode } from "react";
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
      />
    </div>
  );
};

export default MultiSelectDropdown;
