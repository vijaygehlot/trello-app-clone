const http = require('http');
const port = 3000;

const server  = http.createServer(function(req, res){
    
})

server.listen(port, function(error){
    if(error){
        console.log('any wrong',error)
        
    } else{
        console.log('server is running ' + port);
        
    }
})
