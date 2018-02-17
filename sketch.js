var table;

var dates;
var yearMin;
var yearMax;
var count;

var total;
var woodData;
var silkData;
var inkData;
var glassData;
var steelData;
var silverData;
var goldData;


//Sketch histogram

function setup(){

	var canvas = createCanvas(windowWidth/3, windowHeight);

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

				change(total);

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
	};

	var format = d3.format(".0%");

	var departments = d3.nest()
   		.key(function(d) { return d.Department; })
	  	.rollup(function(v) { return v.length; })
	  	.entries(dataset)
	  	.sort(function(a,b) {return d3.descending(a.value,b.value);});
	console.log(departments);

	d3.select(".caption").selectAll("text").remove();

	var dept1_name = d3.select(".caption").selectAll("#dept1")
		 	.data(departments.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "name1")
	        .text(function(d) { return d.key })
	        .exit();

	var dept1_count = d3.select(".caption").selectAll("#dept1")
		 	.data(departments.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .attr("id", "count1")
	        .text(function(d) { return d.value + " items"})
	        .exit();

	d3.select(".caption2").selectAll("text").remove();

	var dept2_name = d3.select(".caption2").selectAll("#dept2")
		 	.data(departments.filter(function (d, i) { return i === 1;}))
	        .enter()
	        .append("text")
	        .attr("id", "name2")
	        .text(function(d) { return d.key })
	        .exit();

	var dept2_count = d3.select(".caption2").selectAll("#dept2")
		 	.data(departments.filter(function (d, i) { return i === 1;}))
	        .enter()
	        .append("text")
	        .attr("id", "count2")
	        .text(function(d) { return d.value + " items"})
	        .exit();

	d3.select(".caption3").selectAll("text").remove();

	var dept3_name = d3.select(".caption3").selectAll("#dept3")
		 	.data(departments.filter(function (d, i) { return i === 2;}))
	        .enter()
	        .append("text")
	        .attr("id", "name3")
	        .text(function(d) { return d.key })
	        .exit();

	var dept3_count = d3.select(".caption3").selectAll("#dept3")
		 	.data(departments.filter(function (d, i) { return i === 2;}))
	        .enter()
	        .append("text")
	        .attr("id", "count3")
	        .text(function(d) { return d.value + " items"})
	        .exit();

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

	var dept1_percent = d3.select(".info3").selectAll("#dept2-percent")
			.data(departments.filter(function (d, i) { return i === 1;}))
	        .enter()
	        .append("text")
	        .attr("id", "dept2-percent")
	        .text(function(d) {return format(d.value/totalRows); })
	        .exit();

	d3.select(".info4").selectAll("text").remove();

	var info_dept1 = d3.select(".info4").selectAll("#dept2-name")
		 	.data(departments.filter(function (d, i) { return i === 1;}))
	        .enter()
	        .append("text")
	        .attr("id", "dept2-name")
	        .text(function(d) { return d.key })
	        .exit();


	
    // end update gallery function
    };


				// change dataset to selected dataset
				d3.select("input[value=\"total\"]").property("checked", true);

			    d3.selectAll("input").on("change", selectDataset);

			    function selectDataset()
			    {
			        var value = this.value;
			        if (value == "All")
			        {
			            change(total);
			            origins(data);
			            gallery(data);
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

