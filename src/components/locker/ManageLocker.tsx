'use client'

import getLockerDetailAction from "@/actions/locker/getLockerDetail";
import { ILockerStructure } from "@/interfaces/api/locker";
import { useFormState } from "react-dom";
import LockerSelector from "./LockerSelector";
import deleteLockerAction from "@/actions/locker/deleteLocker";
import { useEffect, useState } from "react";
import { Button, Divider } from "@mantine/core";
import { LockerDetailGrid } from "./LockerDetailGrid";
import classes from '@/styles/locker/ManageLocker.module.css';

export default function ManageLocker({ lockerStructure }: {
    lockerStructure: ILockerStructure[]
}) {
    const [lookupState, lookupFormAction] = useFormState(getLockerDetailAction, null);
    const [deleteState, deleteFormAction] = useFormState(deleteLockerAction, null);

    const [lockerStructureState, setLockerStructureState] = useState<ILockerStructure[]>(lockerStructure);

    useEffect(() => {
        setLockerStructureState(lockerStructure); // deleteLockerAction에서 revalidatePath 후 서버 측에서 lockerStructure가 갱신 됨.
        
        if (deleteState) {
            alert(deleteState?.message)
        }
    }, [deleteState])

    const lockerDeleted = lookupState?.value[0].buildingNumber === deleteState?.value.buildingNumber
    && lookupState?.value[0].floorNumber === deleteState?.value.floorNumber
    && lookupState?.value[0].lockerNumber === deleteState?.value.lockerNumber

    return (
            <div key={JSON.stringify(lockerStructureState)}>
                <form action={lookupFormAction} className={classes['locker-selector-form']}>
                    <LockerSelector lockerStructure={lockerStructureState} />
                </form>

                <Divider className={classes.divider}/>
                {
                    !(lockerDeleted) && lookupState?.value ? (
                        <>
                            <LockerDetailGrid lockerDetails={lookupState.value}/>
                            <form action={deleteFormAction}>
                                <input type='hidden' name='buildingNumber' value={lookupState.value[0].buildingNumber} />
                                <input type='hidden' name='floorNumber' value={lookupState.value[0].floorNumber} />
                                <input type='hidden' name='lockerNumber' value={lookupState.value[0].lockerNumber} />
                                <Button type="submit" color="red">보관함 삭제</Button>
                            </form>
                        </>
                    ) : (
                        null
                    )
                }
            </div>
    )
}
