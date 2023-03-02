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
        borderColor: "#000",
        display: 'flex',
        "&:hover": {
          borderColor: "#ED5520"
        },
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
