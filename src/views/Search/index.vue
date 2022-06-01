<template>
  <div>
    <van-search
      @input="inputFn"
      v-model="value"
      placeholder="请输入搜索关键词"
      shape="round"
    />
    <div v-if="ResultList.length === 0">
      <van-cell value="热门搜索" />
      <div class="hot_list" v-for="item in list" :key="item.id">
        <span class="hot_item" @click="searchEvent(item.searchWord)">{{
          item.searchWord
        }}</span>
      </div>
    </div>
    <div v-else>
      <van-cell value="最佳匹配" />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          :title="row.name"
          :label="row.ar[0].name + ' ' + row.name"
          center
          v-for="row in ResultList"
          :key="row.id"
        >
          <template right-icon>
            <van-icon name="play-circle" size="20" @click="playFn(row.id)" />
          </template>
        </van-cell>
        <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      </van-list>
    </div>
  </div>
</template>

<script>
import { searchKeywords, searchResultAPI } from "@/api";
export default {
  name: "MusicIndex",

  data() {
    return {
      value: "",
      list: [],
      ResultList: [],
      loading: false,
      finished: false,
      page: 1,
      timer: null,
    };
  },

  mounted() {},
  created() {
    this.getSearch();
  },
  methods: {
    playFn(id) {
      this.$router.push({
        path: "/play",
        query: {
          id: id,
        },
      });
    },
    async onLoad() {
      this.page++;
      console.log(this.page);
      let ros = await this.getList();
      this.ResultList = [...this.ResultList, ...ros];
      this.loading = false;
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    },
    async getList() {
      let res = await searchResultAPI({
        keywords: this.value,
        limit: 20,
        offset: (this.page - 1) * 20,
      });
      console.log(res.data.result.songs);
      return res.data.result.songs;
    },
    async getSearch() {
      let { data: res } = await searchKeywords();
      //  console.log(res);
      //  console.log(res.data);
      this.list = res.data;
    },
    async searchEvent(first) {
      this.page = 1;
      this.value = first;
      this.finished = false;
      let res = await this.getList();
      this.ResultList = res;
      this.loading = false;
    },
    async inputFn() {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        this.page = 1;
        this.finished = false;
        if (this.value.length === 0) {
          this.ResultList = [];
          return;
        }
        let res = await this.getList();
        if (res === undefined) {
          this.ResultList = [];
          return;
        }
        this.ResultList = res;
        this.loading = false;
      }, 900);
    },
  },
};
</script>

<style scoped>
button {
  border-radius: 2rem;
}
van-search {
  height: 3rem;
}
.hot_list {
  float: left;
}
.hot_item {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  margin-left: 8px;
  margin-top: 8px;
  padding: 10px;
  font-size: 14px;
  color: #666;
  border-radius: 20px;
  border: 1px solid #333;
}
</style>