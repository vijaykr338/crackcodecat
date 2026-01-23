// app/auth/verify/[email]/verify-client.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Container, Paper, Title, Text, Button,
  Stack, PinInput, Group, Badge, Alert
} from "@mantine/core";
import { IconBolt, IconCheck } from "@tabler/icons-react";

function mockDelay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function VerifyOtpClient({ email }: { email: string }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleVerify() {
    if (code.trim().length !== 6) return;
    setSubmitting(true);
    setMessage(null);
    await mockDelay(800);
    setSubmitting(false);
    setMessage("Verified! Redirecting...");
    await mockDelay(600);
    router.push("/profile");
  }

  return (
    <Box component="section" style={{ minHeight: "100dvh", display: "flex", alignItems: "center" }}>
      <Container size="sm">
        <Stack gap="xl" align="center">
          <Badge
            size="lg"
            color="yellow"
            variant="light"
            leftSection={<IconBolt size={16} />}
            style={{ fontWeight: 700 }}
          >
            Verify your email
          </Badge>

          <Title order={1} size={36} fw={900} style={{ color: "#fff", textAlign: "center" }}>
            Enter the 6-digit code sent to
          </Title>
          <Text c="var(--mantine-color-gray-2)" ta="center">{email}</Text>

          <Paper radius="lg" p="xl" withBorder shadow="md">
            <Stack align="center" gap="md">
              {message && (
                <Alert color="green" variant="light" icon={<IconCheck size={18} />}>
                  {message}
                </Alert>
              )}
              <PinInput size="lg" length={6} type="number" onChange={setCode} oneTimeCode />
              <Group>
                <Button variant="subtle" color="gray" onClick={() => router.back()}>
                  Change email
                </Button>
                <Button
                  size="md"
                  radius="md"
                  disabled={submitting || code.trim().length !== 6}
                  onClick={handleVerify}
                >
                  Verify & Continue
                </Button>
              </Group>
              <Button
                variant="light"
                color="yellow"
                size="xs"
                onClick={() => setMessage("OTP resent (demo)")}
              >
                Resend OTP
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
