/******************************************************
 ◘ filename: hasJpegOrPngSuffix.js 
 ◘ Description:
    Custom validator to ensure images are in the 
    appropriate Jpeg or PNG formats by checking the
    filename suffixes. This validator is called in
    the pre-save hook functions of Mongoose models
    for the OddJobber App
 ******************************************************/
const hasJpegOrPngSuffix = (str) => {
    if(!str){
        return false;
    }
    
      const endings = ['.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG'];
    let passed = false;
    
    for(const ending of endings){
        if(str.endsWith(ending)){
          passed = true;
        break;
      }
    }
    return passed;
  }

  module.exports = hasJpegOrPngSuffix;