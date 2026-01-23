"use client";
import { useState, useEffect } from 'react'; // Import useEffect
import {
  Box, Container, Paper, Title, Text, TextInput, Button, Group, Anchor, Divider, Stack, Badge, Checkbox, Alert, PasswordInput
} from '@mantine/core';
// Import IconAlertCircle for the error message
import { IconMail, IconUser, IconBolt, IconShieldCheck, IconCheck, IconLock, IconAlertCircle } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Helper function to format seconds into MM:SS
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(300); // 5 minutes in seconds

  // Countdown timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setOtpSent(false); // Reset the OTP state
      setError("OTP has expired. Please request a new one.");
      setMessage(null);
    }
    // Cleanup interval on component unmount or when dependencies change
    return () => clearInterval(interval);
  }, [otpSent, timer]);


  const canRequestOtp =
    name.trim().length > 1 &&
    email.trim().length > 4 &&
    password.trim().length >= 6 &&
    agree;

  const canVerifyOtp = otp.trim().length === 6;

  async function handleSendOtp() {
    if (!canRequestOtp) return;
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to send OTP");
        setSubmitting(false);
        return;
      }
      setOtpSent(true);
      setTimer(300); // Reset timer to 5 minutes on new OTP request
      setMessage("OTP sent to your email.");
    } catch (err) {
      setError("Server error");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerifyOtp() {
    if (!canVerifyOtp) return;
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          password,
          otp
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "OTP verification failed");
        setSubmitting(false);
        return;
      }
      setMessage("Signup successful! You can now log in.");
      router.push("/auth/signin");
    } catch (err) {
      setError("Server error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box
      component="section"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(140deg,#061537 0%,#0B2C64 55%,#114CA8 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box style={{ position: 'absolute', top: -120, left: -120, width: 300, height: 300, background: 'radial-gradient(circle at 30% 30%, rgba(0,102,255,0.55), rgba(0,102,255,0))', filter: 'blur(60px)', opacity: 0.7 }} />
      <Box style={{ position: 'absolute', bottom: -140, right: -100, width: 360, height: 360, background: 'radial-gradient(circle at 40% 40%, rgba(255,199,0,0.55), rgba(255,199,0,0))', filter: 'blur(70px)', opacity: 0.5 }} />
      <Container size="sm" style={{ position: 'relative', zIndex: 1 }}>
        <Stack gap="xl">
          <div style={{ textAlign: 'center' }}>
            <Badge
              size="lg"
              color="yellow"
              variant="light"
              leftSection={<IconBolt size={16} />}
              style={{ background: 'linear-gradient(90deg,#FFC700,#FFDE55)', color: '#0B2C64', fontWeight: 700 }}
            >
              Create your seat
            </Badge>
            <Title order={1} mt="md" size={42} fw={900} style={{ color: '#fff', letterSpacing: -1 }}>
              Start Cracking CAT
            </Title>
            <Text c="var(--mantine-color-gray-3)" mt={4}>
              Fill in your details to sign up.
            </Text>
          </div>

          <Paper
            radius="lg"
            p="xl"
            withBorder
            shadow="md"
            style={{
              background: 'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            <Stack>
              {message && (
                <Alert color="green" variant="light" title="Status" icon={<IconCheck size={18} />}>
                  {message}
                </Alert>
              )}
              {error && (
                <Alert color="red" variant="light" title="Error" icon={<IconAlertCircle size={18} />}>
                  {error}
                </Alert>
              )}

              <TextInput
                label="Full Name"
                placeholder="Your name"
                value={name}
                onChange={e => setName(e.currentTarget.value)}
                leftSection={<IconUser size={18} />}
                radius="md"
                required
                disabled={otpSent}
                styles={{
                  input: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.08)' },
                  label: { color: '#fff' }
                }}
              />

              <TextInput
                label="Email"
                placeholder="e.g. johndoe@email.com"
                value={email}
                onChange={e => setEmail(e.currentTarget.value)}
                leftSection={<IconMail size={18} />}
                radius="md"
                required
                disabled={otpSent}
                styles={{
                  input: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.08)' },
                  label: { color: '#fff' }
                }}
                type="email"
                autoComplete="email"
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                value={password}
                onChange={e => setPassword(e.currentTarget.value)}
                leftSection={<IconLock size={18} />}
                radius="md"
                required
                disabled={otpSent}
                styles={{
                  input: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.08)' },
                  label: { color: '#fff' }
                }}
                autoComplete="new-password"
              />

              {!otpSent && (
                <>
                  <Button
                    size="md"
                    radius="md"
                    disabled={!canRequestOtp || submitting}
                    onClick={handleSendOtp}
                    variant="gradient"
                    gradient={{ from: '#0066FF', to: '#003366' }}
                    leftSection={<IconShieldCheck size={18} />}
                    styles={{ root: { fontWeight: 700, letterSpacing: 0.5 } }}
                  >
                    {submitting ? "Sending OTP..." : "Send OTP"}
                  </Button>
                  <Checkbox
                    label={<Text size="xs" c="var(--mantine-color-gray-4)">I agree to <Link href={"/terms"} style={{ color: 'white' }}>Terms & Conditions</Link></Text>}
                    checked={agree}
                    onChange={e => setAgree(e.currentTarget.checked)}
                    styles={{ label: { cursor: 'pointer' } }}
                  />
                </>
              )}

              {otpSent && (
                <>
                  <TextInput
                    label="OTP"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={e => setOtp(e.currentTarget.value)}
                    leftSection={<IconLock size={18} />}
                    radius="md"
                    required
                  />
                  {/* Timer Display */}
                  <Text size="xs" c="dimmed" ta="right" mt={-10}>
                    OTP expires in: <strong>{formatTime(timer)}</strong>
                  </Text>
                  <Group grow>
                    <Button
                      variant="subtle"
                      color="gray"
                      disabled={submitting}
                      onClick={() => { setOtp(''); setOtpSent(false); setMessage(null); setError(null); }}
                    >
                      Change Email
                    </Button>
                    <Button
                      size="md"
                      radius="md"
                      disabled={!canVerifyOtp || submitting}
                      onClick={handleVerifyOtp}
                      variant="gradient"
                      gradient={{ from: '#FFC700', to: '#FFDE55' }}
                      styles={{ root: { fontWeight: 700, color: '#0B2C64' } }}
                    >
                      {submitting ? "Verifying..." : "Verify & Sign Up"}
                    </Button>
                  </Group>
                </>
              )}

              <Divider my="sm" labelPosition="center" label={<Text size="xs" c="dimmed">Have an account?</Text>} />
              <Group justify="center">
                <Anchor
                  href="/auth/signin"
                  c="#FFC700"
                  fz="sm"
                  style={{ fontWeight: 600 }}
                >
                  Sign in instead
                </Anchor>
              </Group>
            </Stack>
          </Paper>

          <Text size="xs" c="var(--mantine-color-gray-4)" ta="center">
            Secure signup - email OTP required.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}