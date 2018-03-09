<template>
  <transition name="drop">
    <div class="top-tip" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      delay: {
        type: Number,
        default: 2000
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.hide()
        }, this.delay)
      },
      hide() {
        this.showFlag = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .top-tip
    position: fixed
    top: 0
    bottom: 100px
    left: 0
    right: 0
    margin: auto
    width: 150px
    height: 150px
    border-radius: 20px
    z-index: 500
    opacity: 0.9
    background: $color-background
    &.drop-enter-active, &.drop-leave-active
      transition: all 0.5s
    &.drop-enter, &.drop-leave-to
      opacity: 0
</style>