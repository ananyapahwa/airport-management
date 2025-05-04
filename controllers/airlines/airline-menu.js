const oracledb = require('oracledb');

async function getAirlines(req, res) {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(
      `SELECT * FROM airline`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving airlines data' });
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function executeMenuChoice(req, res) {
    const { choice } = req.body;
    let conn;
  
    try {
      conn = await oracledb.getConnection();
  
      // Enable DBMS_OUTPUT buffer (NULL = unlimited buffer size)
      await conn.execute(`BEGIN DBMS_OUTPUT.ENABLE(NULL); END;`);
  
      // Execute the procedure (passing the user's choice)
      await conn.execute(
        `BEGIN show_data(:choice); END;`,
        { choice: Number(choice) }
      );
  
      // Fetch DBMS_OUTPUT line by line
      let output = [];
      let fetchOutput = true;
  
      while (fetchOutput) {
        const result = await conn.execute(
          `BEGIN 
             DBMS_OUTPUT.GET_LINE(:line, :status); 
           END;`,
          {
            line: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 32767 },
            status: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
          }
        );
  
        const { line, status } = result.outBinds;
  
        // Status = 0 means success, 1 means no more lines
        if (status === 0) {
          output.push(line);
        } else {
          fetchOutput = false;
        }
      }
  
      res.json({ output });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error executing procedure' });
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }


module.exports = { getAirlines, executeMenuChoice };