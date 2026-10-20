export interface SukuBudaya {
  id: string;
  nama: string;
  provinsi: string;
  pulau: 'Sumatra' | 'Jawa' | 'Kalimantan' | 'Sulawesi' | 'Bali & Nusa Tenggara' | 'Maluku & Papua';
  warna: string;
  warnaMuda: string;
  borderWarna: string;
  salamKhas: string;
  maknaSalam: string;
  pakaian: {
    nama: string;
    pria: string;
    wanita: string;
    detail: string;
    emoji: string;
  };
  kuliner: {
    nama: string;
    bahan: string;
    detail: string;
    emoji: string;
  };
  budaya: {
    nama: string;
    jenis: string;
    detail: string;
    emoji: string;
  };
  fakta: string;
  penjelasanLengkap: string;
  rumahAdat?: string;
}

export interface KuisSoal {
  id: string;
  gambar: string; // Simbol atau nama ikon
  kategori: 'Pakaian' | 'Kuliner' | 'Kesenian' | 'Tradisi';
  emoji: string;
  benar: string;
  pilihanLain: string[];
  penjelasan: string;
  sukuTerkait: string;
}

export const DATA_SUKU: Record<string, SukuBudaya> = {
  "Betawi": {
    id: "betawi",
    nama: "Betawi",
    provinsi: "DKI Jakarta",
    pulau: "Jawa",
    warna: "#E53935",
    warnaMuda: "#FFEBEE",
    borderWarna: "#EF5350",
    salamKhas: "Kite sodare!",
    maknaSalam: "Kita semua bersaudara!",
    pakaian: {
      nama: "Baju Sadariah & Kebaya Encim",
      pria: "Baju Sadariah + Peci hitam + Cukin (kain sarung leher)",
      wanita: "Kebaya Encim warna cerah + Kain batik betawi",
      detail: "Baju Sadariah berkerah Shanghai dipadukan celana batik gombrang. Kebaya Encim berhias bordir anggun nan ceria.",
      emoji: "👘"
    },
    kuliner: {
      nama: "Kerak Telor",
      bahan: "Beras ketan putih, telur bebek/ayam, ebi sangrai, dan serundeng gurih pedas manis",
      detail: "Dimasak di atas wajan tanpa minyak dan dibalik langsung di atas bara api arang hingga renyah!",
      emoji: "🍳"
    },
    budaya: {
      nama: "Ondel-ondel",
      jenis: "Boneka raksasa untuk pawai pesta rakyat",
      detail: "Tinggi sekitar 2,5 meter dengan anyaman bambu. Ondel-ondel laki-laki berwajah merah, perempuan berwajah putih manis.",
      emoji: "🎭"
    },
    fakta: "Ondel-ondel dulu digunakan untuk mengusir roh jahat!",
    penjelasanLengkap: "Masyarakat Betawi memiliki jiwa persaudaraan tinggi, suka bermusyawarah, dan memiliki seni bertutur pantun yang jenaka dan sarat petuah bijak.",
    rumahAdat: "Rumah Kebaya"
  },
  "Bugis/Makassar": {
    id: "bugis-makassar",
    nama: "Bugis / Makassar",
    provinsi: "Sulawesi Selatan",
    pulau: "Sulawesi",
    warna: "#F59E0B",
    warnaMuda: "#FEF3C7",
    borderWarna: "#FBBF24",
    salamKhas: "Aga kareba?",
    maknaSalam: "Apa kabar saudaraku?",
    pakaian: {
      nama: "Baju Bodo & Jas Tutu",
      pria: "Jas Tutu + Celana panjang + Sarung Sabbe sutera + Songkok Recca (Songkok Guru)",
      wanita: "Baju Bodo (baju kurung longgar dari kain kasa/organza tipis)",
      detail: "Baju Bodo dihiasi benang emas dan warnanya memiliki makna status usia dan kebangsawanan.",
      emoji: "✨"
    },
    kuliner: {
      nama: "Coto Makassar",
      bahan: "Daging sapi & jeroan segar dengan kuah kaldu rempah dan kacang tanah sangrai halus",
      detail: "Disajikan hangat bersama ketupat daun pandan atau buras yang pulen dan sambal tauco khas.",
      emoji: "🍲"
    },
    budaya: {
      nama: "Baju Bodo & Seni Maritim Pinisi",
      jenis: "Warisan tekstil tertua dan tradisi pelaut tangguh",
      detail: "Baju Bodo adalah salah satu pakaian adat tertua di Indonesia. Suku Bugis-Makassar juga pembuat kapal Pinisi penakluk samudera.",
      emoji: "⛵"
    },
    fakta: "Baju Bodo sudah ada sejak abad ke-9, menjadikannya salah satu busana tertua!",
    penjelasanLengkap: "Suku Bugis dan Makassar terkenal berani, menjunjung prinsip Siri' Na Pacce (kehormatan dan solidaritas), serta pelaut ulung dunia.",
    rumahAdat: "Rumah Balla / Saoraja"
  },
  "Melayu Riau": {
    id: "melayu-riau",
    nama: "Melayu Riau",
    provinsi: "Riau",
    pulau: "Sumatra",
    warna: "#16A34A",
    warnaMuda: "#DCFCE7",
    borderWarna: "#4ADE80",
    salamKhas: "Salam sejahtera!",
    maknaSalam: "Semoga damai dan selamat menyertai",
    pakaian: {
      nama: "Baju Kurung Cekak Musang & Kebaya Laboh",
      pria: "Baju Kurung Cekak Musang berkerah tegak + Songkok + Kain Samping tenun Siak",
      wanita: "Baju Kurung Kebaya Laboh panjang hingga ke bawah lutut nan sopan",
      detail: "Mengutamakan kesopanan dan keanggunan, sering disandingkan dengan kain tenun songket motif pucuk rebung.",
      emoji: "🌿"
    },
    kuliner: {
      nama: "Asam Pedas Patin & Gulai Melayu",
      bahan: "Ikan patin segar dengan kuah cabai merah, belimbing wuluh, asam kandis, dan daun kesum",
      detail: "Rasa kuahnya menyegarkan perpaduan asam, pedas membakar, dan harum rempah tropis.",
      emoji: "🐟"
    },
    budaya: {
      nama: "Candi Muara Takus & Istana Siak",
      jenis: "Warisan arsitektur dan seni pantun Melayu",
      detail: "Pusat peradaban Melayu yang kaya karya sastra Gurindam Dua Belas karya Raja Ali Haji dan seni berbalas pantun.",
      emoji: "🏰"
    },
    fakta: "Masyarakat Melayu sangat menjunjung tinggi adat resam (tata krama dan kesantunan bicara)!",
    penjelasanLengkap: "Bahasa Melayu Riau merupakan salah satu cikal bakal utama Bahasa Indonesia yang menyatukan bangsa.",
    rumahAdat: "Rumah Selaso Jatuh Kembar"
  },
  "Rote": {
    id: "rote",
    nama: "Rote",
    provinsi: "Nusa Tenggara Timur",
    pulau: "Bali & Nusa Tenggara",
    warna: "#8D6E63",
    warnaMuda: "#EFEBE9",
    borderWarna: "#A1887F",
    salamKhas: "Nai basan!",
    maknaSalam: "Selamat datang penuh kehangatan",
    pakaian: {
      nama: "Kain Tenun Ikat Rote & Topi Ti'i Langga",
      pria: "Kain Tenun Rote + Topi Ti'i Langga berbentuk tanduk khas dari daun lontar",
      wanita: "Kain sarung tenun ikat Rote bermotif geometris indah + Hiasan kepala Bula Molik",
      detail: "Topi Ti'i Langga memiliki antena tegak yang melambangkan kepemimpinan dan kewibawaan pria Rote.",
      emoji: "👒"
    },
    kuliner: {
      nama: "Kena Keta & Olahan Jagung Bose",
      bahan: "Jagung manis ditumbuk, kacang tanah, santan kelapa, dan ubi rebus gurih",
      detail: "Makanan pokok kaya serat dan sumber energi masyarakat pulau Rote yang menyehatkan.",
      emoji: "🌽"
    },
    budaya: {
      nama: "Alat Musik Sasando",
      jenis: "Alat musik petik berdawai dari daun lontar",
      detail: "Bentuknya seperti wadah daun lontar melengkung yang menghasilkan resonansi suara dawai mirip harpa yang merdu.",
      emoji: "🎵"
    },
    fakta: "Sasando hanya bisa dimainkan dengan baik setelah berlatih bertahun-tahun dengan ketelitian tinggi!",
    penjelasanLengkap: "Pulau Rote adalah pulau paling selatan Indonesia. Masyarakatnya hidup harmonis dengan pohon lontar (pohon kehidupan).",
    rumahAdat: "Rumah Uma Kebubu / Musalaki"
  },
  "Ambon": {
    id: "ambon",
    nama: "Ambon",
    provinsi: "Maluku",
    pulau: "Maluku & Papua",
    warna: "#0284C7",
    warnaMuda: "#E0F2FE",
    borderWarna: "#38BDF8",
    salamKhas: "Tabea!",
    maknaSalam: "Hormat dan salam persaudaraan manis",
    pakaian: {
      nama: "Baju Cele & Kain Salele",
      pria: "Kemeja kerah berdiri + Jas putih atau merah dipadu celana pantalon",
      wanita: "Baju Cele bermotif kotak-kotak kecil warna merah terang dipadu kain sarung tenun",
      detail: "Baju Cele sering dipakai saat pesta panen pala-cengkih, upacara pelantikan raja negeri, dan syukuran.",
      emoji: "🌺"
    },
    kuliner: {
      nama: "Ikan Bakar Colo-colo & Papeda",
      bahan: "Ikan cakalang segar dibakar, disiram sambal colo-colo tomat asam pedas dan sagu papeda",
      detail: "Papeda kenyal diseruput bersama kuah kuning rempah kunyit dan perasan jeruk nipis segar.",
      emoji: "🐟"
    },
    budaya: {
      nama: "Alat Musik Tifa & Tari Cakalele",
      jenis: "Instrumen perkusi ritmik dan tarian perang",
      detail: "Tari Cakalele dibawakan dengan parang dan salawaku (perisai kayu) penuh semangat membela kehormatan tanah air.",
      emoji: "🥁"
    },
    fakta: "Tifa sering dimainkan saat upacara adat, penyambutan tamu terhormat, dan pesta rakyat Maluku!",
    penjelasanLengkap: "Kota Ambon dijuluki 'Ambon Manise' dan telah diakui UNESCO sebagai Kota Musik Dunia berkat bakat vokal dan musikal masyarakatnya yang luar biasa.",
    rumahAdat: "Rumah Baileo"
  },
  "Minangkabau": {
    id: "minangkabau",
    nama: "Minangkabau",
    provinsi: "Sumatera Barat",
    pulau: "Sumatra",
    warna: "#B91C1C",
    warnaMuda: "#FEE2E2",
    borderWarna: "#F87171",
    salamKhas: "Salamaik pagi dunsanak!",
    maknaSalam: "Selamat datang saudaraku tercinta!",
    pakaian: {
      nama: "Baju Limpapeh Rumah Nan Gadang",
      pria: "Baju Deta + Saluak penghulu + Sasampiang",
      wanita: "Baju Kurung beludru merah + Mahkota kepala Suntiang megah berlapis emas",
      detail: "Suntiang emas di kepala pengantin wanita melambangkan beban tanggung jawab dan kemuliaan seorang ibu.",
      emoji: "👑"
    },
    kuliner: {
      nama: "Rendang Daging",
      bahan: "Daging sapi pilihan direbus santan kelapa murni dan rempah giling selama berjam-jam hingga hitam pekat",
      detail: "Dikenal sebagai salah satu makanan terlezat di dunia dengan rempah lengkuas, serai, dan cabai.",
      emoji: "🥩"
    },
    budaya: {
      nama: "Tari Piring & Rumah Gadang",
      jenis: "Tarian akrobatik piring di atas pecahan kaca & Arsitektur tanduk kerbau",
      detail: "Penari mengayunkan dua piring di telapak tangan tanpa terjatuh sambil menginjak pecahan kaca dengan aman.",
      emoji: "🍽️"
    },
    fakta: "Atap Rumah Gadang yang melengkung runcing seperti tanduk kerbau disebut Gonjong!",
    penjelasanLengkap: "Minangkabau menganut sistem matrilineal (garis keturunan ibu) terbesar di dunia dengan filosofi Adat Basandi Syarak, Syarak Basandi Kitabullah.",
    rumahAdat: "Rumah Gadang"
  },
  "Jawa": {
    id: "jawa",
    nama: "Jawa",
    provinsi: "Jawa Tengah & DI Yogyakarta",
    pulau: "Jawa",
    warna: "#7C3AED",
    warnaMuda: "#EDE9FE",
    borderWarna: "#A78BFA",
    salamKhas: "Sugeng rawuh!",
    maknaSalam: "Selamat datang dengan hati yang gembira",
    pakaian: {
      nama: "Beskap & Kebaya Jawa",
      pria: "Beskap / Surjan lurik + Blangkon motif ksatria + Keris terselip di punggung",
      wanita: "Kebaya kutubaru + Kain jarik batik tulis prada + Sanggul ayu",
      detail: "Busana tradisional Jawa melambangkan keselarasan, ketenangan batin, dan kehalusan budi pekerti.",
      emoji: "🌸"
    },
    kuliner: {
      nama: "Gudeg Komplit Jogja",
      bahan: "Nangka muda dimasak santan dan gula aren berjam-jam bersama telur pindang dan krecek pedas",
      detail: "Rasa manis gurih legendaris yang disajikan di atas pincuk daun pisang wangi.",
      emoji: "🍲"
    },
    budaya: {
      nama: "Wayang Kulit & Gamelan",
      jenis: "Seni pertunjukan bayangan kulit kerbau dan orkes tabuh perunggu",
      detail: "Dimainkan oleh Ki Dalang semalam suntuk menyuarakan kisah kepahlawanan Mahabharata dan Ramayana.",
      emoji: "🎎"
    },
    fakta: "Gamelan dan Wayang Kulit telah diakui UNESCO sebagai Warisan Budaya Takbenda Dunia!",
    penjelasanLengkap: "Masyarakat Jawa sangat mengutamakan prinsip 'tepa slira' (tenggang rasa) dan 'gotong royong' dalam bermasyarakat.",
    rumahAdat: "Rumah Joglo"
  },
  "Bali": {
    id: "bali",
    nama: "Bali",
    provinsi: "Bali",
    pulau: "Bali & Nusa Tenggara",
    warna: "#EA580C",
    warnaMuda: "#FFEDD5",
    borderWarna: "#FB923C",
    salamKhas: "Om Swastyastu!",
    maknaSalam: "Semoga dalam keadaan selamat dan bahagia atas anugerah Yang Maha Kuasa",
    pakaian: {
      nama: "Payas Agung & Safari Kamen",
      pria: "Baju Safari putih + Kamen sarung + Selendang Saput + Udeng ikat kepala",
      wanita: "Kebaya Bali brokat warna cerah + Selendang senteng + Bunga kamboja di telinga",
      detail: "Udeng ikat kepala pria dilipat mengarah ke atas sebagai simbol pemikiran suci menuju Tuhan.",
      emoji: "🌺"
    },
    kuliner: {
      nama: "Ayam Betutu & Sate Lilit",
      bahan: "Daging ayam utuh dibumbui base genep (15 jenis rempah) lalu dibungkus daun pinang dan dipanggang",
      detail: "Aroma wangi rempah meresap sampai ke tulang dengan cita rasa pedas gurih khas dewata.",
      emoji: "🍗"
    },
    budaya: {
      nama: "Tari Kecak & Upacara Ogoh-ogoh",
      jenis: "Tarian paduan suara puluhan pria melingkar 'Cak-cak-cak' & Patung raksasa",
      detail: "Tari Kecak menceritakan pembebasan Dewi Sita dengan latar matahari terbenam spektakuler di Pura Uluwatu.",
      emoji: "🔥"
    },
    fakta: "Tari Kecak tidak menggunakan alat musik tabuh sama sekali, melainkan suara paduan mulut 'cak-cak' dari 70 penari!",
    penjelasanLengkap: "Pulau Bali terkenal dengan falsafah Tri Hita Karana (hubungan harmonis antara manusia dengan Tuhan, sesama manusia, dan alam).",
    rumahAdat: "Rumah Gapura Candi Bentar"
  },
  "Dayak": {
    id: "dayak",
    nama: "Dayak",
    provinsi: "Kalimantan Barat & Tengah",
    pulau: "Kalimantan",
    warna: "#0D9488",
    warnaMuda: "#CCFBF1",
    borderWarna: "#2DD4BF",
    salamKhas: "Adil Ka' Talino, Bacuramin Ka' Saruga!",
    maknaSalam: "Adil kepada sesama manusia, bercermin ke surga!",
    pakaian: {
      nama: "Baju Ta'a & Sapei Sapaq",
      pria: "Rompi Sapei Sapaq dari serat kayu/kain beludru + Ikat kepala bulu burung enggang",
      wanita: "Baju Ta'a dihiasi manik-manik warna-warni motif flora & fauna hutan rimba",
      detail: "Bulu burung enggang melambangkan kesetiaan, kebijaksanaan, dan perlindungan bagi keluarga Dayak.",
      emoji: "🦅"
    },
    kuliner: {
      nama: "Juhu Singkah & Lemang Bambu",
      bahan: "Umbut rotan muda empuk dimasak bersama santan, ikan baung, dan rempah kunyit harum",
      detail: "Cita rasa sedikit pahit manis menyegarkan yang dipercaya menyehatkan tubuh.",
      emoji: "🎋"
    },
    budaya: {
      nama: "Alat Musik Sape & Tari Mandau",
      jenis: "Gitar petik kayu khas Dayak dan tarian keberanian",
      detail: "Sape terbuat dari kayu adau berukir indah, menghasilkan alunan nada magis menenangkan yang meniru suara air sungai dan burung.",
      emoji: "🎸"
    },
    fakta: "Alat musik Sape memiliki bentuk unik menyerupai perahu kecil dan suaranya sangat damai menenangkan!",
    penjelasanLengkap: "Suku Dayak sangat mencintai dan menjaga hutan Kalimantan ('Paru-paru Dunia') sebagai ibu bumi yang memberi kehidupan.",
    rumahAdat: "Rumah Betang (Rumah Panjang)"
  },
  "Papua / Asmat": {
    id: "papua-asmat",
    nama: "Papua / Asmat",
    provinsi: "Papua Selatan",
    pulau: "Maluku & Papua",
    warna: "#BE185D",
    warnaMuda: "#FCE7F3",
    borderWarna: "#F472B6",
    salamKhas: "Amolongo!",
    maknaSalam: "Salam sejahtera dan damai bersamamu kawan!",
    pakaian: {
      nama: "Rok Rumbai & Hiasan Cendrawasih",
      pria: "Kain penutup tradisional / Koteka dengan lukisan tubuh dari kapur putih & oker merah",
      wanita: "Rok Rumbai dari anyaman daun sagu kering yang dirajut lembut dan indah",
      detail: "Mahkota kepala dari bulu kasuari dan cendrawasih melambangkan kedekatan manusia dengan alam semesta.",
      emoji: "🌿"
    },
    kuliner: {
      nama: "Papeda Ikan Kuah Kuning",
      bahan: "Tepung sagu segar disiram air mendidih hingga transparan kenyal, dinikmati bersama kuah ikan kuning",
      detail: "Dimakan dengan sumpit kayu berbentuk garpu melingkar (gata-gata) langsung diseruput lezat.",
      emoji: "🍲"
    },
    budaya: {
      nama: "Seni Ukir Asmat & Tari Musyoh",
      jenis: "Ukiran kayu kelas dunia bernilai spiritual dan tarian penghormatan arwah leluhur",
      detail: "Ukiran Asmat dipahat langsung tanpa sketsa kasar pada kayu besi oleh para pemahat ahli (wow-ipits).",
      emoji: "🗿"
    },
    fakta: "Ukiran kayu suku Asmat begitu mendunia hingga dikoleksi di museum-museum seni bergengsi New York dan Paris!",
    penjelasanLengkap: "Masyarakat Papua memiliki rasa persatuan yang sangat erat, menghormati tanah adat dan menjaga kearifan hutan rimba pegunungan.",
    rumahAdat: "Rumah Honai & Rumah Jew"
  }
};

export const KUIS_DATA: KuisSoal[] = [
  // 8 Soal Asli dari Python Tkinter
  {
    id: "soal-1",
    gambar: "Ondel-ondel",
    kategori: "Kesenian",
    emoji: "🎭",
    benar: "Boneka raksasa khas Betawi",
    pilihanLain: [
      "Topi dari daun lontar khas Rote",
      "Pakaian adat wanita Bugis yang longgar",
      "Tarian perang khas Maluku"
    ],
    penjelasan: "Ondel-ondel adalah boneka raksasa setinggi 2,5 meter khas Betawi yang biasanya diarak berpasangan saat pesta rakyat Jakarta!",
    sukuTerkait: "Betawi"
  },
  {
    id: "soal-2",
    gambar: "Baju Bodo",
    kategori: "Pakaian",
    emoji: "✨",
    benar: "Pakaian adat wanita Bugis yang longgar",
    pilihanLain: [
      "Pakaian adat bermotif kotak khas Ambon",
      "Boneka raksasa khas Betawi",
      "Alat musik petik dari daun lontar khas Rote"
    ],
    penjelasan: "Baju Bodo adalah busana khas wanita suku Bugis/Makassar yang longgar berbentuk segi empat dan sudah ada sejak abad ke-9!",
    sukuTerkait: "Bugis/Makassar"
  },
  {
    id: "soal-3",
    gambar: "Topi Ti'i Langga",
    kategori: "Pakaian",
    emoji: "👒",
    benar: "Topi dari daun lontar khas Rote",
    pilihanLain: [
      "Pakaian adat bermotif kotak khas Ambon",
      "Sup daging khas Makassar",
      "Boneka raksasa khas Betawi"
    ],
    penjelasan: "Ti'i Langga adalah topi tradisional pria suku Rote (NTT) berbahan anyaman daun lontar dengan bagian antena menjulang gagah!",
    sukuTerkait: "Rote"
  },
  {
    id: "soal-4",
    gambar: "Coto Makassar",
    kategori: "Kuliner",
    emoji: "🍲",
    benar: "Sup daging khas Makassar",
    pilihanLain: [
      "Makanan dari ketan dan telur khas Betawi",
      "Alat musik petik dari daun lontar khas Rote",
      "Tarian perang khas Maluku"
    ],
    penjelasan: "Coto Makassar adalah hidangan sup daging berkuah kacang dan rempah harum yang dimakan bersama ketupat daun kelapa!",
    sukuTerkait: "Bugis/Makassar"
  },
  {
    id: "soal-5",
    gambar: "Sasando",
    kategori: "Kesenian",
    emoji: "🎵",
    benar: "Alat musik petik dari daun lontar khas Rote",
    pilihanLain: [
      "Boneka raksasa khas Betawi",
      "Tarian perang khas Maluku",
      "Pakaian adat bermotif kotak khas Ambon"
    ],
    penjelasan: "Sasando adalah alat musik petik berdawai dari Pulau Rote NTT dengan wadah resonansi melengkung dari lembaran daun lontar!",
    sukuTerkait: "Rote"
  },
  {
    id: "soal-6",
    gambar: "Baju Cele",
    kategori: "Pakaian",
    emoji: "🌺",
    benar: "Pakaian adat bermotif kotak khas Ambon",
    pilihanLain: [
      "Pakaian adat wanita Bugis yang longgar",
      "Topi dari daun lontar khas Rote",
      "Sup daging khas Makassar"
    ],
    penjelasan: "Baju Cele memiliki motif kotak-kotak kecil warna merah cerah, dipakai masyarakat Ambon (Maluku) dalam upacara adat dan pesta rakyat!",
    sukuTerkait: "Ambon"
  },
  {
    id: "soal-7",
    gambar: "Kerak Telor",
    kategori: "Kuliner",
    emoji: "🍳",
    benar: "Makanan dari ketan dan telur khas Betawi",
    pilihanLain: [
      "Sup daging khas Makassar",
      "Tarian perang khas Maluku",
      "Boneka raksasa khas Betawi"
    ],
    penjelasan: "Kerak Telor dibuat dari ketan putih, telur bebek atau ayam, dan kelapa sangrai (serundeng) gurih, dimasak di atas wajan terbalik!",
    sukuTerkait: "Betawi"
  },
  {
    id: "soal-8",
    gambar: "Tari Cakalele",
    kategori: "Kesenian",
    emoji: "🥁",
    benar: "Tarian perang khas Maluku",
    pilihanLain: [
      "Boneka raksasa khas Betawi",
      "Alat musik petik dari daun lontar khas Rote",
      "Topi dari daun lontar khas Rote"
    ],
    penjelasan: "Tari Cakalele adalah tarian perang tradisional Maluku yang dibawakan dengan penuh semangat menggunakan parang dan perisai salawaku!",
    sukuTerkait: "Ambon"
  },
  // Soal Bonus Nusantara
  {
    id: "soal-9",
    gambar: "Tari Piring",
    kategori: "Kesenian",
    emoji: "🍽️",
    benar: "Tarian mengayunkan piring lincah khas Minangkabau",
    pilihanLain: [
      "Boneka raksasa khas Betawi",
      "Tarian perang khas Maluku",
      "Topi dari daun lontar khas Rote"
    ],
    penjelasan: "Tari Piring berasal dari Minangkabau Sumatera Barat, di mana penari mengayun piring dengan kecepatan tinggi tanpa terjatuh!",
    sukuTerkait: "Minangkabau"
  },
  {
    id: "soal-10",
    gambar: "Gamelan & Wayang",
    kategori: "Tradisi",
    emoji: "🎎",
    benar: "Seni musik perunggu dan wayang kulit khas Jawa",
    pilihanLain: [
      "Pakaian adat wanita Bugis yang longgar",
      "Makanan dari ketan dan telur khas Betawi",
      "Alat musik petik dari daun lontar khas Rote"
    ],
    penjelasan: "Wayang Kulit dan orkes Gamelan merupakan kesenian adiluhung suku Jawa yang sarat nasihat kebajikan hidup!",
    sukuTerkait: "Jawa"
  },
  {
    id: "soal-11",
    gambar: "Alat Musik Sape",
    kategori: "Kesenian",
    emoji: "🎸",
    benar: "Alat musik petik kayu bermotif ukir khas Dayak",
    pilihanLain: [
      "Sup daging khas Makassar",
      "Pakaian adat bermotif kotak khas Ambon",
      "Boneka raksasa khas Betawi"
    ],
    penjelasan: "Sape adalah alat musik petik khas suku Dayak Kalimantan yang terbuat dari kayu adau dengan nada alunan yang syahdu menenangkan!",
    sukuTerkait: "Dayak"
  },
  {
    id: "soal-12",
    gambar: "Seni Ukir Asmat",
    kategori: "Kesenian",
    emoji: "🗿",
    benar: "Ukiran kayu bernilai spiritual tinggi khas Papua",
    pilihanLain: [
      "Topi dari daun lontar khas Rote",
      "Makanan dari ketan dan telur khas Betawi",
      "Pakaian adat wanita Bugis yang longgar"
    ],
    penjelasan: "Suku Asmat di Papua terkenal di seluruh dunia karena kemampuannya memahat patung dan ukiran kayu yang sangat rumit dan bernilai seni tinggi!",
    sukuTerkait: "Papua / Asmat"
  }
];

export const PULAU_LIST = [
  'Semua',
  'Jawa',
  'Sumatra',
  'Sulawesi',
  'Bali & Nusa Tenggara',
  'Maluku & Papua',
  'Kalimantan'
] as const;
