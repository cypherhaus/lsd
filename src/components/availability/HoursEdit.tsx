import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";
import { RiCloseFill } from 'react-icons/ri';
import { Button } from '../common/Button';

// Constants
import { DAYS_IN_WEEK } from '../../constants/other';

interface Props {
  user: {
    firstName: string
    lastName: string
  },
  setEditOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void
}

export const HoursEdit = observer(({ user, setEditOpen }: Props) => {

  const { hoursView, teamStore } = useStore();
  const { firstName, lastName } = user;

  if (!hoursView.weekStart || !hoursView.weekEnd) return <></>;

  return (
    <div className="flex flex-col m-4 mx-12">
      <div className="flex flex-row items-center justify-between">
        <RiCloseFill className="text-4xl" />
        <span className="font-button text-2xl">
            Edit Shifts for <span className="font-bold">{firstName} {lastName}</span>
        </span>
        <div>
            <Button type="submit">Save</Button>
        </div>
      </div>
      <div className="flex flex-col">
        {DAYS_IN_WEEK.map((day) => <p key={day.number}>{day.fullLabel}</p>)}
      </div>
    </div>
  ); 
});
