import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { FiMapPin, FiCheck } from "react-icons/fi";
import Button from "../../components/Button";

const pesananData = [
  {
    id: "12345",
    nama: "Ansela Maharani",
    tanggal: "25 Nov 2025, 14:30",
    alamat: "Blok F13, Perumahan Bintang Alam",
    jumlahItem: 2,
    status: "Selesai",
    pembayaran: "Gopay",
    bank: "",
    produk: [
      { nama: "Indomie Goreng", qty: 10, harga: 40000 },
      { nama: "Floridina", qty: 2, harga: 8000 },
    ],
    total: 48000,
    statusLabel: "Selesai",
  },
  {
    id: "12346",
    nama: "Budi Santoso",
    tanggal: "25 Nov 2025, 13:15",
    alamat: "Blok D08, Perumahan Bintang Alam",
    jumlahItem: 3,
    status: "Dibayar",
    pembayaran: "OVO",
    bank: "",
    produk: [
      { nama: "Aqua 600 ml", qty: 5, harga: 20000 },
      { nama: "Susu Ultra 1L", qty: 2, harga: 32000 },
      { nama: "Roti Tawar", qty: 1, harga: 15000 },
    ],
    total: 67000,
    statusLabel: "Dibayar",
  },
  {
    id: "12344",
    nama: "Andi Wijaya",
    tanggal: "25 Nov 2025, 12:30",
    alamat: "Blok B09, Perumahan Bintang Alam",
    jumlahItem: 2,
    status: "Dibayar",
    pembayaran: "Gopay",
    bank: "",
    produk: [
      { nama: "Telur 1/4 Kg", qty: 1, harga: 8000 },
      { nama: "Minyak 1/2 Liter", qty: 1, harga: 10000 },
    ],
    total: 18000,
    statusLabel: "Dibayar",
  },
  {
    id: "12343",
    nama: "Andi Wijaya",
    tanggal: "25 Nov 2025, 10:00",
    alamat: "Blok C12, Perumahan Bintang Alam",
    jumlahItem: 1,
    status: "Dikirim",
    pembayaran: "VA BRI",
    bank: "",
    produk: [{ nama: "Beras 1 Liter", qty: 10, harga: 120000 }],
    total: 120000,
    statusLabel: "Dikirim",
  },
  {
    id: "12342",
    nama: "Siti Nurhaliza",
    tanggal: "25 Nov 2025, 08:30",
    alamat: "Blok A12, Perumahan Bintang Alam",
    jumlahItem: 1,
    status: "Selesai",
    pembayaran: "QRIS",
    bank: "",
    produk: [{ nama: "Pasta Gigi Pepsodent Kecil", qty: 5, harga: 25000 }],
    total: 25000,
    statusLabel: "Selesai",
  },
  {
    id: "12341",
    nama: "Ahmad Fauzi",
    tanggal: "25 Nov 2025, 09:15",
    alamat: "Blok E05, Perumahan Bintang Alam",
    jumlahItem: 1,
    status: "Dibayar",
    pembayaran: "Dana",
    bank: "",
    produk: [{ nama: "Minyak Goreng 2 Liter", qty: 1, harga: 35000 }],
    total: 35000,
    statusLabel: "Dibayar",
  },
  {
    id: "12340",
    nama: "Dewi Lestari",
    tanggal: "25 Nov 2025, 11:45",
    alamat: "Blok G10, Perumahan Bintang Alam",
    jumlahItem: 2,
    status: "Selesai",
    pembayaran: "Gopay",
    bank: "",
    produk: [
      { nama: "Gula 1 Kg", qty: 1, harga: 15000 },
      { nama: "Kopi Premium", qty: 1, harga: 17000 },
    ],
    total: 32000,
    statusLabel: "Selesai",
  },
  {
    id: "12339",
    nama: "Rudi Hermawan",
    tanggal: "25 Nov 2025, 13:20",
    alamat: "Blok H14, Perumahan Bintang Alam",
    jumlahItem: 1,
    status: "Dikirim",
    pembayaran: "ShopeePay",
    bank: "",
    produk: [{ nama: "Tepung Terigu 5 Kg", qty: 1, harga: 95000 }],
    total: 95000,
    statusLabel: "Dikirim",
  },
  {
    id: "12338",
    nama: "Maya Kusuma",
    tanggal: "25 Nov 2025, 15:00",
    alamat: "Blok I07, Perumahan Bintang Alam",
    jumlahItem: 1,
    status: "Dibayar",
    pembayaran: "OVO",
    bank: "",
    produk: [{ nama: "Telur Ayam 1 Kg", qty: 1, harga: 75000 }],
    total: 75000,
    statusLabel: "Dibayar",
  },
  {
    id: "12337",
    nama: "Hendra Gunawan",
    tanggal: "25 Nov 2025, 16:30",
    alamat: "Blok J02, Perumahan Bintang Alam",
    jumlahItem: 2,
    status: "Selesai",
    pembayaran: "QRIS",
    bank: "",
    produk: [
      { nama: "Susu Murni 1 Liter", qty: 1, harga: 60000 },
      { nama: "Keju Mozarella", qty: 1, harga: 150000 },
    ],
    total: 210000,
    statusLabel: "Selesai",
  },
];

const statusFilters = [
  { label: "Semua (10)", count: 10 },
  { label: "Dibayar (4)", count: 4 },
  { label: "Dikirim (2)", count: 2 },
  { label: "Selesai (4)", count: 4 },
];

export default function OrderOnlinePage() {
  const location = useLocation();
  const [selectedStatus, setSelectedStatus] = useState("Semua (10)");
  const [highlightedOrderId, setHighlightedOrderId] = useState(null);
  const [highlightFade, setHighlightFade] = useState(false);
  const orderRef = useRef({});

  useEffect(() => {
    if (location.state?.selectedOrderId) {
      setHighlightedOrderId(location.state.selectedOrderId);
      setHighlightFade(false);

      // Scroll ke element dengan delay kecil
      setTimeout(() => {
        const element = orderRef.current[location.state.selectedOrderId];
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);

      const timer = setTimeout(() => {
        setHighlightFade(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state?.selectedOrderId]);

  // Fungsi filter berdasarkan status
  const getFilteredPesanan = () => {
    if (selectedStatus === "Semua (10)") {
      return pesananData;
    }

    if (selectedStatus === "Dibayar (4)") {
      return pesananData.filter((p) => p.status === "Dibayar");
    }

    if (selectedStatus === "Dikirim (2)") {
      return pesananData.filter((p) => p.status === "Dikirim");
    }

    if (selectedStatus === "Selesai (4)") {
      return pesananData.filter((p) => p.status === "Selesai");
    }

    return pesananData;
  };

  const filteredPesananData = getFilteredPesanan();

  return (
    <div className="flex bg-neutral-100 min-h-screen p-2 pt-14 md:pt-4">
      <main className="flex-1 p-4 md:p-5 lg:p-6">
        {/* Header */}
        <div className="mb-5 md:mb-5 lg:mb-6">
          <h1 className="text-xl md:text-lg lg:text-2xl font-bold text-neutral-900 mb-1">
            Pesanan Online
          </h1>
          <p className="text-xs md:text-xs lg:text-sm text-neutral-600">
            Kelola semua pesanan online dari pelanggan
          </p>
        </div>

        {/* Status Filter */}
        <div className="grid grid-cols-2 md:flex gap-2 md:gap-2 lg:gap-2 mb-5 md:mb-5 lg:mb-6">
          {statusFilters.map((filter, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedStatus(filter.label)}
              className={`px-2.5 md:px-2.5 lg:px-3 py-1.5 rounded-lg font-medium transition-all text-xs md:text-xs lg:text-xs flex-1 md:flex-none ${
                selectedStatus === filter.label
                  ? "bg-green-600 text-white"
                  : "bg-white border border-neutral-300 text-neutral-700 hover:border-neutral-400"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Pesanan Cards */}
        <div className="space-y-2.5 md:space-y-2.5 lg:space-y-3">
          {filteredPesananData.map((pesanan, idx) => (
            <div
              ref={(el) => (orderRef.current[pesanan.id] = el)}
              key={idx}
              className={`bg-white border rounded-lg md:rounded-lg lg:rounded-xl p-3.5 md:p-3.5 lg:p-4 transition-all duration-300 ${
                highlightedOrderId === pesanan.id && !highlightFade
                  ? "border-green-500 bg-green-50 shadow-lg ring-2 ring-green-200"
                  : "border-neutral-300"
              }`}
            >
              {/* Header Card */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2.5 md:gap-2.5 lg:gap-3 mb-2.5 md:mb-2.5 lg:mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <h3 className="font-bold text-neutral-900 mb-1 text-xs md:text-xs lg:text-sm wrap-break-words">
                      Pesanan #{pesanan.id} – {pesanan.nama}
                    </h3>
                    {highlightedOrderId === pesanan.id && !highlightFade && (
                      <span className="px-2 py-0.5 bg-green-500 text-white text-[10px] rounded-full font-semibold shrink-0 animate-pulse">
                        Dipilih
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs md:text-xs lg:text-xs text-neutral-600 mb-1.5">
                    <span>
                      {pesanan.jumlahItem} item • {pesanan.tanggal}
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5 text-xs md:text-xs lg:text-xs text-neutral-600 mb-2.5">
                    <FiMapPin
                      size={13}
                      className="text-red-500 shrink-0 mt-0.5"
                    />
                    <span className="wrap-break-words">{pesanan.alamat}</span>
                  </div>
                </div>

                {/* Button HANYA muncul kalau status Dibayar */}
                {pesanan.status === "Dibayar" && (
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full md:w-auto text-xs md:text-xs lg:text-xs py-1.5"
                  >
                    Kirim Pesanan
                  </Button>
                )}
              </div>

              {/* Payment & Status */}
              <div className="flex gap-2 mb-3 md:mb-2.5 lg:mb-3 flex-wrap">
                {pesanan.pembayaran && (
                  <span className="px-2 md:px-2 lg:px-2.5 py-0.5 md:py-0.5 lg:py-1 bg-green-100 text-green-700 rounded text-xs md:text-xs lg:text-xs font-medium">
                    {pesanan.pembayaran}
                  </span>
                )}
                {pesanan.bank && (
                  <span className="px-2 md:px-2 lg:px-2.5 py-0.5 md:py-0.5 lg:py-1 bg-yellow-100 text-yellow-700 rounded text-xs md:text-xs lg:text-xs font-medium">
                    {pesanan.bank}
                  </span>
                )}
                {pesanan.status === "Selesai" && (
                  <span className="px-2 md:px-2 lg:px-2.5 py-0.5 md:py-0.5 lg:py-1 bg-green-100 text-green-700 rounded text-xs md:text-xs lg:text-xs font-medium flex items-center gap-1">
                    <FiCheck size={13} />
                    <span>{pesanan.statusLabel}</span>
                  </span>
                )}
                {pesanan.status === "Dibayar" && (
                  <span className="px-2 md:px-2 lg:px-2.5 py-0.5 md:py-0.5 lg:py-1 bg-blue-100 text-blue-700 rounded text-xs md:text-xs lg:text-xs font-medium flex items-center gap-1">
                    <FiCheck size={13} />
                    <span>{pesanan.statusLabel}</span>
                  </span>
                )}
                {pesanan.status === "Dikirim" && (
                  <span className="px-2 md:px-2 lg:px-2.5 py-0.5 md:py-0.5 lg:py-1 bg-orange-100 text-orange-700 rounded text-xs md:text-xs lg:text-xs font-medium">
                    {pesanan.statusLabel}
                  </span>
                )}
              </div>

              {/* Detail Pesanan */}
              <div className="border-t border-neutral-200 pt-2.5 md:pt-2.5 lg:pt-3">
                <p className="text-xs md:text-xs lg:text-xs font-semibold text-neutral-700 mb-2">
                  Detail Pesanan:
                </p>
                <div className="space-y-1 md:space-y-1 lg:space-y-1.5 mb-2.5">
                  {pesanan.produk.map((prod, pidx) => (
                    <div
                      key={pidx}
                      className="flex justify-between text-xs md:text-xs lg:text-xs gap-2"
                    >
                      <span className="text-neutral-700 wrap-break-words">
                        {prod.nama} x{prod.qty}
                      </span>
                      <span className="text-neutral-900 font-medium whitespace-nowrap">
                        Rp {prod.harga.toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="flex justify-between text-xs md:text-xs lg:text-xs font-bold border-t border-neutral-200 pt-2">
                  <span className="text-neutral-900">Total</span>
                  <span className="text-neutral-900">
                    Rp {pesanan.total.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
