<template lang="pug">
div
  a-row.n-margin(:gutter="16")
    a-col(span="12",offset="5")
      a-tooltip
        a-input(placeholder="挑一个未被使用的题目编号")
    a-col
      a-button 转到编辑
  a-row
    a-col(span="12",offset="5")
      a-card
        p 这里是一张可爱的图
</template>
