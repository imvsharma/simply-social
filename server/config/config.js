exports.config = {
    PORT: process.env.PORT,
    host: process.env.HOST,
    //dbURL: process.env.DBURL,
    dbURL: process.env.DB,
    SECRET_KEY: process.env.SECRET_KEY,
    SALT: process.env.SALT
}