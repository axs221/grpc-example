var grpc = require('grpc');
var helloworld = grpc.load('./protos/hello_world.proto').helloworld;

function main() {
  var server = new grpc.Server();

  server.addProtoService(helloworld.HelloWorld.service, {
    sayHello: (call, callback) => {
      callback(null, { text: `Hello ${call.request.name}!` });
    },
    sayHelloStreamingRequestResponse: (call) => {
      call.on('data', (data) => {
        call.write(`Hello, ${data.name}!`);
      })

      call.on('end', () => {
        call.end();
      });
    },
    sayHelloStreamingResponse: (call) => {
      call.send()
    }
  });

  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
