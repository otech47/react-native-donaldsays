const API_VERSION = 11;
const API_BASE_URL = 'https://api.setmine.com';
// const GRAPH_BASE_URL = 'http://10.1.10.173:3000/v/11/graph';
// const API_BASE_URL = 'http://10.1.10.26:3000';

export const API_ROOT = `${API_BASE_URL}/v/${API_VERSION}/`;
export const GRAPH_API_ROOT = `${API_ROOT}/graph`;
export const HARAMBE_SHIRT_LINK = 'http://setdev.io/justiceforharambe';
export const APP_SHARE_LINK = 'http://setdev.io/donaldsaysapp';

export const GYRO_MOVE_THRESHOLD_X = .055;
export const GYRO_MOVE_THRESHOLD_Y = .055;

export const MOVE_FACTOR_Y = 40;
export const MOVE_FACTOR_X = MOVE_FACTOR_Y * .8;

export const TIME_TO_NEXT_AR= 1400; // Decrease for more trump heads
export const TIME_TO_NEXT_DAY = 1000; // Increase for longer games
export const TIME_TO_NEXT_VOTE = 200; // Decrease for faster electoral votes
export const AR_COUNT_TIME_FACTOR = 4.3; // Decrease for faster electoral votes per trump head