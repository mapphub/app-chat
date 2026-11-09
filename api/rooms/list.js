export default async function list(ctx) {
  const db = ctx.host?.db || ctx.db;
  if (!db) return { rooms: [{ id: 'lobby', name: 'Лобби', createdAt: Date.now() }] };
  try {
    db.exec?.(`CREATE TABLE IF NOT EXISTS rooms (id TEXT PRIMARY KEY, name TEXT NOT NULL, createdAt INTEGER)`);
    const r = db.query?.('SELECT id, name, createdAt FROM rooms ORDER BY createdAt ASC');
    const rows = r?.rows || [];
    if (!rows.length) {
      db.exec?.('INSERT INTO rooms (id, name, createdAt) VALUES (?,?,?)', ['lobby', 'Лобби', Date.now()]);
      return { rooms: [{ id: 'lobby', name: 'Лобби', createdAt: Date.now() }] };
    }
    return { rooms: rows };
  } catch (e) {
    return { rooms: [{ id: 'lobby', name: 'Лобби', createdAt: Date.now() }], error: String(e?.message || e) };
  }
}
