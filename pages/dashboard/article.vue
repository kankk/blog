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
      <div class="content-cell-label">
        标签
      </div>
    </div>
    <div class="content-cell">
      <div class="content-cell-label">
        文章
      </div>
    </div>
    <m-dialog :visible.sync="isShowClassificationDialog" @confirm="handleClassificationDialogConfirm">
      <template v-slot:header>
        <span>添加新分类</span>
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
      inputClassification: ''
    }
  },
  watch: {
    isShowClassificationDialog (val) {
      if (!val) {
        this.inputClassification = ''
      }
    }
  },
  async asyncData ({ $axios }) {
    const classRes = await $axios.get('/api/blog/class/all')
    if (classRes.code === 200) {
      return { classificationList: classRes.data }
    } else {
      return { classificationList: [] }
    }
  },
  methods: {
    // 获取分类列表
    async getClassificationList () {
      const classRes = await this.$axios.get('/api/blog/class/all')
      if (classRes.code === 200) {
        this.classificationList = classRes.data || []
      }
    },
    // 显示添加分类的
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
