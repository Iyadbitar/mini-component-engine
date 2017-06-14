import config from '../../config/client';

export const LOAD_CONFIG_TYPE = 'LOAD_CONFIG';
export const ConfigLoadAction = {
  type: LOAD_CONFIG_TYPE,
  payload: config
}
