"use client";

import { IllustDropzone, Preview } from "@/components/features/illusts";
import { Post2API, useRouter } from "@/lib";
import { userState } from "@/recoilState";
import { RouterPath } from "@/settings";
import { IPublicState, IEditIllust } from "@/types";
import * as Mantine from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import * as Post from "@/components/features/post";

export default function IllustPostPage() {
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
  const MAX_COUNT = 12;

  const form = useForm({
    initialValues: {
      postIllust: [] as IEditIllust[],
      title: "",
      caption: "",
      publishRange: "" as IPublicState,
      synalioTitle: "",
      gameSystem: "",
    },
    validate: {
      postIllust: (value: IEditIllust[]) => {
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
                <div className="w-full bg-slate-400 p-5 rounded grid grid-cols-2 gap-4 md:grid-cols-4">
                  {form.getValues().postIllust.length > 0 &&
                    form
                      .getValues()
                      .postIllust.map((image: IEditIllust, i: number) => (
                        <Preview
                          key={i}
                          image={image}
                          deleteIllust={() => deleteIllust(i)}
                          isDelete={true}
                        />
                      ))}
                  {form.getValues().postIllust.length < MAX_COUNT && (
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
                <Post.Caption
                  formProps={form.getInputProps("caption")}
                  CAPTION_MAX_LENGTH={CAPTION_MAX_LENGTH}
                />
              </section>
              <section>
                <Post.PublishState
                  formProps={form.getInputProps("publishRange")}
                />
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
          form.values.publishRange === IPublicState.Draft ? (
            <Post.DraftModal onClick={handleModalClose} />
          ) : (
            <Post.PostModal
              onClick={handleModalClose}
              postUuid={postUuid}
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
