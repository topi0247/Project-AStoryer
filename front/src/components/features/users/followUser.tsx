"use client";

import { Delete2API, Link, Post2API } from "@/lib";
import { userState } from "@/recoilState";
import { RouterPath } from "@/settings";
import { IIndexFollowData, IUser } from "@/types";
import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function FollowUser({
  followUser = {
    uuid: "",
    name: "",
    avatar: "",
    isFollowing: false,
  },
  userUuid,
}: {
  followUser?: IIndexFollowData;
  userUuid?: string;
}) {
  const [user, setUser] = useRecoilState(userState);
  const [follow, setFollow] = useState(followUser.isFollowing);
  const t_ShowPost = useTranslations("ShowPost");

  const handleFollow = async () => {
    try {
      if (follow) {
        const res = await Delete2API(`users/${followUser.uuid}/relationship`);
        if (res.status === 204) {
          setFollow(false);
          setUser((prevUser: IUser) => ({
            ...prevUser,
            following_count: prevUser.following_count - 1,
          }));
        }
      } else {
        const res = await Post2API(`users/${followUser.uuid}/relationship`, {
          user_uuid: followUser.uuid,
        });
        if (res.status === 201) {
          setFollow(true);
          setUser((prevUser: IUser) => ({
            ...prevUser,
            following_count: prevUser.following_count + 1,
          }));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {followUser.uuid === "" ? (
        <>
          <div className="flex flex-col justify-center items-center gap-2">
            <Mantine.Skeleton width={100} height={100} radius="100%" />
            <Mantine.Skeleton width={50} height={20} />
          </div>
        </>
      ) : (
        <>
          <Link
            href={RouterPath.users(followUser.uuid)}
            className="flex flex-col justify-center items-center"
          >
            <Mantine.Avatar
              variant="default"
              size="xl"
              src={followUser.avatar}
              alt="avatar"
            />
            <p>{followUser.name}</p>
          </Link>
          {user.uuid === userUuid && (
            <div className="w-full flex flex-col gap-2 justify-center items-center">
              {follow ? (
                <Mantine.Button
                  variant="outline"
                  size="xs"
                  onClick={handleFollow}
                  className="w-full"
                >
                  {t_ShowPost("unFollow")}
                </Mantine.Button>
              ) : (
                <Mantine.Button
                  variant="contained"
                  size="xs"
                  onClick={handleFollow}
                  className="w-full"
                >
                  {t_ShowPost("follow")}
                </Mantine.Button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
