function heartbeat(date) {
  const data = require("./heartbeat.json");
  var outputdata = [], outputjson, medianbeatvalue = 0, maxbeatvalue = 0, minbeatvalue = 0, latestTimestamp, beats;

  // reading and storing the data from the file to element
  console.log(date)
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (element.timestamps.startTime.startsWith(date)) {
      outputdata.push(element)
    }
  }
  if (outputdata.length == 0) {
    return "NO Matching data for the given Date - File not created"
  }
  for (let index = 0; index < outputdata.length; index++) {
    const element = outputdata[index];

    beats = outputdata.map((item) => item.beatsPerMinute)

    if (index == 0) {
      minbeatvalue = element.beatsPerMinute;
      latestTimestamp = element.timestamps.endTime;
    }

    if (element.beatsPerMinute > maxbeatvalue) {
      maxbeatvalue = element.beatsPerMinute;
    }

    if (element.beatsPerMinute < minbeatvalue) {
      minbeatvalue = element.beatsPerMinute;
    }

    if (element.timestamps.endTime > latestTimestamp) {
      latestTimestamp = element.timestamps.endTime;
    }
    medianbeatvalue = outputdata => {
      const mid = Math.floor(outputdata.length / 2),
        nums = [...outputdata].sort((a, b) => a - b);
      return outputdata.length % 2 !== 0 ? nums[mid] : (nums[mid-1]);
    }
  }

  outputjson = [
    {
      "date": date,
      "min": minbeatvalue,
      "max": maxbeatvalue,
      "median": medianbeatvalue(beats),
      "latestDataTimestamp": latestTimestamp
    }

  ]

  const { writeFile } = require('fs');
  const path = './output.json';
  writeFile(path, JSON.stringify(outputjson), (error) => {
    if (error) {
      console.log('An error has occurred ', error);
      return;
    }

  })

  return "File created Successfully"

}
console.log(heartbeat("2023-04-30"))
