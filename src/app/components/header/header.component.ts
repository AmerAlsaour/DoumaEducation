import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  template: `
    <header class="bg-primary-700 text-white shadow-md">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold">{{ currentLang === 'ar' ? 'بيانات دوما التعليمية' : 'Douma Educational Data' }}</h1>
          </div>
          <div class="flex space-x-4 rtl:space-x-reverse items-center">
            <!-- Theme Toggle -->
            <button 
              (click)="toggleTheme()" 
              class="p-2 rounded-full hover:bg-primary-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" *ngIf="!isDarkMode" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" *ngIf="isDarkMode" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            
            <!-- Language Toggle -->
            <button 
              (click)="toggleLanguage()" 
              class="p-2 rounded-md bg-primary-600 hover:bg-primary-500 transition-colors"
              aria-label="Toggle language"
            >
              {{ currentLang === 'ar' ? 'English' : 'العربية' }}
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent {
  currentLang = 'ar';
  isDarkMode = false;

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService
  ) {
    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });

    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  toggleLanguage() {
    this.languageService.toggleLanguage();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}