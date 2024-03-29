import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { fakeProduct } from "../../data/fakeProduct";
import LeonParrillero from "../LeonParrillero/LeonParrillero";

import { db } from "../../data/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function ItemDetailContainer() {
  const [item, setItem] = useState(null);
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);


    const productoRef = doc(db, "products", itemId);

    getDoc(productoRef).then((documento) => {
      if (documento.exists()) {
        setItem({ id: documento.id, ...documento.data() })

        setLoading(false);

      } else {
        setItem(fakeProduct);
        setLoading(false);
      }
    }).catch((error) => {
      console.error("Error obteniendo el producto:", error);


    });


  }, [itemId]);




  const greeting = item ? item.nombre : "RR's Grill Store";
  const message = item
    ? "Detalles del producto:"
    : "El producto que buscas ya no está disponible";

  return (
    <main>

      {loading ? (
        <>
          <LeonParrillero />
        </>
      ) : (
        item && <ItemDetail producto={item} greeting={greeting} message={message} />
      )}


    </main>
  );

}
