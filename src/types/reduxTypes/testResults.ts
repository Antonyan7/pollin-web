export interface TestResultProps {
  error: string | null;
  profileTestResult: ITestResultLatest[] | null;
}

export interface ITestResultLatest {
  title: string;
  dateCollected: string;
  result: string;
}
