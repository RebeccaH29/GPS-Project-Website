var margin = {top: 20, right: 160, bottom: 35, left: 30};

var width = 130 - margin.left - margin.right,
    height = 396 - margin.top - margin.bottom;

var legendWidth = 250 - margin.left - margin.right,
    legendHeight = 200 - margin.top - margin.bottom;

var svg = d3.select("#bar-three")
  .attr("width", width + margin.left + margin.right)
  .append("svg")
  .attr("width", 150) 
  .attr("height", 300)
  .classed(".thirdbar", true); 
  //.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  countryValue = d3.select("#exampleModalLabel.modal-title").text();
  if (countryValue == 'Argentina') {
    var data = [
      { category: "Clinical Manifest", "Carriage": '0', "Disease": '426', "Unknown": '0' }
      ];
  }
  if (countryValue == 'Belarus') {
    var data = [
      { category: "Clinical Manifest", "Carriage": '23', "Disease": '75', "Unknown": '0' }
      ];
  } 
  if (countryValue == 'Brazil') {
    var data = [
      { category: "Clinical Manifest", "Carriage": '0', "Disease": '411', "Unknown": '1' }
      ];
  } 
  if (countryValue == 'Bangladesh') {
    var data = [
      { category: "Clinical Manifest", "Carriage": '19', "Disease": '537', "Unknown": '1' }
      ];
  } 
  if (countryValue == 'India') {
    var data = [
      { category: "Clinical Manifest", "Carriage": '176', "Disease": '209', "Unknown": '0' }
      ];
  } 
  if (countryValue == 'Israel') {
    var data = [
      { category: "Clinical Manifest", "Carriage": '0', "Disease": '1171', "Unknown": '0' }
      ];
  } 
  if (countryValue == 'Mozambique') {
    var data = [
      { category: "Clinical Manifest", "IPD": '363', "Carriage": '2', "Disease": '1', "Unknown": '1' }
      ];
  } 
  if (countryValue == 'Papua New Guinea') {
    var data = [
      { category: "Clinical Manifest", "Carriage": '0', "Disease": '165', "Unknown": '0'}
      ];
  } 
  if (countryValue == 'Peru') {
    var data = [
      { category: "Clinical Manifest", "Carriage": '519', "Disease": '207', "Unknown": '10'}
      ];
  } 
  if (countryValue == 'South Africa') {
    var data = [
      { category: "Clinical Manifest", "Carriage": '1858', "Disease": '426', "Unknown": '0' }
      ];
  }
  if (countryValue == 'Togo') {
    var data = [
      { category: "Clinical Manifest", "IPD": '0', "Carriage": '0', "Disease": '127', "Unknown": '0' }
      ];
  } 
  if (countryValue == 'USA') {
    var data = [
      { category: "Clinical Manifest", "Carriage": '0', "Disease": '1195', "Unknown": '817' }
      ];
  }
  /*else {
    var data = [
      { category: "Clinical Manifest", "Carriage": '0', "Disease": '0', "Unknown": '0' }
      ];
  } */
  console.log("data country from title: " + countryValue) 
  
  var svg = d3.select(".thirdbar"),
    margin = {top: 20, right: 60, bottom: 30, left: 40},
    width = 150 - margin.left - margin.right,
      height = 300 - margin.top - margin.bottom,
    //width = +svg.attr("width") - margin.left - margin.right,
    //height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  var x = d3.scaleBand()
    .rangeRound([0, width])
    .paddingInner(0.1)
    .align(0.2);
  
  var y = d3.scaleLinear()
    .range([height, 0]);
  
  var z = d3.scaleOrdinal()
    .range(["#aecbc9", "#e9d574", "#697F98", "#e7d1bc"]);

  var stack = d3.stack()
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetExpand);  
  
  //data.forEach(function(d){d.satisfied=d.totalHours-d.leftHours});
  //data.sort(function(a, b) { return b.totalHours-a.totalHours; });
  
  x.domain(data.map(function(d) { return d.category; }));
  z.domain(["IPD", "Disease", "Carriage", "Unknown"]);
  
  var serie = g.selectAll(".serie")
    .data(stack.keys(["IPD", "Disease", "Carriage", "Unknown"])(data))
    .enter().append("g")
      .attr("class", "serie")
      .attr("fill", function(d) { return z(d.key); }); 
  
  countryValue = d3.select("#exampleModalLabel.modal-title").text();    
  /*if (countryValue == 'Argentina') {
   serie.selectAll("rect")
   //g.selectAll("rect")
    .data(function(d) {return d; })
    .enter().append("rect")
      .attr("x", function(d) {return x(d.data.category); })
      .attr("y", function(d) {return y(d[0]); })
      //.attr("height", function(d) { return y(d[0]) - y(d[1]); })
      //}
      //.attr("y", function(d) {return y(d[1]); })
      //.attr("height", function(d) { return y(d[0]) - y(d[1]); })
      .attr("height", function(d) { return y(d[0]); })
      .attr("width", x.bandwidth());
  }
  else { */
    serie.selectAll("rect")
   //g.selectAll("rect")
    .data(function(d) {return d; })
    .enter().append("rect")
      .attr("x", function(d) {return x(d.data.category); })
      //.attr("y", function(d) {return y(d[0]); })
      //.attr("height", function(d) { return y(d[0]) - y(d[1]); })
      //}
      .attr("y", function(d) {return y(d[1]); })
      .attr("height", function(d) { return y(d[0]) - y(d[1]); })
      //.attr("height", function(d) { return y(d[0]); })
      .attr("width", x.bandwidth());
  //}

   g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
  
  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10, "%"));
  
  var colors = ["#e7d1bc", "#697F98", "#e9d574", "#aecbc9"];
  var svg2 = d3.select("#legend-three");
  
  var legend = svg2.selectAll(".legend")
        .data(colors)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
       
      legend.append("div")
        .attr("x", width - 18)
        .attr("class", "legendBox")
        .attr("width", 18)
        .attr("height", 18)
        .style("background-color", function(d, i) {
            switch (i) {
            case 0: return "#e7d1bc";
            case 1: return "#697F98";
            case 2: return "#e9d574";
            case 3: return "#aecbc9";
          }
        });
       
      legend.append("text")
        .attr("x", width + 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .attr("class", "legendText")
        .attr("size", "10px")
        .style("text-anchor", "start")
        .text(function(d, i) { 
          switch (i) {
            case 0: return 'Unknown';
            case 1: return 'Carriage';
            case 2: return 'Disease';
            case 3: return 'IPD';
          }
        });
      