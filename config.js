import envs from './constants/envs';
import env from './utils/env';

if (!envs[env]) {
  throw Error(`unknown env '${env}'`);
}

const PORT = process.env.PORT || 3000;
const API = "https://vulners.com/api/v3/";
const PROXY_CORS = "https://crossorigin.me/";

export {
  PORT,
  API,
  PROXY_CORS
};
