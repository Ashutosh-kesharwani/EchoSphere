/* 
Generic Async Handler func
Task :
> Take a func [controller] as a parameter
> Return a new wrapped func , while  calling the paramter func , if no err , if it is then pass that error to next middleware with next(error)

  const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res, next);
  } catch (error) {

    // we can  also preserve stack trace with 
    console.error(error); 
    // then pass err to next middleware 
    next(error);
  }
};

*/

// Promise Way
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) =>
      next(error)
    );
  };
};

export default asyncHandler;
