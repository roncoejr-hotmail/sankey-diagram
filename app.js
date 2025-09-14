require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const http = require('http');
const url = require('url');


const data_dir = process.env.data_dir;
const data_file = process.env.data_file;
const field_id_1 = process.env.field_id_1;
const field_id_2 = process.env.field_id_2;
const m_field_id = process.env.m_field_id;
const m_level_id = process.env.m_level_id;
const table_name = process.env.table_name;

//
//
//
//
//
const db = new sqlite3.Database(`${data_dir}/${data_file}.db`, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('SQLite Database Connected.');
  }
}
);




//
//
//
//
//
//
const server = http.createServer((req, res) => {


  parsedUrl = url.parse(req.url, true);

  
  the_array = "";
  if(req.method === 'GET' && parsedUrl.pathname === '/dataEp-sqlite') {
    const query = parsedUrl.query;
    the_sql = `SELECT * FROM ${table_name} WHERE ${field_id_1} = '${query['level_id']}'`;

    db.all(the_sql, (err, rows) => {
      if (err) {
        console.error('Error fetching data:', err.message);
      } else {
        the_array = `{"${rows[0]['level_id']}":\n\t[\n`;
        for(i = 0; i < rows.length; i++) {
          the_array += "\t" + rows[i]['recordSet'] + ",\n";
        }
        the_array = `\t${the_array.slice(0, -2)}`;
        the_array += `\n\t]}`;
        console.log(the_array);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({the_array}));
        // res.end(JSON.stringify({message: 'The query: ', query}));
      }

    });


  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain'});
    res.end('Not Found');
  }
});



//
//
//
//
//
server.listen(3000, () => {
  console.log('Listening on http://localhost:3000');
});
