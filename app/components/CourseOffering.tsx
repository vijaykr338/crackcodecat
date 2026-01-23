"use client";
import { Box, Container, Title, Text, Paper, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconTargetArrow, IconChalkboard, IconHelp, IconAward, IconClock, IconListCheck, IconBook2, IconCalendarTime, IconVideo } from '@tabler/icons-react';


const features = [
  {
    icon: <IconTargetArrow size={36} color="#0066FF" />, title: 'Strategic Elimination',
    desc: 'Solve tricky VARC options with a logical elimination framework.'
  },
  {
    icon: <IconChalkboard size={36} color="#FF7A00" />, title: 'Speed-Reading',
    desc: 'Spot key info fast, skip fluff, and answer with accuracy.'
  },
  {
    icon: <IconHelp size={36} color="#E64980" />, title: 'Time Shortcuts',
    desc: 'Practical hacks to know when to skip, guess, or invest time.'
  },
  {
    icon: <IconBook2 size={36} color="#FFA94D" />, title: 'Para Mastery',
    desc: 'Reliable methods for Jumbles, Summaries, Completions, and Odd One Out.'
  },
  {
    icon: <IconVideo size={36} color="#FA5252" />, title: 'Mindset Training',
    desc: 'Build the thinking patterns and mental models of 95+ percentile scorers.'
  },
  {
    icon: <IconCalendarTime size={36} color="#228BE6" />, title: 'Mentor Insights',
    desc: 'Gain from my 9-year journey from <70 to 95+ percentile.'
  },
  {
    icon: <IconListCheck size={36} color="#4C6EF5" />, title: 'Curated Resources Suggestions',
    desc: 'Recommendations for the best free and premium resources.'
  },
  {
    icon: <IconAward size={36} color="#FFC700" />, title: 'Live Doubt Support',
    desc: 'Get instant clarity during sessions, no confusion left behind.'
  },
];

export function CourseOffering() {
  return (
    <Box component="section" id="features" py={{ base: 32, md: 64 }} style={{ background: '#f8faff' }}>
      <Container size="lg">
        <Title order={2} size={36} fw={900} mb={24} ta="center" style={{ color: '#003366', letterSpacing: -1, fontSize: 'clamp(20px, 5.5vw, 36px)' }}>
          Course Features
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={20}>
          {features.map((f, i) => (
            <Paper key={i} shadow="md" radius={16} p={20} style={{ background: '#fff', border: '1.5px solid #e3e8f0', minHeight: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', transition: 'box-shadow 0.2s', cursor: 'pointer' }}
              withBorder
              onMouseOver={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,102,255,0.08)')}
              onMouseOut={e => (e.currentTarget.style.boxShadow = '')}
            >
              <ThemeIcon size={40} radius={16} mb={12} style={{ background: '#f4f8ff' }}>{f.icon}</ThemeIcon>
              <Title order={4} style={{ fontWeight: 700, fontSize: 'clamp(16px,3.6vw,20px)', marginBottom: 6, color: '#222' }}>{f.title}</Title>
              <Text size="sm" style={{ color: '#444', fontSize: 'clamp(13px,3.2vw,15px)' }}>{f.desc}</Text>
            </Paper>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}
