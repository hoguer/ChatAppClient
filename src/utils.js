 class Utils { 

  // https://help.salesforce.com/articleView?id=000001145&language=en_US&type=1
  static isValidEmailAddress(emailAddress) {
  	if (!emailAddress) {
  		return false;
  	}
    emailAddress = emailAddress.trim();
    let atpos = emailAddress.lastIndexOf("@");
    let dotpos = emailAddress.lastIndexOf(".");
    let containsSpaces = /\s/g.test(emailAddress);
    let localPart = emailAddress.slice(0,atpos);
    let validLocalPart = /^[a-z0-9.!#$%&'=?_+{}|~*/`^-]+$/i.test(localPart);
    return !( !validLocalPart || (localPart.charAt(0) === '.') || containsSpaces || atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= emailAddress.length);
  }

  static getChatAPIProductionURL() {
  	return "https://3om7kj4wlf.execute-api.us-east-2.amazonaws.com/Production/";
  }

}

export default Utils;