import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.darkModeSubject.asObservable();

  constructor() {}

  initTheme() {
    // Check if theme preference is stored
    const storedTheme = localStorage.getItem('theme');
    
    // Check for system preference if no stored preference
    if (!storedTheme) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark);
    } else {
      const isDarkMode = storedTheme === 'dark';
      this.setTheme(isDarkMode);
    }
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches);
      }
    });
  }

  toggleTheme() {
    const isDarkMode = this.darkModeSubject.getValue();
    this.setTheme(!isDarkMode);
  }

  setTheme(isDarkMode: boolean) {
    this.darkModeSubject.next(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}