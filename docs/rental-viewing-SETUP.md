# 内見予約MVP — セットアップ手順（あなたの作業）

実装は完了しています。動かすために、あなたにしかできない設定が数点あります。

## 1. Google OAuth クライアントを作る（必須）
Googleログインに必要です。

1. https://console.cloud.google.com/ にアクセス
2. プロジェクトを作成（既存でも可）
3. 「APIとサービス」→「OAuth同意画面」を設定
   - User Type: External
   - アプリ名・サポートメール等を入力（テスト中はテストユーザーに自分のGoogleを追加）
4. 「APIとサービス」→「認証情報」→「認証情報を作成」→「OAuth クライアント ID」
   - アプリの種類: **ウェブ アプリケーション**
   - **承認済みの JavaScript 生成元** に以下を追加:
     - `http://localhost:3000`（開発用）
     - 本番のフロントURL（例: `https://your-domain.com`）
   - リダイレクトURIは @react-oauth/google では不要（生成元だけでOK）
5. 発行された **クライアント ID** をコピー（`xxxx.apps.googleusercontent.com`）

## 2. 環境変数を記入

### フロントエンド `.env`
```
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<コピーしたクライアントID>
```

### バックエンド `.env`
```
GOOGLE_CLIENT_ID=<フロントと同じクライアントID>
ADMIN_EMAILS=<あなたのGoogleメール>          # 例: you@gmail.com,partner@gmail.com（カンマ区切りで複数可）
FRONTEND_URL=http://localhost:3000           # 本番では本番URLに
```

> `ADMIN_EMAILS` に入れたメールのGoogleアカウントだけが `/viewing/admin` を使えます。

## 3. メール送信（任意・後回しOK）
SMTPを設定すると、予約時に「本人への確認メール」「管理者への通知メール」が飛びます。
**未設定でも予約自体は動きます**（メールはスキップされログに出るだけ）。

バックエンド `.env`（例: Gmailアプリパスワード使用時）:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASSWORD=<Gmailのアプリパスワード>
SMTP_FROM=you@gmail.com
```

## 4. バックエンドの依存をインストール
```
cd TorontoJapaneseShotengai-Backend
pip install -r requirements.txt   # google-auth, requests が追加されています
```

## 5. 起動して確認
- バックエンド: `uvicorn app.main:app --reload`
- フロント: `npm run dev`
- 物件ページ: http://localhost:3000/viewing
- 管理画面: http://localhost:3000/viewing/admin

## 6. 物件の中身を差し替える
`lib/viewing-property.ts` を編集（写真・家賃・FAQ など）。
写真は `public/images/...` に置いてパスを書きます。

## eMaple のリンク先
`https://<本番ドメイン>/viewing` を貼ってください。

---

## 動作の流れ（おさらい）
- 公開: `/viewing` で物件閲覧（ログイン不要）→「内見を予約」でGoogleログイン → 30分枠を選ぶ → 予約 → 確認メール（キャンセルリンク付き）
- 管理: `/viewing/admin`（管理者のみ）で枠を登録・予約一覧を確認
- キャンセル: 確認メールのリンク（`/viewing/cancel?token=...`）からログイン不要で実行
- 既存アプリ（商店街/MAP/フリマ等）には一切影響なし
