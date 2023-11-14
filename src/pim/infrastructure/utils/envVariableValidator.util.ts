export function envVariableValidator(envVariables: {
  [key in string]: string;
}) {
  Object.entries(envVariables).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`Missing ${key} in env Variables`);
    }
  });
}

interface EnvVariables {
  DATABASE_URL: string;
}

export function getEnvVariableValue(eventName: keyof EnvVariables) {
  const env = process.env[eventName];
  if (!env) throw Error(`env ${eventName} is empty`);
  return env;
}
