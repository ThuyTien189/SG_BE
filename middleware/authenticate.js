const jwt = require('jsonwebtoken')
const SECRET = "secret"

const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        const token = authorizationHeader.substring(7);
        jwt.verify(token, SECRET, (err, user) => {
            if (err) res.status(403).json({message:"Token invalid!"});
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({message:"Not authenticated!"});
    }
};
const authenticate = async (req, res, next)=>{
    await verifyToken(req, res, () =>{
        if(req.user.id === parseInt( req.params.id)|| req.user.isAdmin){
            next()
        }
        else{
            return res.status(403).json('Not allowed!')
        }
    }) 
}
module.exports = {
    authenticate,
};