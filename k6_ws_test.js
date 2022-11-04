// Shameless plug from https://k6.io/docs/examples/websockets/
import { randomString, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';
import ws from 'k6/ws';
import { check, sleep } from 'k6';

const sessionDuration = 30000; // user session 30s

export const options = {
  vus: 2,
  iterations: 3,
  summaryTrendStats: ["med", "min", "max", "avg", "p(90)", "p(95)", "p(99)", "p(99.9)", "p(100)"],
};

// 1KB data
const payload = " \n" +
    "{type: \"chat\", payload: {text: \"ff\", sentAt: \"2022-11-04T15:11:55.536Z\",…}";
export default function () {
  //TODO: Change URL	
  const url = 'ws://localhost:8080/v1/board/90210/connect';
  const params = { tags: { my_tag: 'system-team-test session' } };

  const res = ws.connect(url, params, function (socket) {
    socket.on('open', function open() {
      console.log(`VU ${__VU}: connected`);

      socket.send(JSON.stringify({ event: 'SET_NAME', new_name: 'Croc ${__VU}' }));

      socket.setInterval(function timeout() {
        socket.send(payload);
      }, 1000 ); // send something every 1 second
    });

    socket.on('ping', function () {
      console.log('PING!');
    });

    socket.on('pong', function () {
      console.log('PONG!');
    });

    socket.on('close', function () {
      console.log(`VU ${__VU}: disconnected`);
    });

    socket.setTimeout(function () {
      console.log('Closing the socket forcefully 3s after graceful LEAVE');
      socket.close();
    }, sessionDuration + 3000);
  });

  check(res, { 'Connected successfully': (r) => r && r.status === 101 });
}

