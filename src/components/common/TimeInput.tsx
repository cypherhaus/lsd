import React from "react";
import { Slot } from "../../../types/bookings";
import { formatHours, getAllTimeSlots } from "../../utils/time";
import Select from "react-select";

interface TimeInputProps {
  time: string;
  onChange: (v: any) => void;
}

const slotOptions: Slot[] = getAllTimeSlots();

export const TimeInput = ({ time, onChange }: TimeInputProps) => (
  <Select
    className="basic-single"
    classNamePrefix="select"
    styles={{
      control: (base, state) => ({
        ...base,
        boxShadow: 'none',
        borderColor: state.menuIsOpen ? "#ED5520" : '#000',
        '&:hover': {
          borderColor: '#ED5520',
        }
      }),
      dropdownIndicator: (base) => ({
        ...base,
        color: "#000",
        padding: 1,
        paddingRight: 7
      }),
      valueContainer: (base, state) => ({
        ...base,
        paddingLeft: 7,
        padding: 1
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? '#EDECDF' : state.isSelected ? "#ED5520" : "#fff",
        '&:hover': {
          backgroundColor: '#EDECDF'
        }
      }),
    }}
    defaultValue={{
      value: formatHours(time),
      label: formatHours(time),
    }}
    components={{
      IndicatorSeparator: () => null
    }}
    onChange={onChange}
    isDisabled={false}
    isLoading={false}
    isClearable={false}
    isRtl={false}
    isSearchable={false}
    options={slotOptions}
  />
);
