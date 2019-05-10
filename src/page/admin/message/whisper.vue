<template lang="pug">
  div
    a-form
      a-form-item(label="用户编号",:label-col="{ span: 5}",:wrapper-col="{ span: 12}")
        a-tooltip(placement="right")
          span(slot="title") USER ID
          a-input
            a-icon(slot="prefix",type="user")
      a-form-item(label="私信内容",:label-col="{ span: 5}",:wrapper-col="{ span: 12}")
        a-textarea(rows="4")
      a-form-item(:wrapper-col="{ span: 12, offset: 5}")
        a-button(type="primary",html-type="submit") 发送
</template>
