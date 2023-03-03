import React from "react";
import { Slot } from "../../../types/bookings";
import { formatHours, getAllTimeSlots } from "../../utils/time";
import Select from "react-select";
import { Shift } from "../../../types/bookings";

interface TimeInputProps {
  time: string;
  startOrEnd: string;
  shift: Shift;
  handleChange: (v: any) => void;
}

const slotOptions: Slot[] = getAllTimeSlots();


export const TimeInput = ({ time, handleChange, shift, startOrEnd }: TimeInputProps) => {

  const onInputChange = (newValue: any) => {
    handleChange({ newValue: newValue, shift: shift, startOrEnd: startOrEnd })
  }

  return(
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
      valueContainer: (base) => ({
        ...base,
        paddingLeft: 7,
        padding: 1
      }),
      option: (base, state) => ({
        ...base,
        color: state.isSelected ? "#000" : "#000",
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
    onChange={onInputChange}
    isDisabled={false}
    isLoading={false}
    isClearable={false}
    isRtl={false}
    isSearchable={false}
    options={slotOptions}
  />
)};
