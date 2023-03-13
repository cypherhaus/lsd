import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

// Components
import { HoursNavigation } from "./HoursNavigation";
import { Button } from "../../components/common/Button";
import { Loading } from "../common/Loading";

// Icons
import { RiGroupLine } from "react-icons/ri";

// Constants
import { BUTTON_VARIANT } from "../../constants/common";

export const TeamHours = observer(() => {
  const { hoursView } = useStore();
  const { handleAddMember, shiftsLoading } = hoursView;

  return (
    <>
      {shiftsLoading ? (
        <Loading />
      ) : (
        <>
          <HoursNavigation />
          <div className="flex flex-col items-center">
            <Button
              icon={<RiGroupLine />}
              onClick={handleAddMember}
              variant={BUTTON_VARIANT.WHITE}
            >
              Add Team Member
            </Button>
          </div>
        </>
      )}
    </>
  );
});
