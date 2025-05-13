import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgChartsModule } from "ng2-charts";
import { Chart, ChartConfiguration, ChartEvent, ChartType } from "chart.js";
import { EducationalData } from "../../models/educational-data.model";

@Component({
  selector: "app-charts",
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  template: `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Gender Distribution Chart -->
      <div class="card slide-in">
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            {{
              currentLang === "ar"
                ? "توزيع الطلاب حسب الجنس"
                : "Student Distribution by Gender"
            }}
          </h3>
          <div class="h-64">
            <canvas
              baseChart
              [data]="genderChartData.data"
              [options]="genderChartData.options"
              [type]="genderChartData.type"
            >
            </canvas>
          </div>
        </div>
      </div>

      <!-- School Type Distribution Chart -->
      <div class="card slide-in">
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            {{
              currentLang === "ar"
                ? "توزيع المدارس حسب النوع"
                : "School Distribution by Type"
            }}
          </h3>
          <div class="h-64">
            <canvas
              baseChart
              [data]="schoolTypeChartData.data"
              [options]="schoolTypeChartData.options"
              [type]="schoolTypeChartData.type"
            >
            </canvas>
          </div>
        </div>
      </div>

      <!-- Education Level Chart -->
      <div class="card slide-in">
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            {{
              currentLang === "ar"
                ? "توزيع الطلاب حسب المرحلة الدراسية"
                : "Student Distribution by Education Level"
            }}
          </h3>
          <div class="h-64">
            <canvas
              baseChart
              [data]="educationLevelChartData.data"
              [options]="educationLevelChartData.options"
              [type]="educationLevelChartData.type"
            >
            </canvas>
          </div>
        </div>
      </div>

      <!-- Student-Teacher Ratio Chart -->
      <div class="card slide-in">
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            {{
              currentLang === "ar"
                ? "نسبة الطلاب إلى المعلمين"
                : "Student-Teacher Ratio"
            }}
          </h3>
          <div class="h-64">
            <canvas
              baseChart
              [data]="ratioChartData.data"
              [options]="ratioChartData.options"
              [type]="ratioChartData.type"
            >
            </canvas>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ChartsComponent implements OnChanges {
  @Input() data: EducationalData[] = [];
  @Input() currentLang: string = "ar";
  genderChartData: {
    type: ChartType;
    data: ChartConfiguration["data"];
    options: ChartConfiguration["options"];
  } = {
    type: "doughnut",
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    },
    options: {},
  };

  schoolTypeChartData: {
    type: ChartType;
    data: ChartConfiguration["data"];
    options: ChartConfiguration["options"];
  } = {
    type: "pie",
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
          borderColor: [],
          borderWidth: 1,
        },
      ],
    },
    options: {},
  };

  educationLevelChartData: {
    type: ChartType;
    data: ChartConfiguration["data"];
    options: ChartConfiguration["options"];
  } = {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: "",
          borderColor: "",
          borderWidth: 1,
        },
      ],
    },
    options: {},
  };

  ratioChartData: {
    type: ChartType;
    data: ChartConfiguration["data"];
    options: ChartConfiguration["options"];
  } = {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          backgroundColor: "",
          borderColor: "",
          borderWidth: 1,
        },
      ],
    },
    options: {},
  };

  constructor() {
    // Initialize charts with empty data
    this.initializeCharts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["data"] || changes["currentLang"]) {
      this.updateCharts();
    }
  }

  private initializeCharts() {
    // Common options for RTL support
    const commonOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          rtl: this.currentLang === "ar",
          labels: {
            color: "rgb(156, 163, 175)",
          },
        },
        tooltip: {
          rtl: this.currentLang === "ar",
          titleAlign: this.currentLang === "ar" ? "right" : "left",
          bodyAlign: this.currentLang === "ar" ? "right" : "left",
        },
      },
    };

    // Gender Chart
    // this.genderChartData = {
    //   type: 'doughnut',
    //   data: {
    //     labels: this.currentLang === 'ar' ? ['ذكور', 'إناث'] : ['Male', 'Female'],
    //     datasets: [
    //       {
    //         data: [0, 0],
    //         backgroundColor: ['rgba(59, 130, 246, 0.7)', 'rgba(236, 72, 153, 0.7)'],
    //         borderColor: ['rgb(59, 130, 246)', 'rgb(236, 72, 153)'],
    //         borderWidth: 1
    //       }
    //     ]
    //   },
    //   options: {
    //     ...commonOptions,
    //     elements: {
    //       arc: {
    //         cutout: '70%'
    //       }
    //     }
    //   }
    // };
    this.genderChartData = {
      type: "bar",
      data: {
        labels: ["Label1", "Label2"],
        datasets: [
          {
            label: "Dataset 1",
            data: [10, 20],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "black",
            },
          },
          tooltip: {
            titleAlign: "center",
            bodyAlign: "center",
          },
        },
      },
    };

    // School Type Chart
    this.schoolTypeChartData = {
      type: "pie",
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "rgba(59, 130, 246, 0.7)",
              "rgba(16, 185, 129, 0.7)",
              "rgba(245, 158, 11, 0.7)",
              "rgba(139, 92, 246, 0.7)",
            ],
            borderColor: [
              "rgb(59, 130, 246)",
              "rgb(16, 185, 129)",
              "rgb(245, 158, 11)",
              "rgb(139, 92, 246)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "black",
            },
          },
          tooltip: {
            titleAlign: "center",
            bodyAlign: "center",
          },
        },
      },
    };

    // Education Level Chart
    this.educationLevelChartData = {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label:
              this.currentLang === "ar" ? "عدد الطلاب" : "Number of Students",
            data: [],
            backgroundColor: "rgba(59, 130, 246, 0.7)",
            borderColor: "rgb(59, 130, 246)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "black",
            },
          },
          tooltip: {
            titleAlign: "center",
            bodyAlign: "center",
          },
        },
      },
    };

    // Student-Teacher Ratio Chart
    this.ratioChartData = {
      type: "bar",
      data: {
        labels: [],
        datasets: [
          {
            label:
              this.currentLang === "ar"
                ? "نسبة الطلاب إلى المعلمين"
                : "Student-Teacher Ratio",
            data: [],
            backgroundColor: "rgba(16, 185, 129, 0.7)",
            borderColor: "rgb(16, 185, 129)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "black",
            },
          },
          tooltip: {
            titleAlign: "center",
            bodyAlign: "center",
          },
        },
      },
    };
  }

  private updateCharts() {
    // Update chart labels based on language
    this.updateChartLabels();

    if (!this.data || this.data.length === 0) {
      return;
    }

    // Update Gender Chart
    const maleStudents = this.data
      .filter((item) => item.gender === "male")
      .reduce((sum, item) => sum + item.numberOfStudents, 0);

    const femaleStudents = this.data
      .filter((item) => item.gender === "female")
      .reduce((sum, item) => sum + item.numberOfStudents, 0);

    this.genderChartData.data.datasets[0].data = [maleStudents, femaleStudents];

    // Update School Type Chart
    const schoolTypeMap = new Map<string, number>();
    this.data.forEach((item) => {
      const currentCount = schoolTypeMap.get(item.schoolType) || 0;
      schoolTypeMap.set(item.schoolType, currentCount + 1);
    });

    this.schoolTypeChartData.data.labels = Array.from(schoolTypeMap.keys()).map(
      (type) =>
        this.currentLang === "ar" ? this.getArabicSchoolType(type) : type
    );
    this.schoolTypeChartData.data.datasets[0].data = Array.from(
      schoolTypeMap.values()
    );

    // Update Education Level Chart
    const educationLevelMap = new Map<string, number>();
    this.data.forEach((item) => {
      const currentCount = educationLevelMap.get(item.educationLevel) || 0;
      educationLevelMap.set(
        item.educationLevel,
        currentCount + item.numberOfStudents
      );
    });

    this.educationLevelChartData.data.labels = Array.from(
      educationLevelMap.keys()
    ).map((level) =>
      this.currentLang === "ar" ? this.getArabicEducationLevel(level) : level
    );
    this.educationLevelChartData.data.datasets[0].data = Array.from(
      educationLevelMap.values()
    );

    // Update Student-Teacher Ratio Chart
    const schoolRatioMap = new Map<
      string,
      { students: number; teachers: number }
    >();

    this.data.forEach((item) => {
      if (!schoolRatioMap.has(item.schoolName)) {
        schoolRatioMap.set(item.schoolName, { students: 0, teachers: 0 });
      }

      const current = schoolRatioMap.get(item.schoolName)!;
      current.students += item.numberOfStudents;
      current.teachers += item.numberOfTeachers;
      schoolRatioMap.set(item.schoolName, current);
    });

    // Get top 5 schools by student count for the ratio chart
    const topSchools = Array.from(schoolRatioMap.entries())
      .sort((a, b) => b[1].students - a[1].students)
      .slice(0, 5);

    this.ratioChartData.data.labels = topSchools.map(([name]) => name);
    this.ratioChartData.data.datasets[0].data = topSchools.map(([_, values]) =>
      values.teachers > 0 ? +(values.students / values.teachers).toFixed(1) : 0
    );
  }

  private updateChartLabels() {
    // Update labels based on current language
    this.genderChartData.data.labels =
      this.currentLang === "ar" ? ["ذكور", "إناث"] : ["Male", "Female"];

    this.genderChartData.options!.plugins!.legend!.rtl =
      this.currentLang === "ar";
    this.genderChartData.options!.plugins!.tooltip!.rtl =
      this.currentLang === "ar";

    this.schoolTypeChartData.options!.plugins!.legend!.rtl =
      this.currentLang === "ar";
    this.schoolTypeChartData.options!.plugins!.tooltip!.rtl =
      this.currentLang === "ar";

    this.educationLevelChartData.options!.plugins!.legend!.rtl =
      this.currentLang === "ar";
    this.educationLevelChartData.options!.plugins!.tooltip!.rtl =
      this.currentLang === "ar";
    this.educationLevelChartData.data.datasets[0].label =
      this.currentLang === "ar" ? "عدد الطلاب" : "Number of Students";

    this.ratioChartData.options!.plugins!.legend!.rtl =
      this.currentLang === "ar";
    this.ratioChartData.options!.plugins!.tooltip!.rtl =
      this.currentLang === "ar";
    this.ratioChartData.data.datasets[0].label =
      this.currentLang === "ar"
        ? "نسبة الطلاب إلى المعلمين"
        : "Student-Teacher Ratio";
  }

  private getArabicEducationLevel(level: string): string {
    const mapping: { [key: string]: string } = {
      elementary: "ابتدائي",
      middle: "إعدادي",
      high: "ثانوي",
      primary: "ابتدائي",
    };
    return mapping[level] || level;
  }

  private getArabicSchoolType(type: string): string {
    const mapping: { [key: string]: string } = {
      public: "حكومي",
      private: "خاص",
      religious: "ديني",
    };
    return mapping[type] || type;
  }
}
