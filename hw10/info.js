// Samuel Fisher
// CSE 383 - Section C
// Dr. Johnson
// Homework Module 10
// October 31, 2021
var URL="https://api.clearllc.com/api/v2/math/";
var runCounter=0;
var errorCounter=0;

function addNum() {
	var num1 = document.getElementById('num1').value;
	var num2 = document.getElementById('num2').value;
        a=$.ajax({
                url: URL + 'Add?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&n1=' + num1 + '&n2=' + num2,
                method: "GET"
        }).done(function(data) {
	 	runCounter++;
		$("#onRun").html(runCounter);
                $("#opResult").append("<tr><th>" + data.result + "</th></tr>");
        }).fail(function(error) {
                errorCounter++;
                $("#logRun").html(errorCounter);
                console.log("error",error.statusText);
                $("#log").prepend("Addition Error: " + error.statusText + " " + new Date()+"<br>");
        });
}

function subNum() {
        var num1 = document.getElementById('num1').value;
        var num2 = document.getElementById('num2').value;
        a=$.ajax({
                url: URL + 'Subtract?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&n1=' + num1 + '&n2=' + num2,
                method: "GET"
        }).done(function(data) {
                runCounter++;
                $("#onRun").html(runCounter);
                $("#opResult").append("<tr><th>" + data.result + "</th></tr>");
        }).fail(function(error) {
                errorCounter++;
                $("#logRun").html(errorCounter);
                console.log("error",error.statusText);
                $("#log").prepend("Subtraction Error " + error.statusText + " " + new Date() + "<br>");
        });
}

function multNum() {
        var num1 = document.getElementById('num1').value;
        var num2 = document.getElementById('num2').value;
        a=$.ajax({
		url: URL + 'Multiply?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&n1=' + num1 + '&n2=' + num2,
	 	method: "GET"
        }).done(function(data) {
                runCounter++;
                $("#onRun").html(runCounter);
                $("#opResult").append("<tr><th>" + data.result + "</th></tr>");
        }).fail(function(error) {
                errorCounter++;
                $("#logRun").html(errorCounter);
                console.log("error",error.statusText);
                $("#log").prepend("Multiplication Error " + error.statusText + " " + new Date() + "<br>");
        });
}

function divNum() {
        var num1 = document.getElementById('num1').value;
        var num2 = document.getElementById('num2').value;
        a=$.ajax({
                url: URL + 'Divide?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&n1=' + num1 + '&n2=' + num2,
                method: "GET"
        }).done(function(data) {
                runCounter++;
                $("#onRun").html(runCounter);
                $("#opResult").append("<tr><th>" + data.result + "</th></tr>");
        }).fail(function(error) {
                errorCounter++;
                $("#logRun").html(errorCounter);
                console.log("error",error.statusText);
                $("#log").prepend("Division Error " + error.statusText + " " + new Date() + "<br>");
        });
}
