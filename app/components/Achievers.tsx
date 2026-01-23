"use client";
import { Box, Container, Grid, Paper, Stack, Group, Title, Text, Image, Badge, Anchor } from '@mantine/core';

type ScoreRow = { section: string; score: number | string; percentile: number | string };

const achiever = {
  name: 'Aashit Kumar Malik',
  percentile: 97.71,
  photo: '/achiever.webp',
  year: 'CAT 2023',
  scorecard: '/marksheet_1.webp',
  scores: [
    { section: 'VARC', score: 74, percentile: 99.2 },
    { section: 'DILR', score: 62, percentile: 98.6 },
    { section: 'QA', score: 70, percentile: 99.1 }
  ] as ScoreRow[],
  overall: { score: 40.32, percentile: 97.91 } as ScoreRow
};

export function Achievers() {
  return (
    <Box component="section" id="achievers" py={48} style={{ background: 'linear-gradient(180deg, rgba(11,102,255,0.03), transparent)' }}>
      <Container size="lg">
        <Title order={2} mb={6} style={{ color: '#0b66ff', letterSpacing: -0.2, fontWeight: 800 }}>Our Achievers</Title>
        <Text mb={14} c="dimmed">Real results from disciplined prep, strong fundamentals and smart strategy.</Text>

        {/* Highlight card: left details, right photo */}
        <Paper radius="lg" withBorder style={{
          overflow: 'hidden',
          borderColor: 'rgba(11,102,255,0.22)',
          background: 'linear-gradient(135deg, rgba(11,102,255,0.06), rgba(90,161,255,0.10))',
          boxShadow: '0 18px 40px -22px rgba(11,102,255,0.45)'
        }} p={22}>
          <Grid gutter={18} align="center">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap={10}>
                <Badge variant="filled" color="blue" radius="sm">{achiever.year}</Badge>
                <Text style={{ color: '#0b2c64', fontSize: 32, fontWeight: 800, letterSpacing: -0.4 }}>{achiever.name}</Text>

                <Group gap={14} align="center">
                  <Box style={{
                    padding: '8px 12px',
                    borderRadius: 12,
                    background: 'rgba(11,102,255,0.08)',
                    border: '1px solid rgba(11,102,255,0.22)'
                  }}>
                    <Text size="xs" c="dimmed" style={{ textTransform: 'uppercase', letterSpacing: 0.8 }}>Percentile</Text>
                    <Text style={{ fontSize: 40, fontWeight: 900, letterSpacing: -0.6, lineHeight: 1, background: 'linear-gradient(90deg,#0b66ff,#114CA8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {achiever.percentile}
                    </Text>
                  </Box>
                </Group>

                <Text c="dimmed" style={{ maxWidth: 560 }}>
                  Consistent practice, rigorous mocks and mentor feedback helped {achiever.name.split(' ')[0]} achieve an exceptional percentile in {achiever.year}.
                </Text>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <Box style={{
                  padding: 10,
                  borderRadius: 16,
                  background: 'linear-gradient(180deg, rgba(11,102,255,0.10), rgba(11,102,255,0.02))',
                  border: '1px solid rgba(11,102,255,0.18)'
                }}>
                  <Image src={achiever.photo} alt={achiever.name} radius="md" height={260} width={220} fit="cover" style={{ boxShadow: '0 14px 30px -14px rgba(11,102,255,0.45)', background: '#fff' }} />
                </Box>
              </Box>
            </Grid.Col>
          </Grid>
        </Paper>

        {/* Marksheet image (responsive: prevents horizontal overflow on narrow viewports) */}
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 16, padding: '0 12px', boxSizing: 'border-box' }}>
          <Paper
            radius="lg"
            withBorder
            p={12}
            style={{
              borderColor: 'rgba(11,102,255,0.22)',
              background: 'rgba(11,102,255,0.035)',
              display: 'block',
              maxWidth: 760,
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <Group gap={10} align="center" mb={10} style={{ width: '100%' }}>
              <Title order={4} style={{ color: '#0b2c64', letterSpacing: -0.2, margin: 0 }}>Marksheet</Title>
              <Badge variant="light" color="blue">{achiever.year}</Badge>
              <Anchor href={achiever.scorecard} target="_blank" rel="noreferrer" c="#0b66ff" underline="hover" style={{ marginLeft: 'auto', fontWeight: 600 }}>View full image</Anchor>
            </Group>
            <Box style={{ display: 'block', width: '100%' }}>
              <Image
                src={achiever.scorecard}
                alt={`${achiever.name} scorecard`}
                radius="md"
                fit="contain"
                width={50}
                style={{
                  display: 'block',
                  height: 'auto',
                  width: '100%',
                  maxWidth: 760,
                  border: '1px solid rgba(11,102,255,0.14)',
                  background: '#fff',
                  boxSizing: 'border-box'
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default Achievers;
