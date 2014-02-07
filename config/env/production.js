module.exports = {
    db: process.env.DBCONNECTION,
    app: {
        name: "MoneyBaller"
    },
    facebook: {
        clientID: process.env.FBCLIENT,
        clientSecret: process.env.FBSECRET,
        callbackURL: "http://www.moneyballer.us/auth/facebook/callback"
    },
    twitter: {
        clientID: "CONSUMER_KEY",
        clientSecret: "CONSUMER_SECRET",
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    github: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
    google: {
        clientID: "APP_ID",
        clientSecret: "APP_SECRET",
        callbackURL: "http://localhost:3000/auth/google/callback"
    }
}