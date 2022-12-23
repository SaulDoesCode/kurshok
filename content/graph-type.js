function Node(value) {
    this.value = value;
    this.children = [];
  }
  
  function Graph() {
    this.nodes = [];
  }
  
  Graph.prototype.addNode = function(value) {
    // Create a new node with the given value
    var node = new Node(value);
  
    // Add the node to the list of nodes in the graph
    this.nodes.push(node);
  
    return node;
  }
  
  Graph.prototype.addEdge = function(node1, node2) {
    // Add a connection between the two given nodes
    node1.children.push(node2);
  }
  
  Graph.prototype.search = function(value) {
    // Traverse the graph using depth-first search and return the first node
    // that has the given value
  
    // Keep track of which nodes have been visited
    var visited = new Set();
  
    // This helper function will be used to perform the depth-first search
    function dfs(node) {
      // Return the node if it has the desired value
      if (node.value === value) {
        return node;
      }
  
      // Mark the node as visited
      visited.add(node);
  
      // Recursively search each of the node's children
      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
  
        // Don't visit the same node twice
        if (!visited.has(child)) {
          var result = dfs(child);
          if (result) {
            return result;
          }
        }
      }
    }
  
    // Search through each node in the graph
    for (var i = 0; i < this.nodes.length; i++) {
      var node = this.nodes[i];
  
      // Don't visit the same node twice
      if (!visited.has(node)) {
        var result = dfs(node);
        if (result) {
          return result;
        }
      }
    }
  
    // If we reach this point, the value was not found in the graph
    return null;
  }
  
  // Create a new graph
  var graph = new Graph();
  
  // Add some nodes to the graph
  var nodeA = graph.addNode("A");
  var nodeB = graph.addNode("B");
  var nodeC = graph.addNode("C");
  var nodeD = graph.addNode("D");
  var nodeE = graph.addNode("E");
  
  // Add some edges to connect the nodes
  graph.addEdge(nodeA, nodeB);
  graph.addEdge(nodeA, nodeC);
  graph.addEdge(nodeB, nodeD);
  graph.addEdge(nodeC, nodeE);
  
  // Search for a value in the graph
  var result = graph.search("D");
  
  // Print the result
  console.log(result.value); // "D"
  