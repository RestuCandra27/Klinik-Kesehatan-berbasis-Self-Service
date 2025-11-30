// =============================
// Data Dokter
// =============================
const doctors = [
    {
        name: "dr. Aisyah Putri, Sp.PD",
        specialist: "Spesialis Penyakit Dalam",
        schedule: "Senin, Rabu, Jumat • 09.00–13.00",
        room: "Poli Penyakit Dalam 1",
        photo: "https://via.placeholder.com/80x80.png?text=AP"
    },
    {
        name: "dr. Rendy Pratama, Sp.JP",
        specialist: "Spesialis Jantung & Pembuluh Darah",
        schedule: "Selasa & Kamis • 16.00–20.00",
        room: "Klinik Jantung Nexus",
        photo: "https://via.placeholder.com/80x80.png?text=RP"
    },
    {
        name: "drg. Livia Wulandari",
        specialist: "Dokter Gigi",
        schedule: "Senin–Sabtu • 10.00–18.00",
        room: "Poli Gigi & Mulut",
        photo: "https://via.placeholder.com/80x80.png?text=LW"
    },
    {
        name: "dr. Naufal Akbar, Sp.A",
        specialist: "Spesialis Anak",
        schedule: "Senin–Sabtu • 08.00–12.00",
        room: "Poli Anak",
        photo: "https://via.placeholder.com/80x80.png?text=NA"
    },
    {
        name: "dr. Dina Maharani",
        specialist: "Dokter Umum",
        schedule: "Setiap hari • 08.00–21.00",
        room: "Poli Umum",
        photo: "https://via.placeholder.com/80x80.png?text=DM"
    },
    {
        name: "dr. Clara Widya, Sp.KJ",
        specialist: "Spesialis Kedokteran Jiwa",
        schedule: "Rabu & Jumat • 17.00–20.00",
        room: "Ruang Konseling",
        photo: "https://via.placeholder.com/80x80.png?text=CW"
    }
];

// =============================
// Data Layanan & Harga
// =============================
const services = [
    {
        id: "umum",
        name: "Konsultasi Dokter Umum",
        category: "Konsultasi",
        price: 85000
    },
    {
        id: "jantung",
        name: "Konsultasi Spesialis Jantung",
        category: "Konsultasi Spesialis",
        price: 275000
    },
    {
        id: "gigi-bungsu",
        name: "Pemeriksaan Gigi Bungsu",
        category: "Gigi & Mulut",
        price: 195000
    },
    {
        id: "kolesterol",
        name: "Cek Kolesterol Lengkap",
        category: "Laboratorium",
        price: 165000
    },
    {
        id: "mcu-dasar",
        name: "Paket Medical Check Up Dasar",
        category: "Paket MCU",
        price: 480000
    },
    {
        id: "ekg",
        name: "Pemeriksaan EKG Rutin",
        category: "Penunjang Diagnostik",
        price: 230000
    },
    {
        id: "usg-abdomen",
        name: "USG Abdomen Lengkap",
        category: "Penunjang Diagnostik",
        price: 390000
    },
    {
        id: "anak-kontrol",
        name: "Kontrol Berkala Dokter Anak",
        category: "Konsultasi Anak",
        price: 135000
    }
];

// =============================
// Helper: Format Rupiah
// =============================
const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(value);
};

// =============================
// Render Dokter
// =============================
const renderDoctors = () => {
    const doctorListEl = document.getElementById("doctorList");
    if (!doctorListEl) return;

    doctorListEl.innerHTML = "";

    doctors.forEach((doc) => {
        const card = document.createElement("article");
        card.className =
            "flex gap-3 p-2.5 rounded-2xl border border-slate-700/80 bg-slate-900/85 card-hover-soft";

        card.innerHTML = `
            <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-2xl overflow-hidden border border-cyan-500/40 bg-slate-800">
                    <img
                        src="${doc.photo}"
                        alt="${doc.name}"
                        class="h-full w-full object-cover"
                    />
                </div>
            </div>
            <div class="flex-1 min-w-0">
                <p class="text-xs font-semibold text-slate-100 truncate">
                    ${doc.name}
                </p>
                <p class="text-[11px] text-cyan-300 truncate">
                    ${doc.specialist}
                </p>
                <p class="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                    <i class="fa-regular fa-clock text-[9px]"></i>
                    ${doc.schedule}
                </p>
                <p class="text-[10px] text-slate-400 flex items-center gap-1">
                    <i class="fa-solid fa-door-open text-[9px]"></i>
                    ${doc.room}
                </p>
            </div>
        `;

        doctorListEl.appendChild(card);
    });
};

// =============================
// Render Layanan ke Tabel & Select
// =============================
const renderServices = () => {
    const tableBody = document.getElementById("servicesTableBody");
    const selectEl = document.getElementById("serviceSelect");

    if (!tableBody || !selectEl) return;

    tableBody.innerHTML = "";
    selectEl.innerHTML = "";

    services.forEach((service) => {
        // Row tabel
        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-800/80 transition-colors";

        tr.innerHTML = `
            <td class="px-3 py-2">
                <p class="text-slate-100">${service.name}</p>
                <p class="text-[11px] text-slate-400 sm:hidden">
                    ${service.category}
                </p>
            </td>
            <td class="px-3 py-2 text-slate-300 hidden sm:table-cell">
                ${service.category}
            </td>
            <td class="px-3 py-2 text-right font-semibold text-emerald-300">
                ${formatRupiah(service.price)}
            </td>
        `;

        tableBody.appendChild(tr);

        // Option untuk select
        const option = document.createElement("option");
        option.value = service.id;
        option.textContent = `${service.name} (${formatRupiah(service.price)})`;
        selectEl.appendChild(option);
    });
};

// =============================
// SPA Tab Switching
// =============================
const setupTabSwitching = () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const quickNavButtons = document.querySelectorAll(".quick-nav");
    const sections = document.querySelectorAll(".spa-section");

    const showSection = (targetId) => {
        sections.forEach((section) => {
            if (section.id === targetId) {
                section.classList.remove("hidden");
                // transition in
                requestAnimationFrame(() => {
                    section.classList.remove("opacity-0", "translate-y-2");
                    section.classList.add("opacity-100", "translate-y-0");
                });
            } else {
                section.classList.add("opacity-0", "translate-y-2");
                section.classList.remove("opacity-100", "translate-y-0");
                setTimeout(() => {
                    if (section.id !== targetId) {
                        section.classList.add("hidden");
                    }
                }, 180);
            }
        });

        navLinks.forEach((link) => {
            const id = link.getAttribute("data-target");
            if (id === targetId) {
                link.classList.add("tab-active");
            } else {
                link.classList.remove("tab-active");
            }
        });
    };

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("data-target");
            if (!targetId) return;
            showSection(targetId);
        });
    });

    quickNavButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = btn.getAttribute("data-target");
            if (!targetId) return;
            showSection(targetId);
        });
    });

    // Default: Beranda
    showSection("beranda");
};

// =============================
// Live Cost Estimator
// =============================
const setupCostEstimator = () => {
    const serviceSelect = document.getElementById("serviceSelect");
    const quantityInput = document.getElementById("quantityInput");
    const paymentType = document.getElementById("paymentType");
    const followUpCheck = document.getElementById("followUpCheck");
    const calculateBtn = document.getElementById("calculateBtn");
    const estimateTotalEl = document.getElementById("estimateTotal");
    const estimateDetailEl = document.getElementById("estimateDetail");

    if (
        !serviceSelect ||
        !quantityInput ||
        !paymentType ||
        !followUpCheck ||
        !calculateBtn ||
        !estimateTotalEl ||
        !estimateDetailEl
    ) {
        return;
    }

    const calculate = () => {
        const serviceId = serviceSelect.value;
        const qty = Math.max(1, parseInt(quantityInput.value || "1", 10));
        const payment = paymentType.value;
        const followUp = followUpCheck.checked;

        const selectedService = services.find((s) => s.id === serviceId);
        if (!selectedService) return;

        const basePrice = selectedService.price;
        let subtotal = basePrice * qty;

        let paymentLabel = "";
        let paymentNote = "";
        let coveredByThirdParty = 0;

        if (payment === "umum") {
            paymentLabel = "Pembayaran Umum";
            paymentNote =
                "Tarif penuh dibayarkan oleh pasien. Estimasi belum termasuk obat dan tindakan tambahan.";
        } else if (payment === "bpjs") {
            paymentLabel = "BPJS Kesehatan";
            // Simulasi: 85% ditanggung BPJS
            coveredByThirdParty = subtotal * 0.85;
            subtotal = subtotal * 0.15;
            paymentNote =
                "Perhitungan ini menggunakan simulasi 85% biaya ditanggung BPJS. Nilai aktual mengikuti ketentuan faskes dan hak kelas peserta.";
        } else if (payment === "asuransi") {
            paymentLabel = "Asuransi Rekanan";
            // Simulasi: 50% ditanggung asuransi
            coveredByThirdParty = subtotal * 0.5;
            subtotal = subtotal * 0.5;
            paymentNote =
                "Persentase pertanggungan asuransi dapat berbeda antar polis. Angka di atas hanya ilustrasi untuk memudahkan perencanaan.";
        }

        let followUpCost = 0;
        if (followUp) {
            followUpCost = basePrice * 0.7; // 30% diskon
            subtotal += followUpCost;
        }

        estimateTotalEl.textContent = formatRupiah(subtotal);

        const detailLines = [];
        detailLines.push(
            `• Layanan: <strong>${selectedService.name}</strong> (${formatRupiah(
                basePrice
            )} x ${qty})`
        );

        if (coveredByThirdParty > 0) {
            detailLines.push(
                `• Perkiraan tanggungan oleh pihak ketiga: <strong>${formatRupiah(
                    coveredByThirdParty
                )}</strong>`
            );
        }

        if (followUp) {
            detailLines.push(
                `• Estimasi 1x kontrol lanjutan: <strong>${formatRupiah(
                    followUpCost
                )}</strong> (diskon 30% dari tarif dasar)`
            );
        }

        detailLines.push(
            `• Metode pembayaran: <strong>${paymentLabel}</strong>`
        );
        detailLines.push(
            `• Catatan: ${paymentNote} Estimasi ini bukan merupakan tagihan resmi dan akan dikonfirmasi kembali oleh petugas di loket pembayaran.`
        );

        estimateDetailEl.innerHTML = detailLines.join("<br>");
    };

    calculateBtn.addEventListener("click", calculate);
    serviceSelect.addEventListener("change", calculate);
    quantityInput.addEventListener("input", calculate);
    paymentType.addEventListener("change", calculate);
    followUpCheck.addEventListener("change", calculate);

    // Inisialisasi awal
    calculate();
};

// =============================
// Queue System (Status Antrean)
// =============================
const setupQueueSystem = () => {
    const takeQueueBtn = document.getElementById("takeQueueBtn");
    const queueNumberHeader = document.getElementById("queueNumberHeader");
    const queueStatusHeader = document.getElementById("queueStatusHeader");
    const queueNumberCard = document.getElementById("queueNumberCard");
    const queueStatusCard = document.getElementById("queueStatusCard");

    if (!takeQueueBtn || !queueNumberHeader || !queueStatusHeader || !queueNumberCard || !queueStatusCard) {
        return;
    }

    let currentQueue = 0;

    const formatQueueNumber = (num) => {
        return `A-${String(num).padStart(3, "0")}`;
    };

    const updateQueueDisplay = () => {
        const formatted = formatQueueNumber(currentQueue);

        queueNumberHeader.textContent = formatted;
        queueNumberCard.textContent = formatted;

        queueStatusHeader.textContent = "Antrean Aktif";
        queueStatusCard.textContent =
            "Nomor Anda sudah aktif. Silakan menunggu di area tunggu.";

        // Animasi kecil saat nomor baru muncul
        queueNumberCard.classList.remove("queue-pulse");
        void queueNumberCard.offsetWidth; // reflow
        queueNumberCard.classList.add("queue-pulse");
    };

    takeQueueBtn.addEventListener("click", () => {
        currentQueue += 1;
        updateQueueDisplay();
    });
};

// =============================
// Init
// =============================
document.addEventListener("DOMContentLoaded", () => {
    renderDoctors();
    renderServices();
    setupTabSwitching();
    setupCostEstimator();
    setupQueueSystem();
});
