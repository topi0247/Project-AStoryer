import { Delete2API, GetFromAPI, Link, Post2API, useRouter } from "@/lib";
import { userState } from "@/recoilState";
import { RouterPath } from "@/settings";
import { IUser } from "@/types";
import * as Mantine from "@mantine/core";
import { useForm } from "@mantine/form";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import useSWR, { mutate } from "swr";
import { RiDeleteBin6Line } from "rocketicons/ri";

interface IComment {
  id: number;
  text: string;
  user: IUser;
  created_at: string;
}

const feature = (url: string) => GetFromAPI(url).then((res) => res.data);

export default function Comments({ uuid }: { uuid: string }) {
  const { data, error } = useSWR(`posts/${uuid}/comments`, feature);
  const [comments, setComments] = useState<IComment[]>([]);
  const user = useRecoilValue<IUser>(userState);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const t_ShowPost = useTranslations("ShowPost");
  const router = useRouter();
  const TEXT_MAX_LENGTH = 500;

  const form = useForm({
    initialValues: {
      text: "",
    },
    validate: {
      text: (value: string) => {
        if (!value) {
          return "コメントを入力してください";
        }
        if (value.length > TEXT_MAX_LENGTH) {
          return "コメントは500文字以下です";
        }
      },
    },
  });

  useEffect(() => {
    if (error) {
      router.push(RouterPath.error);
      return;
    }

    if (data === undefined || comments.length > 0) {
      return;
    }
    setComments(
      data.comments.map((comment: IComment) => {
        return {
          id: comment.id,
          text: comment.text,
          user: {
            uuid: comment.user.uuid,
            name: comment.user.name,
            avatar: comment.user.avatar,
          },
          created_at: comment.created_at,
        };
      })
    );
  }, [error, data]);

  const handleSubmit = async () => {
    const { text } = form.values;

    const comment = {
      comment: {
        text,
      },
    };

    try {
      const res = await Post2API(
        `/posts/${uuid}/comments`,
        JSON.stringify(comment)
      ).then((res) => res);
      if (res.status != 201) {
        setErrorMessage("コメントに失敗しました");
        setModalOpen(true);
        return;
      }
      const updateComments = [
        {
          id: res.data.id,
          text: text,
          user: user,
          created_at: new Date().toISOString(),
        },
        ...comments,
      ];
      setComments(updateComments);
      mutate(`posts/${uuid}/comments`, { comments: updateComments }, false);
      form.reset();
    } catch (error) {
      setErrorMessage("コメントに失敗しました");
      setModalOpen(true);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await Delete2API(`/posts/${uuid}/comments/${id}`).then(
        (res) => res
      );
      if (res.status != 200) {
        setErrorMessage("コメント削除に失敗しました");
        setModalOpen(true);
        return;
      }
      const updateComments = comments.filter((comment) => comment.id !== id);
      setComments(updateComments);
      mutate(`posts/${uuid}/comments`, { comments: updateComments }, false);
    } catch (error) {
      setErrorMessage("コメント削除に失敗しました");
      setModalOpen(true);
    }
  };

  return (
    <>
      <section className="bg-slate-100 rounded p-3 flex flex-col gap-2 relative">
        {user.uuid === "" ? (
          <>
            <h3 className="text-xl font-semibold">
              {t_ShowPost("postComment")}
            </h3>

            <div>
              <div className="flex items-start gap-4">
                <Mantine.Avatar
                  variant="default"
                  radius="xl"
                  size="md"
                  alt="icon"
                />
                <div className="flex flex-col gap-2 w-full">
                  <span className="p-0 m-0 font-semibold"></span>
                  <div className="w-full h-20 bg-gray-200 rounded p-2 focus:outline-none resize-none" />
                  <div className="w-full text-center">
                    <div className="bg-orange-100 text-black ">
                      {t_ShowPost("send")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full absolute top-0 left-0 bg-gray-500 bg-opacity-80 text-white font-semibold md:text-3xl flex justify-center items-center rounded">
              <p>{t_ShowPost("requiredComment")}</p>
            </div>
          </>
        ) : (
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <div className="flex items-start gap-4">
              <Mantine.Avatar
                variant="default"
                radius="xl"
                size="md"
                alt="icon"
                src={user?.avatar}
              />
              <div className="flex flex-col gap-2 w-full">
                <span className="p-0 m-0 font-semibold">{user.name}</span>
                <Mantine.Textarea
                  minRows={3}
                  className="w-full rounded focus:outline-none resize-none"
                  autosize
                  placeholder={t_ShowPost("comment")}
                  maxLength={TEXT_MAX_LENGTH}
                  {...form.getInputProps("text")}
                />
                <div className="w-full text-center">
                  <Mantine.Button
                    type="submit"
                    variant="contained"
                    className="bg-orange-100 text-black hover:bg-orange-400 transition-all"
                  >
                    {t_ShowPost("send")}
                  </Mantine.Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </section>

      <section>
        {data === undefined ? (
          <ul className="bg-slate-100 rounded p-3 flex flex-col">
            <li className="flex gap-4 items-start py-4 border-b border-slate-200 last-of-type:border-none">
              <span>
                <Mantine.Skeleton width={40} height={40} radius="100%" />
              </span>
              <div className="flex flex-col gap-1 w-full">
                <Mantine.Skeleton width="30%" height={25} />
                <Mantine.Skeleton width="100%" height={50} />
              </div>
            </li>
          </ul>
        ) : (
          comments.length > 0 && (
            <ul className="bg-slate-100 rounded p-3 flex flex-col">
              {comments.map((comment: IComment) => (
                <li
                  key={comment.id}
                  className="flex gap-4 items-start py-4 border-b border-slate-200 last-of-type:border-none"
                >
                  <span>
                    <Link href={RouterPath.users(comment.user.uuid)}>
                      <Mantine.Avatar
                        variant="default"
                        radius="xl"
                        size="md"
                        alt="icon"
                        src={comment.user.avatar}
                      />
                    </Link>
                  </span>
                  <div className="flex flex-col gap-1 w-full">
                    <Link
                      href={RouterPath.users(comment.user.uuid)}
                      className="semi-bold"
                    >
                      {comment.user.name}
                    </Link>
                    <p>{comment.text}</p>
                    <div className="flex justify-end items-center text-xs text-gray-500">
                      {comment.created_at}
                      <Mantine.Button
                        variant="transparent"
                        size="xs"
                        className="p-0 ml-2"
                        onClick={() => handleDelete(comment.id)}
                      >
                        <RiDeleteBin6Line className="icon-gray-400 p-0 hover:icon-gray-700 transition-all" />
                      </Mantine.Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}
      </section>
      <Mantine.Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
        <p>{errorMessage}</p>
      </Mantine.Modal>
    </>
  );
}
