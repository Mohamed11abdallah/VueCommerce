<template>
  <div class="products-container">
    <h2>List of Products</h2>
    <button class="add-button" @click="showModal('create')">
      Add New Product
    </button>

    <table class="products-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
          <th>Barcode</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.barcode }}</td>
          <td>{{ product.status }}</td>
          <td class="actions">
            <button
              class="action-button view"
              @click="showModal('view', product)"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              class="action-button edit"
              @click="showModal('edit', product)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="action-button delete"
              @click="confirmDelete(product.id)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal :visible="modalVisible" @close="closeModal">
      <!-- Templates des modals pour ajouter, éditer et afficher un produit -->
      <template v-if="modalType === 'create'">
        <h3>Create New Product</h3>
        <form @submit.prevent="createProduct" class="modal-form">
          <label for="name">Product Name:</label>
          <input type="text" v-model="form.name" required />

          <label for="description">Description:</label>
          <input type="text" v-model="form.description" required />

          <label for="price">Price:</label>
          <input type="number" v-model="form.price" required />

          <label for="stock">Stock Quantity:</label>
          <input type="number" v-model="form.stock" required />

          <label for="category"> Category:</label>
          <input type="text" v-model="form.category" required />

          <label for="barcode">Barcode:</label>
          <input type="text" v-model="form.barcode" required />

          <label for="status">Status:</label>
          <select v-model="form.status">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit" class="submit-button">Confirm</button>
          <button @click="closeModal" class="close-button">Close</button>
        </form>
      </template>

      <template v-else-if="modalType === 'edit'">
        <h3>Edit Product</h3>
        <form @submit.prevent="updateProduct" class="modal-form">
          <!-- Formulaire pour éditer un produit -->
          <label for="name">Product Name:</label>
          <input type="text" v-model="form.name" required />

          <label for="description">Description:</label>
          <input type="text" v-model="form.description" required />

          <label for="price">Price:</label>
          <input type="number" v-model="form.price" required />

          <label for="stock">Stock:</label>
          <input type="number" v-model="form.stock" required />

          <label for="category">Category:</label>
          <input type="text" v-model="form.category" required />

          <label for="barcode">Barcode:</label>
          <input type="text" v-model="form.barcode" required />

          <label for="status">Status:</label>
          <select v-model="form.status">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button type="submit" class="submit-button">Confirm</button>
          <button @click="closeModal" class="close-button">Close</button>
        </form>
      </template>

      <template v-else-if="modalType === 'view'">
        <h3>View Product</h3>
        <p><strong>Product Name:</strong> {{ form.name }}</p>
        <p><strong>Description:</strong> {{ form.description }}</p>
        <p><strong>Price:</strong> {{ form.price }}</p>
        <p><strong>Stock:</strong> {{ form.stock }}</p>
        <p><strong>Category:</strong> {{ form.category }}</p>
        <p><strong>Barcode:</strong> {{ form.barcode }}</p>
        <p><strong>Status:</strong> {{ form.status }}</p>
        <button @click="closeModal" class="close-button">Close</button>
      </template>
    </Modal>
  </div>
</template>

<script>
// Import Vue, Reactive, and other modules like Modal
import { ref, reactive } from "vue";
import Modal from "../components/Modal.vue";

export default {
  components: { Modal },
  setup() {
    const products = ref([
      // Example products data
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

    const modalVisible = ref(false);
    const modalType = ref("create");
    const form = reactive({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      barcode: "",
      status: "Active",
    });
    const currentProductId = ref(null);

    function showModal(type, product = null) {
      modalType.value = type;
      if (type === "view" && product) {
        Object.assign(form, product);
      } else if (type === "edit" && product) {
        Object.assign(form, product);
        currentProductId.value = product.id;
      }
      modalVisible.value = true;
    }

    function closeModal() {
      modalVisible.value = false;
      Object.assign(form, {
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        barcode: "",
        status: "Disponible",
      });
      currentProductId.value = null;
    }

    function createProduct() {
      const newProduct = {
        id: products.value.length + 1,
        ...form,
      };
      products.value.push(newProduct);
      closeModal();
    }

    function updateProduct() {
      const index = products.value.findIndex(
        (product) => product.id === currentProductId.value
      );
      if (index !== -1) {
        products.value[index] = { ...products.value[index], ...form };
      }
      closeModal();
    }

    function confirmDelete(productId) {
      const confirmed = window.confirm(
        "Are you sure you want to delete this product ?"
      );
      if (confirmed) {
        deleteProduct(productId);
      }
    }

    function deleteProduct(productId) {
      products.value = products.value.filter(
        (product) => product.id !== productId
      );
    }

    return {
      products,
      modalVisible,
      modalType,
      form,
      currentProductId,
      showModal,
      closeModal,
      createProduct,
      updateProduct,
      confirmDelete,
      deleteProduct,
    };
  },
};
</script>
