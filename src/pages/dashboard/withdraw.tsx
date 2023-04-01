import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { Input } from "../../components/common/Input";
import { Layout } from "../../components/common/Layout";

const Withdraw = observer(() => {
  const { dashboardView, authStore } = useStore();

  if (!authStore?.currentUser?.ln_address) {
    return (
      <Layout>
        <div className="flex flex-col items-center h-full p-10 flex-1">
          <p className="text-xl font-bold text-center mb-8">
            Update your Lightning Address for withdrawals
          </p>
          <Input
            onChange={dashboardView.setLightningAddress}
            placeholder="Lightning Address"
            value={dashboardView.lnAddress}
          />
          <button
            onClick={dashboardView.handleUpdateAddressClick}
            className="rounded p-3 mt-5 text-white bg-primary text-xl font-bold"
          >
            Save
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col items-center h-full p-10 flex-1">
        <p className="text-xl font-bold text-center mb-8">Make a withdrawal</p>

        <p className="text-xl text-center mb-8">
          Your satoshis will be sent to {authStore?.currentUser?.ln_address}
        </p>
        <Input
          type="number"
          onChange={dashboardView.setWithdrawAmount}
          placeholder="Amount"
          value={dashboardView.withdrawAmount}
        />
        <button
          onClick={dashboardView.handleWithdrawClick}
          className="rounded p-3 mt-5 text-white bg-primary text-xl font-bold"
        >
          Withdraw
        </button>
      </div>
    </Layout>
  );
});

export default Withdraw;
