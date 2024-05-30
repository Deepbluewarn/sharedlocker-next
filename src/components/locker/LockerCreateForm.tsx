'use client'

import createLockerAction from "@/actions/locker/createLocker"
import { ILockerStructure } from "@/interfaces/api/locker";
import { useCallback, useState } from "react";
import { useFormState } from "react-dom"

export default function LockerCreateForm({ lockerStructure }: {
    lockerStructure: ILockerStructure[]
}) {
    const [state, formAction] = useFormState(createLockerAction, '');
    const [selectedBuildingName, setSelectedBuildingName] = useState<string>('');
    const [selectedBuildingNumber, setSelectedBuildingNumber] = useState<string>('');
    const [selectedFloor, setSelectedFloor] = useState<string>('');
    const [selectedLocker, setSelectedLocker] = useState<string>('');

    const handleBuildingChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBuildingNumber(event.target.value);
        setSelectedFloor('');
        setSelectedLocker('');
    }, [selectedFloor, selectedLocker]);

    const handleFloorChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFloor(event.target.value);
        setSelectedLocker('');
    }, [selectedLocker]);

    const handleLockerChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocker(event.target.value);
    }, []);

    if (!lockerStructure) {
        return <p>보관함 정보가 없습니다.</p>;
    }

    const buildingOptions = lockerStructure.map((building) => (
        <option key={building.buildingNumber} value={building.buildingNumber}>
            {building.buildingName}
        </option>
    ));

    const floorOptions = lockerStructure
        .find(b => String(b.buildingNumber) === selectedBuildingNumber)?.floorList?.map((floor) => (
            <option key={floor} value={floor}>
                {floor}층
            </option>
        ));

    const submitValidation = selectedBuildingNumber && selectedFloor

    return (
        <form action={formAction}>
            <select name='buildingNumber' value={selectedBuildingNumber} onChange={handleBuildingChange}>
                <option>건물 선택</option>
                {buildingOptions}
            </select>

            {selectedBuildingNumber && (
                <select name='floorNumber' value={selectedFloor} onChange={handleFloorChange}>
                    <option>층 선택</option>
                    {floorOptions}
                </select>
            )}

            {selectedFloor && (
                <input name='lockerNumber' type='number' placeholder="보관함 번호를 입력하세요"></input>
            )}

            <button disabled={submitValidation ? false : true}>
                생성
            </button>
            <p>{state}</p>
        </form>
    );
}
