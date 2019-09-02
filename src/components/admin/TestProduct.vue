<template>
  <div class="container">
    <h3>Add Data to Firebase</h3>

    <div class="form-group">
      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control" />
    </div>
    <div class="form-group">
      <input type="text" placeholder="Product Name" v-model="product.price" class="form-control" />
    </div>
    <div class="form-group">
      <button @click.prevent="saveData" class="btn btn-primary">Save Data</button>
    </div>
    <br />
    <br />

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in items">
          <th scope="row">{{index}}</th>
          <td>{{item.data().name}}</td>
          <td>{{item.data().price}}$</td>
          <td>
            <button class="btn btn-success" @click="editItem(item)">Edit</button> /
            <button class="btn btn-danger" @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal code -->

    <div class="modal" tabindex="-1" role="dialog" id="edit">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <input
                type="text"
                placeholder="Product Name"
                v-model="product.name"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Product Price"
                v-model="product.price"
                class="form-control"
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="closeBox"
              >Close</button>
              <button type="button" class="btn btn-primary" @click="updateItem">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fb, db } from '../../firebase'
export default {
  data() {
    return {
      items: [],
      product: {
        name: null,
        price: null
      },
      get_id: null
    }
  },
  methods: {
    saveData() {
      db.collection("products").add(this.product)
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          //this.loadData()
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });

    },
    reset() {
      this.product = ''
    },
    loadData() {
      db.collection("products").get().then((datalist) => {
        datalist.forEach((doc) => {
          this.items.push(doc)
        })
      })
    },
    deleteItem(doc) {
      if (confirm("Are you Sure ??")) {
        db.collection("products").doc(doc).delete().then(function () {
          console.log("Document successfully deleted!");
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });
      }
    },
    editItem(doc) {
      $('#edit').modal('show')
      this.get_id = doc.id
      this.product = doc.data()
    },
    updateItem() {
      db.collection("products").doc(this.get_id).update(this.product).then(function () {
        console.log("Document successfully Updated!");
        this.reset()
      }).catch(function (error) {
        console.error("Error removing document: ", error);
      });
    },
    closeBox() {
      this.reset()
    }
  },
  created() {
    this.loadData()
  }
}
</script>