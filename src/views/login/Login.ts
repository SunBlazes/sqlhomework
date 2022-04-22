import { Component, Vue } from "vue-property-decorator";
import { login } from "@/network/login";
import { setCookie } from "@/utils/cookie";

@Component
export default class Login extends Vue {
  name = "Login";

  data() {
    return {
      form: {
        user_name: "",
        user_pwd: ""
      },
      rules: {
        user_name: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        user_pwd: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  }

  $refs!: {
    form: HTMLFormElement;
  };

  onSubmit(): void {
    this.$refs.form.validate(async (valid: boolean) => {
      if (valid) {
        // this.$message({
        //   type: "success",
        //   message: "登录成功"
        // });
        const query = {
          username: this.form.user_name,
          userpwd: this.form.user_pwd
        };
        const data = await login(query);
        const res = data.data as LoginReturnType;
        if (res.meta.status === 200) {
          this.handleLoginSuccess(res);
        } else {
          this.handleLoginError(res.meta.msg);
        }
      }
    });
  }

  handleLoginSuccess(res: LoginReturnType) {
    const { token, user_id, user_name } = res.result;
    sessionStorage.setItem("token", token);
    setCookie("user_id", user_id + "", 1);
    setCookie("user_name", user_name, 1);
    setCookie("islogin", "yes", 1);
    this.$message({
      type: "success",
      message: "登陆成功",
      onClose: () => {
        this.$router.push({ path: "/user/home" });
      }
    });
  }

  handleLoginError(msg: string) {
    this.$message({ type: "error", message: msg });
  }
}
