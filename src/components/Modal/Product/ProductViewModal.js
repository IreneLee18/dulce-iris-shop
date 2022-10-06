import { forwardRef, useImperativeHandle, useState } from "react";
function ProductViewModal({ productData }, ref) {
  // open & close Modal
  const [modalState, setModalState] = useState(false);
  useImperativeHandle(ref, () => ({
    openViewModal: () => {
      setModalState(true);
    },
  }));

  return (
    <div className="modal" style={modalState ? {} : { top: "-1500px" }}>
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">產品詳細資訊</h1>
          <button
            className="material-symbols-outlined"
            onClick={() => setModalState(false)}
          >
            close
          </button>
        </div>
        <div className="modal-body">
          {productData === null ? (
            <p className="loading">...Loading</p>
          ) : (
            <>
              {" "}
              <ul className="item-group">
                {productData.imageUrl !== "" ? (
                  <li className="item">
                    <div className="image">
                      <img src={productData.imageUrl} alt="mainImage" />
                    </div>
                  </li>
                ) : null}
                <li className="item">
                  <div className="title">分類：</div>
                  <div>{productData.category}</div>
                </li>
                <li className="item">
                  <div className="title">名稱：</div>
                  <div>{productData.title}</div>
                </li>
                <li className="item">
                  <div className="title">原價：</div>
                  <div>NT${productData.price}</div>
                </li>
                <li className="item">
                  <div className="title">特價：</div>
                  <div>NT${productData.origin_price}</div>
                </li>
                <li className="item">
                  <div className="title">單位：</div>
                  <div>{productData.unit}</div>
                </li>
                <li className="item">
                  <div className="title">啟用：</div>
                  <div>
                    {productData.is_enabled ? (
                      <span>YES</span>
                    ) : (
                      <span>NO</span>
                    )}
                  </div>
                </li>
                {productData.imagesUrl !== undefined ? (
                  <li className="item">
                    <div className="title">照片們：</div>
                    <div className="image-group">
                      {productData.imagesUrl.map((item) => (
                        <img src={item} alt={item} />
                      ))}
                    </div>
                  </li>
                ) : null}
              </ul>
              <ul className="item-group">
                {productData.description !== "" ? (
                  <li className="item">
                    <div className="description-title">產品描述：</div>
                    <div>{productData.description}</div>
                  </li>
                ) : null}
                {productData.descriptionInfo !== undefined ? (
                  <li className="item">
                    <div className="description-title">產品資訊：</div>
                    <ul>
                      {productData.descriptionInfo.map((item) => (
                        <li className="info-item-group">
                          <div className="info-title">{item.title}：</div>
                          <div>{item.content}</div>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : null}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default forwardRef(ProductViewModal);
