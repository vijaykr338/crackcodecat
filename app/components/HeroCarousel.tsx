"use client";
import { useState } from 'react';
import { Container, Grid, Title, Text, Button, Group, Badge, Stack, Box, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconCheck, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Image from 'next/image';

const heroSlides = [
  {
    id: 1,
    topBadge: "FROM SETBACKS TO SUCCESS",
    mainTitle: "Crack CAT VARC in 45 Days!",
    mentor: {
      name: "Abhishek Anand",
      title: "Lead Mentor",
      percentile: "95+ %ILE",
      image: "/crackcode.webp" // Using guy.webp from public folder
    },
    countdown: {
      days: 107,
      hours: 12,
      minutes: 19,
      seconds: 37
    },
    description: "Learn with India’s top percentilers and uncover the strategies most aspirants don’t even know exist. In this focused 45-day program, you’ll transform VARC from guesswork into predictable wins—building the mindset, confidence, and precision that consistently deliver 95+ percentile scores. Experience proven approaches, personalized insights, and guidance that turns every challenge into a scoring opportunity.",
    features: [
      "Structured Roadmap",
      "Mentor Support", 
      "Personalized Feedback",
    ],
    ctaButtons: [
      { text: "Enroll Now", variant: "filled", color: "blue" },
      { text: "Book a Free Consultation Call", variant: "filled", color: "grape" }
    ]
  }
];

export function HeroCarousel() {
  
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const slide = heroSlides[0];

  return (
    <Box mt={{ base: 20, sm: 19, md: -64 }} id='#courses'>
      <Container size="xl" py={0}>
      <div style={{ position: 'relative' }}>
  {/* Navigation arrows for multiple slides (desktop only) */}

  <Grid gutter={isMobile ? 20 : 40} align="center">
          {/* Content - left on desktop */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap={10}>
              {/* Top Badge */}
              <div>
                <Text 
                  size="sm" 
                  fw={600} 
                  c="blue.6" 
                  style={{ 
                    letterSpacing: '1px',
                    textTransform: 'uppercase'
                  }}
                >
                  {slide.topBadge}
                </Text>
              </div>

              {/* Main Title */}
              <Title 
                order={1}
                style={{
                  fontSize: isMobile ? 'clamp(1.4rem, 4.5vw, 2.1rem)' : 'clamp(1.7rem, 4vw, 3.2rem)', // reduced sizes
                  lineHeight: 1.1,
                  fontWeight: 800,
                  color: '#1a1a1a'
                }}
              >
                {slide.mainTitle}
              </Title>

              {/* Countdown removed */}

              {/* Description */}
              <Text 
                size={isMobile ? 'md' : 'lg'}
                c="dimmed"
                style={{ 
                  lineHeight: isMobile ? 1.5 : 1.6,
                  fontSize: isMobile ? 'clamp(13px, 2.8vw, 16px)' : 'clamp(16px, 2.5vw, 20px)'
                }}
              >
                {slide.description}
              </Text>

              {/* CAT 2025 countdown - styled similar to main title */}
              <Title
                order={2}
                style={{
                  fontSize: isMobile ? 'clamp(1.2rem, 4vw, 1.7rem)' : 'clamp(1.5rem, 3vw, 2.4rem)',
                  lineHeight: 1.15,
                  fontWeight: 700,
                  color: '#d7263d',
                  marginTop: '8px'
                }}
              >
                {`CAT 2026: ${Math.max(0, Math.ceil((new Date('2026-11-29').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))} days remaining`}
              </Title>

              {/* CTA Buttons */}
              <Group gap={isMobile ? 10 : 15} wrap="wrap">
                {/* Limited seats text above buttons */}
                <Text
                  size={isMobile ? 'sm' : 'md'}
                  fw={700}
                  c="red.7"
                  mb={isMobile ? 2 : 4}
                  style={{
                    letterSpacing: '0.5px',
                    fontWeight: 700,
                    fontSize: isMobile ? 'clamp(1rem, 3vw, 1.2rem)' : 'clamp(1.1rem, 2vw, 1.3rem)'
                  }}
                >
                  Limited seats!
                </Text>
                {/* Buttons */}
                {slide.ctaButtons.map((button, index) => {
                  const txt = (button.text || '').toLowerCase();
                  // Book / Counseling button -> scroll to schedule
                  if (txt.includes('book') || txt.includes('counsel')) {
                    return (
                      <Button
                        key={index}
                        variant={button.variant}
                        color={button.color}
                        size={isMobile ? 'sm' : 'lg'}
                        radius="md"
                        component='a'
                        href='#consultation'
                        onClick={() => {
                          const el = document.getElementById('schedule');
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        style={{
                          minWidth: 'fit-content',
                          fontSize: isMobile ? '13px' : '16px',
                          fontWeight: 600
                        }}
                      >
                        {button.text}
                      </Button>
                    );
                  }

                  // Enroll button -> go to payment
                  if (txt.includes('enroll')) {
                    return (
                      <Button
                        key={index}
                        component="a"
                        href="/payment"
                        variant={button.variant}
                        color={button.color}
                        size={isMobile ? 'sm' : 'lg'}
                        radius="md"
                        style={{
                          minWidth: 'fit-content',
                          fontSize: isMobile ? '13px' : '16px',
                          fontWeight: 600
                        }}
                      >
                        {button.text} {index === 0 && '→'}
                      </Button>
                    );
                  }

                  // Fallback
                  return (
                    <Button
                      key={index}
                      variant={button.variant}
                      color={button.color}
                      size={isMobile ? 'sm' : 'lg'}
                      radius="md"
                      style={{
                        minWidth: 'fit-content',
                        fontSize: isMobile ? '13px' : '16px',
                        fontWeight: 600
                      }}
                    >
                      {button.text}
                    </Button>
                  );
                })}
              </Group>

              {/* Features */}
              <Group gap={isMobile ? 18 : 30} wrap="wrap">
                {slide.features.map((feature, index) => (
                  <Group gap={isMobile ? 6 : 8} key={index}>
                    <IconCheck size={isMobile ? 14 : 16} color="#228be6" />
                    <Text size={isMobile ? 's' : 'sm'} fw={500}>
                      {feature}
                    </Text>
                  </Group>
                ))}
              </Group>

              {/* Mentor section below (mobile only) */}
  <Box hiddenFrom="md" mt={{ base: -40, sm: -6 }}>
    <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                   <Image
  src={slide.mentor.image}
  alt={slide.mentor.name}
  height={420}         // fixed height
  width={0}            // allow auto-calculated width
  sizes="auto"         // responsive sizing
  style={{
    height: "420px",
    width: "auto",
    objectFit: "contain",
  }}
/>
                    <Title order={4} size="h4">{slide.mentor.name}</Title>
                    <Group justify="center" gap={8}>
                      <Badge variant="light" color="blue" size="sm">
                        {slide.mentor.percentile}
                      </Badge>
                      <Text size="xs" c="dimmed">{slide.mentor.title}</Text>
                    </Group>
                  </div>
                </div>
              </Box>
            </Stack>
          </Grid.Col>

          {/* Right-side mentor image (desktop only) */}
          <Grid.Col span={5} visibleFrom="md">
            <div style={{ position: 'relative', textAlign: 'center' }}>
              <div
                style={{
                  background: 'none',
                  borderRadius: '16px',
                  padding: '16px',
                  marginTop: -12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={slide.mentor.image}
                  alt={slide.mentor.name}
                  style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }}
                />
              </div>
              {/* Small overlay with name and percentile */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0, 0, 0, 0.75)',
                  padding: '10px 14px',
                  borderRadius: 12,
                  minWidth: 200,
                }}
              >
                <Title order={5} size="h5" c="white" mb={4}>
                  {slide.mentor.name}
                </Title>
                <Group justify="center" gap={8}>
                  <Text size="xs" c="gray.3">
                    {slide.mentor.title}
                  </Text>
                  <Badge variant="light" color="blue" size="xs">
                    {slide.mentor.percentile}
                  </Badge>
                </Group>
              </div>
            </div>
          </Grid.Col>
        </Grid>
      </div>
      </Container>
    </Box>
  );
}
