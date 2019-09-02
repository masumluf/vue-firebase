<template>
  <div class="container">
    <button class="btn btn-primary float-right" @click="editItemNew">Add New Item</button>
    <br />
    <hr />
    <label for="exampleInputEmail1">List of Products</label>
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
        <tr v-for="(product,index) in products">
          <th scope="row">{{index}}</th>
          <td>{{product.name}}</td>
          <td>{{product.price}}$</td>
          <td>
            <button class="btn btn-success" @click="editItem(product)">Edit</button> /
            <button class="btn btn-danger" @click="deleteItem(product['.key'])">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!--Modal-->
    <div
      id="addItem"
      class="modal fade bd-example-modal-xl"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myExtraLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="container">
            <div class="modal-header">Add New Item</div>
            <div class="row rowPadding">
              <div class="col-sm-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Product Name</label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    v-model="product.name"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Product Descripton</label>
                  <textarea
                    class="form-control"
                    aria-label="With textarea"
                    v-model="product.description"
                  ></textarea>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="form-group">
                  <label for="exampleInputEmail1">Product Price</label>
                  <input
                    type="text"
                    placeholder="Product Price"
                    v-model="product.price"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Tag</label>
                  <input
                    type="text"
                    placeholder="Product Price"
                    v-model="product.tag"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="file"
                    class="form-group"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                  />
                </div>
              </div>
              <div></div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="closeBox"
              >Close</button>
              <button
                type="button"
                class="btn btn-primary"
                @click="addItem"
                v-if="condition=='new'"
              >Save changes</button>
              <button
                type="button"
                class="btn btn-primary"
                @click="updateItem"
                v-if="condition=='edit'"
              >Apply Changes</button>
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
        price: null,
        tag: null,
        description: null,
        image: null
      },
      get_id: null,
      condition: null
    }
  },
  firestore() {
    return {
      products: db.collection('products')
    }
  },
  methods: {
    addItem() {

      this.$firestore.products.add(this.product)
        .then(() => {
          $('#addItem').modal('hide')
          this.reset

        })

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
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$firestore.products.doc(doc).delete()
          Toast.fire({
            type: 'success',
            title: 'Signed in successfully'
          })

        }
      })
    },
    editItem(doc) {
      this.condition = 'edit'
      this.product = doc
      this.get_id = doc['.key']
      $('#addItem').modal('show')
      //   this.product = doc.data()
    },
    editItemNew(doc) {
      this.condition = 'new'
      $('#addItem').modal('show')

      //   this.get_id = doc.id
      //   this.product = doc.data()
    },
    updateItem() {
      this.$firestore.products.doc(this.get_id).update(this.product)
        .then(() => {
          Toast.fire({
            type: 'success',
            title: 'Updated in successfully'
          })
          $('#addItem').modal('show')
        })

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
<style scoped>
.rowPadding {
  padding: 5rem;
}
</style>