import { TestResultProps } from 'types/reduxTypes/testResults';

export const getInitialState = (): TestResultProps => ({
  error: null,
  profileTestResult: null
});
