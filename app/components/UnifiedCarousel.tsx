"use client";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { Paper, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { HeroCarousel } from "./HeroCarousel";
import { CourseCarousel } from "./CourseCarousel";
import { SuccessStoriesCarousel } from "./SuccessStoriesCarousel";
import "@mantine/carousel/styles.css";

export function UnifiedCarousel() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const autoplay = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <Paper withBorder radius="md" shadow="sm" p="md">
      <Carousel
  emblaOptions={{ loop: true, align: 'start' }}   // enable wrap-around
  withIndicators
  withControls={!isMobile}
  controlSize={34}
  styles={{ viewport: { overflow: 'hidden' } }}
  plugins={[autoplay.current]}
  onMouseEnter={autoplay.current.stop}
  onMouseLeave={autoplay.current.reset}
  
  
>
        <Carousel.Slide>
          <HeroCarousel />
        </Carousel.Slide>
        <Carousel.Slide>
          <CourseCarousel />
        </Carousel.Slide>
        <Carousel.Slide>
          <div style={{ marginTop: 12 }}>
            <SuccessStoriesCarousel />
          </div>
        </Carousel.Slide>
      </Carousel>
    </Paper>
  );
}
