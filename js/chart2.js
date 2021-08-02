var margin = {top: 10, right: 30, bottom: 30, left: 100},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg2 = d3.select("#scene2")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("#scene2")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")

var mouseover = function (d) {
    tooltip.style("opacity", 1)
}

var mousemove = function (d) {
    tooltip
        .html("County: " + d.county + '<br>Vote Margin: ' + d.vote_diff + '<br>Vaccination Rate: ' + d.cumulative_at_least_one_dose_per_capita)
        .style("left", (d3.mouse(this)[0]+150) + "px")
        .style("top", (d3.mouse(this)[1]+100) + "px")
}

var mouseleave = function (d) {
    tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
}

d3.csv("https://raw.githubusercontent.com/c3-jonathanlin/cs416Project/master/data/vaccination_ca_april.csv", function (data) {
  var x2 = d3.scaleLinear()
    .domain([-1, 1])
    .range([ 0, width ]);
  svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x2));
  var y2 = d3.scaleLinear()
    .domain([0, 1])
    .range([ height, 0]);
  svg2.append("g")
    .call(d3.axisLeft(y2));
  svg2.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x2(d.vote_diff); })
      .attr("cy", function (d) { return y2(d.cumulative_at_least_one_dose_per_capita); })
      .attr("r", 5)
      .style("opacity", 0.5)
      .style("fill", "#000000")
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
});