# 第1弾 仕様：1物件特化「物件ページ＋内見予約」MVP

## コンセプト
eMaple流入を受ける、**1物件特化の「魅力的な物件ページ＋内見予約」**。
既存アプリ（商店街/MAP/フリマ/求人/イベント等）は **一切触らず**、専用セクションとして追加する。

将来的には「日本→トロントの信頼できる賃貸マッチング」へ育てるが、今回は **自分の1物件でスモールスタート**。
価値は「安く・安全に・到着前から部屋を探せる」。差別化は eMaple に対する **質とキュレーション（目利き物件）**。

## 公開側（ログイン不要で閲覧）
- **物件ページ**
  - 圧倒的に魅力的な写真ギャラリー
  - 詳細情報 ＋ FAQ（追加質問・写真依頼が発生しないよう先回りで潰す）
  - 「内見を予約する」導線
- **内見予約**
  - Googleログイン → 30分枠を1つ選ぶ
  - **1人1予約まで**（複数枠の同時予約は不可）
  - **1枠は人数無制限**（埋まり＝締切なし）
  - 入力：名前◎ / メール◎（Googleから自動取得）/ 電話△（任意）
  - 予約後 → **確認メール（キャンセルリンク付き／ログイン不要でキャンセル可）**
  - キャンセルすれば再予約OK

## admin側（運営者専用・1アカウント想定、複数可）
- **Googleログイン ＋ 管理者メールリスト(env)** で判定（認証は予約者と共通の1本）
- **空き枠を個別登録**（30分単位）
- **予約一覧**で「誰がいつ来るか」を把握
- 予約が **入る / キャンセルされる** と **メール通知**（複数アドレス可）
- **予約が入っている枠は削除不可**（安全策）

## 技術方針（壊さない＝追加だけ / additive-only）
- **backend**：既存テーブル/APIには触れず、新規追加のみ
  - テーブル：`viewing_slots`（枠）/ `viewing_bookings`（予約）
  - API：枠CRUD（admin）/ 空き枠取得（公開）/ 予約作成・キャンセル / 通知メール送信
- **frontend**：専用ルートで新規追加（物件ページ＋予約UI＋admin画面）。既存ページ・共通ヘッダーは不変
  - 必要なら専用レイアウト（限定ナビ）で既存ヘッダーの全カテゴリ露出を回避
- **認証**：Googleログイン（予約者）＋ env の管理者リストで admin 判定
- **メール**：確認＋通知のみ、プレーンでシンプル
- **eMapleリンクの着地先**：この物件ページ

## データモデル（最小）
- `viewing_slots`：id / starts_at(30分枠の開始) / created_at / (property_id は将来用、当面固定)
- `viewing_bookings`：id / slot_id / name / email / phone? / status(active|cancelled) / cancel_token / created_at
- 制約：1ユーザー(email)につき active な booking は1件まで

## 確定した設計判断
1. admin方式 = Googleログイン＋管理者メールリスト(env)
2. キャンセル時、adminにも通知する
3. 1枠の人数上限 = 無制限
4. 予約が入っている枠は削除不可
5. 予約者本人にも確認メールを送る（キャンセルリンク付き）
6. キャンセルはメール内トークンリンクから（ログイン不要）

## 第2弾以降（長期）
ブログ（情報記事・先回りFAQの拡張）→ 掲示板（簡易投稿）→ 複数物件 → 大家拡大 → 商店街/フリマ等の開放（FeatureFlag解除）

## 実装済み（第1弾・additive-only）
セットアップ手順は `docs/rental-viewing-SETUP.md` を参照。

### Backend（FastAPI + Neo4j / 既存に影響なし）
- 新規: `app/models/viewing.py`, `app/crud/viewing.py`, `app/routers/viewing.py`, `app/core/email.py`
- 追加: `app/routers/auth.py` に `POST /auth/google`・`GET /auth/me`、`app/core/security.py` に `get_admin_user`、`app/crud/users.py` に `upsert_oauth_user`
- 登録: `app/main.py` に viewing ルーター追加 / `requirements.txt` に `google-auth`,`requests`
- エンドポイント: `GET /viewing/slots`(公開) / `POST /viewing/bookings`(要ログイン) / `POST /viewing/cancel`(公開・token) / `POST,DELETE /viewing/slots`(admin) / `GET /viewing/bookings`(admin)
- 認証は既存JWT基盤を再利用。Google IDトークンを検証して自前JWTを発行。
- メールは `smtplib` でベストエフォート（未設定なら自動スキップ、予約は動作）。

### Frontend（Next.js / 既存ページ・ヘッダーに影響なし）
- 新規セクション `app/viewing/`（独自レイアウト＝商店街ナビ非表示）
  - `layout.tsx`（GoogleOAuthProvider + 専用ヘッダー）/ `page.tsx`（物件ページ：ギャラリー＋FAQ＋予約）
  - `_components/BookingWidget.tsx`（Googleログイン→枠選択→予約）
  - `admin/page.tsx`（枠登録・予約一覧）/ `cancel/page.tsx`（トークンキャンセル）
- 物件コンテンツ: `lib/viewing-property.ts`（写真・FAQ等をここで編集）
- API/型: `app/lib/api/viewing.ts`, `app/types/viewing.ts`、`app/lib/api/auth.ts` に `googleLogin`/`getMe` 追加
- `app/contexts/AuthContext.tsx` に `loginWithGoogle`/`isAdmin` 追加（既存ログインは温存）
- 依存追加: `@react-oauth/google`
- 検証: `npm run build` 成功（型チェック通過・全ルート生成）

### 既知の簡略化（後で改善可）
- 予約確認メールの日時表示が UTC ISO（画面側はローカル時刻表示で正しい）。
- バックエンドのフル起動検証は環境依存（ピン留めが古くPy3.13非対応）のため未実施。構文・分離モジュール・google-auth動作・フロントビルドは検証済み。

## スコープ外（今回やらない）
- アプリ内チャット / リアルタイムメッセージ（やり取りは「発生させない」設計で代替）
- 写真アップロードUI（物件写真は運営が用意して載せる）
- 複数物件管理 / 大家オンボーディング
- 商店街・フリマ・求人・イベント等への変更
