import session from "express-session"
const sessionConfig = session({
    secret : 'secret-key',
    resave : false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60*60,
    }  
});

export default sessionConfig