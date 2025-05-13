import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { EducationalData } from '../models/educational-data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly SHEET_ID = '1Jc7-DWNaaqVY7GjGeNBnmmgKVtMhX9aO';
  private readonly SHEET_NAME = 'Sheet1';
  private readonly API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${this.SHEET_ID}/values/${this.SHEET_NAME}?alt=json&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs`;

  // Backup mock data in case API access fails
  private mockData: EducationalData[] = [
    {
      id: '1',
      schoolName: 'مدرسة ابن خلدون',
      educationLevel: 'elementary',
      schoolType: 'public',
      gender: 'male',
      numberOfStudents: 450,
      numberOfTeachers: 25,
      address: 'حي المنشية، دوما',
      foundationYear: 1980
    },
    {
      id: '2',
      schoolName: 'مدرسة الفارابي',
      educationLevel: 'middle',
      schoolType: 'public',
      gender: 'male',
      numberOfStudents: 380,
      numberOfTeachers: 22,
      address: 'حي الجلاء، دوما',
      foundationYear: 1985
    },
    {
      id: '3',
      schoolName: 'ثانوية المتفوقين',
      educationLevel: 'high',
      schoolType: 'public',
      gender: 'male',
      numberOfStudents: 320,
      numberOfTeachers: 28,
      address: 'حي القصور، دوما',
      foundationYear: 1990
    },
    {
      id: '4',
      schoolName: 'مدرسة الزهراء',
      educationLevel: 'elementary',
      schoolType: 'public',
      gender: 'female',
      numberOfStudents: 420,
      numberOfTeachers: 30,
      address: 'حي المنشية، دوما',
      foundationYear: 1982
    },
    {
      id: '5',
      schoolName: 'مدرسة الخنساء',
      educationLevel: 'middle',
      schoolType: 'public',
      gender: 'female',
      numberOfStudents: 360,
      numberOfTeachers: 26,
      address: 'حي الجلاء، دوما',
      foundationYear: 1988
    },
    {
      id: '6',
      schoolName: 'ثانوية المتفوقات',
      educationLevel: 'high',
      schoolType: 'public',
      gender: 'female',
      numberOfStudents: 300,
      numberOfTeachers: 25,
      address: 'حي القصور، دوما',
      foundationYear: 1995
    },
    {
      id: '7',
      schoolName: 'مدرسة النور الخاصة',
      educationLevel: 'elementary',
      schoolType: 'private',
      gender: 'male',
      numberOfStudents: 200,
      numberOfTeachers: 18,
      address: 'حي التضامن، دوما',
      foundationYear: 2000
    },
    {
      id: '8',
      schoolName: 'مدرسة الإبداع الخاصة',
      educationLevel: 'middle',
      schoolType: 'private',
      gender: 'male',
      numberOfStudents: 180,
      numberOfTeachers: 15,
      address: 'حي القصور، دوما',
      foundationYear: 2005
    },
    {
      id: '9',
      schoolName: 'مدرسة السلام الخاصة',
      educationLevel: 'elementary',
      schoolType: 'private',
      gender: 'female',
      numberOfStudents: 220,
      numberOfTeachers: 20,
      address: 'حي التضامن، دوما',
      foundationYear: 2002
    },
    {
      id: '10',
      schoolName: 'مدرسة الروضة الخاصة',
      educationLevel: 'middle',
      schoolType: 'private',
      gender: 'female',
      numberOfStudents: 190,
      numberOfTeachers: 16,
      address: 'حي القصور، دوما',
      foundationYear: 2007
    },
    {
      id: '11',
      schoolName: 'مدرسة تحفيظ القرآن',
      educationLevel: 'elementary',
      schoolType: 'religious',
      gender: 'male',
      numberOfStudents: 150,
      numberOfTeachers: 10,
      address: 'حي الجامع الكبير، دوما',
      foundationYear: 1995
    },
    {
      id: '12',
      schoolName: 'مدرسة الفقه الإسلامي',
      educationLevel: 'high',
      schoolType: 'religious',
      gender: 'male',
      numberOfStudents: 120,
      numberOfTeachers: 12,
      address: 'حي الجامع الكبير، دوما',
      foundationYear: 1998
    }
  ];

  constructor(private http: HttpClient) {}

  getEducationalData(): Observable<EducationalData[]> {
    return this.http.get(this.API_URL).pipe(
      map((response: any) => {
        if (response.values && response.values.length > 1) {
          const headers = response.values[0];
          return response.values.slice(1).map((row: any[], index: number) => {
            return this.mapRowToData(headers, row, index);
          });
        }
        throw new Error('Invalid API response');
      }),
      catchError(error => {
        console.error('Error fetching Google Sheets data:', error);
        // Return mock data as fallback
        return of(this.mockData);
      })
    );
  }

  private mapRowToData(headers: string[], row: any[], index: number): EducationalData {
    const data: any = { id: (index + 1).toString() };
    
    headers.forEach((header, i) => {
      if (i < row.length) {
        const value = row[i];
        
        // Parse numeric values
        if (['numberOfStudents', 'numberOfTeachers', 'foundationYear'].includes(header)) {
          data[header] = parseInt(value, 10) || 0;
        } else {
          data[header] = value;
        }
      }
    });
    
    return data as EducationalData;
  }
}