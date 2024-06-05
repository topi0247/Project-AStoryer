"use client";

import { Link } from "@/lib";
import { RouterPath } from "@/settings";
import { Image } from "@mantine/core";
import { useTranslations } from "next-intl";

export default function Error() {
  return (
    <article className="w-full relative mb-8 flex flex-col justify-center items-center gap-8">
      <div className="w-1/2 h-auto object-contain">
        <Image src="/assets/500-InternalServerError.png" />
        <div className="text-end">
          <small>This image is from KawaiiLogos by creator さわらつき</small>
        </div>
      </div>
      <div className="text-center">
        <Link
          href={RouterPath.home}
          className="text-blue-600 underline hover:text-blue-400 transition-all"
        >
          Back to Top
        </Link>
      </div>
    </article>
  );
}
