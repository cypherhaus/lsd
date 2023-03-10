import { Moment } from "moment";

export interface Booking {
  start: Date;
  end: Date;
  customer_breed: string;
  customer_email: string;
  customer_id: string;
  customer_phone: string;
  id: string;
  user_id: string;
}

export interface Hours {
  open: string;
  close: string;
  day: number;
  user_id: string;
  id: string;
}

export interface Shift {
  created_at: string;
  end_time: string;
  id: string;
  iso_weekday: number;
  repeat?: boolean;
  start_time: string;
  user_id: string;
  date?: Moment;
}

export interface ShiftSelectOption {
  label: string;
  value: string;
}

export interface ShiftInputChange {
  newValue: ShiftSelectOption;
  isStartTime: boolean;
  shift: Shift;
}

export interface ShiftValidationError {
  shiftId?: string;
  message: string;
}

export interface Slot {
  value: string;
  label: string;
  hour: number;
  minute: number;
}

export interface AddBlockedTime {
  start: Moment;
  end: Moment;
  user_id: string;
}
export interface BlockedTime {
  start: string;
  end: string;
  user_id: string;
  created_at: string;
  id: string;
}

export interface DayTimeBlock {
  id: string;
  start: string;
  end: string;
  type: string;
  customer_breed?: string;
  customer_email?: string;
  customer_id?: string;
  customer_phone?: string;
  user_id?: string;
}
