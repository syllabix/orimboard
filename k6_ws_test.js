// Shameless plug from https://k6.io/docs/examples/websockets/
import { randomString, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';
import ws from 'k6/ws';
import http from 'k6/http';
import { check, sleep } from 'k6';

const sessionDuration = 30000; // user session 30s

export const options = {
  // TODO: Add more virtual users
  vus: 1,
  iterations: 1,
  summaryTrendStats: ["med", "min", "max", "avg", "p(90)", "p(95)", "p(99)", "p(99.9)", "p(100)"],
};

//FIXME - Need to write an action that can be deserialized properly into a valid board message; join is a simple one
// TODO - replace user id every time server is restarted
const payload = " \n" +
    "action\n" +
    ": \n" +
    "{\"type\": \"join\", payload: {id: 46664, name: \"333\", color: \"#e86361\"}}";
export default function () {

  const jar = http.cookieJar();
  // TODO: Will be nice to get each virtual user (VU) their own user ID
  // TODO: Change URL
  jar.set("http://localhost:8080/v1/board/90210/connect", "token", "46664");

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

