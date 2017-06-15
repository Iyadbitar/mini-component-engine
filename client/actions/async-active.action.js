export const ASYNC_ACTIVE_TYPE = 'ASYNC_ACTIVE';
export const AsyncStatusAction = (asyncStatus) => {
  return {
    type: ASYNC_ACTIVE_TYPE,
    payload: {
      activeAsync: asyncStatus
    }
  }
}
