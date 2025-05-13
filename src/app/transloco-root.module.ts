import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule
} from '@ngneat/transloco';
import { Injectable, NgModule } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<Translation> {
    // Define translations inline for simplicity
    const translations: Record<string, Record<string, string>> = {
      en: {
        title: 'Douma Educational Data',
        home: 'Home',
        about: 'About',
        contact: 'Contact',
        filters: 'Filters',
        reset: 'Reset',
        gender: 'Gender',
        male: 'Male',
        female: 'Female',
        all: 'All',
        educationLevel: 'Education Level',
        elementary: 'Elementary',
        middle: 'Middle',
        high: 'High',
        schoolType: 'School Type',
        public: 'Public',
        private: 'Private',
        religious: 'Religious',
        totalStudents: 'Total Students',
        totalSchools: 'Total Schools',
        maleStudents: 'Male Students',
        femaleStudents: 'Female Students',
        studentTeacherRatio: 'Student-Teacher Ratio',
        schoolName: 'School Name',
        numberOfStudents: 'Number of Students',
        numberOfTeachers: 'Number of Teachers',
        noData: 'No data available',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        detailedData: 'Detailed School Data',
        showingEntries: 'Showing {{count}} of {{total}} entries'
      },
      ar: {
        title: 'بيانات دوما التعليمية',
        home: 'الرئيسية',
        about: 'حول',
        contact: 'اتصل بنا',
        filters: 'التصفية',
        reset: 'إعادة تعيين',
        gender: 'الجنس',
        male: 'ذكر',
        female: 'أنثى',
        all: 'الكل',
        educationLevel: 'المرحلة الدراسية',
        elementary: 'ابتدائي',
        middle: 'إعدادي',
        high: 'ثانوي',
        schoolType: 'نوع المدرسة',
        public: 'حكومي',
        private: 'خاص',
        religious: 'ديني',
        totalStudents: 'إجمالي الطلاب',
        totalSchools: 'إجمالي المدارس',
        maleStudents: 'طلاب ذكور',
        femaleStudents: 'طالبات إناث',
        studentTeacherRatio: 'نسبة الطلاب إلى المعلمين',
        schoolName: 'اسم المدرسة',
        numberOfStudents: 'عدد الطلاب',
        numberOfTeachers: 'عدد المعلمين',
        noData: 'لا توجد بيانات متاحة',
        darkMode: 'الوضع الداكن',
        lightMode: 'الوضع الفاتح',
        detailedData: 'بيانات المدارس التفصيلية',
        showingEntries: 'عرض {{count}} من أصل {{total}} مدخل'
      }
    };

    return of(translations[lang] || translations['en']);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'ar'],
        defaultLang: 'ar',
        reRenderOnLangChange: true,
        prodMode: false
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
  ]
})
export class TranslocoRootModule {}