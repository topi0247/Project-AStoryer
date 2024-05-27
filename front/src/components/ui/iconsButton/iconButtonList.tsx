import { IButtonState, IPublicState } from "@/types";
import { BookmarkButton, FavoriteButton, ShareButton } from ".";
import { RequiredLoginModal } from "../modal";

// PC・タブレット用いいねボタン・ブックマークボタン・シェアボタン
export function IconButtonList({
  postUuid,
  publicState,
}: {
  postUuid: string;
  publicState: IPublicState;
}) {
  return (
    <>
      <div className="hidden md:flex gap-2 justify-end items-center">
        <ul className="flex justify-center items-center">
          <li className="mx-2 h-full text-center">
            <FavoriteButton postUuid={postUuid} />
          </li>
          {/* <li className="mx-2 h-full text-center">
            <BookmarkButton postUuid={postUuid} />
          </li> */}
          {/* 公開範囲が全体のときのみシェア可能 */}
          {/* {publicState === IPublicState.All && (
            <li className="mx-2 h-full text-center">
              <ShareButton />
            </li>
          )} */}
        </ul>
      </div>
      <RequiredLoginModal />
    </>
  );
}

// SP用いいねボタン・ブックマークボタン・シェアボタン（最下部固定）
export function FixedIconButtonList({
  postUuid,
  publicState,
}: {
  postUuid: string;
  publicState: IPublicState;
}) {
  return (
    <>
      <article className="fixed bottom-0 left-0 w-full md:hidden">
        <ul className="bg-white flex justify-center items-center py-3">
          <li className="h-full mx-2 text-center">
            <FavoriteButton postUuid={postUuid} />
          </li>
          {/* <li className="h-full mx-2 text-center">
            <BookmarkButton postUuid={postUuid} />
          </li> */}
          {/* 公開範囲が全体のときのみシェア可能 */}
          {/* {publicState === IPublicState.All && (
            <li className="h-full mx-2 text-center">
              <ShareButton />
            </li>
          )} */}
        </ul>
      </article>
      <RequiredLoginModal />
    </>
  );
}
