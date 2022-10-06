// import TableFrom from '../../components/TableFrom'
import ProductModal from "../../components/Modal/Product/ProductModal";
import ProductViewModal from "../../components/Modal/Product/ProductViewModal";
import { getProduct, deleteProduct, getProductData } from "../../utils/API";
import { useEffect, useRef, useState } from "react";
function Product() {
  const productModalRef = useRef();
  const productViewModalRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [allProduct, setAllProduct] = useState(null);
  const product = useRef([]);
  // 存放要開啟的product data
  const [productData, setProductData] = useState(null);

  const handleClickOpenModal = (e) => {
    const { id } = e.target;
    const edit = id.substring(0, 4);
    if (id === "add") {
      productModalRef.current.openModal();
      setProductData({
        title: "",
        category: "DEFAULT",
        unit: "",
        price: 0,
        origin_price: 0,
        description: "",
        descriptionInfo: [],
        imageUrl:'',
        imagesUrl:[]
      });
    } else if (edit === "edit") {
      const editID = id.substring(4, id.length);
      allProduct.forEach((item) => {
        if (item.id === editID) {
          setProductData(item);
        }
      });
      productModalRef.current.openModal(edit);
    } else {
      productViewModalRef.current.openViewModal();
      console.log(id);
      allProduct.forEach((item) => {
        if (item.id === id) {
          setProductData(item);
        }
      });
    }
  };
  useEffect(() => {
    getProduct(1).then((res) => {
      console.log(res);
      setAllProduct(res.products);
      product.current = res.products;
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    if (!isLoading) {
      setAllProduct((state) => [...state, product.current]);
      console.log(product.current);
    }
  }, [isLoading, product]);

  const handleClickDelete = (e) => {
    deleteProduct(e.target.id).then((res) => console.log(res));
  };
  return (
    <>
      {isLoading ? null : (
        <>
          <div className="dashbord-product container">
            <section>
              <div className="search">
                <select name="" id="">
                  <option value="類別">類別</option>
                  <option value="名稱">名稱</option>
                  <option value="ID">ID</option>
                  <option value="啟用">啟用</option>
                </select>
                <label htmlFor="search">
                  <input type="text" id="search" placeholder="SEARCH" />
                  <button className="material-symbols-outlined">search</button>
                </label>
              </div>
            </section>
            <section>
              <ul className="product-item">
                {allProduct.map((item) => (
                  <li className="card">
                    <div className="card-header">
                      <img src={item.imageUrl} alt="..." />
                      <div className="category">{item.category}</div>
                      <div className="is_enabled">
                        {item.is_enabled ? (
                          <span
                            className="material-icons-outlined"
                            style={{ color: "#99dd00" }}
                          >
                            check_circle
                          </span>
                        ) : (
                          <span
                            className="material-icons-outlined"
                            style={{ color: "#ff5f5f" }}
                          >
                            cancel
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <h5 className="card-id">
                        <div className="title">ID：</div>
                        <div>{item.id}</div>
                      </h5>
                      <div className="card-price">
                        <div className="title">價格：</div>
                        <div>
                          {item.price === item.origin_price ? (
                            <span>NT${item.price}</span>
                          ) : (
                            <>
                              <span>NT${item.origin_price}</span>
                              <span className="haveDiscountPrice">
                                NT${item.price}
                              </span>
                            </>
                          )}
                          <span> / {item.unit}</span>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button id={item.id} onClick={handleClickOpenModal}>
                        檢視
                      </button>
                      <button
                        id={`edit${item.id}`}
                        onClick={handleClickOpenModal}
                      >
                        編輯
                      </button>
                      <button id={item.id} onClick={handleClickDelete}>
                        刪除
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <div>
              <button
                className="dashbord-add material-symbols-outlined"
                id="add"
                onClick={handleClickOpenModal}
              >
                add_circle
              </button>
              <button className="scroll-top material-symbols-outlined">
                assistant_navigation
              </button>
            </div>
          </div>
          <section className="productViewModal">
            <ProductViewModal
              productData={productData}
              ref={productViewModalRef}
            />
          </section>
          <section className="productAddModal">
            <ProductModal
              productData={productData}
              setProductData={setProductData}
              ref={productModalRef}
            />
          </section>
        </>
      )}
    </>
  );
}

export default Product;
