
const jwt = require('jsonwebtoken');
const checkLogin = (req, res, next) => {

    const { authorization } = req.headers;
    try {

        const token = authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);

        const { userName, userId } = decoded;
        req.userId = userId;
        req.userName = userName;

        next();

    } catch (error) {



        next('AAuthentication error');

    }

}

module.exports = checkLogin;