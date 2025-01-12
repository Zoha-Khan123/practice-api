import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

async function getData(id: string) {
  const query = `
    *[_type == "product" && _id == $id][0] {
      title,
       image {
          asset -> {
            _id,
            url
          }
        },
      id
    }
  `;
  const product = await client.fetch(query, { id });
  return product;
}

async function fetchProducts() {
  const query = `
    *[_type == "product"] {
      title,
      image {
        asset -> {
          _id,
          url
        }
      },
      id
    }
  `;

  const products = await client.fetch(query);
  return products;
}


export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  
  const products = await fetchProducts();
  return (


    <div>
      <h1>Product</h1>
      <p>Title: {data.title}</p>
      <p>ID: {data.id}</p>
      <img src={urlFor(data.image).url()} alt={data.title} />


      // Related Products
      {products.map((item:any) => (
        <Link href={`../product/${item.id}`} key={item.id}>
          <div>
            <h1>{item.id}</h1>
            <h2>{item.title}</h2>
            <img height={200} width={200} src={urlFor(item.image).url()} alt={item.title} />
          </div>
        </Link>
      ))}
      </div>
  );
}
