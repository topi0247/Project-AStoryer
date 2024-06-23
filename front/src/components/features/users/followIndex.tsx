"use client";

import { IIndexFollowData, Tab } from "@/types";
import { FollowUser } from ".";
import { GetFromAPI, useRouter } from "@/lib";
import useSWR from "swr";
import { useEffect } from "react";
import { RouterPath } from "@/settings";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function FollowIndex({
  url,
  userUuid,
}: {
  url: string;
  userUuid: string;
}) {
  const { data, error } = useSWR(url, fetcher);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      if (error.response.status === 401) {
        router.push(RouterPath.follower(userUuid));
      } else {
        router.push(RouterPath.error);
      }
      return;
    }
  }, [error]);

  return (
    <section className="container my-2 m-auto">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-x-2 gap-y-8 mx-2 justify-center items-center">
        {data === undefined ? (
          <>
            {Array.from({ length: 10 }, (_, index) => (
              <FollowUser key={index} />
            ))}
          </>
        ) : (
          data.users?.map(
            ({ user, i }: { user: IIndexFollowData; i: number }) => (
              <>
                <FollowUser key={i} followUser={user} userUuid={userUuid} />
              </>
            )
          )
        )}
      </div>
    </section>
  );
}
