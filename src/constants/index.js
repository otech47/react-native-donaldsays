const API_VERSION = 11;
const API_BASE_URL = 'https://api.setmine.com';
// const GRAPH_BASE_URL = 'http://10.1.10.173:3000/v/11/graph';
// const API_BASE_URL = 'http://10.1.10.26:3000';

export const API_ROOT = `${API_BASE_URL}/v/${API_VERSION}/`;
export const GRAPH_API_ROOT = `${API_ROOT}/graph`;
export const HARAMBE_SHIRT_LINK = 'https://teespring.com/dems-out-for-harambe-2016#pid=2&cid=576&sid=front';

export const GYRO_MOVE_THRESHOLD_X = .055;
export const GYRO_MOVE_THRESHOLD_Y = .055;

export const MOVE_FACTOR_X = 45;
export const MOVE_FACTOR_Y = MOVE_FACTOR_X * .8;

export const TIME_TO_NEXT_AR= 2000; // Decrease for more trump heads
export const TIME_TO_NEXT_DAY = 800; // Increase for longer games
export const TIME_TO_NEXT_VOTE = 20000; // Decrease for faster electoral votes
export const AR_COUNT_TIME_FACTOR = 3.5; // Decrease for faster electoral votes per trump head