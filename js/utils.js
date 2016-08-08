/*jshint esversion: 6 */

//Get manga metada available.
//Ideally it should crossreference mangaupdates for more complete metadata
function getMangaData () {

}



/*
     ██ ███████  ██████  ███    ██       ███    ███  █████  ██████       ██████  ██████  ███    ██ ██    ██ ███████ ██████  ███████ ██  ██████  ███    ██
     ██ ██      ██    ██ ████   ██       ████  ████ ██   ██ ██   ██     ██      ██    ██ ████   ██ ██    ██ ██      ██   ██ ██      ██ ██    ██ ████   ██
     ██ ███████ ██    ██ ██ ██  ██ █████ ██ ████ ██ ███████ ██████      ██      ██    ██ ██ ██  ██ ██    ██ █████   ██████  ███████ ██ ██    ██ ██ ██  ██
██   ██      ██ ██    ██ ██  ██ ██       ██  ██  ██ ██   ██ ██          ██      ██    ██ ██  ██ ██  ██  ██  ██      ██   ██      ██ ██ ██    ██ ██  ██ ██
 █████  ███████  ██████  ██   ████       ██      ██ ██   ██ ██           ██████  ██████  ██   ████   ████   ███████ ██   ██ ███████ ██  ██████  ██   ████
*/



function mapToJson(map) {
  return JSON.stringify([...map]);
}

function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    // We don’t escape the key '__proto__'
    // which can cause problems on older engines
    obj[k] = v;
  }
  return obj;
}

function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

/*
███    ███  ██████  ██████  ██    ██ ██      ███████     ███████ ██   ██ ██████   ██████  ██████  ████████ ███████
████  ████ ██    ██ ██   ██ ██    ██ ██      ██          ██       ██ ██  ██   ██ ██    ██ ██   ██    ██    ██
██ ████ ██ ██    ██ ██   ██ ██    ██ ██      █████       █████     ███   ██████  ██    ██ ██████     ██    ███████
██  ██  ██ ██    ██ ██   ██ ██    ██ ██      ██          ██       ██ ██  ██      ██    ██ ██   ██    ██         ██
██      ██  ██████  ██████   ██████  ███████ ███████     ███████ ██   ██ ██       ██████  ██   ██    ██    ███████
*/

module.exports.jsonToStrMap = jsonToStrMap;
module.exports.strMapToJson = strMapToJson;
