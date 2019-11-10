export default {
  currentPage(state) {
    return state.currentPage
  },
  currentItem(state) {
    return state.currentItem
  },
  configurationList(state) {
    return state.configurationList
  },
  fileAssetList(state) {
    return state.fileAssetList
  },
  imageAssetList(state) {
    return state.imageAssetList
  },
  moduleList(state) {
    const extraModule = [
      { name: '轴线', url: 'timeline', icon: 'iconfont icon-schedule' }
    ]
    return [...extraModule, ...state.moduleList]
  },
  pageList(state) {
    return state.pageList
  },
  categoryList(state) {
    return state.categoryList
  }
}
