"use client";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@/styles/globals.css"; // swiperの上書き
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
