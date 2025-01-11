import Image from "next/image";

interface DataItem {
  id: string;
  title: string;
  image: any;
}

export default async function Home() {
  const res = await fetch("https://677fb0050476123f76a7976e.mockapi.io/users");
  const data: DataItem[] = await res.json();
  console.log(data);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.map((items) => {
          return (
            <div
              key={items.id}
              className="border border-gray-300 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-center mb-4">
                <p className="text-gray-500 text-sm">{items.id}</p>
              </div>
              <div className="flex justify-center">
                <Image
                  src={items.image}
                  alt="image"
                  width={300}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
              <div>
                <h1 className="font-semibold text-lg text-gray-800 text-center">{items.title}</h1>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
