"use client";

import { Delete2API, GetFromAPI, Post2API } from "@/lib";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useSWR, { mutate } from "swr";
import * as RecoilState from "@/recoilState";
import { Button } from "@mantine/core";
import { MdFavorite, MdOutlineFavoriteBorder } from "rocketicons/md";

const fetcherFavorite = (url: string) =>
  GetFromAPI(url).then((res) => res.data);

export default function FavoriteButton({ postUuid }: { postUuid: string }) {
  const { data, error } = useSWR(`/favorites/${postUuid}`, fetcherFavorite);
  const user = useRecoilValue(RecoilState.userState);
  const [favorite, setFavorite] = useState(false);
  const setModalOpen = useSetRecoilState(RecoilState.requireModalOpenState);

  useEffect(() => {
    if (data) {
      setFavorite(data.isFavorite);
    }
  }, [data]);

  if (!data || error) return;
  if (data.post_user_uuid === user.uuid) return;

  const handleFavorite = async (value: boolean) => {
    if (user.uuid === "") {
      setModalOpen(true);
      return;
    }

    if (value) {
      const res = await Post2API("/favorites", {
        favorite: { post_uuid: postUuid },
      });
      if (res.status != 200 || !res.data.success) return;
    } else {
      const res = await Delete2API(`/favorites/${postUuid}`);
      if (res.status != 200 || !res.data.success) return;
    }
    mutate(`/favorites/${postUuid}`);
    setFavorite(value);
  };

  return (
    <>
      {favorite ? (
        <Button
          onClick={() => handleFavorite(false)}
          variant="transparent"
          color="pink"
          className="p-0"
        >
          <MdFavorite className="icon-red-xl" />
        </Button>
      ) : (
        <Button
          onClick={() => handleFavorite(true)}
          variant="transparent"
          className="p-0"
        >
          <MdOutlineFavoriteBorder className="icon-gray-xl" />
        </Button>
      )}
    </>
  );
}
