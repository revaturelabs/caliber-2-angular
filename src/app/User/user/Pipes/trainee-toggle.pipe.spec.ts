import { TraineeTogglePipe } from './trainee-toggle.pipe';
import { Trainee } from '../types/trainee';
import { TrainingStatus } from '../types/training-status';
import { browser, by, element } from 'protractor';

let traineeList = new Array<Trainee>();
let trainee1: Trainee;
let trainee2: Trainee;
let trainee3: Trainee;

describe('TraineeTogglePipe', () => {
  it('create an instance', () => {
    const pipe = new TraineeTogglePipe();
    expect(pipe).toBeTruthy();
  });
});

describe('Trainee Pipe Test', () => {
  beforeEach(() => {
      trainee1 = new Trainee('steve', 'steve@steve.steve', 'Confirmed', '25');
      trainee2 = new Trainee('greg', 'steve@steve.greg', 'Employed', '26');
      trainee3 = new Trainee('bob', 'steve@steve.bob', 'Dropped', '27');
      traineeList = new Array<Trainee>(trainee1, trainee2, trainee3);
    });
  it('should filter out everything that is not DROPPED', () => {
    const pipe = new TraineeTogglePipe();
    const testList = pipe.transform(traineeList, false);
    expect(testList).toEqual(new Array<Trainee>(trainee3));
  });
  it('should filter out DROPPED', () => {
    const pipe = new TraineeTogglePipe();
    const testList = pipe.transform(traineeList, true);
    expect(testList).toEqual(new Array<Trainee>(trainee1, trainee2));
  });
});
