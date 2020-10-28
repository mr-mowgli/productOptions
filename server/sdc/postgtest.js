const { Pool } = require('pg');

const pool = new Pool()

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

(async () => {
  const client = await pool.connect()
  try {
    const res = await client.query('SELECT * FROM products WHERE id = $1', [1])
    console.log(res.rows[0])
  } finally {
    client.release()
  }
})().catch(err => console.log(err.stack))

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})