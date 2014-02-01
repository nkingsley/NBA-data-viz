module.exports = {
    db: "mongodb://localhost/mean-dev",
    app: {
        name: "MoneyBaller"
    },
    facebook: {
        clientID: "701913439842154",
        clientSecret: "5a6c033d867737fa1189b1d437916502",
        callbackURL: "http://10.1.1.109:3000/auth/facebook/callback"
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
        clientID: "527006289983.apps.googleusercontent.com",
        clientSecret: "MN9D-6sB2sIRyKplMvAc9ufp",
        callbackURL: "http://localhost:3000/oauth2callback"
    }
}