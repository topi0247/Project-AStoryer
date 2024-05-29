import { IButtonState, IPublicState } from "@/types";
import { BookmarkButton, FavoriteButton, ShareButton } from ".";
import { RequiredLoginModal } from "../modal";

// PC・タブレット用いいねボタン・ブックマークボタン・シェアボタン
export function IconButtonList({
  postUuid,
  publicState,
  title,
}: {
  postUuid: string;
  publicState: IPublicState;
  title: string;
}) {
  return (
    <>
      <div className="fixed bottom-0 left-0 w-full z-30 md:relative md:flex md:gap-2 md:justify-end md:items-center">
        <ul className="bg-white py-1 flex justify-center items-center md:py-0">
          <li className="mx-2 h-full text-center">
            <FavoriteButton postUuid={postUuid} />
          </li>
          {/* <li className="mx-2 h-full text-center">
            <BookmarkButton postUuid={postUuid} />
          </li> */}
          {/* 公開範囲が全体かURLを知ってる人のみのときシェア可能 */}
          {(publicState === IPublicState.All ||
            publicState === IPublicState.URL) && (
            <li className="h-full mx-2 text-center">
              <ShareButton postUuid={postUuid} title={title} />
            </li>
          )}
        </ul>
      </div>
      <RequiredLoginModal />
    </>
  );
}
