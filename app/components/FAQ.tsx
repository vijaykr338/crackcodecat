"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Box,
  Drawer,
  Group,
  Anchor,
  ScrollArea,
  Stack,
  Button,
  Paper,
  Table,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

// Define types
interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface ComparisonRow {
  aspect: string;
  traditional: string;
  crackcode: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "q1",
    question: "What makes CRACK CODE different from traditional CAT coaching?",
    answer:
      "CRACK CODE specializes exclusively in CAT VARC with a proven methodology that delivers results 8-10x faster than traditional coaching. Our approach focuses on elimination-based solving, strategic time management, and personalized error analysis rather than generic batch teaching.",
  },
  {
    id: "q2",
    question: "Can I really master CAT VARC in just 45 days?",
    answer:
      "Yes, with our focused methodology and strategic approach, 45 days is sufficient for significant VARC improvement. Unlike traditional 6-12 month cycles, we eliminate time wastage by targeting specific knowledge gaps and teaching proven techniques that work consistently.",
  },
  {
    id: "q3",
    question: 'What is your signature "Math Problem Option" technique?',
    answer:
      "With our methodologies, you’ll be able to differentiate VARC options just like Math options—so even close choices won’t confuse you.",
  },
  {
    id: "q4",
    question: "How does your speed reading method work for CAT passages?",
    answer:
      "Our analysis-based speed reading system teaches you to extract key information and eliminate wrong options without reading entire passages. You learn to identify crucial elements quickly while maintaining comprehension accuracy.",
  },
  {
    id: "q5",
    question: "Do you provide personalized attention in online format?",
    answer:
      "Absolutely. We maintain small batch sizes, provide personalized error analysis, offer live doubt resolution during sessions, and create customized improvement plans based on individual weaknesses and strengths.",
  },
  {
    id: "q6",
    question: "What specific para-question tactics do you teach?",
    answer:
      'We provide clear, systematic methods for Para Jumbles, Para Completions, Para Summary, and Odd One Out questions. These techniques transform what most students consider "guessing games" into predictable, solvable problems.',
  },
  {
    id: "q7",
    question: "How flexible are your live class timings?",
    answer:
      "Our live interactive classes are scheduled in the evening (7-8 PM) throughout the week for maximum convenience. This timing works well for both working professionals and students, with recorded sessions available for revision.",
  },
  {
    id: "q8",
    question: "What kind of practice materials do you recommend?",
    answer:
      "We provide curated recommendations for both high-quality free resources and premium online materials. Our suggestions focus on strategic solving approaches rather than quantity, ensuring efficient practice with maximum impact.",
  },
  {
    id: "q9",
    question: "What results can I expect with your methodology?",
    answer:
      "Our proven methodology has helped numerous students achieve 95+ percentile in VARC. The systematic approach, combined with personalized guidance and elimination techniques, consistently delivers superior results compared to traditional preparation methods.",
  },
];

// Comparison table data
const COMPARISON_DATA: ComparisonRow[] = [
  {
    aspect: "Preparation Time",
    traditional: "6-12 months",
    crackcode: "45-day focused program",
  },
  {
    aspect: "Teaching Style",
    traditional: "Generic batch teaching",
    crackcode: "Specialised VARC training",
  },
  {
    aspect: "Resource Philosophy",
    traditional: "More resources = Better results",
    crackcode: "Quality strategies over quantity",
  },
  {
    aspect: "Problem Solving",
    traditional: "Theory-heavy approach",
    crackcode: "Real VARC techniques that work",
  },
  {
    aspect: "Strategy Focus",
    traditional: "Formula-based solving",
    crackcode: "Logic-based elimination framework",
  },
  {
    aspect: "Mentor Background",
    traditional: "General teaching experience",
    crackcode: "Proven transformation journey",
  },
  {
    aspect: "Results Timeline",
    traditional: "Gradual improvement",
    crackcode: "8-10x faster results",
  },
  {
    aspect: "Success Proof",
    traditional: "Marketing claims",
    crackcode: "Documented scorecards & evidence",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  // Force the desktop order/row layout exactly as requested
  const ORDERED_IDS = [
    "q1",
    "q2",
    "q3",
    "q4",
    "q5",
    "q6",
    "q7",
    "q8",
    "q9",
  ];

  const ORDERED_FAQ: FAQItem[] = ORDERED_IDS
    .map((id) => FAQ_ITEMS.find((f) => f.id === id))
    .filter((f): f is FAQItem => Boolean(f));

  useEffect(() => {
    if (open && active) {
      setTimeout(() => {
        const el = document.getElementById(`answer-${active}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [open, active]);

  const handleOpen = (id: string) => {
    setActive(id);
    setOpen(true);
    setShowComparison(false);
  };

  const handleComparisonOpen = () => {
    setShowComparison(true);
    setActive(null);
    setOpen(true);
  };

  return (
    <Box
      component="section"
      id="faqs"
      py={48}
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)",
      }}
    >
      <Container size="lg">
        <Title order={2} mb={6} style={{ color: "#0b66ff", letterSpacing: -0.2 }}>
          Frequently Asked Questions
        </Title>

        {/* Comparison Table Button */}
        <Box mb={24}>
          <Paper
            role="button"
            tabIndex={0}
            onClick={handleComparisonOpen}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && handleComparisonOpen()
            }
            withBorder
            radius={8}
            style={{
              cursor: "pointer",
              background: "linear-gradient(135deg, #0b66ff 0%, #1c7aff 100%)",
              border: "none",
              padding: "16px 24px",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              color: "white",
            }}
          >
            <Text fw={700} size="sm" style={{ color: "white" }}>
              🆚 CRACK CODE vs Traditional CAT Coaching - See the Difference
            </Text>
            <IconChevronRight size={16} color="white" />
          </Paper>
        </Box>

        {/* FAQ Buttons */}
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            columnGap: 24,
            rowGap: 8,
            alignItems: "center",
          }}
        >
          {ORDERED_FAQ.map((it, i) => (
            <React.Fragment key={it.id}>
              <Paper
                role="button"
                tabIndex={0}
                onClick={() => handleOpen(it.id)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && handleOpen(it.id)
                }
                withBorder
                radius={0}
                style={{
                  cursor: "pointer",
                  background: "#fff",
                  border: "1px solid #d1d5db",
                  padding: "14px 18px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  minHeight: 56,
                  width: "auto",
                  maxWidth: "100%",
                }}
              >
                <Text fw={600} style={{ color: "#1f2937", lineHeight: 1.35 }}>
                  {it.question}
                </Text>
                <Box
                  aria-hidden
                  style={{
                    width: 30,
                    height: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "9999px",
                    border: "1px solid #e5e7eb",
                    background: "#f9fafb",
                  }}
                >
                  <IconChevronRight size={14} color="#6b7280" />
                </Box>
              </Paper>
              {(i === 2 || i === 4 || i === 6) && (
                <span
                  style={{
                    flexBasis: "100%",
                    height: 0,
                    margin: 0,
                    padding: 0,
                    display: "block",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </Box>

        {/* Drawer */}
        <Drawer
          opened={open}
          onClose={() => setOpen(false)}
          position="right"
          size="lg"
          title={showComparison ? "Coaching Comparison" : "FAQ Answers"}
        >
          <Stack gap={10}>
            {!showComparison && (
              <Group gap={8} wrap="wrap" style={{ paddingBottom: 6 }}>
                {FAQ_ITEMS.map((it) => (
                  <Anchor
                    key={it.id}
                    href={`#answer-${it.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActive(it.id);
                      const el = document.getElementById(`answer-${it.id}`);
                      if (el)
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }}
                    c="#0b66ff"
                    underline="never"
                    style={{
                      background: "rgba(11,102,255,0.10)",
                      padding: "6px 10px",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {it.question}
                  </Anchor>
                ))}
              </Group>
            )}

            <ScrollArea style={{ height: "65vh" }}>
              {showComparison ? (
                <Box>
                  <Title order={3} mb={16} style={{ color: "#0b66ff" }}>
                    Why Choose CRACK CODE Over Traditional CAT Coaching?
                  </Title>
                  <Table striped highlightOnHover withTableBorder>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th style={{ fontWeight: 700, color: "#1f2937" }}>
                          Aspect
                        </Table.Th>
                        <Table.Th style={{ fontWeight: 700, color: "#dc2626" }}>
                          Traditional CAT Coaching
                        </Table.Th>
                        <Table.Th style={{ fontWeight: 700, color: "#0b66ff" }}>
                          CRACK CODE Method
                        </Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {COMPARISON_DATA.map((row, index) => (
                        <Table.Tr key={index}>
                          <Table.Td style={{ fontWeight: 600 }}>
                            {row.aspect}
                          </Table.Td>
                          <Table.Td style={{ color: "#6b7280" }}>
                            {row.traditional}
                          </Table.Td>
                          <Table.Td
                            style={{ color: "#0b66ff", fontWeight: 600 }}
                          >
                            {row.crackcode}
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                  <Box
                    mt={20}
                    p={16}
                    style={{
                      background: "#f0f9ff",
                      borderRadius: 8,
                      border: "1px solid #0ea5e9",
                    }}
                  >
                    <Text fw={700} style={{ color: "#0b66ff", marginBottom: 8 }}>
                      The Result: 8-10x faster CAT VARC improvement
                    </Text>
                    <Text size="sm" style={{ color: "#374151" }}>
                      Our focused methodology eliminates time wastage and
                      delivers proven results through systematic, personalized
                      coaching that addresses your specific knowledge gaps.
                    </Text>
                  </Box>
                </Box>
              ) : (
                <Stack gap={18}>
                  {FAQ_ITEMS.map((it) => (
                    <Box key={it.id} id={`answer-${it.id}`}>
                      <Title order={4} mb={6} style={{ color: "#1f2937" }}>
                        {it.question}
                      </Title>
                      <Text c="dimmed" style={{ lineHeight: 1.6 }}>
                        {it.answer}
                      </Text>
                    </Box>
                  ))}
                </Stack>
              )}
            </ScrollArea>

            <Group align="center" style={{ justifyContent: "flex-end" }}>
              {showComparison && (
                <Button
                  variant="filled"
                  onClick={() => setShowComparison(false)}
                  style={{ background: "#0b66ff" }}
                >
                  View FAQs
                </Button>
              )}
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </Group>
          </Stack>
        </Drawer>
      </Container>
    </Box>
  );
}

export default FAQ;
