module.exports = {
    db: "mongodb://noah:noah@ds061218.mongolab.com:61218/heroku_app21047036",
    app: {
        name: "MoneyBaller"
    },
    facebook: {
        clientID: "701913439842154",
        clientSecret: "5a6c033d867737fa1189b1d437916502",
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