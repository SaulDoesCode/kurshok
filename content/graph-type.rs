struct Node {
    value: String,
    children: Vec<Node>,
  }
  
  struct Graph {
    nodes: Vec<Node>,
  }
  
  impl Graph {
    fn new() -> Self {
      Self { nodes: Vec::new() }
    }
  
    fn add_node(&mut self, value: String) -> &Node {
      self.nodes.push(Node { value, children: Vec::new() });
      self.nodes.last().unwrap()
    }

    fn remove_node(&mut self, value: String) {
      let mut visited = Vec::new();
  
      fn dfs(node: &Node, visited: &mut Vec<Node>, value: String) -> Option<Node> {
        if node.value == value {
          Some(node.clone())
        } else {
          visited.push(node.clone());
          for child in node.children.iter() {
            if !visited.contains(child) {
              if let Some(result) = dfs(child, visited, value) {
                return Some(result);
              }
            }
          }
          None
        }
      }
  
      for node in self.nodes.iter() {
        if !visited.contains(node) {
          if let Some(result) = dfs(node, &mut visited, value) {
            self.nodes.retain(|node| node != &result);
          }
        }
      }
    }
  
    fn add_edge(&mut self, node1: &Node, node2: &Node) {
      node1.children.push(node2.clone());
    }
  
    fn search(&self, value: String) -> Option<&Node> {
      let mut visited = Vec::new();
  
      fn dfs(node: &Node, visited: &mut Vec<Node>, value: String) -> Option<&Node> {
        if node.value == value {
          Some(node)
        } else {
          visited.push(node.clone());
          for child in node.children.iter() {
            if !visited.contains(child) {
              if let Some(result) = dfs(child, visited, value) {
                return Some(result);
              }
            }
          }
          None
        }
      }
  
      for node in self.nodes.iter() {
        if !visited.contains(node) {
          if let Some(result) = dfs(node, &mut visited, value) {
            return Some(result);
          }
        }
      }
      None
    }
  }
  
  fn main() {
    let mut graph = Graph::new();
  
    let node_a = graph.add_node("A".to_string());
    let node_b = graph.add_node("B".to_string());
    let node_c = graph.add_node("C".to_string());
    let node_d = graph.add_node("D".to_string());
    let node_e = graph.add_node("E".to_string());
  
    graph.add_edge(node_a, node_b);
    graph.add_edge(node_a, node_c);
    graph.add_edge(node_b, node_d);
    graph.add_edge(node_c, node_e);
  
    let result = graph.search("D".to_string());
    if let Some - node = result {
      println!("{}", node.value);
    }
  }
  