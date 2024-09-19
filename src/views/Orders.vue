<template>
  <div class="orders-container">
    <h2>List of Orders</h2>
    <router-link to="/add-order" class="no-underline">
      <button class="add-button">Add New Order</button>
    </router-link>
    <table class="orders-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Delivery Address</th>
          <th>Track Number</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.date }}</td>
          <td>{{ order.client }}</td>
          <td>{{ order.deliveryAddress }}</td>
          <td>{{ order.trackNumber }}</td>
          <td>{{ order.status }}</td>
          <td class="actions">
            <button
              class="action-button view"
              @click="showModal('view', order)"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              class="action-button edit"
              @click="showModal('edit', order)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="action-button delete"
              @click="confirmDelete(order.id)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal :visible="modalVisible" @close="closeModal">
      <template v-if="modalType === 'create' || modalType === 'edit'">
        <h3>{{ modalType === "create" ? "Add" : "Edit" }} Order</h3>
        <form
          @submit.prevent="
            modalType === 'create' ? createOrder() : updateOrder()
          "
          class="modal-form"
        >
          <label for="date">Date:</label>
          <input type="date" v-model="form.date" required />

          <label for="client">Customer Name:</label>
          <input type="text" v-model="form.client" required />

          <label for="deliveryAddress">Delivery Address:</label>
          <input type="text" v-model="form.deliveryAddress" required />

          <label for="trackNumber">Track Number:</label>
          <input type="text" v-model="form.trackNumber" required />

          <label for="status">Order Status:</label>
          <select v-model="form.status">
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>

          <h4>Order Details</h4>
          <div
            v-for="(detail, index) in form.details"
            :key="index"
            class="order-detail"
          >
            <label for="product">Product:</label>
            <input type="text" v-model="detail.product" required />

            <label for="quantity">Quantity:</label>
            <input type="number" v-model="detail.quantity" required />

            <label for="price">Price:</label>
            <input type="number" v-model="detail.price" required />

            <button
              @click.prevent="removeDetail(index)"
              class="remove-detail-button"
            >
              Remove
            </button>
          </div>
          <button @click.prevent="addDetail" class="add-detail-button">
            Add New Detail
          </button>
          <button type="submit" class="submit-button">
            {{ modalType === "create" ? "Submit" : "Confirm" }}
          </button>
        </form>
      </template>

      <template v-else-if="modalType === 'view'">
        <h3>Order</h3>
        <p><strong>Date:</strong> {{ form.date }}</p>
        <p><strong>Customer:</strong> {{ form.client }}</p>
        <p><strong>Delivery Address:</strong> {{ form.deliveryAddress }}</p>
        <p><strong>Track Number:</strong> {{ form.trackNumber }}</p>
        <p><strong>Status:</strong> {{ form.status }}</p>

        <h4>Order Details</h4>
        <div
          v-for="(detail, index) in form.details"
          :key="index"
          class="order-detail"
        >
          <p><strong>Product:</strong> {{ detail.product }}</p>
          <p><strong>Quantity:</strong> {{ detail.quantity }}</p>
          <p><strong>Price:</strong> {{ detail.price }}</p>
        </div>
        <button @click="closeModal" class="close-button">Close</button>
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
    const orders = ref([
      {
        id: 1,
        date: "2024-09-15",
        client: "Alice Dupont",
        deliveryAddress: "123 Rue Principale",
        trackNumber: "TRACK123",
        status: "Shipped",
        details: [
          { product: "Produit A", quantity: 2, price: 50 },
          { product: "Produit B", quantity: 1, price: 200 },
        ],
      },
    ]);

    const modalVisible = ref(false);
    const modalType = ref("create");
    const form = reactive({
      date: "",
      client: "",
      deliveryAddress: "",
      trackNumber: "",
      status: "Shipped",
      details: [],
    });
    const currentOrderId = ref(null);

    function showModal(type, order = null) {
      modalType.value = type;
      if (type === "view" || type === "edit") {
        Object.assign(form, order);
        currentOrderId.value = order.id;
      } else {
        resetForm();
      }
      modalVisible.value = true;
    }

    function closeModal() {
      modalVisible.value = false;
      resetForm();
    }

    function resetForm() {
      Object.assign(form, {
        date: "",
        client: "",
        deliveryAddress: "",
        trackNumber: "",
        status: "Shipped",
        details: [],
      });
      currentOrderId.value = null;
    }

    function createOrder() {
      const newOrder = { id: orders.value.length + 1, ...form };
      orders.value.push(newOrder);
      closeModal();
    }

    function updateOrder() {
      const index = orders.value.findIndex(
        (order) => order.id === currentOrderId.value
      );
      if (index !== -1) {
        orders.value[index] = { ...orders.value[index], ...form };
      }
      closeModal();
    }

    function confirmDelete(orderId) {
      if (window.confirm("Are you sure you want to delete this order?")) {
        deleteOrder(orderId);
      }
    }

    function deleteOrder(orderId) {
      orders.value = orders.value.filter((order) => order.id !== orderId);
    }

    function addDetail() {
      form.details.push({ product: "", quantity: 0, price: 0 });
    }

    function removeDetail(index) {
      form.details.splice(index, 1);
    }

    return {
      orders,
      modalVisible,
      modalType,
      form,
      currentOrderId,
      showModal,
      closeModal,
      createOrder,
      updateOrder,
      confirmDelete,
      deleteOrder,
      addDetail,
      removeDetail,
    };
  },
};
</script>

<style scoped>
.orders-container {
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #333;
  text-align: center;
}

.add-button {
  display: block;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: background-color 0.3s ease;
  margin-left: auto;
}

.add-button:hover {
  background-color: #335e8d;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th,
.orders-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.action-button {
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.action-button.view {
  background-color: #007bff;
  color: white;
}

.action-button.edit {
  background-color: #ffc107;
  color: white;
}

.action-button.delete {
  background-color: #dc3545;
  color: white;
}

.modal-form {
  display: grid;
  gap: 1rem;
  max-width: 600px;
  margin: auto;
}

.modal-form label {
  font-weight: bold;
}

.modal-form input,
.modal-form select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.modal-form .order-detail {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

.add-detail-button,
.remove-detail-button,
.submit-button,
.close-button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-detail-button {
  background-color: #007bff;
  color: white;
}

.add-detail-button:hover {
  background-color: #0056b3;
}

.remove-detail-button {
  background-color: #dc3545;
  color: white;
}

.remove-detail-button:hover {
  background-color: #c82333;
}

.submit-button {
  background-color: #28a745;
  color: white;
}

.submit-button:hover {
  background-color: #218838;
}

.close-button {
  background-color: #6c757d;
  color: white;
}

.close-button:hover {
  background-color: #5a6268;
}

.no-underline {
  text-decoration: none;
  display: inline;
}
</style>
