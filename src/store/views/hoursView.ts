/**
 * Copyright (c) Daramac LTD. and its affiliates.
 *
 * This code can not be copied and/or distributed
 * without the express permission of Daramac LTD. and its affiliates.
 */

import { makeAutoObservable, runInAction } from "mobx";
import { Store } from "../store";
import moment, { Moment } from "moment";
import { v4 as uuidv4 } from "uuid";

// Types
import {
  Shift,
  ShiftInputChangeProps,
  ShiftValidationError,
} from "../../../types/bookings";

// Utils
import { checkOverlap, checkStartBeforeEnd } from "../../utils/time";

// Constants
import { START_TIME, END_TIME } from "../../constants/common";

export default class HoursView {
  private _store: Store;

  weekStart: Moment | null = null;
  weekEnd: Moment | null = null;
  activeWeekShifts: Shift[][] | null = null;
  teamShifts: any = [];

  shiftValidationErrors: ShiftValidationError[] = [];

  // Edited shifts
  newShifts: Shift[] = [];
  editedSomething = false;
  shiftsEditOpen = false;

  // Shifts to be deleted
  shiftsToDelete: string[] = [];

  constructor(store: Store) {
    makeAutoObservable(this, {}, { deep: false, autoBind: true });
    this._store = store;
    this.resetWeek();
  }

  handleAddMember = async () => {
    await this._store.teamStore.addTeamMember(
      this._store.authStore.currentUser.business_id
    );
  };

  fetchShifts = async (user: string) => {
    await this._store.teamStore.fetchShifts(user);
    this.setActiveWeekShifts();
  };

  setActiveWeekShifts = () => {
    if (!this.weekStart || !this.weekEnd) return;

    let day = this.weekStart;
    const shiftDays: any = [];
    while (day < this.weekEnd) {
      const repeatShifts = this._store.teamStore?.shifts?.filter((shift) => {
        const isoWeekday = day.isoWeekday();
        return shift.iso_weekday === isoWeekday;
      });

      const repeatShiftsWithDates = repeatShifts.map((shift) => {
        return { ...shift, shiftDate: day };
      });

      shiftDays.push(repeatShiftsWithDates);

      day = day.clone().add(1, "days");
    }

    runInAction(() => {
      this.activeWeekShifts = shiftDays;
    });
  };

  prevWeek = () => {
    runInAction(() => {
      if (!this.weekStart || !this.weekEnd) return;

      this.weekStart = this.weekStart.clone().subtract(7, "days");
      this.weekEnd = this.weekEnd.clone().subtract(7, "days");
    });

    this.setActiveWeekShifts();
  };

  nextWeek = () => {
    runInAction(() => {
      if (!this.weekStart || !this.weekEnd) return;
      this.weekStart = this.weekStart.clone().add(7, "days");
      this.weekEnd = this.weekEnd.clone().add(7, "days");
    });

    this.setActiveWeekShifts();
  };

  resetWeek = () => {
    runInAction(() => {
      this.weekStart = moment().startOf("week").add(1, "days");
      this.weekEnd = moment().endOf("week").add(1, "days");
    });
  };

  setNewShifts = () => {
    runInAction(() => {
      this.newShifts = [...this._store.teamStore?.shifts];
    });
  };

  handleValidateAndSaveChanges = async () => {
    runInAction(() => {
      this.shiftValidationErrors = [];
    });

    const shiftsToDelete = [...this.shiftsToDelete];
    let newShifts = [...this.newShifts];

    if (shiftsToDelete.length !== 0)
      newShifts = newShifts.filter(
        (s) => !shiftsToDelete.includes(s.id as string)
      );

    if (newShifts.length !== 0) {
      newShifts.map((s) => {
        if ((s.start_time || s.end_time) === "") {
          runInAction(() => {
            this.shiftValidationErrors = [
              ...this.shiftValidationErrors,
              {
                shiftId: s.id,
                message: "Please enter both start time and end time.",
              },
            ];
          });
        }
        if (!checkStartBeforeEnd(s.start_time, s.end_time)) {
          runInAction(() => {
            this.shiftValidationErrors = [
              ...this.shiftValidationErrors,
              { shiftId: s.id, message: "End time is not after start time." },
            ];
          });
        }
      });
    }

    let finalShiftsToUpdate = newShifts.filter(
      (obj, index) =>
        newShifts.findIndex((item) => item.id === obj.id) === index
    );

    const initialShiftArray: string[][] = [];
    const days = [
      { number: 1, shifts: initialShiftArray },
      { number: 2, shifts: initialShiftArray },
      { number: 3, shifts: initialShiftArray },
      { number: 4, shifts: initialShiftArray },
      { number: 5, shifts: initialShiftArray },
      { number: 6, shifts: initialShiftArray },
      { number: 7, shifts: initialShiftArray },
    ];

    days.map((d) => {
      const dayShifts = finalShiftsToUpdate.filter(
        (s) => s.iso_weekday === d.number
      );
      if (dayShifts.length > 1) {
        d.shifts = dayShifts.map((ds) => [ds.start_time, ds.end_time]);
        dayShifts.map((ds) => {
          if (checkOverlap(d.shifts)) {
            runInAction(() => {
              this.shiftValidationErrors = [
                ...this.shiftValidationErrors,
                {
                  shiftId: ds.id as string,
                  message: "There is time overlap in shifts.",
                },
              ];
            });
          }
        });
      }
    });

    if (this.shiftValidationErrors.length === 0) {
      if (shiftsToDelete.length > 0)
        await this._store.teamStore.deleteMultipleShifts(shiftsToDelete);
      if (this.editedSomething)
        await this._store.teamStore.updateShifts(finalShiftsToUpdate);
      this.handleCloseEditingAndResetEverything();
    }
  };

  handleAddShift = (n: number) => {
    const newShifts = [...this.newShifts];
    const id = uuidv4();
    const currentTime = moment().format();

    runInAction(() => {
      this.newShifts = [
        ...newShifts,
        {
          id: id,
          created_at: currentTime,
          start_time: "",
          end_time: "",
          iso_weekday: n,
          user_id: this._store.authStore.currentUser.id,
        },
      ];
    });
  };

  handleEditShift = ({
    newValue,
    isStartTime,
    shift,
  }: ShiftInputChangeProps) => {
    const startOrEnd = isStartTime ? START_TIME : END_TIME;
    const newShifts = [...this.newShifts];

    if (!this.editedSomething) {
      runInAction(() => {
        this.editedSomething = true;
      });
    }

    const index = newShifts.map((s: Shift) => s.id).indexOf(shift?.id);
    index !== -1 || newShifts.length !== 0
      ? (newShifts[index] = {
          ...newShifts[index],
          [startOrEnd]: newValue.value,
        })
      : newShifts.push({
          ...(shift as Shift),
          [startOrEnd]: newValue.value,
        });

    runInAction(() => {
      this.newShifts = newShifts;
    });
  };

  handleAddShiftReadyToDelete = (shiftId: string) => {
    const shiftsToDelete = [...this.shiftsToDelete];
    const newShifts = this.newShifts.filter((shift) => shift.id !== shiftId);

    runInAction(() => {
      this.shiftsToDelete = [...shiftsToDelete, shiftId];
      this.newShifts = newShifts;
    });
  };

  handleCloseEditingAndResetEverything = () => {
    runInAction(() => {
      this.shiftsToDelete = [];
      this.newShifts = [];
      this._store.modalView.closeModal();
      this.shiftsEditOpen = false;
      this.shiftValidationErrors = [];
      this.editedSomething = false;
    });
  };

  handleSetShiftsEditOpen = (v: boolean) => {
    runInAction(() => {
      this.shiftsEditOpen = v;
    });
  };

  fetchTeamShifts = () => {};
}
