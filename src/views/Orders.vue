<template>
  <div class="orders-container">
    <h2>List of Orders</h2>
    <router-link to="/add-order" class="btn btn-primary mb-2 float-end">
      Add New Order
    </router-link>

    <table class="table table-striped">
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
          <td>
            <button
              class="btn btn-info btn-sm me-2"
              @click="showModal('view', order)"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              class="btn btn-warning btn-sm me-2"
              @click="showModal('edit', order)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="btn btn-danger btn-sm me-2"
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
          class="modal-form row g-3"
        >
          <div class="col-md-6">
            <label for="date" class="form-label">Date:</label>
            <input
              type="date"
              v-model="form.date"
              required
              class="form-control"
            />
          </div>

          <div class="col-md-6">
            <label for="client" class="form-label">Customer Name:</label>
            <input
              type="text"
              v-model="form.client"
              required
              class="form-control"
            />
          </div>

          <div class="col-md-6">
            <label for="deliveryAddress" class="form-label"
              >Delivery Address:</label
            >
            <input
              type="text"
              v-model="form.deliveryAddress"
              required
              class="form-control"
            />
          </div>

          <div class="col-md-6">
            <label for="trackNumber" class="form-label">Track Number:</label>
            <input
              type="text"
              v-model="form.trackNumber"
              required
              class="form-control"
            />
          </div>

          <div class="col-md-12">
            <label for="status" class="form-label">Order Status:</label>
            <select v-model="form.status" class="form-select">
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div class="col-md-12">
            <h4>Order Details</h4>
            <div
              v-for="(detail, index) in form.details"
              :key="index"
              class="order-detail mb-3 p-3 border rounded"
            >
              <div class="row g-3">
                <div class="col-md-4">
                  <label for="product" class="form-label">Product:</label>
                  <input
                    type="text"
                    v-model="detail.product"
                    required
                    class="form-control"
                  />
                </div>

                <div class="col-md-4">
                  <label for="quantity" class="form-label">Quantity:</label>
                  <input
                    type="number"
                    v-model="detail.quantity"
                    required
                    class="form-control"
                  />
                </div>

                <div class="col-md-4">
                  <label for="price" class="form-label">Price:</label>
                  <input
                    type="number"
                    v-model="detail.price"
                    required
                    class="form-control"
                  />
                </div>
              </div>

              <div class="text-end mt-2">
                <button
                  @click.prevent="removeDetail(index)"
                  class="btn btn-danger btn-btn-sm-2"
                >
                  Remove
                </button>
              </div>
            </div>

            <div class="mt-3 d-flex justify-content-end">
              <button
                @click="addDetail"
                class="btn btn-primary btn-sm-2 mt-3 me-2"
              >
                Ajouter un nouveau détail
              </button>
              <button type="submit" class="btn btn-primary btn-sm-2 mt-3">
                Confirm
              </button>

              <button
                @click="closeModal"
                class="btn btn-secondary btn-sm-2 ms-2 mt-3"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </template>

      <template v-else-if="modalType === 'view'">
        <h3>View Order</h3>
        <form class="modal-form row g-3">
          <div class="col-md-6">
            <label for="date" class="form-label">Date:</label>
            <input
              type="date"
              v-model="form.date"
              class="form-control"
              disabled
            />
          </div>

          <div class="col-md-6">
            <label for="client" class="form-label">Customer Name:</label>
            <input
              type="text"
              v-model="form.client"
              class="form-control"
              disabled
            />
          </div>

          <div class="col-md-6">
            <label for="deliveryAddress" class="form-label"
              >Delivery Address:</label
            >
            <input
              type="text"
              v-model="form.deliveryAddress"
              class="form-control"
              disabled
            />
          </div>

          <div class="col-md-6">
            <label for="trackNumber" class="form-label">Track Number:</label>
            <input
              type="text"
              v-model="form.trackNumber"
              class="form-control"
              disabled
            />
          </div>

          <div class="col-md-12">
            <label for="status" class="form-label">Order Status:</label>
            <select v-model="form.status" class="form-select" disabled>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div class="col-md-12">
            <h4>Order Details</h4>
            <div
              v-for="(detail, index) in form.details"
              :key="index"
              class="order-detail mb-3 p-3 border rounded"
            >
              <div class="row g-3">
                <div class="col-md-4">
                  <label for="product" class="form-label">Product:</label>
                  <input
                    type="text"
                    v-model="detail.product"
                    class="form-control"
                    disabled
                  />
                </div>

                <div class="col-md-4">
                  <label for="quantity" class="form-label">Quantity:</label>
                  <input
                    type="number"
                    v-model="detail.quantity"
                    class="form-control"
                    disabled
                  />
                </div>

                <div class="col-md-4">
                  <label for="price" class="form-label">Price:</label>
                  <input
                    type="number"
                    v-model="detail.price"
                    class="form-control"
                    disabled
                  />
                </div>
              </div>

              <div class="text-end mt-2">
                <button
                  @click.prevent="removeDetail(index)"
                  class="btn btn-danger btn-btn-sm-2"
                >
                  Remove
                </button>
              </div>
            </div>

            <div class="mt-3 d-flex justify-content-end">
              <button @click="closeModal" class="btn btn-secondary btn-sm-2">
                Close
              </button>
            </div>
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
      {
        id: 2,
        date: "2024-09-16",
        client: "Bob Smith",
        deliveryAddress: "456 Rue Secondaire",
        trackNumber: "TRACK456",
        status: "Processing",
        details: [
          { product: "Produit C", quantity: 3, price: 100 },
          { product: "Produit D", quantity: 2, price: 150 },
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
      if (form.details.length > 1) {
        form.details.splice(index, 1);
      } else {
        alert("Vous devez avoir au moins un détail de commande.");
      }
    }

    return {
      orders,
      modalVisible,
      modalType,
      form,
      showModal,
      closeModal,
      createOrder,
      updateOrder,
      confirmDelete,
      addDetail,
      removeDetail,
    };
  },
};
</script>

<style scoped>
.orders-container {
  width: 80%;
  margin: auto;
}
.modal-form {
  padding: 20px;
}
.order-detail {
  background-color: #f8f9fa;
}
</style>
