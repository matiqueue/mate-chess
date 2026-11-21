// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use log::{error, info, warn};
use tauri::webview::NewWindowResponse;
use tauri::WebviewWindowBuilder;

/// Aplikacja desktopowa Mate Chess.
///
/// Okno startuje od lokalnego ekranu ładowania (`apps/desktop/dist/index.html`), który sprawdza połączenie
/// i przechodzi do wersji webowej (w trybie deweloperskim – `http://localhost:3000`).
/// Linki otwierane w nowym oknie (`target="_blank"`) trafiają do domyślnej przeglądarki systemu.
fn main() {
    env_logger::init();
    info!("Uruchamianie Mate Chess");

    let result = tauri::Builder::default()
        .setup(|app| {
            let config = app
                .config()
                .app
                .windows
                .first()
                .cloned()
                .ok_or("Brak konfiguracji okna w tauri.conf.json")?;

            WebviewWindowBuilder::from_config(app.handle(), &config)?
                .on_new_window(|url, _features| {
                    if let Err(e) = tauri_plugin_opener::open_url(url.as_str(), None::<&str>) {
                        warn!("Nie udało się otworzyć linku {url} w przeglądarce: {e}");
                    }
                    NewWindowResponse::Deny
                })
                .build()?;
            Ok(())
        })
        .run(tauri::generate_context!());

    if let Err(e) = result {
        error!("Wystąpił błąd podczas uruchamiania aplikacji: {e:?}");
        std::process::exit(1);
    }
}
