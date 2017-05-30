export const config = {
    jwtSecret: 'gangam-style',
    baseUrl: process.env.BASE_URL || 'http://localhost:8000',
    uiBaseUrl: process.env.UI_BASE_URL || 'http://localhost:4200',
    mongoConnectionString: process.env.MONGO_DB || 'mongodb://localhost:27017',
    facebook: {
        clientID: process.env.FB_CLIENT_ID || '1208262602617328',
        clientSecret: process.env.FB_CLIENT_SECRET || 'ea445901429395027822ec6d7a62250f',
    },
    google: {
        clientID: process.env.GOO_CLIENT_ID || '465461624659-ni680djfqmukhtlpu2kbim7467v1rnth.apps.googleusercontent.com',
        clientSecret: process.env.GOO_CLIENT_SECRET || '4my_4iXa6j0lOEBg3S3_RCqL',
    },
    linkedin: {
        clientID: process.env.IN_CLIENT_ID || '86ssz1ba3pxqwe',
        clientSecret: process.env.IN_CLIENT_SECRET || '3QzLmAOmZgmh5AhO',
    }
};
