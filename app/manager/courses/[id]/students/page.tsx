"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Box,
  Container,
  Paper,
  Title,
  Text,
  Group,
  Stack,
  TextInput,
  ScrollArea,
  Avatar,
  Badge,
  Loader,
  Tabs,
} from "@mantine/core";

type StudentDoc = {
  _id?: string;
  name: string;
  email: string;
  phone?: number;
};

export default function CourseStudentsPage() {
  const params = useParams<{ id: string }>();
  const courseId = useMemo(
    () => (Array.isArray(params?.id) ? params.id[0] : params?.id),
    [params]
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [students, setStudents] = useState<StudentDoc[]>([]);
  const [demoStudents, setDemoStudents] = useState<StudentDoc[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!courseId) return;
      try {
        setLoading(true);
        setError(null);

        const [courseRes, demoRes] = await Promise.all([
          axios.get(`/api/manager/users/by-course/${courseId}`),
          axios.get(`/api/manager/users/demo`),
        ]);

        if (!isMounted) return;

        if (courseRes.data.success) {
          setStudents(courseRes.data.users || []);
        } else {
          setError("Failed to load course students");
        }

        if (demoRes.data.success) {
          setDemoStudents(demoRes.data.students || []);
        } else {
          setError("Failed to load demo students");
        }
      } catch (e: any) {
        if (isMounted) setError(e?.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [courseId]);

  const filterData = (data: StudentDoc[]) =>
    data.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    );

  // 🔹 Reusable Student List
  const StudentList = ({ data }: { data: StudentDoc[] }) => (
    <Paper
      withBorder
      radius="lg"
      p="xl"
      style={{
        background:
          "linear-gradient(150deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015))",
        backdropFilter: "blur(10px)",
      }}
    >
      {loading ? (
        <Group justify="center" py="xl">
          <Loader color="blue" />
        </Group>
      ) : error ? (
        <Text size="sm" c="var(--mantine-color-red-4)">
          {error}
        </Text>
      ) : (
        <Stack gap="md">
          {/* Search Box */}
          <TextInput
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            radius="md"
            style={{ color: "white" }}
          />

          {/* Scrollable List */}
          <ScrollArea h={350} scrollbarSize={6}>
            <Stack gap="sm">
              {data.length > 0 ? (
                data.map((student, idx) => (
                  <Group
                    key={student._id || idx}
                    p="sm"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <Avatar color="blue" radius="xl">
                      {student.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Stack gap={2} style={{ flex: 1 }}>
                      <Text size="sm" fw={500} c="white">
                        {student.name}
                      </Text>
                      <Text size="xs" c="var(--mantine-color-gray-3)">
                        {student.email}
                      </Text>
                      {student.phone && (
                        <Text size="xs" c="var(--mantine-color-gray-4)">
                          📞 {student.phone}
                        </Text>
                      )}
                    </Stack>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                        student.email
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Badge
                        color="red"
                        variant="filled"
                        style={{ cursor: "pointer" }}
                      >
                        Send Mail
                      </Badge>
                    </a>
                  </Group>
                ))
              ) : (
                <Text size="sm" c="var(--mantine-color-gray-3)">
                  No students found.
                </Text>
              )}
            </Stack>
          </ScrollArea>
        </Stack>
      )}
    </Paper>
  );

  return (
    <Box
      component="section"
      style={{
        minHeight: "100dvh",
        background:
          "linear-gradient(180deg,#05142E 0%,#0B2C64 60%,#114CA8 100%)",
        paddingTop: "clamp(2rem,5vh,3.5rem)",
        paddingBottom: "4rem",
      }}
    >
      <Container size="sm">
        <Stack gap={24}>
          <Group justify="space-between" align="center">
            <Title order={1} size={32} fw={900} style={{ color: "#fff" }}>
              Students
            </Title>
            <Badge color="blue" variant="light">
              {students.length + demoStudents.length}
            </Badge>
          </Group>

          {/* 🔹 Tabs for Enrolled vs Demo */}
          <Tabs defaultValue="enrolled">
            <Tabs.List grow>
              <Tabs.Tab value="enrolled" style={{color:"white",background:"transparent"}}>
                Enrolled ({students.length})
              </Tabs.Tab>
              <Tabs.Tab value="demo" color="white" style={{color:"white",background:"transparent"}}>
                Demo ({demoStudents.length})
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="enrolled" pt="md">
              <StudentList data={filterData(students)} />
            </Tabs.Panel>

            <Tabs.Panel value="demo" pt="md">
              <StudentList data={filterData(demoStudents)} />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Container>
    </Box>
  );
}
