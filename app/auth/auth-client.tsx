"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Group,
  Anchor,
  Divider,
  Stack,
  Badge,
  Checkbox,
  Alert,
} from "@mantine/core";
import {
  IconMail,
  IconLock,
  IconUser,
  IconBolt,
  IconShieldCheck,
  IconCheck,
} from "@tabler/icons-react";

// Very lightweight mock submit
function mockDelay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function AuthPageClient() {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get("mode") === "signup"
    ? "signup"
    : "signin") as "signin" | "signup";

  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const isSignup = mode === "signup";
  const canRequestOtp =
    email.trim().length > 5 && (!isSignup || (name.trim().length > 1 && agree));
  const canSubmitOtp = otpRequested && otp.trim().length >= 4;

  async function handleRequestOtp() {
    if (!canRequestOtp) return;
    setSubmitting(true);
    setMessage(null);
    await mockDelay(800);
    setOtpRequested(true);
    setSubmitting(false);
    setMessage("OTP sent to your email. (Demo)");
  }

  async function handleVerify() {
    if (!canSubmitOtp) return;
    setSubmitting(true);
    await mockDelay(900);
    setSubmitting(false);
    setMessage(
      isSignup
        ? "Account created & signed in. (Demo)"
        : "Signed in successfully. (Demo)"
    );
  }

  return (
    <Box
      component="section"
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(140deg,#061537 0%,#0B2C64 55%,#114CA8 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative gradients / orbs */}
      <Box
        style={{
          position: "absolute",
          top: -120,
          left: -120,
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle at 30% 30%, rgba(0,102,255,0.55), rgba(0,102,255,0))",
          filter: "blur(60px)",
          opacity: 0.7,
        }}
      />
      <Box
        style={{
          position: "absolute",
          bottom: -140,
          right: -100,
          width: 360,
          height: 360,
          background:
            "radial-gradient(circle at 40% 40%, rgba(255,199,0,0.55), rgba(255,199,0,0))",
          filter: "blur(70px)",
          opacity: 0.5,
        }}
      />

      <Container size="sm" style={{ position: "relative", zIndex: 1 }}>
        <Stack gap="xl">
          {/* Badge + Title */}
          <div style={{ textAlign: "center" }}>
            <Badge
              size="lg"
              color="yellow"
              variant="light"
              leftSection={<IconBolt size={16} />}
              style={{
                background: "linear-gradient(90deg,#FFC700,#FFDE55)",
                color: "#0B2C64",
                fontWeight: 700,
              }}
            >
              {isSignup ? "Create your seat" : "Welcome back"}
            </Badge>
            <Title
              order={1}
              mt="md"
              size={42}
              fw={900}
              style={{ color: "#fff", letterSpacing: -1 }}
            >
              {isSignup ? "Start Cracking CAT" : "Sign in & Continue"}
            </Title>
            <Text c="var(--mantine-color-gray-3)" mt={4}>
              {isSignup
                ? "Join the sprint - class links emailed within 24h after payment."
                : "Enter your email to get a secure OTP."}
            </Text>
          </div>

          {/* Rest of your form (unchanged)... */}
          {/* keep your existing inputs, OTP flow, buttons, etc. */}
        </Stack>
      </Container>
    </Box>
  );
}
