"use client";

import {
  Paper,
  Text,
  Title,
  Button,
  Group,
  Container,
  Grid,
  Avatar,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const testimonials = [
  {
    name: "Pooja",
    score: "CAT(VARC) 99.12",
    quote:
      "The reading strategies were a revelation. My RC accuracy jumped from 50% to over 90%—it felt easy after the masterclass.",
  },
  {
    name: "Harsh",
    score: "CAT(VARC) 98.3",
    quote:
      "Speed reading and option elimination changed my approach completely. VARC moved from my weakest to my strongest section.",
  },
  {
    name: "Nikhil",
    score: "CAT(VARC) 97.7",
    quote:
      "RC doubt clearing sessions helped me get unstuck and stay confident. I finally enjoyed tackling passages!",
  },
  
];

const studentAchievers = [
  {
    name: "Ishita Mehra",
    score: "CAT(VARC) 99.45%ile",
    avatar: "/1.webp",
  },
  {
    name: "Rohan Gupta",
    score: "CAT(VARC) 99.11%ile",
    avatar: "/2.webp",
  },
  {
    name: "Uday Verma",
    score: "CAT(VARC) 98.76%ile",
    avatar: "/3.webp",
  },
  {
    name: "Kunal Singh",
    score: "CAT(VARC) 98.25%ile",
    avatar: "/4.webp",
  },
];

export function SuccessStoriesCarousel() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  return (
    <Container size="lg" py={isMobile ? 10 : 16}>
      <Grid gutter={isMobile ? 16 : 32} align="center">
        {/* Left Section */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap={22}>
            <div>
              <Title
                order={1}
                size="h1"
                style={{
                  fontSize: isMobile
                    ? "clamp(1.6rem, 5.2vw, 2.6rem)"
                    : "clamp(2rem, 5vw, 4rem)",
                  lineHeight: 1.1,
                  fontWeight: 800,
                }}
              >
                <Text component="span" c="blue.6" inherit>
                  555+
                </Text>{" "}
                Of Our Students Scored{" "}
                <Text component="span" c="blue.6" inherit>
                  95+%ile
                </Text>{" "}
                in CAT VARC
              </Title>
              <Text
                size={isMobile ? "sm" : "md"}
                c="dimmed"
                mt={isMobile ? 8 : 12}
              >
                You can be the next....
              </Text>
            </div>

            <Button
              component="a"
              href="/payment"
              size={isMobile ? "sm" : "lg"}
              radius="md"
              style={{
                width: "fit-content",
                fontSize: isMobile ? 13 : undefined,
              }}
            >
              Enroll Now →
            </Button>

            {/* Student Achievers */}
            <Paper p={isMobile ? 10 : 14} radius="md" shadow="sm" bg="white">
              <Grid gutter={isMobile ? 8 : 12}>
                {studentAchievers.map((student, index) => (
                  <Grid.Col span={{ base: 6, sm: 3 }} key={index}>
                    <Group gap={10} align="center" wrap="nowrap">
                      <Avatar src={student.avatar} size={36} radius="xl" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Text size="sm" fw={600} truncate>
                          {student.name}
                        </Text>
                        <Text size="xs" c="blue.6" fw={500}>
                          {student.score}
                        </Text>
                      </div>
                    </Group>
                  </Grid.Col>
                ))}
              </Grid>
            </Paper>
          </Stack>
        </Grid.Col>

        {/* Right Section - Steady Testimonials */}
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack
            gap="md"
            style={{
              height: "100%",
              justifyContent: "center",
              padding: isMobile ? "28px 12px" : "36px 16px",
            }}
          >
            {testimonials.map((testimonial, index) => (
              <Paper
                key={index}
                p={16}
                radius="md"
                shadow="sm"
                bg="white"
                style={{
                  border: "1px solid #e9ecef",
                }}
              >
                <Title order={4} size="h5" mb={6}>
                  {testimonial.name}
                </Title>
                <Text size="sm" c="dimmed" mb={8}>
                  {testimonial.score}
                </Text>
                <Text size="sm" lh={1.4}>
                  {testimonial.quote}
                </Text>
              </Paper>
            ))}
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
