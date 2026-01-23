"use client";
import { Container, Title, Text, Box, Stack, Image, Group, Anchor } from "@mantine/core";

export default function MeetYourMentor() {
            const scorecards = [
                { year: "2017", file: "2017.webp" },
                { year: "2018", file: "2018.webp" },
                { year: "2019", file: "2019.webp" },
                { year: "2023", file: "2023.webp" },
            ];

            return (
                <Box py={60} style={{ background: "linear-gradient(180deg, #f9fbff 0%, #ffffff 100%)" }}>
                    <Container size="md">
                        <Stack gap="xl">
                            <Title
                                order={1}
                                style={{ color: "#003366", fontWeight: 900, letterSpacing: -1, lineHeight: 1.3 }}
                            >
                                My CAT VARC Journey: The Real Story Behind Going from Rock Bottom to 95+ Percentile
                            </Title>

                            <Title order={3} style={{ color: "#003366" }}>
                                The Truth Behind My Transformation
                            </Title>
                            <Text size="lg" style={{ lineHeight: 1.8 }}>
                                What I'm about to share isn't another success story designed to impress you—it's the unfiltered
                                reality of my eight-year struggle with CAT's most challenging section. Every claim I make is
                                backed by my actual scorecards, which I'm displaying throughout this post.
                            </Text>

                            <Title order={3} style={{ color: "#003366" }}>
                                Where It All Started: Confidence Meets Reality
                            </Title>
                            <Text size="lg" style={{ lineHeight: 1.8 }}>
                                Like every CAT aspirant in 2015, I believed that good coaching plus hard work equals success. I
                                enrolled with reputable institutes and followed traditional preparation methods religiously.
                            </Text>
                            
                            <Title order={3} style={{ color: "#003366" }}>
                                CAT 2017: Reality Check—51.95 Percentile
                            </Title>
                            <Text size="lg" style={{ lineHeight: 1.8 }}>
                                My first attempt yielded 51.95 percentile in VARC despite sincere preparation. I was attempting
                                roughly half the section with moderate accuracy. Convinced that strategy adjustment was the
                                answer, I prepared for my next shot.
                            </Text>
                            
                            <Title order={3} style={{ color: "#003366" }}>
                                CAT 2018: The Lowest Point—31.92 Percentile
                            </Title>
                            <Text size="lg" style={{ lineHeight: 1.8 }}>
                                The outcome was devastating: 31.92 percentile. My strategy had completely backfired. After two
                                years of effort, I was moving backward instead of forward.
                            </Text>

                            <Title order={3} style={{ color: "#003366" }}>
                                CAT 2019: The Validation—77.33 Percentile
                            </Title>
                            <Text size="lg" style={{ lineHeight: 1.8 }}>
                                The results were remarkable: 77.33 percentile, representing a 45-percentile improvement. My
                                self-developed methodology had proven effective in real exam conditions.
                            </Text>

                            <Title order={3} style={{ color: "#003366" }}>
                                CAT 2023: Complete Mastery—95+ Percentile
                            </Title>
                            <Text size="lg" style={{ lineHeight: 1.8 }}>
                                Using my evolved framework, I achieved 95+ percentile in VARC. This confirmed that my methodology
                                wasn't accidental—it was replicable and sustainable.
                            </Text>

                            <Title order={3} style={{ color: "#003366" }}>
                                My Complete Performance Record
                            </Title>

                            <Group justify="center" gap="xl" mt={32}>
                                {scorecards.map((sc) => (
                                    <Stack key={sc.year} align="center" gap="sm">
                                        <Image
                                            src={sc.file}
                                            alt={`CAT ${sc.year} Scorecard`}
                                            radius="md"
                                            w="auto"
                                            h={150}
                                            fit="contain"
                                            style={{
                                                boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
                                                border: '1px solid #e9ecef',
                                            }}
                                        />
                                        <Anchor
                                            href={sc.file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            fz="sm"
                                            fw={500}
                                        >
                                            View Scorecard ({sc.year})
                                        </Anchor>
                                    </Stack>
                                ))}
                            </Group>

                            <Title order={3} style={{ color: "#003366", marginTop: 32 }}>
                                Your Opportunity Starts Now
                            </Title>
                            <Text size="lg" style={{ lineHeight: 1.8 }}>
                                You have the chance to bypass years of frustration and failed attempts. My documented journey
                                proves that dramatic improvement is possible when you address the right knowledge gaps with proven
                                strategies. I am here to guide you through every step, ensuring you achieve your target percentile
                                in just 1.5 months.
                            </Text>
                        </Stack>
                    </Container>
                </Box>
            );
        }