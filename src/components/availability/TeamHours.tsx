import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

// Components
import { HoursNavigation } from "./HoursNavigation";
import { Button } from "../../components/common/Button";
import { Loading } from "../common/Loading";

// Types
import { User } from "../../../types/auth";

// Icons
import { RiGroupLine } from "react-icons/ri";

// Constants
import { BUTTON_VARIANT } from "../../constants/common";

interface Props {
  user: User;
}

export const TeamHours = observer(({ user }: Props) => {
  const { hoursView } = useStore();
  const { handleAddMember, loading } = hoursView;

  return (
    <>
      {loading && <Loading />}
      <div className={loading ? "hidden" : undefined}>
        <HoursNavigation user={user} />
        <div className="flex flex-col items-center">
          <Button
            icon={<RiGroupLine />}
            onClick={handleAddMember}
            variant={BUTTON_VARIANT.WHITE}
          >
            Add Team Member
          </Button>
        </div>
      </div>
    </>
  );
});
