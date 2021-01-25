<template lang="pug">
a-space(style="width: 100%;", direction="vertical")
  a-input-search(addonBefore="用户 ID", placeholder="e.g. 1024", v-model:value="newPlayerId", @search="addPlayer", type="number")
    template(#enterButton)
      a-button 添加
  a-table(:data-source="players")
    a-table-column(key="avatar", title="#")
      template(#default="{ text, record }")
        a-avatar(:src="record.avatarSrc")
    a-table-column(key="user_id", title="用户 ID", data-index="user_id")
    a-table-column(key="nickname", title="昵称", data-index="nickname")
    a-table-column(key="action", title="操作")
      template(#default="{ text, record }")
        a-button(@click="removePlayer(record.user_id)") 移除
</template>
<script lang="ts">
/* eslint-disable max-classes-per-file */
import { apiContestUserAdd, apiContestUserRemove, apiUserInformation } from '@/typescript/api';
import { getAvatarImageSrc } from '@/typescript/objFormatUrl';
import { Vue, prop, Options } from 'vue-class-component';

class CADParticipantsTableEntity implements ContestAdminDetailParticipantsEntity {
  user_id: number;

  nickname: string;

  key: string;

  avatarSrc: string;

  constructor(cadp: ContestAdminDetailParticipantsEntity) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.user_id = cadp.user_id;
    this.nickname = cadp.nickname;
    this.key = String(cadp.user_id);
    this.avatarSrc = getAvatarImageSrc(cadp.user_id);
  }
}

class Props {
  contestId = prop({
    type: Number,
    required: true,
  });

  contestPlayers = prop({
    type: Array,
    required: true,
  });
}

@Options({
  watch: {
    contestPlayers: {
      handler(nv: Array<ContestAdminDetailParticipantsEntity>) {
        this.players = nv.map((item) => new CADParticipantsTableEntity(item));
      },
      immediate: true,
    },
  },
})
export default class extends Vue.with(Props) {
  players = [] as (CADParticipantsTableEntity)[];

  newPlayerId = 1024;

  async addPlayer() {
    try {
      await apiContestUserAdd(this.contestId, Number(this.newPlayerId));
      const uinfo = await apiUserInformation(this.newPlayerId);
      this.players.push({
        // eslint-disable-next-line @typescript-eslint/camelcase
        user_id: uinfo.user_id,
        nickname: uinfo.nickname,
        key: String(uinfo.user_id),
        avatarSrc: getAvatarImageSrc(uinfo.user_id),
      });
    } catch (e) {
      // do nothing
    }
  }

  async removePlayer(playerId: number) {
    try {
      await apiContestUserRemove(this.contestId, playerId);
      this.players = this.players.filter((item) => item.user_id !== playerId);
    } catch (e) {
      // do nothing
    }
  }
}
</script>
