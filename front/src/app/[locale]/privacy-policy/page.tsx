import { Link } from "@/lib";
import { RouterPath } from "@/settings";

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-4 pb-16 pt-4 *:my-4 md:container md:m-auto md:max-w-[800px]">
      <h1 className="text-xl text-center md:text-2xl">プライバシーポリシー</h1>
      <section>
        <p>
          「AStoryer - あすとりや
          -」運営（以下「運営者」といいます。）は、個人情報の重要性を認識し、個人情報の保護に関する法律（以下「個人情報保護法」といいます。）その他の法令、個人情報保護法についてのガイドライン等の規範を遵守した個人情報の取扱いを実施するため、以下のとおりプライバシーポリシーを定めます。
        </p>
      </section>

      <section className="*:my-3">
        <h2 className="font-bold my-2">第１条（定義）</h2>
        <p>
          本プライバシーポリシーにおいて、各用語の定義は次に定めるとおりとします。
        </p>
        <div>
          <h3>①　個人情報</h3>
          <p>
            　生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの（他の情報と容易に照合することができ、それにより特定の個人を識別することができるものを含みます。）、又は個人識別符号が含まれるものをいいます。
          </p>
        </div>
        <div>
          <h3>②　個人識別符号</h3>
          <p>
            　当該情報単体から特定の個人を識別できるものとして個人情報保護法施行令に定められた文字、番号、記号その他の符号をいいます。
          </p>
        </div>
        <div>
          <h3>③　要配慮個人情報</h3>
          <p>
            　人種、信条、社会的身分、病歴、犯罪の経歴、その他不当な差別や偏見その他の不利益が生じないようにその取扱いに特に配慮を要するものとして個人情報保護法で定められたものをいいます。
          </p>
        </div>
        <div>
          <h3>④　個人情報データベース等</h3>
          <p>
            　個人情報を含む情報の集合物であって、コンピュータを用いて検索することができるように体系的に構成したもの、又は個人情報を一定の規則に従って整理・分類し、特定の個人情報を容易に検索することができるよう、目次、索引、符号等を付し、他人によっても容易に検索可能な状態に置いているものをいいます。
          </p>
        </div>
        <div>
          <h3>⑤　個人データ</h3>
          <p>　個人情報データベース等を構成する個人情報をいいます。</p>
        </div>
        <div>
          <h3>⑥　開示等</h3>
          <p>
            　本人又はその代理人から請求される開示（第三者提供記録の開示を含みます。）、内容の訂正、追加又は削除、利用の停止、消去及び第三者への提供の停止の全てをいいます。
          </p>
        </div>
        <div>
          <h3>⑦　保有個人データ</h3>
          <p>　運営者が開示等を行うことの権限を有する個人データをいいます。</p>
        </div>
      </section>

      <section>
        <h2>第２条（個人情報の取得）</h2>
        <p>
          　運営者は、法令等に準拠した方法により個人情報を収集・取得するものとし、偽りその他不正の手段を用いて個人情報を収集・取得することは決してありません。
        </p>
      </section>

      <section>
        <h2>第３条（要配慮個人情報の取得）</h2>
        <p>
          　運営者は、個人情報保護法で認められる場合を除き、あらかじめ本人の同意を得ないで要配慮個人情報を取得することはありません。
        </p>
      </section>

      <section className="*:my-3">
        <h2>第４条（個人情報の利用目的）</h2>
        <p>運営者が個人情報を利用する目的は、次のとおりです。</p>
        <div>
          <h3>
            ①運営者の提供するTRPG用創作イラスト投稿サイト「AStoryer
            -あすとりや-」〔https://astoryer.com〕（以下、このサービスを「本サービス」といい、このウェブサイトを「本ウェブサイト」といいます。）の運営及び提供のため
          </h3>
          <ul className="list-disc ml-7">
            <li>ユーザーのアカウント作成のため</li>
            <li>ユーザー認証のため</li>
            <li>運営者又はユーザーが本サービスの利用を円滑に行うため</li>
            <li>ユーザー間における利用が円滑に行われるようにするため</li>
            <li>ユーザーからのお問い合わせに対応するため</li>
            <li>
              運営者の禁止する行為、不正アクセスその他の不法・不正行為が行われているか等、本サービスの利用に関する調査を行うため
            </li>
            <li>セキュリティ保護や不正防止のため</li>
            <li>
              ユーザーに対して個人情報の取扱いについて同意を求める連絡を行うため
            </li>
            <li>
              統計情報を作成する目的で、匿名加工情報又は仮名加工情報を生成するため
            </li>
            <li>その他本サービスの円滑な運営及び提供のため</li>
          </ul>
        </div>
        <div>
          <h3>
            ②本サービスの分析や改善を行い、より良いサービスを提供し、又は、本サービスの利用状況を確認するため
          </h3>
          <ul className="list-disc ml-7">
            <li>ユーザーに対してアンケートを実施するため</li>
            <li>アンケートに回答したユーザーに対して謝礼を送付するため</li>
            <li>
              アンケート結果や本サービスの利用履歴から統計情報を作成し、本サービス又は新サービスの開発又は改善の参考にするため
            </li>
            <li>
              本サービスの利用履歴からパーソナライズされたコンテンツや広告を提供するため
            </li>
            <li>ユーザーセグメントに応じたプロモーション活動を行うため</li>
            <li>その他本サービスの改善又は新サービスの開発のため</li>
          </ul>
        </div>
        <div>
          <h3>
            ③運営者のマーケティング活動のため、又は、ユーザーに適した広告を表示するため
          </h3>
          <ul className="list-disc ml-7">
            <li>
              運営者及び運営者の取引先の広告や案内をユーザーに配信するため
            </li>
            <li>
              運営者が実施するキャンペーンやイベント等の案内を送付するため
            </li>
          </ul>
        </div>
      </section>

      <section className="*:my-3">
        <h2>第５条（利用目的の変更）</h2>
        <p>
          　運営者は、変更前の利用目的と関連性を有すると合理的に認められる範囲において、利用目的を変更することがあります。この場合、運営者は、変更された利用目的を本ウェブサイト上に速やかに公表します。
        </p>
      </section>

      <section className="*:my-3">
        <h2>第６条（データ内容の正確性の確保等）</h2>
        <p>
          　運営者は、利用目的の達成に必要な範囲内において、個人データを正確かつ最新の内容に保つとともに、利用する必要がなくなったときは、当該個人データを遅滞なく消去するよう努めます。
        </p>
      </section>

      <section className="*:my-3">
        <h2>第７条（安全管理措置）</h2>
        <p>
          　運営者は、その取り扱う個人データの漏えい、滅失又はき損の防止その他の個人データの安全管理のために必要かつ適切な措置を講じるものとし、その従業者に個人データを取り扱わせるにあたっては、当該個人データの安全管理が図られるよう、当該従業者に対する必要かつ適切な監督を行うものとします。
        </p>
      </section>

      <section className="*:my-3">
        <h2>第８条（委託先の監督）</h2>
        <p>
          　運営者が個人データの取扱いの全部又は一部を委託する場合、適切な委託先を選定した上で、個人データの取扱状況を合理的に把握できる委託契約を締結するものとし、定期的な監査を行うなどの方法により委託先における個人データの取扱状況を把握し、もって、取扱いを委託した個人データの安全管理が図られるよう、委託を受けた者に対する必要かつ適切な監督を行います。
        </p>
      </section>

      <section className="*:my-3">
        <h2>第９条（個人データの第三者提供）</h2>
        <p>
          　運営者は、個人情報保護法で認められる場合を除き、あらかじめ本人の同意を得ないで、個人データを第三者に提供することはありません。
        </p>
      </section>

      <section className="*:my-3">
        <h2>第10条（保有個人データに関する事項）</h2>
        <p>　保有個人データに関する運営者の定めは、次のとおりです。</p>
        <ol className="list-decimal ml-4">
          <li>
            個人情報取扱事業者の名称及び住所並びに代表者の氏名
            <br />
            以下の窓口までご連絡ください。
          </li>
          <li>
            保有個人データの利用目的
            <br />
            第４条のとおり
          </li>
          <li>
            保有個人データの利用目的の通知の求め又は開示等の請求に応じる手続
            <br />
            以下の窓口までご連絡ください。
          </li>
          <li>
            保有個人データの安全管理のために講じた措置
            <ol className="my-2 custom-number-list">
              <li>
                基本方針の策定
                <br />
                個人データの適正な取扱いの確保のため、関係法令・ガイドライン等の遵守、質問及び苦情処理の窓口等を含めた本プライバシーポリシーを策定しております。
              </li>
              <li>
                技術的安全管理措置
                <br />
                個人データを取り扱う情報システムを外部からの不正アクセス又は不正ソフトウェアから保護する仕組みを導入しております。
              </li>
            </ol>
          </li>
          <li>
            保有個人データの取扱いに関する苦情の申出先
            <br />
            以下の窓口までご連絡ください。
          </li>
        </ol>
      </section>

      <section className="*:my-3">
        <h2>第11条（窓口）</h2>
        <p>
          　個人データの取扱いに関するご質問や苦情、開示等のご請求については、以下の窓口までお問い合わせフォームからお問い合わせください。
          <br />
          <Link href={RouterPath.contact} className="text-blue-400 underline">
            個人情報お問い合わせフォーム
          </Link>
        </p>
      </section>

      <section className="*:my-3">
        <h2>第12条（Google Analyticsについて）</h2>
        <p>
          　本サービスでは、ユーザーの本ウェブサイトへの訪問状況や利用状況を把握するために、Google
          Inc.（以下「Google社」といいます。）が提供する「Google
          Analytics」を利用しています。
          <br />
          　ユーザーが本サービスを利用した場合、Google社は、運営者の発行するCookieをもとにユーザーの本ウェブサイトの訪問履歴や利用履歴を収集、記録及び分析します。運営者は、Google社からその分析結果を受け取り、ユーザーのウェブサイトの訪問状況や利用状況を把握します。
          <br />
          　なお、Google
          Analyticsにより収集、記録及び分析されたユーザーの情報には、特定の個人を識別する情報は一切含まれないため、個人情報保護法の「個人情報」には該当しません。また、それらの情報は、Google社により同社のプライバシーポリシーに基づいて管理されます。
          <br />
          　本ウェブサイトにおけるGoogle
          Analyticsに関する設定は、以下を参照してください。
        </p>
        <ul className="list-disc ml-7">
          <li>
            ユーザーに関する情報の収集を停止したい場合
            <br />
            ブラウザのアドオン設定でGoogle Analyticsを無効にしてください。
          </li>
          <li>
            Google Analyticsを無効にしたい場合
            <br />
            　Google社によるオプトアウトアドオンのダウンロードページで 「Google
            Analyticsオプトアウトアドオン」をダウンロード及びインストール後、ブラウザのアドン設定を変更してください。
          </li>
        </ul>
        <p>
          オプトアウトアドオン：
          <a
            href="https://tools.google.com/dlpage/gaoptout?hl=ja"
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue-400 underline"
          >
            https://tools.google.com/dlpage/gaoptout?hl=ja
          </a>
        </p>
        <p>
          　なお、Google
          Analyticsを無効にした場合、本ウェブサイト以外のウェブサイトも無効になりますが、ブラウザのアドオン設定より、Google
          Analyticsを再度有効にすることができます。
          <br />
          Google
          Analyticsの利用規約やGoogle社のプライバシーポリシーについては、以下のURLをご参照ください。
        </p>
        <p>
          Google Analyticsの利用規約：
          <a
            href="https://www.google.com/analytics/terms/jp.html"
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue-400 underline"
          >
            https://www.google.com/analytics/terms/jp.html
          </a>
        </p>
        <p>
          Googleのプライバシーポリシー：
          <a
            href="https://www.google.com/intl/ja/policies/privacy/"
            rel="noopener noreferrer"
            target="_blank"
            className="text-blue-400 underline"
          >
            https://www.google.com/intl/ja/policies/privacy/
          </a>
        </p>
      </section>
    </article>
  );
}
