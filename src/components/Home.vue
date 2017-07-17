<template>
  <div class="home">

    <!-- HEADER -->
    <div class="logout">
      <el-button type="info" :plain="true" @click="onHelpClick">Help</el-button>
      <el-button type="primary" @click="onLogOut">Log Out</el-button>
    </div>
    <h1 class="title">Music Chart</h1>

    <!-- ADD BAND ROW -->
    <div class="add-band">
      <el-button type="primary" :plain="true" icon="plus" @click="showAddNewBand=true"></el-button>

      <div class="ratings-wrapper" v-if="showAddNewBand">
        <el-input class="add-name" placeholder="Band name" v-model="addBand.name"></el-input>

        <el-select class="ratings-dropdown" v-model="addBand.rating" placeholder="Select">
          <el-option v-for="rating in ratings"
                     :key="rating.value"
                     :label="rating.label"
                     :value="rating.value">
          </el-option>
        </el-select>

        <el-upload class="upload-btn" ref="upload"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :show-file-list="false"
                   :http-request="uploadHttpRequest">
          <el-button type="primary" :plain="true">Upload Photo</el-button>
        </el-upload>

        <el-button type="primary" class="add-btn" :plain="true" icon="plus" @click="onAddBandClick">Add</el-button>
      </div>
    </div>

    <!--LIST OF BANDS -->
    <transition-group name="list">
      <Band v-for="band in bands" :band="band" :key="band.key"></Band>
    </transition-group>
    <div v-show="bands.length === 0" class="no-items-msg">{{noItemsMsg}}</div>
  </div>
</template>

<script>
  import {firebaseService} from '../services/firebase.service';
  import * as Band from './Band.vue';

  export default {
    name: 'hello',
    components: {
      'Band': Band,
    },
    data() {
      return {
        bands: [],
        ratings: [
          {key: 1, label: 1, value: 1},
          {key: 2, label: 2, value: 2},
          {key: 3, label: 3, value: 3},
          {key: 4, label: 4, value: 4},
          {key: 5, label: 5, value: 5},
        ],
        addBand: {
          name: '',
          rating: null
        },
        showAddNewBand: false,
        noItemsMsg: 'Loading...',
      }
    },
    created() {
      firebaseService.connect();
      const bands = firebaseService.db().ref('bands');
      let _bands = [];

      // Listen for DB changes
      bands.on('value', data => {
        if (data.val()) {
          _bands = [];
          data.forEach(itemObj => {
            const item = itemObj.val();
            _bands.push({key: itemObj.key, name: item.name, rating: item.rating});
          });
          this.bands = _bands;
        } else {
          this.noItemsMsg = 'No bands found';
          this.bands = [];
        }
      });
    },
    methods: {
      onAddBandClick() {
        this.showAddNewBand = false;
        const bands = firebaseService.db().ref('bands');
        bands.push({
          name: this.addBand.name,
          rating: this.addBand.rating,
        });
        this.$refs.upload.submit();
        this.$message({message: 'Band successfully Added', type: 'success'});
      },
      onLogOut() {
        firebaseService.signOut().then(_ => {
          this.$cookie.delete('rememberMe');
          this.$router.push('/');
        });
      },
      onHelpClick() {
        this.$router.push('help');
      },
      uploadHttpRequest(data) {
        firebaseService.uploadFile(data.file, this.addBand.name, (snapshot) => {
          // progress
          const precentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        }, (e) => {
          // error
        }, () => {
          // success
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home {
    width: 600px;
    margin: 0 auto;
    padding-top: 14px;
  }

  .logout {
    display: flex;
    justify-content: flex-end;
  }

  .title {
    font-size: 50px;
    text-align: center;
    color: #97a8be;
    padding-top: 50px;
  }

  .add-band {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .ratings-wrapper {
    display: flex;
  }

  .ratings-dropdown {
    width: 100px;
    margin-left: 10px;
  }

  .add-name {
    width: 160px;
  }

  .add-btn {
    margin-left: 10px;
  }

  .list-enter-active, .list-leave-active {
    transition: all 0.5s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .no-items-msg {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
