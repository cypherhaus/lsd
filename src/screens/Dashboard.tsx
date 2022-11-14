import { observer } from "mobx-react-lite";
import { FUND, LN_ADDRESS, TRANSFER, WITHDRAW } from "../constants/sidebar";

import { Navigation } from "../navigation";
import { useStore } from "../store";
import { Fund } from "../components/Fund";
import { LNAddress } from "../components/LNAddress";
import { Sidebar } from "../components/Sidebar";
import { Transfer } from "../components/Transfer";
import { Withdraw } from "../components/Withdraw";
import { CypherhausSVG } from "../components/CypherhausSVG";

export const Dashboard = observer(() => {
  const { sidebarView } = useStore();

  const renderPanel = () => {
    switch (sidebarView.activePanel) {
      case FUND:
        return <Fund />;
      case LN_ADDRESS:
        return <LNAddress />;
      case WITHDRAW:
        return <Withdraw />;
      case TRANSFER:
        return <Transfer />;
      default:
        return <></>;
    }
  };

  return (
    <div className="h-screen flex-1 flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navigation />
        <div className="p-5 flex flex-row items-center pt-12 pl-40 pr-40">
          {renderPanel()}
        </div>
        <div className="pb-4 flex flex-row mt-auto items-center justify-center">
          <p className="text-dark200 pr-2">Built with love by</p>
          <CypherhausSVG />
        </div>
      </div>
    </div>
  );
});
