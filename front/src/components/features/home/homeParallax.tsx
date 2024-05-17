"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import * as Mantine from "@mantine/core";
import { Link } from "@/lib";
import { RouterPath } from "@/settings";
import { IHomeIllustData } from "@/types";

export const HomeParallax = ({ illusts }: { illusts: IHomeIllustData[] }) => {
  const firstRow = illusts.slice(0, 5);
  const secondRow = illusts.slice(5, 10);
  const thirdRow = illusts.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-6 md:space-x-20 mb-5 md:mb-20">
          {firstRow.map((illust) => (
            <ProductCard
              illust={illust}
              translate={translateX}
              key={illust.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row space-x-6 md:space-x-20 mb-5 md:mb-20">
          {secondRow.map((illust) => (
            <ProductCard
              illust={illust}
              translate={translateXReverse}
              key={illust.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-6 md:space-x-20 mb-5 md:mb-20">
          {thirdRow.map((illust) => (
            <ProductCard
              illust={illust}
              translate={translateX}
              key={illust.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row space-x-6 md:space-x-20">
          {secondRow.map((illust) => (
            <ProductCard
              illust={illust}
              translate={translateXReverse}
              key={illust.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full  left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-bold">
        AStoryer
        <br />- あすとりや -
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8">TRPG創作投稿サイト</p>
    </div>
  );
};

export const ProductCard = ({
  illust,
  translate,
}: {
  illust: IHomeIllustData;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={illust.title}
      className="group/illust h-32 md:h-96 w-32 md:w-96 relative flex-shrink-0"
    >
      <Link
        href={RouterPath.illust(illust.id)}
        className="block group-hover/illust:shadow-2xl "
      >
        <Mantine.Image
          src={illust.image}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0"
          alt={illust.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/illust:opacity-80 bg-black pointer-events-none transition-all"></div>
      <div className="absolute bottom-4 left-4 opacity-0 group-hover/illust:opacity-100 text-white transition-all">
        <h2 className="text-xl my-3">{illust.title}</h2>
        <div>
          <Link
            href={RouterPath.users(Number(illust.user.id))}
            className="flex justify-start icon-outlined gap-2"
          >
            <Mantine.Avatar
              variant="default"
              radius="xl"
              size="sm"
              alt="icon"
              src={illust.user.avatar}
            />
            <p>{illust.user.name}</p>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
