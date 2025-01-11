'use client'
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  title: string;
  image: {
    asset: {
      url: string;
    };
  };
  id: number;
}

export default function FetchData() {
    const [products, setProducts] = useState<Product[]>([]); // State to store products

  // Fetch products from Sanity
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
    setProducts(products); // Set the fetched products to state
  }

    // Fetch products when the component mounts
    useEffect(() => {
        fetchProducts();
      }, []); // Empty dependency array means it will run only once after the first render
    

  return (
    <div>
      <Link href={`/products`}>
      {
        products.map((item)=>{
            return(
                <div key={item.id}>
                    <h1>{item.id}</h1>
                    <h2>{item.title}</h2>
                    <img src={urlFor(item.image).url()} alt={item.title} />
                </div>
            )
        })
      }
      </Link>
    </div>
  );
}
