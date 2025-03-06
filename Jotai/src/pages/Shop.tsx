import { useAtom } from "jotai";
import { cartAtom, totalAtom } from "../store/atom/atom";

type Item = {
    itemName : string,
    price : number
}

export default function Shop() {
  const [cartItem, setCartItem] = useAtom(cartAtom);
  const [total] = useAtom(totalAtom);

  const addItem = (item : Item) => {
    setCartItem((prevItem) => [...prevItem, item])
  }
  const removeItem = (idx : number) => {
    setCartItem((prevItem) => prevItem.filter((_,index) => index != idx))
  }

  return (
    <div className="card">
      <h2>Shopping Cart</h2>
      <ul>{cartItem?.map((item, index) => {
        return <li key={index}>
            {" "}
            {item.itemName} -{item.price}
            <button onClick={() => removeItem(index)}>Remove Item</button>
        </li>
      })}</ul>
      <h3>Total : {total}</h3>
      <button onClick={() => addItem({itemName : "Apple", price : 100})}>Add Apple</button>
      <button onClick={() => addItem({itemName : "Banana", price : 20})}>Add Banana</button>
    </div>
  );
}
