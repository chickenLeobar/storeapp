import { InjectionToken } from '@angular/core';
export const CONFIG_CLOUDINARY = new InjectionToken<Config>(
  'cloudinary_config'
);
export type Config = {
  url: string;
  uploadPreset: string;
  apiKey: string;
  cloudName: string;
};

export interface CloudinaryResponse {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: any[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
  api_key: string;
}
