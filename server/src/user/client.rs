use super::Participant;

#[derive(Debug, Clone)]
pub struct Client {
    http: reqwest::Client,
}

impl Client {
    pub fn new() -> Client {
        Client {
            http: reqwest::Client::new(),
        }
    }

    pub async fn get(&self, id: u16) -> Result<Participant, Box<dyn std::error::Error>> {
        let url = format!("http://user-svc.user.svc.cluster.local/v1/user/{}", id);
        let result: Participant = self.http.get(url).send().await?.json().await?;
        Ok(result)
    }
}
