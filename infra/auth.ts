import * as jwt from 'jsonwebtoken'
import configs from './config'

class Auth {
   validate(req, res, next){
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, configs.secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
   }
}

export default new Auth();