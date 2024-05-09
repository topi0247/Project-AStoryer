"use client";

import { TransitionsModal } from "@/components/ui";
import { useRouter } from "@/lib";
import { modalOpenState, userState } from "@/recoilState";
import { RouterPath } from "@/settings";
import * as Mantine from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
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
  const [postId, setPostId] = useState<number>(0);
  const setOpenModal = useSetRecoilState(modalOpenState);
  const router = useRouter();
  const user = useRecoilValue(userState);
  const t_PostIllust = useTranslations("PostIllust");
  const t_PostGeneral = useTranslations("PostGeneral");

  const form = useForm({
    initialValues: {
      postIllust: postIllust,
      title: "",
      publishRange: "" as PublishRange,
    },
    validate: {
      postIllust: () => {
        if (postIllust.length === 0) {
          return t_PostIllust("uploadValid");
        }
      },
      title: (value) => {
        if (!value) {
          return t_PostGeneral("titleValid");
        }
      },
      publishRange: (value) => {
        if (!value) {
          return t_PostGeneral("publishValid");
        }
      },
    },
  });

  const handleSubmit = () => {
    // TODO : 投稿処理

    setPostId(1);

    // 投稿・下書きしたらモーダル表示
    setOpenModal(true);
  };

  const handleDrop = (files: File[]) => {
    files.map((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setPostIllust([...postIllust, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleModalClose = () => {
    if (form.values.publishRange !== PublishRange.Draft) {
      router.push(RouterPath.users(user.id));
    }
    setOpenModal(false);
  };

  return (
    <>
      <article className="mt-8 mb-12">
        <Mantine.Container size={"sm"}>
          <Mantine.Box className="bg-white p-4 px-8 rounded">
            <h1 className="text-center font-semibold my-4">
              {t_PostIllust("title")}
            </h1>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.onSubmit(handleSubmit)}
            >
              <section>
                <label htmlFor="postIllust">
                  {t_PostIllust("upload")}
                  <span className="text-red-600">*</span>
                </label>
                <Dropzone
                  name="postIllust"
                  /*multiple*/ // TODO : 複数投稿は後にする
                  onDrop={(files) => handleDrop(files)}
                  maxSize={5 * 1024 ** 2}
                  accept={IMAGE_MIME_TYPE}
                  style={{
                    height: mobile ? "15rem" : "30rem",
                    width: "auto",
                    margin: "0 auto",
                    position: "relative",
                    cursor: "pointer",
                  }}
                  {...form.getInputProps("postIllust")}
                >
                  <Dropzone.Idle>
                    {postIllust.length > 0 &&
                      postIllust.map((illust, index) => (
                        <Mantine.Image
                          key={index}
                          src={illust}
                          h={mobile ? "15rem" : "30rem"}
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
                {form.errors.postIllust && (
                  <p className="text-sm text-red-500">
                    {form.errors.postIllust}
                  </p>
                )}
              </section>
              <section>
                <Mantine.TextInput
                  withAsterisk
                  label={t_PostGeneral("title")}
                  name="title"
                  {...form.getInputProps("title")}
                />
              </section>
              <section>
                <Mantine.Textarea
                  name="caption"
                  label={t_PostGeneral("caption")}
                  size="sm"
                  radius="xs"
                  rows={5}
                  {...form.getInputProps("caption")}
                />
              </section>
              <section>
                <Mantine.TagsInput
                  name="tags"
                  label={t_PostGeneral("tag")}
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
                    label={t_PostGeneral("gameSystem")}
                    data={GameSystems.map((system) => system.name)}
                    {...form.getInputProps("gameSystem")}
                  />
                </div>
                <div className="md:w-2/3">
                  <Mantine.Autocomplete
                    name="synalioTitle"
                    label={t_PostGeneral("synalioTitle")}
                    data={Synalios.map((synalio) => synalio.title)}
                    {...form.getInputProps("synalioTitle")}
                  />
                </div>
              </section>
              <section>
                <Mantine.Radio.Group
                  name="publishRange"
                  label={t_PostGeneral("publishRange")}
                  withAsterisk
                  {...form.getInputProps("publishRange")}
                >
                  <Mantine.Group>
                    <Mantine.Radio
                      label={t_PostGeneral("allPublish")}
                      value={PublishRange.All}
                      style={{ cursor: "pointer" }}
                    />
                    <Mantine.Radio
                      label={t_PostGeneral("urlPublish")}
                      value={PublishRange.URL}
                      style={{ cursor: "pointer" }}
                    />
                    <Mantine.Radio
                      label={t_PostGeneral("followerPublish")}
                      value={PublishRange.Follower}
                      style={{ cursor: "pointer" }}
                    />
                    <Mantine.Radio
                      label={t_PostGeneral("private")}
                      value={PublishRange.Private}
                      style={{ cursor: "pointer" }}
                    />
                  </Mantine.Group>
                </Mantine.Radio.Group>
                <p className="text-sm my-4">
                  {t_PostGeneral("publishAttention")}
                </p>
              </section>
              <section className="my-8">
                <Mantine.Group className="flex justify-center items-center">
                  <Mantine.Button
                    type="submit"
                    className="bg-green-300 text-black hover:bg-green-500 hover:text-black"
                  >
                    {t_PostGeneral("post")}
                  </Mantine.Button>
                  <Mantine.Button
                    type="submit"
                    onClick={() =>
                      form.setValues({ publishRange: PublishRange.Draft })
                    }
                    className="bg-slate-500 hover:bg-slate-800"
                  >
                    {t_PostGeneral("draftSave")}
                  </Mantine.Button>
                </Mantine.Group>
              </section>
            </form>
          </Mantine.Box>
        </Mantine.Container>
      </article>

      <TransitionsModal onClose={handleModalClose}>
        <h3 className="text-xl text-center my-4">
          {form.values.publishRange === PublishRange.Draft
            ? t_PostGeneral("draftSaved")
            : t_PostGeneral("posted")}
        </h3>
        <Mantine.Group justify="center" gap={8}>
          {form.values.publishRange === PublishRange.Draft ? (
            <>
              <Mantine.Button
                className="bg-green-300 text-black"
                onClick={handleModalClose}
              >
                {t_PostGeneral("close")}
              </Mantine.Button>
            </>
          ) : (
            <>
              <Mantine.Button
                className="bg-green-300 text-black"
                onClick={() => router.push(RouterPath.illust(postId))}
              >
                {t_PostGeneral("showPost")}
              </Mantine.Button>
              <Mantine.Button className="bg-black text-white">
                {t_PostGeneral("XShare")}
              </Mantine.Button>
            </>
          )}
        </Mantine.Group>
      </TransitionsModal>
    </>
  );
}
