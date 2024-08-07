'use client'

import { Container, Group, Box, Button, Avatar, Text } from '@mantine/core';
import classes from '@/styles/headers/header.module.css';
import Link from 'next/link';
import SignOutForm from '../auth/LogoutForm';
import { IUserInfo } from '@/interfaces/api/user';

export function MainHeader(props: {
  token?: string;
  userInfo?: IUserInfo;
}) {

  return (
    <header className={classes.header}>
      <Container className={classes.inner}>
        <Text>공유 보관함</Text>
        <Box>
          <Group visibleFrom="sm">
            {
              props.token ? (
                <>
                  <Avatar color="cyan" radius="xl">{props.userInfo?.nickname}</Avatar>
                  {
                    props.userInfo?.admin ? (
                      <Button component={Link} href='/admin'>관리자 페이지</Button>
                    ) : null
                  }
                  <SignOutForm />
                </>
              ) : (
                <>
                  <Button component={Link} href='/signin' variant="default">로그인</Button>
                </>
              )
            }

          </Group>
        </Box>
      </Container>
    </header>
  );
}