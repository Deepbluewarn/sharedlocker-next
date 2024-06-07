import { Container, Text, Button, Group } from '@mantine/core';
import classes from '@/styles/heros/HeroTitle.module.css';

export function HeroTitle() {
  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          스마트{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            공유
          </Text>{' '}
          보관함
        </h1>

        <Text className={classes.description} color="dimmed">
          보관함을 함께 공유할 수 있는 서비스
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            다운로드
          </Button>

          <Button
            component="a"
            href="https://github.com/deepbluewarn/SharedLocker"
            target='_blank'
            size="xl"
            variant="default"
            className={classes.control}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}