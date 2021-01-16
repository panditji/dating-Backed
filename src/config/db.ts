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
        "password": "",
        "database": "rostr_db",
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
        "username": "c9_rostr_staging",
        "password": "R05tR_2020!",
        "database": "c9_rostrapp_staging",
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
        "username": "c9_rostr_testing",
        "password": "R05tR_2020!",
        "database": "c9_rostrapp_testing",
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
        "database": "Rostr_db",
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
        "database": "Rostr_db",
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
