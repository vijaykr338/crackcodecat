"use client";
import React from 'react';
import { Box, Container, Grid, Title, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function ScoreStrip() {
  const stats = [
    { title: '99.9+ %ile', subtitle: '45 Students' },
    { title: '99.5+ %ile', subtitle: '270 Students' },
    { title: '99+ %ile', subtitle: '540 Students' },
    { title: '95+ %ile', subtitle: '2300 Students' }
  ];

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Box style={{ background: '#e9f6ff' }} py={isMobile ? 18 : 28}>
      <Container size="lg">

        <Grid align="center" gutter={isMobile ? 10 : 40}>
          {stats.map((s, idx) => (
            <React.Fragment key={idx}>
              <Grid.Col span={{ base: 6, sm: 6, md: 3 }}>
                <div
                  style={{
                    textAlign: 'center',
                    padding: isMobile ? '10px 8px' : '22px 14px',
                    minHeight: isMobile ? 100 : 150,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRight: idx < stats.length - 1 && !isMobile ? '1px solid rgba(15, 23, 42, 0.06)' : 'none'
                  }}
                >
                  <Title
                    order={3}
                    style={{
                      marginBottom: 8,
                      fontWeight: 500,
                      color: '#071133',
                      fontSize: isMobile ? '1.25rem' : '2rem',
                      lineHeight: 1.05,
                      fontFamily: 'var(--font-heading), Montserrat, system-ui, sans-serif',
                      whiteSpace: 'nowrap',
                      letterSpacing: '-1px'
                    }}
                  >
                    {s.title}
                  </Title>

                  <Text
                    size={isMobile ? 'md' : 'lg'}
                    style={{
                      color: 'rgba(15,23,42,0.9)',
                      marginTop: 8,
                      fontSize: isMobile ? '0.9rem' : '1.05rem',
                      fontWeight: 500,
                      fontFamily: 'var(--font-body), Inter, system-ui, sans-serif'
                    }}
                  >
                    {s.subtitle}
                  </Text>
                </div>
              </Grid.Col>
              {/* Force line break after 2nd item on mobile for 2x2 layout */}
              {isMobile && idx === 1 && <div style={{ flexBasis: '100%', height: 0 }} />}
            </React.Fragment>

          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ScoreStrip;
