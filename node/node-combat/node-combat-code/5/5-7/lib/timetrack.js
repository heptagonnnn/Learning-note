const qs = require("querystring");
const {promisify} = require("util");


exports.add = (db, req, res) => {
  exports.parseReceivedData(req).then(work => {
    db.query(
      `INSERT INTO work (hours, date, description)
        VALUE (?, ?, ?)`,
      [work.hours, work.date, work.description],
    ).then(() => {
      exports.show(db, res);
    })
  })
};


exports.delete = (db, req, res) => {
  exports.parseReceivedData(req).then(work => {
    db.query(
      `DELETE FROM work WHERE id=?`,
      [work.id]
    ).then(() => {
      exports.show(db, res);
    })
  });
};


exports.archive = (db, req, res) => {
  exports.parseReceivedData(req).then(work => {
    db.query(
      `UPDATE work SET archived=1 WHERE id=?`,
      [work.id]
    ).then(() => {
      exports.show(db, res);
    });
  });
};


exports.show = (db, res, showArchived) => {
  const query = `
  SELECT * FROM work WHERE archived=? ORDER BY date DESC`;
  const archiveValue = showArchived ? 1 : 0;

  db.query(
    query, [archiveValue]
  ).then(rows => {
    let html = (showArchived ? '' : `<a href="/archived">Archived Work</a><br/>`);

    html += exports.workHitlistHTML(rows);
    html += exports.workFormHtml();
    exports.sendHtml(res, html);
  })
};


exports.workHitlistHTML = (rows) => {

  let html = '<table>';

  for (const i in rows) {
    html += `
       <tr>
       <td>${rows[i].date}</td>
       <td>${rows[i].hours}</td>
       <td>${rows[i].description}</td>`;
    if (!rows[i].archived) {
      html += `<td>${exports.workArchiveForm(rows[i].id)}</td>`;
    }
    html += `<td>${exports.workDeleteForm(rows[i].id)}</td></tr>`;
  }

  html += '</table>';
  return html;
};


exports.workFormHtml = () => {
  const html = `
<form method="post" action="/">
<p>Date (yyyy-mm-dd):<br/><input type="text" name="date"></p>
<p>Hours worked: <br/><input type="text" name="hours"></p>
<p>Description: <br/><textarea name="description"></textarea></p>
<input type="submit" value="Add">
</form>
`;
  return html;
};


exports.workArchiveForm = (id) => {
  return exports.actionForm(id, '/archive', "Archive");
};

exports.workDeleteForm = (id) => {
  return exports.actionForm(id, "/delete", "Delete");
};


exports.sendHtml = (res, html) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", Buffer.byteLength(html));
  res.end(html);
};


exports.parseReceivedData = (req) => {

  return new Promise(resolve => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      // 按照设定的分隔符，将字符串解析为对象结构
      // 将字符串按照设定的分隔符，解析为对象结构
      resolve(qs.parse(body));
    });
  });
};


exports.actionForm = (id, path, label) => {
  return `<form method="post" action="${path}">
<input type="hidden" name="id" value="${id}">
<input type="submit" value="${label}">
</form>`
};