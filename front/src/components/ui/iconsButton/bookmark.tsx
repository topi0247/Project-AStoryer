import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as RecoilState from "@/recoilState";
import { Button } from "@mantine/core";
import { FaBookmark, FaRegBookmark } from "rocketicons/fa";

export default function BookmarkButton({ postUuid }: { postUuid: string }) {
  const user = useRecoilValue(RecoilState.userState);
  const [bookmark, setBookmark] = useState(false);
  const setModalOpen = useSetRecoilState(RecoilState.requireModalOpenState);

  const handleBookmark = (value: boolean) => {
    if (user.uuid === "") {
      setModalOpen(true);
      return;
    }

    // TODO : ブックマークの更新処理
    setBookmark(!bookmark);
  };

  return (
    <>
      {bookmark ? (
        <Button
          onClick={() => handleBookmark(false)}
          variant="transparent"
          className="p-0"
        >
          <FaBookmark className="icon-sky-xl" />
        </Button>
      ) : (
        <Button
          onClick={() => handleBookmark(true)}
          variant="transparent"
          className="p-0"
        >
          <FaRegBookmark className="icon-gray-xl" />
        </Button>
      )}
    </>
  );
}
