import { InjectionToken, Injectable } from '@angular/core';

export const ROOT_LOGO_URL = new InjectionToken('ROOT_LOGO_URL');
export const ENCRYPTION_SECRET_KEY = new InjectionToken('ENCRYPTION_SECRET_KEY');
export const FALLBACK_PROFILE_IMAGE_URL = new InjectionToken('FALLBACK_PROFILE_IMAGE_URL');

@Injectable({
  providedIn: 'root'
})
export class InjectionTokenUtils {
  constructor() { }
}
