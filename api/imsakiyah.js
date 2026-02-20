// api/imsakiyah.js
export default async function handler(req, res) {
  // Hanya menerima method GET atau POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Mengambil parameter dari query string (GET) atau body (POST)
  const { action, prov, kota, tahun } = req.query || req.body || {};

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer': 'https://bimasislam.kemenag.go.id/jadwalimsakiyah',
    'Origin': 'https://bimasislam.kemenag.go.id',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  try {
    // === ROUTE: MENDAPATKAN DAFTAR KOTA BERDASARKAN PROVINSI ===
    if (action === 'getCities') {
      if (!prov) return res.status(400).json({ error: 'Missing prov' });

      const sessionRes = await fetch('https://bimasislam.kemenag.go.id/jadwalimsakiyah', { headers: { 'User-Agent': headers['User-Agent'] } });
      const setCookieHeader = sessionRes.headers.get('set-cookie');
      let cookieString = '';
      if (setCookieHeader) {
        cookieString = setCookieHeader.split(',').map(c => c.split(';')[0].trim()).join('; ');
      }
      if (cookieString) headers['Cookie'] = cookieString;

      const postData = new URLSearchParams({ 'x': prov });
      const getKabko = await fetch('https://bimasislam.kemenag.go.id/ajax/getKabkoshalat', {
        method: 'POST',
        headers: headers,
        body: postData.toString()
      });
      const htmlText = await getKabko.text();
      // Ekstrak option tags menggunakan Regex sederhana (tanpa JSDOM/cheerio agar serverless ringan)
      const optionValRegex = /<option value="([^"]+)"[^>]*>([^<]+)<\/option>/g;
      const cities = [];
      let match;
      while ((match = optionValRegex.exec(htmlText)) !== null) {
        if (match[1] && match[1] !== "") {
          cities.push({ value: match[1], text: match[2].trim() });
        }
      }
      return res.status(200).json({ success: true, data: cities });
    }

    // === ROUTE: MENDAPATKAN JADWAL IMSAKIYAH / SHALAT ===
    // Jika parameter tidak lengkap, berikan pesan error dan daftar parameter yang dibutuhkan
    if (!prov || !kota) {
      return res.status(400).json({
        error: 'Missing parameters. Silakan berikan parameter `prov` dan `kota`.',
        example: '/api/imsakiyah?action=getShalat&prov=c51ce410c124a10e0db5e4b97fc2af39&kota=58a2fc6ed39fd083f55d4182bf88826d&tahun=2026&bulan=2',
        note: 'Gunakan hash ID dari website Bimas Islam. action dapat berupa "getImsakiyah" (default) atau "getShalat".'
      });
    }

    const { bulan } = req.query || req.body || {};
    const thn = tahun || new Date().getFullYear().toString();
    const bln = bulan || (new Date().getMonth() + 1).toString();

    // 1. Dapatkan Session Cookie pertama kali (sesuai aksi, beda URL referer agar session valid)
    const isShalat = action === 'getShalat';
    const refererUrl = isShalat ? 'https://bimasislam.kemenag.go.id/jadwalshalat' : 'https://bimasislam.kemenag.go.id/jadwalimsakiyah';

    headers['Referer'] = refererUrl;

    const sessionRes = await fetch(refererUrl, {
      headers: { 'User-Agent': headers['User-Agent'] }
    });

    // Ambil cookies dari header Set-Cookie
    const setCookieHeader = sessionRes.headers.get('set-cookie');
    let cookieString = '';

    if (setCookieHeader) {
      const cookies = setCookieHeader.split(',').map(c => c.split(';')[0].trim());
      cookieString = cookies.join('; ');
    }

    if (cookieString) {
      headers['Cookie'] = cookieString;
    }

    // 2. Fetch jadwal POST request
    const postData = new URLSearchParams();
    postData.append('x', prov);
    postData.append('y', kota);

    let endpoint = '';
    if (isShalat) {
      endpoint = 'https://bimasislam.kemenag.go.id/ajax/getShalatbln';
      postData.append('bln', bln);
      postData.append('thn', thn);
    } else {
      endpoint = 'https://bimasislam.kemenag.go.id/ajax/getImsyakiyah';
      postData.append('thn', thn);
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: headers,
      body: postData.toString()
    });

    const data = await response.json();

    // 3. Kembalikan response JSON ke client
    if (data.status === 1 || data.status === '1') {
      let jadwal = data.data;
      if (typeof jadwal === 'object' && !Array.isArray(jadwal)) {
        jadwal = Object.values(jadwal);
      }

      return res.status(200).json({
        success: true,
        type: isShalat ? 'shalat' : 'imsakiyah',
        provinsi: data.prov,
        kota: data.kabko,
        tahun: thn,
        bulan: isShalat ? bln : undefined,
        hijriah: data.hijriah,
        data: jadwal
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Gagal mendapatkan data dari Bimas Islam',
        details: data
      });
    }

  } catch (error) {
    console.error('Scraping Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Terjadi kesalahan pada server saat mencoba melakukan scraping.',
      message: error.message
    });
  }
}
