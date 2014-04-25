/**
 * @author
 */
//This is my Google library file//
var myTableURL = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1I1IanRhd9RKxe1emSFkg2LgRFIa2GTqcKSntGhBN+WHERE+DATE>";
var myKey = "&key=AIzaSyBJWD4UulDQQMtDdtacaCD03MInkDsb61g";

console.log("hi there");

//UNEMDATA is the local name of the json file loaded
function dataLoaded(UNEMPDATA) {

	console.log("data loaded");

	var gDataTable = new google.visualization.DataTable();

	//when I add columns, the first parameter is the data type in the column
	//the second parameter is the name of the columns

	gDataTable.addColumn('string', UNEMPDATA.columns[0]);
	
	//only works because it is a google.visualization object

	gDataTable.addColumn('number', UNEMPDATA.columns[1]);
	
	gDataTable.addColumn({type:'string', role:'tooltip', 'p':{'html': true}});

	gDataTable.addRows(UNEMPDATA.rows);

	
	//only works because this is a google.visualization object

	//this will create options object to actually customize the look of the chart

	var chartOptions = {
		width:600,
		height:400,
		tooltip: {isHtml: true}
		
		
		
	
	};
	
	
	//tell it to create a line chart, and give it the
	var myChart = new google.visualization.LineChart(document.getElementById("MyChart"));

	//tell it to show the title
	myChart.draw(gDataTable, chartOptions);
}


function googleLoaded(e) {

	console.log("googleLoaded");
	
	var myURL = History.getState().cleanUrl;
	
	var myYear = myURL.split("?year=")[1];

	console.log(myYear);

	//Instead of loading data from a static json file,
	//I'm going to load it from a Google Fusion Table

	$.get(myTableURL + "'1980-01-01'+" + myKey, dataLoaded, "json");

	setNav();
}

function setNav() {

	$(".btn-success").on("click", showNewData);

}


function showNewData(e) {

	//$("#year_1980").click();

		console.log("click");

		var myID = e.target.id;
		
		//e.g. "year 2000"

		var myNameArray = myID.split("_");
		
		//splits into an array, "2000" will be the second item.

		var myYear = myNameArray[1];
		
		//grab the year

		$.get(myTableURL + "'" + myYear + "-01-01'" + myKey, dataLoaded, "json");
		
		//$.get(stem+"'1979-01-01'+"+key, dataLoaded, "json");

		History.pushState({
			year : myYear
		}, "Unemployment from -" + myYear, "?year=" + myYear);
		
		
		
}

function pageLoad() {

	console.log("go to page loaded");

	//load the google visualization library
	google.load("visualization", '1', {
		packages : ["corechart"],
		callback : "googleLoaded"
	});

}


$(document).ready(pageLoad);

