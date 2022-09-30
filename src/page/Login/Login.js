import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginAPI } from "../../utils/API";
import { sweetAlert } from "../../utils/SweetAlert";
import InputForm from "../../components/InputFrom";
function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const inputData = [
    {
      title: "信箱｜Email",
      type: "text",
      id: "username",
      placeholder: "請輸入Email",
      validation: {
        required: { value: true, message: "此欄位不可為空" },
        pattern: {
          value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          message: "請輸入正確Email格式",
        },
      },
      errors: errors.username?.message,
    },
    {
      title: "密碼｜Password",
      type: "password",
      id: "password",
      placeholder: "請輸入密碼",
      validation: {
        required: { value: true, message: "此欄位不可為空" },
      },
      errors: errors.password?.message,
    },
  ];
  const onSubmit = (data) => {
    loginAPI(data).then((res) => {
      if (res.success) {
        const { token, expired } = res;
        document.cookie = `myToken=${token};expires=${new Date(expired)}`;
        // console.log(token, expired, new Date(expired)); // 在設定之前可以先看是否有取得到資料
        navigate("/back/dashbord");
      }
    });
  };

  const handleForget = () =>
    sweetAlert(`info`, `Hi！Irene！`, `忘記密碼了嗎？去翻翻你的筆記本～`);
  return (
    <>
      <div className="container">
        <Link to="/" className="material-symbols-outlined go-home">
          home
        </Link>
        <div className="login">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            {inputData.map((item, index) => (
              <InputForm
                item={item}
                register={register}
                key={`${item.id}${index}`}
              />
            ))}
            <input type="submit" value="送出" />
            <p>
              忘記密碼｜<span onClick={handleForget}>Forgot password？</span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
