// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use std::fs;
use tauri::{CustomMenuItem, Menu, MenuItem, Submenu, WindowMenuEvent, Manager};
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Note {
    id: String,
    title: String,
    content: String,
    created_at: DateTime<Utc>,
    updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
struct SystemInfo {
    os: String,
    arch: String,
    version: String,
    total_memory: u64,
    used_memory: u64,
}

// Tauri 명령들 - 백엔드 기능 구현
#[tauri::command]
async fn get_system_info() -> Result<SystemInfo, String> {
    let os = std::env::consts::OS.to_string();
    let arch = std::env::consts::ARCH.to_string();
    
    // 시스템 정보 수집 (실제 구현은 더 복잡할 수 있음)
    Ok(SystemInfo {
        os,
        arch,
        version: "1.0.0".to_string(),
        total_memory: 8 * 1024 * 1024 * 1024, // 8GB (예시)
        used_memory: 4 * 1024 * 1024 * 1024,  // 4GB (예시)
    })
}

#[tauri::command]
async fn create_note(title: String, content: String) -> Result<Note, String> {
    let note = Note {
        id: Uuid::new_v4().to_string(),
        title,
        content,
        created_at: Utc::now(),
        updated_at: Utc::now(),
    };
    
    // 실제 앱에서는 데이터베이스나 파일에 저장
    println!("새 노트 생성: {}", note.title);
    
    Ok(note)
}

#[tauri::command]
async fn perform_heavy_computation(iterations: u64) -> Result<u64, String> {
    // CPU 집약적 작업 시뮬레이션
    let mut result = 0u64;
    for i in 0..iterations {
        result = result.wrapping_add(i * i % 1000000);
    }
    Ok(result)
}

#[tauri::command]
async fn fetch_api_data(url: String) -> Result<String, String> {
    // HTTP 요청 예시
    match reqwest::get(&url).await {
        Ok(response) => {
            match response.text().await {
                Ok(text) => Ok(text),
                Err(e) => Err(format!("텍스트 파싱 실패: {}", e)),
            }
        }
        Err(e) => Err(format!("요청 실패: {}", e)),
    }
}

#[tauri::command]
async fn save_file_content(path: String, content: String) -> Result<(), String> {
    match fs::write(&path, content) {
        Ok(_) => {
            println!("파일 저장 성공: {}", path);
            Ok(())
        }
        Err(e) => Err(format!("파일 저장 실패: {}", e)),
    }
}

#[tauri::command]
async fn read_file_content(path: String) -> Result<String, String> {
    match fs::read_to_string(&path) {
        Ok(content) => Ok(content),
        Err(e) => Err(format!("파일 읽기 실패: {}", e)),
    }
}

fn create_menu() -> Menu {
    let quit = CustomMenuItem::new("quit".to_string(), "종료");
    let about = CustomMenuItem::new("about".to_string(), "정보");
    let new_window = CustomMenuItem::new("new_window".to_string(), "새 창");
    
    let submenu = Submenu::new("앱", Menu::new()
        .add_item(about)
        .add_native_item(MenuItem::Separator)
        .add_item(new_window)
        .add_native_item(MenuItem::Separator)
        .add_item(quit));
    
    Menu::new().add_submenu(submenu)
}

fn handle_menu_event(event: WindowMenuEvent) {
    match event.menu_item_id() {
        "quit" => {
            std::process::exit(0);
        }
        "about" => {
            println!("Tauri 데모 앱 v1.0.0");
        }
        "new_window" => {
            // 새 창 생성 로직
            println!("새 창 생성 요청");
        }
        _ => {}
    }
}

fn main() {
    tauri::Builder::default()
        .menu(create_menu())
        .on_menu_event(handle_menu_event)
        .invoke_handler(tauri::generate_handler![
            get_system_info,
            create_note,
            perform_heavy_computation,
            fetch_api_data,
            save_file_content,
            read_file_content
        ])
        .setup(|app| {
            #[cfg(debug_assertions)]
            {
                let window = app.get_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("Tauri 앱 실행 중 오류 발생");
}
