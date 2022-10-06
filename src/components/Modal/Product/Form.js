import {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import { categoryID } from "../../../utils/Data";
import { uploadImage, addProduct,editProduct } from "../../../utils/API";

function Form({ setIsSave, setModalState, productData,currentStep }, ref) {
  const [product, setProduct] = useState({});
  useEffect(() => {
    setProduct(productData);
  }, [productData]);
  // category
  const [categoryGroup, setCategoryGroup] = useState(categoryID);
  const [newCategoryToggle, setNewCategoryToggle] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const handleClickCategory = (e) => {
    const { id } = e.target;
    if (id === "addNewCategory" && newCategory !== "") {
      const haveCategory = categoryGroup.indexOf(newCategory);
      if (haveCategory !== -1) {
        alert("已經有此分類名稱囉！");
      } else {
        setCategoryGroup((state) => [...state, newCategory]);
        setNewCategoryToggle(false);
        setNewCategory("");
      }
    }
  };

  // description info
  const [isAdding, setIsAdding] = useState(false);
  const [descriptionInfo, setDescriptionInfo] = useState([]);
  const descriptionInfoData = useRef([]);
  // add info
  const handleClickAddDescriptionInfo = (e) => {
    if (e.target.id === "finish") {
      setIsAdding(() => false);
    } else {
      if (!isAdding) {
        setIsAdding(() => true);
        setDescriptionInfo((state) => [
          ...state,
          { id: `descripyionInfo${Math.random()}`, title: "", content: "" },
        ]);
      }
    }
  };
  // handle change input
  const handleChangeDescriptionInfo = (e) => {
    const { id, value } = e.target;
    const currentIDTop = id.substring(0, 3);
    const currentIDBottom = id.substring(3, id.length);
    if (currentIDTop === "tit") {
      const data = descriptionInfo;
      descriptionInfoData.current = data.filter((item) =>
        item.id === currentIDBottom ? (item.title = value.trim()) : item
      );
      setDescriptionInfo(descriptionInfoData.current);
    } else {
      const data = descriptionInfo;
      descriptionInfoData.current = data.filter((item) =>
        item.id === currentIDBottom ? (item.content = value.trim()) : item
      );
      setDescriptionInfo(descriptionInfoData.current);
    }
    setProduct((state) => ({ ...state, descriptionInfo: descriptionInfo }));
  };
  // delete info
  const handleClickDeleteDescriptionInfo = (e) => {
    const { id } = e.target;
    const data = descriptionInfo;
    descriptionInfoData.current = data.filter((item) => item.id !== id);
    setDescriptionInfo(descriptionInfoData.current);
  };
  useEffect(() => {
    if (descriptionInfo.length === 0) {
      setIsAdding(() => false);
    }
  }, [descriptionInfo.length]);

  // image
  const [isAddImages, setIsAddImages] = useState(false);
  // 負責存放次要圖片們（比較麻煩所以特別拉出來，得到完整資料再放到所有資料內）
  const imagesData = useRef(null);
  const [imagesGroup, setImageSGroup] = useState([]);
  const addImage = async (e) => {
    const { id } = e.target;
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", file);
      // 負責存放每次的圖片
      let imageUrl = "";
      await uploadImage(formData).then((res) => (imageUrl = res.imageUrl));
      console.log(imageUrl);
      if (id === "mainPhoto" || id === "mainSrc") {
        setProduct((state) => ({ ...state, imageUrl: imageUrl }));
      } else {
        setImageSGroup((state) =>
          state.map((item) =>
            item === "" ? (item = imageUrl) : item
          )
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeImage = (e) => {
    const { id, value } = e.target;
    if (id === "mainSrc") {
      setProduct((state) => ({ ...state, imageUrl: value.trim() }));
    } else {
      const currentID = Number(id.substring(3, id.length));
      const data = imagesGroup;
      imagesData.current = data.filter((item) =>
        item.id === currentID ? (item.imageUrl = value.trim()) : item
      );
      setProduct((state) => ({ ...state, imagesUrl: imagesData.current }));
    }
  };
  const handleClickImage = (e) => {
    const { id } = e.target;
    if (id === "delete") {
      // delete Main
      setProduct((state) => ({ ...state, imageUrl: "" }));
    } else if (id === "addImages" && isAddImages) {
      // add imagesGroup item
      setImageSGroup((state) => [...state, ""]);
      setIsAddImages(() => false);
    } else {
      // delete imagesGroup item
      const data = imagesGroup;
      imagesData.current = data.filter((item) => item !== id);
      setImageSGroup(() => imagesData.current);
    }
  };
  useEffect(() => {
    const haveImage = [];
    imagesGroup.forEach((item) => haveImage.push(item));
    if (
      product.imageUrl !== "" &&
      product.imageUrl !== undefined &&
      !haveImage.includes("")
    ) {
      setIsAddImages(() => true);
      setProduct((state) => ({ ...state, imagesUrl: imagesGroup }));
    } else {
      setIsAddImages(() => false);
    }
    // setProduct((state) => ({ ...state, imagesUrl: imagesGroup }));
  }, [imagesGroup, product.imageUrl]);

  // determine have error or not
  const [isError, setIsError] = useState({
    title: false,
    category: false,
    origin_price: false,
    price: false,
    unit: false,
    description: false,
  });
  useImperativeHandle(ref, () => ({
    saveProduct: () => {
      if (
        product.title === "" ||
        product.category === "DEFAULT" ||
        product.unit === "" ||
        product.price === 0 ||
        product.origin_price === 0 ||
        product.description === ""
      ) {
        if (product.title === "")
          setIsError((state) => ({ ...state, title: true }));
        if (product.category === "DEFAULT")
          setIsError((state) => ({ ...state, category: true }));
        if (product.unit === "")
          setIsError((state) => ({ ...state, unit: true }));
        if (product.price === 0)
          setIsError((state) => ({ ...state, price: true }));
        if (product.origin_price === 0)
          setIsError((state) => ({ ...state, origin_price: true }));
        if (product.description === "")
          setIsError((state) => ({ ...state, description: true }));
      } else {
        setIsSave(() => true);
        setModalState(() => false);
        const data = { data: { ...product } };
        if(currentStep==='edit'){
          editProduct(data,product.id).then((res) => console.log(res));
        }else{
          addProduct(data).then((res) => console.log(res));
        }
      }
    },
  }));

  // watch product and change isError
  useEffect(() => {
    if (product.title !== "")
      setIsError((state) => ({ ...state, title: false }));
    if (product.category !== "DEFAULT")
      setIsError((state) => ({ ...state, category: false }));
    if (product.unit !== "") setIsError((state) => ({ ...state, unit: false }));
    if (product.price !== 0)
      setIsError((state) => ({ ...state, price: false }));
    if (product.origin_price !== 0)
      setIsError((state) => ({ ...state, origin_price: false }));
    if (product.description !== "")
      setIsError((state) => ({ ...state, description: false }));
  }, [product]);
  return (
    <form className="modal-body">
      <div className="modal-info">
        <div className="modal-info-category">
          <label htmlFor="category">
            <span>分類</span>
            <select
              className={isError.category ? "modal-error" : ""}
              name="category"
              id="category"
              value={product.category}
              onChange={(e) =>
                setProduct((state) => ({
                  ...state,
                  category: e.target.value,
                }))
              }
            >
              <option value="DEFAULT" disabled>
                請選擇分類
              </option>
              {categoryGroup.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="newCategoryToggle">
            <span>新增分類</span>
            {newCategoryToggle ? (
              <>
                <input
                  type="text"
                  placeholder="新增分類"
                  value={newCategory}
                  id="newCategory"
                  onChange={(e) => setNewCategory(e.target.value.trim())}
                />
                <span
                  id="addNewCategory"
                  className={`material-symbols-outlined ${
                    newCategory === "" ? "done" : "isDone"
                  }`}
                  onClick={handleClickCategory}
                >
                  done
                </span>
              </>
            ) : (
              <button onClick={() => setNewCategoryToggle(true)}>
                新增分類
              </button>
            )}
          </label>
        </div>
        <div className="modal-info-title">
          <label htmlFor="title">
            <span>名稱</span>
            <input
              className={isError.title ? "modal-error" : ""}
              type="text"
              id="title"
              placeholder="請輸入名稱"
              value={product.title}
              onChange={(e) =>
                setProduct((state) => ({
                  ...state,
                  title: e.target.value.trim(),
                }))
              }
            />
          </label>
          <label htmlFor="unit">
            <span>單位</span>
            <input
              className={isError.unit ? "modal-error" : ""}
              type="text"
              id="unit"
              value={product.unit}
              onChange={(e) =>
                setProduct((state) => ({
                  ...state,
                  unit: e.target.value.trim(),
                }))
              }
            />
          </label>
          <label className="enable" htmlFor="is_enabled">
            <span>啟用</span>
            <input
              type="checkbox"
              id="is_enabled"
              checked={product.is_enabled}
              onChange={(e) =>
                setProduct((state) => ({
                  ...state,
                  is_enabled: e.target.checked ? 1 : 0,
                }))
              }
            />
          </label>
        </div>
        <div className="modal-info-price">
          <label htmlFor="price">
            <span>原價</span>
            <input
              className={isError.price ? "modal-error" : ""}
              type="number"
              id="price"
              value={product.price}
              onChange={(e) =>
                setProduct((state) => ({
                  ...state,
                  price: Number(e.target.value.trim()),
                }))
              }
            />
          </label>
          <label htmlFor="origin_price">
            <span>特價</span>
            <input
              className={isError.origin_price ? "modal-error" : ""}
              type="number"
              id="origin_price"
              value={product.origin_price}
              onChange={(e) =>
                setProduct((state) => ({
                  ...state,
                  origin_price: Number(e.target.value.trim()),
                }))
              }
            />
          </label>
        </div>
        <div className="modal-info-description">
          <label htmlFor="description">
            <span>產品描述</span>
            <textarea
              className={isError.description ? "modal-error" : ""}
              id="description"
              rows="5"
              value={product.description}
              onChange={(e) =>
                setProduct((state) => ({
                  ...state,
                  description: e.target.value.trim(),
                }))
              }
            />
          </label>
          <div className="modal-info-description-info">
            <div className="modal-info-description-info-title">
              <div>產品資訊</div>
              <button
                id="addDescriptionInfo"
                className={`add-btn material-icons ${
                  isAdding ? "no-drop" : ""
                }`}
                onClick={handleClickAddDescriptionInfo}
              >
                add_circle
              </button>
            </div>
          </div>
          <div className="modal-info-description-info-group">
            <ul>
              {descriptionInfo.map((item, index) => (
                <li
                  className="modal-info-description-info-list-item"
                  key={index}
                  id={index}
                >
                  <div className="descriptionInfo-title">
                    <input
                      id={`tit${item.id}`}
                      type="text"
                      placeholder="請輸入產品資訊名稱"
                      value={item.title}
                      onChange={handleChangeDescriptionInfo}
                    />
                  </div>
                  <div className="descriptionInfo-content">
                    <textarea
                      id={`txt${item.id}`}
                      rows="3"
                      placeholder="請輸入產品資訊內容"
                      value={item.content}
                      onChange={handleChangeDescriptionInfo}
                    ></textarea>
                  </div>
                  <div className="descriptionInfo-btn">
                    <button
                      id={item.id}
                      onClick={handleClickDeleteDescriptionInfo}
                    >
                      刪除資訊
                    </button>
                    <button id="finish" onClick={handleClickAddDescriptionInfo}>
                      完成資訊
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="modal-photo">
        <div className="modal-photo-title-addimages">
          <p>上傳圖片</p>
          <button
            id="addImages"
            className={`add-btn material-icons ${isAddImages ? "" : "no-drop"}`}
            onClick={handleClickImage}
          >
            add_circle
          </button>
        </div>
        <ul>
          <li>
            <span>
              主要{" "}
              <button
                id="delete"
                className="material-symbols-outlined"
                onClick={handleClickImage}
              >
                delete
              </button>
            </span>
            <label htmlFor="mainSrc">
              <input
                type="text"
                id="mainSrc"
                placeholder="請輸入網址"
                value={product.imageUrl}
                onChange={handleChangeImage}
              />
            </label>
            {product.imageUrl === "" || product.imageUrl === undefined ? (
              <label className="file" htmlFor="mainPhoto">
                <div className="uploadImage"></div>
                <i className="material-symbols-outlined">image</i>
                <input type="file" id="mainPhoto" onChange={addImage} />
              </label>
            ) : (
              <div className="modal-photo-show-image">
                <img src={product.imageUrl} alt="main" />
              </div>
            )}
          </li>
          {imagesGroup.map((item, index) => (
            <li key={index}>
              <span>
                次要{" "}
                <button
                  id={item}
                  className="material-symbols-outlined"
                  onClick={handleClickImage}
                >
                  delete
                </button>
              </span>
              <label htmlFor={item}>
                <input
                  type="text"
                  id={item}
                  placeholder="請輸入網址"
                  value={item}
                  onChange={handleChangeImage}
                />
              </label>
              {item === "" ? (
                <label className="file" htmlFor={item}>
                  <div className="uploadImage"></div>
                  <i className="material-symbols-outlined">image</i>
                  <input
                    type="file"
                    id={item}
                    onChange={addImage}
                  />
                </label>
              ) : (
                <div className="modal-photo-show-image">
                  <img src={item} alt={item} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default forwardRef(Form);
