import { client } from "@/sanity/lib/client";
interface DataItem {
  id: number;
  title: string;
  image: string;
  category:string,
  description:string,
  _type: string;
  _id: string;
}

export default async function CreateData() {
  // data transfer to sanity studio function
  async function createProducts() {
    const res = await fetch(
      "https://677fb0050476123f76a7976e.mockapi.io/users"
    );
    const data: DataItem[] = await res.json();
console.log(data);

    // Wrap the map inside Promise.all to handle all async calls concurrently
    await Promise.all(
      data.map(async (item) => {
        // For image
        const res = await fetch(item.image);
        const arrayBuffer = await res.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const asset = await client.assets.upload("image", buffer); 

        const sanityData = { 
          ...item,
          image: {
            _type: "image",
            asset: {
              _ref: asset._id,
              _type: "reference",
            }, 
          },
          _id: item.id.toString(),
          _type: "product",
        };

        return client.createOrReplace(sanityData);
      })
    );
  }

  return <></>;
}
