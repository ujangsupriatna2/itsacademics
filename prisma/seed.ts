import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const db = new PrismaClient();

// ──── Testimonials Data ────
const TESTIMONIALS_DATA = [
  { name: "Ahmad Fauzi", role: "Penghuni Tipe Anggrek A1", text: "Proses pembelian rumah sangat mudah dan transparan. Tim marketing ramah dan selalu siap membantu. Cicilan syariah membuat hati tenang tanpa riba.", rating: 5 },
  { name: "Siti Nurhaliza", role: "Penghuni Tipe Melati B3", text: "Lingkungan yang asri dan aman untuk keluarga. Anak-anak bisa bermain dengan nyaman. Sangat puas dengan kualitas bangunan rumah.", rating: 5 },
  { name: "Budi Santoso", role: "Penghuni Type Mawar C2", text: "Harga sangat kompetitif dibanding perumahan lain di sekitar Bandung. DP ringan dan proses KPR syariah cepat. Recommended!", rating: 5 },
  { name: "Dewi Lestari", role: "Penghuni Tipe Dahlia A5", text: "Sertifikat SHM sudah pecah per unit, jadi sangat aman. Lokasi strategis dekat dengan akses tol dan fasilitas umum.", rating: 5 },
  { name: "Rizky Pratama", role: "Penghuni Tipe Anggrek B1", text: "Infrastruktur perumahan sangat bagus, jalan lebar, drainase tertata rapi. Banjir? Tidak pernah selama 2 tahun tinggal di sini.", rating: 5 },
  { name: "Anisa Rahma", role: "Penghuni Tipe Melati A2", text: "Komunitas warga sangat harmonis. Ada kegiatan rutin seperti pengajian dan arisan. Betah banget tinggal di sini!", rating: 5 },
  { name: "Hendra Wijaya", role: "Penghuni Tipe Mawar A1", text: "Proses akad cepat, hanya 2 minggu dari booking fee. Tim BRR sangat profesional dan kooperatif dengan bank syariah.", rating: 4 },
  { name: "Rina Marlina", role: "Penghuni Tipe Dahlia B4", text: "Desain rumah modern minimalis sesuai dengan selera millenial. Finishing rapi dan material berkualitas tinggi.", rating: 5 },
  { name: "Dedi Mulyadi", role: "Penghuni Tipe Anggrek C3", text: "Investasi properti terbaik yang pernah saya lakukan. Harga rumah sudah naik 30% sejak saya beli 2 tahun lalu.", rating: 5 },
  { name: "Lina Susanti", role: "Penghuni Tipe Melati C1", text: "Keamanan 24 jam dengan CCTV dan security. Sangat nyaman untuk keluarga dengan anak kecil.", rating: 5 },
  { name: "Wahyu Hidayat", role: "Penghuni Tipe Mawar B2", text: "Akses ke pusat kota Bandung hanya 15 menit. Dekat dengan sekolah, rumah sakit, dan pusat perbelanjaan.", rating: 4 },
  { name: "Fitri Handayani", role: "Penghuni Tipe Dahlia A3", text: "Taman dan ruang terbuka hijau yang luas. Udara segar setiap pagi. Perfect untuk quality time keluarga.", rating: 5 },
  { name: "Agus Setiawan", role: "Penghuni Tipe Anggrek A4", text: "Pembelian cash keras dapat diskon yang menarik. Saya berhemat puluhan juta dibanding beli di developer lain.", rating: 5 },
  { name: "Yuni Astuti", role: "Penghuni Tipe Melati B5", text: "Listrik underground dan air bersih 24 jam. Tidak pernah mati lampu atau kekurangan air. Sangat memuaskan.", rating: 5 },
  { name: "Irfan Maulana", role: "Penghuni Tipe Mawar C4", text: "DP bisa dicicil 6 bulan sangat membantu. Saya yang gaji UMR pun bisa punya rumah impian. Terima kasih BRR!", rating: 5 },
  { name: "Nita Puspita", role: "Penghuni Tipe Dahlia C2", text: "Rumah sudah termasuk instalasi AC, kitchen set, dan carport. Jadi tinggal bawa koper langsung huni.", rating: 5 },
  { name: "Joko Susilo", role: "Penghuni Tipe Anggrek B5", text: "After sales service sangat responsif. Ada kendala kecil langsung ditangani. Developer yang bertanggung jawab.", rating: 4 },
  { name: "Mega Putri", role: "Penghuni Tipe Melati A4", text: "Saya rekomendasikan BRR ke semua teman dan saudara. Kualitas bangunan premium tapi harga masih terjangkau.", rating: 5 },
  { name: "Dian Prasetyo", role: "Penghuni Tipe Mawar A3", text: "Cicilan flat tanpa naik selama tenor. Tidak seperti KPR konvensional yang bisa berubah-ubah. Sungguh syariah!", rating: 5 },
  { name: "Ratna Sari", role: "Penghuni Tipe Dahlia B1", text: "Perumahan yang benar-benar mengutamakan kenyamanan penghuni. Taman bermain anak, masjid, dan lapangan olahraga tersedia lengkap.", rating: 5 },
];

// ──── Properties Data ────
const PROPERTIES_DATA = [
  {
    name: "Cluster Kav R3 & R4",
    slug: "cluster-kav-r3-r4",
    type: "45/127",
    category: "inden",
    price: 575,
    location: "Bandung Raya Residence",
    images: JSON.stringify(["/images/properties/type-45.png", "/images/properties/type45_detail.png"]),
    tag: "Best Seller",
    bedrooms: 2,
    bathrooms: 1,
    installment: "Mulai 8,6 jt/bln",
    features: JSON.stringify(["Carport", "Taman", "Ruang Tamu Luas"]),
    dpOptions: JSON.stringify([30, 35, 40, 45, 50]),
    tenorOptions: JSON.stringify([1, 2, 3, 4, 5]),
    installments: JSON.stringify({ 30: { 1: 38.9, 2: 22.1, 3: 16.6, 4: 13.8, 5: 12.1 }, 35: { 1: 36.1, 2: 20.6, 3: 15.4, 4: 12.8, 5: 11.2 }, 40: { 1: 33.4, 2: 19.0, 3: 14.2, 4: 11.8, 5: 10.4 }, 45: { 1: 30.6, 2: 17.4, 3: 13.0, 4: 10.8, 5: 9.5 }, 50: { 1: 27.8, 2: 15.8, 3: 11.8, 4: 9.8, 5: 8.6 } }),
    isFeatured: true,
  },
  {
    name: "Manjah Beureum",
    slug: "manjah-beureum",
    type: "36/78",
    category: "inden",
    price: 425,
    location: "Bandung Raya Residence",
    images: JSON.stringify(["/images/properties/type-36.png", "/images/properties/manjah_detail.png"]),
    tag: "Populer",
    bedrooms: 2, bathrooms: 1,
    installment: "Mulai 6,3 jt/bln",
    features: JSON.stringify(["Carport", "Taman Depan", "Dapur"]),
    dpOptions: JSON.stringify([30, 35, 40, 45, 50]),
    tenorOptions: JSON.stringify([1, 2, 3, 4, 5]),
    installments: JSON.stringify({ 30: { 1: 28.7, 2: 16.3, 3: 12.2, 4: 10.2, 5: 8.8 }, 35: { 1: 26.7, 2: 15.1, 3: 11.3, 4: 9.4, 5: 8.2 }, 40: { 1: 24.7, 2: 14.0, 3: 10.5, 4: 8.7, 5: 7.6 }, 45: { 1: 22.6, 2: 12.8, 3: 9.6, 4: 8.0, 5: 6.9 }, 50: { 1: 20.6, 2: 11.7, 3: 8.8, 4: 7.4, 5: 6.3 } }),
    isFeatured: false,
  },
  {
    name: "Classic Belanda",
    slug: "classic-belanda",
    type: "40/71",
    category: "inden",
    price: 344,
    location: "Sentul",
    images: JSON.stringify(["/images/properties/classic-belanda.png", "/images/properties/belanda_detail.png"]),
    tag: "Eksklusif",
    bedrooms: 2, bathrooms: 1,
    installment: "Mulai 5,1 jt/bln",
    features: JSON.stringify(["Desain Klasik", "Porch", "Taman"]),
    dpOptions: JSON.stringify([30, 35, 40, 45, 50]),
    tenorOptions: JSON.stringify([1, 2, 3, 4, 5]),
    installments: JSON.stringify({ 30: { 1: 23.2, 2: 13.2, 3: 9.9, 4: 8.3, 5: 7.2 }, 35: { 1: 21.6, 2: 12.2, 3: 9.2, 4: 7.7, 5: 6.7 }, 40: { 1: 19.9, 2: 11.3, 3: 8.5, 4: 7.1, 5: 6.2 }, 45: { 1: 18.2, 2: 10.3, 3: 7.7, 4: 6.5, 5: 5.6 }, 50: { 1: 16.6, 2: 9.4, 3: 7.1, 4: 5.9, 5: 5.1 } }),
    isFeatured: true,
  },
  {
    name: "Cluster Sentul Kav D33",
    slug: "cluster-sentul-kav-d33",
    type: "36/60",
    category: "kavling",
    price: 280,
    location: "Sentul",
    images: JSON.stringify(["/images/properties/sentul_d33.png", "/images/properties/sentul_d33_detail.png"]),
    tag: "Terjangkau",
    bedrooms: 2, bathrooms: 1,
    installment: "Mulai 4,2 jt/bln",
    features: JSON.stringify(["Carport", "Taman", "One Gate System"]),
    dpOptions: JSON.stringify([30, 35, 40, 45, 50]),
    tenorOptions: JSON.stringify([1, 2, 3, 4, 5]),
    installments: JSON.stringify({ 30: { 1: 18.9, 2: 10.7, 3: 8.0, 4: 6.7, 5: 5.8 }, 35: { 1: 17.6, 2: 10.0, 3: 7.5, 4: 6.2, 5: 5.4 }, 40: { 1: 16.2, 2: 9.2, 3: 6.9, 4: 5.7, 5: 5.0 }, 45: { 1: 14.9, 2: 8.5, 3: 6.3, 4: 5.3, 5: 4.6 }, 50: { 1: 13.5, 2: 7.7, 3: 5.8, 4: 4.8, 5: 4.2 } }),
    isFeatured: false,
  },
  {
    name: "Cluster Sentul Kav B2",
    slug: "cluster-sentul-kav-b2",
    type: "36/72",
    category: "kavling",
    price: 276,
    location: "Sentul",
    images: JSON.stringify(["/images/properties/sentul_b2.png", "/images/properties/sentul_b2_detail.png"]),
    tag: "Hemat",
    bedrooms: 2, bathrooms: 1,
    installment: "Mulai 4,1 jt/bln",
    features: JSON.stringify(["Carport", "Taman", "Keamanan 24 Jam"]),
    dpOptions: JSON.stringify([30, 35, 40, 45, 50]),
    tenorOptions: JSON.stringify([1, 2, 3, 4, 5]),
    installments: JSON.stringify({ 30: { 1: 18.6, 2: 10.5, 3: 7.9, 4: 6.6, 5: 5.7 }, 35: { 1: 17.4, 2: 9.9, 3: 7.4, 4: 6.1, 5: 5.3 }, 40: { 1: 15.9, 2: 9.1, 3: 6.8, 4: 5.6, 5: 4.9 }, 45: { 1: 14.7, 2: 8.3, 3: 6.2, 4: 5.2, 5: 4.5 }, 50: { 1: 13.3, 2: 7.6, 3: 5.7, 4: 4.7, 5: 4.1 } }),
    isFeatured: false,
  },
  {
    name: "Cluster TBA Kav 7",
    slug: "cluster-tba-kav-7",
    type: "30/54",
    category: "kavling",
    price: 270,
    location: "Sentul",
    images: JSON.stringify(["/images/properties/tba7.png", "/images/properties/tba7_detail.png"]),
    tag: "Starter",
    bedrooms: 1, bathrooms: 1,
    installment: "Mulai 4,1 jt/bln",
    features: JSON.stringify(["Carport", "Taman Mini", "Akses Mudah"]),
    dpOptions: JSON.stringify([30, 40, 50]),
    tenorOptions: JSON.stringify([1, 2, 3, 4, 5, 6, 7]),
    installments: JSON.stringify({ 30: { 1: 18.27, 2: 10.395, 3: 7.77, 4: 6.458, 5: 5.67, 6: 5.145, 7: 4.77 }, 40: { 1: 15.66, 2: 8.91, 3: 6.66, 4: 5.535, 5: 4.86, 6: 4.41, 7: 4.093 }, 50: { 1: 13.05, 2: 7.425, 3: 5.55, 4: 4.613, 5: 4.05, 6: 3.675, 7: 3.407 } }),
    isFeatured: false,
  },
  {
    name: "Sekejengkol 2 Kav E9",
    slug: "sekejengkol-2-kav-e9",
    type: "28/50",
    category: "siap_huni",
    price: 249.8,
    location: "Bandung Raya Residence",
    images: JSON.stringify(["/images/properties/e9.png", "/images/properties/e9_detail.png"]),
    tag: "Investasi",
    bedrooms: 1, bathrooms: 1,
    installment: "Mulai 3,7 jt/bln",
    features: JSON.stringify(["Carport", "Taman", "Lokasi Strategis"]),
    dpOptions: JSON.stringify([30, 35, 40, 45, 50]),
    tenorOptions: JSON.stringify([1, 2, 3, 4, 5]),
    installments: JSON.stringify({ 30: { 1: 16.9, 2: 9.6, 3: 7.2, 4: 6.0, 5: 5.2 }, 35: { 1: 15.7, 2: 8.9, 3: 6.7, 4: 5.6, 5: 4.8 }, 40: { 1: 14.5, 2: 8.2, 3: 6.2, 4: 5.1, 5: 4.5 }, 45: { 1: 13.3, 2: 7.6, 3: 5.7, 4: 4.8, 5: 4.1 }, 50: { 1: 12.1, 2: 6.9, 3: 5.2, 4: 4.3, 5: 3.7 } }),
    isFeatured: false,
  },
  {
    name: "Sekejengkol 2 Majapahit",
    slug: "sekejengkol-2-majapahit",
    type: "21/50",
    category: "siap_huni",
    price: 235,
    location: "Bandung Raya Residence",
    images: JSON.stringify(["/images/properties/type-21.png", "/images/properties/majapahit_detail.png"]),
    tag: "Termurah",
    bedrooms: 1, bathrooms: 1,
    installment: "Mulai 3,5 jt/bln",
    features: JSON.stringify(["Carport", "Taman", "Harga Terjangkau"]),
    dpOptions: JSON.stringify([30, 35, 40, 45, 50]),
    tenorOptions: JSON.stringify([1, 2, 3, 4, 5]),
    installments: JSON.stringify({ 30: { 1: 15.9, 2: 9.0, 3: 6.8, 4: 5.6, 5: 4.9 }, 35: { 1: 14.8, 2: 8.4, 3: 6.3, 4: 5.2, 5: 4.6 }, 40: { 1: 13.6, 2: 7.8, 3: 5.8, 4: 4.8, 5: 4.2 }, 45: { 1: 12.5, 2: 7.1, 3: 5.3, 4: 4.4, 5: 3.9 }, 50: { 1: 11.4, 2: 6.5, 3: 4.8, 4: 4.0, 5: 3.5 } }),
    isFeatured: false,
  },
  {
    name: "Cluster Sentul D 39",
    slug: "cluster-sentul-d-39",
    type: "30/54",
    category: "siap_huni",
    price: 226,
    location: "Sentul",
    images: JSON.stringify(["/images/properties/d39.png", "/images/properties/d39_detail.png"]),
    tag: "Promo",
    bedrooms: 1, bathrooms: 1,
    installment: "Mulai 3,4 jt/bln",
    features: JSON.stringify(["Carport", "Taman", "Cicilan Ringan"]),
    dpOptions: JSON.stringify([30, 40, 50]),
    tenorOptions: JSON.stringify([1, 2, 3, 4, 5, 6, 7]),
    installments: JSON.stringify({ 30: { 1: 15.293, 2: 8.701, 3: 6.500, 4: 5.402, 5: 4.746, 6: 4.308, 7: 3.997 }, 40: { 1: 13.108, 2: 7.458, 3: 5.575, 4: 4.633, 5: 4.068, 6: 3.691, 7: 3.423 }, 50: { 1: 10.923, 2: 6.215, 3: 4.649, 4: 3.864, 5: 3.390, 6: 3.075, 7: 2.848 } }),
    isFeatured: false,
  },
  {
    name: "Rumah Manjah Beureum Premium",
    slug: "rumah-manjah-beureum-premium",
    type: "50/120",
    category: "inden",
    price: 650,
    location: "Bandung Raya Residence",
    images: JSON.stringify(["/images/properties/manjah.png", "/images/properties/manjah_detail.png"]),
    tag: "Premium",
    bedrooms: 3, bathrooms: 2,
    installment: "Mulai 9,7 jt/bln",
    features: JSON.stringify(["Carport 2 Mobil", "Taman Luas", "Ruang Keluarga", "Dapur Bersih & Kotor"]),
    dpOptions: JSON.stringify([30, 35, 40, 45, 50]),
    tenorOptions: JSON.stringify([1, 2, 3, 4, 5]),
    installments: JSON.stringify({ 30: { 1: 45.5, 2: 25.9, 3: 19.4, 4: 16.2, 5: 14.2 }, 35: { 1: 42.2, 2: 24.0, 3: 18.0, 4: 15.0, 5: 13.1 }, 40: { 1: 39.0, 2: 22.2, 3: 16.6, 4: 13.8, 5: 12.1 }, 45: { 1: 35.7, 2: 20.3, 3: 15.2, 4: 12.7, 5: 11.1 }, 50: { 1: 32.5, 2: 18.5, 3: 13.8, 4: 11.5, 5: 10.1 } }),
    isFeatured: true,
  },
  {
    name: "Tipe 45 Kav R5",
    slug: "tipe-45-kav-r5",
    type: "45/90",
    category: "inden",
    price: 485,
    location: "Bandung Raya Residence",
    images: JSON.stringify(["/images/properties/type45.png", "/images/properties/type45_detail.png"]),
    tag: "Baru",
    bedrooms: 2, bathrooms: 1,
    installment: "Mulai 7,2 jt/bln",
    features: JSON.stringify(["Carport", "Taman", "Ruang Tamu Luas", "Listrik Token"]),
    dpOptions: JSON.stringify([30, 35, 40, 45, 50]),
    tenorOptions: JSON.stringify([1, 2, 3, 4, 5]),
    installments: JSON.stringify({ 30: { 1: 33.9, 2: 19.3, 3: 14.5, 4: 12.1, 5: 10.6 }, 35: { 1: 31.5, 2: 17.9, 3: 13.4, 4: 11.2, 5: 9.8 }, 40: { 1: 29.1, 2: 16.5, 3: 12.4, 4: 10.3, 5: 9.0 }, 45: { 1: 26.7, 2: 15.2, 3: 11.4, 4: 9.5, 5: 8.3 }, 50: { 1: 24.3, 2: 13.8, 3: 10.4, 4: 8.6, 5: 7.6 } }),
    isFeatured: false,
  },
  {
    name: "Sentul Kav D35",
    slug: "sentul-kav-d35",
    type: "36/72",
    category: "kavling",
    price: 295,
    location: "Sentul",
    images: JSON.stringify(["/images/properties/sentul_d33.png", "/images/properties/sentul_d33_detail.png"]),
    tag: "Diskon",
    bedrooms: 2, bathrooms: 1,
    installment: "Mulai 4,4 jt/bln",
    features: JSON.stringify(["Carport", "Taman", "One Gate System", "CCTV"]),
    dpOptions: JSON.stringify([30, 35, 40, 45, 50]),
    tenorOptions: JSON.stringify([1, 2, 3, 4, 5]),
    installments: JSON.stringify({ 30: { 1: 19.9, 2: 11.3, 3: 8.5, 4: 7.1, 5: 6.2 }, 35: { 1: 18.5, 2: 10.5, 3: 7.9, 4: 6.6, 5: 5.7 }, 40: { 1: 17.0, 2: 9.7, 3: 7.2, 4: 6.0, 5: 5.3 }, 45: { 1: 15.6, 2: 8.9, 3: 6.6, 4: 5.5, 5: 4.8 }, 50: { 1: 14.2, 2: 8.1, 3: 6.1, 4: 5.1, 5: 4.4 } }),
    isFeatured: false,
  },
];

async function main() {
  console.log("Seeding Bandung Raya Residence...\n");

  // ── 1. Admin User ──
  const email = "admin@brr.co.id";
  const password = "admin123";

  const existingAdmin = await db.admin.findUnique({ where: { email } });
  if (existingAdmin) {
    console.log("[OK] Admin sudah ada:", existingAdmin.email);
  } else {
    const hashedPassword = await hash(password, 12);
    await db.admin.create({
      data: { name: "Admin BRR", email, password: hashedPassword, role: "superadmin" },
    });
    console.log("[OK] Admin dibuat!");
    console.log("   Email   :", email);
    console.log("   Password:", password);
  }

  // ── 2. Testimonials (20 data) ──
  const testimonialCount = await db.testimonial.count();
  if (testimonialCount > 0) {
    console.log(`[OK] Testimoni sudah ada (${testimonialCount}), skip.`);
  } else {
    for (const t of TESTIMONIALS_DATA) {
      await db.testimonial.create({
        data: {
          name: t.name,
          role: t.role,
          text: t.text,
          rating: t.rating,
          featured: t.rating === 5,
        },
      });
    }
    console.log("[OK] 20 testimoni berhasil dibuat!");
  }

  // ── 3. Properties (12 data) ──
  const propertyCount = await db.property.count();
  if (propertyCount > 0) {
    console.log(`[OK] Properti sudah ada (${propertyCount}), skip.`);
  } else {
    for (const p of PROPERTIES_DATA) {
      await db.property.create({ data: p });
    }
    console.log(`[OK] ${PROPERTIES_DATA.length} properti berhasil dibuat!`);
  }

  // ── 4. Blog Posts (6 sample articles) ──
  const blogCount = await db.blogPost.count();
  if (blogCount > 0) {
    console.log(`[OK] Blog sudah ada (${blogCount}), skip.`);
  } else {
    const BLOGS_DATA = [
      {
        title: "Panduan Lengkap KPR Syariah untuk Pemula",
        slug: "panduan-lengkap-kpr-syariah-untuk-pemula",
        excerpt: "KPR syariah menjadi pilihan semakin banyak orang karena bebas riba dan cicilan tetap. Simak panduan lengkapnya di artikel ini.",
        content: "<h2>Apa Itu KPR Syariah?</h2><p>KPR syariah adalah skema pembiayaan rumah berbasis prinsip syariah Islam yang bebas dari riba. Berbeda dengan KPR konvensional yang menggunakan bunga floating, KPR syariah menggunakan <strong>margin tetap</strong> sehingga cicilan bulanan Anda tidak berubah-ubah selama tenor.</p><h2>Keuntungan KPR Syariah</h2><ul><li><strong>Bebas Riba</strong> — Sesuai dengan prinsip Islam</li><li><strong>Cicilan Tetap</strong> — Tidak naik walaupun suku bunga naik</li><li><strong>Proses Cepat</strong> — Akad bisa dalam 2 minggu</li><li><strong>DP Fleksibel</strong> — Bisa dicicil hingga 6 bulan</li><li><strong>Sertifikat SHM</strong> — Sudah pecah per unit</li></ul><h2>Cara Mengajukan KPR Syariah di BRR</h2><p>Proses pengajuan KPR syariah di Bandung Raya Residence sangat mudah:</p><ol><li>Pilih unit rumah yang diinginkan</li><li>Booking fee sebesar Rp 3.000.000</li><li>Proses verifikasi dokumen (KTP, KK, slip gaji)</li><li>Akad kredit di hadapan notaris</li><li>Serah terima kunci rumah</li></ol><blockquote>Penting: Pastikan semua dokumen lengkap untuk mempercepat proses akad. Tim marketing BRR siap membantu Anda.</blockquote><p>Tertarik? <strong>Hubungi marketing kami sekarang</strong> untuk konsultasi gratis!</p>",
        category: "Panduan",
        author: "Admin BRR",
        published: true,
        readTime: "5 menit",
      },
      {
        title: "Tips Memilih Lokasi Rumah yang Strategis di Bandung",
        slug: "tips-memilih-lokasi-rumah-strategis-bandung",
        excerpt: "Lokasi adalah faktor utama dalam investasi properti. Pelajari cara memilih lokasi rumah yang tepat di kawasan Bandung.",
        content: "<h2>Mengapa Lokasi Sangat Penting?</h2><p>Dalam dunia properti, ada istilah <em>location, location, location</em>. Lokasi menentukan 70% nilai investasi rumah Anda. Rumah di lokasi strategis akan terus mengalami kenaikan harga.</p><h2>Faktor yang Perlu Dipertimbangkan</h2><ul><li><strong>Akses Tol</strong> — Kemudahan akses ke jalan tol mempercepat mobilitas</li><li><strong>Dekat Fasilitas Umum</strong> — Sekolah, rumah sakit, pusat perbelanjaan</li><li><strong>Keamanan</strong> — Lingkungan aman dengan sistem keamanan 24 jam</li><li><strong>Infrastruktur</strong> — Jalan lebar, drainase baik, listrik underground</li><li><strong>Potensi Kenaikan Harga</strong> — Area yang sedang berkembang</li></ul><h2>Kawasan Bandung Raya Residence</h2><p>Bandung Raya Residence terletak di lokasi yang sangat strategis. Hanya <strong>15 menit dari pusat kota Bandung</strong> dengan akses langsung ke jalan tol. Kawasan ini dilengkapi:</p><ul><li>Masjid untuk ibadah</li><li>Taman bermain anak</li><li>Lapangan olahraga</li><li>One gate system dengan keamanan 24 jam</li></ul><p>Investasi di Bandung Raya Residence adalah pilihan cerdas untuk masa depan keluarga Anda.</p>",
        category: "Tips",
        author: "Admin BRR",
        published: true,
        readTime: "4 menit",
      },
      {
        title: "Perbandingan KPR Syariah vs KPR Konvensional",
        slug: "perbandingan-kpr-syariah-vs-konvensional",
        excerpt: "Bingung pilih KPR syariah atau konvensional? Simak perbandingan lengkap kedua skema ini untuk membantu keputusan Anda.",
        content: "<h2>KPR Syariah</h2><p>KPR syariah menggunakan akad murabahah (jual beli) dengan margin tetap. Cicilan bulanan Anda <strong>tidak akan berubah</strong> selama tenor pembiayaan.</p><ul><li>Bunga: Tidak ada (margin tetap)</li><li>Cicilan: Flat/tetap</li><li>Asuransi: Wajib (jiwa & kebakaran)</li><li>Denda: Tidak ada denda keterlambatan</li><li>DP Minimum: 10-30%</li></ul><h2>KPR Konvensional</h2><p>KPR konvensional menggunakan sistem bunga floating yang bisa berubah sewaktu-waktu mengikuti kebijakan Bank Indonesia.</p><ul><li>Bunga: Floating (berubah-ubah)</li><li>Cicilan: Bisa naik/turun</li><li>Asuransi: Wajib</li><li>Denda: Ada denda keterlambatan</li><li>DP Minimum: 10-20%</li></ul><h2>Kesimpulan</h2><p>Jika Anda menginginkan <strong>kepastian cicilan</strong> dan ingin bertransaksi sesuai prinsip Islam, KPR syariah adalah pilihan yang tepat. Bandung Raya Residence bekerja sama dengan berbagai bank syariah terkemuka untuk kemudahan Anda.</p>",
        category: "Keuangan",
        author: "Admin BRR",
        published: true,
        readTime: "5 menit",
      },
      {
        title: "Keunggulan Investasi Properti di Era Inflasi",
        slug: "keunggulan-investasi-properti-era-inflasi",
        excerpt: "Properti terbukti menjadi instrumen investasi yang paling tahan terhadap inflasi. Ketahui mengapa properti harus jadi pilihan Anda.",
        content: "<h2>Mengapa Properti?</h2><p>Data menunjukkan harga properti di Indonesia rata-rata naik <strong>10-15% per tahun</strong>, jauh melampaui tingkat inflasi. Ini menjadikan properti sebagai lindung nilai terbaik.</p><h2>Keunggulan Investasi Rumah</h2><ul><li><strong>Pendapatan Pasif</strong> — Rumah bisa disewakan untuk penghasilan bulanan</li><li><strong>Kenaikan Harga</strong> — Nilai properti terus meningkat seiring waktu</li><li><strong>Leverage</strong> — Bisa beli dengan DP, sisanya dicicil</li><li><strong>Aman</strong> — Tidak volatile seperti saham atau crypto</li><li><strong>Kebutuhan Primer</strong> — Setiap orang butuh tempat tinggal</li></ul><h2>Hitung-Hitungan Investasi</h2><p>Contoh: Rumah tipe 45/90 senilai Rp 485 juta dengan DP 30% (Rp 145,5 juta) dan cicilan Rp 10,6 juta/bulan. Dalam 5 tahun, harga rumah bisa naik ke Rp 700-800 juta. <strong>Keuntungan Rp 200-300 juta!</strong></p><blockquote>Investasi terbaik adalah yang Anda mulai sekarang. Jangan tunggu sampai harga naik lagi!</blockquote>",
        category: "Investasi",
        author: "Admin BRR",
        published: true,
        readTime: "4 menit",
      },
      {
        title: "Cara DP Rumah Dicicil 6 Bulan di Bandung Raya Residence",
        slug: "cara-dp-rumah-dicicil-6-bulan",
        excerpt: "Punya budget terbatas? Di BRR, DP bisa dicicil hingga 6 bulan! Ini cara lengkapnya agar Anda bisa segera punya rumah.",
        content: "<h2>Program DP Cicilan 6 Bulan</h2><p>Bandung Raya Residence memahami bahwa menyiapkan DP rumah tidak mudah. Oleh karena itu, kami menyediakan program <strong>DP dicicil 6 bulan</strong> agar Anda bisa segera memiliki rumah impian.</p><h2>Mekanisme Program</h2><ol><li><strong>Booking Fee</strong> — Bayar Rp 3.000.000 untuk mengunci unit</li><li><strong>DP Cicilan</strong> — Bayar DP dalam 6 bulan tanpa bunga</li><li><strong>Akad</strong> — Setelah DP lunas, proses akad dengan bank syariah</li><li><strong>Serah Terima</strong> — Kunci rumah bisa langsung diterima</li></ol><h2>Contoh Perhitungan</h2><p>Untuk rumah tipe 36/78 seharga Rp 425 juta dengan DP 30%:</p><ul><li>Total DP: Rp 127.500.000</li><li>Cicilan DP/bulan: Rp 21.250.000 (6 bulan)</li><li>Setelah DP lunas: Cicilan rumah mulai Rp 6,3 juta/bulan</li></ul><p>Dengan program ini, gaji UMR pun bisa punya rumah! <strong>Hubungi marketing kami sekarang</strong> untuk informasi lebih lanjut.</p>",
        category: "Syariah",
        author: "Admin BRR",
        published: true,
        readTime: "3 menit",
      },
      {
        title: "Fasilitas Lengkap di Perumahan Modern: Apa Saja yang Harus Ada?",
        slug: "fasilitas-lengkap-perumahan-modern",
        excerpt: "Perumahan modern tidak hanya soal rumah, tapi juga lingkungan. Ini daftar fasilitas yang wajib ada di perumahan idaman.",
        content: "<h2>Fasilitas Wajib Perumahan Modern</h2><p>Memilih perumahan bukan hanya soal rumahnya, tapi juga lingkungan dan fasilitas pendukungnya. Berikut fasilitas yang harus ada di perumahan modern:</p><h3>1. Keamanan 24 Jam</h3><p>One gate system dengan CCTV dan security patroli memberikan rasa aman untuk seluruh penghuni.</p><h3>2. Taman & Ruang Terbuka Hijau</h3><p>Taman bermain anak dan ruang terbuka hijau (RTH) minimal 30% dari total luas kawasan.</p><h3>3. Masjid</h3><p>Fasilitas ibadah di dalam kawasan memudahkan penghuni untuk beribadah tanpa perlu keluar perumahan.</p><h3>4. Infrastruktur Modern</h3><ul><li>Listrik underground (tidak ada kabel di udara)</li><li>Air bersih 24 jam</li><li>Jalan lebar (minimal 6 meter)</li><li>Drainase tertata rapi</li></ul><h3>5. Fasilitas Olahraga</h3><p>Lapangan futsal, basket, atau jogging track untuk mendukung gaya hidup sehat penghuni.</p><h2>Bandung Raya Residence</h2><p>Semua fasilitas di atas tersedia lengkap di Bandung Raya Residence. Kami berkomitmen memberikan <strong>lingkungan terbaik</strong> untuk keluarga Indonesia.</p>",
        category: "Tips",
        author: "Admin BRR",
        published: true,
        readTime: "4 menit",
      },
    ];

    for (const blog of BLOGS_DATA) {
      await db.blogPost.create({ data: blog });
    }
    console.log(`[OK] ${BLOGS_DATA.length} blog berhasil dibuat!`);
  }

  console.log("\nSeeding selesai!");
}

main()
  .catch((e) => { console.error("Error:", e); process.exit(1); })
  .finally(() => db.$disconnect());
