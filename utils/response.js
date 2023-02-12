/**
 * Base of response handler
 * Note: `should not be used in controller`
 * @param res     - response object passed by express
 * @param status  - status code of a response
 * @param data - the response data
 * @param message - description of a response
 * @param errors  - list of errors if any
 * @returns response
 */
const response_handler = (res, status, data, message, errors) => {
	return res.status(status).json({ data, message, errors });
};

/**
 * Bad Request :
 * The server could not understand the request due to invalid syntax
 * @param res response object
 * @param message description
 * @param errors list of errors
 */
const response_bad_request = (res, message = "Bad Request", errors) => {
	return response_handler(res, 400, undefined, message, errors);
};

/**
 * Unauthorized :
 * The client must authenticate itself to get the requested response
 * @param res response object
 * @param message description
 * @param errors list of errors
 */
const response_unauthorized = (res, message = "Unauthorized", errors) => {
	return response_handler(res, 401, undefined, message, errors);
};

/**
 * Forbidden :
 * The client does not have access rights to the data
 * @param res response object
 * @param message description
 * @param errors list of errors
 */
const response_forbidden = (res, message = "Forbidden", errors) => {
	return response_handler(res, 403, undefined, message, errors);
};

/**
 * Not Found
 * The server can not find the requested resource
 * @param res response object
 * @param message description
 * @param errors list of errors
 */
const response_not_found = (res, message, errors) => {
	return response_handler(res, 404, undefined, message, errors);
};

/**
 * Conflict
 * This response is sent when a request conflicts with the current state of the server
 * @param res response object
 * @param message description
 * @param errors list of errors
 */
const response_conflict = (res, message = "Conflict", errors) => {
	return response_handler(res, 409, undefined, message, errors);
};

/**
 * Unprocessable Entity
 * The request was well-formed but was unable to be followed due to semantic errors
 * @param res response object
 * @param message description
 * @param errors list of errors
 */
const response_unprocessable_entity = (
	res,
	message = "Unprocessable Entity",
	errors,
) => {
	return response_handler(res, 422, undefined, message, errors);
};

/**
 * Internal Server Error
 * The server encountered an unexpected condition that prevented it from fulfilling the request
 * @param res response object
 * @param message description
 * @param errors list of errors
 */
const response_internal_server_error = (
	res,
	message = "Internal Server Error",
	errors,
) => {
	return response_handler(res, 500, undefined, message, errors);
};

/**
 * Ok
 * The request has succeeded
 * @param res response object
 * @param data response data
 * @param message description
 */
const response_success = (res, data, message = "Success") => {
	return response_handler(res, 200, data, message, undefined);
};

/**
 * Created
 * The request has succeeded and a new resource has been created as a result
 * @param res response object
 * @param data response data
 * @param message description
 */
const response_created = (res, data, message = "Created") => {
	return response_handler(res, 201, data, message, undefined);
};

module.exports = {
	response_bad_request,
	response_conflict,
	response_created,
	response_forbidden,
	response_internal_server_error,
	response_not_found,
	response_success,
	response_unprocessable_entity,
	response_unauthorized,
};
