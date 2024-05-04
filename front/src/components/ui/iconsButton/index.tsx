"use client";

import { useState } from "react";
import { useSetRecoilState } from "recoil";
import * as RecoilState from "@/recoilState";
import { IconButtonList, FixedIconButtonList } from "./iconButtonList";

const FavoriteButton = ({ state }: { state: boolean }) => {
  const [favorite, setFavorite] = useState(state);
  const setModalOpen = useSetRecoilState(RecoilState.modalOpenState);

  const handleFavorite = () => {
    // TODO : ログインユーザーでなければログインや登録を促す
    setModalOpen(true);
    return;

    // TODO : いいねの更新処理
    setFavorite(!favorite);
  };

  return (
    <>
      <IconButton size="medium" onClick={handleFavorite}>
        {favorite ? (
          <MUI_ICON.Favorite className="text-red-500" />
        ) : (
          <MUI_ICON.FavoriteBorder className="text-gray-400" />
        )}
      </IconButton>
    </>
  );
};

const BookmarkButton = ({ state }: { state: boolean }) => {
  const [bookmark, setBookmark] = useState(state);
  const setModalOpen = useSetRecoilState(RecoilState.modalOpenState);

  const handleBookmark = () => {
    // TODO : ログインユーザーでなければログインや登録を促す
    setModalOpen(true);
    return;

    // TODO : ブックマークの更新処理
    setBookmark(!bookmark);
  };

  return (
    <IconButton size="medium" onClick={handleBookmark}>
      {bookmark ? (
        <MUI_ICON.Bookmark className="text-orange-400" />
      ) : (
        <MUI_ICON.BookmarkBorder className="text-gray-400" />
      )}
    </IconButton>
  );
};

const ShareButton = () => {
  const handleShare = () => {
    // TODO : シェアの処理
  };

  return (
    <IconButton size="medium" onClick={handleShare}>
      <MUI_ICON.Share className="text-blue-400" />
    </IconButton>
  );
};

export {
  FavoriteButton,
  BookmarkButton,
  ShareButton,
  IconButtonList,
  FixedIconButtonList,
};
