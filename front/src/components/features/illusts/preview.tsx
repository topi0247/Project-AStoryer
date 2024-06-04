import { IEditIllust } from "@/types";
import * as Mantine from "@mantine/core";
import { IoMdClose } from "rocketicons/io";

export default function Preview({
  image,
  deleteIllust,
  isDelete,
}: {
  image: IEditIllust;
  deleteIllust: () => void;
  isDelete: boolean;
}) {
  return (
    <div className="relative w-full h-full max-h-28 flex justify-center items-center">
      {isDelete && (
        <Mantine.Button
          className="absolute -top-3 -right-3 rounded-full bg-white transition-all h-6 w-6 p-0 border border-red-400 hover:bg-red-400"
          onClick={deleteIllust}
        >
          <IoMdClose className="icon-red-sm p-0" />
        </Mantine.Button>
      )}
      <Mantine.Image
        src={image.body}
        className="object-cover w-full h-full rounded"
      />
    </div>
  );
}
