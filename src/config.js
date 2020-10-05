  
module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || "https://choreo-graph-server.herokuapp.com/",
  JWT_SECRET: process.env.JWT_SECRET || 'super-secret',

}