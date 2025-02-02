import dotenv from "dotenv";

if (process.argv.includes("--prod")) {
  dotenv.config({ path: ".env" });
} else {
  dotenv.config({ path: ".env.dev" });
}


interface Config {
  env_dev: boolean | string;
  port: string;
  db_host: string;
  db_port: string;
  db_user: string;
  db_password: string;
  db_name: string;
  api_version: string;

}

export const config: Config = {
  env_dev: process.argv.includes("--prod") || "",
  port: process.env.PORT || "",
  db_host: process.env.DB_MONGODB_HOST || "",
  db_port: process.env.DB_MONGODB_PORT || "",
  db_user: process.env.DB_USERNAME || "",
  db_password: process.env.DB_PASSWORD || "",
  db_name: process.env.DB_MONGODB_NAME || "",
  api_version: process.env.API_VERSION || "v0"
};