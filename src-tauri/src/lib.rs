use std::collections::HashMap;
use std::fs;
use std::path::PathBuf;
use std::sync::OnceLock;
use tauri::Manager;

static APP_DATA_DIR: OnceLock<PathBuf> = OnceLock::new();

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_database() -> HashMap<String, String> {
    let mut database: HashMap<String, String> = HashMap::new();
    for file in std::fs::read_dir(APP_DATA_DIR.get().unwrap())
        .unwrap()
        .filter_map(|file_result| file_result.ok())
    {
        match file.file_name().into_string() {
            Ok(file_name) => match file_name.strip_suffix(".json") {
                Some(prefix) => {
                    database.insert(
                        String::from(prefix),
                        std::fs::read_to_string(file.path()).unwrap(),
                    );
                }
                None => (),
            },
            Err(_) => eprintln!("File name contains invalid unicode data"),
        };
    }
    database
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .setup(setup_handler)
        .invoke_handler(tauri::generate_handler![greet, get_database])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn setup_handler(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error + 'static>> {
    APP_DATA_DIR
        .set(app.path().app_data_dir()?.join("database"))
        .unwrap();
    fs::create_dir_all(APP_DATA_DIR.get().unwrap())?;
    println!("{:?}", APP_DATA_DIR.get());

    Ok(())
}
