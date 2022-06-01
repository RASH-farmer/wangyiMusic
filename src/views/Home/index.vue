<template>
  <div>
    <van-cell value="推荐歌单" />
    <van-row gutter="8">
      <van-col span="8" v-for="item in recommendList" :key="item.id">
        <van-image width="100%" height="8rem" fit="fill" :src="item.picUrl"
          ><template v-slot:error>加载失败</template></van-image
        >

        <div class="txt">
          <span>{{ item.name }}</span>
        </div>
      </van-col>
    </van-row>
    <van-cell value="最新音乐" />
    <van-cell
      :title="row.name"
      :label="row.song.artists[0].name + ' ' + row.name"
      center
      v-for="row in NewMusic"
      :key="row.id"
    >
      <template right-icon>
        <!-- <van-icon name="play-circle" /> -->
        <van-icon name="play-circle" size="20" @click="playFn(row.id)" />
      </template>
    </van-cell>
  </div>
</template>

<script>
// import { Toast } from "vant";
import { recommendMusicApi, recommendMusicNew } from "@/api";
export default {
  data() {
    return {
      value: "",
      // 存储接口所有数据
      list: [],
      // 接口过滤后的数据
      recommendList: [],
      NewMusic: [],
    };
  },
  created() {
    this.getdata();
    this.getNew();
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
    // onSearch(val) {
    //   Toast(val);
    // },
    // onCancel() {
    //   Toast('取消');
    // },
    async getdata() {
      // console.log(res.result);
      // this.recommendList = res.result
      const ranNum = 5;
      let { data: res } = await recommendMusicApi({ limit: 30 });
      this.list = res.result;
      console.log(this.list);
      for (let i = 0; i <= ranNum; i++) {
        const num = Math.floor(Math.random() * (this.list.length - 1));
        this.recommendList.push(this.list[num]);
        this.list[num] = this.list[this.list.length - i - 1];
      }
    },
    async getNew() {
      let { data: res1 } = await recommendMusicNew({ limit: 10 });
      console.log(res1.result);
      this.NewMusic = res1.result;
    },
  },
};
</script>

<style  scoped>
.txt {
  text-align: center;
  font-size: 0.5rem;
  align-items: center;
}
van-cell {
  background-color: pink;
}
</style>