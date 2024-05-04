"use client";

import { useState } from "react";
import { useSetRecoilState } from "recoil";
import * as RecoilState from "@/recoilState";
import { IconButtonList, FixedIconButtonList } from "./iconButtonList";
import { MdFavorite, MdOutlineFavoriteBorder, MdShare } from "react-icons/md";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Button } from "@mantine/core";

const FavoriteButton = ({ state }: { state: boolean }) => {
  const [favorite, setFavorite] = useState(state);
  const setModalOpen = useSetRecoilState(RecoilState.modalOpenState);

  const handleFavorite = (value: boolean) => {
    // TODO : ログインユーザーでなければログインや登録を促す
    setModalOpen(true);
    return;

    // TODO : いいねの更新処理
    setFavorite(!favorite);
  };

  return (
    <>
      {favorite ? (
        <Button
          onClick={() => handleFavorite(false)}
          variant="transparent"
          color="pink"
        >
          <MdFavorite />
        </Button>
      ) : (
        <Button
          onClick={() => handleFavorite(true)}
          variant="transparent"
          color="gray"
        >
          <MdOutlineFavoriteBorder />
        </Button>
      )}
    </>
  );
};

const BookmarkButton = ({ state }: { state: boolean }) => {
  const [bookmark, setBookmark] = useState(state);
  const setModalOpen = useSetRecoilState(RecoilState.modalOpenState);

  const handleBookmark = (value: boolean) => {
    // TODO : ログインユーザーでなければログインや登録を促す
    setModalOpen(true);
    return;

    // TODO : ブックマークの更新処理
    setBookmark(!bookmark);
  };

  return (
    <>
      {bookmark ? (
        <Button onClick={() => setBookmark(false)} variant="transparent">
          <FaBookmark />
        </Button>
      ) : (
        <Button
          onClick={() => setBookmark(true)}
          variant="transparent"
          color="gray"
        >
          <FaRegBookmark />
        </Button>
      )}
    </>
  );
};

const ShareButton = () => {
  const handleShare = () => {
    // TODO : シェアの処理
  };

  return (
    <Button onClick={handleShare} variant="transparent">
      <MdShare />
    </Button>
  );
};

export {
  FavoriteButton,
  BookmarkButton,
  ShareButton,
  IconButtonList,
  FixedIconButtonList,
};
