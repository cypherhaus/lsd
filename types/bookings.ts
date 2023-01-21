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
