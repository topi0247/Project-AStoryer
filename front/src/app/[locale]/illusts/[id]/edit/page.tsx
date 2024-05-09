"use client";

import { TransitionsModal } from "@/components/ui";
import { useRouter } from "@/lib";
import { modalOpenState, userState } from "@/recoilState";
import { RouterPath } from "@/settings";
import { PublicState } from "@/types";
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

const Illust = {
  id: 1,
  image: "https://source.unsplash.com/random",
  title: "タイトル",
  caption: "キャプション",
  gameSystem: "システム1",
  synalioTitle: "シナリオ名",
  publishRange: PublicState.All,
  Tags: ["タグ1", "タグ2"],
};

export default function IllustEditPage({ params }: { params: { id: string } }) {
  const theme = Mantine.useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [postIllust, setPostIllust] = useState<string[]>([Illust.image]);
  const [tags, setTags] = useState<string[]>(Illust.Tags);
  const setOpenModal = useSetRecoilState(modalOpenState);
  const router = useRouter();
  const user = useRecoilValue(userState);
  const t_PostIllustEdit = useTranslations("PostIllustEdit");
  const t_PostGeneral = useTranslations("PostGeneral");
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isDeleteConfirmation, setIsDeleteConfirmation] =
    useState<boolean>(false);
  const [deleteConfirmationError, setDeleteConfirmationError] =
    useState<string>("");

  const form = useForm({
    initialValues: {
      postIllust: postIllust,
      title: Illust.title,
      publishRange: Illust.publishRange,
    },
    validate: {
      postIllust: () => {
        if (postIllust.length === 0) {
          return t_PostIllustEdit("uploadValid");
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
    // 投稿・下書きしたらモーダル表示
    setOpenModal(true);
  };

  const handleDelete = () => {
    setOpenModal(true);
    setIsDelete(true);
  };

  const handleDeleteSubmit = () => {
    if (!isDeleteConfirmation) {
      setDeleteConfirmationError("削除するにはチェックを入れてください");
      return;
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
    setIsDelete(false);
    setIsDeleteConfirmation(false);
    setDeleteConfirmationError("");
    if (form.values.publishRange !== PublicState.Draft && !isDelete) {
      router.push(RouterPath.users(user.id));
    }
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
                戻る
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
                {Illust.publishRange === PublicState.Draft ? (
                  <>
                    <label htmlFor="postIllust">
                      {t_PostIllustEdit("upload")}
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
                  </>
                ) : (
                  <>
                    {postIllust.length > 0 && (
                      <Mantine.Image
                        src={postIllust[0]}
                        h={mobile ? "15rem" : "30rem"}
                        w="auto"
                        m="auto"
                        fit="cover"
                      />
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
                      value={PublicState.All}
                      style={{ cursor: "pointer" }}
                    />
                    <Mantine.Radio
                      label={t_PostGeneral("urlPublish")}
                      value={PublicState.URL}
                      style={{ cursor: "pointer" }}
                    />
                    <Mantine.Radio
                      label={t_PostGeneral("followerPublish")}
                      value={PublicState.Follower}
                      style={{ cursor: "pointer" }}
                    />
                    <Mantine.Radio
                      label={t_PostGeneral("private")}
                      value={PublicState.Private}
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
                  {Illust.publishRange === PublicState.Draft && (
                    <Mantine.Button
                      type="submit"
                      onClick={() =>
                        form.setValues({ publishRange: PublicState.Draft })
                      }
                      className="bg-slate-500 hover:bg-slate-800 transition-all"
                    >
                      {t_PostGeneral("draftSave")}
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

      <TransitionsModal onClose={handleModalClose}>
        {isDelete ? (
          <>
            <h3 className="text-xl text-center my-4">
              作品を削除します。
              <br className="block md:hidden" />
              よろしいですか？
            </h3>
            <p className="text-center text-sm">
              ※作品を削除したらもとに戻せません
            </p>
            <div className="my-4 flex flex-col justify-center items-center">
              <Mantine.Checkbox
                label="作品を削除する"
                size="md"
                radius="xl"
                color="red"
                onChange={() => setIsDeleteConfirmation(!isDelete)}
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
                削除
              </Mantine.Button>
              <Mantine.Button
                type="button"
                className="tracking-wider text-black hover:text-black hover:text-opacity-50 transition-all bg-transparent hover:bg-transparent"
                onClick={() => {
                  setIsDelete(false);
                  setOpenModal(false);
                }}
              >
                戻る
              </Mantine.Button>
            </div>
          </>
        ) : (
          <>
            <h3 className="text-xl text-center my-4">
              {form.values.publishRange === PublicState.Draft
                ? t_PostGeneral("draftSaved")
                : t_PostGeneral("posted")}
            </h3>
            <Mantine.Group justify="center" gap={8}>
              {form.values.publishRange === PublicState.Draft ? (
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
                    onClick={() => router.push(RouterPath.illust(Illust.id))}
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
        )}
      </TransitionsModal>
    </>
  );
}
