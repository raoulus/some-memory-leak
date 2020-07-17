# Memory Leak


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

