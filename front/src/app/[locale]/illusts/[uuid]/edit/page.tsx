"use client";

import { Delete2API, GetFromAPI, Put2API, useRouter } from "@/lib";
import { userState } from "@/recoilState";
import { RouterPath } from "@/settings";
import { IEditIllust, IEditIllustData, IPublicState } from "@/types";
import * as Mantine from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FaImage } from "rocketicons/fa";
import useSWR, { mutate } from "swr";
import { XShare } from "@/components/features/illusts";
import { IoMdClose } from "rocketicons/io";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

const fetcherTags = (url: string) => GetFromAPI(url).then((res) => res.data);

const fetcherSynalios = (url: string) =>
  GetFromAPI(url).then((res) => res.data);

const fetcherGameSystems = (url: string) =>
  GetFromAPI(url).then((res) => res.data);

export default function IllustEditPage({
  params,
}: {
  params: { uuid: string };
}) {
  const { uuid } = params;
  const { data, error } = useSWR(`/posts/${uuid}/edit`, fetcher);
  const illustData = data
    ? ({
        title: data.title,
        caption: data.caption,
        publish_state: data.publish_state,
        image: data.data,
        tags: data.tags,
        synalio: data.synalio,
        game_system: data.game_systems,
      } as IEditIllustData)
    : ({} as IEditIllustData);
  const { data: Tags, error: errorTags } = useSWR("/tags", fetcherTags);
  const { data: Synalios, error: errorSynalios } = useSWR(
    "/synalios",
    fetcherSynalios
  );
  const { data: GameSystems, error: errorGameSystems } = useSWR(
    "/game_systems",
    fetcherGameSystems
  );
  const [postIllust, setPostIllust] = useState<IEditIllust[]>([]);
  const [isInitialSetIllust, setIsInitialSetIllust] = useState<boolean>(false);
  const theme = Mantine.useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const router = useRouter();
  const user = useRecoilValue(userState);
  const t_PostIllustEdit = useTranslations("PostIllustEdit");
  const t_PostGeneral = useTranslations("PostGeneral");
  const t_General = useTranslations("General");
  const t_EditGeneral = useTranslations("EditGeneral");
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] =
    useState<boolean>(false);
  const [deleteConfirmationError, setDeleteConfirmationError] =
    useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const TITLE_MAX_LENGTH = 20;
  const CAPTION_MAX_LENGTH = 10000;
  const MEGA_BITE = 1024 ** 2;
  const MAX_SIZE = 10 * MEGA_BITE;
  const MAX_COUNT = 12;

  const form = useForm({
    initialValues: {
      postIllust: illustData?.image || [],
      title: illustData?.title || "",
      caption: illustData?.caption || "",
      publishRange: illustData?.publish_state || "",
      synalioTitle: illustData?.synalio || "",
      gameSystem: illustData?.game_system || "",
      tags: illustData?.tags || [],
    },
    validate: {
      postIllust: (value: IEditIllust[]) => {
        if (value.length === 0) {
          return t_PostIllustEdit("uploadValid");
        } else if (value.length > MAX_COUNT) {
          return t_PostIllustEdit("countValid");
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

  useEffect(() => {
    if (isInitialSetIllust || illustData.image === undefined) {
      return;
    }
    const illusts = illustData.image?.map((image: IEditIllust) => {
      return { body: image.body, position: image.position };
    });
    setPostIllust(illusts ?? []);
    setTags(illustData.tags ?? []);
    form.setValues({
      postIllust: illustData.image ?? [],
      title: illustData?.title ?? "",
      caption: illustData?.caption ?? "",
      publishRange: illustData?.publish_state ?? "",
      synalioTitle: illustData?.synalio ?? "",
      gameSystem: illustData?.game_system ?? "",
      tags: illustData?.tags ?? [],
    });
    setIsInitialSetIllust(illustData.image ? true : false);
  }, [illustData]);

  const getFetcherError = () => {
    return error || errorTags || errorSynalios || errorGameSystems;
  };

  const disableData = () => {
    return (
      data === undefined ||
      Tags === undefined ||
      Synalios === undefined ||
      GameSystems === undefined
    );
  };

  if (getFetcherError()) return <div>error</div>;
  if (disableData()) return <div>Now Loading</div>;

  const handleSubmit = async () => {
    const { title, caption, publishRange, synalioTitle, gameSystem } =
      form.getValues();

    const update = {
      post: {
        title,
        caption,
        tags,
        synalios: [synalioTitle],
        publish_state: publishRange,
        postable_type: "Illust",
        postable_attributes: postIllust,
        game_systems: [gameSystem],
      },
    };

    try {
      const res = await Put2API(`/posts/${uuid}`, JSON.stringify(update));
      setErrorMessage("");
      if (res.status != 200) {
        setErrorMessage(t_EditGeneral("updateError"));
        return;
      }
      mutate(`/posts/${uuid}/edit`);
      mutate(`/posts/${uuid}`);
    } catch (e) {
      setErrorMessage(t_EditGeneral("updateError"));
      return;
    } finally {
      setOpenModal(true);
    }
  };

  const handleDelete = () => {
    setOpenModal(true);
    setIsDelete(true);
  };

  const handleDeleteSubmit = async () => {
    if (!isDeleteConfirmation) {
      setDeleteConfirmationError(t_EditGeneral("checkDeleteValid"));
      return;
    }

    try {
      const res = await Delete2API(`/posts/${uuid}`);
      if (res.status != 200) {
        setErrorMessage(t_EditGeneral("deleteError"));
        return;
      }
      mutate(`/posts/${uuid}/edit`);
      mutate(`/posts/${uuid}`);
      router.push(RouterPath.users(user.uuid));
    } catch (e) {
      setErrorMessage(t_EditGeneral("deleteError"));
      return;
    } finally {
      setOpenModal(false);
    }
  };

  const handleDrop = (files: File[]) => {
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          postIllust.push({ body: e.target.result as string, position: -1 });
          form.setValues({ postIllust: postIllust });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleModalClose = () => {
    setIsDelete(false);
    setIsDeleteConfirmation(false);
    setDeleteConfirmationError("");
    setOpenModal(false);
    router.back();
  };

  return (
    <>
      <article className="mt-8 mb-12">
        <Mantine.Container size={"sm"}>
          <Mantine.Box className="bg-white p-4 px-8 rounded">
            <div className="text-end">
              <Mantine.Button
                type="button"
                onClick={() => {
                  router.back();
                }}
                size="xs"
                color="transparent"
                className="text-blue-500 hover:text-blue-300 transition-all hover:bg-transparent"
              >
                {t_General("back")}
              </Mantine.Button>
            </div>
            <h1 className="text-center font-semibold my-4">
              {t_PostIllustEdit("title")}
            </h1>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.onSubmit(handleSubmit)}
            >
              <section>
                {illustData?.publish_state === IPublicState.Draft ? (
                  <>
                    <label htmlFor="postIllust">
                      {t_PostIllustEdit("upload")}
                      <span className="text-red-600">*</span>
                    </label>
                    <div className="w-full bg-slate-400 p-5 rounded grid grid-cols-2 gap-4 md:grid-cols-4">
                      {postIllust.map((image: IEditIllust, i: number) => (
                        <div
                          className="relative w-full h-full max-h-28 flex justify-center items-center"
                          key={i}
                        >
                          <Mantine.Button
                            className="absolute -top-3 -right-3 rounded-full bg-white transition-all h-6 w-6 p-0 border border-red-400 hover:bg-red-400"
                            onClick={() => {
                              postIllust.splice(i, 1);
                              form.setValues({ postIllust: postIllust });
                            }}
                          >
                            <IoMdClose className="icon-red-sm p-0" />
                          </Mantine.Button>
                          <Mantine.Image
                            src={image.body}
                            key={i}
                            className="object-cover w-full h-full rounded"
                          />
                        </div>
                      ))}
                      {postIllust.length < MAX_COUNT && (
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
                    {form.errors.postIllust && (
                      <p className="text-sm text-red-500">
                        {form.errors.postIllust}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    {postIllust.length > 0 && (
                      <div className="w-full bg-slate-400 p-5 rounded grid grid-cols-2 gap-4 md:grid-cols-4">
                        {postIllust.map((image: IEditIllust, i: number) => (
                          <div
                            className="relative w-full h-full max-h-28 flex justify-center items-center"
                            key={i}
                          >
                            <Mantine.Image
                              src={image.body}
                              key={i}
                              className="object-cover w-full h-full rounded"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="text-center text-sm">
                      ※{t_PostIllustEdit("illustPostAttention")}
                    </p>
                  </>
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
                  value={form.values.publishRange}
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
                  {illustData?.publish_state === IPublicState.Draft ? (
                    <>
                      <Mantine.Button
                        type="submit"
                        className="bg-green-300 text-black hover:bg-green-500 hover:text-black transition-all"
                      >
                        {t_PostGeneral("post")}
                      </Mantine.Button>
                      <Mantine.Button
                        type="submit"
                        onClick={() => {
                          form.setValues({ publishRange: IPublicState.Draft });
                          form.onSubmit(handleSubmit);
                        }}
                        className="bg-slate-500 hover:bg-slate-800 transition-all"
                      >
                        {t_PostGeneral("draftSave")}
                      </Mantine.Button>
                    </>
                  ) : (
                    <Mantine.Button
                      type="submit"
                      className="bg-green-300 text-black hover:bg-green-500 hover:text-black transition-all"
                    >
                      {t_EditGeneral("update")}
                    </Mantine.Button>
                  )}
                  <Mantine.Button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-800 transition-all"
                  >
                    {t_PostGeneral("delete")}
                  </Mantine.Button>
                </Mantine.Group>
              </section>
            </form>
          </Mantine.Box>
        </Mantine.Container>
      </article>

      <Mantine.Modal opened={openModal} onClose={handleModalClose}>
        {errorMessage === "" ? (
          isDelete ? (
            <>
              <h3 className="text-xl text-center my-4">
                {t_EditGeneral("deleteModalTItle")}
              </h3>
              <p className="text-center text-sm">
                {t_EditGeneral("deleteModalAttention")}
              </p>
              <div className="my-4 flex flex-col justify-center items-center">
                <Mantine.Checkbox
                  label={t_EditGeneral("deleteCheckLabel")}
                  size="md"
                  radius="xl"
                  color="red"
                  checked={isDeleteConfirmation}
                  onChange={(event) =>
                    setIsDeleteConfirmation(event.currentTarget.checked)
                  }
                />
                {deleteConfirmationError && (
                  <p className="text-red-400">{deleteConfirmationError}</p>
                )}
              </div>
              <div className="flex flex-col justify-center items-center gap-4 my-8">
                <Mantine.Button
                  type="button"
                  className="bg-red-400 hover:bg-red-600 transition-all text-white px-8 py-1"
                  onClick={handleDeleteSubmit}
                >
                  {t_EditGeneral("deleteButton")}
                </Mantine.Button>
                <Mantine.Button
                  type="button"
                  className="tracking-wider text-black hover:text-black hover:text-opacity-50 transition-all bg-transparent hover:bg-transparent"
                  onClick={() => {
                    setIsDelete(false);
                    setOpenModal(false);
                  }}
                >
                  {t_General("back")}
                </Mantine.Button>
              </div>
            </>
          ) : (
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
                      className="bg-green-300 hover:bg-green-500 transition-all text-black"
                      onClick={() => {
                        router.push(RouterPath.illust(uuid));
                        setOpenModal(false);
                      }}
                    >
                      {t_PostGeneral("showPost")}
                    </Mantine.Button>
                    <XShare postUuid={uuid} title={form.getValues().title} />
                  </>
                )}
              </Mantine.Group>
            </>
          )
        ) : (
          <p className="text-black text-center">{errorMessage}</p>
        )}
      </Mantine.Modal>
    </>
  );
}
