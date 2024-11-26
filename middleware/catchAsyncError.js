export const catchAsyncErrors = (theFunction) => {
    return async (req, res, next) => {
      try {
        await theFunction(req, res, next);
      } catch (error) {
        next(error);  // Forward the error to the error-handling middleware
      }
    };
};