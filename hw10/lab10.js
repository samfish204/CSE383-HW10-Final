// Samuel Fisher
// CSE 383 - Section C
// Dr. Johnson
// Lab Module 10
// October 31, 2021
// This program uses JQuery and Ajax to make calls to an API to get
// data to be sent to the web page
var URL="https://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php";
var dfCounter=0;
var processCounter=0;
var errorCounter=0;
var loadCounter=0;
var networkCounter=0;
tx = 0;
rx = 0;
getProcesses();
getLoad();
getNetwork();

function getProcesses() {

        a=$.ajax({
                url: URL + '/vi/api/ps',
                method: "GET"
        }).done(function(data) {
                processCounter++;
                //clear out old data
                $("#processRun").html(processCounter);
                $("#processes").html("");
                len = data.ps.length;
                for (i=0;i<len;i++) {
                        $("#processes").append("<tr><td>" + data.ps[i].user+"</td><td>" + data.ps[i].pid + "</td><td>" + data.ps[i].runTime + "</td><td>" + data.ps[i].cmd + "</td></tr>");
                }
                setTimeout(getProcesses,1000);
        }).fail(function(error) {
                errorCounter++;
                $("#logRun").html(errorCounter);
                console.log("error",error.statusText);
                $("#log").prepend("ps error "+new Date()+"<br>");
                setTimeout(getProcesses,1000);
        });
}

function getLoad() {

        a=$.ajax({
                url: URL + '/api/v1/loadavg',
                method: "GET"
        }).done(function(data) {
                loadCounter++;
                //clear out old data
                $("#loadRun").html(loadCounter);
                $("#onemin").html(data.loadavg["OneMinAvg"]);
                $("#fivemin").html(data.loadavg["FiveMinAvg"]);
                $("#fifteenmin").html(data.loadavg["FifteenMinAvg"]);
                $("#numRunning").html(data.loadavg["NumRunning"]);
                $("#ttlProc").html(data.loadavg["TtlProcesses"]);
                setTimeout(getLoad,1000);
        }).fail(function(error) {
                errorCounter++;
                $("#logRun").html(errorCounter);
                console.log("error",error.statusText);
                $("#log").prepend("load error "+new Date()+"<br>");
                setTimeout(getLoad,1000);
        });
}

function getNetwork() {

        a=$.ajax({
                url: URL + '/api/v1/network',
                method: "GET"
        }).done(function(data) {
                networkCounter++;
                //clear out old data
                $("#networkRun").html(networkCounter);
                $("#txbytes").html(data.network["txbytes"]);
                $("#rxbytes").html(data.network["rxbytes"]);
                $("#txavg").html(data.network["txbytes"] - tx);
                $("#rxavg").html(data.network["rxbytes"] - rx);
                setTimeout(getNetwork,1000);
        }).fail(function(error) {
                errorCounter++;
                $("#logRun").html(errorCounter);
                console.log("error",error.statusText);
                $("#log").prepend("network error "+new Date()+"<br>");
                setTimeout(getNetwork,1000);
        });
}
