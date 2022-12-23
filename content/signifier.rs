use dashmap::DashMap;
use rayon::prelude::*;
use itertools::Itertools;
use bincode::{deserialize, serialize};

#[derive(Debug, PartialEq, Eq, Hash, Clone)]
struct Signifier(u64);

#[derive(Debug, Clone)]
struct Reference<T> {
    signifier: Signifier,
    data: T,
}

#[derive(Debug, Clone)]
struct SignifierChain {
    signifiers: Vec<Signifier>,
}

#[derive(Debug)]
struct SignificanceTransmittor {
    data: DashMap<Signifier, Vec<u8>>,
}

#[derive(Debug)]
struct SignificanceAnalyzer {
    data: DashMap<Signifier, Vec<u8>>,
}

struct DiskStore {
    data: DashMap<Signifier, Vec<u8>>,
}

impl DiskStore {
    fn new() -> Self {
        DiskStore {
            data: DashMap::new(),
        }
    }

    fn save<T: serde::Serialize>(&self, signifier: Signifier, data: &T) -> Result<(), bincode::Error> {
        let encoded = serialize(data)?;
        self.data.insert(signifier, encoded);
        Ok(())
    }

    fn load<T: serde::Deserialize>(&self, signifier: Signifier) -> Result<Option<T>, bincode::Error> {
        let encoded = self.data.get(&signifier);
        if let Some(encoded) = encoded {
            let data = deserialize(encoded)?;
            Ok(Some(data))
        } else {
            Ok(None)
        }
    }
}

impl Reference<T> {
    fn new(signifier: Signifier, data: T) -> Self {
        Reference { signifier, data }
    }

    fn get(&self) -> &T {
        &self.data
    }

    fn set(&mut self, data: T) {
        self.data = data;
    }
}

impl Signifier {
    fn equals(&self, other: &Self) -> bool {
        self.0 == other.0
    }

    fn hash(&self) -> u64 {
        self.0
    }
}

impl SignifierChain {
    fn new() -> Self {
        SignifierChain {
            signifiers: Vec::new(),
        }
    }

    fn add(&mut self, signifier: Signifier) {
        self.signifiers.push(signifier);
    }

    fn remove(&mut self, signifier: &Signifier) {
        self.signifiers.retain(|s| !s.equals(signifier));
    }
}

impl SignificanceTransmittor {
    fn new() -> Self {
        SignificanceTransmittor {
            data: DashMap::new(),
        }
    }

    fn send<T: serde::Serialize>(&self, signifier: Signifier, data: &T) {
        let encoded = serialize(data).unwrap();
        self.data.insert(signifier, encoded);
    }
    
    fn receive<T: serde::Deserialize>(&self, signifier: Signifier) -> Option<T> {
        let encoded = self.data.get(&signifier);
        if let Some(encoded) = encoded {
            let data = deserialize(encoded).unwrap();
            Some(data)
        } else {
            None
        }
    }
}

impl SignificanceAnalyzer {
    fn new(data: DashMap<Signifier, Vec<u8>>) -> Self {
        SignificanceAnalyzer { data }
    }

    fn analyze(&self) -> Vec<(Signifier, usize)> {
        let mut significance: Vec<(Signifier, usize)> = self
            .data
            .iter()
            .map(|(k, v)| (*k, v.len()))
            .collect();
        significance.sort_by(|a, b| b.1.cmp(&a.1));
        significance
    }
    
    fn report(&self) {
        let significance = self.analyze();
        for (signifier, count) in significance {
            println!("Signifier {} has a significance of {}", signifier.0, count);
        }
    }
}
    


fn main() {
    let mut store = DiskStore::new();
    let signifier = Signifier(42);
    let data = vec![1, 2, 3];
    store.save(signifier, &data).unwrap();
    let loaded = store.load::<Vec<i32>>(signifier).unwrap();
    assert_eq!(loaded, Some(data));

    let mut reference = Reference::new(signifier, data);
    assert_eq!(reference.get(), &data);
    let new_data = vec![4, 5, 6];
    reference.set(new_data);
    assert_eq!(reference.get(), &new_data);

    let mut chain = SignifierChain::new();
    chain.add(signifier);
    assert_eq!(chain.signifiers, vec![signifier]);
    chain.remove(&signifier);
    assert!(chain.signifiers.is_empty());

    let transmittor = SignificanceTransmittor::new();
    transmittor.send(signifier, &new_data);
    let received = transmittor.receive::<Vec<i32>>(signifier);
    assert_eq!(received, Some(new_data));

    let analyzer = SignificanceAnalyzer::new(transmittor.data);
    analyzer.report();

    let mut signifier_chain = SignifierChain::new();

    // Add some signifiers to the chain
    signifier_chain.add(Signifier(1));
    signifier_chain.add(Signifier(2));
    signifier_chain.add(Signifier(3));

    // Create a significance transmittor
    let transmittor = SignificanceTransmittor::new();

    // Create some reference data and send it through the transmittor
    let mut reference = Reference::new(Signifier(1), "hello world");
    transmittor.send(reference.signifier, reference.get());

    // Receive the data from the transmittor and update the reference
    let data = transmittor.receive(reference.signifier);
    if let Some(data) = data {
        reference.set(data);
    }

    // Print the updated reference data
    println!("Reference data: {:?}", reference.get());

    // Create a significance analyzer from the transmittor's data
    let analyzer = SignificanceAnalyzer::new(transmittor.data);

    // Analyze the significance of the signifiers in the chain
    let significance = analyzer.analyze();
    for (signifier, significance) in significance {
        println!("Signifier {} has significance {}", signifier.0, significance);
    }
}