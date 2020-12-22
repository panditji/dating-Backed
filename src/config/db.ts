interface IdbConfigObject {
  "type": "mysql",
  "username": string,
  "password": string,
  "database": string,
  "host": string,
  "port": number,
  "logger":any,
  "logging":any,
  "project_folder": "src" | "dist"
}

type IdbConfig = (env: string | undefined) => IdbConfigObject;

const dbConfig: IdbConfig = (env = 'development') => {

  switch (env) {
    case 'development':
      return {
        "type": "mysql",
        "username": "root",
        "password": "password",
        "database": "oktion_db",
        "host": "localhost",
        "port": 3306,
        "project_folder": "src",
        "logging": ["query", "error"],
        "logger": "advanced-console",
      }
      break;
    case 'staging':
      return {
        "type": "mysql",
        "username": "c1_ok20_staging",
        "password": "0kTi0n2-0",
        "database": "c1_oktion20_staging",
        "host": "127.0.0.1",
        "port": 3306,
        "project_folder": "dist",
        "logging": ["query", "error"],
        "logger": "advanced-console",
      }
      break;
    case 'test':
      return {
        "type": "mysql",
        "username": "c1_ok20_testing",
        "password": "0kTi0n2-0",
        "database": "c1_oktion20_testing",
        "host": "127.0.0.1",
        "port": 3306,
        "project_folder": "dist",
        "logging": ["query", "error"],
        "logger": "advanced-console",
      }
      break;
    case 'production':
      return {
        "type": "mysql",
        "username": "user",
        "password": "password",
        "database": "oktion_db",
        "host": "127.0.0.1",
        "port": 3306,
        "project_folder": "dist",
        "logging": ["query", "error"],
        "logger": "advanced-console",
      }
      break;
    default:
      return {
        "type": "mysql",
        "username": "user",
        "password": "password",
        "database": "oktion_db",
        "host": "127.0.0.1",
        "port": 3306,
        "project_folder": "dist",
        "logging": ["query", "error"],
        "logger": "advanced-console",
      }
      break;
  }
}

export default dbConfig;
