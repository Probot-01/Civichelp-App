import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Issue } from '../../types';

interface IssuesState {
  issues: Issue[];
  userIssues: Issue[];
  loading: boolean;
}

const initialState: IssuesState = {
  issues: [],
  userIssues: [],
  loading: false,
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setIssues: (state, action: PayloadAction<Issue[]>) => {
      state.issues = action.payload;
    },
    addIssue: (state, action: PayloadAction<Issue>) => {
      state.issues.unshift(action.payload);
      state.userIssues.unshift(action.payload);
    },
    updateIssue: (state, action: PayloadAction<{ id: string; updates: Partial<Issue> }>) => {
      const { id, updates } = action.payload;
      const issueIndex = state.issues.findIndex(issue => issue.id === id);
      if (issueIndex !== -1) {
        state.issues[issueIndex] = { ...state.issues[issueIndex], ...updates };
      }
      const userIssueIndex = state.userIssues.findIndex(issue => issue.id === id);
      if (userIssueIndex !== -1) {
        state.userIssues[userIssueIndex] = { ...state.userIssues[userIssueIndex], ...updates };
      }
    },
    deleteIssue: (state, action: PayloadAction<string>) => {
      state.issues = state.issues.filter(issue => issue.id !== action.payload);
      state.userIssues = state.userIssues.filter(issue => issue.id !== action.payload);
    },
    upvoteIssue: (state, action: PayloadAction<string>) => {
      const issue = state.issues.find(issue => issue.id === action.payload);
      if (issue) {
        issue.upvotes += 1;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setIssues, addIssue, updateIssue, deleteIssue, upvoteIssue, setLoading } = issuesSlice.actions;
export default issuesSlice.reducer;