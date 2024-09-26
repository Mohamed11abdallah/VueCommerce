<template>
  <div class="container mt-3">
    <h3>Edit Order</h3>
    <div class="mb-3 align-right">
      <router-link to="/orders" class="btn btn-secondary mb-3 mt-3 me-2">
        Return to Order List
      </router-link>
      <button
        type="submit"
        form="orderForm"
        class="btn btn-primary button-spacing"
      >
        Submit
      </button>
    </div>

    <form @submit.prevent="updateOrder" id="orderForm" class="row g-3">
      <div class="col-md-6">
        <label for="date" class="form-label">Date:</label>
        <input type="date" v-model="order.date" class="form-control" required />
      </div>

      <div class="col-md-6">
        <label for="client" class="form-label">Customer Name:</label>
        <input
          type="text"
          v-model="order.client"
          class="form-control"
          required
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
          required
        />
      </div>

      <div class="col-md-6">
        <label for="trackNumber" class="form-label">Track Number:</label>
        <input
          type="text"
          v-model="order.trackNumber"
          class="form-control"
          required
        />
      </div>

      <div class="col-md-12">
        <label for="status" class="form-label">Order Status:</label>
        <select v-model="order.status" class="form-select">
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
    </form>

    <div class="row mt-5 mx-1">
      <h2 class="mx-0">Order Details</h2>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(detail, index) in order.details" :key="index">
            <td>
              <select v-model="detail.product" class="form-select" required>
                <option value="">Select a product</option>
                <option
                  v-for="product in products"
                  :key="product"
                  :value="product"
                >
                  {{ product }}
                </option>
              </select>
            </td>
            <td>
              <input
                type="number"
                class="form-control"
                v-model="detail.quantity"
                required
              />
            </td>
            <td>
              <input
                type="number"
                class="form-control"
                v-model="detail.price"
                required
              />
            </td>
            <td>
              <button @click="removeDetail(index)" class="btn btn-danger">
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mb-3">
        <button @click="addDetail" class="btn btn-success">
          Add New Detail
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const order = ref({
      date: "",
      client: "",
      deliveryAddress: "",
      trackNumber: "",
      status: "",
      details: [],
    });

    const products = ["Product A", "Product B", "Product C"];

    const route = useRoute();
    const orderId = route.params.id; // Assuming you're getting the order ID from the route

    // Function to fetch order details based on the order ID
    const fetchOrderDetails = async () => {
      // Simulating API call
      // Replace this with your actual API call
      const fetchedOrder = {
        date: "2024-09-01",
        client: "John Doe",
        deliveryAddress: "123 Main St",
        trackNumber: "TRACK123",
        status: "Shipped",
        details: [
          { product: "Product A", quantity: 2, price: 25.0 },
          { product: "Product B", quantity: 1, price: 15.0 },
        ],
      };
      order.value = fetchedOrder;
    };

    onMounted(() => {
      fetchOrderDetails();
    });

    const addDetail = () => {
      order.value.details.push({ product: "", quantity: 1, price: 0 });
    };

    const removeDetail = (index) => {
      if (order.value.details.length > 1) {
        order.value.details.splice(index, 1);
      } else {
        alert("You must have one detail.");
      }
    };

    const updateOrder = () => {
      // Your logic to update the order goes here
      console.log("Order updated:", order.value);
    };

    const goBack = () => {
      // Your logic to go back to the previous page goes here
      console.log("Going back");
    };

    return {
      order,
      products,
      addDetail,
      removeDetail,
      updateOrder,
      goBack,
    };
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
}
.align-right {
  text-align: right;
}
</style>
