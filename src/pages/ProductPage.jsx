import { useLoaderData } from "react-router-dom";

export async function productLoader({ params }) {
  // contoh API publik untuk mock data; ganti dengan API-mu
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  if (!res.ok) throw new Response("Product not found", { status: 404 });
  return res.json();
}

export default function ProductPage() {
  const product = useLoaderData();

  return (
    <div>
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="mt-2">{product.description}</p>
      <p className="mt-4 font-bold">${product.price}</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Add to cart</button>
    </div>
  );
}
