function minLength(str, num) {
    if (str.length < num) return false;
    return true;
}
function validEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
        return false;
    }
    else {
        return true
    }
}
function checkGender(gender) {
    if(typeof gender == "boolean") {
        return true;
    } 
    return false
}
function isNumber(number) {
    return Number.isInteger(number) && number > 0;
}
function validateUserRegister(req, res, next) {
    // console.log(req.body)
    const {username, password, confirmpassword, email, gender, name, age} = req.body
    if (!minLength(username, 3)) {
        return res.status(400).send('Invalid username length')
    }
    if(!minLength(password, 3)) {
        return res.status(400).send('Invalid password length')
    }
    if(confirmpassword != password) {
        return res.status(400).send('Wrong confirmation password')
    }
    if(!validEmail(email)) {
        return res.status(400).send('Invalid email')
    }
    if(!checkGender(gender)) {
        return res.status(400).send('Invalid type of gender')
    }
    if(!minLength(name, 2)) {
        return res.status(400).send('Invalid name length')
    }
    if(!isNumber(age)) {
        return res.status(400).send('Invalid age')
    }
    next()
}
function validateUserUpdate(req, res, next) {
    // console.log(req.body)
    const {username, password, confirmpassword, email, gender, name, age} = req.body
    if (!minLength(username, 3)) {
        return res.status(400).send('Invalid username length')
    }
    if(!minLength(password, 3)) {
        return res.status(400).send('Invalid password length')
    }
    if(!validEmail(email)) {
        return res.status(400).send('Invalid email')
    }
    if(!checkGender(gender)) {
        return res.status(400).send('Invalid type of gender')
    }
    if(!minLength(name, 2)) {
        return res.status(400).send('Invalid name length')
    }
    if(!isNumber(age)) {
        return res.status(400).send('Invalid age')
    }
    next()
}

module.exports = {validateUserRegister, validateUserUpdate}
