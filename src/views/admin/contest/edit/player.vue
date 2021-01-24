<template lang="pug">
a-table(:data-source="players")
  a-table-column(key="avatar", title="#")
    template(#default="{ text, record }")
      a-avatar(:src="record.avatarSrc")
  a-table-column(key="user_id", title="用户 ID", data-index="user_id")
  a-table-column(key="nickname", title="昵称", data-index="nickname")
</template>
<script lang="ts">
/* eslint-disable max-classes-per-file */
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
}
</script>
