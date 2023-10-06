/**************************************************************************
 ◘ Filename: setupGetUserId.js
 ◘ Description: 
    CSRF protection middleware for the OddJobber App backend api.
    This middleware provides the required user id needed for the getUser
    call in the User.controller.js controller. It is used for the
    'authenticate' route used when a current session user returns to the
    site, or refreshes the page.
 ***************************************************************************/
const setupGetUserId = async(req, res, next) => {
    try {
        const id = req.session.user;
        req.params.id = id;
        next(); 
    } catch(error){
        next(error)
    }
}

module.exports = setupGetUserId;