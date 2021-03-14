import GoalApi from '../../repositories/goals';

import { decreaseLoading, increaseLoading } from './loadingAction';
import { ADD_COMMENT, SET_GOALS, TOGGLE_GOAL } from './actionsTypes';

export const getGoals = (callback = (err) => {}) => async (dispatch) => {
  dispatch(increaseLoading());
  try {
    const payload = await GoalApi.getToday();
    dispatch({
      payload,
      type: SET_GOALS,
    });

    callback(null);
  } catch (err) {
    callback(err);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const getGoalDetails = (id, callback = (err) => {}) => async (
  dispatch
) => {
  dispatch(increaseLoading());
  try {
    const payload = await GoalApi.getById(id);
    dispatch({
      payload,
      type: SET_GOALS,
    });

    callback(null);
  } catch (err) {
    callback(err);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const updateGoal = (goal, callback = (err) => {}) => async (
  dispatch
) => {
  dispatch(increaseLoading());
  try {
    await GoalApi.update(goal);
    dispatch({
      payload: goal,
      type: TOGGLE_GOAL,
    });

    callback(null);
  } catch (err) {
    callback(err);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const postComment = (comment, callback = (err) => {}) => async (
  dispatch
) => {
  dispatch(increaseLoading());
  try {
    const payload = await GoalApi.comment(comment);
    dispatch({
      payload,
      type: ADD_COMMENT,
    });

    callback(null);
  } catch (err) {
    callback(err);
  } finally {
    dispatch(decreaseLoading());
  }
};
