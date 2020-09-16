export const config = () => ({
    jwtSecret: process.env.JWT_SECRET,
    database: {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        synchronize: true,
        logging: true,
        entities: ['dist/**/*.entity.js'],
    }
})