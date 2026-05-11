/**
 * 商店街（店舗）関連の型定義
 */

export interface CreateStoreRequest {
  title: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  businessHours: string;
  website?: string;
  services?: string;
  storeAddress: string;
  storeType: string;
}

export interface Store {
  id: string;
  title: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  businessHours: string;
  website?: string;
  services?: string;
  storeAddress: string;
  storeType: string;
  creator_id: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export interface UpdateStoreRequest {
  title?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  businessHours?: string;
  website?: string;
  services?: string;
  storeAddress?: string;
  storeType?: string;
}

export type StoresResponse = Store[];
