export default (request) => {
    const xhr = require("xhr");
    const vault = require('vault');
    
    return vault.get("SLACK_URL").then((slack_url) => {

    const http_options = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
         },
        "body": JSON.stringify({
            "text": request.message.tag + " is moving !"
        })
    };
      
    const url = slack_url;
    
    if(request.message.moving === true) {
    
        return xhr.fetch(url, http_options).then((x) => {
            return request.ok();
        });
    } else return request.ok();
        
    });
};