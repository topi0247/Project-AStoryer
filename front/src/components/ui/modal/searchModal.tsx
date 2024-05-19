"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { GetFromAPI, useRouter } from "@/lib";
import * as Mantine from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useSWR from "swr";
import { RouterPath } from "@/settings";

const fetcherTags = (url: string) => GetFromAPI(url).then((res) => res.data);
const fetcherSynalios = (url: string) =>
  GetFromAPI(url).then((res) => res.data);
const fetcherGameSystems = (url: string) =>
  GetFromAPI(url).then((res) => res.data);

enum SearchType {
  AND = "AND",
  OR = "OR",
}

export default function SearchModal() {
  const { data: Tags, error: errorTags } = useSWR("/tags", fetcherTags);
  const { data: Synalios, error: errorSynalios } = useSWR(
    "/synalios",
    fetcherSynalios
  );
  const { data: GameSystems, error: errorGameSystems } = useSWR(
    "/game_systems",
    fetcherGameSystems
  );
  const t_Search = useTranslations("Search");
  const t_SearchOption = useTranslations("SearchOption");
  const [opened, { open, close }] = useDisclosure(false);
  const [postTitle, setPostTitle] = useState("");
  const [gameSystem, setGameSystem] = useState<string>("");
  const [synalioName, setSynalioName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [userName, setUserName] = useState("");
  const [searchType, setSearchType] = useState<string>("");
  const router = useRouter();

  const getFetcherError = () => {
    return errorTags || errorSynalios || errorGameSystems;
  };

  const disableData = () => {
    return (
      Tags === undefined || Synalios === undefined || GameSystems === undefined
    );
  };

  if (getFetcherError()) return;
  if (disableData()) return;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle && !gameSystem && !synalioName && !tags.length && !userName)
      return;

    // TODO : もっといい方法ありそう
    let query = "";
    // 作品名取得
    if (postTitle) query += `postTitle=${postTitle}`;

    // システムの番号取得
    if (gameSystem)
      query += getQuery(query, "gameSystem", gameSystem.toString());

    // シナリオ名取得
    if (synalioName) query += getQuery(query, "synalioName", synalioName);

    // タグ取得
    if (tags.length >= 1) query += getQuery(query, "tags", tags.join(","));

    // ユーザー名取得
    if (userName) query += getQuery(query, "userName", userName);

    // 検索タイプ取得
    if (searchType) query += getQuery(query, "searchType", searchType);

    close();

    router.push(RouterPath.illustSearch(query));
  };

  const getQuery = (query: string, key: string, value: string | number) => {
    return query === "?" ? `${key}=${value}` : `&${key}=${value}`;
  };

  return (
    <>
      <Mantine.Button
        variant="contained"
        //className="bg-orange-200 hover:bg-orange-400 text-black transition-all"
        className="bg-green-200 hover:bg-green-400 text-black transition-all"
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
            value={postTitle}
          />
          <Mantine.Autocomplete
            label={t_SearchOption("gameSystem")}
            onChange={setGameSystem}
            data={GameSystems}
            value={gameSystem}
          />

          <Mantine.Autocomplete
            label={t_SearchOption("synalio")}
            value={synalioName}
            onChange={setSynalioName}
            data={Synalios}
          />

          <Mantine.TagsInput
            label={t_SearchOption("tag")}
            splitChars={[" ", "|"]}
            data={Tags}
            onChange={setTags}
            value={tags}
          />

          <Mantine.TextInput
            label={t_SearchOption("userName")}
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />

          {/* TODO : OR検索がうまくできないので後回し */}
          {/* <Mantine.Radio.Group value={searchType} onChange={setSearchType}>
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
          </Mantine.Radio.Group> */}
          <div className="m-auto">
            <Mantine.Button
              variant="contained"
              className="bg-green-200 hover:bg-green-400 text-black transition-all"
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
