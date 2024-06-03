"use client";

import { XShare } from "@/components/features/illusts";
import { GetFromAPI, Post2API, useRouter } from "@/lib";
import { userState } from "@/recoilState";
import { RouterPath } from "@/settings";
import { IPublicState } from "@/types";
import * as Mantine from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { FaImage } from "rocketicons/fa";
import { IoMdClose } from "rocketicons/io";
import useSWR from "swr";

const fetcherTags = (url: string) => GetFromAPI(url).then((res) => res.data);
const fetcherSynalios = (url: string) =>
  GetFromAPI(url).then((res) => res.data);
const fetcherGameSystems = (url: string) =>
  GetFromAPI(url).then((res) => res.data);

export default function IllustPostPage() {
  const { data: Tags, error: errorTags } = useSWR("/tags", fetcherTags);
  const { data: Synalios, error: errorSynalios } = useSWR(
    "/synalios",
    fetcherSynalios
  );
  const { data: GameSystems, error: errorGameSystems } = useSWR(
    "/game_systems",
    fetcherGameSystems
  );
  const theme = Mantine.useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [tags, setTags] = useState<string[]>([]);
  const [postUuid, setPostUuid] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const user = useRecoilValue(userState);
  const t_PostIllust = useTranslations("PostIllust");
  const t_PostGeneral = useTranslations("PostGeneral");
  const TITLE_MAX_LENGTH = 20;
  const CAPTION_MAX_LENGTH = 10000;
  const MEGA_BITE = 1024 ** 2;
  const MAX_SIZE = 10 * MEGA_BITE;
  const MAX_COUNT = 12;

  const form = useForm({
    initialValues: {
      postIllust: [] as string[],
      title: "",
      caption: "",
      publishRange: "" as IPublicState,
      synalioTitle: "",
      gameSystem: "",
    },
    validate: {
      postIllust: (value) => {
        if (value.length === 0) {
          return t_PostIllust("uploadValid");
        } else if (value.length > MAX_COUNT) {
          return t_PostIllust("countValid");
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

  const getFetcherError = () => {
    return errorTags || errorSynalios || errorGameSystems;
  };

  const disableData = () => {
    return (
      Tags === undefined || Synalios === undefined || GameSystems === undefined
    );
  };

  if (getFetcherError()) return <div>error</div>;
  if (disableData()) return <div>Now Loading</div>;

  const handleSubmit = async () => {
    const {
      title,
      postIllust,
      caption,
      publishRange,
      synalioTitle,
      gameSystem,
    } = form.getValues();
    const post = {
      post: {
        postable_attributes: postIllust,
        title,
        caption,
        tags,
        publish_state: publishRange,
        postable_type: "Illust",
        synalios: [synalioTitle],
        game_systems: [gameSystem],
      },
    };
    setErrorMessage("");
    try {
      const res = await Post2API("/posts", JSON.stringify(post)).then(
        (res) => res
      );
      if (res.status != 201) {
        const state = publishRange === IPublicState.Draft ? "保存" : "投稿";
        setErrorMessage(`${state}に失敗しました`);
        return;
      }

      setPostUuid(res.data.uuid);
    } catch (e) {
      const state = publishRange === IPublicState.Draft ? "保存" : "投稿";
      setErrorMessage(`${state}に失敗しました`);
    } finally {
      setModalOpen(true);
    }
  };

  const handleDrop = (files: File[]) => {
    const postIllust = form.values.postIllust;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          postIllust.push(e.target.result as string);
          form.setValues({ postIllust: postIllust });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    if (errorMessage === "") {
      router.push(RouterPath.users(user.uuid));
    }
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
                <p className="text-sm">{t_PostIllust("maxSize")}</p>
                <p className="text-sm">{t_PostIllust("maxCount")}</p>
                {form.getValues().postIllust.length === 0 ? (
                  <Dropzone
                    name="postIllust"
                    multiple
                    onDrop={(files) => handleDrop(files)}
                    maxSize={MAX_SIZE}
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
                      <FaImage
                        className="icon-black opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          width: "3rem",
                          height: "3rem",
                        }}
                      />
                    </Dropzone.Idle>
                  </Dropzone>
                ) : (
                  <div className="w-full bg-slate-400 p-5 rounded grid grid-cols-2 gap-4 md:grid-cols-4">
                    {form
                      .getValues()
                      .postIllust.map((image: string, i: number) => (
                        <div
                          className="relative w-full h-full max-h-28 flex justify-center items-center"
                          key={i}
                        >
                          <Mantine.Button
                            className="absolute -top-3 -right-3 rounded-full bg-white transition-all h-6 w-6 p-0 border border-red-400 hover:bg-red-400"
                            onClick={() => {
                              let postIllust = form.getValues().postIllust;
                              postIllust.splice(i, 1);
                              form.setValues({ postIllust: postIllust });
                            }}
                          >
                            <IoMdClose className="icon-red-sm p-0" />
                          </Mantine.Button>
                          <Mantine.Image
                            src={image}
                            key={i}
                            className="object-cover w-full h-full rounded"
                          />
                        </div>
                      ))}
                    {form.getValues().postIllust.length < MAX_COUNT && (
                      <Dropzone
                        name="postIllust"
                        multiple
                        onDrop={(files) => handleDrop(files)}
                        maxSize={MAX_SIZE}
                        accept={IMAGE_MIME_TYPE}
                        style={{
                          position: "relative",
                          cursor: "pointer",
                          borderRadius: "4px",
                          height: "110px",
                          border: "2px dashed rgb(148 163 184)",
                        }}
                        {...form.getInputProps("postIllust")}
                      >
                        <Dropzone.Idle>
                          <FaImage
                            className="icon-black opacity-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            style={{
                              width: "3rem",
                              height: "3rem",
                            }}
                          />
                        </Dropzone.Idle>
                      </Dropzone>
                    )}
                  </div>
                )}
                {form.errors.postIllust && (
                  <p className="text-sm text-red-500">
                    {form.errors.postIllust}
                  </p>
                )}
              </section>
              <section>
                <Mantine.TextInput
                  withAsterisk
                  maxLength={TITLE_MAX_LENGTH}
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
                  maxLength={CAPTION_MAX_LENGTH}
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
                  <Mantine.Autocomplete
                    name="gameSystem"
                    label={t_PostGeneral("gameSystem")}
                    data={GameSystems}
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
                    {/* <Mantine.Radio
                      label={t_PostGeneral("followerPublish")}
                      value={IPublicState.Follower}
                      style={{ cursor: "pointer" }}
                    /> */}
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
                    onClick={() => router.push(RouterPath.illust(postUuid))}
                  >
                    {t_PostGeneral("showPost")}
                  </Mantine.Button>
                  <XShare postUuid={postUuid} title={form.getValues().title} />
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
