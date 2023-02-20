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
    defaultValue={{
      value: formatHours(time),
      label: formatHours(time),
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
