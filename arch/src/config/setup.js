module.exports = () => {
  const ENV_VARIABLES = require("./config.json").env;
  Object.keys(ENV_VARIABLES).forEach(key => {
    process.env[key] = ENV_VARIABLES[key];
  });
  console.info(`Exported Environment`);
};
