"use client";

import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as RecoilState from "@/recoilState";
import { IconButtonList, FixedIconButtonList } from "./iconButtonList";
import { MdFavorite, MdOutlineFavoriteBorder, MdShare } from "rocketicons/md";
import { FaBookmark, FaRegBookmark } from "rocketicons/fa";
import { Button } from "@mantine/core";
import { Delete2API, Post2API } from "@/lib";

const FavoriteButton = ({
  state,
  postId,
}: {
  state: boolean;
  postId: number;
}) => {
  const user = useRecoilValue(RecoilState.userState);
  const [favorite, setFavorite] = useState(state);
  const setModalOpen = useSetRecoilState(RecoilState.requireModalOpenState);

  const handleFavorite = async (value: boolean) => {
    if (!user) {
      setModalOpen(true);
      return;
    }

    if (value) {
      const res = await Post2API("/favorites", {
        favorite: { post_id: postId },
      });
      if (res.status != 200 || !res.data.success) return;
    } else {
      const res = await Delete2API(`/favorites/${postId}`);
      if (res.status != 200 || !res.data.success) return;
    }
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
          <MdFavorite className="icon-red-400" />
        </Button>
      ) : (
        <Button
          onClick={() => handleFavorite(true)}
          variant="transparent"
          className="p-0"
        >
          <MdOutlineFavoriteBorder className="icon-gray-500" />
        </Button>
      )}
    </>
  );
};

const BookmarkButton = ({ state }: { state: boolean }) => {
  const user = useRecoilValue(RecoilState.userState);
  const [bookmark, setBookmark] = useState(state);
  const setModalOpen = useSetRecoilState(RecoilState.requireModalOpenState);

  const handleBookmark = (value: boolean) => {
    if (!user) {
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
          <FaBookmark className="icon-sky-500" />
        </Button>
      ) : (
        <Button
          onClick={() => handleBookmark(true)}
          variant="transparent"
          className="p-0"
        >
          <FaRegBookmark className="icon-gray-500" />
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
    <Button onClick={handleShare} variant="transparent" className="p-0">
      <MdShare className="icon-blue-500 p-0" />
    </Button>
  );
};

const GoogleIcon = ({
  onClick,
  message,
}: {
  onClick: () => void;
  message: string;
}) => {
  return (
    <Button variant="outline" onClick={onClick} color="gray" className="px-2">
      <div className="flex justify-center items-center">
        <svg
          className="w-[20px] h-[20px] mr-2"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{ display: "block" }}
        >
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
          ></path>
          <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
          ></path>
          <path
            fill="#FBBC05"
            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
          ></path>
          <path
            fill="#34A853"
            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
          ></path>
          <path fill="none" d="M0 0h48v48H0z"></path>
        </svg>
        <span className="text-xs">{message}</span>
      </div>
    </Button>
  );
};

const DiscordIcon = ({
  onClick,
  message,
}: {
  onClick: () => void;
  message: string;
}) => {
  return (
    <Button variant="outline" onClick={onClick} color="indigo" className="px-2">
      <div className="flex justify-center items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 127.14 96.36"
          className="w-[20px] h-[20px] mr-2"
        >
          <path
            fill="#5865F2"
            d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
          />
        </svg>
        <span className="text-xs">{message}</span>
      </div>
    </Button>
  );
};

export {
  FavoriteButton,
  BookmarkButton,
  ShareButton,
  IconButtonList,
  FixedIconButtonList,
  GoogleIcon,
  DiscordIcon,
};
