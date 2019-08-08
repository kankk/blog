<template>
  <div class="dashboard-article">
    <div class="content-cell">
      <div class="content-cell-label layout-flex-between">
        <span>分类</span>
        <m-button inline @click="showClassificationDialog">
          添加
        </m-button>
      </div>
      <div class="classification-list">
        <div v-for="c in classificationList" :key="c.id" class="classification-item">
          <div class="classification-item-name">
            {{ c.name }}
          </div>
          <div class="classification-item-operate">
            <span class="operate-item classification-delete" @click="handleDeleteClassification(c)">删除</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-cell">
      <div class="content-cell-label layout-flex-between">
        <span>标签</span>
        <m-button inline @click="showTagDialog">
          添加
        </m-button>
      </div>
      <div class="tag-list">
        <div v-for="t in tagList" :key="t.id" class="tag-item">
          <div class="tag-item-name">
            {{ t.name }}
          </div>
          <div class="tag-item-operate">
            <span class="operate-item tag-delete" @click="handleDeleteTag(t)">删除</span>
          </div>
        </div>
      </div>
    </div>
    <div class="content-cell">
      <div class="content-cell-label">
        文章
      </div>
    </div>
    <m-dialog :visible.sync="isShowClassificationDialog" @confirm="handleClassificationDialogConfirm">
      <template v-slot:header>
        <span>添加分类</span>
      </template>
      <template>
        <form>
          <div class="form-item">
            <div class="form-item-label">
              分类名称
            </div>
            <div class="form-item-input">
              <input v-model="inputClassification" class="classification-title" type="text">
            </div>
          </div>
        </form>
      </template>
    </m-dialog>
    <m-dialog :visible.sync="isShowTagDialog" @confirm="handleTagialogConfirm">
      <template v-slot:header>
        <span>添加标签</span>
      </template>
      <template>
        <form>
          <div class="form-item">
            <div class="form-item-label">
              标签名称
            </div>
            <div class="form-item-input">
              <input v-model="inputTag" class="classification-title" type="text">
            </div>
          </div>
        </form>
      </template>
    </m-dialog>
  </div>
</template>

<script>
import MButton from '~/components/button.vue'
import MDialog from '~/components/dialog.vue'
export default {
  name: 'Article',
  components: {
    MButton,
    MDialog
  },
  data () {
    return {
      classificationList: [],
      isShowClassificationDialog: false,
      inputClassification: '',

      tagList: [],
      isShowTagDialog: false,
      inputTag: ''
    }
  },
  watch: {
    isShowClassificationDialog (val) {
      if (!val) {
        this.inputClassification = ''
      }
    },
    isShowTagDialog (val) {
      if (!val) {
        this.inputTag = ''
      }
    }
  },
  async asyncData ({ $axios }) {
    const res = await Promise.all([
      await $axios.get('/api/blog/class/all'),
      await $axios.get('/api/blog/tag/all')
    ])
    const result = {}
    if (res[0] && res[0].code === 200) {
      Object.assign(result, {
        classificationList: res[0].data || []
      })
    }
    if (res[1] && res[1].code === 200) {
      Object.assign(result, {
        tagList: res[1].data || []
      })
    }
    return result
  },
  methods: {
    // 获取分类列表
    async getClassificationList () {
      const classRes = await this.$axios.get('/api/blog/class/all')
      if (classRes.code === 200) {
        this.classificationList = classRes.data || []
      }
    },
    // 显示添加分类的弹窗
    showClassificationDialog () {
      this.isShowClassificationDialog = true
    },
    // 提交新分类
    async handleClassificationDialogConfirm () {
      const res = await this.$axios.post('/api/blog/class/add', {
        name: this.inputClassification
      })
      if (res.code === 200) {
        this.isShowClassificationDialog = false
        this.getClassificationList()
      } else {

      }
    },
    // 删除分类
    async handleDeleteClassification (c) {
      const confirmResult = confirm(`确认删除该分类(${c.name})?`)
      if (confirmResult) {
        const res = await this.$axios.post('/api/blog/class/delete', {
          id: c.id
        })
        if (res.code === 200) {
          this.getClassificationList()
        } else {

        }
      }
    },
    // 获取分类列表
    async getTagList () {
      const tagRes = await this.$axios.get('/api/blog/tag/all')
      if (tagRes.code === 200) {
        this.tagList = tagRes.data || []
      }
    },
    // 显示添加标签的弹窗
    showTagDialog () {
      this.isShowTagDialog = true
    },
    // 提交新标签
    async handleTagialogConfirm () {
      const res = await this.$axios.post('/api/blog/tag/add', {
        name: this.inputTag
      })
      if (res.code === 200) {
        this.isShowTagDialog = false
        this.getTagList()
      } else {

      }
    },
    // 删除分类
    async handleDeleteTag (t) {
      const confirmResult = confirm(`确认删除该标签(${t.name})?`)
      if (confirmResult) {
        const res = await this.$axios.post('/api/blog/tag/delete', {
          id: t.id
        })
        if (res.code === 200) {
          this.getTagList()
        } else {

        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/color.scss';
.dashboard-article {

  .classification-list {
    padding-top: 8px;
    .classification-item {
      display: flex;
      &:not(:last-child) {
        margin-bottom: 4px;
      }
      &:hover {
        cursor: pointer;
        background-color: $color-background;
      }
      .classification-item-name {
        flex: 1;
        color: $color-title;
      }
      .classification-item-operate {
        position: relative;
        .operate-item {
          opacity: 0.35;
          &:hover {
            cursor: pointer;
            opacity: 0.85;
          }
          &:not(:first-child) {
            margin-left: 4px;
          }
        }
        .classification-delete {
          color: $color-error;
        }
      }
    }
  }

  .tag-list {
    padding-top: 8px;
    .tag-item {
      display: flex;
      &:not(:last-child) {
        margin-bottom: 4px;
      }
      &:hover {
        cursor: pointer;
        background-color: $color-background;
      }
      .tag-item-name {
        flex: 1;
        color: $color-title;
      }
      .tag-item-operate {
        position: relative;
        .operate-item {
          opacity: 0.35;
          &:hover {
            cursor: pointer;
            opacity: 0.85;
          }
          &:not(:first-child) {
            margin-left: 4px;
          }
        }
        .tag-delete {
          color: $color-error;
        }
      }
    }
  }

  .form-item {
    display: flex;
    align-items: center;
    .form-item-label {
      color: $color-title;
      margin-right: 12px;
    }
    .form-item-input {
      flex: 1;
      .classification-title {
        width: 100%;
      }
    }
  }
}
</style>
