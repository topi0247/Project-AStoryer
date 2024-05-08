"use client";

import * as Mantine from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { FaImage } from "rocketicons/fa";

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

enum PublishRange {
  hidden = "hidden",
  All = "All",
  Draft = "Draft",
  URL = "URL",
  Follower = "Follower",
  Private = "Private",
}

export default function IllustPostPage() {
  const theme = Mantine.useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [postIllust, setPostIllust] = useState<string[]>([] as string[]);
  const [tags, setTags] = useState<string[]>([] as string[]);
  const [publishRange, setPublishRange] = useState<string>(PublishRange.hidden);

  const form = useForm({
    initialValues: {
      postIllust: [],
      title: "",
      caption: "",
      tags: [],
      gameSystem: Number,
      synalioTitle: String,
      publishRange: Number,
    },
    validate: {
      postIllust: (value) => {
        if (!value) {
          return "イラストをアップロードしてください";
        }
      },
      title: (value) => {
        if (!value) {
          return "タイトルを入力してください";
        }
      },
      publishRange: (value) => {
        if (!value) {
          return "公開範囲を選択してください";
        }
      },
    },
  });

  const handleDrop = (files: File[]) => {
    files.map((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPostIllust([...postIllust, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <article className="mt-8 mb-12">
      <Mantine.Container size={"sm"}>
        <Mantine.Box className="bg-white p-4 px-8 rounded">
          <h1 className="text-center font-semibold my-4">イラスト投稿</h1>
          <form className="flex flex-col gap-5">
            <section>
              <label htmlFor="postIllust">イラストアップロード</label>
              <Dropzone
                name="postIllust"
                /*multiple*/ // TODO : 複数投稿は後にする
                onDrop={(files) => handleDrop(files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                style={{
                  height: mobile ? "8rem" : "15rem",
                  width: "auto",
                  margin: "0 auto",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <Dropzone.Idle>
                  {postIllust.length > 0 &&
                    postIllust.map((illust, index) => (
                      <Mantine.Image
                        key={index}
                        src={illust}
                        h={mobile ? "8rem" : "15rem"}
                        w="100%"
                        fit="cover"
                        className="opacity-50"
                      />
                    ))}
                  <FaImage
                    className="icon-black opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      width: "3rem",
                      height: "3rem",
                    }}
                  />
                </Dropzone.Idle>
              </Dropzone>
            </section>
            <section>
              <Mantine.TextInput
                required
                withAsterisk
                label="タイトル"
                name="title"
                {...form.getInputProps("title")}
              />
              {form.errors.title && (
                <span className="text-red-400 text-xs ml-4">
                  {form.errors.title}
                </span>
              )}
            </section>
            <section>
              <Mantine.Textarea
                name="caption"
                label="キャプション"
                size="lg"
                radius="xs"
                {...form.getInputProps("caption")}
              />
            </section>
            <section>
              <Mantine.TagsInput
                name="tags"
                label="タグ"
                splitChars={[" ", "|"]}
                data={Tags.map((tag) => tag.title)}
                onChange={setTags}
                value={tags}
              />
            </section>
            <section className="flex gap-5 flex-col md:flex-row md:items-center md:gap-2 w-full ">
              <div className="md:w-1/3">
                <Mantine.Select
                  name="gameSystem"
                  label="システム"
                  data={GameSystems.map((system) => system.name)}
                  {...form.getInputProps("gameSystem")}
                />
              </div>
              <div className="md:w-2/3">
                <Mantine.Autocomplete
                  name="synalioTitle"
                  label="シナリオ"
                  data={Synalios.map((synalio) => synalio.title)}
                  {...form.getInputProps("synalioTitle")}
                />
              </div>
            </section>
            <section>
              <Mantine.Radio.Group
                name="PublishRange"
                label="公開範囲"
                withAsterisk
                required
                value={publishRange}
                onChange={setPublishRange}
              >
                <Mantine.Group>
                  <Mantine.Radio
                    label="全体公開"
                    value={PublishRange.All}
                    style={{ cursor: "pointer" }}
                  />
                  <Mantine.Radio
                    label="URLを知ってる人"
                    value={PublishRange.URL}
                    style={{ cursor: "pointer" }}
                  />
                  <Mantine.Radio
                    label="フォロワー"
                    value={PublishRange.Follower}
                    style={{ cursor: "pointer" }}
                  />
                  <Mantine.Radio
                    label="非公開"
                    value={PublishRange.Private}
                    style={{ cursor: "pointer" }}
                  />
                </Mantine.Group>
              </Mantine.Radio.Group>
            </section>
            <section className="my-8">
              <Mantine.Group className="flex justify-center items-center">
                <Mantine.Button
                  type="submit"
                  className="bg-green-300 text-black"
                >
                  投稿
                </Mantine.Button>
                <Mantine.Button
                  type="submit"
                  value={PublishRange.Draft}
                  className="bg-slate-500"
                >
                  下書き保存
                </Mantine.Button>
              </Mantine.Group>
            </section>
          </form>
        </Mantine.Box>
      </Mantine.Container>
    </article>
  );
}
