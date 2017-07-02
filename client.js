var grpc = require('grpc');
var helloworld = grpc.load('./protos/hello_world.proto').helloworld;
var client = new helloworld.HelloWorld('localhost:50051', grpc.credentials.createInsecure());

client.sayHello('Shawn', function(err, response) {
  console.log('Greeting:', response.text);
});
