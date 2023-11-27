use once_cell::sync::Lazy;
use opentelemetry::{global, KeyValue};
use opentelemetry_otlp::WithExportConfig;
use opentelemetry_sdk::{propagation::TraceContextPropagator, trace, Resource};
use tracing::dispatcher::set_global_default;
use tracing_bunyan_formatter::{BunyanFormattingLayer, JsonStorageLayer};
use tracing_log::{
    log::{self},
    LogTracer,
};
use tracing_subscriber::{layer::SubscriberExt, EnvFilter, Registry};

static INIT_TRACING: Lazy<()> = Lazy::new(|| {
    LogTracer::init().expect("trace logger failed to initialize");
});

pub fn init_tracing(service_name: String, log_level: String, exporter_endpoint: String) {
    // Create a gRPC exporter
    let exporter = opentelemetry_otlp::new_exporter()
        .tonic()
        .with_endpoint(exporter_endpoint);

    // Define a tracer
    let tracer = opentelemetry_otlp::new_pipeline()
        .tracing()
        .with_exporter(exporter)
        .with_trace_config(
            trace::config().with_resource(Resource::new(vec![KeyValue::new(
                opentelemetry_semantic_conventions::resource::SERVICE_NAME,
                service_name.clone(),
            )])),
        )
        .install_batch(opentelemetry_sdk::runtime::Tokio)
        .expect("failed to setup opentelementry tracing exporter pipeline");

    let level_filter =
        EnvFilter::try_from_default_env().unwrap_or_else(|_| EnvFilter::new(log_level));
    let tracing_layer = tracing_opentelemetry::layer().with_tracer(tracer);
    let formatting_layer = BunyanFormattingLayer::new(service_name, std::io::stdout);
    let subscriber = Registry::default()
        .with(level_filter)
        .with(tracing_layer)
        .with(JsonStorageLayer)
        .with(formatting_layer);

    global::set_text_map_propagator(TraceContextPropagator::new());

    Lazy::force(&INIT_TRACING);

    match set_global_default(subscriber.into()) {
        Ok(_) => (),
        Err(e) => log::error!("failed to setup logger: {}", e),
    };
}
