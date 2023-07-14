import React, { useState, useEffect } from "react";
import { ProductInterface } from "./widgetProductList.interface";
import "./styles.scss";
import { Sidebar } from "../../components/Sidebar";

const WidgetProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductInterface[]>();

  const getProducts = async () => {
    const res = await fetch("http://localhost:3001/products")
      .then((response) => response)
      .then((data) => data);
    setProducts(await res.json());
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="card__wrapper d-flex justify-content-center gap-4">
        {products?.map((product) => (
          <div key={product.id} className="card col-md-2">
            <div className="card__image">
              <img src={product.productImg} alt={product.title} />
            </div>
            <div className="card__title">
              <h3>{product.title}</h3>
              <h5 className="card__manufacturer">{product.manufacturer}</h5>
            </div>
            <div className="card__price">{product.price + "$"}</div>
            <div className="card__availability">
              {product.available ? (
                <>
                  Available
                  <img
                    src="https://www.freeiconspng.com/uploads/green-circle-icon-28.png"
                    alt=""
                    width={20}
                    style={{ margin: "0px 0px 2px 5px" }}
                  />
                </>
              ) : (
                <>
                  Out of stock
                  <img
                    src="https://www.freeiconspng.com/uploads/red-circle-icon-1.png"
                    alt=""
                    width={20}
                    style={{ margin: "0px 0px 2px 5px" }}
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetProductList;
