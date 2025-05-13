import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card mb-8 slide-in">
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          {{ currentLang === 'ar' ? 'تصفية البيانات' : 'Filter Data' }}
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Gender Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ currentLang === 'ar' ? 'الجنس' : 'Gender' }}
            </label>
            <select 
              [(ngModel)]="filters.gender"
              (change)="updateFilters()"
              class="input"
            >
              <option value="">{{ currentLang === 'ar' ? 'الكل' : 'All' }}</option>
              <option value="male">{{ currentLang === 'ar' ? 'ذكر' : 'Male' }}</option>
              <option value="female">{{ currentLang === 'ar' ? 'أنثى' : 'Female' }}</option>
            </select>
          </div>
          
          <!-- Education Level Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ currentLang === 'ar' ? 'المرحلة الدراسية' : 'Education Level' }}
            </label>
            <select 
              [(ngModel)]="filters.educationLevel"
              (change)="updateFilters()"
              class="input"
            >
              <option value="">{{ currentLang === 'ar' ? 'الكل' : 'All' }}</option>
              <option *ngFor="let level of educationLevels" [value]="level">
                {{ currentLang === 'ar' ? getArabicEducationLevel(level) : level }}
              </option>
            </select>
          </div>
          
          <!-- School Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ currentLang === 'ar' ? 'نوع المدرسة' : 'School Type' }}
            </label>
            <select 
              [(ngModel)]="filters.schoolType"
              (change)="updateFilters()"
              class="input"
            >
              <option value="">{{ currentLang === 'ar' ? 'الكل' : 'All' }}</option>
              <option *ngFor="let type of schoolTypes" [value]="type">
                {{ currentLang === 'ar' ? getArabicSchoolType(type) : type }}
              </option>
            </select>
          </div>
        </div>
        
        <!-- Reset button -->
        <div class="mt-4 flex justify-end">
          <button 
            (click)="resetFilters()" 
            class="btn bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
          >
            {{ currentLang === 'ar' ? 'إعادة تعيين' : 'Reset' }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class FilterComponent implements OnInit {
  @Input() filters: any = {
    gender: '',
    educationLevel: '',
    schoolType: ''
  };
  
  @Output() filtersChanged = new EventEmitter<any>();
  
  currentLang = 'ar';
  educationLevels: string[] = [];
  schoolTypes: string[] = [];

  constructor(
    private languageService: LanguageService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
    
    // Get unique education levels and school types from data
    this.dataService.getEducationalData().subscribe(data => {
      this.educationLevels = [...new Set(data.map(item => item.educationLevel))];
      this.schoolTypes = [...new Set(data.map(item => item.schoolType))];
    });
  }

  updateFilters() {
    this.filtersChanged.emit(this.filters);
  }

  resetFilters() {
    this.filters = {
      gender: '',
      educationLevel: '',
      schoolType: ''
    };
    this.filtersChanged.emit(this.filters);
  }

  getArabicEducationLevel(level: string): string {
    const mapping: {[key: string]: string} = {
      'elementary': 'ابتدائي',
      'middle': 'إعدادي',
      'high': 'ثانوي',
      'primary': 'ابتدائي'
    };
    return mapping[level] || level;
  }

  getArabicSchoolType(type: string): string {
    const mapping: {[key: string]: string} = {
      'public': 'حكومي',
      'private': 'خاص',
      'religious': 'ديني'
    };
    return mapping[type] || type;
  }
}