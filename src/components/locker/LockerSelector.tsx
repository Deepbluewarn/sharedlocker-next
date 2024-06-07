'use client'

import { ILockerStructure } from "@/interfaces/api/locker";
import { Button, NativeSelect } from "@mantine/core";
import { useCallback, useState } from "react";

export default function LockerSelector({ lockerStructure }: {
    lockerStructure: ILockerStructure[]
}) {
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

    const lockerOptions = lockerStructure
        .find((building) => String(building.buildingNumber) === selectedBuildingNumber)
        ?.lockerList.find(l => String(l.floor) === selectedFloor)
        ?.list.map(lockerNumber => (
            <option key={lockerNumber} value={lockerNumber}>
                {lockerNumber}번 보관함
            </option>
        ))

    const submitValidation = selectedBuildingNumber && selectedFloor && selectedLocker

    return (
        <>
            <NativeSelect name='buildingNumber' value={selectedBuildingNumber} label='건물을 선택하세요' onChange={handleBuildingChange}>
                <option>건물 선택</option>
                {buildingOptions}
            </NativeSelect>

            {selectedBuildingNumber && (
                <NativeSelect name='floorNumber' value={selectedFloor} label='층을 선택하세요' onChange={handleFloorChange}>
                    <option>층 선택</option>
                    {floorOptions}
                </NativeSelect>
            )}

            {selectedFloor && (
                <NativeSelect name='lockerNumber' value={selectedLocker} label='보관함을 선택하세요' onChange={handleLockerChange}>
                    <option>보관함 선택</option>
                    {lockerOptions}
                </NativeSelect>
            )}

            <Button type='submit' disabled={submitValidation ? false : true}>
                조회
            </Button>
        </>
    );
}