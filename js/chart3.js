var margin = {top: 10, right: 30, bottom: 30, left: 100},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg3 = d3.select("#scene3")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/c3-jonathanlin/cs416Project/master/data/vaccination_ca_july.csv", function (data) {
  var x3 = d3.scaleLinear()
    .domain([-1, 1])
    .range([ 0, width ]);
  svg3.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x3));

  var y3 = d3.scaleLinear()
    .domain([0, 1])
    .range([ height, 0]);
  svg3.append("g")
    .call(d3.axisLeft(y3));

  svg3.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x3(d.vote_diff); })
      .attr("cy", function (d) { return y3(d.cumulative_at_least_one_dose_per_capita); })
      .attr("r", 5)
      .style("opacity", 0.5)
      .style("fill", "#000000")
});