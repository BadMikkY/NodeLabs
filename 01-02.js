/*6. Разработайте серверное приложение 01-02, 
на основе разработанного в задании 2, 
которое в ответе сервера пересылает html-страницу с содержимым запроса 
(метод, uri, версия протокола, заголовки, тело).*/

const http = require('http');

http.createServer((request, response) => {
    const { method, url, httpVersion, headers } = request;
    let body = '';

    request.on('data', chunk => {
        body += chunk;
    });

    request.on('end', () => {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(`
          <html>
            <head>
              <title>Request Content</title>
            </head>
            <body>
              <h1>Request Content</h1>
              <p><strong>Method:</strong> ${method}</p>
              <p><strong>URI:</strong> ${url}</p>
              <p><strong>Protocol Version:</strong> ${httpVersion}</p>
              <p><strong>Headers:</strong></p>
              <ul>
                ${Object.entries(headers).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
              </ul>
              <p><strong>Body:</strong> ${body}</p>
            </body>
          </html>
        `);
        response.end();
    });
}).listen(3000, () => {
    console.log(`Server running on port 3000`);
});