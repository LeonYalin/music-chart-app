<template>
  <div class="band">
    <div class="name">
      <i class="el-icon-close close-icon" @click="onDeleteClick"/>
      <img class="thumb" v-show="imageUrl" :src="imageUrl"/>
      <span>{{band.name}}</span>
    </div>
    <el-rate v-model="band.rating" @change="onRatingChange"></el-rate>
  </div>
</template>

<script>
  import {firebaseService} from '../services/firebase.service';

  export default {
    props: ['band'],
    data() {
      return {
        imageUrl: ''
      }
    },
    created() {
      this.dbRef = firebaseService.db().ref(`bands/${this.band.key}`);
      this.getImageUrl();
    },
    methods: {
      onRatingChange(val) {
        if (this.dbRef.ref) {
          this.dbRef.update({rating: val});
        }
      },
      onDeleteClick() {
        if (this.dbRef.ref) {
          this.dbRef.remove();
          this.$message({message: 'Band successfully removed', type: 'success'});
        }
      },
      getImageUrl() {
        const storageRef = firebaseService.storage().ref(`bands/${this.band.name}`);
        storageRef.getDownloadURL().then(url => {
          this.imageUrl = url;
        }, e => {
          // no image
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .band {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ededed;
    line-height: 19px;
    text-transform: uppercase;

    &:hover {
      background-color: darken(white, 3%);

      .close-icon {
        display: inline;
      }
    }
  }

  .name {
    display: flex;
    align-items: center;
    height: 34px;
  }

  .thumb {
    width: 30px;
    margin-right: 5px;
    border: 1px solid lightgray;
  }

  .close-icon {
    display: none;
    cursor: pointer;
    color: red;
    font-size: 10px;
    margin-right: 5px;
    &:hover {
      color: darkred;
    }
  }
</style>
