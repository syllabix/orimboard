use actix_files::NamedFile;

use actix_web::{HttpRequest, Result};

pub async fn serve(_req: HttpRequest) -> Result<NamedFile> {
    Ok(NamedFile::open_async("static/index.html").await?)
}
