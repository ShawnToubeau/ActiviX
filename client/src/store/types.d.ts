import { StateType, ActionType } from 'typesafe-actions';

declare module 'typesafe-actions' {
  export type Store = StateType<typeof import('./store').default>;

  export type RootState = StateType<
    typeof import('../reducers/rootReducer').default
  >;

  export type RootAction = ActionType<
    typeof import('../actions/rootAction').default
  >;

  interface Types {
    RootAction: RootAction;
  }
}
