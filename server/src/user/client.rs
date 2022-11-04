use super::Participant;

#[derive(Debug, Clone)]
pub struct Client {
    url: String,
    http: reqwest::Client,
}

impl Client {
    pub fn new(base_url: String) -> Client {
        Client {
            url: format!("{}/v1/user", base_url),
            http: reqwest::Client::new(),

        }
    }

    pub async fn get(&self, id: u16) -> Result<Participant, Box<dyn std::error::Error>> {
        let url = format!("{}/{}", self.url, id);
        let result: Participant = self.http.get(url).send().await?.json().await?;
        Ok(result)
    }
}
