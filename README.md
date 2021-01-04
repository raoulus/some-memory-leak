# Memory Leak

OS:
- Node v12.16.3
- NPM 6.14.4
- OSX 10.15.5

## Reproduce
Add a valid license key for New Relic in `newrelic.js`.

1. Start app which will leak memory
  `node index.js`
2. Start app which has one endpoint and returns 502  
  `node index2.js`
3. Simulate traffic  
  `wrk -t1 -c1 -d30s http://localhost:3000/`
4. Monitor memory consumption
5. Enable `ignore_status_codes: [500]` in `newrelic.js` (line 45)
6. Stop the apps and start from 1 again


## Test using GOT and AXIOS on different containers
### Runing test with AXIOS
1. Checking out docker_axios_got_test
  `git checkout docker_axios_got_test`
2. Building docker images
  `docker build -t some-memory-leak-axios .`
3. Running container for test with axios
  `docker run -d -p 3000:3000 --name some-memory-leak-axios some-memory-leak-axios`
4. Running test agains axios container
  `wrk -t1 -c1 -d30s http://localhost:3000/`
5. Cheking out container stats for memory
  `docker stats`

### Runing test with GOT
1. Change the npm start script in package.json to  
   `start": "node index3.js"`
1. Building docker images
  `docker build -t some-memory-leak-got .`
3. Running container for test with got
  `docker run -d -p 3010:3000 --name some-memory-leak-got some-memory-leak-got`
4. Running test agains got container
  `wrk -t1 -c1 -d30s http://localhost:3010/`
5. Cheking out container stats for memory
  `docker stats`

