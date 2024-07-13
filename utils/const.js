const apiResponse = (success, data = {}, message = '', status = 200) => {
    return {
      success,
      status,
      message,
      data
    };
  };
  
  module.exports = apiResponse;
  