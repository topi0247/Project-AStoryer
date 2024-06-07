import { Link } from "@/lib";
import { RouterPath } from "@/settings";
import { IIndexFollowData } from "@/types";
import * as Mantine from "@mantine/core";

export default function FollowUser({
  user = {
    uuid: "",
    name: "",
    avatar: "",
  },
}: {
  user?: IIndexFollowData;
}) {
  return (
    <div>
      {user.uuid === "" ? (
        <>
          <div className="flex flex-col justify-center items-center gap-2">
            <Mantine.Skeleton width={100} height={100} radius="100%" />
            <Mantine.Skeleton width={50} height={20} />
          </div>
        </>
      ) : (
        <Link
          href={RouterPath.users(user.uuid)}
          className="flex flex-col justify-center items-center"
        >
          <Mantine.Avatar
            variant="default"
            size="xl"
            src={user.avatar}
            alt="avatar"
          />
          <p>{user.name}</p>
        </Link>
      )}
    </div>
  );
}
