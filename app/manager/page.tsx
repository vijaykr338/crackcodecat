"use client";
import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Title,
  Text,
  Paper,
  Group,
  Stack,
  Badge,
  SimpleGrid,
  Button,
  Center,
  Loader,
  em
} from '@mantine/core';
import {
  IconUsers,
  IconEdit,
  IconPlus,
  IconPlayerPause,
  IconPlayerPlay
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/getuser';

// ------------------ Type Definitions ------------------ //
interface Course {
  _id: string;
  courseName: string;
  courseDescription: string;
  price: number;
  cgst: number;
  sgst: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt?: string;
}

interface User {
  _id: string;
  coursesRegistered: string[];
}

interface AllCoursesSectionProps {
  isMobile: boolean;
  isLoadingCourses: boolean;
  dbCourses: Course[];
  enrollCounts: Record<string, number>;
  onToggleStatus: (courseId: string, toStatus: 'ACTIVE' | 'INACTIVE') => Promise<void>;
}

// ------------------ Helpers ------------------ //
function formatINR(v: number): string {
  return '₹' + v.toLocaleString('en-IN');
}

function formatDate(dateIso?: string): string {
  if (!dateIso) return '—';
  try {
    const d = new Date(dateIso);
    if (isNaN(d.getTime())) return '—';
    return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '—';
  }
}

// ------------------ AllCoursesSection ------------------ //
function AllCoursesSection(props: AllCoursesSectionProps) {
  const { isMobile, isLoadingCourses, dbCourses, enrollCounts, onToggleStatus } = props;
  return (
    <Paper
      withBorder
      radius="lg"
      p="xl"
      style={{
        background: 'linear-gradient(150deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015))',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Group justify="space-between" mb="md">
        <Title order={3} size={24} style={{ color: '#fff' }}>
          All Courses
        </Title>
        <Button
          component={Link as any}
          href="/manager/courses/new"
          leftSection={<IconPlus size={16} />}
          variant="gradient"
          gradient={{ from: '#0066FF', to: '#003366' }}
          radius="md"
        >
          Add Course
        </Button>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={24}>
        {isLoadingCourses &&
          Array.from({ length: 3 }).map((_, i) => (
            <Paper
              key={i}
              withBorder
              radius="md"
              p="lg"
              style={{
                background: 'linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))',
                minHeight: 150
              }}
            >
              <Stack gap="xs">
                <Badge variant="light" color="gray">
                  Loading…
                </Badge>
                <Text size="xs" c="rgba(255,255,255,0.70)">
                  Fetching course
                </Text>
              </Stack>
            </Paper>
          ))}
        {!isLoadingCourses && dbCourses.length === 0 && (
          <Paper
            withBorder
            radius="md"
            p="lg"
            style={{
              background: 'linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))'
            }}
          >
            <Text size="sm" c="rgba(255,255,255,0.78)">
              No courses yet. Click "Add Course" to create one.
            </Text>
          </Paper>
        )}
        {dbCourses.map((c) => {
          const enrolled = enrollCounts[c._id] || 0;
          const isActive = c.status === 'ACTIVE';
          return (
            <Paper
              key={c._id}
              withBorder
              radius="md"
              p="lg"
              style={{
                background: 'linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))'
              }}
            >
              <Stack gap={8}>
                <Group justify="space-between" align="flex-start">
                  <Text fw={600} style={{ color: '#fff' }}>
                    {c.courseName}
                  </Text>
                  {isActive ? (
                    <Badge color="green" variant="light">
                      Active
                    </Badge>
                  ) : (
                    <Badge color="gray" variant="light">
                      Inactive
                    </Badge>
                  )}
                </Group>
                <Text size="xs" c="rgba(255,255,255,0.70)">
                  Price: {formatINR(c.price)}
                </Text>
                <Text size="xs" c="rgba(255,255,255,0.70)">
                  Start: {formatDate(c.createdAt)}
                </Text>
                <Text size="xs" c="rgba(255,255,255,0.70)">
                  Students:{' '}
                  <Link href={`/manager/courses/${c._id}/students`} style={{ color: '#9fd1ff', textDecoration: 'underline' }}>
                    {enrolled}
                  </Link>
                </Text>
                <Group gap="xs" mt="xs">
                  <Button
                    component={Link as any}
                    href={`/manager/courses/${c._id}/edit`}
                    leftSection={<IconEdit size={16} />}
                    variant="gradient"
                    gradient={{ from: '#0066FF', to: '#003366' }}
                    size="xs"
                  >
                    Edit
                  </Button>
                  <Button
                    component={Link as any}
                    href={`/manager/courses/${c._id}/students`}
                    leftSection={<IconUsers size={16} />}
                    variant="light"
                    color="blue"
                    size="xs"
                  >
                    Students Enrolled
                  </Button>
                  {isActive ? (
                    <Button
                      leftSection={<IconPlayerPause size={16} />}
                      variant="light"
                      color="red"
                      size="xs"
                      onClick={() => {
                        const ok = typeof window !== 'undefined' ? window.confirm(`Pause enrollments for "${c.courseName}"?`) : true;
                        if (ok) onToggleStatus(c._id, 'INACTIVE');
                      }}
                    >
                      Stop
                    </Button>
                  ) : (
                    <Button
                      leftSection={<IconPlayerPlay size={16} />}
                      variant="light"
                      color="green"
                      size="xs"
                      onClick={() => onToggleStatus(c._id, 'ACTIVE')}
                    >
                      Resume
                    </Button>
                  )}
                </Group>
              </Stack>
            </Paper>
          );
        })}
      </SimpleGrid>
    </Paper>
  );
}

// ------------------ ManagerDashboard Component ------------------ //
export default function ManagerDashboard() {
  const [isLoadingCourses, setIsLoadingCourses] = useState<boolean>(false);
  const [dbCourses, setDbCourses] = useState<Course[]>([]);
  const [enrollCounts, setEnrollCounts] = useState<Record<string, number>>({});
  const [isToggling, setIsToggling] = useState<Record<string, boolean>>({});
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setIsLoadingCourses(true);
        const [coursesRes, usersRes] = await Promise.all([
          axios.get('/api/manager/courses'),
          axios.get('/api/manager/users/with-courses')
        ]);
        
        // Axios returns the parsed data in the 'data' property
        const courses = coursesRes.data?.courses ?? [];
        const users = usersRes.data?.users ?? [];

        if (!isMounted) return;
        
        setDbCourses(courses);

        const counts: Record<string, number> = {};
        for (const u of users) {
          const regs = u.coursesRegistered || [];
          for (const c of regs) {
            const id = c;
            if (!id) continue;
            counts[id] = (counts[id] || 0) + 1;
          }
        }
        setEnrollCounts(counts);
      } catch (e) {
        console.log("error fetching data with axios:", e);
      } finally {
        if (isMounted) setIsLoadingCourses(false);
      }
    }
    
    if (!loading && user?.role.toUpperCase() === "ADMIN") {
      load();
    }
    
    return () => {
      isMounted = false;
    };
  }, [user, loading]);

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (!user || user.role.toUpperCase() !== "ADMIN") {
    router.push('/auth/signin');
    return (
      <Center style={{ height: '100vh' }}>
        <Text size="lg" color="red">
          You do not have permission to access this page.
        </Text>
      </Center>
    );
  }

  const totalStudents = Object.values(enrollCounts).reduce((sum, count) => sum + count, 0);
  const activeCourses = dbCourses.filter((c) => c.status === 'ACTIVE').length;

  return (
    <Box
      component="section"
      style={{
        minHeight: '100dvh',
        background: 'linear-gradient(180deg,#05142E 0%,#0B2C64 60%,#114CA8 100%)',
        paddingTop: 'clamp(1.25rem,4vh,2.5rem)',
        paddingBottom: '2.5rem'
      }}
    >
      <Container size="lg">
        <Stack style={{ gap: 'clamp(20px,3.2vh,36px)' }}>
          <Group justify="space-between" align="flex-end">
            <div>
              <Title order={1} size={46} fw={900} style={{ color: '#fff', letterSpacing: -1 }}>
                Manager Dashboard
              </Title>
              <Text size="sm" c="rgba(255,255,255,0.78)">
                Operational overview • revenue • cohorts • learner activity
              </Text>
            </div>
            <div />
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 12, md: 24 }}>
            <Paper
              withBorder
              p="lg"
              radius="lg"
              style={{
                background: 'linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Stack gap={6}>
                <Text c="rgba(255,255,255,0.9)" fw={700} fz={14}>
                  Total Students Enrolled
                </Text>
                <Text fw={900} fz={28} style={{ color: '#fff' }}>
                  {totalStudents}
                </Text>
                <Text fz="sm" c="rgba(255,255,255,0.72)">
                  Across all courses
                </Text>
              </Stack>
            </Paper>
            <Paper
              withBorder
              p="lg"
              radius="lg"
              style={{
                background: 'linear-gradient(150deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Stack gap={6}>
                <Text c="rgba(255,255,255,0.9)" fw={700} fz={14}>
                  Active Courses
                </Text>
                <Text fw={900} fz={28} style={{ color: '#fff' }}>
                  {activeCourses}
                </Text>
                <Text fz="sm" c="rgba(255,255,255,0.72)">
                  Courses currently published
                </Text>
              </Stack>
            </Paper>
          </SimpleGrid>

          <AllCoursesSection
            isMobile={isMobile}
            isLoadingCourses={isLoadingCourses}
            dbCourses={dbCourses}
            enrollCounts={enrollCounts}
            onToggleStatus={async (courseId, toStatus) => {
              setIsToggling((prev) => ({ ...prev, [courseId]: true }));
              try {
                const res = await axios.put('/api/manager/courses', { id: courseId, status: toStatus });
                const updated = res.data.course;
                setDbCourses((prev) =>
                  prev.map((c) => (c._id === courseId ? { ...c, status: updated.status } : c))
                );
              } catch (e) {
                // ignore error silently
              } finally {
                setIsToggling((prev) => ({ ...prev, [courseId]: false }));
              }
            }}
          />
        </Stack>
      </Container>

      <style jsx global>{`
        .dashboard-table tbody tr {
          background: transparent !important;
          transition: background 0.15s ease;
        }
        .dashboard-table tbody tr:hover {
          background: rgba(255, 255, 255, 0.05) !important;
        }
      `}</style>
      <style jsx global>{`
        /* Stronger AreaChart contrast & sizing for manager dashboard */
        .manager-area-chart svg {
          color: rgba(255, 255, 255, 0.98) !important;
        }
        .manager-area-chart svg text {
          fill: rgba(255, 255, 255, 0.98) !important;
        }
        /* Legend entries */
        .manager-area-chart .recharts-legend .recharts-legend-item text,
        .manager-area-chart .recharts-legend-item text {
          fill: rgba(255, 255, 255, 0.95) !important;
          font-weight: 700 !important;
          font-size: 13px !important;
        }
        /* Axis tick labels */
        .manager-area-chart .recharts-cartesian-axis-tick-value {
          fill: rgba(255, 255, 255, 0.86) !important;
          font-size: 12px !important;
          font-weight: 600 !important;
        }
        /* Make dots and markers stand out on dark bg */
        .manager-area-chart .recharts-dot {
          stroke: rgba(255, 255, 255, 0.1) !important;
          stroke-width: 1.6 !important;
          r: 4 !important;
        }
        .manager-area-chart .recharts-legend-item rect,
        .manager-area-chart .recharts-legend-item circle {
          stroke: rgba(255, 255, 255, 0.06) !important;
          stroke-width: 1 !important;
        }
        /* Target yellow series to ensure visibility */
        .manager-area-chart .recharts-legend-item rect[fill*='yellow'],
        .manager-area-chart .recharts-dot[fill*='yellow'],
        .manager-area-chart path[stroke*='yellow'] {
          stroke: #ffd54f !important;
          fill: #ffd54f !important;
          stroke-width: 2.2 !important;
        }
        /* Tooltip: white bg with dark text for readability */
        .manager-area-chart .recharts-tooltip-wrapper,
        .manager-area-chart .recharts-default-tooltip {
          background: rgba(255, 255, 255, 0.98) !important;
          color: #0b0b0b !important;
          border-radius: 8px !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35) !important;
        }
        /* Slightly increase area opacity so line labels contrast better */
        .manager-area-chart .recharts-area {
          opacity: 0.95 !important;
        }
      `}</style>
    </Box>
  );
}
