import handleError from "../utils/handleError.js";
import UnauthorizedError from "../utils/errors.js";

const sessionControl = async (req, res, next) => {
    if(req?.session.userId == undefined){
        return handleError(new UnauthorizedError('Not authenticated'), req, res);
    }
    return next();
}

export default sessionControl;