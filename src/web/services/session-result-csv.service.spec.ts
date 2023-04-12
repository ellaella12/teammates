import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  InstructorSessionResultSectionType,
} from '../app/pages-instructor/instructor-session-result-page/instructor-session-result-section-type.enum';
import {
  SectionTypeDescriptionPipe,
} from '../app/pages-instructor/instructor-session-result-page/section-type-description.pipe';
import { SessionResults } from '../types/api-output';
import { SessionResultCsvService } from './session-result-csv.service';

/**
 * Loads data for testing.
 */
const loadTestData: (filename: string) => SessionResults = (filename: string): SessionResults => {
  // eslint-disable-next-line import/no-dynamic-require,global-require
  return require(`./test-data/${filename}`);
};

describe('SessionResultCsvService', () => {
  let service: SessionResultCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SectionTypeDescriptionPipe,
      ],
      imports: [
        HttpClientTestingModule,
      ],
    });
  });

  it('should be created', () => {
    service = TestBed.inject(SessionResultCsvService);
    expect(service).toBeTruthy();
  });

  it('should show responses for feedbackSessionResultsC1S1', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsC1S1.json');

    const result: string = service.getCsvForSessionResult(sessionResult, false, false);
    expect(result).toMatchSnapshot();
  });

  it('should show responses along with stats for feedbackSessionResultsC1S1', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsC1S1.json');

    const result: string = service.getCsvForSessionResult(sessionResult, false, true);
    expect(result).toMatchSnapshot();
  });

  it('should show missing responses for feedbackSessionResultsC1S1', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsAllResults.json');

    const result: string = service.getCsvForSessionResult(sessionResult, true, true);
    expect(result).toMatchSnapshot();
  });

  it('should show responses from/to section for feedbackSessionResultsC1S1S1', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsC1S1S1.json');

    const result: string = service.getCsvForSessionResult(sessionResult, false, false,
        'Section 1', InstructorSessionResultSectionType.EITHER);
    expect(result).toMatchSnapshot();
  });

  it('should only show responses from section for feedbackSessionResultsC1S1S1', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsC1S1S1.json');

    const result: string = service.getCsvForSessionResult(sessionResult, false, false,
        'Section 1', InstructorSessionResultSectionType.GIVER);
    expect(result).toMatchSnapshot();
  });

  it('should only show responses to section for feedbackSessionResultsC1S1S1', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsC1S1S1.json');

    const result: string = service.getCsvForSessionResult(sessionResult, false, false,
        'Section 1', InstructorSessionResultSectionType.EVALUEE);
    expect(result).toMatchSnapshot();
  });

  it('should only show responses from and to section for feedbackSessionResultsC1S1S1', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsC1S1S1.json');

    const result: string = service.getCsvForSessionResult(sessionResult, false, false,
        'Section 1', InstructorSessionResultSectionType.BOTH);
    expect(result).toMatchSnapshot();
  });

  it('should show missing responses', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsMissingResponsesShown.json');

    const result: string = service.getCsvForSessionResult(sessionResult, true, false);
    expect(result).toMatchSnapshot();
  });

  it('should hide missing responses', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsMissingResponsesShown.json');

    const result: string = service.getCsvForSessionResult(sessionResult, false, false);
    expect(result).toMatchSnapshot();
  });

  it('should hide stats', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsStatistics.json');

    const result: string = service.getCsvForSessionResult(sessionResult, false, false);
    expect(result).toMatchSnapshot();
  });

  it('should show stats', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsStatistics.json');

    const result: string = service.getCsvForSessionResult(sessionResult, false, true);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for a specific question (question 1)', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsC1S1Q1.json');

    const result: string = service.getCsvForSessionResult(sessionResult, false, false);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for a specific question (question 2)', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsSingleQuestion.json');

    const result: string = service.getCsvForSessionResult(sessionResult, true, true);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for a specific question from/to section', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsC1S1S1Q2.json');

    const result: string = service.getCsvForSessionResult(sessionResult, false, false,
        'Section 1', InstructorSessionResultSectionType.EITHER);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for a specific question with responses from section', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsC1S1S1Q2.json');

    const result: string = service.getCsvForSessionResult(sessionResult, false, false,
        'Section 1', InstructorSessionResultSectionType.GIVER);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for a specific question with responses to section', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsC1S1S1Q2.json');

    const result: string = service.getCsvForSessionResult(sessionResult, false, false,
        'Section 1', InstructorSessionResultSectionType.EVALUEE);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for a specific question with responses from and to section', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsC1S1S1Q2.json');

    const result: string = service.getCsvForSessionResult(sessionResult, false, false,
        'Section 1', InstructorSessionResultSectionType.BOTH);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for MCQ question', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsMcqResults.json');

    const result: string = service.getCsvForSessionResult(sessionResult, true, true);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for MSQ question', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsMsqResults.json');

    const result: string = service.getCsvForSessionResult(sessionResult, true, true);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for NUMSCALE question', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsNumscaleResults.json');

    const result: string = service.getCsvForSessionResult(sessionResult, true, true);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for CONSTSUM question', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsConstsumResults.json');

    const result: string = service.getCsvForSessionResult(sessionResult, true, true);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for CONSTSUM question (restricted responses)', () => {
    const sessionResult: SessionResults =
        loadTestData('feedbackSessionResultsConstsumResultsInstructorNoPrivilege.json');

    const result: string = service.getCsvForSessionResult(sessionResult, true, true);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for CONTRIB question', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsContribResults.json');

    const result: string = service.getCsvForSessionResult(sessionResult, true, true);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for CONTRIB question (restricted section)', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsContribResultsRestrictedSections.json');

    const result: string = service.getCsvForSessionResult(sessionResult, true, true);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for RUBRIC question', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsRubricResults.json');

    const result: string = service.getCsvForSessionResult(sessionResult, true, true);
    expect(result).toMatchSnapshot();
  });

  it('should generate results for RANK question', () => {
    const sessionResult: SessionResults = loadTestData('feedbackSessionResultsRankResults.json');

    const result: string = service.getCsvForSessionResult(sessionResult, true, true);
    expect(result).toMatchSnapshot();
  });
});
