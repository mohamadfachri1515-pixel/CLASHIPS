import { Question } from '../types/game';

export const DEFAULT_QUESTIONS: Question[] = [
  // LEVEL 1: MUDAH (100 POIN) - KARTU 01-10
  {
    id: 1,
    cardNumber: 1,
    level: 1,
    points: 100,
    difficulty: 'Mudah',
    question: 'Apa yang dimaksud dengan perubahan iklim?',
    keywords: ['perubahan jangka panjang', 'pola cuaca', 'suhu atmosfer', 'periode panjang', 'iklim bumi'],
    rubric: 'Jawaban harus memuat konsep perubahan jangka panjang pada pola cuaca atau suhu bumi dalam rentang waktu yang lama (puluhan hingga ratusan tahun).',
    exampleAnswer: 'Perubahan iklim adalah perubahan jangka panjang pada suhu rata-rata bumi dan pola cuaca global atau regional dalam periode waktu yang sangat lama.'
  },
  {
    id: 2,
    cardNumber: 2,
    level: 1,
    points: 100,
    difficulty: 'Mudah',
    question: 'Apa perbedaan antara cuaca dan iklim?',
    keywords: ['cuaca jangka pendek', 'iklim jangka panjang', 'harian', 'puluhan tahun', 'wilayah'],
    rubric: 'Menjelaskan cuaca adalah kondisi atmosfer dalam waktu singkat (harian/jam) dan wilayah sempit, sedangkan iklim adalah rata-rata kondisi cuaca dalam jangka waktu lama (minimal 30 tahun) dan wilayah luas.',
    exampleAnswer: 'Cuaca adalah keadaan udara di tempat tertentu dalam waktu singkat (harian/jam), sedangkan iklim adalah rata-rata pola cuaca di wilayah luas dalam jangka waktu panjang (sekitar 30 tahun).'
  },
  {
    id: 3,
    cardNumber: 3,
    level: 1,
    points: 100,
    difficulty: 'Mudah',
    question: 'Sebutkan dua contoh perubahan iklim yang dapat kita amati dalam kehidupan sehari-hari.',
    keywords: ['suhu udara lebih panas', 'musim tidak menentu', 'musim kemarau panjang', 'hujan ekstrem', 'banjir'],
    rubric: 'Menyebutkan minimal dua fenomena nyata seperti cuaca ekstrem/panas terik tak lazim, musim hujan/kemarau bergeser, atau curah hujan ekstrem mendadak.',
    exampleAnswer: '1. Suhu udara terasa semakin panas dan gerah dibandingkan tahun-tahun sebelumnya. 2. Musim hujan dan kemarau yang tidak menentu atau bergeser dari pola biasanya.'
  },
  {
    id: 4,
    cardNumber: 4,
    level: 1,
    points: 100,
    difficulty: 'Mudah',
    question: 'Apa yang dimaksud dengan pemanasan global?',
    keywords: ['kenaikan suhu rata-rata', 'permukaan bumi', 'efek rumah kaca', 'gas rumah kaca', 'atmosfer'],
    rubric: 'Menjelaskan pemanasan global sebagai peningkatan suhu rata-rata atmosfer, laut, dan daratan bumi secara menyeluruh akibat terperangkapnya panas oleh gas rumah kaca.',
    exampleAnswer: 'Pemanasan global adalah fenomena peningkatan suhu rata-rata permukaan bumi dan atmosfer secara bertahap akibat gas rumah kaca yang memerangkap panas matahari.'
  },
  {
    id: 5,
    cardNumber: 5,
    level: 1,
    points: 100,
    difficulty: 'Mudah',
    question: 'Sebutkan dua penyebab utama terjadinya perubahan iklim.',
    keywords: ['pembakaran bahan bakar fosil', 'deforestasi', 'penebangan hutan', 'industri', 'polusi kendaraan', 'pertanian/peternakan'],
    rubric: 'Menyebutkan minimal dua faktor pemicu utama, terutama aktivitas manusia (pembakaran bahan bakar fosil, deforestasi, limbah pabrik, kendaraan bermotor).',
    exampleAnswer: '1. Pembakaran bahan bakar fosil (batu bara, minyak bumi, gas) oleh kendaraan dan industri. 2. Penebangan dan penggundulan hutan (deforestasi) yang mengurangi penyerap karbon.'
  },
  {
    id: 6,
    cardNumber: 6,
    level: 1,
    points: 100,
    difficulty: 'Mudah',
    question: 'Apa hubungan gas rumah kaca dengan perubahan iklim?',
    keywords: ['memerangkap panas', 'efek rumah kaca', 'suhu bumi naik', 'pemanasan global', 'radiasi matahari'],
    rubric: 'Menjelaskan gas rumah kaca menahan radiasi panas matahari di atmosfer sehingga suhu bumi meningkat, yang memicu perubahan pola iklim global.',
    exampleAnswer: 'Gas rumah kaca menahan pantulan radiasi panas matahari agar tidak lepas ke luar angkasa. Jika jumlahnya berlebihan, panas terperangkap terlalu banyak sehingga suhu bumi naik dan memicu perubahan iklim.'
  },
  {
    id: 7,
    cardNumber: 7,
    level: 1,
    points: 100,
    difficulty: 'Mudah',
    question: 'Sebutkan dua gas rumah kaca yang berperan dalam pemanasan global.',
    keywords: ['karbon dioksida', 'CO2', 'metana', 'CH4', 'dinitrogen oksida', 'N2O', 'uap air'],
    rubric: 'Menyebutkan minimal dua senyawa gas rumah kaca dengan benar (contoh: Karbon dioksida / CO2 dan Metana / CH4).',
    exampleAnswer: '1. Karbon dioksida (CO2) yang dihasilkan dari pembakaran bahan bakar fosil. 2. Metana (CH4) yang berasal dari limbah organik, sawah, dan peternakan.'
  },
  {
    id: 8,
    cardNumber: 8,
    level: 1,
    points: 100,
    difficulty: 'Mudah',
    question: 'Bagaimana perubahan iklim dapat memengaruhi kehidupan manusia?',
    keywords: ['kesehatan', 'gagal panen', 'bencana alam', 'krisis air', 'ekonomi', 'tempat tinggal'],
    rubric: 'Menjelaskan pengaruh terhadap aspek kehidupan manusia seperti kesehatan (penyakit), krisis pangan/gagal panen, bencana banjir/kekeringan, atau kerugian ekonomi.',
    exampleAnswer: 'Perubahan iklim dapat menyebabkan gagal panen bagi petani, krisis air bersih, meningkatnya penyakit menular, serta bencana cuaca ekstrem yang merusak rumah dan mata pencaharian.'
  },
  {
    id: 9,
    cardNumber: 9,
    level: 1,
    points: 100,
    difficulty: 'Mudah',
    question: 'Sebutkan dua dampak perubahan iklim terhadap lingkungan.',
    keywords: ['pencairan es kutub', 'kenaikan permukaan air laut', 'kerusakan terumbu karang', 'kepunahan spesies', 'kekeringan', 'kebakaran hutan'],
    rubric: 'Menyebutkan minimal dua dampak fisik/ekologis nyata terhadap ekosistem darat, laut, atau es kutub.',
    exampleAnswer: '1. Mencairnya es di kutub utara dan selatan yang menaikkan permukaan air laut. 2. Kerusakan ekosistem terumbu karang akibat pemutihan (coral bleaching) karena laut memanas.'
  },
  {
    id: 10,
    cardNumber: 10,
    level: 1,
    points: 100,
    difficulty: 'Mudah',
    question: 'Sebutkan dua tindakan sederhana yang dapat dilakukan siswa untuk membantu mengurangi dampak perubahan iklim.',
    keywords: ['hemat listrik', 'berjalan kaki/sepeda', 'menanam pohon', 'mengurangi sampah plastik', 'daur ulang', 'matikan lampu'],
    rubric: 'Menyebutkan aksi konkrit dan realistis pada level siswa seperti mematikan listrik/AC saat tidak dipakai, membawa tumbler/mengurangi plastik, menanam tanaman, jalan kaki ke sekolah dekat.',
    exampleAnswer: '1. Mematikan lampu dan alat elektronik yang tidak dipakai untuk menghemat energi. 2. Membawa botol minum sendiri (tumbler) dan ikut menanam pohon/tanaman di lingkungan sekolah.'
  },

  // LEVEL 2: MENENGAH (200 POIN) - KARTU 11-20
  {
    id: 11,
    cardNumber: 11,
    level: 2,
    points: 200,
    difficulty: 'Menengah',
    question: 'Jelaskan bagaimana pembakaran bahan bakar fosil dapat menyebabkan perubahan iklim.',
    keywords: ['batu bara', 'minyak bumi', 'melepaskan karbon dioksida', 'atmosfer', 'efek rumah kaca', 'perangkap panas'],
    rubric: 'Menerangkan rantai proses: pembakaran bahan bakar fosil melepaskan karbon tersimpan menjadi emisi CO2 berlebih ke atmosfer, menebalkan selimut gas rumah kaca, memerangkap panas, dan menaikkan suhu global.',
    exampleAnswer: 'Bahan bakar fosil (minyak, batu bara, gas) menyimpan cadangan karbon purba. Saat dibakar untuk energi listrik dan kendaraan, senyawa karbon lepas ke atmosfer sebagai CO2 dalam jumlah raksasa. Hal ini memperkuat efek rumah kaca sehingga suhu bumi naik dan pola iklim berubah.'
  },
  {
    id: 12,
    cardNumber: 12,
    level: 2,
    points: 200,
    difficulty: 'Menengah',
    question: 'Mengapa penggunaan kendaraan bermotor dalam jumlah besar dapat meningkatkan emisi gas rumah kaca?',
    keywords: ['bahan bakar minyak', 'bensin', 'solar', 'emisi gas buang', 'karbon monoksida', 'karbon dioksida', 'akumulasi'],
    rubric: 'Menjelaskan kendaraan bermotor mengonsumsi BBM turunan fosil yang menghasilkan gas buang CO2 terus-menerus. Jika jumlah kendaraan masif, volume gas buang terakumulasi dengan cepat di atmosfer.',
    exampleAnswer: 'Sebagian besar kendaraan bermotor memakai bahan bakar bensin atau solar. Proses pembakaran di mesin menghasilkan gas buang berupa CO2 dan hidrokarbon. Ketika jutaan kendaraan beroperasi setiap hari di jalan raya, emisi terakumulasi secara masif dan mempercepat pemanasan global.'
  },
  {
    id: 13,
    cardNumber: 13,
    level: 2,
    points: 200,
    difficulty: 'Menengah',
    question: 'Jelaskan hubungan antara deforestasi dengan perubahan iklim.',
    keywords: ['hutan penyerap karbon', 'fotosintesis', 'pelepasan karbon', 'kebakaran hutan', 'hilangnya penyerap CO2'],
    rubric: 'Menjelaskan dua arah: pohon berfungsi menyerap CO2 lewat fotosintesis. Bila ditebang/dibakar, kemampuan bumi menyerap CO2 menurun sekaligus melepaskan karbon yang tersimpan pada kayu ke udara.',
    exampleAnswer: 'Pohon dan hutan bertindak sebagai paru-paru bumi yang menyerap CO2 melalui fotosintesis. Ketika deforestasi terjadi (penebangan atau pembakaran), kapasitas penyerapan CO2 hilang, dan kayu yang terbakar/lapuk melepaskan kembali miliaran ton karbon ke atmosfer.'
  },
  {
    id: 14,
    cardNumber: 14,
    level: 2,
    points: 200,
    difficulty: 'Menengah',
    question: 'Bagaimana perubahan iklim dapat memengaruhi sektor pertanian?',
    keywords: ['pola tanam berubah', 'gagal panen', 'kekeringan', 'hama penyakit', 'banjir bandang', 'penurunan hasil panen'],
    rubric: 'Menjelaskan pergeseran musim hujan dan kemarau yang mengacaukan jadwal tanam, risiko kekeringan atau banjir ekstrem pada lahan pertanian, serta perkembangbiakan hama yang menurunkan produktivitas pangan.',
    exampleAnswer: 'Perubahan iklim mengacaukan kalender tanam tradisional petani karena musim hujan tidak menentu. Kekeringan ekstrem merusak persawahan, banjir merendam lahan panen, dan suhu yang lebih hangat memicu ledakan hama penyakit tanaman sehingga risiko gagal panen meningkat.'
  },
  {
    id: 15,
    cardNumber: 15,
    level: 2,
    points: 200,
    difficulty: 'Menengah',
    question: 'Bagaimana perubahan iklim dapat memengaruhi ketersediaan air bersih?',
    keywords: ['siklus hidrologi', 'penguapan tinggi', 'kemarau berkepanjangan', 'sumber mata air mengering', 'intrusi air laut', 'pencemaran air'],
    rubric: 'Menjelaskan percepatan penguapan (evaporasi) yang mengeringkan waduk/sungai saat kemarau panjang, curah hujan ekstrem yang menyebabkan sedimentasi kotor, dan naiknya permukaan laut yang mencemari air tanah pesisir (intrusi air asin).',
    exampleAnswer: 'Perubahan iklim mengganggu siklus hidrologi. Kemarau yang panjang dan suhu tinggi mempercepat penguapan air waduk dan sungai sehingga sumber air mengering. Selain itu, naiknya air laut menyebabkan intrusi air asin ke air tanah di kawasan pesisir, membuat cadangan air bersih tawar menyusut.'
  },
  {
    id: 16,
    cardNumber: 16,
    level: 2,
    points: 200,
    difficulty: 'Menengah',
    question: 'Mengapa kenaikan suhu bumi dapat menyebabkan pencairan es di wilayah kutub?',
    keywords: ['titik lebur es', 'suhu atmosfer dan laut', 'gletser mencair', 'penurunan albedo', 'lingkaran umpan balik'],
    rubric: 'Menjelaskan peningkatan suhu udara dan air laut melebihi titik beku es, melelehkan gletser kutub. Ditambah berkurangnya albedo es putih sehingga laut gelap menyerap lebih banyak panas matahari.',
    exampleAnswer: 'Suhu atmosfer dan air laut yang terus naik melampaui titik beku membuat bongkahan gletser dan tudung es kutub meleleh menjadi air cair. Ketika es putih yang memantulkan sinar matahari menyusut, laut yang lebih gelap menyerap lebih banyak panas dan mempercepat laju pencairan.'
  },
  {
    id: 17,
    cardNumber: 17,
    level: 2,
    points: 200,
    difficulty: 'Menengah',
    question: 'Jelaskan dua dampak perubahan iklim terhadap kehidupan masyarakat pesisir.',
    keywords: ['banjir rob', 'abrasi pantai', 'tenggelamnya pemukiman', 'mata pencaharian nelayan', 'gelombang tinggi'],
    rubric: 'Menyebutkan dan menjelaskan minimal dua dampak pada masyarakat pesisir, seperti banjir pasang air laut (rob), erosi garis pantai (abrasi), atau cuaca laut berbahaya yang mengganggu tangkapan nelayan.',
    exampleAnswer: '1. Terjadinya banjir rob berkala yang merendam rumah, jalan, dan tambak masyarakat pesisir akibat kenaikan air laut. 2. Terganggunya mata pencaharian nelayan akibat cuaca laut ekstrem dan badai tak terduga serta rusaknya terumbu karang tempat ikan berkembang biak.'
  },
  {
    id: 18,
    cardNumber: 18,
    level: 2,
    points: 200,
    difficulty: 'Menengah',
    question: 'Apa yang dimaksud dengan mitigasi perubahan iklim? Berikan satu contohnya.',
    keywords: ['pencegahan', 'mengurangi emisi', 'akar penyebab', 'energi terbarukan', 'reboisasi'],
    rubric: 'Menjelaskan mitigasi adalah tindakan pencegahan untuk mengurangi atau menahan laju emisi gas rumah kaca dari sumbernya. Contoh: beralih ke pembangkit listrik tenaga surya/angin, reboisasi, efisiensi energi.',
    exampleAnswer: 'Mitigasi perubahan iklim adalah upaya untuk mencegah atau mengurangi pelepasan gas rumah kaca ke atmosfer guna memperlambat pemanasan global. Contohnya: beralih dari pembangkit listrik batu bara ke energi baru terbarukan seperti panel surya dan kincir angin.'
  },
  {
    id: 19,
    cardNumber: 19,
    level: 2,
    points: 200,
    difficulty: 'Menengah',
    question: 'Apa yang dimaksud dengan adaptasi terhadap perubahan iklim? Berikan dua contohnya.',
    keywords: ['penyesuaian diri', 'menghadapi dampak', 'tangguh iklim', 'tanggul laut', 'varietas tahan kekeringan', 'rumah panggung'],
    rubric: 'Menjelaskan adaptasi adalah langkah penyesuaian sistem alami atau manusia dalam merespons dampak yang sudah atau akan terjadi agar risiko bahaya berkurang. Menyebutkan dua contoh konkrit.',
    exampleAnswer: 'Adaptasi perubahan iklim adalah tindakan penyesuaian untuk menghadapi dampak nyata perubahan iklim agar masyarakat tetap bertahan dan terlindungi. Contoh: 1. Membangun tanggul laut untuk menahan banjir rob di pesisir. 2. Petani menanam bibit padi varietas tahan kekeringan dan tahan genangan air.'
  },
  {
    id: 20,
    cardNumber: 20,
    level: 2,
    points: 200,
    difficulty: 'Menengah',
    question: 'Mengapa penghijauan dan penanaman pohon dapat membantu mengurangi dampak perubahan iklim?',
    keywords: ['fotosintesis', 'penyerap karbon', 'menurunkan suhu lokal', 'menahan air tanah', 'oksigen'],
    rubric: 'Menjelaskan pohon menyerap CO2 dari udara untuk fotosintesis dan menyimpannya sebagai biomassa kayu/daun, memberikan naungan yang mendinginkan suhu lingkungan, dan mengikat air tanah.',
    exampleAnswer: 'Pohon adalah penyerap karbon alami (carbon sink). Melalui fotosintesis, pohon menyerap karbon dioksida di udara dan menguncinya dalam batang serta daun sambil menghasilkan oksigen. Selain itu tajuk pohon menyejukkan suhu lingkungan dan akarnya menjaga resapan air.'
  },

  // LEVEL 3: SULIT (300 POIN) - KARTU 21-30
  {
    id: 21,
    cardNumber: 21,
    level: 3,
    points: 300,
    difficulty: 'Sulit',
    question: 'Jelaskan hubungan antara aktivitas manusia, peningkatan konsentrasi gas rumah kaca, pemanasan global, dan perubahan iklim secara runtut.',
    keywords: ['aktivitas manusia', 'konsentrasi GRK', 'pemanasan global', 'perubahan iklim', 'kausalitas runtut'],
    rubric: 'Jawaban harus menguraikan hubungan kausalitas 4 tahap: (1) Aktivitas manusia (industri, transportasi fosil, deforestasi) -> (2) Peningkatan konsentrasi gas rumah kaca di atmosfer -> (3) Efek rumah kaca menguat menyebabkan pemanasan global (kenaikan suhu rata-rata) -> (4) Kenaikan suhu memicu perubahan iklim (pergeseran iklim, cuaca ekstrem, naiknya laut).',
    exampleAnswer: 'Pertama, aktivitas manusia seperti pembakaran bahan bakar fosil dan penebangan hutan menghasilkan emisi masif. Kedua, emisi ini meningkatkan konsentrasi gas rumah kaca (seperti CO2 dan CH4) di atmosfer. Ketiga, gas-gas ini menahan radiasi panas matahari keluar sehingga memicu pemanasan global (kenaikan suhu bumi). Keempat, kenaikan suhu ini mengganggu sirkulasi udara dan samudra, memicu perubahan iklim menyeluruh seperti pergeseran musim dan fenomena cuaca ekstrem.'
  },
  {
    id: 22,
    cardNumber: 22,
    level: 3,
    points: 300,
    difficulty: 'Sulit',
    question: 'Analisis bagaimana deforestasi dapat memengaruhi perubahan iklim sekaligus meningkatkan risiko bencana lingkungan.',
    keywords: ['pelepasan karbon', 'hilangnya penahan air', 'tanah longsor', 'banjir bandang', 'hilangnya keanekaragaman hayati', 'erosi'],
    rubric: 'Menganalisis dua sisi: terhadap iklim (hilangnya penyerap karbon dan pelepasan emisi pembakaran) dan terhadap bencana ekologis langsung (tanpa akar pohon, tanah kehilangan daya serap air memicu banjir bandang, erosi lapisan atas, dan longsor di perbukitan).',
    exampleAnswer: 'Dari sisi iklim, deforestasi menghentikan fungsi hutan sebagai penyerap karbon raksasa dan melepas kembali jutaan ton karbon ke atmosfer saat dibakar. Dari sisi bencana lingkungan lokal, hilangnya vegetasi dan perakaran pohon membuat tanah kehilangan daya ikat dan kapasitas resapan air hujan. Akibatnya saat hujan deras melanda, air limpasan memicu banjir bandang dan tanah longsor di perbukitan.'
  },
  {
    id: 23,
    cardNumber: 23,
    level: 3,
    points: 300,
    difficulty: 'Sulit',
    question: 'Sebuah wilayah mengalami musim hujan yang semakin tidak menentu dan periode kekeringan yang semakin panjang. Jelaskan kemungkinan hubungan kondisi tersebut dengan perubahan iklim.',
    keywords: ['pola sirkulasi atmosfer', 'anomali monsun', 'El Nino / La Nina', 'penguapan tinggi', 'ketidakstabilan iklim'],
    rubric: 'Menghubungkan kondisi lokal tersebut dengan pemanasan suhu global yang mengubah pola angin muson, mengintensifkan fenomena seperti El Nino, serta mempercepat laju evaporasi yang menguras kelembapan tanah.',
    exampleAnswer: 'Kondisi tersebut adalah dampak langsung perubahan iklim. Pemanasan atmosfer mengubah pola angin sirkulasi global dan memicu anomali cuaca. Suhu tinggi mempercepat penguapan air tanah sehingga memicu kekeringan panjang. Sebaliknya, ketika atmosfer yang panas menampung uap air lebih banyak, hujan turun dalam konsentrasi sangat pekat namun singkat dan tidak beraturan.'
  },
  {
    id: 24,
    cardNumber: 24,
    level: 3,
    points: 300,
    difficulty: 'Sulit',
    question: 'Bagaimana perubahan iklim dapat memperbesar risiko banjir di suatu wilayah? Jelaskan faktor-faktor yang dapat memperkuat risikonya.',
    keywords: ['curah hujan ekstrem', 'kenaikan muka air laut', 'daerah resapan berkurang', 'drainase buruk', 'sedimentasi sungai'],
    rubric: 'Menjelaskan faktor iklim (curah hujan berintensitas tinggi dalam durasi pendek karena atmosfer lebih hangat mampu menampung lebih banyak uap air, dan kenaikan air laut) dipadukan dengan faktor lingkungan (alih fungsi lahan, sedimentasi, drainase minim).',
    exampleAnswer: 'Perubahan iklim membuat udara lebih hangat menahan lebih banyak kelembapan, menghasilkan badai dengan curah hujan ekstrem yang melampaui daya tampung sungai. Di pesisir, kenaikan muka air laut menahan aliran sungai ke laut. Risiko ini diperkuat oleh alih fungsi lahan hijau menjadi beton, sedimentasi sungai, dan drainase perkotaan yang buruk.'
  },
  {
    id: 25,
    cardNumber: 25,
    level: 3,
    points: 300,
    difficulty: 'Sulit',
    question: 'Jelaskan bagaimana perubahan iklim dapat memengaruhi ketahanan pangan masyarakat.',
    keywords: ['gagal panen', 'kelangkaan komoditas', 'lonjakan harga pangan', 'kematian ternak', 'kerusakan perikanan', 'daya beli'],
    rubric: 'Menjelaskan rantai dari sektor hulu ke hilir: gagal panen akibat cuaca ekstrem/kekeringan/hama -> penurunan produksi pasokan bahan makanan -> lonjakan harga komoditas (inflasi pangan) -> menurunnya keterjangkauan gizi bagi keluarga rentan.',
    exampleAnswer: 'Ketahanan pangan terancam di seluruh rantai pasok. Di hulu, kekeringan dan banjir menyebabkan gagal panen massal tanaman pokok serta matinya ternak dan rusaknya habitat ikan. Di hilir, penurunan produksi ini memicu kelangkaan bahan pokok di pasar, mendorong kenaikan harga drastis, sehingga masyarakat miskin sulit membeli makanan bergizi seimbang.'
  },
  {
    id: 26,
    cardNumber: 26,
    level: 3,
    points: 300,
    difficulty: 'Sulit',
    question: 'Bandingkan mitigasi dan adaptasi perubahan iklim. Jelaskan perbedaan tujuan, contoh tindakan, dan manfaat keduanya.',
    keywords: ['mitigasi mengatasi akar masalah', 'adaptasi menyesuaikan dampak', 'tujuan', 'contoh tindakan', 'manfaat jangka pendek/panjang'],
    rubric: 'Menyajikan komparasi jelas: Mitigasi bertujuan menekan akar penyebab (emisi gas rumah kaca) untuk jangka panjang (contoh: transisi energi terbarukan, reboisasi). Adaptasi bertujuan mengurangi kerentanan terhadap dampak yang sudah ada (contoh: tanggul rob, varietas tahan kering) demi keselamatan saat ini.',
    exampleAnswer: 'Perbedaan utama terletak pada fokusnya: Mitigasi bertujuan mengatasi akar penyebab perubahan iklim dengan mengurangi emisi gas rumah kaca jangka panjang (contoh: energi surya, reboisasi, penghentian PLTU). Sedangkan adaptasi bertujuan menyesuaikan kehidupan dengan dampak yang sudah terjadi agar masyarakat tangguh (contoh: pembuatan tanggul laut, penyesuaian kalender tanam). Keduanya saling melengkapi; tanpa mitigasi adaptasi akan terlalu mahal, tanpa adaptasi masyarakat akan menderita dampak langsung.'
  },
  {
    id: 27,
    cardNumber: 27,
    level: 3,
    points: 300,
    difficulty: 'Sulit',
    question: 'Sebuah daerah pesisir sering mengalami banjir rob. Rancang tiga strategi adaptasi yang dapat dilakukan masyarakat dan pemerintah daerah.',
    keywords: ['hutan mangrove', 'tanggul laut', 'pompa air / polder', 'rumah panggung', 'zonasi tata ruang', 'early warning system'],
    rubric: 'Merancang minimal tiga strategi realistis terpadu: (1) Ekologis (rehabilitasi mangrove pantai), (2) Infrastruktur fisik (tanggul laut / sistem pompa polder / rumah panggung), (3) Kebijakan (penataan ruang sempadan pantai dan relokasi bertahap).',
    exampleAnswer: '1. Konservasi dan penanaman hutan mangrove di sepanjang garis pantai untuk memecah gelombang dan menahan abrasi secara alami. 2. Pembangunan tanggul laut dan sistem polder drainase dengan pompa otomatis untuk mengalirkan genangan air rob keluar pemukiman. 3. Penataan zonasi pemukiman dengan mendorong desain rumah panggung adaptif serta melarang penyedotan air tanah berlebihan yang memicu penurunan tanah (land subsidence).'
  },
  {
    id: 28,
    cardNumber: 28,
    level: 3,
    points: 300,
    difficulty: 'Sulit',
    question: 'Jika penggunaan bahan bakar fosil terus meningkat tanpa pengendalian, analisis kemungkinan dampaknya terhadap lingkungan dan kehidupan sosial-ekonomi masyarakat.',
    keywords: ['pemanasan ekstrem', 'tenggelamnya pulau kecil', 'krisis pengungsi iklim', 'inflasi dan kemiskinan', 'konflik sumber daya air'],
    rubric: 'Menganalisis dampak multidimensi: lingkungan (kenaikan suhu ekstrem, kepunahan massal spesies, pulau kecil tenggelam) dan sosial-ekonomi (krisis pangan global, ledakan pengungsi iklim, kerugian ekonomi triliunan rupiah, lonjakan angka kemiskinan).',
    exampleAnswer: 'Lingkungan akan mengalami kenaikan suhu ekstrem, hilangnya lapisan es kutub, dan naiknya muka air laut yang menenggelamkan pulau-pulau kecil serta pesisir. Secara sosial-ekonomi, timbul krisis pangan dan kelangkaan air yang memicu inflasi tinggi, timbulnya jutaan pengungsi iklim (climate refugees), lonjakan angka kemiskinan global, serta potensi konflik memperebutkan sumber daya alam yang tersisa.'
  },
  {
    id: 29,
    cardNumber: 29,
    level: 3,
    points: 300,
    difficulty: 'Sulit',
    question: 'Menurut pendapatmu, mengapa penanganan perubahan iklim membutuhkan kerja sama antara individu, masyarakat, pemerintah, dan dunia internasional?',
    keywords: ['masalah lintas batas', 'tanggung jawab kolektif', 'regulasi dan hukum', 'gaya hidup berkelanjutan', 'perjanjian internasional'],
    rubric: 'Menjelaskan atmosfer bumi tidak memiliki batas negara (emisi di satu negara berdampak ke negara lain). Masing-masing pihak punya peran vital: individu (kebiasaan hemat energi), masyarakat (gerakan komunitas), pemerintah (kebijakan dan pajak karbon), internasional (perjanjian seperti Paris Agreement dan pendanaan iklim).',
    exampleAnswer: 'Perubahan iklim adalah masalah global tanpa batas teritorial; gas rumah kaca yang dilepas satu negara beredar ke atmosfer seluruh bumi. Individu dan masyarakat berperan mengubah gaya hidup ramah lingkungan, pemerintah memiliki wewenang membuat undang-undang, pajak karbon, dan infrastruktur bersih, sedangkan forum internasional (seperti Perjanjian Paris) memastikan keadilan iklim dan komitmen bersama lintas bangsa.'
  },
  {
    id: 30,
    cardNumber: 30,
    level: 3,
    points: 300,
    difficulty: 'Sulit',
    question: 'Buatlah strategi sederhana untuk sebuah sekolah dalam menghadapi perubahan iklim. Jelaskan minimal lima program yang dapat dilakukan dan alasan mengapa program tersebut penting.',
    keywords: ['bank sampah', 'kantin bebas plastik', 'taman sekolah / green school', 'hemat energi listrik', 'pendidikan karakter lingkungan', 'kompos'],
    rubric: 'Menyusun minimal lima program konkrit tingkat sekolah beserta alasannya (contoh: kantin zero plastic, pemilahan sampah & komposting, penanaman pohon rindang/vertical garden, program patroli hemat listrik kelas, kurikulum aksi iklim nyata).',
    exampleAnswer: '1. Program Sekolah Hemat Energi: Mematikan AC/lampu saat istirahat dan memanfaatkan cahaya matahari untuk melatih efisiensi energi. 2. Gerakan Kantin Bebas Plastik Sekali Pakai: Mewajibkan siswa membawa tempat makan & tumbler untuk memangkas timbulan sampah plastik. 3. Bank Sampah dan Pengomposan: Mengolah sisa daun dan organik menjadi pupuk untuk mencegah emisi gas metana dari TPA. 4. Kebun Botani Mini / Green School: Menanam pohon peneduh di pekarangan sekolah untuk menyerap karbon dan menyejukkan lingkungan belajar. 5. Duta Lingkungan Siswa: Kampanye antar-kelas dan aksi pungut sampah rutin untuk membangun kesadaran kolektif sejak dini.'
  }
];
