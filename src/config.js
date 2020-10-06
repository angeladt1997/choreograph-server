  
module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || "postgres://qokrhthfsoiybm:6f75447ad2e97d3107e0efc53e8f000af0229fa462be6acf8ce9f9adcf0b38f7@ec2-52-87-22-151.compute-1.amazonaws.com:5432/dfhn5m8seuaaqt1",
  JWT_SECRET: process.env.JWT_SECRET || 'super-secret',

}