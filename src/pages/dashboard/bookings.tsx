import moment from "moment";
import { Layout } from "../../components/common/Layout";
import { useEffect } from "react";
import { useStore } from "../../store";
import { useUser } from "@supabase/auth-helpers-react";
import { observer } from "mobx-react-lite";
import { Button } from "../../components/common/Button";
import { ADD_BLOCK_MODAL } from "../../constants/modals";
import { errorToast } from "../../utils/toast";

const Bookings = observer(() => {
  const { bookingView, modalView, bookingStore } = useStore();

  const user = useUser();

  useEffect(() => {
    if (!user) return;

    bookingView.fetchProfile(user.id);
    bookingView.fetchBookings(user.id);
    bookingView.fetchBlockedTimes(user.id);
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
          {bookingView.dayTimeBlocks &&
            bookingView.dayTimeBlocks.map((item) => (
              <div
                key={item.id}
                className={`w-80 h-28 bg-[lightGrey] mt-8 p-4 rounded flex-row flex gap-8 ${
                  item.type === "blocked" ? "bg-[red]" : ""
                }`}
              >
                <div className="flex flex-col justify-between">
                  <div>{moment(item.start).format("HH:mm")}</div>
                  <div>{moment(item.end).format("HH:mm")}</div>
                </div>
                {item.type === "booking" && (
                  <div>
                    <div className="text-2xl font-bold">Rio</div>
                    <div>Maltipoo</div>
                  </div>
                )}
              </div>
            ))}
        </div>

        <div>
          <Button onClick={bookingView.addBlockClick}>Add Blocked Time</Button>
        </div>
      </div>
    </Layout>
  );
});

export default Bookings;
