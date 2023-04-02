import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { Input } from "../../components/common/Input";
import { Layout } from "../../components/common/Layout";

const Transfer = observer(() => {
  const { dashboardView, authStore } = useStore();
  return (
    <Layout>
      <div className="flex flex-col items-center h-full p-10 flex-1">
        <p className="text-xl font-bold text-center mb-8">Pay a username</p>
        <Input
          onChange={dashboardView.setSendUsername}
          placeholder="Username"
          value={dashboardView.sendUsername}
        />
        <Input
          onChange={dashboardView.setSendAmount}
          placeholder="Amount"
          type="number"
          value={dashboardView.sendAmount}
        />
        <button
          onClick={() =>
            dashboardView.handlePayUsername(authStore.currentUser.id)
          }
          className="p-3 mt-5 text-white bg-primary text-xl font-bold"
        >
          Send
        </button>
      </div>
    </Layout>
  );
});

export default Transfer;
