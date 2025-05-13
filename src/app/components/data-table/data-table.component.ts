import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationalData } from '../../models/educational-data.model';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card slide-in">
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          {{ currentLang === 'ar' ? 'بيانات المدارس التفصيلية' : 'Detailed School Data' }}
        </h2>
        
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th scope="col" class="cursor-pointer" (click)="sortData('schoolName')">
                  {{ currentLang === 'ar' ? 'اسم المدرسة' : 'School Name' }}
                  <span *ngIf="sortColumn === 'schoolName'">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th scope="col" class="cursor-pointer" (click)="sortData('educationLevel')">
                  {{ currentLang === 'ar' ? 'المرحلة الدراسية' : 'Education Level' }}
                  <span *ngIf="sortColumn === 'educationLevel'">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th scope="col" class="cursor-pointer" (click)="sortData('schoolType')">
                  {{ currentLang === 'ar' ? 'نوع المدرسة' : 'School Type' }}
                  <span *ngIf="sortColumn === 'schoolType'">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th scope="col" class="cursor-pointer" (click)="sortData('gender')">
                  {{ currentLang === 'ar' ? 'الجنس' : 'Gender' }}
                  <span *ngIf="sortColumn === 'gender'">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th scope="col" class="cursor-pointer" (click)="sortData('numberOfStudents')">
                  {{ currentLang === 'ar' ? 'عدد الطلاب' : 'Number of Students' }}
                  <span *ngIf="sortColumn === 'numberOfStudents'">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
                <th scope="col" class="cursor-pointer" (click)="sortData('numberOfTeachers')">
                  {{ currentLang === 'ar' ? 'عدد المعلمين' : 'Number of Teachers' }}
                  <span *ngIf="sortColumn === 'numberOfTeachers'">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let item of sortedData">
                <td class="font-medium text-gray-900 dark:text-white">
                  {{ item.schoolName }}
                </td>
                <td>
                  {{ currentLang === 'ar' ? getArabicEducationLevel(item.educationLevel) : item.educationLevel }}
                </td>
                <td>
                  {{ currentLang === 'ar' ? getArabicSchoolType(item.schoolType) : item.schoolType }}
                </td>
                <td>
                  {{ currentLang === 'ar' ? (item.gender === 'male' ? 'ذكور' : 'إناث') : item.gender }}
                </td>
                <td class="text-right">
                  {{ item.numberOfStudents }}
                </td>
                <td class="text-right">
                  {{ item.numberOfTeachers }}
                </td>
              </tr>
              
              <!-- No data message -->
              <tr *ngIf="sortedData.length === 0">
                <td [attr.colspan]="6" class="text-center py-4">
                  {{ currentLang === 'ar' ? 'لا توجد بيانات متاحة' : 'No data available' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination (simplified) -->
        <div *ngIf="sortedData.length > 0" class="mt-4 flex justify-between items-center">
          <div>
            <span class="text-sm text-gray-700 dark:text-gray-300">
              {{ currentLang === 'ar' ? 'عرض ' + sortedData.length + ' من أصل ' + data.length + ' مدرسة' : 
                'Showing ' + sortedData.length + ' of ' + data.length + ' schools' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class DataTableComponent implements OnChanges {
  @Input() data: EducationalData[] = [];
  @Input() currentLang: string = 'ar';
  
  sortedData: EducationalData[] = [];
  sortColumn: string = 'schoolName';
  sortDirection: 'asc' | 'desc' = 'asc';

  ngOnChanges() {
    this.sortData(this.sortColumn);
  }

  sortData(column: string) {
    // If clicking the same column, toggle direction
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    // Make a copy of the data array
    this.sortedData = [...this.data];
    
    // Sort based on column and direction
    this.sortedData.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];
      
      // For numerical values
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' 
          ? valueA - valueB 
          : valueB - valueA;
      }
      
      // For string values
      const compareResult = String(valueA).localeCompare(String(valueB));
      return this.sortDirection === 'asc' 
        ? compareResult 
        : -compareResult;
    });
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