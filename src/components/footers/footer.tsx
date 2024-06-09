'use client'

import { Anchor, Group, ActionIcon, rem, Text } from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from '@/styles/footers/footer.module.css';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Store' },
  { link: '#', label: 'Careers' },
];

export function FooterCentered() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Text>공유 보관함</Text>

        <Group className={classes.links}>{items}</Group>
      </div>
    </div>
  );
}