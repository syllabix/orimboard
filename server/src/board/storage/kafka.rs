use rdkafka::{producer::ProducerContext, ClientContext, Message};

pub struct CallbackLogger;

impl ClientContext for CallbackLogger {}

impl ProducerContext for CallbackLogger {
    type DeliveryOpaque = ();

    fn delivery(
        &self,
        delivery_result: &rdkafka::producer::DeliveryResult<'_>,
        _delivery_opaque: Self::DeliveryOpaque,
    ) {
        match delivery_result.as_ref() {
            Ok(msg) => {
                let key: &str = msg.key_view().unwrap().unwrap();
                log::debug!(
                    "produced message\nkey = {}, offset = {}, partition = {}",
                    key,
                    msg.offset(),
                    msg.partition()
                )
            }
            Err(e) => {
                let key: &str = e.1.key_view().unwrap().unwrap();
                log::error!(
                    "failed to produce message\nkey = {}, error = {}",
                    key,
                    e.0,
                )
            }
        }
    }
}
