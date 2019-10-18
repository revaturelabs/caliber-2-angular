// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Batch} from "../app/domain/model/batch.dto";

/**
 * @ignore
 */

const serverRoot: string = 'http://localhost:10000';
export const environment = {
  production: false,
  serverRootURL: serverRoot,
  api: {
    assessments: {
      create: `${serverRoot}/assessment/all/assessment/create`,
      update: `${serverRoot}/assessment/all/assessment/update`,
      upsert: `${serverRoot}/assessment/note`,
      delete(assessmentId: number): string {
        return `${serverRoot}/assessment/all/assessment/delete/${assessmentId}`;
      },
      allByBatchIdAndWeek(batchId: number, week: number): string {
        return `${serverRoot}/assessment/all/assessment/batch/${batchId}/?week=${week}`;
      },
      batchNoteByBatchAndWeek(batchId: number, week: number): string {
        return `${serverRoot}/assessment/batch/${batchId}/${week}/note`;
      },
      allByWeek(week: number): string {
        return `${serverRoot}/assessment/all/`
      },
      allByBatchId(batchId: number): string {
        return `${serverRoot}/assessment/all/assessment/batch/${batchId}`;
      },
      grades: {
        byBatchAndWeek(batchId: number, week: number): string {
          return `${serverRoot}/assessment/all/grade/batch/${batchId}?week=${week}`;
        },
        byBatch(batchId: number): string {
          return `${serverRoot}/assessment/all/grade/batch/${batchId}`;
        },
        byTrainee(traineeId: number): string {
          return `${serverRoot}/assessment/all/grade/trainee/${traineeId}`;
        },
        upsert: `${serverRoot}/assessment/grade`,
        all: `${serverRoot}/assessment/all/grade/all`,
        missing: `${serverRoot}/assessment/all/grade/missingGrades`
      },
      notes: {
        byBatchAndWeek(batchId: number, week: number): string {
          return `${serverRoot}/assessment/all/note/batch/${batchId}/${week}`;
        }
      },
      weekNames: {
        byId(weekNameId: number): string {
          return `${serverRoot}/assessment/weekName/${weekNameId}`;
        },
        byBatchId(batchId: number): string {
          return `${serverRoot}/assessment/weekName/batch/${batchId}`;
        },
        upsert: `${serverRoot}/assessment/weekName/update`
      }
    },
    batches: {
      allByYearAndQuarter(year: number, quarter: number): string {
        return `${serverRoot}/batch/vp/batch/all/?year=${year}&quarter=${quarter}`;
      },
      allByYear(year: number): string {
        return `${serverRoot}/batch/vp/batch/${year}`;
      },
      addWeek(batch: Batch): string {
        return `${serverRoot}/batch/all/batch/update`;
      },
      byId(batchId: number): string {
        return `${serverRoot}/batch/all/batch/${batchId}`;
      },
      deleteById(batchId: number): string {
        return `${serverRoot}/batch/all/batch/delete/${batchId}`;
      },
      all: `${serverRoot}/batch/vp/batch/all/`,
      create: `${serverRoot}/batch/all/batch/create`,
      updateAndReturn: `${serverRoot}/batch/all/batch/update`,
      current: `${serverRoot}/batch/vp/batch/all/current`,
      benchmark(batchId: number): string {
        return `${serverRoot}/batch/${batchId}/benchmark`
      }
    },
    validYears: `${serverRoot}/batch/all/batch/valid_years`,
    categories: {
      active: `${serverRoot}/category/?active=true`,
      inactive: `${serverRoot}/category/?inactive=true`,
      all: `${serverRoot}/category/`,
      byId(categoryId: number): string {
        return `${serverRoot}/category/${categoryId}`;
      }
    },
    qa: {
      qcTraineeNotesByBatchAndWeek(batchId: number, week: number): string {
        return `${serverRoot}/qa/audit/trainee/notes/${batchId}/${week}`;
      },
      qcBatchNotesByBatchAndWeek(batchId: number, week: number): string {
        return `${serverRoot}/qa/audit/notes/overall/${batchId}/${week}`;
      },
      allNotesByBatch(batchId: number): string {
        return `${serverRoot}/qa/audit/notes/all/${batchId}`;
      },
      allQcNotesByBatchAndWeek(batchId: number, week: number): string {
        return `${serverRoot}/qa/audit/notes/${batchId}/${week}`;
      },
      allQcBatchNotes(batchId: number): string {
        return `${serverRoot}/qa/audit/batch/${batchId}`;
      },
      batchNotes: `${serverRoot}/qa/audit/batch/notes`,
      traineeNotes: `${serverRoot}/qa/audit/trainee/notes`,
      categories: {
        byBatchAndWeek(batchId: number, week: number): string {
          return `${serverRoot}/qa/category/${batchId}/${week}/all`
        },
        create: `${serverRoot}/qa/category`,
        delete(categoryId: number): string {
          return `${serverRoot}/qa/category/delete/${categoryId}`;
        }
      },
      weekNames: {
        byId(weekNameId: number): string {
          return `${serverRoot}/qa/weekName/${weekNameId}`;
        },
        byBatchId(batchId: number): string {
          return `${serverRoot}/qa/weekName/batch/${batchId}`;
        },
        upsert: `${serverRoot}/qa/weekName/update`
      }
    },
    location: {
      all: `${serverRoot}/location/all/location/all`,
      update: `${serverRoot}/location/vp/location/update`,
      create: `${serverRoot}/location/vp/location/create`
    },
    user: {
      trainees: {
        countByBatchId(batchId: number): string {
          return `${serverRoot}/user/trainee/${batchId}/count`
        },
        countInBatches(batchIds: number[]): string {
          return `${serverRoot}/user/all/trainee/count/`
        },
        inBatch(batchId: number): string {
          return `${serverRoot}/user/all/trainee/?batch=${batchId}`;
        },
        upsertComment: `${serverRoot}/user/all/trainee/update`,
        create: `${serverRoot}/user/all/trainee/create`,
        update: `${serverRoot}/user/all/trainee/update`,
        switchBatch: `${serverRoot}/user/trainee/switch`,
        delete(traineeId: number): string {
          return `${serverRoot}/user/all/trainee/delete/${traineeId}`;
        }
      },
      trainers: {
        all: `${serverRoot}/user/trainers/`,
        update(trainerId: number): string {
          return `${serverRoot}/user/trainers/${trainerId}`;
        }
      }
    },
    skilltypes: {
      all: `${serverRoot}/skill/types/skill/all`,
      byId(skilltypeId: number): string {
        return `${serverRoot}/skill/types/skill/${skilltypeId}`;
      },
      create: `${serverRoot}/skill/types/skill`,
      delete(skilltypeId: number): string {
        return `${serverRoot}/skill/types/skill/${skilltypeId}`
      }
    },
    reports: {
      overallBatchGradeComparison(batchId: number): string {
        return `${serverRoot}/assessment/grade/reports/${batchId}/overall`
      },
      overallBatchGradeComparisonByWeek(batchId: number, week: number): string {
        return `${serverRoot}/assessment/grade/reports/${batchId}/overall/${week}`
      },
      individualGradesComparedToRestOfBatch(traineeId: number): string {
        return `${serverRoot}/assessment/grade/reports/individual/${traineeId}`;
      },
      individualGradesComparedToRestOfBatchOnWeek(traineeId: number, week: number): string {
        return `${serverRoot}/assessment/grade/reports/individual/${traineeId}/${week}`;
      },
      spiderGraphData(batchId: number): string {
        return `${serverRoot}/assessment/grade/reports/${batchId}/spider`
      },
      spiderGraphDataForTrainee(batchId: number, traineeId: number): string {
        return `${serverRoot}/assessment/grade/reports/${batchId}/spider/${traineeId}`
      },
      weeklyAssessmentBreakdown(batchId: number, week: number): string {
        return `${serverRoot}/assessment/grade/reports/batch/${batchId}/${week}`
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
