import { useState } from "react";

import "./App.css";
import Product from "./Product";
import Mailbox from "./Mailbox";
import Books from "./Book";
import Alert from "./Alert";
import Button from "./Button";

function App() {
  const [count, setCount] = useState(0);

  const techName = "React";
  const imgUrl =
    "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=640";

  const handleClick = () => {
    alert("click");
  };

  const handleCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      {techName}
      <button onClick={handleCount}>count is {count}</button>

      <img src={imgUrl} alt="Man, field and a mountain" width="640" />
      <div>
        <h1>Products</h1>
        <Product
          name="dfsfsddf"
          imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=640"
          price={10.99}
        />
        <Product
          name="fadfgsdgsd"
          imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?w=640"
          price={14.29}
        />
      </div>

      <div>
        <Mailbox username="fadfgsdgsd" messages="" />
      </div>

      <div>
        <Books />
      </div>

      <>
        <Alert />
        <Alert type="error" />
        <Alert type="success" />
      </>

      <>
        <Button onClick={handleClick} variant="primary" text="Login" />
        <Button variant="secondary" text="Follow" />
        <Button
          onClick={() => {
            alert("click");
          }}
          text="dddd"
        />
      </>
    </>
  );
}

export default App;
