module.exports = {
    port: process.env.PORT,
    DBURL : `${process.env.DB_TYPE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
}