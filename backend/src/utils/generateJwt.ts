import jwt from 'jsonwebtoken';

export const genereateJwtToken = (data:object)=>{
   const jwtToken = jwt.sign(
    data,
    process.env.JWT_SECRET_KEY!,
    {expiresIn: "12h"}
 )

 return jwtToken;
}