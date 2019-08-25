<style lang="scss">
  .category-box {
    color: #999;
    padding: 10px;
    display: -webkit-box;
    overflow-x: scroll;
    overflow-scrolling: touch;
    white-space: nowrap;

    &__item {
      position: relative;
      display: inline-block;
      letter-spacing: 1px;
      font-size: 1.05rem;
      padding-bottom: 4px;
      line-height: 2.5;

      &:not(:last-child) {
        margin-right: 24px;
      }
    }

    &__item--active {
      color: $theme-color;

      &:after {
        content: '';
        height: 4px;
        width: 30px;
        left: calc(50% - 15px);
        border-radius: 4px;
        bottom: -5px;
        position: absolute;
        @include gradient-background;
      }
    }

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
      display: none;
    }

  }
</style>

<template>
  <div class="category-box" :style="style">
    <nuxt-link
      :to="$route.path"
      class="category-box__item"
      :class="{'category-box__item--active': !$route.query.categoryId}"
    >
      全部
    </nuxt-link>
    <nuxt-link
      v-for="item in categoryList"
      :key="item.id"
      :to="`${$route.path}?categoryId=${item.id}&page=1`"
      class="category-box__item"
      :class="{'category-box__item--active':isActiveCategory(item)}"
    >
      {{ item.name }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'CategoryBox',
  props: {
    module: {
      type: String,
      default: ''
    }
  },
  computed: {
    categoryList() {
      const allList = this.$store.getters.categoryList || []
      return allList.filter((item) => {
        return item.module === this.module
      })
    },
    style() {
      return {
        height: this.height,
        width: this.width
      }
    }
  },
  methods: {
    isActiveCategory(categoryItem) {
      const { id } = categoryItem
      return parseInt(this.$route.query.categoryId) === parseInt(id)
    }
  }
}
</script>