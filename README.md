## Changes Made to Original Package

### **`python/scripts/make_stations_json.py`:**

Line 14 should become 
<br />
```with open(args.stations_file, 'r') as f:```

Line 36 should become
<br />
```station['id'] = md5(''.join(station['stops'].keys()).encode('utf-8')).hexdigest()[:ID_LENGTH]```