import { ButtonState, PublicState } from "@/types";
import { BookmarkButton, FavoriteButton, ShareButton } from ".";
import { RequiredLoginModal } from "../modal";

// PC・タブレット用いいねボタン・ブックマークボタン・シェアボタン
export function IconButtonList({
  postId,
  buttonState,
  publicState,
}: {
  postId: number;
  buttonState: ButtonState;
  publicState: PublicState;
}) {
  const currentUser = true; // TODO : ログインユーザーの状態

  return (
    <>
      <div className="hidden md:flex gap-2 justify-end items-center">
        <ul className="flex justify-center items-center">
          <li className="mx-2 h-full text-center">
            <FavoriteButton state={buttonState.favorite} />
          </li>
          <li className="mx-2 h-full text-center">
            <BookmarkButton state={buttonState.bookmark} />
          </li>
          {/* 公開範囲が全体のときのみシェア可能 */}
          {publicState.valueOf() === PublicState.All && (
            <li className="mx-2 h-full text-center">
              <ShareButton />
            </li>
          )}
        </ul>
      </div>
      <RequiredLoginModal />
    </>
  );
}

// SP用いいねボタン・ブックマークボタン・シェアボタン（最下部固定）
export function FixedIconButtonList({
  postId,
  buttonState,
  publicState,
}: {
  postId: number;
  buttonState: ButtonState;
  publicState: PublicState;
}) {
  const currentUser = true; // TODO : ログインユーザーの状態

  return (
    <>
      <article className="fixed bottom-0 left-0 w-full md:hidden">
        <ul className="bg-white flex justify-center items-center py-3">
          <li className="h-full mx-2 text-center">
            <FavoriteButton state={buttonState.favorite} />
          </li>
          <li className="h-full mx-2 text-center">
            <BookmarkButton state={buttonState.bookmark} />
          </li>
          {/* 公開範囲が全体のときのみシェア可能 */}
          {publicState.valueOf() === PublicState.Private && (
            <li className="h-full mx-2 text-center">
              <ShareButton />
            </li>
          )}
        </ul>
      </article>
      <RequiredLoginModal />
    </>
  );
}
