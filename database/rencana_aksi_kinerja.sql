CREATE TABLE IF NOT EXISTS rencana_aksi_kinerja (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tahun INTEGER NOT NULL,
  sasaran_strategis TEXT NOT NULL,
  indikator_kinerja TEXT,
  rencana_aksi TEXT NOT NULL,
  indikator TEXT,
  target_tahun TEXT NOT NULL,
  satuan_target TEXT,
  target_tw1 TEXT,
  target_tw2 TEXT,
  target_tw3 TEXT,
  target_tw4 TEXT,
  anggaran_tahun NUMERIC DEFAULT 0,
  realisasi_anggaran_tw1 NUMERIC DEFAULT 0 CHECK (realisasi_anggaran_tw1 <= 100),
  realisasi_anggaran_tw2 NUMERIC DEFAULT 0 CHECK (realisasi_anggaran_tw2 <= 100),
  realisasi_anggaran_tw3 NUMERIC DEFAULT 0 CHECK (realisasi_anggaran_tw3 <= 100),
  realisasi_anggaran_tw4 NUMERIC DEFAULT 0 CHECK (realisasi_anggaran_tw4 <= 100),
  penanggung_jawab TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_rencana_aksi_kinerja_tahun
  ON rencana_aksi_kinerja (tahun);

CREATE INDEX IF NOT EXISTS idx_rencana_aksi_kinerja_sasaran
  ON rencana_aksi_kinerja (sasaran_strategis);

CREATE INDEX IF NOT EXISTS idx_rencana_aksi_kinerja_pj
  ON rencana_aksi_kinerja (penanggung_jawab);
