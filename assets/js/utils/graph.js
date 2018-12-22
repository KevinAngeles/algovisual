import * as d3 from 'd3';

/**
 * Summary. Draw Stacked Horizontal Bars.
 *
 * Description. This function uses barsDomSelection to select the svg element containing
 * the bars. Next, it calculates maximum and minimum if data is not empty. Then, it associates data
 * to the selection and remove accordingly. Next, it add new bars and curlies(curly braces) to a '.bar' element
 * and updates and finally updates existing ones.
 *
 * @param {Array}                            data               Array of objects.
 * @param {Number}                           svgWidth           SVG width.
 * @param {Number}                           svgHeight          SVG height.
 * @param {Number}                           barHeight          Bar height.
 * @param {String} [barsDomSelection=#axis]  barsDomSelection   String to select #bars using D3.
 *
 * @return {String}
 *
 */
export function drawBars(data,svgWidth,svgHeight,barHeight,barsDomSelection='#bars') {
  const svg = d3.select(barsDomSelection);
  // If data is empty, use predefined values
  const minimumX = (data.length>0)?data[0]['arriveTime']:0;
  const maximumX = (data.length>0)?(data[(data.length - 1)]['arriveTime'] + data[(data.length - 1)]['turnaroundTime']):svgHeight;
  const x = d3.scaleLinear()
      .domain([minimumX, maximumX])
      .range([0, svgWidth]);
  // Time for transitions in milliseconds
  const t = d3.transition().duration(500);
  /* IMPORTANT NOTE:
  /* ==============
  /* A dictionary is required when objects are bound to data in D3.
  /* D3 recognizes which elements are updated but does not recognize new data by itself.
  /* In this case, the property uniqueId is used to identify elements. However, if other properties
  /*   are updated, D3 knows which elements are updated but does not recognize modifications in properties.
  /* Therefore, the dictionary will contain uniqueId as a key and the data because uniqueId does not change.
  */
  let dict = {};
  data.map( item => {
    dict[item.uniqueId] = item;
  });
  /*===== Draw Bars =====*/
  let newBars = svg.selectAll('.bar').data(data, d => d.uniqueId);
  /*--- Remove ---*/
  // Select items to be removed
  let exitItems = newBars.exit();
  // Remove curlies
  exitItems.selectAll('.curlies').remove();
  // Apply transitions to the bars inside the items to be removed
  exitItems.selectAll('.singleBar')
      .attr('fill','#BF5700')
    .transition(t)
      .attr('y',svgHeight-barHeight)
      .style('opacity', 1.0);
  // Remove the items
  exitItems.transition(t).remove();
  // Only draw bars and axis if there is data to draw
  if(data.length > 0) {
    const color = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.burnTime)])
      .range([0, 25]);
    /*--- Append ---*/
    let bar = newBars.enter()
        .append('g')
          .attr('class','bar');

    bar.append('rect')
        .attr('class', 'singleBar')
        .on('mouseover', (d,i,node) => drawToolTip(d,i,node,x,dict))
        .on('mouseout', (d,i,node) => removeToolTip(i,node))
      .transition(t)
        .attr('fill', d => (`rgb(0, 0, ${(color(d.burnTime) * 10)})`))
        .attr('x', d => {
          let initialTime = d.arriveTime + d.waitingTime;
          return x(initialTime);
        })
        .attr('y', 0)
        .attr('height', barHeight)
        .attr('width', d => (x(d.arriveTime + d.turnaroundTime) - x(d.arriveTime + d.waitingTime)));

    drawCurlies(bar,barHeight,x);

    /*--- Update ---*/
    newBars.selectAll('.singleBar')
        .on('mouseover', (d,i,node) => drawToolTip(d,i,node,x,dict))
      .transition(t)
          .attr('fill', d => {
            let newData = dict[d.uniqueId];
            return (`rgb(0, 0, ${(color(newData.burnTime) * 10)})`);
          })
          .attr('x', d => {
            let newData = dict[d.uniqueId];
            let initialTime = newData.arriveTime + newData.waitingTime;
            return x(initialTime);
          })
          .attr('y', 0)
          .attr('height', barHeight)
          .attr('width', d => {
            let newData = dict[d.uniqueId];
            return (x(newData.arriveTime + newData.turnaroundTime) - x(newData.arriveTime + newData.waitingTime));
          });
    updateCurlies(dict,newBars,barHeight,x);
  }
}
/**
 * Summary. Draw Curlies.
 *
 * Description. This function draws curlies(curly braces). First, it appends
 * a 'g' to the bar(D3 selection) element. Then, it appends a curly brace to the 'g'
 * and a text related to it.
 *
 * @param {D3selection}  bar               D3 selection of bars.
 * @param {Number}       barHeight         Integer.
 * @param {Function}     xScale            Function that scales a domain using D3.
 *
 */
export function drawCurlies(bar,barHeight,xScale) {
  let curlies = bar.append('g').attr('class','curlies');
  curlies.append('path')
      .attr('class','curlyBrace')
      .attr('d', d => {
        let x1 = xScale(d.arriveTime + d.waitingTime);
        let y1 = barHeight + 30;
        let x2 = xScale(d.arriveTime + d.waitingTime + d.burnTime);
        let y2 = barHeight + 30;
        let w  = 10;
        let q  = 0.6;
        return makeCurlyBrace(x1,y1,x2,y2,w,q);
      });
  curlies.append('g').attr('class','curlyData')
      .attr('transform', d => {
        let gx = xScale(d.arriveTime + d.waitingTime + d.burnTime/2);
        let gy = barHeight + 50;
        return `translate(${gx},${gy})`;
      }).append('text').attr('dx', '.8em')
        .attr('dy', '.15em')
        .attr('transform', () => {
          return `rotate(65)`;
        }).attr('text-anchor','middle')
      .attr('fill', '#a44015')
    .text( d => {
      return `dx: ${d.burnTime}`;
    });
}
/**
 * Summary. Draw ToolTip.
 *
 * Description. This function draws a ToolTip and associate it to a .singleBar. It
 * uses node[i] to retrieve the .singleBar node. Then, it selects the parent .bar node
 * and selects the child .hover node. Finally, it removes the .hover node.
 *
 * @param {Array}        d                 Array of objects.
 * @param {Number}       i                 Integer representing an index.
 * @param {D3selection}  node              D3 selection of a .singleBar node.
 * @param {Function}     xScale            Function that scales a domain using D3.
 * @param {Object}       uniqueDict        Dictionary(Object) with uniqueIds and new data.
 *
 */
export function drawToolTip(d,i,node,xScale,uniqueDict) {
  const tipTool = { margin: 10, width: 70, height: 30 };
  const triangle = { width: 10, height: tipTool.margin };
  let lineData = [{'x': triangle.width * (-0.5), 'y': -triangle.height}, {'x': 0, 'y': 0},
    {'x': triangle.width * (0.5), 'y': -triangle.height}, {'x': triangle.width * (-0.5), 'y': -triangle.height}];
  // Function to draw lines (to make a triangle)
  let lineFunction = d3.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(d3.curveLinear);

  let tip = d3.select(node[i].parentNode).append('g')
    .attr('class', 'hover')
    .attr('transform', d => {
      let newData = uniqueDict[d.uniqueId];
      let tipX = xScale(newData.arriveTime + newData.waitingTime + newData.burnTime * 0.5);
      let tipY = 0;
      return `translate(${tipX},${tipY})`;
    });
  /*===== Draw ToolTip =====*/
  // Draw rectangle
  tip.append('rect')
    .attr('y', tipTool.height * (-1) - tipTool.margin)
    .attr('x', tipTool.width * (-0.5))
    .attr('rx', 5)
    .attr('ry', 5)
    .attr('height', tipTool.height)
    .attr('width', tipTool.width)
    .attr('stroke', '#a44015')
    .attr('stroke-width', 2)
    .attr('fill', 'rgb(191,87,0)');
  // Draw triangle below rectangle
  tip.append('path')
    .attr('d', lineFunction(lineData))
    .attr('stroke', '#a44015')
    .attr('stroke-width', 1)
    .attr('fill', '#a44015');
  // Draw ToolTip text
  tip.append('text')
    .attr('y', tipTool.height * (-0.5) - tipTool.margin)
    .attr('dominant-baseline', 'middle')
    .attr('text-anchor', 'middle')
    .attr('class', 'hover')
    .attr('fill', 'white')
    .text(`${d.name}`);
}
/**
 * Summary. Draw X Axis.
 *
 * Description. This function draws the X axis which includes ticks and numbers below them.
 *
 * @param {Array}                            data               Array of objects.
 * @param {Number}                           svgWidth           Total width of SVG.
 * @param {Number}                           barHeight          Bar height.
 * @param {String} [axisDomSelection=#axis]  axisDomSelection   String to select #axis using D3.
 *
 */
export function drawXAxis(data,svgWidth,barHeight,axisDomSelection='#axis') {
  let axis = d3.select(axisDomSelection);
  // Remove axis X
  axis.selectAll('.x.axis').remove();
  if(data.length > 0) {
    const tipMargin = 10;
    const minimumX = data[0]['arriveTime'];
    const maximumX = data[(data.length - 1)]['arriveTime'] + data[(data.length - 1)]['turnaroundTime'];
    const x = d3.scaleLinear()
        .domain([minimumX, maximumX])
        .range([0, svgWidth]);

    // In JavaScript, 'Set' keeps the insertion order
    let setOfTicks = new Set();
    // 'Set' is a collection of unique elements so any duplicated element is omitted
    data.map( item => {
      setOfTicks.add(item.arriveTime + item.waitingTime);
      setOfTicks.add(item.arriveTime + item.turnaroundTime);
    });

    const arrTicks = [...setOfTicks];
    const xAxis = d3.axisBottom(x).tickValues(arrTicks).tickFormat(d3.format('d'));

    axis.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + (barHeight+tipMargin) + ')')
      .call(xAxis);
  }
}
/**
 * Summary. Draw Y Axis.
 *
 * Description. This function draws the Y axis which includes a vertical label.
 * If data is an empty array, it draws nothing. Otherwise, it draws a Vertical Label.
 *
 * @param {Boolean}                          isDataEmpty        Boolean (true id data is empty).
 * @param {Number}                           barHeight          Bar height.
 * @param {String} [axisDomSelection=#axis]  axisDomSelection   String to select a domain using D3.
 *
 */
export function drawYAxis(isDataEmpty,barHeight,axisDomSelection='#axis') {
  let data = (isDataEmpty) ? []:[true];
  let axis = d3.select(axisDomSelection);
  /*===== Draw Y Axis =====*/
  let axisY = axis.selectAll('.y.axis').data(data);
  /*--- Remove ---*/
  axisY.exit().remove();
  /*--- Append ---*/
  axisY.enter().append('g')
        .attr('class','y axis')
      .append('text')
        .attr('y','-10')
        .attr('x',barHeight*(-0.5))
        .attr('transform','rotate(-90)')
        .attr('style','text-anchor: middle; stroke: #a44015; font-size: 20px;')
        .text('Process');
  /*--- Update ---*/
  axisY.select('g text')
      .attr('x',barHeight*(-0.5));
}
/**
 * Summary. Create Curlies.
 *
 * Description. Returns path string d for <path d='This string'>
 * a curly brace between x1,y1 and x2,y2, w pixels wide
 * and q factor, .5 is normal, higher q = more expressive bracket.
 *
 * @param {Number}     x1       Integer.
 * @param {Number}     y1       Integer.
 * @param {Number}     x2       Integer.
 * @param {Number}     y2       Integer.
 * @param {Number}     w        Decimal.
 * @param {Number}     q        Integer.
 *
 */
export function makeCurlyBrace(x1,y1,x2,y2,w,q) {
  //Calculate unit vector
  let dx = x1 - x2;
  let dy = y1 - y2;
  let len = Math.sqrt(dx*dx + dy*dy);
  dx = dx / len;
  dy = dy / len;
  //Calculate Control Points of path,
  let qx1 = x1 + q*w*dy;
  let qy1 = y1 - q*w*dx;
  let qx2 = (x1 - .25*len*dx) + (1-q)*w*dy;
  let qy2 = (y1 - .25*len*dy) - (1-q)*w*dx;
  let tx1 = (x1 -  .5*len*dx) + w*dy;
  let ty1 = (y1 -  .5*len*dy) - w*dx;
  let qx3 = x2 + q*w*dy;
  let qy3 = y2 - q*w*dx;
  let qx4 = (x1 - .75*len*dx) + (1-q)*w*dy;
  let qy4 = (y1 - .75*len*dy) - (1-q)*w*dx;
  return ('M ' +  x1 + ' ' +  y1 +
    ' Q ' + qx1 + ' ' + qy1 + ' ' + qx2 + ' ' + qy2 +
    ' T ' + tx1 + ' ' + ty1 +
    ' M ' +  x2 + ' ' +  y2 +
    ' Q ' + qx3 + ' ' + qy3 + ' ' + qx4 + ' ' + qy4 +
    ' T ' + tx1 + ' ' + ty1 );
}
/**
 * Summary. Remove ToolTip.
 *
 * Description. This function remove tooltips associated to bars. It
 * uses node[i] to retrieve the .singleBar node. Then, it selects the parent .bar node
 * and selects the child .hover node. Finally, it removes the .hover node.
 *
 * @param {Number}       i                 Integer representing an index.
 * @param {D3selection}  node              D3 selection of a .singleBar node.
 *
 */
export function removeToolTip(i,node) {
  d3.select(node[i].parentNode).select('g.hover').remove();
}
/**
 * Summary. Update Curlies.
 *
 * Description. This function updates existing curly braces in the svg as well
 * as their texts associated to them. It uses uniqueId of each updated element
 * to find new data in uniqueDict.
 *
 * @param {Object}       uniqueDict        Dictionary(Object) with uniqueIds and new data.
 * @param {D3selection}  updatedBars       D3 selection of the updated bars.
 * @param {Number}       barHeight         Bar height.
 * @param {Function}     xScale            Function that scales a domain using D3.
 *
 * @return {String} uniqueIdString
 *
 */
export function updateCurlies(uniqueDict,updatedBars,barHeight,xScale) {
  let curlies = updatedBars.selectAll('.curlies');
  curlies.select('.curlyBrace')
      .attr('d', d => {
        let updatedData = uniqueDict[d.uniqueId];
        let x1 = xScale(updatedData.arriveTime + updatedData.waitingTime);
        let y1 = barHeight + 30;
        let x2 = xScale(updatedData.arriveTime + updatedData.waitingTime + updatedData.burnTime);
        let y2 = barHeight + 30;
        let w  = 10;
        let q  = 0.6;
        return makeCurlyBrace(x1,y1,x2,y2,w,q);
      });
  curlies.select('.curlyData')
    .attr('transform', d => {
      let updatedData = uniqueDict[d.uniqueId];
      let gx = xScale(updatedData.arriveTime + updatedData.waitingTime + updatedData.burnTime/2);
      let gy = barHeight + 50;
      return `translate(${gx},${gy})`;
    }).select('text')
      .text( d => {
        let updatedData = uniqueDict[d.uniqueId];
        return `dx: ${updatedData.burnTime}`;
      });
}
