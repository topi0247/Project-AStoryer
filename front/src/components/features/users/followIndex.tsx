import { IIndexFollowData, Tab } from "@/types";
import { FollowUser } from ".";

export default function FollowIndex({
  uuid,
  url,
  tabType,
}: {
  uuid: string;
  url: string;
  tabType: Tab;
}) {
  const data: IIndexFollowData[] = Array.from({ length: 40 }, (_, index) => ({
    uuid: `uuid-${index}`,
    name: `User ${index}`,
    avatar: `avatar-${index}`,
  }));

  return (
    <section className="container my-2 m-auto">
      <div className="grid grid-cols-4 md:grid-cols-8 gap-x-2 md:gap-x-0 gap-y-8 mx-2 justify-center items-center">
        {data ? (
          data.map((user, i) => <FollowUser key={i} user={user} />)
        ) : (
          <>
            {Array.from({ length: 10 }, (_, index) => (
              <FollowUser key={index} />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
