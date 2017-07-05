var readline = require('readline');
var grpc = require('grpc');
var helloworld = grpc.load('./protos/hello_world.proto').helloworld;
var client = new helloworld.HelloWorld('localhost:50051', grpc.credentials.createInsecure());

client.sayHello('Shawn', function(err, response) {
  console.log('');
  console.log('Greeting:', response.text);
  console.log('');
  console.log('Enter your own name to get a streaming response (or Ctrl+C to exit):');
});

const stream = client.sayHelloStreamingRequestResponse();
stream.on('data', ({ text }) => {
  console.log(text);
})

stream.on('end', () => {
  cliend.end();
});

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
  stream.write({ name: line });
});
