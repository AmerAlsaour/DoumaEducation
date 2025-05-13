import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LanguageService } from "../../services/language.service";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-gray-800 text-white py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <p class="text-center md:text-left">
              {{
                currentLang === "ar"
                  ? "© 2025 إعداد المهندس عامر الساعور"
                  : "© 2025 Prepared by Eng. Amer Al-Saour."
              }}
            </p>
          </div>
          <div>
            <ul class="flex space-x-6 rtl:space-x-reverse">
              <li>
                <a href="#" class="hover:text-primary-300 transition-colors">
                  {{ currentLang === "ar" ? "الرئيسية" : "Home" }}
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-primary-300 transition-colors">
                  {{ currentLang === "ar" ? "حول" : "About" }}
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-primary-300 transition-colors">
                  {{ currentLang === "ar" ? "اتصل بنا" : "Contact" }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  currentLang = "ar";

  constructor(private languageService: LanguageService) {
    this.languageService.currentLang$.subscribe((lang) => {
      this.currentLang = lang;
    });
  }
}
