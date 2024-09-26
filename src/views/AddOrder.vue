<template>
  <div class="container mt-3">
    <h1>Create Order</h1>
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
    <form @submit.prevent="submitOrder" id="orderForm" class="row g-3">
      <div class="col-md-6">
        <label for="date" class="form-label">Date</label>
        <input type="date" v-model="orderDate" class="form-control" id="date" />
      </div>
      <div class="col-md-6">
        <label for="address" class="form-label">Delivery Address</label>
        <input
          type="text"
          v-model="deliveryAddress"
          class="form-control"
          id="address"
        />
      </div>
      <div class="col-md-6">
        <label for="name" class="form-label">Customer Name</label>
        <input
          type="text"
          v-model="customerName"
          class="form-control"
          id="name"
        />
      </div>
      <div class="col-md-6">
        <label for="trackNumer" class="form-label">Track Number</label>
        <input
          type="text"
          v-model="trackNumber"
          class="form-control"
          id="trackNumer"
        />
      </div>
      <div class="col-md-6 offset-6">
        <label for="status" class="form-label">Order Status</label>
        <select
          v-model="orderStatus"
          class="form-select"
          aria-label="Default select example"
        >
          <option value=""></option>
          <option value="1">Processing</option>
          <option value="2">Shipped</option>
          <option value="3">Delivered</option>
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
          <tr v-for="(detail, index) in orderDetails" :key="index">
            <td>
              <select v-model="detail.product" class="form-select">
                <option value="">Select a product</option>
                <option value="Product A">Product A</option>
                <option value="Product B">Product B</option>
                <option value="Product C">Product C</option>
              </select>
            </td>
            <td>
              <input
                type="number"
                class="form-control"
                v-model="detail.quantity"
              />
            </td>
            <td>
              <input
                type="number"
                class="form-control"
                v-model="detail.price"
              />
            </td>
            <td>
              <button @click="removeDetail(index)" class="btn btn-danger">
                Remove
              </button>
            </td>
          </tr>

          <tr>
            <td colspan="4">
              <button @click="addDetail" class="btn btn-success">
                Add New Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const orderDate = ref("");
const deliveryAddress = ref("");
const customerName = ref("");
const trackNumber = ref("");
const orderStatus = ref("");

const orderDetails = ref([{ product: "Product A", quantity: 2, price: 25.0 }]);

function addDetail() {
  orderDetails.value.push({
    product: "",
    quantity: 1,
    price: 0,
  });
}

function removeDetail(index) {
  if (orderDetails.value.length > 1) {
    orderDetails.value.splice(index, 1);
  } else {
    alert("You must to have one detail.");
  }
}

function submitOrder() {
  const order = {
    date: orderDate.value,
    deliveryAddress: deliveryAddress.value,
    customerName: customerName.value,
    trackNumber: trackNumber.value,
    orderStatus: orderStatus.value,
    orderDetails: orderDetails.value,
  };

  console.log("Order Submitted:", order);
}
</script>

<style scoped>
.router-link-active {
  color: #007bff;
  font-weight: bold;
  border-bottom: 2px solid #007bff;
}
.order-detail {
  background-color: #f9f9f9;
}
.align-right {
  text-align: right;
}
.button-spacing {
  margin-left: 20px;
}
</style>
