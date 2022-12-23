struct Connector<A, B> {
    reference_between: (&A, &B),
    connector_type: String,
    data: Option<String>,
}

impl Connector {
    fn new(reference_between: (&A, &B), connector_type: String, data: Option<String>) -> Self {
        Self {reference_between, connector_type, data}
    }

    fn parse_data<T: Deserialize>(&self) -> Option<T> {
        self.data.map(|data| serde_json::from_str(data).map_or(None, |data| Some(data))
    }
}

