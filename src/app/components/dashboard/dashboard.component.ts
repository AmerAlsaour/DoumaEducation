import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { LanguageService } from '../../services/language.service';
import { FormsModule } from '@angular/forms';
import { StatsCardComponent } from '../stats-card/stats-card.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { ChartsComponent } from '../charts/charts.component';
import { FilterComponent } from '../filter/filter.component';
import { EducationalData } from '../../models/educational-data.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StatsCardComponent,
    DataTableComponent,
    ChartsComponent,
    FilterComponent
  ],
  template: `
    <div class="fade-in">
      <div *ngIf="isLoading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-500 border-solid"></div>
      </div>

      <div *ngIf="!isLoading && error" class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">{{ currentLang === 'ar' ? 'خطأ!' : 'Error!' }}</strong>
        <span class="block sm:inline">{{ error }}</span>
      </div>

      <div *ngIf="!isLoading && !error">
        <!-- Page Title -->
        <h1 class="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
          {{ currentLang === 'ar' ? 'لوحة البيانات التعليمية - دوما' : 'Educational Data Dashboard - Douma' }}
        </h1>

        <!-- Filters -->
        <app-filter
          [filters]="filters"
          (filtersChanged)="applyFilters($event)"
        ></app-filter>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <app-stats-card
            [title]="currentLang === 'ar' ? 'إجمالي الطلاب' : 'Total Students'"
            [value]="stats.totalStudents"
            icon="users"
            colorClass="bg-primary-500"
          ></app-stats-card>
          <app-stats-card
            [title]="currentLang === 'ar' ? 'إجمالي المدارس' : 'Total Schools'"
            [value]="stats.totalSchools"
            icon="building"
            colorClass="bg-secondary-500"
          ></app-stats-card>
          <app-stats-card
            [title]="currentLang === 'ar' ? 'طلاب ذكور' : 'Male Students'"
            [value]="stats.maleStudents"
            icon="male"
            colorClass="bg-blue-500"
          ></app-stats-card>
          <app-stats-card
            [title]="currentLang === 'ar' ? 'طالبات إناث' : 'Female Students'"
            [value]="stats.femaleStudents"
            icon="female"
            colorClass="bg-pink-500"
          ></app-stats-card>
        </div>

        <!-- Charts -->
        <div class="mb-8">
          <app-charts
            [data]="filteredData"
            [currentLang]="currentLang"
          ></app-charts>
        </div>

        <!-- Data Table -->
        <div>
          <app-data-table
            [data]="filteredData"
            [currentLang]="currentLang"
          ></app-data-table>
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  isLoading = true;
  error: string | null = null;
  allData: EducationalData[] = [];
  filteredData: EducationalData[] = [];
  currentLang = 'ar';
  
  filters = {
    gender: '',
    educationLevel: '',
    schoolType: ''
  };
  
  stats = {
    totalStudents: 0,
    totalSchools: 0,
    maleStudents: 0,
    femaleStudents: 0
  };

  constructor(
    private dataService: DataService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });

    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.dataService.getEducationalData().subscribe({
      next: (data) => {
        this.allData = data;
        this.filteredData = [...data];
        this.calculateStats(this.filteredData);
        this.isLoading = false;
      },
      error: (err) => {
        this.error = this.currentLang === 'ar' 
          ? 'حدث خطأ أثناء تحميل البيانات. يرجى المحاولة مرة أخرى لاحقًا.' 
          : 'An error occurred while loading data. Please try again later.';
        this.isLoading = false;
        console.error('Error loading data:', err);
      }
    });
  }

  applyFilters(newFilters: any) {
    this.filters = { ...newFilters };
    
    this.filteredData = this.allData.filter(item => {
      return (
        (this.filters.gender === '' || item.gender === this.filters.gender) &&
        (this.filters.educationLevel === '' || item.educationLevel === this.filters.educationLevel) &&
        (this.filters.schoolType === '' || item.schoolType === this.filters.schoolType)
      );
    });
    
    this.calculateStats(this.filteredData);
  }

  calculateStats(data: EducationalData[]) {
    // Calculate total students
    this.stats.totalStudents = data.reduce((sum, item) => sum + item.numberOfStudents, 0);
    
    // Count unique schools
    const uniqueSchools = new Set(data.map(item => item.schoolName));
    this.stats.totalSchools = uniqueSchools.size;
    
    // Calculate gender distribution
    this.stats.maleStudents = data
      .filter(item => item.gender === 'male')
      .reduce((sum, item) => sum + item.numberOfStudents, 0);
      
    this.stats.femaleStudents = data
      .filter(item => item.gender === 'female')
      .reduce((sum, item) => sum + item.numberOfStudents, 0);
  }
}