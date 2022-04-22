<template>
  <div class="setting">
    <div class="avatar">
      <img
        src=""
        alt=""
        ref="avatar"
        v-show="avatar.isLoaded"
        @click="uploadVisible = true"
      />
      <span class="loading" v-show="!avatar.isLoaded"></span>
    </div>
    <form ref="form">
      <el-tooltip effect="dark" :content="error.user_name" placement="top">
        <div class="form-item">
          <span class="form-item-name">用户名</span>
          <input
            type="text"
            name="user_name"
            v-model="form.user_name.value"
            :disabled="!form.user_name.isNeeded"
            :placeholder="userInfo.user_name"
            ref="user_name"
            id="user_name"
            :class="
              `${
                form.user_name.isNeeded && !form.user_name.isCorrect
                  ? 'error'
                  : ''
              }`
            "
            @input="debounceInput"
          />
          <label
            class="iconfont icon-xiugai"
            @click="edit('user_name')"
            for="user_name"
          ></label>
          <span
            class="iconfont icon-xingzhuanggongnengtubiao-"
            @click="revokeInput('user_name')"
          ></span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" :content="error.user_pwd" placement="top">
        <div class="form-item">
          <span class="form-item-name">用户密码</span>
          <input
            type="text"
            name="user_pwd"
            v-model="form.user_pwd.value"
            :disabled="!form.user_pwd.isNeeded"
            :placeholder="userInfo.user_pwd"
            ref="user_pwd"
            id="user_pwd"
            :class="
              `${
                form.user_pwd.isNeeded && !form.user_pwd.isCorrect
                  ? 'error'
                  : ''
              }`
            "
            @input="debounceInput"
          />
          <label
            class="iconfont icon-xiugai"
            @click="edit('user_pwd')"
            for="user_pwd"
          ></label>
          <span
            class="iconfont icon-xingzhuanggongnengtubiao-"
            @click="revokeInput('user_pwd')"
          ></span>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" :content="error.user_email" placement="top">
        <div class="form-item">
          <span class="form-item-name">用户邮箱</span>
          <input
            type="text"
            name="user_email"
            v-model="form.user_email.value"
            :disabled="!form.user_email.isNeeded"
            :placeholder="userInfo.user_email"
            ref="user_email"
            id="user_email"
            :class="
              `${
                form.user_email.isNeeded && !form.user_email.isCorrect
                  ? 'error'
                  : ''
              }`
            "
            @input="debounceInput"
          />
          <label
            class="iconfont icon-xiugai"
            @click="edit('user_email')"
            for="user_email"
          ></label>
          <span
            class="iconfont icon-xingzhuanggongnengtubiao-"
            @click="revokeInput('user_email')"
          ></span>
        </div>
      </el-tooltip>
      <div class="submit" @click="submit">
        提交
      </div>
    </form>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="overlay" v-show="uploadVisible"></div>
    </transition>
    <transition name="slideUp">
      <div class="upload" v-show="uploadVisible">
        <i class="iconfont icon-cha" @click="closeUpload"></i>
        <el-upload
          drag
          @upload="onUpload"
          :before-upload="onBeforeUpload"
          :file-list="upload.fileList"
          :action="action"
          :headers="headers"
          :auto-upload="upload.autoUpload"
          :limit="upload.limit"
          name="avatar"
          :on-exceed="upload.onExceed"
          :on-success="onSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            jpeg/gif/jpg/png文件，且不超过1mb
          </div>
        </el-upload>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getUser_avatar } from "@/network/getUser_avatar";
import { getUserInfo } from "@/network/getUserInfo";
import { updateUserInfo } from "@/network/updateUserInfo";
import { getCookie } from "@/utils/cookie";
import { debounce } from "@/utils/debounce";
import "./interface";
import { ElUploadInternalRawFile } from "element-ui/types/upload";

type inputName = "user_name" | "user_pwd" | "user_email";

@Component
export default class Setting extends Vue {
  user_id = -1;
  uploadVisible = false;

  upload: Upload = {
    fileList: [],
    limit: 1,
    autoUpload: true,
    onExceed: () => {
      this.$message({
        type: "warning",
        message: "上传文件个数超出限制"
      });
    },
    accept: ["jpeg", "gif", "jpg", "png"]
  };

  onSuccess(response: { meta: { status: number; msg: string } }) {
    this.$message({
      type: "success",
      message: response.meta.msg,
      onClose: () => {
        this.getUser_avatar();
        this.uploadVisible = false;
      }
    });
  }

  onBeforeUpload(file: ElUploadInternalRawFile) {
    const exname = file.type.split("/")[1];
    if (this.upload.accept.indexOf(exname) === -1) {
      this.$message({
        type: "warning",
        message: "不支持此类型的文件"
      });
      return false;
    }
    return true;
  }

  avatar: Avatar = {
    avatar_url: "",
    isLoaded: false
  };

  form: Form = {
    user_name: {
      value: "",
      isCorrect: false,
      isNeeded: false,
      reg: /^[a-zA-Z](?=\w*\d)\w{5,}$/,
      el: null
    },
    user_pwd: {
      value: "",
      isCorrect: false,
      isNeeded: false,
      reg: /^(?=.*\d)(?=.*[a-zA-Z])\w{6,}$/,
      el: null
    },
    user_email: {
      value: "",
      isCorrect: false,
      isNeeded: false,
      reg: /^\w+@QQ\.com$/,
      el: null
    }
  };

  userInfo: UserBasicInfo = {
    user_name: "",
    user_pwd: "",
    user_email: ""
  };

  $refs!: {
    avatar: HTMLImageElement;
    form: HTMLFormElement;
    user_name: HTMLInputElement;
    user_pwd: HTMLInputElement;
    user_email: HTMLInputElement;
  };

  error: UserBasicInfo = {
    user_name: "满足首个为字母 其他任意数字和字母组成的6位数以上",
    user_email: "格式必须满足邮箱格式",
    user_pwd: "由字母和数字组成的六位数以上"
  };

  async getUser_avatar() {
    const user_id = parseInt(getCookie("user_id"));
    const res = await getUser_avatar(user_id);
    const data = res.data as MyReturnType;
    this.avatar.avatar_url = data.result.avatar;
    const avatar = this.$refs.avatar;
    setTimeout(() => {
      avatar.src = data.result.avatar;
      avatar.onload = () => {
        this.avatar.isLoaded = true;
      };
    }, 1000);
  }

  async getUserInfo() {
    this.user_id = parseInt(getCookie("user_id"));
    const res = await getUserInfo(this.user_id);
    const data = res.data.result as UserBasicInfo;
    this.userInfo.user_name = data.user_name;
    this.userInfo.user_pwd = data.user_pwd;
    this.userInfo.user_email = data.user_email;
    // console.log(this.userInfo);
  }

  async mounted() {
    await this.getUser_avatar();
    await this.getUserInfo();
    Object.keys(this.form).forEach(name => {
      this.form[name].el = this.$refs[name as inputName];
    });
  }

  edit(name: inputName) {
    this.form[name].isNeeded = true;
  }

  handleInput(e: InputEvent) {
    const name = (e.target! as HTMLInputElement).id as inputName;
    const { reg, value, isCorrect } = this.form[name];
    if (reg.test(value) && !isCorrect) {
      this.form[name].isCorrect = true;
    } else {
      if (isCorrect && !reg.test(value)) {
        this.form[name].isCorrect = false;
      }
    }
  }

  debounceInput = debounce(this.handleInput, 300);

  revokeInput(name: inputName) {
    const formItem = this.form[name];
    formItem.value = "";
    formItem.isNeeded = false;
  }

  async submit() {
    const formData = {} as { [index: string]: string };
    const form = this.form;
    let isCanSubmit = false;
    Object.keys(form).forEach(item => {
      if (form[item].value && form[item].isCorrect) {
        formData[item] = form[item].value;
        if (!isCanSubmit) {
          isCanSubmit = true;
        }
      } else {
        if (form[item].value) {
          form[item].isNeeded = false;
        }
      }
    });
    console.log(formData);
    if (!isCanSubmit) {
      return this.$message({
        type: "warning",
        message: "提交需要至少一项信息改变且格式正确"
      });
    }
    const res = await updateUserInfo(this.user_id, formData);
    const data = res.data as RequestReturnType;
    if (data.meta.status === 200) {
      this.$message({
        type: "success",
        message: data.meta.msg,
        onClose: () => {
          this.$router.replace("/");
        },
        duration: 1000
      });
    } else {
      this.$message({
        type: "error",
        message: data.meta.msg
      });
    }
  }

  closeUpload() {
    this.uploadVisible = false;
  }

  onUpload() {
    console.log("upload");
  }

  get action() {
    return `http://localhost:8001/private/${this.user_id}/upload/avatar`;
  }

  get headers() {
    return {
      Authorization: sessionStorage.getItem("token")
    };
  }
}
</script>

<style scoped lang="less">
.ani(@name,@func,@dura) {
  animation-name: @name;
  animation-timing-function: @func;
  animation-duration: @dura;
}
.setting {
  width: 80%;
  margin: 0 auto;
  .avatar {
    margin: 0 auto;
    width: 150px;
    height: 150px;
    position: relative;
    background: linear-gradient(45deg, transparent 50%, pink 0) bottom left,
      linear-gradient(-135deg, transparent 50%, pink 0) top right,
      linear-gradient(-45deg, transparent 50%, pink 0) bottom right,
      linear-gradient(135deg, transparent 50%, pink 0) top left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
    img {
      object-fit: fill;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    .loading {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: inline-block;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(45deg, transparent, transparent 30%, #ff6a6a);
      animation-name: loading;
      animation-timing-function: linear;
      animation-duration: 1s;
      animation-iteration-count: infinite;
      @keyframes loading {
        0% {
          transform: translate(-50%, -50%) rotate(0);
        }
        100% {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
      &::after {
        @dis: 3px;
        content: "";
        position: absolute;
        top: @dis;
        left: @dis;
        right: @dis;
        bottom: @dis;
        background-color: pink;
        border-radius: 50%;
      }
    }
  }
  form {
    width: 80%;
    margin: 50px auto 0 auto;
    min-width: 500px;
    .form-item {
      margin-top: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      .form-item-name {
        color: skyblue;
        font-weight: bold;
        min-width: 100px;
      }
      input {
        background-color: transparent;
        border: none;
        border-bottom: 2px solid skyblue;
        padding: 0 0 5px 10px;
        outline: none;
        width: 70%;
        color: salmon;
        font-size: 21px;
        transition: border-color 0.2s;
        &.error {
          border-color: var(--danger-color);
        }
      }
      .iconfont {
        font-size: 16px;
        color: skyblue;
        margin-left: 15px;
        cursor: pointer;
      }
    }
    .submit {
      @height: 50px;
      width: 100px;
      height: @height;
      margin: 0 auto;
      margin-top: 50px;
      text-align: center;
      line-height: @height;
      cursor: pointer;
      background-color: skyblue;
      border-radius: 999px;
      position: relative;
      z-index: 1;
    }
  }
  .overlay {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .upload {
    top: 100px;
    position: absolute;
    width: 60%;
    padding: 50px;
    background-color: #fff;
    left: 50%;
    transform: translateX(-50%);
    .icon-cha {
      position: absolute;
      right: 30px;
      top: 30px;
      cursor: pointer;
    }
  }
}
input::-webkit-input-placeholder {
  color: salmon;
}
.slideUp-enter-active,
.slideUp-leave-active {
  transition: 0.5s;
}
.slideUp-enter {
  top: 80px !important;
  opacity: 0.5;
}
.slideUp-leave-to {
  opacity: 0;
  top: 80px !important;
}
.animated {
  animation-duration: 0.2s !important;
}
</style>
