export const config = {
    jwtSecret: 'gangam-style',
    uiBaseUrl: process.env.UI_BASE_URL || 'http://localhost:4200',
    mongoConnectionString: process.env.MONGO_DB || 'mongodb://admin:admin123@ds151461.mlab.com:51461/adify'
};
