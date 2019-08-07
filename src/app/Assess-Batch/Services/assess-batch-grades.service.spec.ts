import { TestBed } from '@angular/core/testing';

import { AssessBatchGradeService } from './assess-batch-grades.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Grade } from 'src/app/Batch/type/trainee';
import { traineeAssessment } from 'src/app/User/user/types/trainee';

describe('AssessBatchGradeService', () => {

    //dependencies
    let assessBGS: AssessBatchGradeService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AssessBatchGradeService],
        });

        // initialize dependencies before each test
        assessBGS = TestBed.get(AssessBatchGradeService);
        httpMock = TestBed.get(HttpTestingController);

    });

    afterEach(() => {
        httpMock.verify();
    })

    // URLs used in tests for this service
    var envBaseUrl = environment.serverRootURL + '/assessment';
    var avgGradeURL = envBaseUrl + '/all/grade/average?assessment=';
    var batchAvgGradeByIdWURL = envBaseUrl + '/all/grade/average?batch=';
    var assessmentsByBatchIdURL = envBaseUrl + '/all/assessment/batch/';
    var categoryURL = environment.serverRootURL + '/category/';
    var gradesByIdURL = '/all/grade/';
    var gradesByBatchIdURL = '/all/grade/batch/';

    // mock of storeAssessments function
    // used to test storeAssessments()
    let allAssessments: traineeAssessment[] = [];
    let storeAssessments = (entry: traineeAssessment[]) => {
        allAssessments = entry;
    }

    // mock of storeGrades function
    // used to test storeGrades()
    let allGrades: Grade[] = [];
    let storeGrades = (entry: Grade[]) => {
        allGrades = entry;
    }

    // tests that constructor is created properly
    it('should be created', () => {
        const service: AssessBatchGradeService = TestBed.get(AssessBatchGradeService);
        expect(service).toBeTruthy();
    });

    // getAvgGradeByAssessmentId
    it('should get average grade by assessment id', () => {

        const dummyAvgGrade = 72;

        let avgGradeResponse;

        let assessmentId = 1;

        assessBGS.getAvgGradeByAssessmentId(assessmentId).subscribe(response => {
            avgGradeResponse = response;
        });

        // check that single request has been made with correct url
        // and return the request's mock
        const req = httpMock.expectOne(avgGradeURL + assessmentId);

        // fake response data by setting response data to equal dummy data
        req.flush(dummyAvgGrade);

        //check that fake response data has been set
        expect(avgGradeResponse).toEqual(dummyAvgGrade);

        //check for correct request method
        expect(req.request.method).toEqual('GET');

    });

    // getBatchAvgGradeByBatchIdAndWeek
    it('should get batch average grade by batch id and week', () => {

        const dummyAvgGrade = 80;

        let avgGradeResponse;

        let batchId = 1;
        let weekId = 4;

        assessBGS.getBatchAvgGradeByBatchIdAndWeek(batchId, weekId).subscribe(response => {
            avgGradeResponse = response;
        });

        // check that single request has been made with correct url
        // and return the request's mock
        const req = httpMock.expectOne(batchAvgGradeByIdWURL + batchId + '&week=' + weekId);

        // fake response data by setting response data to equal dummy data
        req.flush(dummyAvgGrade);

        //check that fake response data has been set
        expect(avgGradeResponse).toEqual(dummyAvgGrade);

        //check for correct request method
        expect(req.request.method).toEqual('GET');

    });

    // getAssessmentsByBatchId
    it('should get assessments by batch id', () => {

        const dummyAssessments = [{
            assessmentId: 3,
            rawScore: 79,
            assessmentTitle: 'Angular',
            assessmentType: 'weekly',
            weekNumber: 4,
            batchId: 4,
            assessmentCategory: 6
        },

        {
            assessmentId: 7,
            rawScore: 62,
            assessmentTitle: 'Servlets',
            assessmentType: 'retake',
            weekNumber: 5,
            batchId: 5,
            assessmentCategory: 8
        }];

        let assessmentsResponse;

        let batchId = 7;

        assessBGS.getAssessmentsByBatchId(batchId).subscribe(response => {
            assessmentsResponse = response;
        });

        // check that single request has been made with correct url
        // and return the request's mock
        const req = httpMock.expectOne(assessmentsByBatchIdURL + batchId);

        // fake response data by setting response data to equal dummy data
        req.flush(dummyAssessments);

        //check for correct response data
        expect(assessmentsResponse).toEqual(dummyAssessments);

        //check for correct request method
        expect(req.request.method).toEqual('GET');

    });

    // getAssessmentsByBatchIdAndWeekNum
    it('should get assessments by batch id and week number', () => {
        const dummyAssessments = [{
            assessmentId: 16,
            rawScore: 90,
            assessmentTitle: 'Angular',
            assessmentType: 'weekly',
            weekNumber: 4,
            batchId: 4,
            assessmentCategory: 6
        },

        {
            assessmentId: 9,
            rawScore: 70,
            assessmentTitle: 'Servlets',
            assessmentType: 'retake',
            weekNumber: 5,
            batchId: 5,
            assessmentCategory: 8
        }];

        let assessmentsResponse;

        let batchId = 7;
        let weekNum = 5;

        assessBGS.getAssessmentsByBatchIdAndWeekNum(batchId, weekNum).subscribe(response => {
            assessmentsResponse = response;
        });

        // check for correct url
        const req = httpMock.expectOne(assessmentsByBatchIdURL + batchId + '?week=' + weekNum);

        req.flush(dummyAssessments);

        //check for correct response data
        expect(assessmentsResponse).toEqual(dummyAssessments);

        //check for correct request method
        expect(req.request.method).toEqual('GET');

    });

    // getCategoryByCategoryId
    it('should get category by category id', () => {

        const dummyCategory = {
            categoryId: 2,
            skillCategory: 'soft',
            categoryOwner: 'Quinn',
            active: true
        };

        let categoryResponse;

        let categoryId = 1;

        assessBGS.getCategoryByCategoryId(categoryId).subscribe(response => {
            categoryResponse = response;
        });

        const req = httpMock.expectOne(categoryURL + categoryId);

        req.flush(dummyCategory);

        expect(categoryResponse).toEqual(dummyCategory);

        expect(req.request.method).toEqual('GET');

    });

    // getGradeById
    it('should get grade by id', () => {

        let id = 5;

        assessBGS.getGradeById(5).subscribe(response => {

        });

        const req = httpMock.expectOne(envBaseUrl + gradesByIdURL + id);

        expect(req.request.method).toEqual('GET');

    });

    // getGradesByBatchId
    it('should get grades by batch id', () => {

        let id = 24;

        assessBGS.getGradesByBatchId(24).subscribe(response => {


        });

        const req = httpMock.expectOne(envBaseUrl + gradesByBatchIdURL + id);
        expect(req.request.method).toEqual('GET');

    });

    // getGradesByBatchIdAndWeekNum
    it('should get grades by batch id and week num', () => {

        let batchId = 2230;
        let weekNum = 9;

        assessBGS.getGradesByBatchIdAndWeekNum(batchId, weekNum).subscribe(response => {

        });

        const req = httpMock.expectOne(envBaseUrl + gradesByBatchIdURL + batchId + '?week=' + weekNum);

        expect(req.request.method).toEqual('GET');

    });

    // updateGrade
    it('should update grade', () => {

        let grade: Grade = {
            gradeId: 50,
            dateReceived: 3579,
            score: 77,
            assessmentId: 2020,
            traineeId: 264
        };

        assessBGS.updateGrade(grade).subscribe(response => {

        });

        const req = httpMock.expectOne(envBaseUrl + '/all/grade/update');

        expect(req.request.method).toEqual('PUT');
    });

    // postGrade
    it('should post grade', () => {

        let grade: Grade = {
            gradeId: 50,
            dateReceived: 3579,
            score: 77,
            assessmentId: 2020,
            traineeId: 264
        };

        assessBGS.postGrade(grade).subscribe(response => {

        });

        const req = httpMock.expectOne(envBaseUrl + '/all/grade/create');

        expect(req.request.method).toEqual('POST');

    });

    // storeAssessments
    it('should store assessments', () => {

        let assessmentsToStore: traineeAssessment[] = [{
            assessmentId: 345,
            rawScore: 80,
            assessmentTitle: 'hard',
            assessmentType: 'hard',
            weekNumber: 7,
            batchId: 777,
            assessmentCategory: 3
        }, {
            assessmentId: 500,
            rawScore: 90,
            assessmentTitle: 'hard',
            assessmentType: 'hard',
            weekNumber: 7,
            batchId: 645,
            assessmentCategory: 3
        }];

        storeAssessments(assessmentsToStore);

        expect(allAssessments.length).toBeTruthy();

    });

    // returnAssessments
    it('should return all assessments', () => {

        expect(allAssessments).toBeTruthy();

    });

    // storeGrades
    it('should store grades', () => {
        let gradesToStore: Grade[] = [{
            gradeId: 34,
            dateReceived: 2017,
            score: 52,
            assessmentId: 399,
            traineeId: 22
        }, {
            gradeId: 21,
            dateReceived: 2020,
            score: 67,
            assessmentId: 400,
            traineeId: 13
        }];

        storeGrades(gradesToStore);

        expect(allGrades.length).toBeTruthy();
    });

    // returnGrades
    it('should return all grades', () => {

        expect(allGrades).toBeTruthy();

    });

});