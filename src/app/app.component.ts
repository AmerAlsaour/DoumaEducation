import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LanguageService } from "./services/language.service";
import { ThemeService } from "./services/theme.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
  ],
  template: `
    <router-outlet>
      <div
        class="min-h-screen flex flex-col"
        [dir]="currentLang === 'ar' ? 'rtl' : 'ltr'"
      >
        <app-header></app-header>
        <main class="flex-grow container mx-auto px-4 py-8">
          <app-dashboard></app-dashboard>
        </main>
        <app-footer></app-footer>
      </div>
    </router-outlet>
  `,
})
export class AppComponent implements OnInit {
  currentLang = "ar"; // Default language is Arabic

  constructor(
    private languageService: LanguageService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // Initialize language
    this.languageService.currentLang$.subscribe((lang) => {
      this.currentLang = lang;
    });

    // Initialize theme
    this.themeService.initTheme();
  }
}
