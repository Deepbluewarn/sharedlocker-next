import { SimpleGrid } from '@mantine/core';
import classes from '@/styles/locker/LockerDetailGrid.module.css';

export function LockerDetailGrid() {
    return (
        <div className={classes.root}>
            <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
                
            </SimpleGrid>
        </div>
    );
}