import * as d3 from "d3";

const graph = {
  drawBars: function(data,svgWidth,svgHeight,barHeight,barsDomSelection="#bars") {
    const svg = d3.select(barsDomSelection);
    /* If data is empty, use predefined values */
    const minimumX = (data.length>0)?data[0]["arriveTime"]:0;
    const maximumX = (data.length>0)?(data[(data.length - 1)]["arriveTime"] + data[(data.length - 1)]["turnaroundTime"]):svgHeight;
    const x = d3.scaleLinear()
        .domain([minimumX, maximumX]).nice()
        .range([0, svgWidth]);
    // Time for transitions in milliseconds
    const t = d3.transition().duration(500);
    /* Draw Bars */
    let newRect = svg.selectAll("g").data(data, d => d.uniqueId);
    
    let dict = {}
    data.map( (item,index) => {
      dict[item.uniqueId] = item;
    });
    /*--- Remove ---*/
    // Select items to be removed
    let exitItems = newRect.exit();
    // Apply transitions to the bars inside the items to be removed
    exitItems.selectAll(".bar .singleBar")
        .attr("fill","#BF5700")
      .transition(t)
        .attr("y",svgHeight-barHeight)
        .style("opacity", 1.0);
    // Remove the items
    exitItems.transition(t).remove();      
    // Only draw bars and axis if there is data to draw
    if(data.length > 0) {
      const color = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.burnTime)])
        .range([0, 25]);
      /*--- Append ---*/
      newRect.enter()
          .append("g")
            .attr("class","bar")
          .append("rect")
            .attr("class", "singleBar")
          .transition(t)
            .attr("fill", d => (`rgb(0, 0, ${(color(d.burnTime) * 10)})`))
            .attr("x", d => {
              let initialTime = d.arriveTime + d.waitingTime;
              return x(initialTime);
            })
            .attr("y", 0)
            .attr("height", barHeight)
            .attr("width", d => (x(d.arriveTime + d.turnaroundTime) - x(d.arriveTime + d.waitingTime)));
      /*--- Update ---*/
      newRect.selectAll(".bar .singleBar")
          .transition(t)
            .attr("fill", d => {
              let newData = dict[d.uniqueId];
              return (`rgb(0, 0, ${(color(newData.burnTime) * 10)})`);
            })
            .attr("x", d => {
              let newData = dict[d.uniqueId];
              let initialTime = newData.arriveTime + newData.waitingTime;
              return x(initialTime);
            })
            .attr("y", 0)
            .attr("height", barHeight)
            .attr("width", d => {
              let newData = dict[d.uniqueId];
              return (x(newData.arriveTime + newData.turnaroundTime) - x(newData.arriveTime + newData.waitingTime));
            });
    }
  },drawYAxis: function(barHeight,axisDomSelection="#axis") {
		let axis = d3.select(axisDomSelection);
    axis.append("g")
        .attr("class","y axis")
      .append("text")
        .attr("y","-10")
        .attr("x",barHeight*(-0.5))
        .attr("transform","rotate(-90)")
        .attr("style","text-anchor: middle; stroke: #a44015; font-size: 20px;")
        .text("Process");
  },removeAxis: function(axisDomSelection) {
      d3.selectAll(axisDomSelection).remove();
  },
  removeEveryGfromAxis: function(axisDomId="axis") {
    let axis = d3.select(`#${axisDomId}`);
    axis.selectAll("g").remove();
  }
};

export default graph;