import { HomePage } from './app.po';
import { ViewTraineesInBatchPage } from './app.po';

describe('workspace-project App', () => {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  /* HEADER TESTS */
  it('should display all links', () => {
    page.navigateTo();
    expect(page.getHomeLink()).toEqual('Home');
    expect(page.getManageLink()).toEqual('Manage Batch');
    expect(page.getAssessLink()).toEqual('Assess Batch');
    expect(page.getQualityLink()).toEqual('Quality Audit');
    expect(page.getPanelLink()).toEqual('Panel');
    expect(page.getReportsLink()).toEqual('Reports');
  });

  it('should click the home link and navigate to the home page', () => {
    page.navigateTo();
    expect(page.getNavHomeLink()).toEqual('home works!');
  });

  it('should click the manage link and navigate to the manage page', () => {
    page.navigateTo();
    expect(page.getNavManageLink()).toBeTruthy();
  });

  it('should click the logo and navigate to the home page', () => {
    page.navigateTo();
    expect(page.getNavImgLink()).toEqual('home works!');
  });

  /* FOOTER TESTS */
  it('should create footer with contact information', () => {
    page.navigateTo();
    expect(page.getFooterRevature()).toBeTruthy();
  });

  it('Should see the Last Quality Audit Table on the Home Page', () => {
    page.navigateTo();
    expect(page.getLastQATable().isPresent()).toBeTruthy();
  });
});

// describe('tests for view trainees in a batch modal', () => {
//   let page: ViewTraineesInBatchPage;

//   beforeEach(() => {
//     page = new ViewTraineesInBatchPage();
//   });

//   /* Check modal pops up
//   it('should display all links', () => {
//     page.navigateTo();
//     expect(page.getPopupTraineesinBatchModalH4()).toEqual('View/Add Trainees');
//   }); */

//   /* Add trainee window pops up */
//   it('should click on add trainee button and pop up modal', () => {
//     page.navigateTo();
//     expect(page.getAnAddTraineeModal()).toEqual('Add Trainee');
//   });

//   /* Add Comment Form pops up after clicking on a name */
//   it('should click on a trainee and pop up comment form', () => {
//     page.navigateTo();
//     expect(page.getATraineeCommentForm()).toEqual('comment');
//   });

//   /* Edit Trainee Form pops up after clicking on button */
//   it('should click on a trainee update and pop up update form', () => {
//     page.navigateTo();
//     expect(page.getATraineeUpdateForm()).toEqual('Update Trainee');
//   });

//   /* Edit Trainee Form pops up after clicking on button */
//   it('should click on a trainee delete and pop up delete form', () => {
//     page.navigateTo();
//     expect(page.getATraineeDeleteForm()).toEqual('Delete Trainee');
//   });

// });
