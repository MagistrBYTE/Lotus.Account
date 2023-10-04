import { RootState, useAppSelector } from 'src/app/store';
import { IFeedbackState } from './FeedbackState';

export const useFeedbackState = ():IFeedbackState =>
{
  return useAppSelector((state: RootState) => state.feedback)
}
