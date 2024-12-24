'use client'

import createLockerAction from "@/actions/locker/createLocker"
import { ILockerStructure } from "@/interfaces/api/locker";
import { Button, NativeSelect, NumberInput, Stack, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useCallback, useEffect, useState } from "react";
import { useFormState } from "react-dom"

export default function LockerCreateForm({ lockerStructure }: {
    lockerStructure: ILockerStructure[]
}) {
    const [state, formAction] = useFormState(createLockerAction, null);
    const [selectedBuildingName, setSelectedBuildingName] = useState<string>('');
    const [selectedBuildingNumber, setSelectedBuildingNumber] = useState<string>('');
    const [selectedFloor, setSelectedFloor] = useState<string>('');
    const [selectedLocker, setSelectedLocker] = useState<string>('');

    useEffect(() => {
        if (state?.success) {
            notifications.show({
                title: '보관함 생성 완료',
                message: '보관함이 성공적으로 생성되었습니다',
            })
        }
    }, [state])

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
        <>
            <Text>보관함 추가</Text>
            <form action={formAction}>
                <Stack>
                    <Stack>
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
                            <NumberInput name='lockerNumber' label='보관함 번호를 입력하세요' placeholder="보관함 번호"></NumberInput>
                        )}
                    </Stack>

                    <Button type='submit' disabled={submitValidation ? false : true}>
                        생성
                    </Button>
                </Stack>
            </form>
        </>
    );
}
