const sessionData = require("../data/sessionData");

async function setSession(public_session_id,user_action)
{
    await sessionData.setSession(public_session_id,user_action);

}


module.exports = {
    setSession
  };
  