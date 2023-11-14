/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require('node:path');
const { readFile } = require('node:fs/promises');

(async () => {
  const [, , handler, eventName] = process.argv;
  const eventDir = join(__dirname, 'events', `${eventName}.json`);
  const data = await readFile(eventDir, 'utf-8');

  const functionHandler = await import(`./build/${handler}`);
  const formattedData = JSON.parse(data);

  const response = await functionHandler.handler(formattedData, {}).catch((err) => {
    console.log(err);
  });

  console.log(JSON.stringify(response, null, 2));
  process.exit();
})();
