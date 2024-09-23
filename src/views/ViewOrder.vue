<template>
  <div class="container mt-4">
    <h3>View Order</h3>
    <router-link to="/orders" class="btn btn-secondary float-end mb-3 mt-3 me-2"
      >Return to OrderList</router-link
    >
    <form class="row g-3 mt-5">
      <div class="col-md-6">
        <label for="date" class="form-label">Date:</label>
        <input type="date" v-model="order.date" class="form-control" disabled />
      </div>
      <div class="col-md-6">
        <label for="client" class="form-label">Customer Name:</label>
        <input
          type="text"
          v-model="order.client"
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
          v-model="order.deliveryAddress"
          class="form-control"
          disabled
        />
      </div>
      <div class="col-md-6">
        <label for="trackNumber" class="form-label">Track Number:</label>
        <input
          type="text"
          v-model="order.trackNumber"
          class="form-control"
          disabled
        />
      </div>
      <div class="col-md-12">
        <label for="status" class="form-label">Order Status:</label>
        <select v-model="order.status" class="form-select" disabled>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      <div class="col-md-12">
        <h4>Order Details</h4>
        <div
          v-for="(detail, index) in order.details"
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
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const order = ref({});

    onMounted(() => {
      const orderId = route.params.id;

      order.value = {
        date: "2024-09-15",
        client: "Alice Dupont",
        deliveryAddress: "123 Rue Principale",
        trackNumber: "TRACK123",
        status: "Shipped",
        details: [
          { product: "Produit A", quantity: 2, price: 50 },
          { product: "Produit B", quantity: 1, price: 300 },
        ],
      };
    });

    function goBack() {
      router.push("/orders");
    }

    return { order, goBack };
  },
};
</script>

<style scoped>
.order-view {
  margin: auto;
  width: 80%;
}
</style>
