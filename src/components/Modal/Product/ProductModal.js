import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import Form from "./Form";

const ProductModal = ({ productData, setProductData }, ref) => {
  // open & close Modal
  const [modalState, setModalState] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  useImperativeHandle(ref, () => ({
    openModal: (id) => {
      setModalState(true);
      setCurrentStep(id);
    },
  }));

  // determine is save or not
  const [isSave, setIsSave] = useState(false);
  const formRef = useRef();
  const handleClickSave = () => {
    formRef.current.saveProduct();
    if (isSave) {
      setIsSave(() => false);
    }
  };
  return (
    <div className="modal" style={modalState ? {} : { top: "-1500px" }}>
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title">新增產品</h1>
          <button
            className="material-symbols-outlined"
            onClick={() => setModalState(false)}
          >
            close
          </button>
        </div>
        {productData !== null ? (
          <Form
            ref={formRef}
            setIsSave={setIsSave}
            setModalState={setModalState}
            productData={productData}
            setProduct={setProductData}
            currentStep={currentStep}
          />
        ) : null}
        <div className="modal-footer">
          <button onClick={handleClickSave}>SAVE</button>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ProductModal);
