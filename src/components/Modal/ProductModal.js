import { forwardRef,useState, useImperativeHandle } from "react";
const ProductModal = (props, ref) => {
  const [modalState, setModalState] = useState(false);
  useImperativeHandle(ref, () => ({
    openModal: () => setModalState(true),
  }));

  return (
    <div className="modal" style={modalState?{}:{top:'-1500px'}}>
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">新增產品</h1>
          <button className="material-symbols-outlined" onClick={()=>setModalState(false)}>close</button>
        </div>
        <div className="modal-body">
          <div className="modal-info">
            <div className="modal-info-category">
              <label htmlFor="category">
                <span>分類</span>
                <select name="category" id="category">
                  <option value="1">1</option>
                </select>
              </label>
              <label htmlFor="newCategory">
                <span>新增分類</span>
                <button>新增分類</button>
                {/* <input type="text" placeholder="新增分類" /> */}
              </label>
            </div>
            <div className="modal-info-title">
              <label htmlFor="title">
                <span>名稱</span>
                <input type="text" id="title" placeholder="請輸入名稱" />
              </label>
              <label htmlFor="unit">
                <span>單位</span>
                <input type="text" />
              </label>
              <label className="enable" htmlFor="enable">
                <span>啟用</span>
                <input type="checkbox" />
              </label>
            </div>
            <div className="modal-info-price">
              <label htmlFor="price">
                <span>原價</span>
                <input id="price" type="number" />
              </label>
              <label htmlFor="origin_price">
                <span>特價</span>
                <input id="origin_price" type="number" />
              </label>
            </div>
            <div className="modal-info-description">
              <label htmlFor="description">
                <span>產品描述</span>
                <textarea id="description" rows="5" />
              </label>
            </div>
          </div>
          <div className="modal-photo">
            <ul>
              <li>
                <label htmlFor="src1">
                  <span>上傳圖片</span>
                  <input type="text" id="src1" placeholder="請輸入網址" />
                </label>
                <label className="file" htmlFor="photo1">
                  <div></div>
                  <i className="material-symbols-outlined">image</i>
                  <input type="file" id="photo2" />
                </label>
              </li>
              <li>
                <label htmlFor="src2">
                  <span>上傳圖片</span>
                  <input type="text" id="src2" placeholder="請輸入網址" />
                </label>
                <label className="file" htmlFor="photo2">
                  <div></div>
                  <i className="material-symbols-outlined">image</i>
                  <input type="file" id="photo2" />
                </label>
              </li>
              <li>
                <label htmlFor="src3">
                  <span>上傳圖片</span>
                  <input type="text" id="src3" placeholder="請輸入網址" />
                </label>
                <label className="file" htmlFor="photo3">
                  <div></div>
                  <i className="material-symbols-outlined">image</i>
                  <input type="file" id="photo3" />
                </label>
              </li>
              <li>
                <label htmlFor="src4">
                  <span>上傳圖片</span>
                  <input type="text" id="src4" placeholder="請輸入網址" />
                </label>
                <label className="file" htmlFor="photo4">
                  <div></div>
                  <i className="material-symbols-outlined">image</i>
                  <input type="file" id="photo4" />
                </label>
              </li>{" "}
              <li>
                <label htmlFor="src5">
                  <span>上傳圖片</span>
                  <input type="text" id="src5" placeholder="請輸入網址" />
                </label>
                <label className="file" htmlFor="photo5">
                  <div></div>
                  <i className="material-symbols-outlined">image</i>
                  <input type="file" id="photo5" />
                </label>
              </li>{" "}
              <li>
                <label htmlFor="src6">
                  <span>上傳圖片</span>
                  <input type="text" id="src6" placeholder="請輸入網址" />
                </label>
                <label className="file" htmlFor="photo6">
                  <div></div>
                  <i className="material-symbols-outlined">image</i>
                  <input type="file" id="photo6" />
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="modal-footer">
          <button>SAVE</button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ProductModal);
