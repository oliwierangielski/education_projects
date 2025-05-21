getTokenAuthorization = (req) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // czytam dane z nagłowka 
        let token = req.headers.authorization.split(" ")[1]
        return token
    }
    return false
}

module.exports = getTokenAuthorization