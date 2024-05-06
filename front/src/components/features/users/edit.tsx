"use client";

import * as MantineCore from "@mantine/core";
import * as MantineDropzone from "@mantine/dropzone";
import { useTranslations } from "next-intl";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import "@mantine/dropzone/styles.css";
import { UserPageEdit } from "@/types";
import { useState } from "react";
import { FaImage } from "rocketicons/fa";
import { useForm } from "@mantine/form";

export default function UserEdit({
  userProfile,
}: {
  userProfile: UserPageEdit;
}) {
  const t_General = useTranslations("General");
  const [opened, { open, close }] = useDisclosure(false);
  const [headerImageBlob, setHeaderImageBlob] = useState(
    userProfile.headerImage
  );
  const [avatarBlob, setAvatarBlob] = useState(userProfile.avatar);
  const theme = MantineCore.useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

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
    },
  });

  const handleClose = () => {
    close();
    setHeaderImageBlob(userProfile.headerImage);
    setAvatarBlob(userProfile.avatar);
  };

  const handleSubmit = () => {
    const { twitter, pixiv, fusetter, privatter, other, profile } =
      form.getValues();

    // 変更点があるか確認
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

    const hasChanges = data.filter((v) => console.log(v)).length > 0;
    if (!hasChanges) {
      alert("変更がありません");
      return;
    }

    // TODO : 更新処理
    alert("更新しました");
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
        size={mobile ? "md" : "lg"}
      >
        <MantineCore.Drawer.Body>
          <form
            className="flex flex-col justify-center items-start gap-5 w-full md:container md:m-auto"
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <section className="w-full">
              <label htmlFor="headerImage">ヘッダー画像</label>
              <MantineDropzone.Dropzone
                name="headerImage"
                onDrop={(files) => {
                  const fileBlob = URL.createObjectURL(files[0]);
                  setHeaderImageBlob(fileBlob);
                }}
                onReject={() => setHeaderImageBlob("")}
                maxSize={5 * 1024 ** 2}
                accept={MantineDropzone.IMAGE_MIME_TYPE}
                style={{
                  height: mobile ? "8rem" : "15rem",
                  margin: "0 auto",
                }}
              >
                <MantineDropzone.Dropzone.Idle>
                  {headerImageBlob.length > 0 && (
                    <MantineCore.Image
                      src={headerImageBlob}
                      h={mobile ? "8rem" : "15rem"}
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
                  onDrop={(files) => {
                    const fileBlob = URL.createObjectURL(files[0]);
                    setAvatarBlob(fileBlob);
                  }}
                  onReject={() => setAvatarBlob("")}
                  maxSize={5 * 1024 ** 2}
                  accept={MantineDropzone.IMAGE_MIME_TYPE}
                  style={{
                    height: "15rem",
                    aspectRatio: "1/1",
                    margin: "0 auto",
                  }}
                >
                  <MantineDropzone.Dropzone.Idle>
                    {avatarBlob.length > 0 && (
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
              <label htmlFor="profile">プロフィール</label>
              <MantineCore.Textarea
                name="profile"
                rows={5}
                placeholder="プロフィール"
                className="w-full"
              />
            </section>
            <section className="w-full text-center">
              <MantineCore.Button type="submit">
                {t_General("save")}
              </MantineCore.Button>
            </section>
          </form>
        </MantineCore.Drawer.Body>
      </MantineCore.Drawer>
    </>
  );
}
