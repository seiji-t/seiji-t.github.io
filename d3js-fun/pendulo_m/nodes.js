
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    color = d3.scaleOrdinal(d3.schemeCategory10);

var a = {id: "a"},
    b = {id: "b"},
    c = {id: "c"},
    nodes = [a, b, c],
    links = [];

//var simulation = d3.forceSimulation(nodes)
//    .force("charge", d3.forceManyBody().strength(-1000))
//    .force("link", d3.forceLink(links).distance(200))
//    .force("x", d3.forceX())
//    .force("y", d3.forceY())
//    .alphaTarget(1)
//    .on("tick", ticked);

var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
    link = g.append("g").attr("stroke", "#000").attr("stroke-width", 1.5).selectAll(".link"),
    node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll(".node");

restart();

d3.timeout(function() {
  links.push({source: a, target: b}); // Add a-b.
  links.push({source: b, target: c}); // Add b-c.
  links.push({source: c, target: a}); // Add c-a.
  restart();
}, 1000);

d3.interval(function() {
  nodes.pop(); // Remove c.
  links.pop(); // Remove c-a.
  links.pop(); // Remove b-c.
  restart();
}, 2000, d3.now());

d3.interval(function() {
  nodes.push(c); // Re-add c.
  links.push({source: b, target: c}); // Re-add b-c.
  links.push({source: c, target: a}); // Re-add c-a.
  restart();
}, 2000, d3.now() + 1000);

function restart() {

  // Apply the general update pattern to the nodes.
  node = node.data(nodes, function(d) { return d.id;});
  node.exit().remove();
  node = node.enter()
              .append('g')
  node
    .append("circle")
    .attr("fill", function(d) { return color(d.id); })
    .attr("r", d => d.r)
    .merge(node);
  node
    .append('text')
    .attr('color', 'black')
    .attr('x', '-17px')
    .attr('y', '3px')
    .style('font-size', '12px')
    .text('VIVR3')
    .style('stroke', 'orange')
//    .text(d => d.id)


  // Apply the general update pattern to the links.
  // link = link.data(links, function(d) { return d.source.id + "-" + d.target.id; });
  // link.exit().remove();
  // link = link.enter().append("line").merge(link);

  // Update and restart the simulation.
  simulation.nodes(nodes);
  // simulation.force("link").links(links);
  simulation.alpha(1).restart();
}

var maxRadius = 10,
padding = 1.5, // separation between same-color nodes
    clusterPadding = 6, // separation between different-color nodes
    maxRadius = 22;

function collide(alpha) {
  // var quadtree = d3.geom.quadtree(nodes);
  var quadtree = d3.quadtree(nodes);
  return function(d) {
    var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
        nx1 = d.cx - r,
        nx2 = d.cx + r,
        ny1 = d.cy - r,
        ny2 = d.cy + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.cx - quad.point.x,
            y = d.cy - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
        if (l < r) {
          l = (l - r) / l * alpha;
          d.cx -= x *= l;
          d.cy -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}

function ticked() {
  node
    .attr('transform', d => `translate(${d.x}, ${d.y})`)
      // .attr("x", function(d) { return d.x; })
      // .attr("y", function(d) { return d.y; })

  // link.attr("x1", function(d) { return d.source.x; })
  //     .attr("y1", function(d) { return d.source.y; })
  //     .attr("x2", function(d) { return d.target.x; })
  //     .attr("y2", function(d) { return d.target.y; });
}
