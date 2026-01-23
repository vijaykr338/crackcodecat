// src/app/terms-and-conditions/page.tsx or src/pages/terms-and-conditions.tsx
"use client"; // This directive is necessary for App Router components that use Mantine hooks.

import { Container, Title, Text, Stack, List } from "@mantine/core";

export default function TermsAndConditionsPage() {
  return (
    <Container size="md" py={60}>
      <Title
        order={1}
        mb="xl"
        style={{
          fontSize: "clamp(2rem, 5vw, 3.2rem)",
          fontWeight: 800,
          textAlign: "center",
        }}
      >
        Terms and Conditions
      </Title>

      <Stack gap="xl">
        <Text>
          This document outlines the terms and conditions for the live CAT VARC
          course delivered through WhatsApp groups. By purchasing this course, you agree to be
          bound by these terms.
        </Text>

        <section>
          <Title order={2} size="h3" mb="sm">
            1. Course Access and Communication
          </Title>
          <List withPadding>
            <List.Item>
              <Text fw={600}>Access:</Text> Upon successful payment, you will be added to the
              official WhatsApp group(s) for the course. This is the primary channel for all
              live classes, discussions, and material sharing.
            </List.Item>
            <List.Item>
              <Text fw={600}>Live Sessions:</Text> The course is delivered through live
              sessions and discussions within the designated WhatsApp groups. It is your
              responsibility to be present for these sessions or to review the content
              shared later if you miss a live session.
            </List.Item>
            <List.Item>
              <Text fw={600}>Group Rules:</Text> To ensure a productive environment, you must
              adhere to all group rules, including respectful communication and avoiding
              spam. Violation of these rules may result in your removal from the group
              without a refund.
            </List.Item>
            <List.Item>
              <Text fw={600}>Single User License:</Text> Your purchase grants you a
              single-user license. The course content, including live sessions, messages,
              documents, and practice tests, is for your personal use only. Sharing,
              distributing, or inviting others to the group is strictly prohibited.
            </List.Item>
          </List>
        </section>

        <section>
          <Title order={2} size="h3" mb="sm">
            2. Payments and Refunds
          </Title>
          <List withPadding>
            <List.Item>
              <Text fw={600}>Pricing:</Text> All prices are listed in INR. We
              reserve the right to change prices at any time, but price changes will not
              affect purchases already made.
            </List.Item>
            <List.Item>
              <Text fw={600}>Payment:</Text> All payments must be made through our designated
              payment gateway. Your access to the course groups will be granted only after
              we receive confirmation of a successful payment.
            </List.Item>
            <List.Item>
              <Text fw={600}>Refund Policy:</Text> Due to the live, immediate nature of the
              course and group access, all sales are final. We do not offer refunds once you
              have been added to the WhatsApp group.
            </List.Item>
          </List>
        </section>

        <section>
          <Title order={2} size="h3" mb="sm">
            3. Intellectual Property
          </Title>
          <List withPadding>
            <List.Item>
              <Text fw={600}>Ownership:</Text> All course content, including live
              instructions, shared messages, videos, and exercises, is the intellectual
              property of CrackCodeCat and is protected by copyright law.
            </List.Item>
            <List.Item>
              <Text fw={600}>Prohibitions:</Text> You may not reproduce, modify, distribute,
              or create derivative works from the course content without our explicit
              written permission.
            </List.Item>
          </List>
        </section>

        <section>
          <Title order={2} size="h3" mb="sm">
            4. Disclaimers
          </Title>
          <List withPadding>
            <List.Item>
              <Text fw={600}>No Guarantees:</Text> We do not guarantee a specific score or
              outcome on the CAT exam. Your results depend on various factors, including your
              effort, prior knowledge, and personal study habits. The course is designed to
              be a tool to assist you in your preparation, not a guarantee of success.
            </List.Item>
            <List.Item>
              <Text fw={600}>Technical Issues:</Text> While we will make every effort to
              ensure a smooth experience, we are not responsible for technical issues related
              to your personal device, internet connection, or the WhatsApp platform itself.
            </List.Item>
          </List>
        </section>

      

        <section>
          <Title order={2} size="h3" mb="sm">
            5. Changes to Terms
          </Title>
          <Text>
            We reserve the right to modify these terms and conditions at any time. We will
            notify you of any significant changes via a notice in the WhatsApp group or
            through a personal message. Your continued participation in the course after
            such changes constitutes your acceptance of the new terms.
          </Text>
        </section>

        <Text mt="lg">
          By completing your purchase and joining the WhatsApp group, you acknowledge that you
          have read, understood, and agree to these Terms and Conditions.
        </Text>
      </Stack>
    </Container>
  );
}