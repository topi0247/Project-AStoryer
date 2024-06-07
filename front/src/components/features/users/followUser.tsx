import { Link } from "@/lib";
import { RouterPath } from "@/settings";
import { IIndexFollowData } from "@/types";
import * as Mantine from "@mantine/core";

export default function FollowUser({ user }: { user: IIndexFollowData }) {
  return (
    <div>
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
    </div>
  );
}
