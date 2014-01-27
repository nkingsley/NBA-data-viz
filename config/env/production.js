module.exports = {
    db: "mongodb://localhost/mean",
    app: {
        name: "MoneyBaller"
    },
    facebook: {
        clientID: "701913439842154",
        clientSecret: "5a6c033d867737fa1189b1d437916502",
        callbackURL: "http://nbastar.herokuapp.com/auth/facebook/callback"
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