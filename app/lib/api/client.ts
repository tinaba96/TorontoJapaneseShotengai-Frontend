/**
 * 汎用APIクライアント
 * 認証トークンの自動付与やエラーハンドリングを提供
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * APIエラークラス
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: Record<string, unknown>
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = "ApiError";
  }
}

/**
 * ローカルストレージからアクセストークンを取得
 */
const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

/**
 * リクエストオプションの型
 */
interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
  params?: Record<string, string | number | boolean | undefined>;
}

/**
 * 汎用的なFetchラッパー
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requiresAuth = false, params, ...fetchOptions } = options;

  // クエリパラメータの構築
  let url = `${API_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // デフォルトヘッダーの設定
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  // 認証が必要な場合、トークンを追加
  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    } else {
      throw new ApiError(401, "Unauthorized", {
        message: "認証が必要です。ログインしてください。",
      });
    }
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    // レスポンスのステータスチェック
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      throw new ApiError(response.status, response.statusText, errorData);
    }

    // 204 No Contentの場合は空のレスポンスを返す
    if (response.status === 204) {
      return {} as T;
    }

    // JSONレスポンスをパース
    const data = await response.json();
    return data as T;
  } catch (error) {
    // ApiErrorはそのままスロー
    if (error instanceof ApiError) {
      throw error;
    }

    // ネットワークエラーなどの場合
    if (error instanceof Error) {
      throw new ApiError(0, "Network Error", {
        message: "ネットワークエラーが発生しました。接続を確認してください。",
        originalError: error.message,
      });
    }

    throw error;
  }
}

/**
 * GETリクエスト
 */
export function get<T>(
  endpoint: string,
  options?: Omit<RequestOptions, "method" | "body">
): Promise<T> {
  return apiClient<T>(endpoint, { ...options, method: "GET" });
}

/**
 * POSTリクエスト
 */
export function post<T>(
  endpoint: string,
  data?: unknown,
  options?: Omit<RequestOptions, "method" | "body">
): Promise<T> {
  return apiClient<T>(endpoint, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUTリクエスト
 */
export function put<T>(
  endpoint: string,
  data?: unknown,
  options?: Omit<RequestOptions, "method" | "body">
): Promise<T> {
  return apiClient<T>(endpoint, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PATCHリクエスト
 */
export function patch<T>(
  endpoint: string,
  data?: unknown,
  options?: Omit<RequestOptions, "method" | "body">
): Promise<T> {
  return apiClient<T>(endpoint, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETEリクエスト
 */
export function del<T>(
  endpoint: string,
  options?: Omit<RequestOptions, "method" | "body">
): Promise<T> {
  return apiClient<T>(endpoint, { ...options, method: "DELETE" });
}
