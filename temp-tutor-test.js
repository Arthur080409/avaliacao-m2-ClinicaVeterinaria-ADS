const http = require('http');
const request = (opts, body) => new Promise((resolve, reject) => {
  const req = http.request(opts, (res) => {
    let data = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
  });
  req.on('error', reject);
  if (body) req.write(body);
  req.end();
});

(async () => {
  try {
    const petBody = JSON.stringify({ nome: 'Luna', especie: 'Gato', tutorId: 1 });
    const petRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/pets',
      method: 'POST',
      headers: {
        Authorization: 'Bearer clinica-2025',
        'X-Tutor-Id': '1',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(petBody),
      },
    }, petBody);
    console.log('PET', petRes.statusCode, petRes.body);

    const consBody = JSON.stringify({ petId: 1, tutorId: 1, data: '2026-04-25T09:00:00Z', procedimento: 'Vacinação' });
    const consRes = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/consultas',
      method: 'POST',
      headers: {
        Authorization: 'Bearer clinica-2025',
        'X-Tutor-Id': '1',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(consBody),
      },
    }, consBody);
    console.log('CONS', consRes.statusCode, consRes.body);
  } catch (error) {
    console.error(error);
  }
})();