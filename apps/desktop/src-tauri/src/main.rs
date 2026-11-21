// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use log::{error, info, warn};
use tauri::webview::NewWindowResponse;
use tauri::{WebviewWindow, WebviewWindowBuilder};

/// Aplikacja desktopowa Mate Chess.
///
/// Okno startuje od lokalnego ekranu ładowania (`apps/desktop/dist/index.html`), który sprawdza połączenie
/// i przechodzi do wersji webowej (w trybie deweloperskim – `http://localhost:3000`).
///
/// Okno nie ma systemowego paska tytułu – przyciski zamknij / minimalizuj / maksymalizuj rysuje aplikacja
/// w prawym górnym rogu (patrz `DesktopWindowControls` w apps/web), a okno przeciąga się za górną krawędź.
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

            let builder = WebviewWindowBuilder::from_config(app.handle(), &config)?.on_new_window(|url, _features| {
                if let Err(e) = tauri_plugin_opener::open_url(url.as_str(), None::<&str>) {
                    warn!("Nie udało się otworzyć linku {url} w przeglądarce: {e}");
                }
                NewWindowResponse::Deny
            });

            // Windows / Linux: okno bez systemowej ramki (na macOS pasek tytułu ukrywa `titleBarStyle: Overlay`)
            #[cfg(not(target_os = "macos"))]
            let builder = builder.decorations(false);

            let window = builder.build()?;
            setup_window_chrome(&window);
            Ok(())
        })
        .run(tauri::generate_context!());

    if let Err(e) = result {
        error!("Wystąpił błąd podczas uruchamiania aplikacji: {e:?}");
        std::process::exit(1);
    }
}

/// macOS: ukrywa natywne „światła” okna (system przywraca je np. po wyjściu z pełnego ekranu, więc
/// ukrywamy je ponownie przy zmianie rozmiaru i fokusu).
#[cfg(target_os = "macos")]
fn setup_window_chrome(window: &WebviewWindow) {
    use tauri::WindowEvent;

    hide_traffic_lights(window);
    let handle = window.clone();
    window.on_window_event(move |event| {
        if matches!(event, WindowEvent::Resized(_) | WindowEvent::Focused(_)) {
            hide_traffic_lights(&handle);
        }
    });
}

#[cfg(not(target_os = "macos"))]
fn setup_window_chrome(_window: &WebviewWindow) {}

#[cfg(target_os = "macos")]
fn hide_traffic_lights(window: &WebviewWindow) {
    use objc2_app_kit::{NSWindow, NSWindowButton};

    let Ok(ptr) = window.ns_window() else { return };
    // SAFETY: wskaźnik pochodzi z Tauri i wskazuje na NSWindow tego okna; wywołujemy to na wątku głównym
    let ns_window = unsafe { &*(ptr as *const NSWindow) };
    for kind in [NSWindowButton::CloseButton, NSWindowButton::MiniaturizeButton, NSWindowButton::ZoomButton] {
        if let Some(button) = ns_window.standardWindowButton(kind) {
            button.setHidden(true);
        }
    }
}
