import { Link } from "@/lib";
import { IndexIllustData } from "@/types";
import Image from "next/image";
import CollectionsIcon from "@mui/icons-material/Collections";

export default function Illust({ illust }: { illust: IndexIllustData }) {
  return (
    <section>
      <Link href={`/illusts/${illust.id}`} className="relative z-0">
        <Image
          src={illust.image}
          loading="lazy"
          width={400}
          height={400}
          alt="Slider Image"
          className="aspect-square object-cover z-10"
        />
        {illust.count > 1 && (
          <CollectionsIcon className="absolute bottom-2 right-2 text-white" />
        )}
      </Link>
      <div className="mt-2 flex justify-start items-center gap-3">
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
    </section>
  );
}
