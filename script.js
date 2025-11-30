// =============================
// Data Dummy (Array of Objects)
// =============================

// Data dokter
const doctors = [
    {
        name: "dr. Aisyah Putri, Sp.PD",
        specialist: "Spesialis Penyakit Dalam",
        schedule: "Senin, Rabu, Jumat — 09.00-13.00",
        room: "Ruang Poli 03",
        photo: "https://via.placeholder.com/80x80.png?text=Dr+A"
    },
    {
        name: "drg. Rama Pratama",
        specialist: "Dokter Gigi",
        schedule: "Selasa & Kamis — 10.00-15.00",
        room: "Ruang Poli 05",
        photo: "https://via.placeholder.com/80x80.png?text=Dr+G"
    },
    {
        name: "dr. Nabila Sari, Sp.A",
        specialist: "Spesialis Anak",
        schedule: "Senin - Sabtu — 08.00-12.00",
        room: "Ruang Poli 02",
        photo: "https://via.placeholder.com/80x80.png?text=Dr+Anak"
    },
    {
        name: "dr. Bayu Mahendra",
        specialist: "Dokter Umum",
        schedule: "Setiap hari — 08.00-21.00",
        room: "Ruang Poli 01",
        photo: "https://via.placeholder.com/80x80.png?text=Dr+U"
    },
    {
        name: "dr. Clara Widya, Sp.KJ",
        specialist: "Spesialis Kejiwaan",
        schedule: "Rabu & Jumat — 16.00-20.00",
        room: "Ruang Konseling",
        photo: "https://via.placeholder.com/80x80.png?text=Dr+Psik"
    },
    {
        name: "dr. Dimas Prakoso, Sp.OG",
        specialist: "Spesialis Kandungan",
        schedule: "Selasa, Kamis, Sabtu — 09.00-13.00",
        room: "Ruang Poli 06",
        photo: "https://via.placeholder.com/80x80.png?text=Dr+OG"
    }
];

// Data layanan & harga
const services = [
    {
        id: "umum",
        name: "Konsultasi Dokter Umum",
        category: "Poli Umum",
        price: 75000
    },
    {
        id: "spesialis",
        name: "Konsultasi Dokter Spesialis",
        category: "Poli Spesialis",
        price: 150000
    },
    {
        id: "gigi",
        name: "Pemeriksaan Gigi Dasar",
        category: "Poli Gigi",
        price: 100000
    },
    {
        id: "anak",
        name: "Konsultasi Dokter Anak",
        category: "Poli Anak",
        price: 135000
    },
    {
        id: "lab-basic",
        name: "Paket Lab Dasar (Darah Lengkap)",
        category: "Laboratorium",
        price: 180000
    },
    {
        id: "lab-cek-rutin",
        name: "Cek Gula Darah / Kolesterol",
        category: "Laboratorium",
        price: 65000
    },
    {
        id: "ekg",
        name: "Pemeriksaan EKG",
        category: "Penunjang",
        price: 210000
    },
    {
        id: "usg",
        name: "USG Abdomen / Kehamilan",
        category: "Penunjang",
        price: 350000
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
// Render Dokter ke HTML
// =============================
const renderDoctors = () => {
    const doctorListEl = document.getElementById("doctorList");
    if (!doctorListEl) return;

    doctorListEl.innerHTML = "";

    doctors.forEach((doc) => {
        const card = document.createElement("article");
        card.className =
            "flex gap-3 p-2.5 rounded-2xl border border-slate-700/80 bg-slate-900/80 card-hover-soft";

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
        // Tabel
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

        // Select
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
                // Trigger transition
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

        // Update nav tab state
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

    // Quick nav buttons in hero
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
// Live Cost Estimator Logic
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

        // Diskon/penyesuaian berdasarkan metode pembayaran
        let paymentLabel = "";
        let paymentNote = "";
        let discountPayment = 0;

        if (payment === "umum") {
            paymentLabel = "Pasien Umum";
            paymentNote = "Tanpa subsidi, tarif normal klinik.";
        } else if (payment === "bpjs") {
            paymentLabel = "BPJS (Administrasi)";
            // Simulasi: hanya biaya admin 20% dari tarif dasar
            discountPayment = subtotal * 0.8; // 80% ditanggung BPJS
            subtotal = subtotal * 0.2;
            paymentNote =
                "Sebagian besar biaya ditanggung BPJS. Estimasi ini hanya memperhitungkan biaya administrasi/selisih.";
        } else if (payment === "asuransi") {
            paymentLabel = "Asuransi Rekanan";
            // Simulasi diskon 40% dari tarif dasar
            discountPayment = subtotal * 0.4;
            subtotal = subtotal * 0.6;
            paymentNote =
                "Perhitungan dengan asumsi potongan 40% dari asuransi rekanan. Nilai aktual mengikuti polis.";
        }

        // Estimasi kontrol lanjutan (follow up)
        let followUpCost = 0;
        if (followUp) {
            followUpCost = basePrice * 0.7; // diskon 30% dari tarif dasar
            subtotal += followUpCost;
        }

        // Update UI
        estimateTotalEl.textContent = formatRupiah(subtotal);

        const detailLines = [];

        detailLines.push(
            `• Layanan: <strong>${selectedService.name}</strong> (${formatRupiah(
                basePrice
            )} x ${qty})`
        );
        if (discountPayment > 0) {
            detailLines.push(
                `• Potongan oleh ${paymentLabel}: sekitar <strong>${formatRupiah(
                    discountPayment
                )}</strong>`
            );
        } else {
            detailLines.push(`• Metode pembayaran: <strong>${paymentLabel}</strong>`);
        }

        if (followUp) {
            detailLines.push(
                `• Estimasi kontrol lanjutan: <strong>${formatRupiah(
                    followUpCost
                )}</strong> (diskon 30% dari tarif dasar)`
            );
        }

        detailLines.push(
            `• Catatan: ${paymentNote} Nilai ini bersifat <strong>estimasi</strong> dan dapat berubah sesuai tindakan tambahan & kebijakan klinik.`
        );

        estimateDetailEl.innerHTML = detailLines.join("<br>");
    };

    // Event listeners
    calculateBtn.addEventListener("click", calculate);
    serviceSelect.addEventListener("change", calculate);
    quantityInput.addEventListener("input", calculate);
    paymentType.addEventListener("change", calculate);
    followUpCheck.addEventListener("change", calculate);

    // Inisialisasi pertama kali
    calculate();
};

// =============================
// Init
// =============================
document.addEventListener("DOMContentLoaded", () => {
    renderDoctors();
    renderServices();
    setupTabSwitching();
    setupCostEstimator();
});
