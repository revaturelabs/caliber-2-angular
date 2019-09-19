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
      grades: {
        byBatchAndWeek(batchId: number, week: number): string {
          return `${serverRoot}/assessment/all/grade/batch/${batchId}?week=${week}`;
        },
        upsert: `${serverRoot}/assessment/grade`
      },
      notes: {
        byBatchAndWeek(batchId: number, week: number): string {
          return `${serverRoot}/assessment/all/note/batch/${batchId}/${week}`;
        }
      }
    },
    batches: {
      allByYearAndQuarter(year: number, quarter: number): string {
        return `${serverRoot}/batch/vp/batch/all/?year=${year}&quarter=${quarter}`;
      }
    },
    validYears: `${serverRoot}/batch/all/batch/valid_years`,
    categories: {
      active: `${serverRoot}/category/?active=true`,
      inactive: `${serverRoot}/category/?inactive=true`,
      all: `${serverRoot}/category`,
      byBatchAndWeek(batchId: number, week: number): string {
        return `${serverRoot}/qa/category/${batchId}/${week}/all`
      },
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
      batchNotes: `${serverRoot}/qa/audit/batch/notes`,
      traineeNotes: `${serverRoot}/qa/audit/trainee/notes`,
      createCategory: `${serverRoot}/qa/category`,
      deleteCategory(categoryId: number): string {
        return `${serverRoot}/qa/category/delete/${categoryId}`;
      }
    },
    user: {
      trainees: {
        inBatch(batchId: number): string {
          return `${serverRoot}/user/all/trainee/?batch=${batchId}`;
        }
      }
    }
  }
};
