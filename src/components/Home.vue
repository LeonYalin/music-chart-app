<template>
  <div class="home">

    <!-- HEADER -->
    <h1 class="header">Music Bands Chart</h1>

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
        <el-button type="primary" class="add-btn" :plain="true" icon="plus" @click="onAddBandClick">Add</el-button>
      </div>
    </div>

    <!--LIST OF BANDS -->
    <el-table class="table" :data="bands" :empty-text="noItemsMsg" :border="true" :row-click="onRowClick">
      <el-table-column prop="name"
                       label="Band Name">
      </el-table-column>
      <el-table-column prop="rating"
                       label="Rating">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {firebaseService} from '../services/firebase.service';

  export default {
    name: 'hello',
    data() {
      return {
        bands: [],
        ratings: [
          {key: '1', label: '1', value: '1'},
          {key: '2', label: '2', value: '2'},
          {key: '3', label: '3', value: '3'},
          {key: '4', label: '4', value: '4'},
          {key: '5', label: '5', value: '5'},
          {key: '5+', label: '5+', value: '5+'},
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

      bands.on('value', data => {
        if (data.val()) {
          data.forEach(itemObj => {
            const item = itemObj.val();
            bands.push({name: item.name, rating: item.rating});
          });
        } else {
          this.noItemsMsg = 'No bands found';
        }
      });
    },
    methods: {
      onRowClick() {

      },
      onAddBandClick() {
        this.showAddNewBand = false;
        const bands = firebaseService.db().ref('bands');
        const newBand = bands.push({
          name: this.addBand.name,
          rating: this.addBand.rating
        });
        this.$message({message: 'Band successfully Added', type: 'success'});
      }
    }
  }
</script>

<style scoped>
  .home {
    width: 600px;
    margin: 0 auto;
    padding-top: 100px;
  }

  .header {
    font-size: 50px;
    text-align: center;
    color: #97a8be;
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
    width: 200px;
  }

  .add-btn {
    margin-left: 10px;
  }
</style>
