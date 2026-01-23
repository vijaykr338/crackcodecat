"use client";
import { Stack, Text } from "@mantine/core";

interface VideoCaptionProps {
  title?: string;
  subtitle?: string;
}

export default function VideoCaption({
  title = "Your Last Minute Help. Come Learn To Score!",
  subtitle = "Come Get The Thought Process Of VARC Topper",
}: VideoCaptionProps) {
  return (
    <Stack gap={4} align="center" mt="md" px="md">
      <Text fw={700} fz={{ base: "lg", sm: "xl" }} ta="center">
        {title}
      </Text>
      <Text c="dimmed" fz={{ base: "sm", sm: "md" }} ta="center">
        {subtitle}
      </Text>
    </Stack>
  );
}
