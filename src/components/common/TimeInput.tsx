import React from "react";
import Select from "react-select";

// Types
import {
  Shift,
  Slot,
  ShiftSelectOption,
  ShiftInputChange,
} from "../../../types/bookings";

// Utils
import { formatHoursOnEdit, getAllTimeSlots } from "../../utils/time";

interface TimeInputProps {
  time: string;
  isStartTime: boolean;
  shift: Shift;
  handleChange: (v: ShiftInputChange) => void;
}

const slotOptions: Slot[] = getAllTimeSlots();

export const TimeInput = ({
  time,
  handleChange,
  shift,
  isStartTime = true,
}: TimeInputProps) => {
  const onInputChange = (option: ShiftSelectOption | null) => {
    handleChange({
      newValue: option,
      shift,
      isStartTime,
    });
  };

  return (
    <Select
      className="basic-single"
      classNamePrefix="select"
      styles={{
        control: (base, state) => ({
          ...base,
          boxShadow: "none",
          borderColor: state.menuIsOpen ? "#ED5520" : "#000",
          "&:hover": {
            borderColor: "#ED5520",
          },
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: "#000",
          padding: 1,
          paddingRight: 7,
        }),
        valueContainer: (base) => ({
          ...base,
          paddingLeft: 7,
          padding: 1,
        }),
        option: (base, state) => ({
          ...base,
          color: state.isSelected ? "#000" : "#000",
          backgroundColor: state.isFocused
            ? "#EDECDF"
            : state.isSelected
            ? "#ED5520"
            : "#fff",
          "&:hover": {
            backgroundColor: "#EDECDF",
          },
        }),
      }}
      defaultValue={{
        value: time,
        label:
          time === ""
            ? isStartTime
              ? "Start..."
              : "End..."
            : formatHoursOnEdit(time),
      }}
      components={{
        IndicatorSeparator: () => null,
      }}
      onChange={onInputChange}
      isDisabled={false}
      isLoading={false}
      isClearable={false}
      isRtl={false}
      isSearchable={false}
      options={slotOptions}
    />
  );
};
