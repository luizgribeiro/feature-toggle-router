const config = {
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  verbose: true,
  testEnvironment: 'node',
};

export default config;
