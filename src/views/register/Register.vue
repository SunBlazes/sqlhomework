<template>
  <transition name="register">
    <div class="register" v-show="show">
      <div class="form" ref="form">
        <router-link to="/login">LOGIN</router-link>
        <h1 class="logo">文</h1>
        <div class="welcome">
          <h3>Welcome Register !!</h3>
        </div>
        <h4>LOGIN IN</h4>
        <h4 class="label">UserName:</h4>
        <div class="user_name form-item">
          <input
            type="text"
            v-model="form.user_name.value"
            @input="onInput"
            @click="onInputClick"
            data-name="user_name"
            :class="`${form.user_name.show ? 'error' : ''}`"
            placeholder="please input six or more "
            ref="user_name_input"
            maxlength="10"
          />
          <span :class="`required ${form.user_name.show ? 'show' : ''}`"
            >REQUIRED</span
          >
          <span :class="`error_info ${form.user_name.show ? 'appear' : ''}`">{{
            form.user_name.err_info
          }}</span>
        </div>
        <h4 class="label">UserPassword:</h4>
        <div class="user_pwd form-item">
          <input
            type="password"
            v-model="form.user_pwd.value"
            @input="onInput"
            data-name="user_pwd"
            @click="onInputClick"
            :class="`${form.user_pwd.show ? 'error' : ''}`"
            placeholder="please input six or more "
            ref="user_pwd_input"
            maxlength="10"
          />
          <span :class="`required ${form.user_pwd.show ? 'show required' : ''}`"
            >REQUIRED</span
          >
          <span :class="`error_info ${form.user_pwd.show ? 'appear' : ''}`">{{
            form.user_pwd.err_info
          }}</span>
        </div>
        <h4 class="label">RepeatPassword:</h4>
        <div class="user_pwd form-item repeat_pwd">
          <input
            type="password"
            v-model="form.repeat_pwd.value"
            @input="onInput"
            data-name="repeat_pwd"
            @click="onInputClick"
            :class="`${form.repeat_pwd.show ? 'error' : ''}`"
            placeholder="please repeat just password "
            ref="repeat_pwd_input"
            maxlength="10"
            :disabled="repeatDisable"
          />
          <span :class="`required ${form.repeat_pwd.show ? 'show' : ''}`"
            >REQUIRED</span
          >
          <span :class="`error_info ${form.repeat_pwd.show ? 'appear' : ''}`">{{
            form.repeat_pwd.err_info
          }}</span>
        </div>
        <div class="label">Email:</div>
        <div class="email">
          <span :class="`error_info ${form.email.show ? 'appear' : ''}`">{{
            form.email.err_info
          }}</span>
          <span class="req_email" @click="sendEmail">
            <span v-show="!countdown.show">send</span>
            <span class="coundown" v-show="countdown.show">{{
              countdown.currentSecond
            }}</span>
          </span>
          <input
            type="text"
            v-model="form.email.value"
            placeholder="only support QQ email"
            ref="email_input"
            @input="onInput"
            data-name="email"
            @click="onInputClick"
          />
        </div>
        <div class="verify_email">
          <input
            type="text"
            v-model="form.verify_email.value"
            placeholder="verify code"
            ref="verify_email_input"
            @input="onInput"
            data-name="verify_email"
            @click="onInputClick"
          />
          <span
            :class="`error_info ${form.verify_email.show ? 'appear' : ''}`"
            >{{ form.verify_email.err_info }}</span
          >
        </div>
        <div
          :class="`register-btn ${isCompleted ? 'complete' : ''}`"
          @click="onRegister"
        >
          REGISTER
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Validator } from "./validator";
import { debounce } from "@/utils/debounce";
import { register } from "@/network/register";
import { getCode } from "@/network/getCode";

interface Form {
  [index: string]: FormItem;
}
interface FormItem {
  value: string;
  show: boolean;
  err_info: string;
}
interface Reg {
  [index: string]: RegExp | HTMLInputElement;
}
interface ErrMap {
  [index: string]: string;
}
interface CountDown {
  totalSecond: number;
  show: boolean;
  currentSecond: number;
}
// type Input = "user_name_input" | "user_pwd_input" | "repeat_pwd_input";
@Component
export default class Register extends Vue {
  private show = false;
  private validator: Validator = new Validator();
  private debounceFn = debounce(this.handleShow, 200);
  private completedArr: Array<boolean> = new Array(5).fill(false, 0);
  private isCompleted = false;
  private repeatDisable = true;
  private reg: Reg = {
    not_empty: /^.+?$/,
    user_name_reg: /^[a-zA-Z](?=\w*\d)\w{3,9}$/,
    user_pwd_reg: /^(?=\w*\d)(?=\w*[a-zA-Z])\w{6,10}$/,
    email_reg: /^\d+@QQ\.com$/i,
    verify_email_reg: /^\d{6}$/
  };

  private countdown: CountDown = {
    show: false,
    totalSecond: 60,
    currentSecond: 60
  };

  private error_map: ErrMap = {
    user_name: "必须满足/^[a-zA-Z](?=\\w*\\d)\\w{3,9}$/",
    user_pwd: "必须满足/^(?=\\w*\\d)(?=\\w*[a-zA-Z])\\w{6,10}$/",
    repeat_pwd: "密码必须一致",
    email: "必须符合QQ邮箱格式",
    verify_email: "验证码为6位数字"
  };

  private form: Form = {
    user_name: {
      value: "",
      show: false,
      err_info: ""
    },
    user_pwd: {
      value: "",
      show: false,
      err_info: ""
    },
    repeat_pwd: {
      value: "",
      show: false,
      err_info: ""
    },
    email: {
      value: "",
      show: false,
      err_info: ""
    },
    verify_email: {
      value: "",
      show: false,
      err_info: ""
    }
  };

  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 50);
    this.validate();
  }

  $refs!: {
    // user_name_input: HTMLInputElement;
    // user_pwd_input: HTMLInputElement;
    // repeat_pwd_input: HTMLInputElement;
    [index: string]: HTMLInputElement;
  };

  handleShow(e: InputEvent | MouseEvent): string {
    const el = e.target as HTMLInputElement;
    const name = el.dataset.name as string;
    const data = el.value;
    if (!data && !this.form[name].show) {
      this.form[name].show = true;
    } else {
      if (this.form[name].show && data) {
        this.form[name].show = false;
      }
    }
    return name;
  }

  onInput(e: InputEvent) {
    this.debounceFn(e);
  }

  onInputClick(e: InputEvent) {
    this.handleShow(e);
  }

  validate() {
    Object.keys(this.form).forEach((prop, index) => {
      const name = prop + "_input";
      const el = this.$refs[name];
      this.validator.setValidate(el, [
        {
          rule: this.reg[prop + "_reg"] || this.$refs.user_pwd_input,
          trigger: "blur",
          fn: (flag: boolean) => {
            if (!flag) {
              this.form[prop].show = true;
              this.form[prop].err_info = this.error_map[prop];
              this.$set(this.completedArr, index, false);
            } else {
              this.$set(this.completedArr, index, true);
            }
          }
        },
        {
          rule: this.reg.not_empty,
          trigger: "blur",
          fn: (flag: boolean) => {
            if (!flag) {
              this.form[prop].err_info = `The ${prop} cannot be empty`;
              this.$set(this.completedArr, index, false);
            } else {
              if (!this.form[prop].show) {
                this.$set(this.completedArr, index, true);
              }
            }
          }
        }
      ]);
    });
  }

  async sendEmail() {
    if (this.countdown.show || !this.form.email.value || this.form.email.show) {
      return;
    }
    this.countdown.show = true;
    this.handleCountDown();
    const { data: res } = await getCode({
      mail: this.form.email.value
    });
    if (res.meta.status === 200) {
      this.$message({
        type: "success",
        message: res.meta.msg
      });
    }
  }

  handleCountDown() {
    setTimeout(() => {
      this.countdown.currentSecond--;
      if (this.countdown.currentSecond < 0) {
        this.countdown.show = false;
        this.countdown.currentSecond = this.countdown.totalSecond;
      } else {
        this.handleCountDown();
      }
    }, 1000);
  }

  async onRegister() {
    if (this.isCompleted) {
      const query = {
        username: this.form.user_name.value,
        userpwd: this.form.user_pwd.value,
        usermail: this.form.email.value,
        code: this.form.verify_email.value
      };
      const data = await register(query);
      const res = data.data as RequestReturnType;
      if (res.meta.status === 200) {
        console.log(res);
        this.$message({
          type: "success",
          message: res.meta.msg,
          onClose: () => {
            this.$router.replace("/");
          }
        });
      } else {
        this.$message({
          type: "error",
          message: res.meta.msg
        });
      }
    }
  }

  @Watch("completedArr")
  onCountChange(v: Array<number>) {
    const count = v.reduce((preV, currV) => {
      return preV + currV;
    }, 0);
    if (!this.isCompleted && count === v.length) {
      this.isCompleted = true;
    }
  }

  @Watch("form.user_pwd.value")
  onPasswordChange(v: string, ov: string) {
    if (ov.length === 0 && v.length > 0) {
      this.repeatDisable = false;
    } else {
      if (v.length === 0) {
        this.form.repeat_pwd.show = false;
        this.form.repeat_pwd.value = "";
        this.repeatDisable = true;
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "./Register.less";
</style>
