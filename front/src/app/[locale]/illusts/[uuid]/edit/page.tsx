"use client";

import { Delete2API, GetFromAPI, Put2API, useRouter } from "@/lib";
import { userState } from "@/recoilState";
import { RouterPath } from "@/settings";
import { IEditIllust, IEditIllustData, IPublicState } from "@/types";
import * as Mantine from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import useSWR, { mutate } from "swr";
import { IllustDropzone, Preview } from "@/components/features/illusts";
import * as Post from "@/components/features/post";

const fetcher = (url: string) => GetFromAPI(url).then((res) => res.data);

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
  const [postIllust, setPostIllust] = useState<IEditIllust[]>([]);
  const [isInitialSetIllust, setIsInitialSetIllust] = useState<boolean>(false);
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
    return error;
  };

  const disableData = () => {
    return data === undefined;
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

  const pushIllust = (targetResult: string) => {
    const postIllust = form.getValues().postIllust;
    postIllust.push({ body: targetResult, position: -1 });
    form.setValues({ postIllust: postIllust });
  };

  const deleteIllust = (index: number) => {
    let postIllust = form.getValues().postIllust;
    postIllust.splice(index, 1);
    form.setValues({ postIllust: postIllust });
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

  const handleModalClose = () => {
    setIsDelete(false);
    setIsDeleteConfirmation(false);
    setDeleteConfirmationError("");
    setOpenModal(false);
    router.back();
  };

  const handleBack = () => {
    setIsDelete(false);
    setOpenModal(false);
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
                <label htmlFor="postIllust">
                  {t_PostIllustEdit("upload")}
                  <span className="text-red-600">*</span>
                </label>
                <p className="text-sm">{t_PostIllustEdit("maxSize")}</p>
                <p className="text-sm">{t_PostIllustEdit("maxCount")}</p>
                <div className="w-full bg-slate-400 p-5 rounded grid grid-cols-2 gap-4 md:grid-cols-4">
                  {postIllust.map((image: IEditIllust, i: number) => (
                    <Preview
                      key={i}
                      image={image}
                      deleteIllust={() => deleteIllust(i)}
                      isDelete={
                        illustData?.publish_state === IPublicState.Draft
                      }
                    />
                  ))}
                  {illustData?.publish_state === IPublicState.Draft &&
                    postIllust.length < MAX_COUNT && (
                      <IllustDropzone
                        pushIllust={pushIllust}
                        MAX_COUNT={MAX_COUNT}
                        formProps={form.getInputProps("postIllust")}
                      />
                    )}
                </div>
                {form.errors.postIllust && (
                  <p className="text-sm text-red-500">
                    {form.errors.postIllust}
                  </p>
                )}
                <p className="text-center text-sm">
                  ※{t_PostIllustEdit("illustPostAttention")}
                </p>
              </section>
              <section>
                <Post.Title
                  formProps={form.getInputProps("title")}
                  TITLE_MAX_LENGTH={TITLE_MAX_LENGTH}
                />
              </section>
              <section className="flex gap-5 flex-col md:flex-row md:items-center md:gap-2 w-full ">
                <div className="md:w-1/3">
                  <Post.System formProps={form.getInputProps("gameSystem")} />
                </div>
                <div className="md:w-2/3">
                  <Post.Synalio
                    formProps={form.getInputProps("synalioTitle")}
                  />
                </div>
              </section>
              <section>
                <Post.Tag onChange={setTags} value={tags} />
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
                <Post.PublishState
                  formProps={form.getInputProps("publishRange")}
                />
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
            <Post.DeleteModal
              isDeleteConfirmation={isDeleteConfirmation}
              setIsDeleteConfirmation={(event) =>
                setIsDeleteConfirmation(event.target.checked)
              }
              deleteConfirmationError={deleteConfirmationError}
              handleDeleteSubmit={() => handleDeleteSubmit}
              handleBack={() => handleBack}
            />
          ) : form.values.publishRange === IPublicState.Draft ? (
            <Post.DraftModal onClick={handleModalClose} />
          ) : (
            <Post.PostModal
              onClick={handleModalClose}
              postUuid={uuid}
              title={form.values.title}
            />
          )
        ) : (
          <Post.ErrorModal text={errorMessage} />
        )}
      </Mantine.Modal>
    </>
  );
}
