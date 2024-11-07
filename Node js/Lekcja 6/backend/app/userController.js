const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require("path")

const userController = {
    usersArray: [],
    logoutTokens: [],
    async register(userData) {
        let result
        if (typeof userData.login != 'string' || typeof userData.name != 'string' || typeof userData.lastName != 'string' || typeof userData.email != 'string' || typeof userData.password != 'string') {
            result = {
                status: 400,
                message: "Bad types of data"
            }
        } else if (userData.login == "" || userData.name == "" || userData.lastName == "" || userData.email == "" || userData.password == "") {
            result = {
                status: 400,
                message: "No data provided"
            }
        } else if (this.usersArray.findIndex(x => x.login == userData.login || x.email == userData.email) != -1) {
            result = {
                status: 409,
                message: "User already existed",
                problem: (this.usersArray.findIndex(x => x.login == userData.login) != -1) ? "login" : "email"
            }
        } else {
            userData.password = await bcrypt.hash(userData.password, 10);
            userData.id = this.usersArray.length + 1
            userData.confirmed = false
            userData.image = path.join(__dirname, "images", "user.png")
            this.usersArray.push(userData)
            let token = await this.encodeToken(this.usersArray[this.usersArray.length - 1], "1h")
            result = {
                status: 201,
                message: 'User registered sucessfully, click this link to confirm registration.\nWarning: the link is valid for only an hour',
                link: `http://localhost:4000/api/user/confirm/${token}`
            }
        }
        return result
    },
    async confirm(token) {
        let result
        try {
            token = await this.decodeToken(token)
            let resultID = this.usersArray.findIndex(x => x.id == token.id)
            if (resultID == -1) {
                result = {
                    status: 404,
                    message: "No user with that id"
                }
            } else {
                this.usersArray[resultID].confirmed = true
                result = {
                    status: 200,
                    message: "User confirmed successfully"
                }
            }
        } catch (error) {
            result = {
                status: 401,
                message: "User not confirmed",
                error: error.message
            }
            if (error.message == "jwt expired") {
                result.message = "User wasn't confirmed because of token expired"
            }
        }
        return result
    },
    async login(loginData) {
        let result
        let resultID = this.usersArray.findIndex(x => (x.login == loginData.credentials || x.email == loginData.credentials))
        if (resultID == -1) {
            result = {
                status: 404,
                message: "No user with that credentials"
            }
        } else if (this.usersArray[resultID].confirmed == false) {
            result = {
                status: 401,
                message: "User not confirmed"
            }
        } else if (! await bcrypt.compare(loginData.password, this.usersArray[resultID].password)) {
            result = {
                status: 402, //TODO: czy moze byc takie statuscode
                message: "Bad password"
            }
        } else {
            let token = await this.encodeToken({ id: this.usersArray[resultID].id }, "2d")
            result = {
                status: 200,
                message: "User logged successfully",
                token: token
            }
        }
        return result
    },
    async getmyprofile(token) {
        let result
        try {
            token = await this.decodeToken(token)
            let resultID = this.usersArray.findIndex(x => x.id == token.id)
            if (resultID == -1) {
                result = {
                    status: 404,
                    message: "Invalid token"
                }
            } else {
                result = this.usersArray[resultID]
                result.status = 200
            }
        } catch (error) {
            result = {
                status: 400,
                message: "Invalid token",
                error: error.message
            }

        }
        return result
    },
    async updateprofile(token, data) {
        let result
        try {
            token = await this.decodeToken(token)
            let resultID = this.usersArray.findIndex(x => x.id == token.id)
            if (resultID == -1) {
                result = {
                    status: 400,
                    message: "Invalid token"
                }
            } 
            // else if (this.usersArray.findIndex((x, i) => (x.login == data.login && i != resultID) || (x.email == data.email && i != resultID))) {
            //     result = {
            //         status: 401,
            //         message: "User exist",
            //         problem: (this.usersArray.findIndex(x => (x.login == data.login &&  i != resultID))) ? "login" : "email"
            //     }
            // } 
            else {
                Object.keys(data).forEach(async e => {
                    if (e == "password") {
                        this.usersArray[resultID][e] = await bcrypt.hash(data[e], 10);
                    } else {
                        this.usersArray[resultID][e] = data[e]
                    }
                })
                result = {
                    status: 200,
                    message: "Profile updated successfully",
                    changes: this.usersArray[resultID]
                }
            }
        } catch (error) {
            result = {
                status: 400,
                message: "Invalid token",
                error: error.message
            }
        }
        return result
    },
    getuserprofile(nickname) {
        let resultID = this.usersArray.findIndex(x => x.login == nickname)
        if (resultID == -1) {
            result = {
                status: 404,
                message: "No user with that nickname"
            }
        } else {
            result = {
                status: 200,
                message: "User profile finded",
                data: this.usersArray[resultID]
            }
        }
        return result
    },
    async setprofilephoto(token, url) {
        let result
        try {
            token = await this.decodeToken(token)
            let resultID = this.usersArray.findIndex(x => x.id == token.id)
            if (resultID == -1) {
                result = {
                    status: 400,
                    message: "Invalid token"
                }
            } else {
                this.usersArray[resultID].image = url
                result = {
                    status: 201,
                    message: "Profile photo updated successfully"
                }
            }
        } catch (error) {
            result = {
                status: 400,
                message: "Invalid token",
                error: error.message
            }
        }
        return result
    },
    logout(token) {
        if (this.logoutTokens.includes(token))
            return {
                status: 400,
                message: "Invalid token"
            }
        this.logoutTokens.push(token)
        return {
            status: 200,
            message: "User logouted successfully"
        }
    },
    async encodeToken(data, expireTime) {
        return await jwt.sign(data, process.env.MY_KEY, { expiresIn: expireTime })
    },
    async decodeToken(token) {
        return ((this.logoutTokens.includes(token)) ? { id: -1 } : await jwt.verify(token, process.env.MY_KEY))
    }

}

module.exports = userController