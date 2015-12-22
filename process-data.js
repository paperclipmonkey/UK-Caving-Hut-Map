/*
Process .csv data in to GeoJSON files
Expects a lat and lng field in the CSV file. This is added to the GeoJSON in to the geometry object
All attributes are copied to the properties object
*/

var fs = require('fs')
var parse = require('csv')
var transform = require('stream-transform')
var geojsonStream = require('geojson-stream')

var inputFile = 'data/huts.csv';
var outputFile = 'assets/geojson/huts.geojson'

//Pipe for processing outputted features and bundling them in to a GeoJSON feature collection
var outputStream = geojsonStream.stringify()
//Parser for CSV files in to a pipe
var parser = parse.parse({delimiter: ',', columns: true})

//Input and output file streams
var input = fs.createReadStream(inputFile)
var output = fs.createWriteStream(outputFile)

//Transformation function that's applied to the records during pipeing
var transformer = transform(function(record, callback){
	var newRecord = {
	    "type":"Feature",
	    "properties":record,
	    "geometry":{
	      "type":"Point",
	      "coordinates":[
	        parseFloat(record.lng),
	        parseFloat(record.lat)]
	    }
	}
    callback(null, newRecord)
}, {parallel: 10})

//Start processing the data
console.log('Starting processing data from: ' + inputFile)
input.pipe(parser).pipe(transformer).pipe(outputStream).pipe(output)
console.log('Done saving data to: ' + outputFile)