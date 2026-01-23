"use client";
import { Box, Grid, Group, Stack, Text, Anchor, Divider } from "@mantine/core";

export function Footer() {

  const links = [

    { label: 'Course Features', href: '#features' },
    { label: 'Mentors', href: '#mentors' },
    { label: 'Achievers', href: '#achievers' },
    { label: 'FAQs', href: '#faqs' }

  ];

  return (
    <Box
      component="footer"
      pt={48}
      pb={20}
      style={{
        background: 'linear-gradient(135deg,#0b66ff 0%,#004ab3 55%,#004099 100%)',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* decorative overlays */}
      <Box aria-hidden style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.06), rgba(255,255,255,0) 70%)' }} />
      <Box aria-hidden style={{ position: 'absolute', top: -120, left: -120, width: 320, height: 320, background: 'radial-gradient(circle at 40% 40%,rgba(255,255,255,0.06),rgba(255,255,255,0) 70%)' }} />

      <Box style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1rem,4vw,2rem)' }}>
        <Grid gutter={36} align="start" pb={30}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={8}>
              <Text fw={800} fz={26} style={{ letterSpacing: -0.5 }}>
                CrackCode<span style={{ color: '#ffd966' }}>CAT</span>
              </Text>
              <Text fz="sm" c="rgba(255,255,255,0.78)" style={{ maxWidth: 520, lineHeight: 1.5 }}>
                Structured mentorship, adaptive practice and relentless analysis engineered to push you into the 95+ percentile bracket.
              </Text>

              <Group gap={10} mt={6}>
                <Anchor href="mailto:info@crackcodecat.in" c="rgba(255,255,255,0.9)" underline="hover">info@crackcodecat.in</Anchor>
                <Text c="rgba(255,255,255,0.35)">•</Text>
                <Anchor href="tel:+918744003503" c="rgba(255,255,255,0.9)" underline="hover">+91 8744003503</Anchor>
              </Group>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={8} align="flex-start">
              <Text fw={600} fz={14} tt="uppercase" c="rgba(255,255,255,0.9)" style={{ letterSpacing: 0.6 }}>Program</Text>
              <Stack gap={6}>
                {links.map((l,index) => (
                  <Anchor key={index} href={`${l.href}`} c="rgba(255,255,255,0.8)" fz="sm" underline="never" style={{ fontWeight: 500 }}>{l.label}</Anchor>
                ))}
              </Stack>

           {/* Quick Links removed per request */}
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider color="rgba(255,255,255,0.12)" />
        <Group justify="space-between" pt={16} wrap="wrap" gap={8}>
          <Text fz={12} c="rgba(255,255,255,0.6)">© {new Date().getFullYear()} CrackCodeCAT. All rights reserved.</Text>
          <Text fz={12} c="rgba(255,255,255,0.55)">Made with care in India</Text>
        </Group>
      </Box>
    </Box>
  );
}

export default Footer;
