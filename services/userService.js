const userData = require("../data/userData");
const bcrypt = require('bcrypt');

async function createUser({first_name,last_name,email,password,dob_day,dob_month,dob_year,marketing_preference})
{
    if(password.length <8) throw new Error("Password is invalid");

    const checkExist = await userData.getUserEmail(email);

    if(checkExist)throw new Error("Email has been registered!");

    const hashPassword = await bcrypt.hash(password,10);
    const dob = `${dob_year}-${dob_month}-${dob_day}`;
    let checkPreference ="";

    if(marketing_preference == "")
    {
        checkPreference ="no"
    }
    else{
        checkPreference = marketing_preference[0];
    }
    
    return await userData.createUser({
        first_name,
        last_name,
        password: hashPassword,
        email,
        dob,
        marketing_preference:checkPreference,
        user_type: "customer",
    })
}

module.exports={
    createUser
};