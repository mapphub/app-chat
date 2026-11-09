export default async function create(ctx) {
  const name = String(ctx.params?.name || 'Комната').trim() || 'Комната';
  const id = String(ctx.params?.id || ('r' + Date.now().toString(36)));
  const db = ctx.host?.db || ctx.db;
  if (!db) return { id, name, createdAt: Date.now() };
  try {
    db.exec?.(`CREATE TABLE IF NOT EXISTS rooms (id TEXT PRIMARY KEY, name TEXT NOT NULL, createdAt INTEGER)`);
    const ts = Date.now();
    db.exec?.('INSERT INTO rooms (id, name, createdAt) VALUES (?,?,?)', [id, name, ts]);
    return { id, name, createdAt: ts };
  } catch (e) {
    return { error: String(e?.message || e) };
  }
}
