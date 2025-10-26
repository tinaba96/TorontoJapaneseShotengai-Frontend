# イベント作成API実装ドキュメント

このドキュメントでは、イベント作成機能のフロントエンド実装について説明します。

## 実装内容

### 1. 型定義 (`app/types/event.ts`)

イベント関連の型を定義しました:

- **CreateEventRequest**: イベント作成リクエストの型
- **Event**: イベントレスポンスの型
- **UpdateEventRequest**: イベント更新リクエストの型
- **EventListQuery**: イベント一覧取得のクエリパラメータ
- **PaginatedEventsResponse**: ページネーション付きレスポンス

```typescript
interface CreateEventRequest {
  title: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  eventDate: string; // YYYY-MM-DD
  eventTime: string; // HH:MM
  venue: string;
  organizer: string;
  maxAttendees?: number;
}
```

### 2. 汎用APIクライアント (`app/lib/api/client.ts`)

RESTful APIとの通信を簡潔に行うための汎用クライアントを実装しました。

**主な機能:**
- 自動的な認証トークン付与（`requiresAuth: true`の場合）
- 統一されたエラーハンドリング
- クエリパラメータの自動構築
- TypeScriptによる型安全性

**提供する関数:**
- `get<T>(endpoint, options)` - GETリクエスト
- `post<T>(endpoint, data, options)` - POSTリクエスト
- `put<T>(endpoint, data, options)` - PUTリクエスト
- `patch<T>(endpoint, data, options)` - PATCHリクエスト
- `del<T>(endpoint, options)` - DELETEリクエスト

**エラーハンドリング:**
- カスタムエラークラス `ApiError`
- ステータスコード、エラーメッセージ、追加データを含む
- ネットワークエラーの適切な処理

### 3. イベントAPI関数 (`app/lib/api/events.ts`)

イベント操作のための専用API関数を実装しました:

```typescript
// イベント一覧取得
getEvents(query?: EventListQuery): Promise<PaginatedEventsResponse>

// 特定イベント取得
getEvent(id: number): Promise<Event>

// イベント作成（認証必要）
createEvent(data: CreateEventRequest): Promise<Event>

// イベント更新（認証必要）
updateEvent(id: number, data: UpdateEventRequest): Promise<Event>

// イベント削除（認証必要）
deleteEvent(id: number): Promise<void>

// イベント参加登録（認証必要）
registerForEvent(eventId: number): Promise<Event>

// 参加登録キャンセル（認証必要）
unregisterFromEvent(eventId: number): Promise<Event>
```

### 4. フロントエンド実装 (`app/create/page.tsx`)

イベント作成フォームにAPI連携を追加しました。

**実装内容:**
- イベントタイプ選択時のみAPI呼び出し
- フォームデータの適切な型変換
- ローディング状態の管理
- 成功時のフィードバック表示
- エラーハンドリングとエラーメッセージ表示

**エラーメッセージのカスタマイズ:**
- 401: 認証エラー → ログイン促進
- 422: バリデーションエラー → 入力内容の確認
- 0: ネットワークエラー → 接続確認
- その他: サーバーからのメッセージまたはデフォルトメッセージ

## バックエンドAPI仕様（実装予定）

フロントエンドは以下のAPIエンドポイントを期待しています:

### エンドポイント一覧

#### 1. イベント作成
```
POST /events
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "イベントタイトル",
  "description": "イベントの詳細説明",
  "contactEmail": "contact@example.com",
  "contactPhone": "+1-416-555-0123",
  "eventDate": "2025-12-31",
  "eventTime": "18:00",
  "venue": "トロント日本文化センター",
  "organizer": "主催者名",
  "maxAttendees": 50
}

レスポンス: 201 Created
{
  "id": 1,
  "title": "イベントタイトル",
  "description": "イベントの詳細説明",
  ...
  "createdAt": "2025-10-26T12:00:00Z",
  "updatedAt": "2025-10-26T12:00:00Z",
  "userId": 123
}
```

#### 2. イベント一覧取得
```
GET /events?page=1&limit=10&search=keyword&dateFrom=2025-01-01&dateTo=2025-12-31

レスポンス: 200 OK
{
  "events": [...],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```

#### 3. イベント詳細取得
```
GET /events/{id}

レスポンス: 200 OK
{
  "id": 1,
  "title": "イベントタイトル",
  ...
}
```

#### 4. イベント更新
```
PUT /events/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "更新されたタイトル",
  ...
}

レスポンス: 200 OK
```

#### 5. イベント削除
```
DELETE /events/{id}
Authorization: Bearer {token}

レスポンス: 204 No Content
```

#### 6. イベント参加登録
```
POST /events/{id}/register
Authorization: Bearer {token}

レスポンス: 200 OK
```

#### 7. 参加登録キャンセル
```
DELETE /events/{id}/register
Authorization: Bearer {token}

レスポンス: 200 OK
```

## 環境変数設定

`.env.local`ファイルに以下を設定:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

本番環境では適切なAPIエンドポイントに変更してください。

## 認証について

認証が必要なエンドポイント（イベント作成、更新、削除など）は、`localStorage`に保存された`access_token`を使用します。

トークンは以下の形式でリクエストヘッダーに含まれます:
```
Authorization: Bearer {access_token}
```

ログインしていない状態で認証が必要な操作を行うと、401エラーが返され、ユーザーにログインを促すメッセージが表示されます。

## エラーハンドリング

すべてのAPIリクエストは統一されたエラーハンドリングを使用しています:

1. **ネットワークエラー**: 接続の問題を検出
2. **認証エラー (401)**: ログインが必要
3. **バリデーションエラー (422)**: 入力内容の確認が必要
4. **サーバーエラー (5xx)**: システムエラー
5. **その他のエラー**: 汎用エラーメッセージ

エラーメッセージはユーザーに5秒間表示され、自動的に消えます。

## 使用例

### イベント作成
```typescript
import { createEvent } from '@/app/lib/api/events';

const newEvent = await createEvent({
  title: "新年会",
  description: "2025年の新年会を開催します",
  contactEmail: "info@example.com",
  eventDate: "2025-01-15",
  eventTime: "18:00",
  venue: "トロント日本文化センター",
  organizer: "日本人コミュニティ"
});
```

### イベント一覧取得
```typescript
import { getEvents } from '@/app/lib/api/events';

const { events, total, page } = await getEvents({
  page: 1,
  limit: 10,
  search: "新年会",
  dateFrom: "2025-01-01"
});
```

## ベストプラクティス

1. **型安全性**: すべてのAPI関数は適切な型定義を使用
2. **エラーハンドリング**: try-catchブロックで適切にエラーを処理
3. **認証管理**: トークンの自動付与と検証
4. **ローディング状態**: ユーザーへのフィードバック
5. **再利用性**: 汎用APIクライアントにより他のリソースにも適用可能

## 次のステップ

1. バックエンドAPIの実装
2. 他のコンテンツタイプ（求人、商品、賃貸、店舗）へのAPI統合
3. 画像アップロード機能の追加
4. より詳細なバリデーション
5. オフライン対��やキャッシング戦略の検討

## 参考リンク

- [Next.js App Router](https://nextjs.org/docs/app)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [TypeScript](https://www.typescriptlang.org/)
