import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET_KEY as Secret

class tokenHandler {
static generateToken (userId: string){
return jwt.sign({
    id:userId,   
},
    JWT_SECRET_KEY,
    {expiresIn: "365d"}
)}

static verifyToken(token: string): JwtPayload | string{
    return jwt.verify(token, JWT_SECRET_KEY);
}

}


export default tokenHandler;