import {ResponseError} from "../error/response-error.js";

const validate = (schema, request) => {
    const result = schema.validate(request, {abortEarly: false});
    if(result.error) {
        throw new ResponseError(400, result.error.details[0].message);
    }
    return result.value
}
export {
    validate
}