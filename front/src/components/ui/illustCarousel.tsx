"use client";

import Image from "next/image";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
import { IndexIllustData } from "@/types";
import { Link } from "@/lib";

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
      loop={true}
      speed={5000}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      navigation
      className="w-full"
    >
      {illustsData.map((illust: IndexIllustData) => (
        <SwiperSlide key={illust.id}>
          <Link href={`/illusts/${illust.id}`}>
            <Image
              src={illust.image}
              loading="lazy"
              width={400}
              height={400}
              alt="Slider Image"
              className="aspect-square object-cover"
            />
          </Link>
          <div className="mt-4 flex justify-start items-center gap-3">
            <Link href={`/users/${illust.user.id}`}>
              <Image
                src={illust.user.avatar}
                width={40}
                height={40}
                alt={illust.user.name}
                className="rounded-full aspect-square object-cover"
              />
            </Link>
            <h4>
              <Link href={`/illusts/${illust.id}`}>{illust.title}</Link>
            </h4>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
