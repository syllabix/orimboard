// Shameless plug from https://k6.io/docs/examples/websockets/
import { randomString, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';
import ws from 'k6/ws';
import http from 'k6/http';
import { check, sleep } from 'k6';

const sessionDuration = 15000; // user session 15s

export const options = {
  vus: 3,
  duration: 2000,
  summaryTrendStats: ["med", "min", "max", "avg", "p(90)", "p(95)", "p(99)", "p(99.9)", "p(100)"],
};

const payload = JSON.stringify({
    "type": "draw",
    "payload": {
        "id": "1667842046146",
        "point": {
            "x": randomIntBetween(100,900),
            "y": randomIntBetween(10,1000)
        },
        "color": "#34ebc0",
        "action": "stroke"
    }
});

export default function () {
    const user_params = {
        headers: { 'Content-Type': 'application/json' }
    };

    // Generate a random user
    const user_body = JSON.stringify({
        "name": randomString(5),
    });
    let result_user = http.put('http://localhost:8081/v1/user', user_body, user_params);
    console.log(result_user.body);

    //TODO: Try with multiple boards! Uncomment when remote URL
    //const random_board_id = randomIntBetween(1, 1000)
    const random_board_id = 90210

    // Watch automated drawing!
    const url = 'ws://localhost:8080/v1/board/' + random_board_id + '/connect?tk=' + result_user.json().id;

    const params = {tags: {my_tag: 'system-team-test session'}};

    const res = ws.connect(url, params, function (socket) {
      socket.on('open', function open() {
        console.log(`VU ${__VU}: connected`);

        socket.send(JSON.stringify({event: 'SET_NAME', new_name: 'Croc ${__VU}'}));

        socket.setInterval(function timeout() {
          socket.send(payload);
        }, 1000); // send something every 1 second
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

    check(res, {'Connected successfully': (r) => r && r.status === 101});
}

