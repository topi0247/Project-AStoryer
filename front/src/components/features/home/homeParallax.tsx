"use client";
import React from "react";
import * as FramerMotion from "framer-motion";
import * as Mantine from "@mantine/core";
import { Link } from "@/lib";
import { RouterPath } from "@/settings";
import { IHomeIllustData } from "@/types";
import { useMediaQuery } from "@mantine/hooks";

export const HomeParallax = ({ illusts }: { illusts: IHomeIllustData[] }) => {
  const firstRow = illusts.slice(0, 5);
  const secondRow = illusts.slice(5, 10);
  const thirdRow = illusts.slice(10, 15);
  const fourRow = illusts.slice(15, 20);
  const ref = React.useRef(null);
  const { scrollYProgress } = FramerMotion.useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const theme = Mantine.useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = FramerMotion.useSpring(
    FramerMotion.useTransform(scrollYProgress, [0, 1], [0, 250]),
    springConfig
  );
  const translateXReverse = FramerMotion.useSpring(
    FramerMotion.useTransform(scrollYProgress, [0, 1], [0, -250]),
    springConfig
  );
  const rotateX = FramerMotion.useSpring(
    FramerMotion.useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = FramerMotion.useSpring(
    FramerMotion.useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = FramerMotion.useSpring(
    FramerMotion.useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = FramerMotion.useSpring(
    FramerMotion.useTransform(
      scrollYProgress,
      [0, 0.2],
      [mobile ? -500 : -1000, mobile ? 50 : 500]
    ),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="md:h-[325vh] py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <FramerMotion.motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <FramerMotion.motion.div className="flex flex-row-reverse space-x-reverse space-x-6 md:space-x-20 mb-5 md:mb-20">
          {firstRow.map((illust) => (
            <IllustCard
              illust={illust}
              translate={translateX}
              key={illust.uuid}
            />
          ))}
        </FramerMotion.motion.div>
        <FramerMotion.motion.div className="flex flex-row space-x-6 md:space-x-10 mb-5 md:mb-10">
          {secondRow.map((illust) => (
            <IllustCard
              illust={illust}
              translate={translateXReverse}
              key={illust.uuid}
            />
          ))}
        </FramerMotion.motion.div>
        <FramerMotion.motion.div className="flex flex-row-reverse space-x-reverse space-x-6 md:space-x-10 mb-5 md:mb-20">
          {thirdRow.map((illust) => (
            <IllustCard
              illust={illust}
              translate={translateX}
              key={illust.uuid}
            />
          ))}
        </FramerMotion.motion.div>
        <FramerMotion.motion.div className="flex flex-row space-x-6 md:space-x-10">
          {fourRow.map((illust) => (
            <IllustCard
              illust={illust}
              translate={translateXReverse}
              key={illust.uuid}
            />
          ))}
        </FramerMotion.motion.div>
      </FramerMotion.motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto py-20 md:py-40 px-4 w-full left-0 top-0 z-10">
      <div className="flex flex-col justify-center items-start">
        <h1>
          <Mantine.Image src="/assets/AppLogo.png" />
        </h1>
      </div>
      <p className="max-w-2xl text-base md:text-xl mt-8">
        <span className="border-b-2 border-green-300 px-2">
          TRPG創作投稿サイト
        </span>
      </p>
    </div>
  );
};

export const IllustCard = ({
  illust,
  translate,
}: {
  illust: IHomeIllustData;
  translate: FramerMotion.MotionValue<number>;
}) => {
  return (
    <FramerMotion.motion.div
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
        href={RouterPath.illust(illust.uuid)}
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
            href={RouterPath.users(illust.user.uuid)}
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
    </FramerMotion.motion.div>
  );
};
