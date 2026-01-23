"use client";
import {
  Box,
  Paper,
  Title,
  Text,
  Group,
  Stack,
  ThemeIcon,
  Grid,
  List,
  Divider,
  Badge,
  rem,
  Button
} from "@mantine/core";
import { IconBolt, IconCheck, IconX, IconBook2, IconTargetArrow } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";
export default function CrackCodeVARC() {
   const theme = useMantineTheme();
  // This will be 'true' on screens smaller than the 'sm' breakpoint, and 'false' otherwise
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <Box
      py={56}
      px="md"
      style={{
        background: "linear-gradient(120deg, #f5f7fa 0%, #c3cfe2 100%)",
        borderRadius: rem(24),
        maxWidth: 900,
        margin: "3rem auto",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.12)",
        id: "features"
      }}
    >
      {/* Hero Section */}
      <Paper
        radius="lg"
        p="xl"
        withBorder
        shadow="md"
        style={{
          background: "linear-gradient(90deg, #e0e7ff 0%, #f0f4ff 100%)",
          marginBottom: rem(36),
        }}
      >
        <Group gap="md" align="center">
          <ThemeIcon size={48} radius="xl" variant="gradient" gradient={{ from: "#6366f1", to: "#818cf8" }}>
            <IconBolt size={32} />
          </ThemeIcon>
          <Stack gap={2}>
            <Text size="lg" fw={700} c="indigo.9">
              🚀 STOP PREPARING, START CRACKING!
            </Text>
            <Text size="md" c="gray.7">
              Tired of endless prep cycles without results? It’s not your dedication—it’s the strategy.
              At <Text span fw={700} c="indigo.8">CRACK CODE</Text>, we teach you to master VARC with precision, speed, and logic.
            </Text>
          </Stack>
        </Group>
      </Paper>

      {/* Why VARC */}
      <Grid gutter={36} align="center" mb={48}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p="lg" radius="md" withBorder shadow="xs" style={{ background: "#f5faff" }}>
            <Title order={3} size={22} c="indigo.8" mb={8}>
              Why is VARC the Game Changer?
            </Title>
            <List spacing="xs" size="md" icon={<ThemeIcon color="indigo" size={20} radius="xl"><IconBook2 size={14} /></ThemeIcon>}>
              <List.Item>24 questions in 40 minutes</List.Item>
              <List.Item>Highest weightage section</List.Item>
              <List.Item>Most unpredictable & strategy-dependent</List.Item>
              <List.Item>The make-or-break factor for 95+ percentile</List.Item>
            </List>
            <Text mt="md" c="indigo.6" fw={600}>
              The difference between 70 and 95 percentile? Reading smarter, not longer.
            </Text>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper
            p="lg"
            radius="md"
            withBorder
            shadow="xs"
            style={{
              background: "linear-gradient(120deg, #e0e7ff 0%, #f0f4ff 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: 180,
              justifyContent: "center",
            }}
          >
            <Badge
              size="lg"
              color="indigo"
              variant="gradient"
              gradient={{ from: "#6366f1", to: "#818cf8" }}
              mb={8}
              style={{ fontSize: rem(18), fontWeight: 700 }}
            >
              ⚡ 95+ percentile in just 45 days!
            </Badge>
            <Text size="md" c="indigo.7" ta="center">
              Forget 6–12 month cycles. Our methods are <Text span fw={700}>8–10x faster</Text> than traditional coaching.
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>

      <Divider my="xl" label={<Text c="blue.9" fw={700}>Who is this for?</Text>} labelPosition="center" />

      {/* Who is this for */}
      <Grid gutter={36}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p="lg" radius="md" withBorder shadow="xs" style={{ background: "#f5faff" }}>
            <Title order={4} size={18} c="green.7" mb={8}>
              Perfect for you if:
            </Title>
            <List
              spacing="xs"
              size="md"
              icon={
                <ThemeIcon color="green" size={20} radius="xl">
                  <IconCheck size={14} />
                </ThemeIcon>
              }
            >
              <List.Item>You're stuck below 90 percentile despite efforts</List.Item>
              <List.Item>You're a working professional with limited time</List.Item>
              <List.Item>You want proven strategies over generic coaching</List.Item>
              <List.Item>You're ready to think differently about VARC</List.Item>
            </List>
          </Paper>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper p="lg" radius="md" withBorder shadow="xs" style={{ background: "#fff5f5" }}>
            <Title order={4} size={18} c="red.7" mb={8}>
              Not for you if:
            </Title>
            <List
              spacing="xs"
              size="md"
              icon={
                <ThemeIcon color="red" size={20} radius="xl">
                  <IconX size={14} />
                </ThemeIcon>
              }
            >
              <List.Item>You prefer slow 12-month prep cycles</List.Item>
              <List.Item>You expect spoon-feeding</List.Item>
              <List.Item>You're not serious about 95+ percentile</List.Item>
              <List.Item>You reject strategy-based learning</List.Item>
            </List>
          </Paper>
        </Grid.Col>
      </Grid>

     <Stack
      align="center"
      mt={{ base: 32, sm: 48 }}
      w="100%"
    >
      <Button
        component="a"
        href="/payment"
        size={isMobile ? 'md' : 'xl'} // Increased size to better match the screenshot
        w={{ base: '100%', sm: 'auto' }}
        variant="gradient"
        gradient={{ from: '#4f46e5', to: '#818cf8' }} // Your existing gradient
        style={{
          boxShadow: "0 4px 14px 0 rgba(79, 70, 229, 0.3)", // Your existing box shadow
          paddingLeft: "2.5rem", // Adjust padding for a wider, more substantial look
          paddingRight: "2.5rem",
        }}
        fz={{ base: 'md', sm: 'xl' }} // Set font size responsively
      >
        Enroll Now !
      </Button>
    </Stack>

    </Box>
  );
}
