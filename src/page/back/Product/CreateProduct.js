import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoryID } from "../../../utils/Data";
import { sweetAlert } from "../../../utils/SweetAlert";
import Loading from "../../../components/Loading";
import {
  getProductAll,
  uploadImage,
  addProduct,
  editProduct,
} from "../../../utils/API";

const CreateProduct = () => {
  const { ID } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [isAdding, setIsAdding] = useState({
    loading: false,
    category: false,
    descriptionInfo: false,
    images: false,
    save: false,
  });
  const [isError, setIsError] = useState({
    category: false,
    title: false,
    unit: false,
    price: false,
    origin_price: false,
  });
  const [newCategory, setNewCategory] = useState("");
  const handleClickAdd = (e) => {
    const { id } = e.target;
    switch (id) {
      case "addNewCategory":
        const haveCategory = categoryID.indexOf(newCategory);
        console.log(categoryID.indexOf(newCategory));
        if (haveCategory !== -1) {
          sweetAlert("error", "新增失敗", `分類已經有「${newCategory}」囉！`);
        } else {
          categoryID.push(newCategory);
          setIsAdding((state) => ({ ...state, category: false }));
          setNewCategory("");
          sweetAlert("success", "新增成功", `新增新分類「${newCategory}」！`);
        }
        break;
      case "addDescriptionInfo":
        setIsAdding((state) => ({ ...state, descriptionInfo: true }));
        let descriptionData = product.descriptionInfo;
        if (descriptionData === undefined) {
          descriptionData = [
            { id: new Date().getTime(), title: "", content: "" },
          ];
        } else {
          descriptionData.push({
            id: new Date().getTime(),
            title: "",
            content: "",
          });
        }
        setProduct((state) => ({
          ...state,
          descriptionInfo: descriptionData,
        }));
        break;
      case "addImages":
        if (!isAdding.images) {
          setIsAdding((state) => ({ ...state, images: true }));
          let imagesData = product.imagesUrl;
          if (imagesData === undefined) {
            imagesData = [
              {
                id: `images${new Date().getTime()}`,
                imageUrl: "",
              },
            ];
          } else {
            imagesData.push({
              id: `images${new Date().getTime()}`,
              imageUrl: "",
            });
          }
          setProduct((state) => ({
            ...state,
            imagesUrl: imagesData,
          }));
        }
        break;
      case "saveProduct":
        const data = { data: { ...product } };
        setIsAdding((state) => ({ ...state, save: true }));
        if (ID === "add") {
          addProduct(data).then((res) => {
            if (res.success) {
              sweetAlert("success", "新增成功");
              setTimeout(() => {
                navigate("/back/dashboard/product");
              }, [3000]);
            }
          });
        } else {
          editProduct(data, ID).then((res) => {
            if (res.success) {
              sweetAlert("success", "編輯成功");
              setTimeout(() => {
                navigate("/back/dashboard/product");
              }, [3000]);
            }
          });
        }
        break;
      default:
        new Error("error");
    }
  };
  const handleClickDelete = (e) => {
    const { id } = e.target;
    const [descriptionInfo, descriptionInfoID] = [
      id.substring(0, 15),
      id.substring(15, id.length),
    ];
    if (descriptionInfo === "descriptionInfo") {
      // delete descriptionInfo
      const data = product.descriptionInfo.filter(
        (item) => item.id !== Number(descriptionInfoID)
      );
      setProduct((state) => ({ ...state, descriptionInfo: data }));
    } else if (id === "mainImage") {
      setProduct((state) => ({ ...state, imageUrl: "" }));
      setIsAdding((state) => ({ ...state, images: true }));
    } else {
      const data = product.imagesUrl.filter((item) => item.id !== id);
      setProduct((state) => ({ ...state, imagesUrl: data }));
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    const [descriptionInfoTitle, descriptionInfoTitleID] = [
      id.substring(0, 5),
      id.substring(5, id.length),
    ];
    const [descriptionInfoContent, descriptionInfoContentID] = [
      id.substring(0, 7),
      id.substring(7, id.length),
    ];
    if (descriptionInfoTitle === "title") {
      // handle descriptionInfo title
      const data = product.descriptionInfo.filter((item) =>
        item.id === Number(descriptionInfoTitleID)
          ? (item.title = value.trim())
          : item
      );
      setProduct((state) => ({ ...state, descriptionInfo: data }));
    } else if (descriptionInfoContent === "content") {
      // handle descriptionInfo content
      const data = product.descriptionInfo.filter((item) =>
        item.id === Number(descriptionInfoContentID)
          ? (item.content = value.trim())
          : item
      );
      setProduct((state) => ({ ...state, descriptionInfo: data }));
    } else {
      // handle ImagesUrl
      const data = product.imagesUrl.filter((item) =>
        item.id === id ? (item.imageUrl = value.trim()) : item
      );
      setProduct((state) => ({ ...state, imagesUrl: data }));
      setIsAdding((state) => ({ ...state, images: false }));
    }
  };
  const addImageFile = async (e) => {
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
        const data = product.imagesUrl.filter((item) =>
          item.id === id ? (item.imageUrl = imageUrl) : item
        );
        setProduct((state) => ({ ...state, imagesUrl: data }));
        setIsAdding((state) => ({ ...state, images: false }));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (ID !== "add") {
      // edit
      getProductAll().then((res) => {
        setProduct(res.products[ID]);
        setIsAdding((state) => ({ ...state, loading: true }));
      });
    } else {
      // add
      setIsAdding((state) => ({ ...state, loading: true }));
    }
  }, []);
  useEffect(() => {
    // create
    if (
      product.descriptionInfo !== undefined &&
      product.descriptionInfo.length === 0
    ) {
      setIsAdding((state) => ({ ...state, descriptionInfo: false }));
    }
    // error input
    if (isAdding.save) {
      // category
      if (product.category !== "DEFAULT" && product.category !== undefined) {
        setIsError((state) => ({ ...state, category: false }));
      } else {
        setIsError((state) => ({ ...state, category: true }));
      }
      // title
      if (product.title !== "" && product.title !== undefined) {
        setIsError((state) => ({ ...state, title: false }));
      } else {
        setIsError((state) => ({ ...state, title: true }));
      }
      // unit
      if (product.unit !== "" && product.unit !== undefined) {
        setIsError((state) => ({ ...state, unit: false }));
      } else {
        setIsError((state) => ({ ...state, unit: true }));
      }
      // price
      if (product.price !== 0 && product.price !== undefined) {
        setIsError((state) => ({ ...state, price: false }));
      } else {
        setIsError((state) => ({ ...state, price: true }));
      }
      // origin_price
      if (product.origin_price !== 0 && product.origin_price !== undefined) {
        setIsError((state) => ({ ...state, origin_price: false }));
      } else {
        setIsError((state) => ({ ...state, origin_price: true }));
      }
    }
  }, [
    product.descriptionInfo,
    isAdding.save,
    product.category,
    product.title,
    product.unit,
    product.is_enabled,
    product.price,
    product.origin_price,
  ]);
  return (
    <>
      {isAdding.loading ? (
        <>
          <div className="createProduct container">
            <div className="createProduct-header">
              <h1>
                {ID === "add" ? <span>新增</span> : <span>編輯</span>}產品
              </h1>
              <div className="btn-group">
                <button
                  className="button"
                  id="saveProduct"
                  onClick={handleClickAdd}
                >
                  SAVE
                </button>
                <button
                  className="button"
                  onClick={() => navigate("/back/dashboard/product")}
                >
                  CANCEL
                </button>
              </div>
            </div>
            <section>
              <div className="createProduct-info">
                <div className="createProduct-info-category">
                  <label htmlFor="category">
                    <span>分類</span>
                    <select
                      name="category"
                      id="category"
                      className={isError.category ? "error" : ""}
                      value={
                        product.category === undefined
                          ? "DEFAULT"
                          : product.category
                      }
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
                      {categoryID.map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="newCategoryToggle">
                    <span>新增分類</span>
                    {isAdding.category ? (
                      <>
                        <input
                          type="text"
                          placeholder="新增分類"
                          id="newCategory"
                          value={newCategory}
                          onChange={(e) =>
                            setNewCategory(e.target.value.trim())
                          }
                        />
                        <span
                          id="addNewCategory"
                          className={`material-symbols-outlined ${
                            newCategory !== "" ? "isDone" : "done"
                          }`}
                          onClick={handleClickAdd}
                        >
                          done
                        </span>
                      </>
                    ) : (
                      <button
                        className="button"
                        onClick={() =>
                          setIsAdding((state) => ({ ...state, category: true }))
                        }
                      >
                        新增分類
                      </button>
                    )}
                  </label>
                </div>
                <div className="createProduct-info-title">
                  <label htmlFor="title">
                    <span>名稱</span>
                    <input
                      type="text"
                      id="title"
                      className={isError.title ? "error" : ""}
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
                      type="text"
                      id="unit"
                      className={isError.unit ? "error" : ""}
                      placeholder="請輸入單位"
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
                      value={product.is_enabled}
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
                <div className="createProduct-info-price">
                  <label htmlFor="price">
                    <span>原價</span>
                    <input
                      type="number"
                      id="price"
                      className={isError.price ? "error" : ""}
                      placeholder="請輸入原價"
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
                      type="number"
                      id="origin_price"
                      className={isError.origin_price ? "error" : ""}
                      placeholder="請輸入特價"
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
                <div className="createProduct-info-description">
                  <label htmlFor="description">
                    <span>產品描述</span>
                    <textarea
                      id="description"
                      rows="5"
                      placeholder="請輸入產品描述"
                      value={product.description}
                      onChange={(e) =>
                        setProduct((state) => ({
                          ...state,
                          description: e.target.value.trim(),
                        }))
                      }
                    />
                  </label>
                  <div className="createProduct-info-description-info">
                    <div className="createProduct-info-description-info-title">
                      <div>產品資訊</div>
                      <button
                        id="addDescriptionInfo"
                        className={`add-btn material-icons ${
                          isAdding.descriptionInfo ? "no-drop" : ""
                        }`}
                        onClick={handleClickAdd}
                      >
                        add_circle
                      </button>
                    </div>
                    <div className="createProduct-info-description-info-group">
                      <ul>
                        {product.descriptionInfo !== undefined &&
                          product.descriptionInfo.map((item) => (
                            <li
                              className="createProduct-info-description-info-list-item"
                              key={item.id}
                            >
                              <div className="descriptionInfo-title">
                                <input
                                  type="text"
                                  placeholder="請輸入產品資訊名稱"
                                  id={`title${item.id}`}
                                  value={item.title}
                                  onChange={handleChange}
                                />
                              </div>
                              <div className="descriptionInfo-content">
                                <textarea
                                  rows="3"
                                  placeholder="請輸入產品資訊內容"
                                  id={`content${item.id}`}
                                  value={item.content}
                                  onChange={handleChange}
                                ></textarea>
                              </div>
                              <div className="descriptionInfo-btn">
                                <button
                                  className="button"
                                  id="finish"
                                  onClick={() =>
                                    setIsAdding((state) => ({
                                      ...state,
                                      descriptionInfo: false,
                                    }))
                                  }
                                >
                                  完成
                                </button>
                                <button
                                  className="button"
                                  id={`descriptionInfo${item.id}`}
                                  onClick={handleClickDelete}
                                >
                                  刪除
                                </button>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="createProduct-photo">
                <div className="createProduct-photo-title-addimages">
                  <p>上傳圖片</p>
                  <button
                    id="addImages"
                    className={`add-btn material-icons ${
                      isAdding.images ? "no-drop" : ""
                    }`}
                    onClick={handleClickAdd}
                  >
                    add_circle
                  </button>
                </div>
                <ul>
                  <li>
                    <span>
                      主要{" "}
                      <button
                        id="mainImage"
                        className="material-symbols-outlined"
                        onClick={handleClickDelete}
                      >
                        delete
                      </button>
                    </span>
                    <label htmlFor="mainSrc">
                      <input
                        type="text"
                        id="mainSrc"
                        placeholder="請輸入網址"
                        value={
                          product.imageUrl !== undefined ? product.imageUrl : ""
                        }
                        onChange={(e) =>
                          setProduct((state) => ({
                            ...state,
                            imageUrl: e.target.value.trim(),
                          }))
                        }
                      />
                    </label>
                    {product.imageUrl !== undefined &&
                    product.imageUrl !== "" ? (
                      <div className="createProduct-photo-show-image">
                        <img src={product.imageUrl} alt="main" />
                      </div>
                    ) : (
                      <label className="file" htmlFor="mainPhoto">
                        <div className="uploadImage"></div>
                        <i className="material-symbols-outlined">image</i>
                        <input
                          type="file"
                          id="mainPhoto"
                          onChange={addImageFile}
                        />
                      </label>
                    )}
                  </li>
                  {product.imagesUrl !== undefined &&
                    product.imagesUrl.map((item) => (
                      <li key={item.id}>
                        <span>
                          次要{" "}
                          <button
                            className="material-symbols-outlined"
                            id={item.id}
                            onClick={handleClickDelete}
                          >
                            delete
                          </button>
                        </span>
                        <label>
                          <input
                            type="text"
                            placeholder="請輸入網址"
                            id={item.id}
                            value={item.imageUrl}
                            onChange={handleChange}
                          />
                        </label>
                        {item.imageUrl !== "" ? (
                          <div className="createProduct-photo-show-image">
                            <img src={item.imageUrl} alt={item.id} />
                          </div>
                        ) : (
                          <label className="file">
                            <div className="uploadImage"></div>
                            <i className="material-symbols-outlined">image</i>
                            <input
                              type="file"
                              id={item.id}
                              onChange={addImageFile}
                            />
                          </label>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            </section>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CreateProduct;
