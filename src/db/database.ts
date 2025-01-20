import AsyncStorage from '@react-native-async-storage/async-storage';
import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

// Enable promise for SQLite
enablePromise(true);

const db = openDatabase(
  {name: 'SurveyPeternakan.db', location: 'default'},
  () => console.log('Database connected!'),
  err => console.error('Database error:', err),
);

export const initializeDatabase = async () => {
  const isInitialized = await AsyncStorage.getItem('isDatabaseInitialized');
  if (isInitialized === 'true') {
    console.log('Database already initialized');
    return;
  }

  const queries = [
    `CREATE TABLE IF NOT EXISTS peternak (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nama TEXT NOT NULL,
      alamat TEXT,
      kontak TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS ternak (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jenis TEXT NOT NULL,
      usia INTEGER,
      kesehatan TEXT,
      peternak_id INTEGER,
      FOREIGN KEY(peternak_id) REFERENCES peternak(id)
    )`,
    `CREATE TABLE IF NOT EXISTS kandang (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lokasi TEXT NOT NULL,
      kapasitas INTEGER,
      kondisi TEXT,
      peternak_id INTEGER,
      FOREIGN KEY(peternak_id) REFERENCES peternak(id)
    )`,
    `CREATE TABLE IF NOT EXISTS survey (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      judul TEXT NOT NULL,
      deskripsi TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS pertanyaan (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      survey_id INTEGER,
      pertanyaan TEXT,
      FOREIGN KEY(survey_id) REFERENCES survey(id)
    )`,
    `CREATE TABLE IF NOT EXISTS respon (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      survey_id INTEGER,
      pertanyaan_id INTEGER,
      jawaban TEXT,
      FOREIGN KEY(survey_id) REFERENCES survey(id),
      FOREIGN KEY(pertanyaan_id) REFERENCES pertanyaan(id)
    )`,
  ];

  db.transaction(
    async tx => {
      queries.forEach(query => {
        tx.executeSql(query);
      });
      await AsyncStorage.setItem('isDatabaseInitialized', 'true');
      console.log('All tables initialized successfully');
    },
    error => {
      console.error('Error initializing tables:', error);
    },
  );
};
