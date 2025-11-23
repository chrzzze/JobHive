const jwt = require("jsonwebtoken") //for token generation

function verifyToken(req, res, next) {
    const auth = req.headers['authorization']

    //if no auth header,
    if (!auth) return res.status(401).json({ message: 'No token provided :('})

    //else
    const parts = auth.split('')

    //if format's wrong, fuck off
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ message: 'what kinda token format is this??'})

    const token = parts[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({ message: "Token's either invalid or expired :/"})
    }
}

// for moderation things

function requireRole(...roles) {
    return (req, res, next) => {


        if (!req.user) return res.status(401).json({ message: "Who even are you?? (Not authenticated)"})
        if (!roles.includes (req.user.role)) return res.status(403).json({ message: "You don't have the right permissions :/"})
        next()
    }
}

module.exports = { verifyToken, requireRole}