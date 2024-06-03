"use client";

import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as RecoilState from "@/recoilState";
import { Button } from "@mantine/core";
import { FaBookmark, FaRegBookmark } from "rocketicons/fa";
import { Delete2API, GetFromAPI, Post2API } from "@/lib";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function BookmarkButton({
  postUuid,
  postUserUuid,
}: {
  postUuid: string;
  postUserUuid: string;
}) {
  const { data, error } = useSWR(`/bookmarks/${postUuid}`, fetcher);
  const user = useRecoilValue(RecoilState.userState);
  const [bookmark, setBookmark] = useState(false);
  const setModalOpen = useSetRecoilState(RecoilState.requireModalOpenState);

  useEffect(() => {
    if (data) {
      setBookmark(data.isBookmark);
    }
  }, [data]);

  if (!data || error) return;

  const handleBookmark = async (value: boolean) => {
    if (user.uuid === "") {
      setModalOpen(true);
      return;
    }

    if (value) {
      const res = await Post2API("/bookmarks", {
        bookmark: { post_uuid: postUuid },
      });
      if (res.status != 200 || !res.data.success) return;
    } else {
      const res = await Delete2API(`/bookmarks/${postUuid}`);
      if (res.status != 200 || !res.data.success) return;
    }
    mutate(`/bookmarks/${postUuid}`);
    setBookmark(value);
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
