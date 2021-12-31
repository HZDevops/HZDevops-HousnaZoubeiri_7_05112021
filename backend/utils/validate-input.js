function validEmail (value, res) {
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regexEmail.test(value)) {
      console.log('Email is not valid')
    } else {
      return regexEmail.test(value)
    }
};
    
function validPassword (value) {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/;
    if (!passwordRegex.test(value)) {
      console.log('Password is not valid; must be length at least 8 and include one digit')
    } else {
      return passwordRegex.test(value)
    }
};
    
function validUsername (value, res) {
    const usernameRegex = /^[a-zA-Z0-9]{5,12}$/;
    if(!usernameRegex.test(value)){
        console.log('Username is not valid; must length at least 5 and not contains space')
    }else{
        return usernameRegex.test(value)
    }
};

 module.exports = {
    validEmail,
    validPassword,
    validUsername,
};