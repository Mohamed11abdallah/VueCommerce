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
      <!-- Template pour ajouter et éditer une commande -->
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
            {{ modalType === "create" ? "Submit" : "Mettre à jour" }}
          </button>
        </form>
      </template>

      <!-- Template pour afficher les détails de la commande -->
      <template v-else-if="modalType === 'view'">
        <h3>Order Details</h3>
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
      // Exemple de données
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
