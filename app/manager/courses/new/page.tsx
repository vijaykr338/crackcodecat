"use client";

import { useState } from "react";
import {
  Container,
  TextInput,
  Textarea,
  NumberInput,
  Button,
  Paper,
  Title,
  Group,
  LoadingOverlay,
  Notification,
  SimpleGrid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCheck, IconX } from "@tabler/icons-react";
import axios from "axios";

export default function AddCoursePage() {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const form = useForm({
    initialValues: {
      courseName: "",
      courseDescription: "",
      price: 0,
      cgst: 0,
      sgst: 0,
    },
    validate: {
      courseName: (value) =>
        value.trim().length < 3 ? "Course name must have at least 3 characters" : null,
      price: (value) => (value <= 0 ? "Price must be greater than 0" : null),
      cgst: (value) => (value < 0 ? "CGST cannot be negative" : null),
      sgst: (value) => (value < 0 ? "SGST cannot be negative" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setNotification(null);

    try {
      const { data } = await axios.post("/api/manager/courses", values);
      if (!data.success) throw new Error(data.message || "Failed to add course");

      setNotification({ type: "success", message: "Course added successfully!" });
      form.reset();
    } catch (error: any) {
      setNotification({ type: "error", message: error?.response?.data?.message || error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py="xl">
      <Title order={2} mb="md" ta="center">
        Add New Course
      </Title>

      {notification && (
        <Notification
          icon={notification.type === "success" ? <IconCheck size={18} /> : <IconX size={18} /> }
          color={notification.type === "success" ? "green" : "red"}
          mb="md"
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Notification>
      )}

      <Paper withBorder shadow="sm" p="lg" radius="md" pos="relative">
        <LoadingOverlay visible={loading} />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Course Name"
            placeholder="Enter course name"
            {...form.getInputProps("courseName")}
            required
            mb="md"
          />

          <Textarea
            label="Description"
            placeholder="Enter course description"
            minRows={3}
            autosize
            {...form.getInputProps("courseDescription")}
            mb="md"
          />

          <NumberInput
            label="Price"
            placeholder="Enter course price"
            {...form.getInputProps("price")}
            min={0}
            mb="lg"
            hideControls
          />

          {/* Responsive: 1 column on small screens, 2 on sm and up */}
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mb="lg">
            <NumberInput
              label="CGST (%)"
              placeholder="e.g., 9"
              {...form.getInputProps("cgst")}
              min={0}
              max={100}
              hideControls
            />
            <NumberInput
              label="SGST (%)"
              placeholder="e.g., 9"
              {...form.getInputProps("sgst")}
              min={0}
              max={100}
              hideControls
            />
          </SimpleGrid>

          <Group justify="flex-end">
            <Button type="submit" color="blue" size="md">
              Add Course
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
