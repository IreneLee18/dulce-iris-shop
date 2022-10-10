import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useLayoutEffect, useCallback, useContext } from "react";
import { DataContext } from "../../../utils/Context";
import Pagination from "../../../components/Pagination";
import { sweetAlert } from "../../../utils/SweetAlert";
import { getProductsData } from "../../../utils/API";
import currency from "../../../utils/Currency";
function Products() {
  const navigate = useNavigate();
  const { ID } = useParams();
  const { handleClickAddCart } = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [pageProduct, setPageProduct] = useState([]);
  const [searchProduct, setSearchProduct] = useState([]);
  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  useLayoutEffect(() => {
    setIsLoading(() => true);
  }, [ID]);
  useLayoutEffect(() => {
    getProductsData().then((res) => {
      const data = res.products.filter((item) => item.category === ID);
      if (ID !== "所有商品") {
        setCurrentPage(1);
        setProducts(data);
        if (data.length === 0) {
          sweetAlert(
            "error",
            `目前${ID}沒有商品`,
            `由於目前${ID}沒有商品，幫您跳會所有商品頁面＾＾`
          );
          navigate("/products/所有商品");
        }
      } else {
        setProducts(res.products);
      }
      setIsLoading(() => false);
    });
  }, [ID, navigate]);
  const handleChangePageData = useCallback(
    (current) => {
      const max = current * perPage;
      const min = max - perPage + 1;
      if (searchProduct.length !== 0) {
        setPageProduct(
          searchProduct.filter(
            (data, index) => index + 1 >= min && index + 1 <= max
          )
        );
        console.log("search");
      } else {
        setPageProduct(
          products.filter((data, index) => index + 1 >= min && index + 1 <= max)
        );
        console.log("all");
      }
    },
    [perPage, products, searchProduct]
  );
  useLayoutEffect(() => {
    if (!isLoading) {
      handleChangePageData(currentPage);
    }
  }, [isLoading, handleChangePageData, currentPage]);
  const handleClickAddHeart = (e) => {
    console.log("add");
  };
  return (
    <>
      <div className="user-product">
        <div className="background-image"></div>
        <section>
          <ul className="nav container">
            <li>
              <Link to="/">首頁</Link>
            </li>
            <li>
              <span className="material-symbols-outlined">chevron_right</span>
            </li>
            <li>
              <Link to="/products/所有商品">所有商品</Link>
            </li>
            {ID === "所有商品" ? null : (
              <>
                <li>
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </li>
                <li>{ID}</li>
              </>
            )}
          </ul>
        </section>
        <section>
          <div className="user-product-group container">
            {isLoading ? (
              <div className="isLoading">
                <p>讀取資料中請稍候...</p>
              </div>
            ) : (
              <>
                <ul>
                  {pageProduct.map((item) => (
                    <li className="card" key={item.id}>
                      <div
                        className="card-header"
                        onClick={() => navigate(`/product/detail/${item.id}`)}
                      >
                        <div className="card-category">
                          <span className="material-symbols-outlined">
                            sell
                          </span>
                          {item.category}
                        </div>
                        {item.price !== item.origin_price ? (
                          <div className="card-onSale">SALE</div>
                        ) : null}
                        <img src={item.imageUrl} alt={item.id} />
                        <div className="viewDetail"></div>
                      </div>
                      <div className="card-body">
                        <h2 className="card-title">{item.title}</h2>
                        <div className="card-price">
                          {item.price !== item.origin_price ? (
                            <>
                              <span className="origin_price">
                                NT${currency(item.origin_price)}
                              </span>
                              <span className="price">
                                NT${currency(item.price)}
                              </span>
                            </>
                          ) : (
                            <span>NT${currency(item.price)}</span>
                          )}
                        </div>
                      </div>
                      <div className="card-footer">
                        <span
                          id={item.id}
                          className="material-symbols-outlined"
                          onClick={handleClickAddHeart}
                        >
                          heart_plus
                        </span>
                        <span
                          id={item.id}
                          className="material-icons-outlined isLike"
                        >
                          favorite
                        </span>
                        <span
                          id={item.id}
                          className="material-symbols-outlined"
                          onClick={handleClickAddCart}
                        >
                          add_shopping_cart
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <section className="user-product-pagination">
                  <Pagination
                    perPage={perPage}
                    allData={products}
                    searchData={searchProduct}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
                </section>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default Products;
