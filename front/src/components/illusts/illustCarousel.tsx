"use client";

import { IndexIllustData } from "@/types";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Illust from "./illust";

export default function IllustCarousel({
  illustsData,
}: {
  illustsData: IndexIllustData[];
}) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  // ブレイクポイントに応じた表示枚数
  const slideSettings = {
    0: {
      slidesPerView: 1.4,
      spaceBetween: 5,
    },
    450: {
      slidesPerView: 4,
      spaceBetween: 5,
    },
    1024: {
      slidesPerView: 8,
      spaceBetween: 5,
    },
  };

  return (
    <Carousel
      withIndicators
      height={200}
      slideSize="33.333333%"
      slideGap="md"
      loop
      align="start"
      slidesToScroll={mobile ? 1 : 8}
    >
      {illustsData.map((illust: IndexIllustData) => (
        <Carousel.Slide key={illust.id}>
          <Illust illust={illust} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
