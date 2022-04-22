<template>
  <el-card class="my-music">
    <div class="sort">
      <el-button
        type="primary"
        size="small"
        @click="$store.commit('sortList', 'desc')"
        >热门排序</el-button
      >
      <el-button
        type="primary"
        size="small"
        @click="$store.commit('sortList', 'asc')"
        >默认排序</el-button
      >
    </div>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-if="playList && playList.length != 0">
        <el-table :data="playList" stripe border>
          <el-table-column type="index" />
          <el-table-column prop="music_name" label="歌曲名字" />
          <el-table-column prop="singer_name" label="歌手名字" />
          <el-table-column prop="listen_count" label="收听次数" />
          <el-table-column label="添加时间">
            <template #default="slopProps">
              {{ parseDate(slopProps.row.add_time * 1000) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" v-slot="slotProps">
            <el-button
              type="primary"
              :icon="
                `${
                  play_state &&
                  slotProps.row.music_name === $store.state.music_name
                    ? 'el-icon-video-pause'
                    : 'el-icon-video-play'
                }`
              "
              size="small"
              @click="
                handlePlay(
                  slotProps.row.music_url,
                  slotProps.row.music_name,
                  slotProps.row.singer_name,
                  slotProps.$index
                )
              "
            ></el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click.native="openDeleteBox(slotProps.row.music_id)"
            ></el-button>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-sizes="pagination.pageSizes"
          :layout="pagination.layout"
          :total="pagination.total"
          :page-size.sync="pagination.pageSize"
          :current-page.sync="pagination.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </transition>
  </el-card>
</template>

<script lang="ts">
import MyMusic from "./MyMusic";
export default MyMusic;
</script>

<style scoped lang="less">
.my-music {
  background-color: rgba(170, 75, 107, 0.2);
  min-width: 800px;
  .sort {
    margin-bottom: 20px;
    .el-button {
      font-size: 18px;
    }
  }
  .el-table {
    background-color: transparent !important;
    .el-button {
      font-size: 20px;
    }
  }
  .el-pagination {
    color: black !important;
    margin-top: 25px;
  }
}
</style>
