import { useState, useLayoutEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../../../utils/Context";
import { getProductsData } from "../../../utils/API";
import currency from "../../../utils/Currency";
import Skeleton from "@mui/material/Skeleton";
import { ScrollToTop } from "../../../utils/Scroll";

function ProductDetail() {
  const navigate = useNavigate();
  const {
    handleClickAddCart,
    qty,
    setQty,
    heartID,
    handleClickAddHeart,
    handleClickDeleteHeart,
  } = useContext(DataContext);
  const { ID } = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [suggestionProduct, setSuggestionProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useLayoutEffect(() => {
    getProductsData().then((res) => {
      const data = res.products.filter((item) => item.id === ID);
      setProductDetail(...data);
      const sameCategory = res.products.filter(
        (item) =>
          item.category === productDetail.category &&
          item.title !== productDetail.title
      );
      setSuggestionProduct(sameCategory);
      setIsLoading(() => false);
    });
  }, [ID, productDetail.category, productDetail.title]);
  return (
    <>
      <div className="user-productDetail container">
        {isLoading ? (
          <>
            <ul className="nav">
              <li>
                <Link to="/">首頁</Link>
              </li>
              <li>
                <span className="material-symbols-outlined">chevron_right</span>
              </li>
              <li>
                <Link to="/products/所有商品">所有商品</Link>
              </li>
              <li>
                <span className="material-symbols-outlined">chevron_right</span>
              </li>
              <li>
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={80} />
              </li>
              <li>
                <span className="material-symbols-outlined">chevron_right</span>
              </li>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={80} />
            </ul>
            <div className="user-productDetail-item">
              <div className="sm-header header">
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "6rem" }}
                  width={320}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "2rem" }}
                  width={100}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "2rem" }}
                  width={100}
                />
              </div>
              <div className="user-productDetail-images">
                <div className="user-productDetail-images-show">
                  <Skeleton variant="rectangular" height={700} />
                </div>
                <ul className="user-productDetail-images-group">
                  <li>
                    <Skeleton variant="rectangular" height={100} />
                  </li>
                  <li>
                    <Skeleton variant="rectangular" height={100} />
                  </li>
                  <li>
                    <Skeleton variant="rectangular" height={100} />
                  </li>
                </ul>
              </div>
              <div className="user-productDetail-descriptionInfo">
                <div className="header">
                  <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "5px" }}>
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "2rem" }}
                        width={100}
                      />
                    </div>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "2rem" }}
                      width={100}
                    />
                  </div>

                  <ul className="price-group">
                    <li>
                      {" "}
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "2rem" }}
                        width={100}
                      />
                    </li>
                    <li>
                      {" "}
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "2rem" }}
                        width={100}
                      />
                    </li>
                  </ul>
                </div>
                <div className="body">
                  <p>
                    <Skeleton variant="rectangular" height={100} />
                  </p>
                </div>
                <div className="footer">
                  <div style={{ marginBottom: "10px" }}>
                    <Skeleton variant="rectangular" height={50} />
                  </div>
                  <Skeleton variant="rectangular" height={50} />
                  <div className="flex-jcsb" style={{ marginTop: "10px" }}>
                    <Skeleton variant="rectangular" height={50} width={100} />
                    <Skeleton variant="rectangular" height={50} width={100} />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <section>
              <ul className="nav">
                <li>
                  <Link to="/">首頁</Link>
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </li>
                <li>
                  <Link to="/products/所有商品">所有商品</Link>
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </li>
                <li>
                  <Link to={`/products/${productDetail.category}`}>
                    {productDetail.category}
                  </Link>
                </li>
                <li>
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </li>
                <li>{productDetail.title}</li>
              </ul>
            </section>
            <section>
              <div className="user-productDetail-item">
                <div className="sm-header header">
                  <h1 className="title">{productDetail.title}</h1>
                  <span className="category">{productDetail.category}</span>
                  {productDetail.price !== productDetail.origin_price ? (
                    <span className="onSale">特價中</span>
                  ) : null}
                  <ul className="price-group">
                    {productDetail.price !== productDetail.origin_price ? (
                      <>
                        <li>NT${currency(productDetail.price)}</li>
                        <li className="price">
                          NT${currency(productDetail.origin_price)}
                        </li>
                      </>
                    ) : (
                      <li>NT${currency(productDetail.origin_price)}</li>
                    )}
                    <li>({productDetail.unit})</li>
                  </ul>
                </div>
                <div className="user-productDetail-images">
                  <div className="user-productDetail-images-show">
                    <img src={productDetail.imageUrl} alt="" />
                  </div>
                  <ul className="user-productDetail-images-group">
                    {productDetail.imagesUrl !== undefined &&
                      productDetail.imagesUrl.map((item) => (
                        <li key={item.id}>
                          <img src={item.imageUrl} alt={item.id} />
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="user-productDetail-descriptionInfo">
                  <div className="header">
                    <h1 className="title">{productDetail.title}</h1>
                    <span className="category">{productDetail.category}</span>
                    {productDetail.price !== productDetail.origin_price ? (
                      <span className="onSale">特價中</span>
                    ) : null}
                    <ul className="price-group">
                      {productDetail.price !== productDetail.origin_price ? (
                        <>
                          <li>NT${currency(productDetail.price)}</li>
                          <li className="price">
                            NT${currency(productDetail.origin_price)}
                          </li>
                        </>
                      ) : (
                        <li>NT${currency(productDetail.price)}</li>
                      )}
                      <li>({productDetail.unit})</li>
                    </ul>
                  </div>
                  <div className="body">
                    <p>{productDetail.description}</p>
                  </div>
                  <div className="footer">
                    <div className="cart">
                      <label className="quantity">
                        <button
                          onClick={() =>
                            setQty((state) =>
                              Number(state) === 1
                                ? Number(state)
                                : Number(state) - 1
                            )
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={qty}
                          onChange={(e) => setQty(Number(qty))}
                        />
                        <button
                          onClick={() => setQty((state) => Number(state) + 1)}
                        >
                          +
                        </button>
                      </label>
                      <button
                        className="addCart"
                        id={ID}
                        onClick={handleClickAddCart}
                      >
                        加入購物車
                      </button>
                    </div>
                    <div className="icon-btnGroup">
                      {!heartID.includes(ID) ? (
                        <div
                          className="like"
                          id={ID}
                          onClick={handleClickAddHeart}
                        >
                          <span className="material-symbols-outlined" id={ID}>
                            heart_plus
                          </span>
                          <span id={ID}>LIKE</span>
                        </div>
                      ) : (
                        <div
                          className="like"
                          id={ID}
                          onClick={handleClickDeleteHeart}
                        >
                          <span
                            className="material-icons-outlined"
                            id={ID}
                            style={{ color: "#ff5f5f" }}
                          >
                            favorite
                          </span>
                          <span id={ID}>LIKE</span>
                        </div>
                      )}
                      <div className="share">
                        <span className="material-symbols-outlined">share</span>
                        <span>SHARE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <ul className="user-productDetail-info">
                {productDetail.descriptionInfo !== undefined ? (
                  <li>
                    <ul>
                      {productDetail.descriptionInfo.map((item) => (
                        <li key={item.id}>
                          <h2>{item.title}</h2>
                          <p>{item.content}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : null}
                <li>
                  <h2>購買資訊</h2>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Modi, illum veritatis labore provident nulla delectus
                    ducimus pariatur vel nam facilis quos, necessitatibus
                    quisquam voluptates a voluptate accusantium impedit dolor
                    alias maiores dolorem libero harum, ratione quam. Sunt
                    veniam ratione, nemo quasi, nobis adipisci delectus fugiat
                    repellat nostrum, perspiciatis natus. Mollitia.
                  </p>
                </li>
                <li className="suggestion">
                  <h2>推薦商品</h2>
                  <ul>
                    {suggestionProduct.map((item) => (
                      <li
                        className="card"
                        key={item.id}
                        onClick={() => navigate(`/product/detail/${item.id}`)}
                      >
                        <div className="otherProductDetail"></div>
                        <img src={item.imageUrl} alt={item.id} />
                        <p className="card-title">{item.title}</p>
                        {item.price !== item.origin_price ? (
                          <p className="card-price">
                            NT${currency(item.origin_price)}
                          </p>
                        ) : (
                          <p className="card-price">
                            NT${currency(item.price)}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </section>
            <div>
              <ScrollToTop />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProductDetail;
