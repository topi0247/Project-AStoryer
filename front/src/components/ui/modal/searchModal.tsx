"use client";

import * as UI from "@/components/ui";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRouter } from "@/lib";
import * as Mantine from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// 仮データをハードコーディング
const Tags = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  title: `タグ${i}`,
}));

const GameSystems = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  name: `システム${i}`,
}));

const Synalios = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  title: `シナリオ${i}`,
}));

enum SearchType {
  AND = "AND",
  OR = "OR",
}

export default function SearchModal() {
  const t_Search = useTranslations("Search");
  const t_SearchOption = useTranslations("SearchOption");
  const [opened, { open, close }] = useDisclosure(false);
  const [postTitle, setPostTitle] = useState("");
  const [gameSystem, setGameSystem] = useState<string | null>("");
  const [synalioName, setSynalioName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [userName, setUserName] = useState("");
  const [searchType, setSearchType] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle && !gameSystem && !synalioName && !tags.length && !userName)
      return;

    let query = "?";
    // 作品名取得
    if (postTitle) query += `postTitle=${postTitle}`;

    // システムの番号取得
    // TODO : システム名にするか悩む
    if (gameSystem)
      query += getQuery(query, "gameSystem", gameSystem.toString());

    // シナリオ名取得
    if (synalioName) query += getQuery(query, "synalioName", synalioName);

    // タグ取得
    // TODO : 空白削除の処理は未実装
    //if (tags.length >= 1) query += getQuery(query, "tags", tags.join(","));

    // ユーザー名取得
    if (userName) query += getQuery(query, "userName", userName);

    // 検索タイプ取得
    query += getQuery(query, "searchType", searchType);

    close();

    router.push(`/illusts${query}`);
  };

  const getQuery = (query: string, key: string, value: string | number) => {
    return query === "?" ? `${key}=${value}` : `&${key}=${value}`;
  };

  return (
    <>
      <Mantine.Button
        variant="contained"
        className="bg-orange-200 hover:bg-orange-400 text-black transition-all"
        onClick={open}
      >
        {t_Search("detailsSearch")}
      </Mantine.Button>
      <Mantine.Modal
        opened={opened}
        onClose={close}
        size="md"
        title={t_Search("detailsSearch")}
      >
        <form className="flex flex-col gap-4" onSubmit={handleSearch}>
          <Mantine.TextInput
            label={t_SearchOption("postTitle")}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <Mantine.Select
            label={t_SearchOption("gameSystem")}
            onChange={setGameSystem}
            data={GameSystems.map((system) => system.name)}
            value={gameSystem}
          />

          <Mantine.Autocomplete
            label={t_SearchOption("synalio")}
            value={synalioName}
            onChange={setSynalioName}
            data={Synalios.map((synalio) => synalio.title)}
          />

          <Mantine.TagsInput
            label={t_SearchOption("tag")}
            splitChars={[" ", "|"]}
            data={Tags.map((tag) => tag.title)}
            onChange={setTags}
            value={tags}
          />

          <Mantine.TextInput
            label={t_SearchOption("userName")}
            variant="filled"
            onChange={(e) => setUserName(e.target.value)}
          />

          <Mantine.Radio.Group value={searchType} onChange={setSearchType}>
            <Mantine.Group className="flex justify-center items-center">
              <Mantine.Radio
                label={t_SearchOption("andSearch")}
                value={SearchType.AND}
              />
              <Mantine.Radio
                label={t_SearchOption("orSearch")}
                value={SearchType.OR}
              />
            </Mantine.Group>
          </Mantine.Radio.Group>
          <div className="m-auto">
            <Mantine.Button
              variant="contained"
              className="bg-orange-200 hover:bg-orange-400 text-black"
              type="submit"
            >
              {t_SearchOption("search")}
            </Mantine.Button>
          </div>
        </form>
      </Mantine.Modal>
    </>
  );
}
