"use client";

import * as UI from "@/components/ui";
import * as MUI from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useRouter } from "@/lib";

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
  AND = 0,
  OR = 1,
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  width: "100%",
  maxWidth: "600px",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
  display: "flex",
  flexDirection: "column",
};

export default function SearchModal() {
  const t_Search = useTranslations("Search");
  const t_SearchOption = useTranslations("SearchOption");
  const [open, setOpen] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [gameSystem, setGameSystem] = useState(0);
  const [synalioName, setSynalioName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [userName, setUserName] = useState("");
  const [searchType, setSearchType] = useState(SearchType.AND);
  const router = useRouter();

  const handleSearchButton = () => {
    setOpen(true);
  };

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
    if (tags.length >= 1) query += getQuery(query, "tags", tags.join(","));

    // ユーザー名取得
    if (userName) query += getQuery(query, "userName", userName);

    // 検索タイプ取得
    query += getQuery(query, "searchType", searchType);

    setOpen(false);

    router.push(`/illusts${query}`);
  };

  const getQuery = (query: string, key: string, value: string | number) => {
    return query === "?" ? `${key}=${value}` : `&${key}=${value}`;
  };

  return (
    <>
      <MUI.Button
        variant="contained"
        className="bg-orange-200 hover:bg-orange-400 text-black"
        onClick={handleSearchButton}
      >
        {t_Search("detailsSearch")}
      </MUI.Button>
      <MUI.Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: MUI.Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 300,
          },
        }}
      >
        <MUI.Fade in={open}>
          <MUI.Box sx={style} className="md:top-[45%]">
            <MUI.IconButton
              aria-label="close"
              onClick={() => setOpen(false)}
              className="absolute right-0 top-0"
            >
              <HighlightOffIcon />
            </MUI.IconButton>
            <UI.H2>{t_Search("detailsSearch")}</UI.H2>

            <form className="flex flex-col gap-4" onSubmit={handleSearch}>
              <MUI.TextField
                label={t_SearchOption("postTitle")}
                variant="outlined"
                onChange={(e) => setPostTitle(e.target.value)}
                fullWidth
              />

              <MUI.Select
                label={t_SearchOption("gameSystem")}
                onChange={(e) => setGameSystem(e.target.value as number)}
                defaultValue={0}
                fullWidth
              >
                {GameSystems.map((system) => (
                  <MUI.MenuItem key={system.id} value={system.id}>
                    {system.name}
                  </MUI.MenuItem>
                ))}
              </MUI.Select>

              <MUI.Autocomplete
                options={Synalios.map((synalio) => synalio.title)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <MUI.TextField
                    {...params}
                    label={t_SearchOption("synalio")}
                    placeholder={t_SearchOption("synalio")}
                  />
                )}
                fullWidth
                onInputChange={(e, value) => setSynalioName(value)}
                freeSolo
                value={synalioName}
                onChange={(_, value) => setSynalioName(value || "")}
              />

              <MUI.Autocomplete
                multiple
                options={Tags.map((tag) => tag.title)}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <MUI.TextField
                    {...params}
                    label={t_SearchOption("tag")}
                    placeholder={t_SearchOption("tag")}
                  />
                )}
                fullWidth
                onChange={(_, value) => setTags(value)}
                freeSolo
                value={tags}
              />

              <MUI.TextField
                label={t_SearchOption("userName")}
                variant="outlined"
                onChange={(e) => setUserName(e.target.value)}
                fullWidth
              />

              <MUI.RadioGroup
                row
                defaultValue={SearchType.AND}
                onChange={(e) => setSearchType(parseInt(e.target.value))}
                value={searchType}
                className="flex justify-center items-center gap-3"
              >
                <MUI.FormControlLabel
                  value={SearchType.AND}
                  control={<MUI.Radio />}
                  label={t_SearchOption("andSearch")}
                />
                <MUI.FormControlLabel
                  value={SearchType.OR}
                  control={<MUI.Radio />}
                  label={t_SearchOption("orSearch")}
                />
              </MUI.RadioGroup>
              <div className="m-auto">
                <MUI.Button
                  variant="contained"
                  className="bg-orange-200 hover:bg-orange-400 text-black"
                  type="submit"
                >
                  {t_SearchOption("search")}
                </MUI.Button>
              </div>
            </form>
          </MUI.Box>
        </MUI.Fade>
      </MUI.Modal>
    </>
  );
}
