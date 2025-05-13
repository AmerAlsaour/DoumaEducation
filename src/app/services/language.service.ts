import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageSubject = new BehaviorSubject<string>('ar'); // Default to Arabic
  currentLang$ = this.languageSubject.asObservable();

  constructor() {
    // Check if language is stored in localStorage
    const storedLang = localStorage.getItem('preferredLanguage');
    if (storedLang && ['ar', 'en'].includes(storedLang)) {
      this.languageSubject.next(storedLang);
    }
  }

  setLanguage(lang: string) {
    if (['ar', 'en'].includes(lang)) {
      this.languageSubject.next(lang);
      localStorage.setItem('preferredLanguage', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }

  toggleLanguage() {
    const currentLang = this.languageSubject.getValue();
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    this.setLanguage(newLang);
  }

  getCurrentLang(): string {
    return this.languageSubject.getValue();
  }
}