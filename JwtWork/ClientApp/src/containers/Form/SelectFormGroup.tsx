import Select, { type SingleValue } from "react-select";
import { useCallback, type FunctionComponent } from "react";
import { useAppSelector, useAppDispatch } from "src/store";
import { DROPDOWN_TEST_DATA } from "src/config";
import { selectOption } from "src/store/formSlice";
import {  type SelectOption } from "src/fragments/types";


const SelectFormGroup: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const selectedOption = useAppSelector<SingleValue<SelectOption>>(
    (state) => (state.form && state.form.selectedOption ) ?? DROPDOWN_TEST_DATA[0]
  );

  const onOptionChange = useCallback(
    (option: SingleValue<SelectOption>) => {
      dispatch(selectOption(option));
    },
    [dispatch]
  );

  return (
    <div className="column">
      <h3 className="title is-4">Dropdown</h3>
      <h5 className="subtitle is-5">Select options from the dropdown</h5>
      <div className="field form-control-group">
        <Select
          styles={{
            dropdownIndicator: (base, state) => ({
              ...base,
              transition: "all .2s ease",
              transform: state.selectProps.menuIsOpen ? ["rotate(180deg)"] : [],
            }),
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: state.isFocused
                ? "rgba(9,211,172,0.75)"
                : "rgb(206, 212, 218)",
              boxShadow: state.isFocused
                ? "rgb(9, 211, 172, 0.225) 0px 0px 0px 0.2rem"
                : "inherit",
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              backgroundColor: state.isSelected ? "#09d3ac" : "inherit",

              ":hover": {
                backgroundColor: state.isSelected
                  ? "#09d3ac"
                  : "rgba(9,211,172,0.224)",
              },
            }),
          }}
          options={DROPDOWN_TEST_DATA}
          defaultValue={selectedOption}
          onChange={onOptionChange}
        />
      </div>
      <p className="subtitle is-5">
        Value: <code className="form-value">{selectedOption?.label}</code>
      </p>
    </div>
  );
};

export default SelectFormGroup;
