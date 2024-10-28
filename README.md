# Running
## Standalone
### Python
`$ cd python`  
`$ python3 -m venv .venv`  
`$ source .venv/bin/activate`  
`$ python app.py`
### Node
`$ cd node/`  
`$ node index.js`

### PM2
**In theory, `pm2` should be running the app, but if not, restart the process with the following comands: **
#### Python:
`$ cd python/`  
`$ source .venv/bin/activate`  
`$ pm2 start app.py --name mtapi --interpreter python3`
#### Node:
`$ cd node/`  
`$ pm2 start index.js`


## Docker
Please start things in the following order:
1. Python: `docker run -p 5000:5000 fdterr/mtapi:latest`
1. Nodejs

---
## Changes Made to Original Package

### **`python/scripts/make_stations_json.py`:**

Line 14 should become 
<br />
```with open(args.stations_file, 'r') as f:```

Line 36 should become
<br />
```station['id'] = md5(''.join(station['stops'].keys()).encode('utf-8')).hexdigest()[:ID_LENGTH]```
