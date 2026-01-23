"use client";
import { Box, Container, Title, Text, Grid, Paper, SimpleGrid, Group, Stack, ThemeIcon } from '@mantine/core';
import { IconAward, IconSchool, IconTimeline, IconBriefcase } from '@tabler/icons-react';
import Image from 'next/image';

export function FacultySpotlight() {
  return (
    <Box component="section" id="mentors" py={{ base: 28, md: 64 }} style={{
      background: 'linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container size="lg">
        <Grid gutter={{ base: 24, md: 40 }} align="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              
<Image
    src="/crackcode.webp"
    alt="Abhishek Anand"
    // --- FIX ---
    // Use the ACTUAL dimensions of your source image file.
    // Replace 1080 with the real width and height of "/crackcode.webp".
    width={1080}
    height={1080}
    style={{
        width: '100%',
        maxWidth: '540px',
        // --- BEST PRACTICE ---
        // Set height to 'auto' to maintain the image's aspect ratio.
        // This prevents the image from being squished or stretched.
        height: 'auto', 
        objectFit: 'cover', // You can keep this, but it's most useful when height is fixed.
        display: 'block',
        borderRadius: 16
    }}
/>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <Text size="lg" fw={700} style={{ color: '#0066FF' }}>
                Meet Your Mentor
              </Text>
              <Title order={1} size={48} fw={900} style={{ color: '#003366', letterSpacing: -1.5, fontSize: 'clamp(22px, 6.5vw, 48px)' }}>
                Abhishek Anand
              </Title>
              <Text size="xl" c="dimmed" style={{ lineHeight: 1.6, fontSize: 'clamp(14px, 4.5vw, 18px)' }}>
                The CAT VARC Expert Who Walked Your Path—
                Your mentor isn't someone who got lucky once, I'm someone who failed, researched, discovered, and consistently delivered results with proof at every step.
                <br />
                <a href="/meetyourmentor" style={{ color: '#0066FF', textDecoration: 'underline', fontWeight: 600 }}>
                  Read more...
                </a>
              </Text>
              
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 10, sm: 14, md: 18 }} mt="md">
                <Paper withBorder p="md" radius="md" style={{ background: '#fff' }}>
                  <Group>
                    <ThemeIcon size="lg" variant="light" color="blue" radius="md">
                      <IconAward size={24} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700}>CAT 95+ ile Scorer</Text>
                      <Text size="sm" c="dimmed">India's top 5 percentile</Text>
                    </Box>
                  </Group>
                </Paper>
                <Paper withBorder p="md" radius="md" style={{ background: '#fff' }}>
                  <Group>
                    <ThemeIcon size="lg" variant="light" color="grape" radius="md">
                      <IconSchool size={24} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700}>VARC Decoder</Text>
                      <Text size="sm" c="dimmed">Cracked code of VARC</Text>
                    </Box>
                  </Group>
                </Paper>
                <Paper withBorder p="md" radius="md" style={{ background: '#fff' }}>
                  <Group>
                    <ThemeIcon size="lg" variant="light" color="teal" radius="md">
                      <IconTimeline size={24} />
                    </ThemeIcon>
                    <Box>
                      <Text fw={700}>10 Years CAT Journey</Text>
                      <Text size="sm" c="dimmed">CAT 2015-2025</Text>
                    </Box>
                  </Group>
                </Paper>
                <Paper withBorder p="md" radius="md" style={{ background: '#fff', height: '100%', display: 'flex', alignItems: 'center' }}>
                  <Group align="flex-start" gap="sm" style={{ width: '100%' }}>
                    <ThemeIcon size="lg" variant="light" color="orange" radius="md">
                      <IconBriefcase size={24} />
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Text fw={700} style={{ fontSize: 'clamp(14px, 1.8vw, 16px)' }}>Knowledge Gap Identifier</Text>
                      <Text size="sm" c="dimmed" style={{ fontSize: 'clamp(12px, 1.5vw, 14px)' }}>What Others Miss</Text>
                    </Box>
                  </Group>
                </Paper>
              </SimpleGrid>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}
