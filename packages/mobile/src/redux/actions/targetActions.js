import TargetApi from '../../repositories/targets';

import { decreaseLoading, increaseLoading } from './loadingAction';
import { ADD_TARGET, SET_TARGETS, SET_TARGET_DETAILS } from './actionsTypes';

export const getTargets = (callback = (err) => { }) => async (dispatch) => {
  dispatch(increaseLoading());
  try {
    const payload = await TargetApi.getAll();
    dispatch({
      payload,
      type: SET_TARGETS,
    });

    callback(null);
  } catch (err) {
    callback(err);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const addTarget = (target, callback = (err) => { }) => async (
  dispatch
) => {
  dispatch(increaseLoading());
  try {
    const payload = await TargetApi.create(target);
    dispatch({
      payload,
      type: ADD_TARGET,
    });

    callback(null);
  } catch (err) {
    callback(err);
  } finally {
    dispatch(decreaseLoading());
  }
};

export const getTargetDetails = (id, callback = (err) => { }) => async (
  dispatch
) => {
  dispatch(increaseLoading());
  try {
    const payload = await TargetApi.getById(id);
    dispatch({
      payload: {
        ...payload,
        goals: payload.Goals,
      },
      type: SET_TARGET_DETAILS,
    });

    callback(null);
  } catch (err) {
    callback(err);
  } finally {
    dispatch(decreaseLoading());
  }
};
