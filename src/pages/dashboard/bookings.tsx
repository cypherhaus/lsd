import moment from "moment";
import { Layout } from "../../components/common/Layout";
import { useEffect } from "react";
import { useStore } from "../../store";
import { useUser } from "@supabase/auth-helpers-react";
import { observer } from "mobx-react-lite";

const Bookings = observer(() => {
  const { bookingView } = useStore();

  const user = useUser();

  useEffect(() => {
    if (!user) return;

    bookingView.fetchProfile(user.id);
    bookingView.fetchBookings(user.id);
  }, [user]);

  return (
    <Layout>
      <div>
        <div className="flex items-center gap-4">
          <div onClick={bookingView.prevDay}>prev</div>
          <span className="text-4xl font-bold">
            {bookingView.activeDay &&
              bookingView.activeDay.format("dddd, MMMM Do")}
          </span>
          <div onClick={bookingView.nextDay}>next</div>
        </div>
        <div className="flex flex-col items-center">
          {bookingView.dayBookings &&
            bookingView.dayBookings.map((item) => (
              <div
                key={item.id}
                className="w-80 h-28 bg-[lightGrey] mt-8 p-4 rounded flex-row flex gap-8"
              >
                <div className="flex flex-col justify-between">
                  <div>{moment(item.start).format("HH:mm")}</div>
                  <div>{moment(item.end).format("HH:mm")}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">Rio</div>
                  <div>Maltipoo</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
});

export default Bookings;
