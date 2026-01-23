"use client";
import axios from "axios";
import Script from "next/script";
import { useState, useMemo, useEffect } from "react";
import {
  Card,
  Stack,
  Text,
  Group,
  Button,
  Divider,
  LoadingOverlay,
  ThemeIcon,
  TextInput,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconShieldCheck, IconLock, IconArrowRight, IconTicket, IconX, IconCheck } from "@tabler/icons-react";
import { Document } from "mongoose";
import { useUser } from "@/hooks/getuser";
import { useRouter } from "next/navigation";

interface Course extends Document {
  courseName: string;
  courseDescription: string;
  price: number;
  cgst: number;
  sgst: number;
}

declare global {
  interface Window {
    Instamojo: any;
  }
}

export default function Payment() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [course, setCourse] = useState<Course>();
  const { user, loading: userLoading } = useUser();

  // --- State to manage loading of course data ---
  const [courseLoading, setCourseLoading] = useState(true);
  // ---------------------------------------------

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isVerifyingCoupon, setIsVerifyingCoupon] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/auth/signin");
    }
  }, [user, userLoading, router]);

  // --- Updated useEffect to manage loading state ---
  useEffect(() => {
    const fetchCourse = async () => {
      setCourseLoading(true); // Ensure loading is true when fetching
      try {
        const res = await axios.get("/api/courses/");
        setCourse(res.data.courses[0]);
      } catch (err) {
        console.error("Failed to fetch course", err);
        setError("Could not load course details. Please try again later.");
      } finally {
        setCourseLoading(false); // Set loading to false after fetch completes
      }
    };
    fetchCourse();
  }, []);
  // -----------------------------------------------

  useEffect(() => {
    if (typeof window !== "undefined" && window.Instamojo) {
      window.Instamojo.configure({
        onOpen: () => {
          console.log("Checkout opened");
          setPaymentProcessing(true);
        },
        onClose: () => {
          console.log("Checkout closed");
        },
        onSuccess: async (data: any) => {
          console.log("Payment successful", data);
          setPaymentProcessing(true);
          const { payment_id, payment_request_id } = data;
          const intervalId = setInterval(async () => {
            try {
              const res = await axios.post("/api/purchase/verify", {
                payment_id,
                payment_request_id,
              });
              if (res.status === 200 && res.data.status === "success") {
                clearInterval(intervalId);
                setPaymentProcessing(false);
                router.push("/success");
              }
            } catch (error) {
              console.error("Error verifying payment:", error);
            }
          }, 3000);
          setTimeout(() => {
            clearInterval(intervalId);
            setPaymentProcessing(false);
            setError(
              `Confirmation not received, check your profile after sometime\n
               Your payment id is ${payment_id}`
            );
          }, 2 * 60 * 1000);
        },
        onFailure: (data: any) => {
          console.error("Payment failed", data);
          setError("Payment failed, please try again");
        },
      });
    }
  }, []);

  const breakdown = useMemo(() => {
    if (!course) return { original: 0, discount: 0, total: 0 };
    const originalPrice = course.price;
    const discountAmount = appliedCoupon ? appliedCoupon.discount : 0;
    const total = originalPrice - discountAmount;

    return {
      original: originalPrice,
      discount: discountAmount,
      total: total > 0 ? total : 0,
    };
  }, [course, appliedCoupon]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setIsVerifyingCoupon(true);
    setCouponError(null);
    setAppliedCoupon(null);
    setError(null);

    try {
      const res = await axios.post("/api/coupons/verify", {
        code: couponCode,
        courseId: course?._id,
      });

      if (res.data.valid) {
        setAppliedCoupon({ code: couponCode, discount: res.data.discount });
      } else {
        setCouponError(res.data.message || "Invalid coupon code.");
      }
    } catch (err: any) {
      setCouponError(
        err?.response?.data?.message || "Could not verify coupon."
      );
    } finally {
      setIsVerifyingCoupon(false);
    }
  };

  const handlePay = async () => {
    setError(null);
    setPaymentProcessing(true);

    try {
      const orderRes = await axios.post("/api/purchase/initiate", {
        courseId: course?._id,
        userId: user?.userId,
        couponCode: appliedCoupon ? appliedCoupon.code : null,
      });

      const paymentUrl = orderRes.data.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        throw new Error("Could not create payment link.");
      }
    } catch (e: any) {
      console.error(e);
      setError(e?.response?.data?.message || "Could not initiate payment.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  const summaryCard = (
    <Card
      withBorder
      radius="md"
      p="xl"
      style={{
        flex: 1,
        minWidth: 300,
        background: "linear-gradient(45deg, #e3f2fd, #f1f6fc)",
      }}
    >
      <Stack gap={isMobile ? 18 : 24}>
        <Text fw={700} fz={20}>Order Summary</Text>
        <Stack gap={10}>
          <Text fw={700} fz="md" c="dimmed">
            {course?.courseName || "Course Name"}
          </Text>
          <Group justify="space-between">
            <Text>Original Price</Text>
            <Text>₹{breakdown.original.toLocaleString("en-IN")}</Text>
          </Group>
          {appliedCoupon && (
            <Group justify="space-between">
              <Text c="green">Coupon Discount</Text>
              <Text c="green">
                - ₹{breakdown.discount.toLocaleString("en-IN")}
              </Text>
            </Group>
          )}
          <Divider />
          <Group justify="space-between" mt="md">
            <Text fw={700} fz="xl" c="blue.6">Total Payable</Text>
            <Text
              fw={800}
              fz={32}
              style={{ letterSpacing: -0.5, color: "#0b66ff" }}
            >
              ₹{breakdown.total.toLocaleString("en-IN")}
            </Text>
          </Group>
        </Stack>
        <Stack gap={10} mt="xl">
          <Group gap={8} align="flex-start">
            <ThemeIcon size={34} radius="md" variant="light" color="blue">
              <IconShieldCheck size={18} />
            </ThemeIcon>
            <Text fz="sm" c="dimmed" style={{ flex: 1 }}>
              100% secure encrypted payment • Instant activation
            </Text>
          </Group>
          <Group gap={8} align="flex-start">
            <ThemeIcon size={34} radius="md" variant="light" color="blue">
              <IconLock size={18} />
            </ThemeIcon>
            <Text fz="sm" c="dimmed" style={{ flex: 1 }}>
              We do not store your card data on our servers
            </Text>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );

  // This handles the initial loading screen while user data is being fetched
  if (userLoading) {
    return (
      <LoadingOverlay
        visible={true}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
    );
  }

  const userInfoAndActionCard = (
    <Card
      withBorder
      radius="md"
      p="xl"
      style={{ flex: 1, minWidth: 300, position: "relative" }}
    >
      <Stack gap="xl">
        <Stack gap="md">
          <Text fw={700} fz={20}>Your Details</Text>
          <Stack gap={4}>
            <Text fz="xs" tt="uppercase" c="dimmed" fw={600}>Full Name</Text>
            <Text fw={500}>{user?.name}</Text>
          </Stack>
          <Stack gap={4}>
            <Text fz="xs" tt="uppercase" c="dimmed" fw={600}>Email</Text>
            <Text fw={500}>{user?.email}</Text>
          </Stack>
        </Stack>
        <Divider />
        <Stack gap="xs">
          <Text fw={600}>Have a coupon code?</Text>
          <Group>
            <TextInput
              style={{ flex: 1 }}
              placeholder="Enter coupon code"
              leftSection={<IconTicket size={16} />}
              value={couponCode}
              onChange={(event) => setCouponCode(event.currentTarget.value)}
              disabled={!!appliedCoupon}
            />
            {!appliedCoupon ? (
              <Button
                onClick={handleApplyCoupon}
                loading={isVerifyingCoupon}
                variant="light"
              >
                Apply
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setAppliedCoupon(null);
                  setCouponCode("");
                  setCouponError(null);
                }}
                variant="light"
                color="red"
              >
                Remove
              </Button>
            )}
          </Group>
          {couponError && <Text c="red" size="sm">{couponError}</Text>}
          {appliedCoupon && (
            <Text c="green" size="sm" mt={4}>
              <IconCheck size={16} style={{ verticalAlign: "middle" }} /> Coupon '
              {appliedCoupon.code}' applied successfully!
            </Text>
          )}
        </Stack>
        {error && <Text fz="sm" c="red">{error}</Text>}
        <Button
          size="lg"
          radius="md"
          fullWidth
          loading={paymentProcessing}
          rightSection={<IconArrowRight size={20} />}
          styles={{
            root: {
              background: "linear-gradient(90deg,#1f7cff 0%,#0066ff 100%)",
              fontWeight: 600,
            },
          }}
          onClick={handlePay}
        >
          Pay ₹{breakdown.total.toLocaleString("en-IN")} Now
        </Button>
        <Text fz={11} c="dimmed" ta="center">
          By proceeding you agree to our Terms & Refund Policy.
        </Text>
      </Stack>
    </Card>
  );

  return (
    <>
      <Script
        id="instamojo-checkout-js"
        src="https://js.instamojo.com/v1/checkout.js"
      />
      <Card
        withBorder
        radius="lg"
        shadow="sm"
        p="xl"
        style={{
          maxWidth: 860,
          margin: "40px auto 80px",
          background: "linear-gradient(135deg,#ffffff 0%,#f5f8ff 100%)",
          position: "relative",
        }}
      >
        {/* --- Updated LoadingOverlay to handle both payment and course loading --- */}
        <LoadingOverlay
          visible={paymentProcessing || courseLoading}
          zIndex={40}
          overlayProps={{ bg: "#ffffffaa", blur: 2 }}
        />
        {/* ------------------------------------------------------------------------- */}
        <Stack gap={32}>
          <Stack gap={4}>
            <Text fw={800} fz={30} style={{ letterSpacing: -0.8 }}>Secure Checkout</Text>
            <Text fz="sm" c="dimmed">
              Enroll now to unlock live mentorship, adaptive practice, and the
              full mock stack instantly.
            </Text>
          </Stack>
          {isMobile ? (
            <Stack>
              {summaryCard}
              {userInfoAndActionCard}
            </Stack>
          ) : (
            <Group
              align="flex-start"
              gap={50}
              wrap="nowrap"
              justify="space-between"
            >
              {userInfoAndActionCard}
              {summaryCard}
            </Group>
          )}
        </Stack>
      </Card>
    </>
  );
}