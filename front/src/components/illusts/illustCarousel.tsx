"use client";

import { IndexIllustData } from "@/types";
import Illust from "./illust";

export default function IllustCarousel({
  illustsData,
}: {
  illustsData: IndexIllustData[];
}) {
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
    <Swiper
      modules={[Navigation, Autoplay]}
      breakpoints={slideSettings}
      speed={5000}
      navigation
      className="w-full"
    >
      {illustsData.map((illust: IndexIllustData) => (
        <SwiperSlide key={illust.id}>
          <Illust illust={illust} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
