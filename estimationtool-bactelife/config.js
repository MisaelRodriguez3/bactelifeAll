//link to database
const DB_NAME = 'WA_bactelifeTest'
export const DATA_BASE = process.env.MONGODB_ATLAS_URL || `mongodb+srv://bactelifeWebApp:5LgWRqMnbXy7hJNp@webapp.7ovag2e.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

//jwt phrase
export const SECRET_KEY = "lobitos";

//default administrator
export const ROOT = process.env.ROOT || "Pablo_XD";
export const PASSWORD = process.env.PASSWORD || "Pablo1e53";


export const CLIENTD_ID = process.env.CLIENTD_ID || "294093914370-fjgi7sprg2gc5fdai6ountrs8k087cl1.apps.googleusercontent.com"
export const CLIENT_SECRET = process.env.CLIENT_SECRET || "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"
export const REDIRECT_URI = process.env.REDIRECT_URI || "https://developers.google.com/oauthplayground"
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN || "1//04FLdw5djm_ozCgYIARAAGAQSNwF-L9IrpYkd-dLSPSNsM9RLl_yqrr4DeJ3oLPj0sLroHCPz0jksKF-8m3O0_izjEgAWg2C6yfI"