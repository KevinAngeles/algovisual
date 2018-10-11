import * as d3 from "d3";

const graph = {
	drawYAxis: function(barsHeight,axisDomId="axis") {
		let axis = d3.select(`#${axisDomId}`);
    axis.append("g")
        .attr("class","y axis")
        .attr("transform","translate(0,0)")
      .append("text")
        .attr("y","-10")
        .attr("x",barsHeight*(-0.5))
        .attr("transform","rotate(-90)")
        .attr("style","text-anchor: middle; stroke: #a44015; font-size: 20px;")
        .text("Process");
  },
  removeEveryGfromAxis: function(axisDomId="axis") {
    let axis = d3.select(`#${axisDomId}`);
    axis.selectAll("g").remove();
  }
};

export default graph;