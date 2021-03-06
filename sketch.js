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
var albumenData;
var silverData;
var goldData;
var woodSilkData;

var objectNames;
var repImg1;
var repImg2;
var repImg3;
var repImg4;
var repImg5;
var repImg6;

function setup(){

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	window.onscroll = function() {scrollMobile()};
	} else {
	window.onscroll = function() {scrollDesktop()};
	}
	;

	noCanvas();

	getInfo();

	};

function scrollDiv(){
    var elmnt = document.getElementById("scroll-post");
    elmnt.scrollLeft = 0;
  }

 // Scroll Mobile 

 function scrollMobile() {

	var elmnt = document.getElementById("title");
	var rep = elmnt.offsetTop;

	if (window.pageYOffset >= elmnt.offsetHeight) { 
		   // $('input:not(:checked').parent().hide();
		   $("input[type=radio]:not(:checked)").parent().css("display","none");
		   $("input[type=radio]:checked").css("display", "inline");
		   $("input[type=radio]:checked").css("visibility", "visible");
		   $("label").css("visibility", "visible");
		   $("label").css("color", "black");
		   $("label").css("marginLeft", "30%");
		   $("label" ).css("fontSize", "4em");
		   $("label" ).css("textAlign", "center");
		   $("input[type=radio]:checked").css("float", "none");
		   $("input[type=radio]:checked").css("verticalAlign", "top");
		   $("input[type=radio]").css("width", "3em");
		   $("input[type=radio]").css("height", "3em");
		   $("input[type=radio]:checked").css("fontSize", "0.5em");
		   $("#name").css("paddingTop", "10%");
	} else  {
			$("input[type=radio]:checked").css("visibility", "hidden")
			$("input[type=radio]:checked").css("display", "inline")
			$("label").css("color", "white");
			$("label").css("marginLeft", "0%");
			$("label" ).css("textAlign", "none");
		    $("input:checked").css("float", "right");
		    $("input[type=radio]").css("width", "2em");
		    $("input[type=radio]").css("height", "2em");
		    $("input:checked").css("fontSize", "11px");
			// $('input:not(:checked').parent().show();
			$("input[type=radio]:not(:checked)").parent().css("visibility","hidden");
			$("input[type=radio]:not(:checked)").parent().css("display","inline-block");
			$("label").css("fontSize", "1.5em");
			$("label").css("visibility", "hidden");
			$("#name").css("paddingTop", "15%");

	};
};

// Input item appearance changes on scroll down/up
function scrollDesktop() {


	var elmnt = document.getElementById("title");
	var rep = elmnt.offsetTop;

	if (window.pageYOffset >= elmnt.offsetHeight) { 
		   // $('input:not(:checked').parent().hide();
		   $("input[type=radio]:not(:checked)").parent().css("display","none");
		   $("input[type=radio]:checked").css("display", "inline");
		   $("input[type=radio]:checked").css("visibility", "visible");
		   $("label").css("visibility", "visible");
		   $("label").css("color", "black");
		   $("label").css("marginLeft", "30%");
		   $("label" ).css("fontSize", "4em");
		   $("label" ).css("textAlign", "center");
		   $("input[type=radio]:checked").css("float", "none");
		   $("input[type=radio]:checked").css("verticalAlign", "top");
		   $("input[type=radio]").css("width", "3em");
		   $("input[type=radio]").css("height", "3em");
		   $("input[type=radio]:checked").css("fontSize", "0.5em");
		   $("#name").css("paddingTop", "3%");
	} else  {
			$("input[type=radio]:checked").css("visibility", "hidden")
			$("input[type=radio]:checked").css("display", "inline")
			$("label").css("color", "white");
			$("label").css("marginLeft", "0%");
			$("label" ).css("textAlign", "none");
		    $("input:checked").css("float", "right");
		    $("input[type=radio]").css("width", "2em");
		    $("input[type=radio]").css("height", "2em");
		    $("input:checked").css("fontSize", "11px");
			// $('input:not(:checked').parent().show();
			$("input[type=radio]:not(:checked)").parent().css("visibility","hidden");
			$("input[type=radio]:not(:checked)").parent().css("display","inline-block");
			$("label").css("fontSize", "1.5em");
			$("label").css("visibility", "hidden");
			$("#name").css("paddingTop", "2%");

	};
};

// Get the data and process it by material
function getInfo(){

d3.json("https://raw.githubusercontent.com/3milychu/met-erials/master/data/top8_compressed.json", function(data) {
			data = lzwCompress.unpack(data);
	  		showTile();
	  		data.forEach(function(d) {
	   			d.objectBeginDate = +d.objectBeginDate;
	   			 });
	  			// console.log(data);
	  		console.log(data);
			var yearMin = d3.min(data, function(d) { return d.objectBeginDate; });
			// console.log("The smallest year in the dataset is " + yearMin);

			var yearMax = d3.max(data, function(d) { return d.objectBeginDate; });
			// console.log("The largest year in the dataset is " + yearMax);
	  		
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
			    	return d.hasWood == 1 | d.hasSilk == 1 | d.hasInk == 1 | d.hasSilver ==1 | d.hasGlass == 1 | d.hasAlbumen == 1
			    	| d.hasGold ==1 | d.hasPaper ==1 | d.hasPorcelain ==1
			    	});


		   		// Data for "paper" selection
			   paperData = data.filter(function(d) { 
			    	return d.hasPaper == 1 
			    	});

		   		// Data for "pen" selection
			   penData = data.filter(function(d) { 
			    	return d.hasPen == 1 
			    	});

		   		// Data for "wood" selection
			   woodData = data.filter(function(d) { 
			    	return d.hasWood == 1 
			    	});

			   // Data for "silk" selection
			   silkData = data.filter(function(d) { 
			    	return d.hasSilk == 1 
			    	});

			    // Data for "ink" selection
			   inkData = data.filter(function(d) { 
			    	return (d.hasInk == 1) & (d.URL != "NA") & (d.isPublic == "True")
			    	});

			     // Data for "silver" selection
			   silverData = data.filter(function(d) { 
			    	return d.hasSilver== 1
			    	});

			     // Data for "glass" selection
			   glassData = data.filter(function(d) { 
			    	return d.hasGlass == 1 
			    	});

			     // Data for "albumen" selection
			   albumenData = data.filter(function(d) { 
			    	return d.hasAlbumen == 1 
			    	});

			     // Data for "gold" selection
			   goldData = data.filter(function(d) { 
			    	return d.hasGold == 1 
			    	});

		   		// Data for "porcelain" selection
			   porcelainData = data.filter(function(d) { 
			    	return d.hasPorcelain == 1 
			    	});

				change(allData);
				gallery(allData);
				origins(allData);
				$("input[type=\"image\"][src=\"assets/all.jpg\"]").css("opacity", "1");
				d3.select("input[value=\"All\"]").property("checked", true);
				




// Load materials upon selection in "Select Your Met.erial"
function change(dataset) {

	var name;
	var totalRows = dataset.length;

	document.getElementById("loading").style.display="none";
	document.getElementById("title").style.display="inline";
	document.getElementById("top").style.display="inline-block";
	document.getElementById("arrow").style.display="inline";

	if (dataset == woodData){
		name = "What's made out of Wood at the MET?";
		$("input[value=\"All\"]").css("opacity", "0.5");
	} else if (dataset == paperData) {
		name = "What's made out of Paper at the MET?";
		$("input[value=\"All\"]").css("opacity", "0.5");
	} else if (dataset == porcelainData) {
		name = "What's made out of Porcelain at the MET?";
		$("input[value=\"All\"]").css("opacity", "0.5");
	} else if (dataset == silkData) {
		name = "What's made out of Silk at the MET?";
		$("input[value=\"All\"]").css("opacity", "0.5");
	} else if (dataset == inkData) {
		name = "What's made out of Ink at the MET?";
		$("input[value=\"All\"]").css("opacity", "0.5");
	} else if (dataset == silverData) {
		name = "What's made out of Silver at the MET?";
		$("input[value=\"All\"]").css("opacity", "0.5");
	} else if (dataset == glassData) {
		name = "What's made out of Glass at the MET?";
		$("input[value=\"All\"]").css("opacity", "0.5");
	} else if (dataset == albumenData) {
		name = "What's made out of Albumen at the MET?";
		$("input[value=\"All\"]").css("opacity", "0.5");
	} else if (dataset == goldData) {
		name = "What's made out of Gold at the MET?";
		$("input[value=\"All\"]").css("opacity", "0.5");
	} else if (dataset == allData) {
		name = "What's made out of the MET's Top Materials?";
		$("input[type=\"image\"][src=\"assets/all.jpg\"]").css("opacity", "1");
	};

	d3.select(".section-header").selectAll("text").remove()

	var prompt = d3.select(".section-header").selectAll("#section-one")
		 	.data(dataset.filter(function (d, i) { return i === 0;}))
	        .enter()
	        .append("text")
	        .text(name)
	        .exit();
	
// end change dataset function
};

// UPDATE FUNCTION: Update origin stats for each selected dataset
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

    // UPDATE FUNCTION: Update gallery view for each selected dataset 
    function gallery(dataset) {

    var totalRows = dataset.length;
	// console.log(totalRows);

    var name;

	if (dataset == woodData){
		name = "Wood";
		call = "woodData"
	} else if (dataset == paperData) {
		name = "Paper";
		call = "paperData"
	} else if (dataset == penData) {
		name = "Pen";
		call = "penData"
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
	} else if (dataset == albumenData) {
		name = "Albumen";
		call = "albumenData"
	} else if (dataset == goldData) {
		name = "Gold";
		call = "goldData"
	} else if (dataset == porcelainData) {
		name = "Porcelain";
		call = "porcelainData"
	} else if (dataset == allData) {
		name = "All";
		call = "allData"
	};

	var format = d3.format(".0%");
	var formatThousands = d3.format(",");

	function imageExists(url){
	    var image = new Image();
	    image.src = url;
	    if (!image.complete) {
	        return false;
	    }
	    else if (image.height === 0) {
	        return false;
	    }
	    return true;
	}

	objectNames = d3.nest()
		.key(function(d) { return d.objectName; })
		  	.rollup(function(v) { return v.length; })
		  	.entries(dataset)
		  	.sort(function(a,b) {return d3.descending(a.value,b.value);})
		  	.filter(function (d, i) { return i === 0 | i === 1 | i === 2 | i === 3 | i === 4 | i === 5 | i === 6 | i === 7 | i === 8
		  		| i === 9;});
		// console.log(objectNames);

	repImg1 = dataset.filter(function(d){return d.isPublic === "True" & d.URL != "NA" & d.objectName == objectNames[0].key });

	repImg2 = dataset.filter(function(d){return d.isPublic === "True" & d.URL != "NA" & d.objectName == objectNames[1].key });

	repImg3 = dataset.filter(function(d){return d.isPublic === "True" & d.URL != "NA" & d.objectName == objectNames[2].key });

	repImg4 = dataset.filter(function(d){return d.isPublic === "True" & d.URL != "NA" & d.objectName == objectNames[3].key });

	repImg5 = dataset.filter(function(d){return d.isPublic === "True" & d.URL != "NA" & d.objectName == objectNames[4].key });

	repImg6 = dataset.filter(function(d){return d.isPublic === "True" & d.URL != "NA" & d.objectName == objectNames[5].key });

	repImg7 = dataset.filter(function(d){return d.isPublic === "True" & d.URL != "NA" & d.objectName == objectNames[6].key });

	repImg8 = dataset.filter(function(d){return d.isPublic === "True" & d.URL != "NA" & d.objectName == objectNames[7].key });

	repImg9 = dataset.filter(function(d){return d.isPublic === "True" & d.URL != "NA" & d.objectName == objectNames[8].key });

	repImg10 = dataset.filter(function(d){return d.isPublic === "True" & d.URL != "NA" & d.objectName == objectNames[9].key });
	// console.log(repImg10);

	// Rep Image 1

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
	        .attr("onerror", "this.onerror=null;this.src='assets/refresh.jpg';")
	        .append('a').attr('href',function(d) {return d.URL;})
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
	        .text(function(d) { return d.Title.substring(0,40).replace(/[^ -~]+/g, "") })
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
	        .text(function(d) { return "Artist: " + d.artistDisplayName.substring(0,30).replace(/[^ -~]+/g, "")})
	        .exit();

	var displayCulture = d3.select(".overlay").selectAll("#overlay1")
	        .data(repImg1.filter(function (d, i) { return i === img1random;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture.replace(/[^ -~]+/g, "") })
	        .exit();

	var displayMedium= d3.select(".overlay").selectAll("#overlay1")
        .data(repImg1.filter(function (d, i) { return i === img1random;}))
        .enter()
        .append("text")
        .attr("id", "objectMedium")
        .text(function(d) {return "Medium: " + d.Medium.replace(/[^ -~]+/g, "")})
        .exit();

	var displayObject= d3.select(".overlay").selectAll("#overlay1")
	        .data(repImg1.filter(function (d, i) { return i === img1random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName.replace(/[^ -~]+/g, "") +"s (of " + formatThousands(objectNames[0].value) + ")"})
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
	        .attr("onerror", "this.onerror=null;this.src='assets/refresh.jpg';")
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
	        .text(function(d) { return d.Title.substring(0,40).replace(/[^ -~]+/g, "")})
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
	        .text(function(d) { return "Artist: " + d.artistDisplayName.substring(0,20).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayCulture2 = d3.select(".overlay2").selectAll("#overlay2")
	        .data(repImg2.filter(function (d, i) { return i === img2random;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture.replace(/[^ -~]+/g, "") })
	        .exit();

	var displayMedium= d3.select(".overlay2").selectAll("#overlay2")
        .data(repImg2.filter(function (d, i) { return i === img2random;}))
        .enter()
        .append("text")
        .attr("id", "objectMedium")
        .text(function(d) {return "Medium: " + d.Medium.replace(/[^ -~]+/g, "")})
        .exit();

	var displayObject2= d3.select(".overlay2").selectAll("#overlay2")
	        .data(repImg2.filter(function (d, i) { return i === img2random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName.replace(/[^ -~]+/g, "") +"s (of " + formatThousands(objectNames[1].value) + ")"})
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
	        .attr("onerror", "this.onerror=null;this.src='assets/refresh.jpg';")
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
	        .text(function(d) { return d.Title.substring(0,40).replace(/[^ -~]+/g, "") })
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
	        .text(function(d) { return "Artist: " + d.artistDisplayName.substring(0,20).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayCulture3 = d3.select(".overlay3").selectAll("#overlay3")
	        .data(repImg3.filter(function (d, i) { return i === img3random;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture.replace(/[^ -~]+/g, "") })
	        .exit();

	var displayMedium= d3.select(".overlay3").selectAll("#overlay3")
        .data(repImg3.filter(function (d, i) { return i === img3random;}))
        .enter()
        .append("text")
        .attr("id", "objectMedium")
        .text(function(d) {return "Medium: " + d.Medium.replace(/[^ -~]+/g, "")})
        .exit();

	var displayObject3= d3.select(".overlay3").selectAll("#overlay3")
	        .data(repImg3.filter(function (d, i) { return i === img3random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName.replace(/[^ -~]+/g, "") +"s (of " + formatThousands(objectNames[2].value) + ")"})
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

	// Rep Image 4

	var img4random = Math.floor((Math.random() * repImg4.length) + 0);

	d3.select(".image4").selectAll("img").remove();

	var displayRepImg4 = d3.select(".image4").selectAll("#repImg4")
			.data(repImg4.filter(function (d, i) { return i === img4random;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .style("background-position","center")
	        .style("background-size","30%")
	        .attr("src",function(d) {return d.URL;})
	        .attr("onerror", "this.onerror=null;this.src='assets/refresh.jpg';")
	        .append('a').attr('href',function(d) {return d.URL;})
	        .exit();

	d3.select(".image4").selectAll("div").remove();

	var displayOverlay4 = d3.select(".image4").selectAll("#repImg4")
	        .data(repImg4.filter(function (d, i) { return i === img4random;}))
	        .enter()
	        .append('div')
	        .attr("class", "overlay4")
	        .attr("id", "overlay4")
	        .exit();

	var displayTitle4 = d3.select(".overlay4").selectAll("#overlay4")
	        .data(repImg4.filter(function (d, i) { return i === img4random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectTitle")
	        .text(function(d) { return d.Title.substring(0,40).replace(/[^ -~]+/g, "")})
	        .exit();

	var displayDate4 = d3.select(".overlay4").selectAll("#overlay4")
	        .data(repImg4.filter(function (d, i) { return i === img4random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectBeginDate")
	        .text(function(d) { return d.objectBeginDate })
	        .exit();

	var displayArtist4 = d3.select(".overlay4").selectAll("#overlay4")
	        .data(repImg4.filter(function (d, i) { return i === img4random;}))
	        .enter()
	        .append("text")
	        .attr("id", "artistDisplayName")
	        .text(function(d) { return "Artist: " + d.artistDisplayName.substring(0,20).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayCulture4 = d3.select(".overlay4").selectAll("#overlay4")
	        .data(repImg4.filter(function (d, i) { return i === img4random;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture.replace(/[^ -~]+/g, "") })
	        .exit();

	var displayMedium= d3.select(".overlay4").selectAll("#overlay4")
        .data(repImg4.filter(function (d, i) { return i === img4random;}))
        .enter()
        .append("text")
        .attr("id", "objectMedium")
        .text(function(d) {return "Medium: " + d.Medium.replace(/[^ -~]+/g, "")})
        .exit();

	var displayObject4= d3.select(".overlay4").selectAll("#overlay4")
	        .data(repImg4.filter(function (d, i) { return i === img4random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName.replace(/[^ -~]+/g, "") +"s (of " + formatThousands(objectNames[3].value) + ")"})
	        .exit();

	var displayLink= d3.select(".overlay4").selectAll("#overlay4")
	        .data(repImg4.filter(function (d, i) { return i === img4random;}))
	        .enter()
	        .append("a")
	        .attr("id", "link")
	        .attr("href",function(d) {return d.linkResolution})
	        .attr("target","_blank")
	        .text("View")
	        .exit();

	// Rep Image 5

	var img5random = Math.floor((Math.random() * repImg5.length) + 0);

	d3.select(".image5").selectAll("img").remove();

	var displayRepImg5 = d3.select(".image5").selectAll("#repImg5")
			.data(repImg5.filter(function (d, i) { return i === img5random;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .style("background-position","center")
	        .style("background-size","30%")
	        .attr("src",function(d) {return d.URL;})
	        .attr("onerror", "this.onerror=null;this.src='assets/refresh.jpg';")
	        .append('a').attr('href',function(d) {return d.URL;})
	        .exit();

	d3.select(".image5").selectAll("div").remove();

	var displayOverlay5 = d3.select(".image5").selectAll("#repImg5")
	        .data(repImg5.filter(function (d, i) { return i === img5random;}))
	        .enter()
	        .append('div')
	        .attr("class", "overlay5")
	        .attr("id", "overlay5")
	        .exit();

	var displayTitle5 = d3.select(".overlay5").selectAll("#overlay5")
	        .data(repImg5.filter(function (d, i) { return i === img5random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectTitle")
	        .text(function(d) { return d.Title.substring(0,40).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayDate5 = d3.select(".overlay5").selectAll("#overlay5")
	        .data(repImg5.filter(function (d, i) { return i === img5random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectBeginDate")
	        .text(function(d) { return d.objectBeginDate })
	        .exit();

	var displayArtist5 = d3.select(".overlay5").selectAll("#overlay5")
	        .data(repImg5.filter(function (d, i) { return i === img5random;}))
	        .enter()
	        .append("text")
	        .attr("id", "artistDisplayName")
	        .text(function(d) { return "Artist: " + d.artistDisplayName.substring(0,20).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayCulture5 = d3.select(".overlay5").selectAll("#overlay5")
	        .data(repImg5.filter(function (d, i) { return i === img5random;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture.replace(/[^ -~]+/g, "") })
	        .exit();

	var displayMedium= d3.select(".overlay5").selectAll("#overlay5")
        .data(repImg5.filter(function (d, i) { return i === img5random;}))
        .enter()
        .append("text")
        .attr("id", "objectMedium")
        .text(function(d) {return "Medium: " + d.Medium.replace(/[^ -~]+/g, "")})
        .exit();

	var displayObject5= d3.select(".overlay5").selectAll("#overlay5")
	        .data(repImg5.filter(function (d, i) { return i === img5random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName.replace(/[^ -~]+/g, "") +"s (of " + formatThousands(objectNames[4].value) + ")"})
	        .exit();

	var displayLink= d3.select(".overlay5").selectAll("#overlay5")
	        .data(repImg5.filter(function (d, i) { return i === img5random;}))
	        .enter()
	        .append("a")
	        .attr("id", "link")
	        .attr("href",function(d) {return d.linkResolution})
	        .attr("target","_blank")
	        .text("View")
	        .exit();

	// Rep Image 6

	var img6random = Math.floor((Math.random() * repImg6.length) + 0);

	d3.select(".image6").selectAll("img").remove();

	var displayRepImg6 = d3.select(".image6").selectAll("#repImg6")
			.data(repImg6.filter(function (d, i) { return i === img6random;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .style("background-position","center")
	        .style("background-size","30%")
	        .attr("src",function(d) {return d.URL;})
	        .attr("onerror", "this.onerror=null;this.src='assets/refresh.jpg';")
	        .append('a').attr('href',function(d) {return d.URL;})
	        .exit();

	d3.select(".image6").selectAll("div").remove();

	var displayOverlay6 = d3.select(".image6").selectAll("#repImg6")
	        .data(repImg6.filter(function (d, i) { return i === img6random;}))
	        .enter()
	        .append('div')
	        .attr("class", "overlay6")
	        .attr("id", "overlay6")
	        .exit();

	var displayTitle6 = d3.select(".overlay6").selectAll("#overlay6")
	        .data(repImg6.filter(function (d, i) { return i === img6random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectTitle")
	        .text(function(d) { return d.Title.substring(0,40).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayDate6 = d3.select(".overlay6").selectAll("#overlay6")
	        .data(repImg6.filter(function (d, i) { return i === img6random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectBeginDate")
	        .text(function(d) { return d.objectBeginDate })
	        .exit();

	var displayArtist6 = d3.select(".overlay6").selectAll("#overlay6")
	        .data(repImg6.filter(function (d, i) { return i === img6random;}))
	        .enter()
	        .append("text")
	        .attr("id", "artistDisplayName")
	        .text(function(d) { return "Artist: " + d.artistDisplayName.substring(0,20).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayCulture6 = d3.select(".overlay6").selectAll("#overlay6")
	        .data(repImg6.filter(function (d, i) { return i === img6random;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture.replace(/[^ -~]+/g, "") })
	        .exit();

	var displayMedium= d3.select(".overlay6").selectAll("#overlay6")
        .data(repImg6.filter(function (d, i) { return i === img6random;}))
        .enter()
        .append("text")
        .attr("id", "objectMedium")
        .text(function(d) {return "Medium: " + d.Medium.replace(/[^ -~]+/g, "")})
        .exit();

	var displayObject6= d3.select(".overlay6").selectAll("#overlay6")
	        .data(repImg6.filter(function (d, i) { return i === img6random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName.replace(/[^ -~]+/g, "") +"s (of " + formatThousands(objectNames[5].value) + ")"})
	        .exit();

	var displayLink= d3.select(".overlay6").selectAll("#overlay6")
	        .data(repImg6.filter(function (d, i) { return i === img6random;}))
	        .enter()
	        .append("a")
	        .attr("id", "link")
	        .attr("href",function(d) {return d.linkResolution})
	        .attr("target","_blank")
	        .text("View")
	        .exit();

	// Rep Image 7

	var img7random = Math.floor((Math.random() * repImg7.length) + 0);

	d3.select(".image7").selectAll("img").remove();

	var displayRepImg7 = d3.select(".image7").selectAll("#repImg7")
			.data(repImg7.filter(function (d, i) { return i === img7random;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .style("background-position","center")
	        .style("background-size","30%")
	        .attr("src",function(d) {return d.URL;})
	        .attr("onerror", "this.onerror=null;this.src='assets/refresh.jpg';")
	        .append('a').attr('href',function(d) {return d.URL;})
	        .exit();

	d3.select(".image7").selectAll("div").remove();

	var displayOverlay7 = d3.select(".image7").selectAll("#repImg7")
	        .data(repImg7.filter(function (d, i) { return i === img7random;}))
	        .enter()
	        .append('div')
	        .attr("class", "overlay7")
	        .attr("id", "overlay7")
	        .exit();

	var displayTitle7 = d3.select(".overlay7").selectAll("#overlay7")
	        .data(repImg7.filter(function (d, i) { return i === img7random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectTitle")
	        .text(function(d) { return d.Title.substring(0,40).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayDate7 = d3.select(".overlay7").selectAll("#overlay7")
	        .data(repImg7.filter(function (d, i) { return i === img7random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectBeginDate")
	        .text(function(d) { return d.objectBeginDate })
	        .exit();

	var displayArtist7 = d3.select(".overlay7").selectAll("#overlay7")
	        .data(repImg7.filter(function (d, i) { return i === img7random;}))
	        .enter()
	        .append("text")
	        .attr("id", "artistDisplayName")
	        .text(function(d) { return "Artist: " + d.artistDisplayName.substring(0,20).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayCulture7 = d3.select(".overlay7").selectAll("#overlay7")
	        .data(repImg7.filter(function (d, i) { return i === img7random;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture.replace(/[^ -~]+/g, "") })
	        .exit();

	var displayMedium= d3.select(".overlay7").selectAll("#overlay7")
        .data(repImg7.filter(function (d, i) { return i === img7random;}))
        .enter()
        .append("text")
        .attr("id", "objectMedium")
        .text(function(d) {return "Medium: " + d.Medium.replace(/[^ -~]+/g, "")})
        .exit();

	var displayObject7= d3.select(".overlay7").selectAll("#overlay7")
	        .data(repImg7.filter(function (d, i) { return i === img7random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName.replace(/[^ -~]+/g, "") +"s (of " + formatThousands(objectNames[6].value) + ")"})
	        .exit();

	var displayLink= d3.select(".overlay7").selectAll("#overlay7")
	        .data(repImg7.filter(function (d, i) { return i === img7random;}))
	        .enter()
	        .append("a")
	        .attr("id", "link")
	        .attr("href",function(d) {return d.linkResolution})
	        .attr("target","_blank")
	        .text("View")
	        .exit();

	// Rep Image 8

	var img8random = Math.floor((Math.random() * repImg8.length) + 0);

	d3.select(".image8").selectAll("img").remove();

	var displayRepImg8 = d3.select(".image8").selectAll("#repImg8")
			.data(repImg8.filter(function (d, i) { return i === img8random;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .style("background-position","center")
	        .style("background-size","30%")
	        .attr("src",function(d) {return d.URL;})
	        .attr("onerror", "this.onerror=null;this.src='assets/refresh.jpg';")
	        .append('a').attr('href',function(d) {return d.URL;})
	        .exit();

	d3.select(".image8").selectAll("div").remove();

	var displayOverlay8 = d3.select(".image8").selectAll("#repImg8")
	        .data(repImg8.filter(function (d, i) { return i === img8random;}))
	        .enter()
	        .append('div')
	        .attr("class", "overlay8")
	        .attr("id", "overlay8")
	        .exit();

	var displayTitle8 = d3.select(".overlay8").selectAll("#overlay8")
	        .data(repImg8.filter(function (d, i) { return i === img8random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectTitle")
	        .text(function(d) { return d.Title.substring(0,40).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayDate8 = d3.select(".overlay8").selectAll("#overlay8")
	        .data(repImg8.filter(function (d, i) { return i === img8random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectBeginDate")
	        .text(function(d) { return d.objectBeginDate })
	        .exit();

	var displayArtist8 = d3.select(".overlay8").selectAll("#overlay8")
	        .data(repImg8.filter(function (d, i) { return i === img8random;}))
	        .enter()
	        .append("text")
	        .attr("id", "artistDisplayName")
	        .text(function(d) { return "Artist: " + d.artistDisplayName.substring(0,20).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayCulture8 = d3.select(".overlay8").selectAll("#overlay8")
	        .data(repImg8.filter(function (d, i) { return i === img8random;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture.replace(/[^ -~]+/g, "") })
	        .exit();

	var displayMedium= d3.select(".overlay8").selectAll("#overlay8")
        .data(repImg8.filter(function (d, i) { return i === img8random;}))
        .enter()
        .append("text")
        .attr("id", "objectMedium")
        .text(function(d) {return "Medium: " + d.Medium.replace(/[^ -~]+/g, "")})
        .exit();

	var displayObject8= d3.select(".overlay8").selectAll("#overlay8")
	        .data(repImg8.filter(function (d, i) { return i === img8random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName.replace(/[^ -~]+/g, "") +"s (of " + formatThousands(objectNames[7].value) + ")"})
	        .exit();

	var displayLink= d3.select(".overlay8").selectAll("#overlay8")
	        .data(repImg8.filter(function (d, i) { return i === img8random;}))
	        .enter()
	        .append("a")
	        .attr("id", "link")
	        .attr("href",function(d) {return d.linkResolution})
	        .attr("target","_blank")
	        .text("View")
	        .exit();

	// Rep Image 9

	var img9random = Math.floor((Math.random() * repImg9.length) + 0);

	d3.select(".image9").selectAll("img").remove();

	var displayRepImg9 = d3.select(".image9").selectAll("#repImg9")
			.data(repImg9.filter(function (d, i) { return i === img9random;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .style("background-position","center")
	        .style("background-size","30%")
	        .attr("src",function(d) {return d.URL;})
	        .attr("onerror", "this.onerror=null;this.src='assets/refresh.jpg';")
	        .append('a').attr('href',function(d) {return d.URL;})
	        .exit();

	d3.select(".image9").selectAll("div").remove();

	var displayOverlay9 = d3.select(".image9").selectAll("#repImg9")
	        .data(repImg9.filter(function (d, i) { return i === img9random;}))
	        .enter()
	        .append('div')
	        .attr("class", "overlay9")
	        .attr("id", "overlay9")
	        .exit();

	var displayTitle9 = d3.select(".overlay9").selectAll("#overlay9")
	        .data(repImg9.filter(function (d, i) { return i === img9random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectTitle")
	        .text(function(d) { return d.Title.substring(0,40).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayDate9 = d3.select(".overlay9").selectAll("#overlay9")
	        .data(repImg9.filter(function (d, i) { return i === img9random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectBeginDate")
	        .text(function(d) { return d.objectBeginDate })
	        .exit();

	var displayArtist9 = d3.select(".overlay9").selectAll("#overlay9")
	        .data(repImg9.filter(function (d, i) { return i === img9random;}))
	        .enter()
	        .append("text")
	        .attr("id", "artistDisplayName")
	        .text(function(d) { return "Artist: " + d.artistDisplayName.substring(0,20).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayCulture9 = d3.select(".overlay9").selectAll("#overlay9")
	        .data(repImg9.filter(function (d, i) { return i === img9random;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture.replace(/[^ -~]+/g, "") })
	        .exit();

	var displayMedium= d3.select(".overlay9").selectAll("#overlay9")
        .data(repImg9.filter(function (d, i) { return i === img9random;}))
        .enter()
        .append("text")
        .attr("id", "objectMedium")
        .text(function(d) {return "Medium: " + d.Medium.replace(/[^ -~]+/g, "")})
        .exit();

	var displayObject9= d3.select(".overlay9").selectAll("#overlay9")
	        .data(repImg9.filter(function (d, i) { return i === img9random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName.replace(/[^ -~]+/g, "") +"s (of " + formatThousands(objectNames[8].value) + ")"})
	        .exit();

	var displayLink= d3.select(".overlay9").selectAll("#overlay9")
	        .data(repImg9.filter(function (d, i) { return i === img9random;}))
	        .enter()
	        .append("a")
	        .attr("id", "link")
	        .attr("href",function(d) {return d.linkResolution})
	        .attr("target","_blank")
	        .text("View")
	        .exit();

	// Rep Image 10

	var img10random = Math.floor((Math.random() * repImg10.length) + 0);

	d3.select(".image10").selectAll("img").remove();

	var displayRepImg10 = d3.select(".image10").selectAll("#repImg10")
			.data(repImg10.filter(function (d, i) { return i === img10random;}))
	        .enter()
	        .append('img')
	        .style("width","100%")
	        .style("height","100%")
	        .style("background-position","center")
	        .style("background-size","30%")
	        .attr("src",function(d) {return d.URL;})
	        .attr("onerror", "this.onerror=null;this.src='assets/refresh.jpg';")
	        .append('a').attr('href',function(d) {return d.URL;})
	        .exit();

	d3.select(".image10").selectAll("div").remove();

	var displayOverlay10 = d3.select(".image10").selectAll("#repImg10")
	        .data(repImg10.filter(function (d, i) { return i === img10random;}))
	        .enter()
	        .append('div')
	        .attr("class", "overlay10")
	        .attr("id", "overlay10")
	        .exit();

	var displayTitle10 = d3.select(".overlay10").selectAll("#overlay10")
	        .data(repImg10.filter(function (d, i) { return i === img10random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectTitle")
	        .text(function(d) { return d.Title.substring(0,40).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayDate10 = d3.select(".overlay10").selectAll("#overlay10")
	        .data(repImg10.filter(function (d, i) { return i === img10random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectBeginDate")
	        .text(function(d) { return d.objectBeginDate })
	        .exit();

	var displayArtist10 = d3.select(".overlay10").selectAll("#overlay10")
	        .data(repImg10.filter(function (d, i) { return i === img10random;}))
	        .enter()
	        .append("text")
	        .attr("id", "artistDisplayName")
	        .text(function(d) { return "Artist: " + d.artistDisplayName.substring(0,20).replace(/[^ -~]+/g, "") })
	        .exit();

	var displayCulture10 = d3.select(".overlay10").selectAll("#overlay10")
	        .data(repImg10.filter(function (d, i) { return i === img10random;}))
	        .enter()
	        .append("text")
	        .attr("id", "where")
	        .text(function(d) { return "Culture: " + d.Culture.replace(/[^ -~]+/g, "") })
	        .exit();

	var displayMedium= d3.select(".overlay10").selectAll("#overlay10")
        .data(repImg10.filter(function (d, i) { return i === img10random;}))
        .enter()
        .append("text")
        .attr("id", "objectMedium")
        .text(function(d) {return "Medium: " + d.Medium.replace(/[^ -~]+/g, "")})
        .exit();

	var displayObject10= d3.select(".overlay10").selectAll("#overlay10")
	        .data(repImg10.filter(function (d, i) { return i === img10random;}))
	        .enter()
	        .append("text")
	        .attr("id", "objectName")
	        .text(function(d) {return "Family: " + d.objectName.replace(/[^ -~]+/g, "") +"s (of " + formatThousands(objectNames[9].value) + ")"})
	        .exit();

	var displayLink= d3.select(".overlay10").selectAll("#overlay10")
	        .data(repImg10.filter(function (d, i) { return i === img10random;}))
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
	// console.log(departments);

	var top1 = dataset.filter(function(d){return d.isPublic === "True" & d.URL != "NA" & d.Department == departments[0].key });
	// console.log(repImg1);
	var top2 = dataset.filter(function(d){return d.isPublic === "True" & d.URL != "NA" & d.Department== departments[1].key });
	// console.log(repImg2);
	var top3 = dataset.filter(function(d){return d.isPublic === "True" & d.URL != "NA" & d.Department == departments[2].key });
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
    };

    


				// change dataset to selected dataset
				d3.select("input[value=\"All\"]").property("checked", true);
			    d3.selectAll("input").on("change", selectDataset);
			    d3.selectAll("input").on("click", selectDataset);

			    function selectDataset(){
			        var value = this.value;
			        if (value == "All")
			        {
			            change(allData);
			            origins(allData);
			            gallery(allData);
			           d3.select("input[class=\"radio-custom\"][value=\"All\"]").property("checked", true);
			        }
			        else if (value == "Paper")
			        {
			            change(paperData);
			            origins(paperData);
			            gallery(paperData);
			            d3.select("input[value=\"Paper\"]").property("checked", true);
			        }
			        else if (value == "Pen")
			        {
			            change(penData);
			            origins(penData);
			            gallery(penData);
			            d3.select("input[value=\"Pen\"]").property("checked", true);
			        }
			        else if (value == "Wood")
			        {
			            change(woodData);
			            origins(woodData);
			            gallery(woodData);
			            d3.select("input[value=\"Wood\"]").property("checked", true);
			        }
			        else if (value == "Silk")
			        {
			            change(silkData);
			            origins(silkData);
			            gallery(silkData);
			            d3.select("input[value=\"Silk\"]").property("checked", true);
			        }
			        else if (value == "Ink")
			        {
			            change(inkData);
			            origins(inkData);
			            gallery(inkData);
			            d3.select("input[type=\"radio\"][value=\"Ink\"]").property("checked", true);
			        }
			        else if (value == "Silver")
			        {
			            change(silverData);
			            origins(silverData);
			            gallery(silverData);
			            d3.select("input[type=\"radio\"][value=\"Silver\"]").property("checked", true);
			        }
			        else if (value == "Glass")
			        {
			            change(glassData);
			            origins(glassData);
			            gallery(glassData);
			            d3.select("input[type=\"radio\"][value=\"Glass\"]").property("checked", true);
			        }
			        else if (value == "Albumen")
			        {
			            change(albumenData);
			            origins(albumenData);
			            gallery(albumenData);
			            d3.select("input[type=\"radio\"][value=\"Albumen\"]").property("checked", true);
			        }
			        else if (value == "Gold")
			        {
			            change(goldData);
			            origins(goldData);
			            gallery(goldData);
			            d3.select("input[type=\"radio\"][value=\"Gold\"]").property("checked", true);
			        }
			         else if (value == "Porcelain")
			        {
			            change(porcelainData);
			            origins(porcelainData);
			            gallery(porcelainData);
			            d3.select("input[value=\"Porcelain\"]").property("checked", true);
			        }
			        
			    }

//end d3.csv function
			      
		});

//end getInfo function
	};

console.clear();

