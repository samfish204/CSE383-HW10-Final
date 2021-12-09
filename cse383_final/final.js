// Samuel Fisher
// CSE 383 - Section C
// Dr. Johnson
// December 9, 2021
// Final Project - JavaScript and Ajax
var URL = "https://www.mapquestapi.com/directions/v2/route";
var phpURL = "http://fishe108.aws.csi.miamioh.edu/final.php";

// helper function in gathering and storing json data into phpliteadmin database
function jsonData(obj, url) {
  var temp = JSON.stringify(obj);
  $.ajax({
    url: url,
    method: "POST",
    data: {
      method: "setLookup",
      location: obj.route.locations[0].street,
      sensor: "web",
      value: temp
    },
  }).done(function(data) {
    console.log(data);
  });
}

// function that makes an ajax call to get the stored data from final.php when
// clicked on the history page of this project based on the user input
function historyData() {
  var date = document.getElementById("dateInput").value.toString();
  console.log(date);
  console.log("http://fishe108.aws.csi.miamioh.edu/final.php?method=getLookup&date=" + $("#dateInput").val());
  a=$.ajax({
    url: phpURL + "?method=getLookup&date=" + date,
    method: "GET"
  }).done(function(data) {
    console.log(data);
    $("#response").html("");
    if (data.result.length != 0 || $("#numLines").val() <= data.result.length) { // && $("#numLines") != undefined) {
      for (let i = 0; i < data.result.length; i++) {
        var res = JSON.parse(data.result[i].value);
        $("#response").append(`
          <div>
            <div id="durAndDist" class="col-sm-12">
              <p> Date and Time:  ${data.result[i].date} </p>
              <p> From: ${res.route.locations[0].street} To: ${res.route.locations[1].street}</p>
              <p> Number of Maneuvers: ${res.route.legs[0].maneuvers.length - 1}</p>
              <button type="button" id="overview${i}">Overview</button>
              <div id="response${i}">
              </div><br>
            </div>
          </div><br>
        `);
      }
    } else {
      $("#response").append("<p>Check the amount of lines requested.<p>");
    }
    for (let i = 0; i < $("#numLines").val(); i++) {
      $(`#overview${i}`).click(function() {
      $(`#response${i}`).append(`<img src="http://open.mapquestapi.com/elevation/v1/chart?key=JEA9cM3vcxxHZiF5di8uZKiAiEuV0fp9&shapeFormat=${res.route.options.shapeFormat}&width=400&height=300&latLngCollection=${res.route.locations[0].latLng.lat},${res.route.locations[0].latLng.lng},${res.route.locations[1].latLng.lat},${res.route.locations[1].latLng.lng}" id="elevPic"><br>`);
      for (let j = 0; j < (res.route.legs[0].maneuvers.length - 1); j++) {
        var temp = res.route.legs[0].maneuvers[j];
        var picture = temp.mapUrl;
        var narr = temp.narrative;
        var miles = temp.distance;
        var time = temp.formattedTime;
        $(`#response${i}`).append(`
          <img src="${picture}" id="mapPicture"><br>
          <div>
            <div id="durAndDist" class="col-sm-12">
              ${narr} &emsp; Duration: ${time} &emsp; Distance: ${miles}mi.
            </div><br>
          </div>
        `);
      }
      $(`#response${i}`).append(`
        <br><div>
          <div id="totalDurAndDist" class="col-sm-12">
            <b>${res.route.legs[0].maneuvers[res.route.legs[0].maneuvers.length - 1].narrative}</b>
            <br><b>Total Duration: ${res.route.legs[0].formattedTime} &emsp; Total Distance: ${res.route.legs[0].distance}mi.</b>
          </div>
        </div>
      `);
      });
    }
  }).fail(function(error) {
    console.log(error);
    $("#response").append("<p>Error, try again.</p>");
  });
}

// This function is to make an ajax call to the mapquest api in order
// to retrieve the requested data (maneuevers, distance, time, etc) based on
// the information the user gives on the directions page of the project
function directionsCall() {
  $.ajax({
    url: URL + "?key=JEA9cM3vcxxHZiF5di8uZKiAiEuV0fp9&from=" + $("#fromAddress").val() + "," + $("#fromCity").val() + "," + $("#fromState").val() + "," + $("#fromPostal").val()
        + "&to=" + $("#toAddress").val() + "," + $("#toCity").val() + "," + $("#toState").val() + "," + $("#toPostal").val(),
    method: "GET",
  }).done(function(data) {
    if (data.info.statuscode == 0) {
      $("#dirResultRow2").html("");
      jsonData(data, phpURL);
      console.log(data);
      $("#dirResultRow2").append("<h4>Directions:<h4>");
      $("#dirResultRow2").append(`<img src="http://open.mapquestapi.com/elevation/v1/chart?key=JEA9cM3vcxxHZiF5di8uZKiAiEuV0fp9&shapeFormat=${data.route.options.shapeFormat}&width=400&height=300&latLngCollection=${data.route.locations[0].latLng.lat},${data.route.locations[0].latLng.lng},${data.route.locations[1].latLng.lat},${data.route.locations[1].latLng.lng}">`);
      for (let i = 0; i < (data.route.legs[0].maneuvers.length - 1); i++) {
        var temp = data.route.legs[0].maneuvers[i];
        var picture = temp.mapUrl;
        var narr = temp.narrative;
        var miles = temp.distance;
        var time = temp.formattedTime;
        $("#dirResultRow2").append(`
          <img src="${picture}" id="mapPicture"> <br>
          <div>
            <div id="durAndDist" class="col-sm-12">
              ${narr} &emsp; Duration: ${time} &emsp; Distance: ${miles}mi.
            </div><br>
          </div>
        `);
      }
      $("#dirResultRow2").append(`
        <br><div>
          <div id="totalDurAndDist" class="col-sm-12">
            ${data.route.legs[0].maneuvers[data.route.legs[0].maneuvers.length - 1].narrative}<br>
            <b>Total Duration: ${data.route.legs[0].formattedTime} &emsp; Total Distance: ${data.route.legs[0].distance}mi.</b>
          </div>
        </div>
      `);
    } else {
      $("#dirResultRow2").append("<p>${data.info.messages[0]}</p>");
    }
  }).fail(function(error) {
      $("#dirResultRow").append("<p>${error.info.messages[0]}</p>");
  });
}
