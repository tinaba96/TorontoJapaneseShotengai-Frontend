/**
 * 賃貸物件関連の型定義
 */

export interface CreatePropertyRequest {
  title: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  address: string;
  rent: string;
  size: string;
  rooms: string;
  utilities?: string;
  parking?: string;
  petPolicy?: string;
}

export interface PropertyApi {
  id: string;
  title: string;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  address: string;
  rent: string;
  size: string;
  rooms: string;
  utilities?: string;
  parking?: string;
  petPolicy?: string;
  creator_id: string;
  status: string;
  created_at: string;
  updated_at?: string;
}

export interface UpdatePropertyRequest {
  title?: string;
  description?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  rent?: string;
  size?: string;
  rooms?: string;
  utilities?: string;
  parking?: string;
  petPolicy?: string;
}

export type PropertiesResponse = PropertyApi[];
