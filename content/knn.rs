use std::collections::HashMap;
use rand::prelude::*;

struct KNNClassifier {
    k: usize,
    examples: Vec<(Vec<f64>, f64)>,
}

impl KNNClassifier {
    fn new(k: usize) -> Self {
        Self {k, examples: vec![]}
    }

    fn add_example(&mut self, input: Vec<f64>, output: f64) {
        self.examples.push((input, output));
    }

    fn euclidean_distance(&self, input: &Vec<f64>, example: &Vec<f64>) -> f64 {
        // Calculate the Euclidean distance between the input and the example.
        let mut sum_of_squares = 0.0;
        for i in 0..input.len() {
           sum_of_squares += (input[i] - example[i]).powi(2);
        }
        sum_of_squares.sqrt()
    }

    fn predict(&self, input: &Vec<f64>) -> f64 {
        // Create a vector to store the distances between the input
        // and each example in the dataset.
        let mut distances: Vec<f64> = self.examples
            .iter()
            .map(|(example, _)| self.euclidean_distance(input, example))
            .collect();

        // Sort the distances vector in ascending order.
        distances.sort_by(|a, b| a.partial_cmp(b).unwrap());

        // Create a vector to store the k nearest neighbors.
        let mut neighbors: Vec<&(Vec<f64>, f64)> = vec![];

        // Add the k examples with the smallest distances to the neighbors vector.
        for i in 0..self.k {
            neighbors.push(&self.examples[i]);
        }

        // Create a map to store the frequency of each output value among
        // the k nearest neighbors.
        let mut frequency = HashMap::new();

        // Iterate over the k nearest neighbors and count the number of
        // times each output value occurs.
        for (example, output) in neighbors {
            *frequency.entry(output).or_insert(0) += 1;
        }

        // Create a vector to store the output values with the highest frequency.
        let mut most_frequent = vec![];

        // Find the output values with the highest frequency.
        let max_frequency = frequency.values().max().unwrap();
        for (output, count) in frequency {
            if count == max_frequency {
                most_frequent.push(output);
            }
        }

        // If there is more than one output value with the highest frequency,
        // return a random output value from the most frequent values.
        // Otherwise, return the single most frequent output value.
        if most_frequent.len() > 1 {
            let index = rand::thread_rng().gen_range(0, most_frequent.len());
            most_frequent[index]
        } else {
            most_frequent[0]
        }
    }
}


struct Point {
    dimensions: Vec<f64>,
    label: String,
}

fn euclidean_distance0(a: &Point, b: &Point) -> f64 {
    // Calculate the Euclidean distance between the two points.
    let mut sum_of_squares = 0.0;
    for i in 0..a.dimensions.len() {
        sum_of_squares += (a.dimensions[i] - b.dimensions[i]).powi(2);
    }
    sum_of_squares.sqrt()
}

fn knn0(training_set: &Vec<Point>, test_point: &Point, k: usize) -> String {
    // Create a vector to store the distances between the test point and each point in the training set.
    let mut distances: Vec<(f64, &Point)> = Vec::new();
    for p in training_set {
        distances.push((euclidean_distance(test_point, p), p));
    }

    // Sort the vector of distances in ascending order.
    distances.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());

    // Calculate the predicted class of the test point by looking at the k-nearest neighbors.
    let mut class_counts: HashMap<&str, usize> = HashMap::new();
    for i in 0..k {
        let label = distances[i].1.label.clone();
        let count = class_counts.entry(label).or_insert(0);
        *count += 1;
    }

    // Return the class with the most occurrences.
    class_counts.into_iter().max_by_key(|&(_, count)| count).unwrap().0
}


struct Point {
    dimensions: Vec<f64>,
    label: String,
}

fn knn(training_set: &Vec<Point>, test_point: &Point, k: usize) -> String {
    // Calculate the distances between the test point and all points in the training set
    let mut distances: Vec<(f64, &Point)> = training_set
        .iter()
        .map(|p| (euclidean_distance(p, test_point), p))
        .collect();

    // Sort the distances in ascending order
    distances.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap_or(std::cmp::Ordering::Equal));

    // Take the first k elements of the sorted distances
    let k_nearest = &distances[..k];

    // Count the number of points with each label
    let mut labels = std::collections::HashMap::new();
    for (_, p) in k_nearest {
        let count = labels.entry(p.label.clone()).or_insert(0);
        *count += 1;
    }

    // Return the label with the highest count
    labels
        .into_iter()
        .max_by_key(|(_, count)| *count)
        .map(|(label, _)| label)
        .unwrap_or_else(|| "".to_string())
}

fn euclidean_distance(a: &Point, b: &Point) -> f64 {
    let mut sum = 0.0;
    for (a_dim, b_dim) in a.dimensions.iter().zip(b.dimensions.iter()) {
        let diff = a_dim - b_dim;
        sum += diff * diff;
    }
    sum.sqrt()
}


/*
One possible way to improve this code is to add a function that calculates the mean of a set of points, which can then be used to calculate the centroid of a cluster of points. The centroid is the point at the center of the cluster, and it can be useful for identifying the "typical" point in a cluster of points.

To use this function, we can calculate the centroid of a cluster of points by calling mean() on the cluster. For example, if we have a cluster of points stored in a Vec<Point> called cluster, we can calculate the centroid of the cluster like this:
 
let centroid = mean(&cluster);
 
The centroid is a Point object, so we can use it to calculate the distance between the centroid and any point in the cluster. For example, if we have a point stored in a Point called test_point, we can calculate the distance between the centroid and the test_ point like this:
 
let distance = euclidean_distance(&centroid, &test_point);

The centroid can then be used in a variety of ways, such as to visualize the cluster of points on a scatter plot, or to make predictions about the label of new points based on their distance from the centroid.

*/

fn mean(points: &Vec<Point>) -> Point {
    let num_points = points.len() as f64;
    let mut mean = Point {
        dimensions: vec![0.0; points[0].dimensions.len()],
        label: "".to_string(),
    };
    for point in points {
        for (i, dimension) in point.dimensions.iter().enumerate() {
            mean.dimensions[i] += dimension / num_points;
        }
    }
    mean
}