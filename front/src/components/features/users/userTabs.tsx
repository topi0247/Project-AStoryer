"use client";
import { useEffect, useState } from "react";
import * as Mantine from "@mantine/core";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib";
import { RouterPath } from "@/settings";

enum Tab {
  post = "post",
  bookmark = "bookmark",
}

export default function UserTabs({
  userUuid,
  isBookmark,
  setIsBookmark,
}: {
  userUuid: string;
  isBookmark: boolean;
  setIsBookmark: (value: boolean) => void;
}) {
  const [value, setValue] = useState<string | null>(
    isBookmark ? Tab.bookmark : Tab.post
  );
  const t_UserPage = useTranslations("UserPage");
  const router = useRouter();

  useEffect(() => {
    setValue(isBookmark ? Tab.bookmark : Tab.post);
  }, [isBookmark]);

  const handleChange = (newValue: string | null) => {
    if (newValue === value) return;

    switch (newValue) {
      case Tab.post:
        router.push(RouterPath.users(userUuid), { scroll: false });
        setValue(Tab.post);
        setIsBookmark(false);
        break;
      case Tab.bookmark:
        router.push(RouterPath.bookmark(userUuid), { scroll: false });
        setValue(Tab.bookmark);
        setIsBookmark(true);
        break;
      default:
        router.push(RouterPath.users(userUuid), { scroll: false });
        setValue(Tab.post);
        setIsBookmark(false);
        break;
    }
  };

  return (
    <Mantine.Tabs value={value} onChange={handleChange} color="rgb(74 222 128)">
      <Mantine.Tabs.List aria-label="一覧切り替え">
        <Mantine.Tabs.Tab value={Tab.post} className="transition-all">
          {t_UserPage("post")}
        </Mantine.Tabs.Tab>
        <Mantine.Tabs.Tab value={Tab.bookmark} className="transition-all">
          {t_UserPage("bookmark")}
        </Mantine.Tabs.Tab>
      </Mantine.Tabs.List>
    </Mantine.Tabs>
  );
}
