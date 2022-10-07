import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

export const sweetAlert = (icon, title, text) => {
  MySwal.fire({
    icon,
    title,
    text,
    showConfirmButton: false,
    timer: 3000,
  });
};

export const sweetAlert_question = (title) => {
  MySwal.fire({
    icon: "question",
    title,
    showCancelButton: true,
    confirmButtonText: "確定",
    cancelButtonText: `取消`,
  }).then((res) => {
    if (res.isConfirmed) {
      MySwal.fire({
        icon: "success",
        title:"登出成功！",
        text:"掰掰囉～記得再回來確認ToDoList唷！",
        showConfirmButton:false
      });
    }
  });
};