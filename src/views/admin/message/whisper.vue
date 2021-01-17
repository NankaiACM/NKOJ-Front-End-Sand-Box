<template lang="pug">
div
  a-form
    a-form-item(label="用户编号", :label-col="{ span: 5 }", :wrapper-col="{ span: 12 }")
      a-space
        a-input-number(v-model:value="whisperPackage.uid", @change="setNickname")
        a-button(:loading="nicknameLoading") {{ nickname }}
          template(#icon)
            a-avatar(:src="avatarSrc", size="small")
    a-form-item(label="私信标题", :label-col="{ span: 5 }", :wrapper-col="{ span: 12 }")
      a-tooltip(placement="right")
        template(#title) TITLE
        a-input(v-model:value="whisperPackage.title")
          template(#prefix)
            NotificationOutlined
    a-form-item(label="私信内容", :label-col="{ span: 5 }", :wrapper-col="{ span: 12 }")
      a-textarea(rows="4", v-model:value="whisperPackage.message")
    a-form-item(:wrapper-col="{ span: 12, offset: 5 }")
      a-button(type="primary", html-type="submit", @click="whisper", :loading="loading") 发送
</template>
<script lang="ts">
import { UserOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { Options, Vue } from 'vue-class-component';
import {
  AdminWhisperInterface,
  UserInformation,
  apiWhisper,
  apiUserInformation,
  AVATAR_BASE_URL,
} from '@/map/api';

@Options({
  components: {
    UserOutlined,
    NotificationOutlined,
  },
  computed: {
    avatarSrc() {
      return AVATAR_BASE_URL + this.whisperPackage.uid;
    },
  },
})
export default class extends Vue {
  loading = false;

  whisperPackage: AdminWhisperInterface = {
    uid: -1,
    title: '',
    message: '',
  };

  nickname = '';

  nicknameLoading = false;

  async whisper() {
    this.loading = true;
    console.log(this.whisperPackage);
    try {
      await apiWhisper(this.whisperPackage);
    } catch (e) {
      // do nothing
    }
    this.loading = false;
  }

  async setNickname() {
    this.nicknameLoading = true;
    try {
      const userInformation: UserInformation = await apiUserInformation(this.whisperPackage.uid);
      this.nickname = userInformation.nickname;
    } catch (e) {
      // do nothing
    }
    this.nicknameLoading = false;
  }
}
</script>
