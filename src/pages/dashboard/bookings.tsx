import { Layout } from "../../components/common/Layout";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";

const Bookings = observer(() => {
  const { bookingView } = useStore();

  return (
    <Layout>
      <div className="flex items-center gap-4">
        <div onClick={bookingView.prevDay}>prev</div>
        <span className="text-4xl font-bold">
          {bookingView.activeDay &&
            bookingView.activeDay.format("dddd, MMMM Do")}
        </span>
        <div onClick={bookingView.nextDay}>next</div>
      </div>
    </Layout>
  );
});

export default Bookings;
