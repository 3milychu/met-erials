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

			    // console.log(woodDataUse);

			   // Data for "silk" selection
			   silkData = data.filter(function(d) { 
			    	return d.hasSilk == 1
			    	});

			   silkDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(silkData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			    // console.log(silkDataUse);

			    // Data for "ink" selection
			   inkData = data.filter(function(d) { 
			    	return d.hasInk == 1
			    	});

			   inkDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(inkData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			    // console.log(inkDataUse);

			     // Data for "silver" selection
			   silverData = data.filter(function(d) { 
			    	return d.hasSilver== 1
			    	});

			   silverDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(silverData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			    // console.log(inkDataUse);


			     // Data for "glass" selection
			   glassData = data.filter(function(d) { 
			    	return d.hasGlass == 1
			    	});

			   glassDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(glassData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			    // console.log(inkDataUse);

			     // Data for "steel" selection
			   steelData = data.filter(function(d) { 
			    	return d.hasSteel == 1
			    	});

			   steelDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(steelData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			    // console.log(inkDataUse);

			     // Data for "gold" selection
			   goldData = data.filter(function(d) { 
			    	return d.hasGold == 1
			    	});

			   goldDataUse = d3.nest()
			   		.key(function(d) { return d.objectBeginDate; })
				  	.rollup(function(v) { return v.length; })
				  	.entries(goldData)
				  	.sort(function(a,b) {return d3.ascending(a.key,b.key);});

			    // console.log(inkDataUse);

				change(allData);

// define change datasetTotal
function change(dataset) {

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
    // end update origins function
    };

    // UPDATE FUNCTION: gallery view for each dataset 
    function gallery(dataset) {

    var totalRows = dataset.length;
	// console.log(totalRows);

    var name;

	if (dataset == woodData){
		name = "Wood";
	} else if (dataset == silkData) {
		name = "Silk";
	} else if (dataset == inkData) {
		name = "Ink";
	} else if (dataset == silverData) {
		name = "Silver";
	} else if (dataset == glassData) {
		name = "Glass";
	} else if (dataset == steelData) {
		name = "Steel";
	} else if (dataset == goldData) {
		name = "Gold";
	} else if (dataset == allData) {
		name = "All";
	};

	var format = d3.format(".0%");

	objectNames = d3.nest()
		.key(function(d) { return d.objectName; })
		  	.rollup(function(v) { return v.length; })
		  	.entries(dataset)
		  	.sort(function(a,b) {return d3.descending(a.value,b.value);})
		  	.filter(function (d, i) { return i === 0 | i === 1 | i === 2;});
		console.log(objectNames);

	var repImg1 = dataset.filter(function(d){return d.isPublic === "TRUE" & d.URL != "NA" & d.objectName == objectNames[0].key });
	// console.log(repImg1);
	var repImg2 = dataset.filter(function(d){return d.isPublic === "TRUE" & d.URL != "NA" & d.objectName == objectNames[1].key });
	// console.log(repImg2);
	var repImg3 = dataset.filter(function(d){return d.isPublic === "TRUE" & d.URL != "NA" & d.objectName == objectNames[2].key });
	// console.log(repImg3);

	d3.select(".image1").selectAll("img").remove();

	var displayRepImg1 = d3.select(".image1").selectAll("#repImg1")
			.data(repImg1.filter(function (d, i) { return i === 0;}))
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
	        .data(repImg1.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append('div')
	        .attr("class", "overlay")
	        .attr("id", "overlay1")
	        .exit();

	var displayTitle = d3.select(".overlay").selectAll("#overlay1")
	        .data(repImg1.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectTitle")
	        .text(function(d) { return d.Title.substring(0,60) })
	        .exit();

	var displayDate = d3.select(".overlay").selectAll("#overlay1")
	        .data(repImg1.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectBeginDate")
	        .text(function(d) { return d.objectBeginDate })
	        .exit();

	var displayArtist = d3.select(".overlay").selectAll("#overlay1")
	        .data(repImg1.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "artistDisplayName")
	        .text(function(d) { return "Artist: " + d.artistDisplayName })
	        .exit();

	var displayCulture = d3.select(".overlay").selectAll("#overlay1")
	        .data(repImg1.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture })
	        .exit();

	var displayObject= d3.select(".overlay").selectAll("#overlay1")
	        .data(repImg1.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName +"s (of " + objectNames[0].value + ")"})
	        .exit();

	// Rep Image 2
	d3.select(".image2").selectAll("img").remove();

	var displayRepImg2 = d3.select(".image2").selectAll("#repImg2")
			.data(repImg2.filter(function (d, i) { return i === 0;}))
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
	        .data(repImg2.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append('div')
	        .attr("class", "overlay2")
	        .attr("id", "overlay2")
	        .exit();

	var displayTitle2 = d3.select(".overlay2").selectAll("#overlay2")
	        .data(repImg2.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectTitle")
	        .text(function(d) { return d.Title.substring(0,60)})
	        .exit();

	var displayDate2 = d3.select(".overlay2").selectAll("#overlay2")
	        .data(repImg2.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectBeginDate")
	        .text(function(d) { return d.objectBeginDate })
	        .exit();

	var displayArtist2 = d3.select(".overlay2").selectAll("#overlay2")
	        .data(repImg2.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "artistDisplayName")
	        .text(function(d) { return "Artist: " + d.artistDisplayName })
	        .exit();

	var displayCulture2 = d3.select(".overlay2").selectAll("#overlay2")
	        .data(repImg2.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture })
	        .exit();

	var displayObject2= d3.select(".overlay2").selectAll("#overlay2")
	        .data(repImg2.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName +"s (of " + objectNames[1].value + ")"})
	        .exit();

	// Rep Image 3

	d3.select(".image3").selectAll("img").remove();

	var displayRepImg3 = d3.select(".image3").selectAll("#repImg3")
			.data(repImg3.filter(function (d, i) { return i === 0;}))
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
	        .data(repImg3.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append('div')
	        .attr("class", "overlay3")
	        .attr("id", "overlay3")
	        .exit();

	var displayTitle3 = d3.select(".overlay3").selectAll("#overlay3")
	        .data(repImg3.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectTitle")
	        .text(function(d) { return d.Title.substring(0,60) })
	        .exit();

	var displayDate3 = d3.select(".overlay3").selectAll("#overlay3")
	        .data(repImg3.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectBeginDate")
	        .text(function(d) { return d.objectBeginDate })
	        .exit();

	var displayArtist3 = d3.select(".overlay3").selectAll("#overlay3")
	        .data(repImg3.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "artistDisplayName")
	        .text(function(d) { return "Artist: " + d.artistDisplayName })
	        .exit();

	var displayCulture3 = d3.select(".overlay3").selectAll("#overlay3")
	        .data(repImg3.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture })
	        .exit();

	var displayObject3= d3.select(".overlay3").selectAll("#overlay3")
	        .data(repImg3.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName +"s (of " + objectNames[2].value + ")"})
	        .exit();

	// Department Filter

	var departments = d3.nest()
   		.key(function(d) { return d.Department; })
	  	.rollup(function(v) { return v.length; })
	  	.entries(dataset)
	  	.sort(function(a,b) {return d3.descending(a.value,b.value);});
	console.log(departments);

	
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


	
    // end update gallery function
    };


				// change dataset to selected dataset
				d3.select("input[value=\"total\"]").property("checked", false);

			    d3.selectAll("input").on("change", selectDataset);

			    function selectDataset()
			    {
			        var value = this.value;
			        if (value == "All")
			        {
			            change(allData);
			            origins(allData);
			            gallery(allData);
			        }
			        else if (value == "Wood")
			        {
			            change(woodDataUse);
			            origins(woodData);
			            gallery(woodData);
			        }
			        else if (value == "Silk")
			        {
			            change(silkDataUse);
			            origins(silkData);
			            gallery(silkData);
			        }
			        else if (value == "Ink")
			        {
			            change(inkDataUse);
			            origins(inkData);
			            gallery(inkData);
			        }
			        else if (value == "Silver")
			        {
			            change(silverDataUse);
			            origins(silverData);
			            gallery(silverData);
			        }
			        else if (value == "Glass")
			        {
			            change(glassDataUse);
			            origins(glassData);
			            gallery(glassData);
			        }
			        else if (value == "Steel")
			        {
			            change(steelDataUse);
			            origins(steelData);
			            gallery(steelData);
			        }
			        else if (value == "Gold")
			        {
			            change(goldDataUse);
			            origins(goldData);
			            gallery(goldData);
			        }
			    }

//end d3.csv function
			      
		});

//end getHistogram function
	};


