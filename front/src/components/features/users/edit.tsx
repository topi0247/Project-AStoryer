"use client";

import * as MantineCore from "@mantine/core";
import * as MantineDropzone from "@mantine/dropzone";
import { useTranslations } from "next-intl";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import "@mantine/dropzone/styles.css";
import { IUserPageEdit } from "@/types";
import { useState } from "react";
import { FaImage } from "rocketicons/fa";
import { useForm } from "@mantine/form";
import { Put2API } from "@/lib";
import { useRecoilState } from "recoil";
import { userState } from "@/recoilState";
import { mutate } from "swr";

export default function UserEdit({
  userProfile,
}: {
  userProfile: IUserPageEdit;
}) {
  const t_General = useTranslations("General");
  const [opened, { open, close }] = useDisclosure(false);
  const [headerImageBlob, setHeaderImageBlob] = useState(
    userProfile.headerImage
  );
  const [avatarBlob, setAvatarBlob] = useState(userProfile.avatar);
  const theme = MantineCore.useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [user, setUser] = useRecoilState(userState);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      headerImage: headerImageBlob,
      avatar: avatarBlob,
      twitter: userProfile.link.twitter,
      pixiv: userProfile.link.pixiv,
      fusetter: userProfile.link.fusetter,
      privatter: userProfile.link.privatter,
      other: userProfile.link.other,
      profile: userProfile.profile,
    },
    validate: {
      twitter: (value) => {
        if (value && !value.match(/^https:\/\/twitter.com\/.*/)) {
          return "有効なURLではありません";
        }
        return null;
      },
      pixiv: (value) => {
        if (value && !value.match(/^https:\/\/pixiv.com\/.*/)) {
          return "有効なURLではありません";
        }
        return null;
      },
      fusetter: (value) => {
        if (value && !value.match(/^https:\/\/fusetter.com\/.*/)) {
          return "有効なURLではありません";
        }
        return null;
      },
      privatter: (value) => {
        if (value && !value.match(/^https:\/\/privatter.com\/.*/)) {
          return "有効なURLではありません";
        }
        return null;
      },
      other: (value) => {
        if (value && !value.match(/^https:\/\/.*/)) {
          return "有効なURLではありません";
        }
        return null;
      },
      profile: (value) => {
        if (value.length > 1000) {
          return "1000文字以内で入力してください";
        }
      },
    },
  });

  const handleClose = () => {
    if (hasChanges() && !confirm("変更を破棄しますか？")) {
      return;
    }

    close();
    handleClear();
  };

  const handleSubmit = async () => {
    // 変更点があるか確認
    if (!hasChanges()) {
      alert("変更がありません");
      return;
    }

    const { twitter, pixiv, fusetter, privatter, other, profile } =
      form.getValues();

    const data = {
      profile: {
        header_image: headerImageBlob,
        avatar: avatarBlob,
        text: profile,
      },
    };

    try {
      const res = await Put2API(
        `/users/${user.uuid}/profile`,
        JSON.stringify(data)
      );

      if (res.status !== 200) {
        throw new Error("エラーが発生しました");
      }

      alert("変更しました");
      mutate(`/users/${user.uuid}`);
      if (res.data.avatar) {
        setUser((prev) => ({ ...prev, avatar: res.data.avatar }));
      }
    } catch (error) {
      alert("エラーが発生しました");
    } finally {
      close();
    }
  };

  const hasChanges = () => {
    const { twitter, pixiv, fusetter, privatter, other, profile } =
      form.getValues();

    const data = [
      headerImageBlob === userProfile.headerImage,
      avatarBlob === userProfile.avatar,
      twitter === userProfile.link.twitter,
      pixiv === userProfile.link.pixiv,
      fusetter === userProfile.link.fusetter,
      privatter === userProfile.link.privatter,
      other === userProfile.link.other,
      profile === userProfile.profile,
    ];

    return data.filter((v) => v === false).length > 0;
  };

  const handleDrop = (
    files: File[],
    setBlob: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const reader = new FileReader();
    reader.onload = () => {
      const fileBlob = reader.result as string;
      setBlob(fileBlob);
    };
    reader.readAsDataURL(files[0]);
  };

  const handleClear = () => {
    setHeaderImageBlob(userProfile.headerImage);
    setAvatarBlob(userProfile.avatar);
    form.setValues({
      headerImage: headerImageBlob,
      avatar: avatarBlob,
      twitter: userProfile.link.twitter,
      pixiv: userProfile.link.pixiv,
      fusetter: userProfile.link.fusetter,
      privatter: userProfile.link.privatter,
      other: userProfile.link.other,
      profile: userProfile.profile,
    });
  };

  return (
    <>
      <button
        onClick={open}
        className="bg-gray-500 text-white text-sm rounded px-2 py-1 hover:bg-gray-700 transition-all md:absolute md:bottom-0 md:right-0"
      >
        {t_General("edit")}
      </button>
      <MantineCore.Drawer
        opened={opened}
        onClose={handleClose}
        position="bottom"
        offset={8}
        size={mobile ? "md" : "100%"}
      >
        <MantineCore.Drawer.Body>
          <form
            id="editForm"
            className="flex flex-col justify-center items-start gap-5 w-full md:container md:m-auto"
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <section className="w-full">
              <label htmlFor="headerImage">ヘッダー画像</label>
              <MantineDropzone.Dropzone
                name="headerImage"
                onDrop={(files) => handleDrop(files, setHeaderImageBlob)}
                maxSize={5 * 1024 ** 2}
                accept={MantineDropzone.IMAGE_MIME_TYPE}
                style={{
                  height: mobile ? "8rem" : "15rem",
                  width: "100%",
                  margin: "0 auto",
                }}
              >
                <MantineDropzone.Dropzone.Idle>
                  {headerImageBlob && (
                    <MantineCore.Image
                      src={headerImageBlob}
                      h={mobile ? "8rem" : "15rem"}
                      w="100%"
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
                </MantineDropzone.Dropzone.Idle>
              </MantineDropzone.Dropzone>
            </section>
            <div className="w-full flex flex-col gap-3 md:flex-row md:justify-center md:items-center">
              <section className="w-full md:w-96">
                <label htmlFor="headerImage">アイコン画像</label>
                <MantineDropzone.Dropzone
                  name="avatarImage"
                  onDrop={(files) => handleDrop(files, setAvatarBlob)}
                  maxSize={5 * 1024 ** 2}
                  accept={MantineDropzone.IMAGE_MIME_TYPE}
                  style={{
                    height: "15rem",
                    aspectRatio: "1/1",
                    margin: "0 auto",
                  }}
                >
                  <MantineDropzone.Dropzone.Idle>
                    {avatarBlob && (
                      <MantineCore.Image
                        src={avatarBlob}
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
                  </MantineDropzone.Dropzone.Idle>
                </MantineDropzone.Dropzone>
              </section>
              <section className="w-full">
                <dl className="w-full">
                  <div>
                    <dt>
                      <label htmlFor="twitter">
                        X
                        <span className="text-red-400 text-xs ml-4">
                          {form.errors.twitter}
                        </span>
                      </label>
                    </dt>
                    <dd>
                      <MantineCore.Input
                        name="twitter"
                        placeholder="https://twitter.com/..."
                        className="w-full"
                        key={form.key("twitter")}
                        {...form.getInputProps("twitter")}
                      />
                    </dd>
                  </div>

                  <div>
                    <dt>
                      <label htmlFor="pixiv">
                        pixiv
                        <span className="text-red-400 text-xs ml-4">
                          {form.errors.pixiv}
                        </span>
                      </label>
                    </dt>
                    <dd className="w-full">
                      <MantineCore.Input
                        name="pixiv"
                        placeholder="https://pixiv.net/..."
                        className="w-full"
                        key={form.key("pixiv")}
                        {...form.getInputProps("pixiv")}
                      />
                    </dd>
                  </div>

                  <div>
                    <dt className="mt-2">
                      <label htmlFor="fusetter">
                        fusetter
                        <span className="text-red-400 text-xs ml-4">
                          {form.errors.fusetter}
                        </span>
                      </label>
                    </dt>
                    <dd className="w-full">
                      <MantineCore.Input
                        name="fusetter"
                        placeholder="https://fusetter.com/..."
                        className="w-full"
                        key={form.key("fusetter")}
                        {...form.getInputProps("fusetter")}
                      />
                    </dd>
                  </div>

                  <div>
                    <dt className="mt-2">
                      <label htmlFor="privatter">
                        privatter
                        <span className="text-red-400 text-xs ml-4">
                          {form.errors.privatter}
                        </span>
                      </label>
                    </dt>
                    <dd className="w-full">
                      <MantineCore.Input
                        name="privatter"
                        placeholder="https://privatter.net/..."
                        className="w-full"
                        key={form.key("privatter")}
                        {...form.getInputProps("privatter")}
                      />
                    </dd>
                  </div>

                  <div>
                    <dt className="mt-2">
                      <label htmlFor="other">
                        その他
                        <span className="text-red-400 text-xs ml-4">
                          {form.errors.other}
                        </span>
                      </label>
                    </dt>
                    <dd className="w-full">
                      <MantineCore.Input
                        name="other"
                        placeholder="https://example.com/..."
                        className="w-full"
                        key={form.key("other")}
                        {...form.getInputProps("other")}
                      />
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
            <section className="w-full">
              <MantineCore.Textarea
                name="profile"
                rows={5}
                label="プロフィール"
                placeholder="プロフィール"
                className="w-full"
                {...form.getInputProps("profile")}
              />
            </section>
            <section className="w-full text-center">
              <MantineCore.Button
                type="submit"
                className="bg-green-400 hover:bg-green-600 transition-all"
              >
                {t_General("save")}
              </MantineCore.Button>
            </section>
          </form>
        </MantineCore.Drawer.Body>
      </MantineCore.Drawer>
    </>
  );
}
