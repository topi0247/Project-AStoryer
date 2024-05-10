"use client";

import { IndexIllustData } from "@/types";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Illust from "./illust";
import "@mantine/carousel/styles.css";

export default function IllustCarousel({
  illustsData,
}: {
  illustsData: IndexIllustData[];
}) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const align = mobile ? "center" : "start";
  const slideSize = mobile ? "95%" : "12.5%";
  const slidesToScroll = mobile ? 1 : 2;

  return (
    <div className="w-full">
      <Carousel
        slideSize={slideSize}
        slideGap="xs"
        align={align}
        slidesToScroll={slidesToScroll}
        className="h-full"
      >
        {illustsData.map((illust: IndexIllustData) => (
          <Carousel.Slide key={illust.id} className="flex justify-center">
            <Illust illust={illust} isUserPage={false} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}
