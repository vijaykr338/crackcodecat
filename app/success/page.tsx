"use client";

import { Box, Container, Title, Text, Paper, Center, ThemeIcon, Button, Stack } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import Link from 'next/link';

export default function SuccessPage() {
  return (
    <Box
      component="main"
      style={{
        minHeight: '100dvh',
        background: 'linear-gradient(180deg, #061537 0%, #0B2C64 55%, #114CA8 100%)',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container size="md" style={{ width: '100%' }}>
        <Paper
          radius="xl"
          p={{ base: 'xl', md: '2.5rem' }}
          shadow="xl"
          withBorder
          style={{
            background: 'linear-gradient(150deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(14px)',
            textAlign: 'center'
          }}
        >
          <Stack align="center" gap="xl">
            <ThemeIcon
              size={80}
              radius="50%"
              variant="gradient"
              gradient={{ from: 'green', to: 'teal' }}
            >
              <IconCheck style={{ width: '50%', height: '50%' }} />
            </ThemeIcon>

            <Stack gap="sm">
                <Title
                  order={1}
                  
                  fw={900}
                  style={{ color: '#fff', letterSpacing: -1 }}
                >
                  Purchase Successful!
                </Title>

                <Text
                  size="lg"
                  c="gray.2"
                  maw={450}
                  mx="auto"
                >
                  Thank you for purchasing the course. You will be contacted soon by our team with further details.
                </Text>
            </Stack>

            <Button
              component={Link}
              href="/"
              size="lg"
              radius="lg"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              style={{
                transition: 'transform 0.2s ease-in-out'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Back to Homepage
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
