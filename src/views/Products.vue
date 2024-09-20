<template>
  <div class="products-container">
    <h2>List of Products</h2>
    <button class="btn btn-primary mb-2 float-end" @click="showModal('create')">
      Add New Product
    </button>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Product Name</th>
          <th scope="col">Description</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Category</th>
          <th scope="col">Barcode</th>
          <th scope="col">Status</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>${{ product.price.toFixed(2) }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.barcode }}</td>
          <td>{{ product.status }}</td>
          <td>
            <button
              class="btn btn-info btn-sm me-2"
              @click="showModal('view', product)"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              class="btn btn-warning btn-sm me-2"
              @click="showModal('edit', product)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="btn btn-danger btn-sm me-2"
              @click="confirmDelete(product.id)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal :visible="modalVisible" @close="closeModal">
      <template v-if="modalType === 'create'">
        <h3>Create New Product</h3>
        <form @submit.prevent="createProduct" class="modal-form">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name">Product Name:</label>
                <input
                  type="text"
                  v-model="form.name"
                  required
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="price">Price:</label>
                <input
                  type="number"
                  v-model="form.price"
                  required
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="stock">Stock Quantity:</label>
                <input
                  type="number"
                  v-model="form.stock"
                  required
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="category">Category:</label>
                <input
                  type="text"
                  v-model="form.category"
                  required
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>
          </div>

          <div class="form-group mt-2">
            <label for="description">Description:</label>
            <textarea
              v-model="form.description"
              class="form-control form-control-sm-2"
            ></textarea>
          </div>

          <div class="row mt-2">
            <div class="col-md-6">
              <div class="form-group">
                <label for="barcode">Barcode:</label>
                <input
                  type="text"
                  v-model="form.barcode"
                  required
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="status">Status:</label>
                <select
                  v-model="form.status"
                  class="form-control form-control-sm-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-success btn-sm-2 mt-3 me-2">
            Confirm
          </button>
          <button @click="closeModal" class="btn btn-secondary btn-sm-2 mt-3">
            Close
          </button>
        </form>
      </template>

      <template v-else-if="modalType === 'edit'">
        <h3>Edit Product</h3>
        <form @submit.prevent="updateProduct" class="modal-form">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name">Product Name:</label>
                <input
                  type="text"
                  v-model="form.name"
                  required
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="price">Price:</label>
                <input
                  type="number"
                  v-model="form.price"
                  required
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="stock">Stock Quantity:</label>
                <input
                  type="number"
                  v-model="form.stock"
                  required
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="category">Category:</label>
                <input
                  type="text"
                  v-model="form.category"
                  required
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>
          </div>

          <div class="form-group mt-2">
            <label for="description">Description:</label>
            <textarea
              v-model="form.description"
              class="form-control form-control-sm-2"
            ></textarea>
          </div>

          <div class="row mt-2">
            <div class="col-md-6">
              <div class="form-group">
                <label for="barcode">Barcode:</label>
                <input
                  type="text"
                  v-model="form.barcode"
                  required
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="status">Status:</label>
                <select
                  v-model="form.status"
                  class="form-control form-control-sm-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary btn-sm-2 mt-3">
            Confirm
          </button>
          <button
            @click="closeModal"
            class="btn btn-secondary btn-sm-2 ms-2 mt-3"
          >
            Close
          </button>
        </form>
      </template>

      <template v-else-if="modalType === 'view'">
        <h3>View Product</h3>
        <form class="modal-form">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name">Product Name:</label>
                <input
                  type="text"
                  v-model="form.name"
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="price">Price:</label>
                <input
                  type="number"
                  v-model="form.price"
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="stock">Stock Quantity:</label>
                <input
                  type="number"
                  v-model="form.stock"
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="category">Category:</label>
                <input
                  type="text"
                  v-model="form.category"
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>
          </div>

          <div class="form-group mt-2">
            <label for="description">Description:</label>
            <textarea
              v-model="form.description"
              class="form-control form-control-sm-2"
            ></textarea>
          </div>

          <div class="row mt-2">
            <div class="col-md-6">
              <div class="form-group">
                <label for="barcode">Barcode:</label>
                <input
                  type="text"
                  v-model="form.barcode"
                  class="form-control form-control-sm-2"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="status">Status:</label>
                <select
                  v-model="form.status"
                  class="form-control form-control-sm-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div class="mt-3 d-flex justify-content-start">
            <button @click="closeModal" class="btn btn-secondary btn-sm-2">
              Close
            </button>
          </div>
        </form>
      </template>
    </Modal>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import Modal from "../components/Modal.vue";

export default {
  components: { Modal },
  setup() {
    const products = ref([
      {
        id: 1,
        name: "Produit A",
        description: "Description A",
        price: 50,
        stock: 100,
        category: "Electronics",
        barcode: "123456789012",
        status: "Active",
      },
      {
        id: 2,
        name: "Produit B",
        description: "Description B",
        price: 200,
        stock: 50,
        category: "Sports",
        barcode: "987654321098",
        status: "Inactive",
      },
    ]);

    const form = reactive({
      id: null,
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      barcode: "",
      status: "Active",
    });

    const modalVisible = ref(false);
    const modalType = ref("create");

    const showModal = (type, product = null) => {
      modalType.value = type;
      if (product) {
        Object.assign(form, product);
      } else {
        Object.assign(form, {
          id: null,
          name: "",
          description: "",
          price: 0,
          stock: 0,
          category: "",
          barcode: "",
          status: "Active",
        });
      }
      modalVisible.value = true;
    };

    const closeModal = () => {
      modalVisible.value = false;
    };

    const createProduct = () => {
      const newProduct = { ...form, id: products.value.length + 1 };
      products.value.push(newProduct);
      closeModal();
    };

    const updateProduct = () => {
      const index = products.value.findIndex((p) => p.id === form.id);
      if (index !== -1) {
        products.value.splice(index, 1, { ...form });
      }
      closeModal();
    };

    const confirmDelete = (id) => {
      if (confirm("Are you sure you want to delete this product?")) {
        const index = products.value.findIndex((p) => p.id === id);
        if (index !== -1) {
          products.value.splice(index, 1);
        }
      } else {
        console.log("Product deletion canceled");
      }
    };

    return {
      products,
      form,
      modalVisible,
      modalType,
      showModal,
      closeModal,
      createProduct,
      updateProduct,
      confirmDelete,
    };
  },
};
</script>

<style scoped>
.products-container {
  width: 80%;
  margin: auto;
}
</style>
