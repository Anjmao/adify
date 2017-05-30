export const config = {
    jwtSecret: 'gangam-style',
    baseUrl: process.env.BASE_URL || 'http://localhost:8000',
    uiBaseUrl: process.env.UI_BASE_URL || 'http://localhost:4200',
    mongoConnectionString: process.env.MONGO_DB || 'mongodb://admin:admin123@ds151461.mlab.com:51461/adify',
    facebook: {
        clientID: process.env.FB_CLIENT_ID,
        clientSecret: process.env.FB_CLIENT_SECRET,
    },
    google: {
        clientID: process.env.GOO_CLIENT_ID,
        clientSecret: process.env.GOO_CLIENT_SECRET,
    },
    linkedin: {
        clientID: process.env.IN_CLIENT_ID,
        clientSecret: process.env.IN_CLIENT_SECRET,
    }
};
