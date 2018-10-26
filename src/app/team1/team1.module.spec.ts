import { Team1Module } from './team1.module';

describe('Team1Module', () => {
  let team1Module: Team1Module;

  beforeEach(() => {
    team1Module = new Team1Module();
  });

  it('should create an instance', () => {
    expect(team1Module).toBeTruthy();
  });
});
