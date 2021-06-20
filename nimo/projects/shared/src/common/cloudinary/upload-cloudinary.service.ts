import { tap, catchError, pluck, mergeMap, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONFIG_CLOUDINARY, Config, CloudinaryResponse } from './internals';
@Injectable()
export class CloudinaryService {
  constructor(
    private http: HttpClient,
    @Inject(CONFIG_CLOUDINARY) private config: Config
  ) {}
  private uploadFileCloudinary(
    file: File,
    auth: { timestamp: number; signature: string }
  ): Observable<CloudinaryResponse> {
    const formData = new FormData();
    const url = `https://api.cloudinary.com/v1_1/${this.config.cloudName}/upload`;
    formData.append('file', file);
    formData.append('api_key', this.config.apiKey);
    formData.append('timestamp', String(auth.timestamp));
    formData.append('upload_preset', this.config.uploadPreset);
    formData.append('signature', auth.signature);
    const headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');
    return this.http.post(url, formData, { headers }) as Observable<
      CloudinaryResponse
    >;
  }
  public uploadFile(file: File): Observable<CloudinaryResponse> {
    return this.getSignature().pipe(
      mergeMap(res => this.uploadFileCloudinary(file, res))
    );
  }

  private getSignature(): Observable<{ signature: string; timestamp: number }> {
    return this.http.get<{ signature: string; timestamp: number }>(
      `${this.config.url}`
    );
  }
  public deleteResource(publicId: string) {
    return this.http.delete(this.config.url.concat(`/${publicId}`));
  }
  // edit resource
  public deleteAndCreate(publicId: string, file: File) {
    return this.deleteResource(publicId).pipe(
      switchMap(res => this.uploadFile(file))
    );
  }
}
