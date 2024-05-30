'use client'

import getLockerDetailAction from "@/actions/locker/getLockerDetail";
import { ILockerStructure } from "@/interfaces/api/locker";
import { useFormState } from "react-dom";
import LockerSelector from "./LockerSelector";
import LockerDetail from "./LockerDetail";
import deleteLockerAction from "@/actions/locker/deleteLocker";
import { useEffect, useState } from "react";

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
        <div>
            <h1>Manage Locker</h1>

            <div key={JSON.stringify(lockerStructureState)}>
                <form action={lookupFormAction}>
                    <LockerSelector lockerStructure={lockerStructureState} />
                </form>
                {
                    !(lockerDeleted) && lookupState?.value ? (
                        <>
                            <LockerDetail lockerDetail={lookupState.value} />
                            <form action={deleteFormAction}>
                                <input type='hidden' name='buildingNumber' value={lookupState.value[0].buildingNumber} />
                                <input type='hidden' name='floorNumber' value={lookupState.value[0].floorNumber} />
                                <input type='hidden' name='lockerNumber' value={lookupState.value[0].lockerNumber} />
                                <button type="submit">보관함 삭제</button>
                            </form>
                        </>
                    ) : (
                        null
                    )
                }
            </div>
        </div>
    )
}
