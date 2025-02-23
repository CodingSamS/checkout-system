use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs::{self, remove_file, File, OpenOptions};
use std::io::{BufReader, BufWriter};
use std::path::PathBuf;
use std::sync::OnceLock;
use tauri::Manager;

static APP_DATA_DIR: OnceLock<PathBuf> = OnceLock::new();

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct CheckoutItem {
    name: String,
    price: f64,
    counter_external: u64,
    counter_internal: u64,
}

#[derive(Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
struct Event {
    last_updated: String,
    items: Vec<CheckoutItem>,
}

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

#[tauri::command]
fn get_database() -> HashMap<String, Event> {
    let mut database = HashMap::new();
    for file in std::fs::read_dir(APP_DATA_DIR.get().unwrap())
        .unwrap()
        .filter_map(|file_result| file_result.ok())
    {
        match file.file_name().into_string() {
            Ok(file_name) => match file_name.strip_suffix(".json") {
                Some(prefix) => {
                    database.insert(
                        String::from(prefix),
                        serde_json::from_reader(BufReader::new(File::open(file.path()).unwrap()))
                            .unwrap(),
                    );
                }
                None => (),
            },
            Err(_) => eprintln!("File name contains invalid unicode data"),
        };
    }
    database
}

#[tauri::command]
fn write_event(event_name: String, event_data: Event) -> () {
    let mut filepath = APP_DATA_DIR.get().unwrap().join(event_name);
    filepath.set_extension("json");
    let Ok(file) = OpenOptions::new().write(true).create(true).open(filepath) else {
        eprintln!("Failed to open the database file when writing the event to filesystem");
        return;
    };
    let writer = BufWriter::new(file);
    if serde_json::to_writer_pretty(writer, &event_data).is_err() {
        eprintln!("Error serialising the data when writing the event to the filesystem")
    };
}

#[tauri::command]
fn delete_event(event_name: String) -> () {
    let mut filepath = APP_DATA_DIR.get().unwrap().join(event_name);
    filepath.set_extension("json");
    if remove_file(filepath).is_err() {
        eprintln!("Error deleting file from disk");
    };
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_log::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .setup(setup_handler)
        .invoke_handler(tauri::generate_handler![
            get_database,
            write_event,
            delete_event
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn setup_handler(app: &mut tauri::App) -> Result<(), Box<dyn std::error::Error + 'static>> {
    APP_DATA_DIR
        .set(app.path().app_data_dir()?.join("database"))
        .unwrap();
    fs::create_dir_all(APP_DATA_DIR.get().unwrap())?;

    Ok(())
}
