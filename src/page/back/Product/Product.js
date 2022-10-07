import ProductViewModal from "../../../components/Modal/Product/ProductViewModal";
import Loading from "../../../components/Loading";
import DashboardSearch from "../../../components/DashboardSearch";
import Pagination from "../../../components/Pagination";
import { getProductAll, deleteProduct } from "../../../utils/API";
import { sweetAlert } from "../../../utils/SweetAlert";
import { dashboardProductSearch } from "../../../utils/Data";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
function Product() {
  const navigate = useNavigate();
  const productViewModalRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  // 儲存最原始所有資料
  const allProduct = useRef([]);
  // 儲存篩選資料
  const [searchProduct,setSearchProduct] = useState([]);
  // 儲存畫面資料
  const [pageData, setPageData] = useState([]);
  // 目前頁碼
  const [currentPage, setCurrentPage] = useState(1);
  const perPageData = useRef(8);
  // 存放要開啟的product data
  const [productData, setProductData] = useState(null);
  const handleClickOpenModal = (e) => {
    const { id } = e.target;
    productViewModalRef.current.openViewModal();
    allProduct.forEach((item) => {
      if (item.id === id) {
        setProductData(item);
      }
    });
  };
  // change pageData
  const handleChangePageData = useCallback(
    (current) => {
      const max = current * perPageData.current;
      const min = max - perPageData.current + 1;
      if(searchProduct.length===0){
        setPageData(
          allProduct.current.filter(
            (data, index) => index + 1 >= min && index + 1 <= max
          )
        );
      }else{
        setPageData(
          searchProduct.filter(
            (data, index) => index + 1 >= min && index + 1 <= max
          )
        );
      }
    },
    [searchProduct]
  );
  useLayoutEffect(() => {
    getProductAll().then(async (res) => {
      try {
        const data = [];
        Object.entries(res.products).forEach((item) => data.push(item[1]));
        allProduct.current = data;
        await setIsLoading(() => false);
      } catch (err) {
        console.error(err);
      }
    });
  }, [pageData, currentPage, handleChangePageData]);
  useLayoutEffect(() => {
    if (!isLoading) {
      handleChangePageData(currentPage);
    }
  }, [isLoading, handleChangePageData, currentPage]);

  const handleClickDelete = (e) => {
    deleteProduct(e.target.id).then((res) => {
      if (res.success) {
        sweetAlert("success", "刪除成功");
        setPageData(pageData.filter((item) => item.id !== e.target.id));
      }
    });
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="dashboard-product container">
            <section>
              <DashboardSearch
                searchGroup={dashboardProductSearch}
                data={allProduct.current}
                setPageData={setSearchProduct}
              />
            </section>
            <section>
              <ul className="product-item">
                {pageData.map((item) => (
                  <li className="card" key={item.id}>
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
                        <div className="title">
                          ID
                          <span>：</span>
                        </div>
                        <div>{item.id}</div>
                      </h5>
                      <div className="card-price">
                        <div className="title">
                          價格<span>：</span>
                        </div>
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
                      <div>
                        <button id={item.id} onClick={handleClickOpenModal}>
                          檢視
                        </button>
                      </div>
                      <div>
                        <button
                          id={item.id}
                          onClick={() =>
                            navigate(`/back/dashboard/product/${item.id}`)
                          }
                        >
                          編輯
                        </button>
                      </div>
                      <div>
                        <button id={item.id} onClick={handleClickDelete}>
                          刪除
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
            <section className="dashboard-pagination">
              <Pagination
                perPage={perPageData.current}
                data={allProduct.current}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </section>
            <div>
              <button
                className="dashboard-add material-symbols-outlined"
                id="add"
                onClick={() => navigate("/back/dashboard/product/add")}
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
        </>
      )}
    </>
  );
}

export default Product;
