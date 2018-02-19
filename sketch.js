var table;

var dates;
var yearMin;
var yearMax;
var count;

var total;
var allData;
var woodData;
var silkData;
var inkData;
var glassData;
var steelData;
var silverData;
var goldData;
var woodSilkData;

var objectNames;
var repImg1;
var repImg2;
var repImg3;

//Sketch histogram

function setup(){

	noCanvas();

	getInfo();

	};

function getInfo(){

d3.csv("https://media.githubusercontent.com/media/3milychu/majorstudio/master/labs/analysis/topMediums_final.csv", function(data) {
	  		data.forEach(function(d) {
	   			d.objectBeginDate = +d.objectBeginDate;
	   			 });
	  			// console.log(data);

			var yearMin = d3.min(data, function(d) { return d.objectBeginDate; });
			console.log("The smallest year in the dataset is " + yearMin);

			var yearMax = d3.max(data, function(d) { return d.objectBeginDate; });
			console.log("The largest year in the dataset is " + yearMax);
	  		
	  		// key value pairs with key:"year"; value:"object count"

			var groupByYear = d3.nest()
				.key(function(d) { return d.objectBeginDate; })
				.entries(data);
	  			// console.log(groupByYear);

			// key value pairs with key=year; value=number of objects in year

			var countByYear = d3.nest()
			  .key(function(d) { return d.objectBeginDate; })
			  .rollup(function(v) { return v.length; })
			  .object(data);
				// console.log(JSON.stringify(countByYear[0]));

			// create subsets of data for each medium selector
				data = data;

		   		total = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(data)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			// Data for "all" selection
			   allData = data.filter(function(d) { 
			    	return d.hasWood == 1 | d.hasSilk == 1 | d.hasInk == 1 | d.hasSilver ==1 | d.hasGlass == 1 | d.hasSteel == 1
			    	| d.hasGold ==1
			    	});

		   		// Data for "wood" selection
			   woodData = data.filter(function(d) { 
			    	return d.hasWood == 1
			    	});

			   woodDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(woodData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			   // Data for "silk" selection
			   silkData = data.filter(function(d) { 
			    	return d.hasSilk == 1
			    	});

			   silkDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(silkData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});


			    // Data for "ink" selection
			   inkData = data.filter(function(d) { 
			    	return d.hasInk == 1
			    	});

			   inkDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(inkData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			     // Data for "silver" selection
			   silverData = data.filter(function(d) { 
			    	return d.hasSilver== 1
			    	});

			   silverDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(silverData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});


			     // Data for "glass" selection
			   glassData = data.filter(function(d) { 
			    	return d.hasGlass == 1
			    	});

			   glassDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(glassData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			     // Data for "steel" selection
			   steelData = data.filter(function(d) { 
			    	return d.hasSteel == 1
			    	});

			   steelDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(steelData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});


			     // Data for "gold" selection
			   goldData = data.filter(function(d) { 
			    	return d.hasGold == 1
			    	});

			   goldDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(goldData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

  				// Data for "wood and silk" selection
			   woodSilkData = data.filter(function(d) { 
			    	return d.hasWood == 1 & d.hasSilk == 1
			    	});

			   woodSilkDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(woodSilkData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

				// Data for "wood and ink" selection
			   woodInkData = data.filter(function(d) { 
			    	return d.hasWood == 1 & d.hasInk == 1
			    	});

			   woodInkDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(woodInkData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

				// Data for "wood and silver" selection
			   woodSilverData = data.filter(function(d) { 
			    	return d.hasWood == 1 & d.hasSilver == 1
			    	});

			   woodSilverDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(woodSilverData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});
				change(allData);


				// Data for "wood and glass" selection
			   woodGlassData = data.filter(function(d) { 
			    	return d.hasWood == 1 & d.hasGlass == 1
			    	});

			   woodGlassDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(woodGlassData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

				  	// Data for "wood and steel" selection
			   woodSteelData = data.filter(function(d) { 
			    	return d.hasWood == 1 & d.hasSteel == 1
			    	});

			   woodSteelDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(woodSteelData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

				  	// Data for "wood and gold" selection
			   woodGoldData = data.filter(function(d) { 
			    	return d.hasWood == 1 & d.hasGold == 1
			    	});

			   woodGoldDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(woodGoldData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

// define change datasetTotal
function change(dataset) {

	var name;
	var totalRows = dataset.length;

	if (dataset == woodData){
		d3.select(".cover").selectAll("img").remove();

		var displayMet= d3.select(".cover").selectAll("#cover1")
			.data(dataset.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .attr("src","assets/wood.jpg")
	       	.style("background-position","center center")
	        .style("background-size","30%")
	        .style("position","relative")
	        .exit();
	} else if (dataset == silkData) {
		d3.select(".cover").selectAll("img").remove();

		var displayMet= d3.select(".cover").selectAll("#cover1")
			.data(dataset.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .attr("src","assets/silk.jpg")
	       	.style("background-position","center center")
	        .style("background-size","30%")
	        .style("position","relative")
	        .exit();
	} else if (dataset == inkData) {
		d3.select(".cover").selectAll("img").remove();

		var displayMet= d3.select(".cover").selectAll("#cover1")
			.data(dataset.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .attr("src","assets/ink.jpg")
	       	.style("background-position","center center")
	        .style("background-size","30%")
	        .style("position","relative")
	        .exit();
	} else if (dataset == silverData) {
		d3.select(".cover").selectAll("img").remove();

		var displayMet= d3.select(".cover").selectAll("#cover1")
			.data(dataset.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .attr("src","assets/silver.jpg")
	       	.style("background-position","center center")
	        .style("background-size","30%")
	        .style("position","relative")
	        .exit();
	} else if (dataset == glassData) {
		d3.select(".cover").selectAll("img").remove();

		var displayMet= d3.select(".cover").selectAll("#cover1")
			.data(dataset.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .attr("src","assets/glass.jpg")
	       	.style("background-position","center center")
	        .style("background-size","30%")
	        .style("position","relative")
	        .exit();
	} else if (dataset == steelData) {
		d3.select(".cover").selectAll("img").remove();

		var displayMet= d3.select(".cover").selectAll("#cover1")
			.data(dataset.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .attr("src","assets/steel.jpg")
	       	.style("background-position","center center")
	        .style("background-size","30%")
	        .style("position","relative")
	        .exit();
	} else if (dataset == goldData) {
		d3.select(".cover").selectAll("img").remove();

		var displayMet= d3.select(".cover").selectAll("#cover1")
			.data(dataset.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .attr("src","assets/gold.jpg")
	       	.style("background-position","center center")
	        .style("background-size","30%")
	        .style("position","relative")
	        .exit();
	} else if (dataset == allData) {
		d3.select(".cover").selectAll("img").remove();

		var displayMet= d3.select(".cover").selectAll("#cover1")
			.data(dataset.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .attr("src","assets/all.jpg")
	       	.style("background-position","center center")
	        .style("background-size","30%")
	        .style("position","relative")
	        .exit();
	};
	
	// window.location.href = "#top";
// end change dataset function
};

// UPDATE FUNCTION: origin stats for each dataset
function origins(dataset) {

	var totalRows = dataset.length;
	// console.log(totalRows);

	var format = d3.format(".0%");
	

	var origins = d3.nest()
   		.key(function(d) { return d.Culture; })
	  	.rollup(function(v) { return v.length; })
	  	.entries(dataset)
	  	.sort(function(a,b) {return d3.descending(a.value,b.value);});
	// console.log(origins);

	d3.select(".culture").selectAll("text").remove()

	var culture1 = d3.select(".culture").selectAll("#ranks")
		 	.data(origins.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "culture1")
	        .text(function(d) { return d.key + " " + format(d.value/totalRows); })
	        .exit();

	var culture2 = d3.select(".culture").selectAll("#ranks")
		 	.data(origins.filter(function (d, i) { return i === 1;}))
	        .enter()
	        .append("text")
	        .attr("id", "culture2")
	        .text(function(d) { return d.key + " " + format(d.value/totalRows); })
	        .exit();

	var culture3 = d3.select(".culture").selectAll("#ranks")
		 	.data(origins.filter(function (d, i) { return i === 2;}))
	        .enter()
	        .append("text")
	        .attr("id", "culture3")
	        .text(function(d) { return d.key + " " + format(d.value/totalRows); })
	        .exit();

	var culture4 = d3.select(".culture").selectAll("#ranks")
		 	.data(origins.filter(function (d, i) { return i === 3;}))
	        .enter()
	        .append("text")
	        .attr("id", "culture4")
	        .text(function(d) { return d.key + " " + format(d.value/totalRows); })
	        .exit();

	var culture5= d3.select(".culture").selectAll("#ranks")
		 	.data(origins.filter(function (d, i) { return i === 4;}))
	        .enter()
	        .append("text")
	        .attr("id", "culture5")
	        .text(function(d) { return d.key + " " + format(d.value/totalRows); })
	        .exit();

	var culture6 = d3.select(".culture").selectAll("#ranks")
		 	.data(origins.filter(function (d, i) { return i === 5;}))
	        .enter()
	        .append("text")
	        .attr("id", "culture6")
	        .text(function(d) { return d.key + " " + format(d.value/totalRows); })
	        .exit();

	var culture7 = d3.select(".culture").selectAll("#ranks")
		 	.data(origins.filter(function (d, i) { return i === 6;}))
	        .enter()
	        .append("text")
	        .attr("id", "culture7")
	        .text(function(d) { return d.key + " " + format(d.value/totalRows); })
	        .exit();


	// Origins Gauge

	d3.select(".gauge").selectAll("div").remove();
	var gauge1 = d3.select(".gauge").selectAll("#gaugeFill")
			.data(origins.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("div")
	        .attr("id", "gauge1")
	        .attr("cursor", "pointer")
	        .attr("onmouseover", "boldCulture1();")
	        .attr("onmouseout", "restoreCulture1();")
	        .style("width",function(d) {return format(d.value/totalRows); })
	        .exit();
	var div1 = d3.select(".gauge").selectAll("#gaugeFill")
			.data(origins.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("div")
	        .style("width","0%")
	        .exit();

	var gauge2 = d3.select(".gauge").selectAll("#gaugeFill")
			.data(origins.filter(function (d, i) { return i === 1;}))
	        .enter()
	        .append("div")
	        .attr("id", "gauge2")
	        .attr("cursor", "pointer")
	        .attr("onmouseover", "boldCulture2();")
	        .attr("onmouseout", "restoreCulture2();")
	        .style("width",function(d) {return format(d.value/totalRows); })
	        .exit();

	var div2 = d3.select(".gauge").selectAll("#gaugeFill")
		.data(origins.filter(function (d, i) { return i === 1;}))
        .enter()
        .append("div")
        .style("width","0%")
        .exit();

	var gauge3 = d3.select(".gauge").selectAll("#gaugeFill")
			.data(origins.filter(function (d, i) { return i === 2;}))
	        .enter()
	        .append("div")
	        .attr("id", "gauge3")
	        .attr("cursor", "pointer")
	        .attr("onmouseover", "boldCulture3();")
	        .attr("onmouseout", "restoreCulture3();")
	        .style("width",function(d) {return format(d.value/totalRows); })
	        .exit();

	var div3 = d3.select(".gauge").selectAll("#gaugeFill")
		.data(origins.filter(function (d, i) { return i === 2;}))
        .enter()
        .append("div")
        .style("width","0%")
        .exit();

	var gauge4 = d3.select(".gauge").selectAll("#gaugeFill")
			.data(origins.filter(function (d, i) { return i === 3;}))
	        .enter()
	        .append("div")
	        .attr("id", "gauge4")
	        .attr("cursor", "pointer")
	        .attr("onmouseover", "boldCulture4();")
	        .attr("onmouseout", "restoreCulture4();")
	        .style("width",function(d) {return format(d.value/totalRows); })
	        .exit();

	var div4 = d3.select(".gauge").selectAll("#gaugeFill")
		.data(origins.filter(function (d, i) { return i === 4;}))
        .enter()
        .append("div")
        .style("width","0%")
        .exit();

	var gauge5 = d3.select(".gauge").selectAll("#gaugeFill")
			.data(origins.filter(function (d, i) { return i === 4;}))
	        .enter()
	        .append("div")
	        .attr("id", "gauge5")
	        .attr("cursor", "pointer")
	        .attr("onmouseover", "boldCulture5();")
	        .attr("onmouseout", "restoreCulture5();")
	        .style("width",function(d) {return format(d.value/totalRows); })
	        .exit();

	var div5 = d3.select(".gauge").selectAll("#gaugeFill")
		.data(origins.filter(function (d, i) { return i === 4;}))
        .enter()
        .append("div")
        .style("width","0%")
        .exit();

	var gauge6 = d3.select(".gauge").selectAll("#gaugeFill")
			.data(origins.filter(function (d, i) { return i === 5;}))
	        .enter()
	        .append("div")
	        .attr("id", "gauge6")
	        .attr("cursor", "pointer")
	        .attr("onmouseover", "boldCulture6();")
	        .attr("onmouseout", "restoreCulture6();")
	        .style("width",function(d) {return format(d.value/totalRows); })
	        .exit();

	var div6 = d3.select(".gauge").selectAll("#gaugeFill")
		.data(origins.filter(function (d, i) { return i === 5;}))
        .enter()
        .append("div")
        .style("width","0%")
        .exit();

	var gauge7 = d3.select(".gauge").selectAll("#gaugeFill")
			.data(origins.filter(function (d, i) { return i === 6;}))
	        .enter()
	        .append("div")
	        .attr("id", "gauge7")
	        .attr("cursor", "pointer")
	        .attr("onmouseover", "boldCulture7();")
	        .attr("onmouseout", "restoreCulture7();")
	        .style("width",function(d) {return format(d.value/totalRows); })
	        .exit();
    // end update origins function
    };

    // UPDATE FUNCTION: gallery view for each dataset 
    function gallery(dataset) {

    var totalRows = dataset.length;
	// console.log(totalRows);

    var name;

	if (dataset == woodData){
		name = "Wood";
		call = "woodData"
	} else if (dataset == silkData) {
		name = "Silk";
		call = "silkData"
	} else if (dataset == inkData) {
		name = "Ink";
		call = "inkData"
	} else if (dataset == silverData) {
		name = "Silver";
		call = "silverData"
	} else if (dataset == glassData) {
		name = "Glass";
		call = "glassData"
	} else if (dataset == steelData) {
		name = "Steel";
		call = "steelData"
	} else if (dataset == goldData) {
		name = "Gold";
		call = "goldData"
	} else if (dataset == allData) {
		name = "All";
		call = "allData"
	};

	var format = d3.format(".0%");
	var formatThousands = d3.format(",");

	objectNames = d3.nest()
		.key(function(d) { return d.objectName; })
		  	.rollup(function(v) { return v.length; })
		  	.entries(dataset)
		  	.sort(function(a,b) {return d3.descending(a.value,b.value);})
		  	.filter(function (d, i) { return i === 0 | i === 1 | i === 2;});
		console.log(objectNames);

	repImg1 = dataset.filter(function(d){return d.isPublic === "TRUE" & d.URL != "NA" & d.objectName == objectNames[0].key });
	// console.log(repImg1);
	repImg2 = dataset.filter(function(d){return d.isPublic === "TRUE" & d.URL != "NA" & d.objectName == objectNames[1].key });
	// console.log(repImg2);
	repImg3 = dataset.filter(function(d){return d.isPublic === "TRUE" & d.URL != "NA" & d.objectName == objectNames[2].key });
	// console.log(repImg3);

	d3.select(".image1").selectAll("img").remove();

	var img1random = Math.floor((Math.random() * repImg1.length) + 0);

	var displayRepImg1 = d3.select(".image1").selectAll("#repImg1")
			.data(repImg1.filter(function (d, i) { return i === img1random;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .style("background-position","center")
	        .style("background-size","30%")
	        .attr("src",function(d) {return d.URL;})
	        .attr("class", "target")
	        .attr("id", "target1")
	        .exit();

	d3.select(".image1").selectAll("div").remove();

	var displayOverlay1 = d3.select(".image1").selectAll("#repImg1")
	        .data(repImg1.filter(function (d, i) { return i === img1random;}))
	        .enter()
	        .append('div')
	        .attr("class", "overlay")
	        .attr("id", "overlay1")
	        .exit();

	var displayTitle = d3.select(".overlay").selectAll("#overlay1")
	        .data(repImg1.filter(function (d, i) { return i === img1random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectTitle")
	        .text(function(d) { return d.Title.substring(0,40) })
	        .exit();

	var displayDate = d3.select(".overlay").selectAll("#overlay1")
	        .data(repImg1.filter(function (d, i) { return i === img1random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectBeginDate")
	        .text(function(d) { return d.objectBeginDate })
	        .exit();

	var displayArtist = d3.select(".overlay").selectAll("#overlay1")
	        .data(repImg1.filter(function (d, i) { return i === img1random;}))
	        .enter()
	        .append("text")
	        .attr("id", "artistDisplayName")
	        .text(function(d) { return "Artist: " + d.artistDisplayName })
	        .exit();

	var displayCulture = d3.select(".overlay").selectAll("#overlay1")
	        .data(repImg1.filter(function (d, i) { return i === img1random;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture })
	        .exit();

	var displayObject= d3.select(".overlay").selectAll("#overlay1")
	        .data(repImg1.filter(function (d, i) { return i === img1random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName +"s (of " + formatThousands(objectNames[0].value) + ")"})
	        .exit();

	var displayLink= d3.select(".overlay").selectAll("#overlay1")
	        .data(repImg1.filter(function (d, i) { return i === img1random;}))
	        .enter()
	        .append("a")
	        .attr("id", "link")
	        .attr("href",function(d) {return d.linkResolution})
	        .attr("target","_blank")
	        .text("View")
	        .exit();

	// Rep Image 2

	var img2random = Math.floor((Math.random() * repImg2.length) + 0);

	d3.select(".image2").selectAll("img").remove();

	var displayRepImg2 = d3.select(".image2").selectAll("#repImg2")
			.data(repImg2.filter(function (d, i) { return i === img2random;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .style("background-position","center")
	        .style("background-size","30%")
	        .attr("src",function(d) {return d.URL;})
	        .append('a').attr('href',function(d) {return d.URL;})
	        .exit();
	
	d3.select(".image2").selectAll("div").remove();

	var displayOverlay2 = d3.select(".image2").selectAll("#repImg2")
	        .data(repImg2.filter(function (d, i) { return i === img2random;}))
	        .enter()
	        .append('div')
	        .attr("class", "overlay2")
	        .attr("id", "overlay2")
	        .exit();

	var displayTitle2 = d3.select(".overlay2").selectAll("#overlay2")
	        .data(repImg2.filter(function (d, i) { return i === img2random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectTitle")
	        .text(function(d) { return d.Title.substring(0,40)})
	        .exit();

	var displayDate2 = d3.select(".overlay2").selectAll("#overlay2")
	        .data(repImg2.filter(function (d, i) { return i === img2random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectBeginDate")
	        .text(function(d) { return d.objectBeginDate })
	        .exit();

	var displayArtist2 = d3.select(".overlay2").selectAll("#overlay2")
	        .data(repImg2.filter(function (d, i) { return i === img2random;}))
	        .enter()
	        .append("text")
	        .attr("id", "artistDisplayName")
	        .text(function(d) { return "Artist: " + d.artistDisplayName })
	        .exit();

	var displayCulture2 = d3.select(".overlay2").selectAll("#overlay2")
	        .data(repImg2.filter(function (d, i) { return i === img2random;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture })
	        .exit();

	var displayObject2= d3.select(".overlay2").selectAll("#overlay2")
	        .data(repImg2.filter(function (d, i) { return i === img2random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName +"s (of " + formatThousands(objectNames[1].value) + ")"})
	        .exit();

	var displayLink2= d3.select(".overlay2").selectAll("#overlay2")
	        .data(repImg2.filter(function (d, i) { return i === img2random;}))
	        .enter()
	        .append("a")
	        .attr("id", "link")
	        .attr("href",function(d) {return d.linkResolution})
	        .attr("target","_blank")
	        .text("View")
	        .exit();

	// Rep Image 3

	var img3random = Math.floor((Math.random() * repImg3.length) + 0);

	d3.select(".image3").selectAll("img").remove();

	var displayRepImg3 = d3.select(".image3").selectAll("#repImg3")
			.data(repImg3.filter(function (d, i) { return i === img3random;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .style("background-position","center")
	        .style("background-size","30%")
	        .attr("src",function(d) {return d.URL;})
	        .append('a').attr('href',function(d) {return d.URL;})
	        .exit();

	d3.select(".image3").selectAll("div").remove();

	var displayOverlay3 = d3.select(".image3").selectAll("#repImg3")
	        .data(repImg3.filter(function (d, i) { return i === img3random;}))
	        .enter()
	        .append('div')
	        .attr("class", "overlay3")
	        .attr("id", "overlay3")
	        .exit();

	var displayTitle3 = d3.select(".overlay3").selectAll("#overlay3")
	        .data(repImg3.filter(function (d, i) { return i === img3random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectTitle")
	        .text(function(d) { return d.Title.substring(0,40) })
	        .exit();

	var displayDate3 = d3.select(".overlay3").selectAll("#overlay3")
	        .data(repImg3.filter(function (d, i) { return i === img3random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectBeginDate")
	        .text(function(d) { return d.objectBeginDate })
	        .exit();

	var displayArtist3 = d3.select(".overlay3").selectAll("#overlay3")
	        .data(repImg3.filter(function (d, i) { return i === img3random;}))
	        .enter()
	        .append("text")
	        .attr("id", "artistDisplayName")
	        .text(function(d) { return "Artist: " + d.artistDisplayName })
	        .exit();

	var displayCulture3 = d3.select(".overlay3").selectAll("#overlay3")
	        .data(repImg3.filter(function (d, i) { return i === img3random;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture })
	        .exit();

	var displayObject3= d3.select(".overlay3").selectAll("#overlay3")
	        .data(repImg3.filter(function (d, i) { return i === img3random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName +"s (of " + formatThousands(objectNames[2].value) + ")"})
	        .exit();

	var displayLink= d3.select(".overlay3").selectAll("#overlay3")
	        .data(repImg3.filter(function (d, i) { return i === img3random;}))
	        .enter()
	        .append("a")
	        .attr("id", "link")
	        .attr("href",function(d) {return d.linkResolution})
	        .attr("target","_blank")
	        .text("View")
	        .exit();

	 // Total Count

	d3.select(".container-micro").selectAll("text").remove();

	var displayTotal = d3.select(".container-micro").selectAll("#total")
			.data(repImg3.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("class", "section-header")
	        .attr("id", "summary")
	        .text(formatThousands(totalRows) + " Items")
	        .exit();

	// Department Filter

	var departments = d3.nest()
   		.key(function(d) { return d.Department; })
	  	.rollup(function(v) { return v.length; })
	  	.entries(dataset)
	  	.sort(function(a,b) {return d3.descending(a.value,b.value);});
	console.log(departments);

	var top1 = dataset.filter(function(d){return d.isPublic === "TRUE" & d.URL != "NA" & d.Department == departments[0].key });
	// console.log(repImg1);
	var top2 = dataset.filter(function(d){return d.isPublic === "TRUE" & d.URL != "NA" & d.Department== departments[1].key });
	// console.log(repImg2);
	var top3 = dataset.filter(function(d){return d.isPublic === "TRUE" & d.URL != "NA" & d.Department == departments[2].key });
	// console.log(repImg3);

	d3.select(".departments1").selectAll("img").remove();

	var top1random = Math.floor((Math.random() * top1.length) + 0);
	var top2random = Math.floor((Math.random() * top2.length) + 0);
	var top3random = Math.floor((Math.random() * top3.length) + 0);

	var displayTop1= d3.select(".departments1").selectAll("#top1")
			.data(top1.filter(function (d, i) { return i === top1random;}))
	        .enter()
	        .append('img')
	        .style("height","150%")
	        .style("overflow-x","hidden")
	        .attr("src",function(d) {return d.URL;})
	       	.style("background-position","center center")
	        // .style("background-size","30%")
	        .style("position","relative")
	        .exit();

	d3.select(".departments2").selectAll("img").remove();

	var displayTop2= d3.select(".departments2").selectAll("#top2")
			.data(top2.filter(function (d, i) { return i === top2random;}))
	        .enter()
	        .append('img')
	        .style("height","150%")
	        .style("overflow-x","hidden")
	        .attr("src",function(d) {return d.URL;})
	       	.style("background-position","center center")
	        // .style("background-size","30%")
	        .style("position","relative")
	        .exit();

	d3.select(".departments3").selectAll("img").remove();

	var displayTop3= d3.select(".departments3").selectAll("#top3")
			.data(top3.filter(function (d, i) { return i === top3random;}))
	        .enter()
	        .append('img')
	        .style("height","150%")
	        .style("overflow-x","hidden")
	        .attr("src",function(d) {return d.URL;})
	       	.style("background-position","center center")
	        // .style("background-size","30%")
	        .style("position","relative")
	        .exit();

	d3.select(".info1").selectAll("text").remove();

	
	d3.select(".medium").selectAll("text").remove();

	var choice1 = d3.select(".medium").selectAll("#choice1")
			.data(departments.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "choice1")
	        .text(name)
	        .exit();

	d3.select(".info1").selectAll("text").remove();

	var dept1_percent = d3.select(".info1").selectAll("#dept1-percent")
			.data(departments.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "dept1-percent")
	        .text(function(d) {return format(d.value/totalRows); })
	        .exit();

	d3.select(".info2").selectAll("text").remove();

	var info_dept1 = d3.select(".info2").selectAll("#dept1-name")
		 	.data(departments.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "dept1-name")
	        .text(function(d) { return d.key })
	        .exit();

	d3.select(".info3").selectAll("text").remove();

	var dept2_percent = d3.select(".info3").selectAll("#dept2-percent")
			.data(departments.filter(function (d, i) { return i === 1;}))
	        .enter()
	        .append("text")
	        .attr("id", "dept2-percent")
	        .text(function(d) {return format(d.value/totalRows); })
	        .exit();

	d3.select(".info4").selectAll("text").remove();

	var info_dept2 = d3.select(".info4").selectAll("#dept2-name")
		 	.data(departments.filter(function (d, i) { return i === 1;}))
	        .enter()
	        .append("text")
	        .attr("id", "dept2-name")
	        .text(function(d) { return d.key })
	        .exit();

	d3.select(".info5").selectAll("text").remove();

	var dept2_percent = d3.select(".info5").selectAll("#dept3-percent")
			.data(departments.filter(function (d, i) { return i === 2;}))
	        .enter()
	        .append("text")
	        .attr("id", "dept3-percent")
	        .text(function(d) {return format(d.value/totalRows); })
	        .exit();

	d3.select(".info6").selectAll("text").remove();

	var info_dept2 = d3.select(".info6").selectAll("#dept3-name")
		 	.data(departments.filter(function (d, i) { return i === 2;}))
	        .enter()
	        .append("text")
	        .attr("id", "dept3-name")
	        .text(function(d) { return d.key })
	        .exit();

	// d3.select(".button").selectAll("button").remove();

	// d3.select(".button").selectAll("#updateRandoms")
 //   		.data(dataset.filter(function (d, i) { return i === 0}))
 //   		.enter()
 //   		.append("button")
 //   		.attr("value",name)
 //   		.text("Shuffle")
 //   		.exit()
  
    // end update gallery function
    };

    


				// change dataset to selected dataset
				d3.select("input[value=\"total\"]").property("checked", false);

			    d3.selectAll("input").on("change", selectDataset);
			    d3.selectAll("input").on("click", selectDataset);
			    // d3.selectAll("button").on("click", selectDataset);

			    function selectDataset(){
			        var value = this.value;
			        if (value == "All")
			        {
			            change(allData);
			            origins(allData);
			            gallery(allData);
			        }
			        else if (value == "Wood")
			        {
			            change(woodData);
			            origins(woodData);
			            gallery(woodData);
			        }
			        else if (value == "Wood" & value == "Silk")
			        {
			            change(woodSilkData);
			            origins(woodSilkData);
			            gallery(woodSilkData);
			        }
			        else if (value == "Silk")
			        {
			            change(silkData);
			            origins(silkData);
			            gallery(silkData);
			        }
			        else if (value == "Ink")
			        {
			            change(inkData);
			            origins(inkData);
			            gallery(inkData);
			        }
			        else if (value == "Silver")
			        {
			            change(silverData);
			            origins(silverData);
			            gallery(silverData);
			        }
			        else if (value == "Glass")
			        {
			            change(glassData);
			            origins(glassData);
			            gallery(glassData);
			        }
			        else if (value == "Steel")
			        {
			            change(steelData);
			            origins(steelData);
			            gallery(steelData);
			        }
			        else if (value == "Gold")
			        {
			            change(goldData);
			            origins(goldData);
			            gallery(goldData);
			        }
			        
			    }

//end d3.csv function
			      
		});

//end getInfo function
	};


