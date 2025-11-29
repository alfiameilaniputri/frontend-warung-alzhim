import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import Button from "../../components/Button";
import ProductModal from "../../components/ProductModal";

export default function ManageProducts() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Indomie Goreng Original",
      category: "Makanan",
      stock: 100,
      price: 4000,
      images: [{ id: "https://picsum.photos/id/101/200/200", file: null }],
    },
    {
      id: 2,
      name: "Aqua 600ml",
      category: "Minuman",
      stock: 50,
      price: 3000,
      images: [{ id: "https://picsum.photos/id/20/200/200", file: null }],
    },
    {
      id: 3,
      name: "Sabun Lifebuoy",
      category: "Kebersihan",
      stock: 50,
      price: 5000,
      images: [{ id: "https://picsum.photos/id/29/200/200", file: null }],
    },
    {
      id: 4,
      name: "Telur 1/4 Kg",
      category: "Sembako",
      stock: 50,
      price: 8000,
      images: [{ id: "https://picsum.photos/id/102/200/200", file: null }],
    },
  ]);

  // MODAL STATES
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selected, setSelected] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ADD PRODUCT
  const handleAdd = (data) => {
    const newProduct = {
      id: Date.now(),
      name: data.name,
      category: data.category,
      stock: Number(data.stock),
      price: Number(data.price),
      images: data.images,
    };
    setProducts([...products, newProduct]);
    setOpenAdd(false);
  };

  // OPEN EDIT MODAL
  const openEditModal = (item) => {
    setSelected(item);
    setOpenEdit(true);
  };

  // SUBMIT EDIT
  const handleEdit = (data) => {
    const updated = products.map((p) =>
      p.id === selected.id
        ? {
            ...p,
            name: data.name,
            category: data.category,
            stock: Number(data.stock),
            price: Number(data.price),
            images: data.images,
          }
        : p
    );
    setProducts(updated);
    setOpenEdit(false);
  };

  // OPEN DELETE
  const openDeleteModal = (item) => {
    setDeleteTarget(item);
    setOpenDelete(true);
  };

  // SUBMIT DELETE
  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== deleteTarget.id));
    setOpenDelete(false);
  };

  return (
    <div className="p-2 pt-14 md:pt-4">
      {/* PAGE TITLE */}
      <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4">
        Kelola Produk
      </h1>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 sm:p-5 md:p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4 flex-nowrap">
  <h2 className="text-sm md:text-lg font-semibold text-neutral-800 truncate">
    Daftar Produk
  </h2>

  <Button
    variant="primary"
    size="sm"
    className="shrink-0 flex items-center gap-1 px-2 py-1 text-xs lg:text-sm"
    onClick={() => setOpenAdd(true)}
  >
    <FiPlus size={16} />
    Tambah Produk
  </Button>
</div>


        {/* PRODUCT LIST */}
        <div className="flex flex-col gap-3">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
            >
              {/* LEFT SIDE: IMAGE + INFO */}
              <div className="flex flex-1 items-start sm:items-center gap-3 min-w-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden bg-[#f9f9f9] shrink-0">
                  <img
                    src={item.images[0]?.id}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base truncate">
                    {item.name}
                  </p>

                  {/* CATEGORY + STOCK + PRICE */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-1 text-xs sm:text-sm">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-md">
                      {item.category}
                    </span>

                    {/* STOCK + PRICE HORIZONTAL */}
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500">
                        Stok: {item.stock} Pcs
                      </span>
                      <span className="text-neutral-400">•</span>
                      <span className="text-neutral-600">
                        Rp {item.price.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT BUTTONS: RESPONSIVE HORIZONTAL */}
              <div className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-500 hover:bg-green-50 text-xs px-3 py-1 flex-1 sm:flex-none"
                  onClick={() => openEditModal(item)}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  className="text-xs px-3 py-1 flex-1 sm:flex-none"
                  onClick={() => openDeleteModal(item)}
                >
                  Hapus
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD MODAL */}
      <ProductModal
        open={openAdd}
        mode="add"
        onClose={() => setOpenAdd(false)}
        onSubmit={handleAdd}
      />

      {/* EDIT MODAL */}
      <ProductModal
        open={openEdit}
        mode="edit"
        initialData={selected}
        onClose={() => setOpenEdit(false)}
        onSubmit={handleEdit}
      />

      {/* DELETE MODAL */}
      {openDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-5 rounded-xl w-full max-w-sm shadow-lg">
            <h3 className="text-lg font-semibold">Hapus Produk</h3>

            <div className="flex items-center gap-3 mt-4">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-neutral-200">
                <img
                  src={deleteTarget?.images?.[0]?.id}
                  alt={deleteTarget?.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <p className="font-semibold truncate">{deleteTarget?.name}</p>
                <p className="text-sm text-neutral-500">
                  {deleteTarget?.category}
                </p>
              </div>
            </div>

            <p className="text-neutral-600 mt-4 text-sm leading-relaxed">
              Yakin ingin menghapus produk{" "}
              <span className="font-semibold text-red-600">
                "{deleteTarget?.name}"
              </span>
              ?
            </p>

            <div className="flex justify-end gap-2 mt-6 flex-wrap sm:flex-nowrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenDelete(false)}
              >
                Batal
              </Button>

              <Button variant="danger" size="sm" onClick={handleDelete}>
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
