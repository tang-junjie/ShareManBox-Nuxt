<style lang="scss">
  .modal {
    z-index: $z-index-modal;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    &__overlay {
      position: fixed;
      z-index: $z-index-overlay;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255,255,255,.9);
      filter: blur(5px)
    }

    &__container {
      position: relative;
      z-index: $z-index-modal;
      height: auto;
      overflow: hidden;
      max-width: 96%;
      margin: 0 auto;
      background-color: #fff;
      box-shadow: 0 0 30px 8px rgba(177,177,177, .2);

      &__header {
        font-size: 1.15rem;
        letter-spacing: 2px;
        color: #666;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 16px 24px;
        box-shadow: 0 6px 6px rgba(177,177,177,.1);

        ::v-deep i {
          font-size: 20px;
        }

        &__name {
          cursor: default;
          display: inline-block;
        }

        &__close {
          color: #ddd;
          transition: all .2s ease-in-out;
          cursor: pointer;

          &:hover {
            transform: scale(1.2);
          }
        }
      }

      &__content {
        padding: 24px;
        max-height: 80vh;
        overflow: auto;

        @media ($screen-md-max) {
          width: 100%;
          order: 2;
          padding: 16px 10px;
        }
      }

      &__footer {
        width: 100%;
      }

    }

  }
</style>

<template>
  <div v-if="showModal" class="modal">
    <div class="modal__overlay" @click="toggleModalStatus()"></div>
    <div class="modal__container" :style="containerStyle">
      <div class="modal__container__header">
        <div class="modal__container__header__name">
          <Icon v-if="icon" :name="icon" />
          {{ title }}
        </div>
        <span class="modal__container__header__close" @click="toggleModalStatus()">
          <Icon name="close" />
        </span>
      </div>
      <div class="modal__container__content">
        <slot />
      </div>
      <div v-if="$slots.footer" class="modal__container__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  model: {
    prop: 'showModal',
    event: 'toggleModalStatus'
  },
  props: {
    width: {
      type: String,
      default: '90%'
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    showModal: {
      type: Boolean,
      default: false
    },
    lockScroll: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    containerStyle () {
      return {
        width: this.width
      }
    }
  },
  watch: {
    showModal (value) {
      this.lockScroll && this.setScreenScrolling(value ? 'hidden' : 'auto')
    }
  },
  destroyed () {
    this.lockScroll && this.setScreenScrolling('auto')
  },
  methods: {
    toggleModalStatus () {
      this.$emit('toggleModalStatus', !this.showModal)
      this.$emit(this.showModal ? 'onOpen' : 'onClose')
    },
    setScreenScrolling (attr) {
      document.body.style.setProperty('overflow', attr)
    }
  }
}
</script>
