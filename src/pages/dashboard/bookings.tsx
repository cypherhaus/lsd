import moment from "moment";
import { Layout } from "../../components/common/Layout";

export default function Bookings() {
  return (
    <Layout>
      <div>
        <span className="text-4xl font-bold">
          {moment().format("dddd, MMMM Do")}
        </span>
        <div className="flex flex-col items-center">
          <div className="w-80 h-28 bg-[lightGrey] mt-8 p-4 rounded flex-row flex gap-8">
            <div className="flex flex-col justify-between">
              <div>10AM</div>
              <div>2PM</div>
            </div>
            <div>
              <div className="text-2xl font-bold">Rio</div>
              <div>Maltipoo</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
