JSONC = require('jsoncomp');

var json;
json_path = '/Volumes/Samsung_t3/project-repos/majorstudio/data/materials/top8.json';
var xttp = new XMLHttpRequest();
xttp.open("GET", json_path, true);
xttp.send();
xttp.onreadystatechange = function () {
	if(this.readyState == 4 && this.status == 200 ){
			json = JSON.parse(this.responseText);
		};
}

var compressed = JSONC.compress( json );

var fs = require('fs');
fs.writeFile("/Volumes/Samsung_t3/project-repos/majorstudio/data/materials/top8_compressed.json", compressed, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 