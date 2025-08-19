import jwt from 'jsonwebtoken'; 
import dotenv from 'dotenv';
dotenv.config();

const generatedAccessToken = async (userId) => {
    const token = await jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    return token
}

export default generatedAccessToken;
