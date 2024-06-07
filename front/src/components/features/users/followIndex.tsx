"use client";

import { IIndexFollowData, Tab } from "@/types";
import { FollowUser } from ".";
import { GetFromAPI } from "@/lib";
import useSWR from "swr";

const feature = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function FollowIndex({
  uuid,
  url,
  tabType,
}: {
  uuid: string;
  url: string;
  tabType: Tab;
}) {
  const { data, error } = useSWR(url, feature);

  return (
    <section className="container my-2 m-auto">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-x-2 md:gap-x-0 gap-y-8 mx-2 justify-center items-center">
        {data === undefined ? (
          <>
            {Array.from({ length: 10 }, (_, index) => (
              <FollowUser key={index} />
            ))}
          </>
        ) : (
          data.users.map(
            ({ user, i }: { user: IIndexFollowData; i: number }) => (
              <FollowUser key={i} user={user} />
            )
          )
        )}
      </div>
    </section>
  );
}
