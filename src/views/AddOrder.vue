<template>
  <div class="container mt-4">
    <h3>Add New Order</h3>
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

    <form id="orderForm" @submit.prevent="createOrder">
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="date" class="form-label">Date:</label>
          <input
            type="date"
            v-model="form.date"
            required
            class="form-control form-control-sm-2"
          />
        </div>
        <div class="col-md-6">
          <label for="client" class="form-label">Customer Name:</label>
          <input
            type="text"
            v-model="form.client"
            required
            class="form-control form-control-sm-2"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6">
          <label for="deliveryAddress" class="form-label"
            >Delivery Address:</label
          >
          <input
            type="text"
            v-model="form.deliveryAddress"
            required
            class="form-control form-control-sm-2"
          />
        </div>
        <div class="col-md-6">
          <label for="trackNumber" class="form-label">Track Number:</label>
          <input
            type="text"
            v-model="form.trackNumber"
            required
            class="form-control form-control-sm-2"
          />
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6">
          <label for="status" class="form-label">Order Status:</label>
          <select v-model="form.status" class="form-select form-select-sm-2">
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      </div>

      <h4>Order Details</h4>

      <div
        v-for="(detail, index) in form.details"
        :key="index"
        class="order-detail mb-3 p-3 border rounded"
      >
        <div class="row mb-3">
          <div class="col-md-4">
            <label for="product" class="form-label">Product:</label>
            <!-- Le champ select pour les produits -->
            <select
              v-model="detail.product"
              class="form-select form-select-sm-2"
              required
            >
              <option
                v-for="product in products"
                :key="product"
                :value="product"
              >
                {{ product }}
              </option>
            </select>
          </div>
          <div class="col-md-4">
            <label for="quantity" class="form-label">Quantity:</label>
            <input
              type="number"
              v-model="detail.quantity"
              required
              class="form-control form-control-sm-2"
            />
          </div>
          <div class="col-md-4">
            <label for="price" class="form-label">Price:</label>
            <input
              type="number"
              v-model="detail.price"
              required
              class="form-control form-control-sm-2"
            />
          </div>
        </div>
        <button
          type="button"
          @click="removeDetail(index)"
          class="btn btn-danger btn-sm-2"
          v-if="form.details.length > 1"
        >
          Remove
        </button>
      </div>

      <button
        type="button"
        @click="addDetail"
        class="btn btn-primary mb-3 btn-sm-2"
      >
        Add New Detail
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Les options prédéfinies pour les produits
      products: ["Product A", "Product B", "Product C", "Product D"],
      form: {
        date: "",
        client: "",
        deliveryAddress: "",
        trackNumber: "",
        status: "Processing",
        details: [{ product: "", quantity: 1, price: 0 }],
      },
    };
  },
  methods: {
    createOrder() {
      console.log("Order created", this.form);
      this.$router.push("/orders");
    },
    addDetail() {
      this.form.details.push({ product: "", quantity: 1, price: 0 });
    },
    removeDetail(index) {
      if (this.form.details.length > 1) {
        this.form.details.splice(index, 1);
      }
    },
  },
};
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
