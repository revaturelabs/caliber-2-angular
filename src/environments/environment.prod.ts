/**
 * @ignore
 */
const serverRoot: string = 'http://localhost:10000';
export const environment = {
  production: true,
  serverRootURL: serverRoot,
  api: {
    category: {
      active: `${serverRoot}/category/?active=true`,
      byBatchAndWeek(batchId: number, week: number): string {
        return `${serverRoot}/qa/category/${batchId}/${week}/all`
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
