import Development from "./dev";
import Production from "./prod";

const env = import.meta.env.NODE_ENV; // 'development' or 'production'

const config = env === "development" ? Development : Production;

export default config;
