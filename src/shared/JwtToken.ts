import jwt from 'jsonwebtoken';
const tokenGenerator = (user: any) => {
    const token = jwt.sign(user, process.env.TOKEN_SECRET as string, { expiresIn: 60})
    return token
}
