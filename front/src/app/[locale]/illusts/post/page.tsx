"use client";

import { GetFromAPI, Post2API, useRouter } from "@/lib";
import { userState } from "@/recoilState";
import { RouterPath } from "@/settings";
import { IPublicState } from "@/types";
import * as Mantine from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { FaImage } from "rocketicons/fa";
import useSWR from "swr";

const GameSystems = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  name: `システム${i}`,
}));

const Synalios = Array.from({ length: 50 }).map((_, i) => ({
  id: i,
  title: `シナリオ${i}`,
}));

const fetcherTags = (url: string) => GetFromAPI(url).then((res) => res.data);
const fetcherSynalios = (url: string) =>
  GetFromAPI(url).then((res) => res.data);

export default function IllustPostPage() {
  const { data: Tags, error: errorTags } = useSWR("/tags", fetcherTags);
  const { data: Synalios, error: errorSynalios } = useSWR(
    "/synalios",
    fetcherSynalios
  );
  const theme = Mantine.useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [postIllust, setPostIllust] = useState<string[]>([]);
  const [tagData, setTagData] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [synalioData, setSynalioData] = useState<string[]>([]);
  const [postId, setPostId] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const user = useRecoilValue(userState);
  const t_PostIllust = useTranslations("PostIllust");
  const t_PostGeneral = useTranslations("PostGeneral");
  const TITLE_MAX_LENGTH = 20;
  const CAPTION_MAX_LENGTH = 10000;

  useEffect(() => {
    if (!Tags) return;
    setTagData(Tags);
  }, [tagData]);

  useEffect(() => {
    if (!Synalios) return;
    setSynalioData(Synalios);
  }, [synalioData]);

  const form = useForm({
    initialValues: {
      postIllust: postIllust,
      title: "",
      caption: "",
      publishRange: "" as IPublicState,
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
        } else if (value.length > TITLE_MAX_LENGTH) {
          return "タイトルは20文字以下です";
        }
      },
      caption: (value) => {
        if (value.length > CAPTION_MAX_LENGTH) {
          return "キャプションは10000文字以下です。";
        }
      },
      publishRange: (value) => {
        if (!value) {
          return t_PostGeneral("publishValid");
        }
      },
    },
  });

  if (errorTags) return <div>error</div>;
  if (Tags === undefined) return <div>Now Loading</div>;

  const handleSubmit = async () => {
    const { title, caption, publishRange } = form.getValues();
    const post = {
      post: {
        title,
        caption,
        tags,
        publish_state: publishRange,
        postable_type: "Illust",
        postable_attributes: postIllust,
      },
    };

    try {
      const res = await Post2API("/posts", JSON.stringify(post));

      if (res.status != 201) {
        const state = publishRange === IPublicState.Draft ? "保存" : "投稿";
        setErrorMessage(`${state}に失敗しました`);
        return;
      }

      setPostId(res.data.id);
    } catch (e) {
      console.error(e);
    } finally {
      setModalOpen(true);
    }
  };

  const handleDrop = (files: File[]) => {
    // TODO : 一枚のみ対応、後々複数枚対応する
    const reader = new FileReader();
    reader.onload = () => {
      setPostIllust([reader.result as string]);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleModalClose = () => {
    if (errorMessage === "") {
      router.push(RouterPath.users(user.id));
    }
    setModalOpen(false);
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
                    {postIllust.length > 0 && (
                      <Mantine.Image
                        src={postIllust[0]}
                        h={mobile ? "15rem" : "30rem"}
                        w="auto"
                        m="auto"
                        fit="cover"
                        className="opacity-50"
                      />
                    )}
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
                  data={Tags}
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
                    data={Synalios}
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
                      value={IPublicState.All}
                      style={{ cursor: "pointer" }}
                    />
                    <Mantine.Radio
                      label={t_PostGeneral("urlPublish")}
                      value={IPublicState.URL}
                      style={{ cursor: "pointer" }}
                    />
                    <Mantine.Radio
                      label={t_PostGeneral("followerPublish")}
                      value={IPublicState.Follower}
                      style={{ cursor: "pointer" }}
                    />
                    <Mantine.Radio
                      label={t_PostGeneral("private")}
                      value={IPublicState.Private}
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
                    className="bg-green-300 text-black hover:bg-green-500 hover:text-black transition-all"
                  >
                    {t_PostGeneral("post")}
                  </Mantine.Button>
                  <Mantine.Button
                    type="submit"
                    onClick={() =>
                      form.setValues({ publishRange: IPublicState.Draft })
                    }
                    className="bg-slate-500 hover:bg-slate-800 transition-all"
                  >
                    {t_PostGeneral("draftSave")}
                  </Mantine.Button>
                </Mantine.Group>
              </section>
            </form>
          </Mantine.Box>
        </Mantine.Container>
      </article>

      <Mantine.Modal opened={modalOpen} onClose={handleModalClose}>
        {errorMessage === "" ? (
          <>
            <h3 className="text-xl text-center my-4">
              {form.values.publishRange === IPublicState.Draft
                ? t_PostGeneral("draftSaved")
                : t_PostGeneral("posted")}
            </h3>
            <Mantine.Group justify="center" gap={8}>
              {form.values.publishRange === IPublicState.Draft ? (
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
          </>
        ) : (
          <p className="text-center">{errorMessage}</p>
        )}
      </Mantine.Modal>
    </>
  );
}
