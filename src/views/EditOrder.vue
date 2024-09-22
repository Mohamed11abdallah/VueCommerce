<!-- <template>
  <div class="container mt-4">
    <h3>Edit Order</h3>
    <div class="mb-3 align-right">
      <router-link to="/orders" class="btn btn-secondary mb-3 mt-3 me-2"
        >Return to OrderList</router-link
      >
      <button
        type="submit"
        form="orderForm"
        class="btn btn-primary button-spacing"
      >
        Submit
      </button>
    </div>
    <form @submit.prevent="updateOrder" class="row g-3">
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
                required
              />
            </div>
            <div class="col-md-4">
              <label for="quantity" class="form-label">Quantity:</label>
              <input
                type="number"
                v-model="detail.quantity"
                class="form-control"
                required
              />
            </div>
            <div class="col-md-4">
              <label for="price" class="form-label">Price:</label>
              <input
                type="number"
                v-model="detail.price"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="d-flex justify-content-between mt-2">
            <button
              type="button"
              @click="removeDetail(index)"
              class="btn btn-danger btn-sm"
              :disabled="order.details.length <= 1"
            >
              Remove
            </button>
          </div>
        </div>
        <button type="button" @click="addDetail" class="btn btn-primary mb-3">
          Add New Detail
        </button>
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
    const order = ref({
      details: [],
    });

    onMounted(() => {
      // Simuler la récupération de la commande par ID
      const orderId = route.params.id;
      // Remplace ceci par la logique de récupération des données
      order.value = {
        date: "2024-09-15",
        client: "Alice Dupont",
        deliveryAddress: "123 Rue Principale",
        trackNumber: "TRACK123",
        status: "Shipped",
        details: [
          { product: "Produit A", quantity: 2, price: 50 },
          { product: "Produit B", quantity: 1, price: 200 },
        ],
      };
    });

    function updateOrder() {
      // Ajouter la logique pour mettre à jour la commande
      alert("Order updated!");
      goBack();
    }

    function goBack() {
      router.push("/orders"); // Modifier selon ton chemin
    }

    function addDetail() {
      order.value.details.push({ product: "", quantity: 0, price: 0 });
    }

    function removeDetail(index) {
      if (order.value.details.length > 1) {
        order.value.details.splice(index, 1);
      }
    }

    return { order, updateOrder, goBack, addDetail, removeDetail };
  },
};
</script>

<style scoped>
.order-edit {
  margin: auto;
  width: 80%;
}
.align-right {
  text-align: right;
}
</style> -->

<template>
  <div class="container mt-4">
    <h3>Edit Order</h3>
    <div class="mb-3 align-right">
      <router-link to="/orders" class="btn btn-secondary mb-3 mt-3 me-2">
        Return to OrderList
      </router-link>
      <button
        type="submit"
        form="orderForm"
        class="btn btn-primary button-spacing"
      >
        Submit
      </button>
    </div>
    <form @submit.prevent="updateOrder" class="row g-3">
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
                required
              />
            </div>
            <div class="col-md-4">
              <label for="quantity" class="form-label">Quantity:</label>
              <input
                type="number"
                v-model="detail.quantity"
                class="form-control"
                required
              />
            </div>
            <div class="col-md-4">
              <label for="price" class="form-label">Price:</label>
              <input
                type="number"
                v-model="detail.price"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="d-flex justify-content-between mt-2">
            <button
              type="button"
              @click="removeDetail(index)"
              class="btn btn-danger btn-sm-2"
              :disabled="order.details.length <= 1"
            >
              Remove
            </button>
          </div>
        </div>

        <!-- Ligne par défaut pour ajouter un nouveau détail -->
        <div class="order-detail mb-3 p-3 border rounded">
          <div class="row g-3">
            <div class="col-md-4">
              <label for="defaultProduct" class="form-label">Product:</label>
              <input
                type="text"
                v-model="newDetail.product"
                class="form-control"
              />
            </div>
            <div class="col-md-4">
              <label for="defaultQuantity" class="form-label">Quantity:</label>
              <input
                type="number"
                v-model="newDetail.quantity"
                class="form-control"
              />
            </div>
            <div class="col-md-4">
              <label for="defaultPrice" class="form-label">Price:</label>
              <input
                type="number"
                v-model="newDetail.price"
                class="form-control"
              />
            </div>
          </div>
          <div class="d-flex justify-content-between mt-2">
            <button
              type="button"
              @click="addDetail"
              class="btn btn-primary btn-sm-2"
            >
              Add New Detail
            </button>
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
    const order = ref({
      details: [],
    });

    const newDetail = ref({ product: "", quantity: 1, price: 0 });

    onMounted(() => {
      // Simuler la récupération de la commande par ID
      const orderId = route.params.id;
      // Remplace ceci par la logique de récupération des données
      order.value = {
        date: "2024-09-15",
        client: "Alice Dupont",
        deliveryAddress: "123 Rue Principale",
        trackNumber: "TRACK123",
        status: "Shipped",
        details: [
          { product: "Produit A", quantity: 2, price: 50 },
          { product: "Produit B", quantity: 1, price: 200 },
        ],
      };
    });

    function updateOrder() {
      // Ajouter la logique pour mettre à jour la commande
      alert("Order updated!");
      goBack();
    }

    function goBack() {
      router.push("/orders"); // Modifier selon ton chemin
    }

    function addDetail() {
      if (
        newDetail.value.product &&
        newDetail.value.quantity > 0 &&
        newDetail.value.price >= 0
      ) {
        order.value.details.push({ ...newDetail.value });
        newDetail.value = { product: "", quantity: 1, price: 0 }; // Reset the new detail
      } else {
        alert("Please fill in all fields correctly.");
      }
    }

    function removeDetail(index) {
      if (order.value.details.length > 1) {
        order.value.details.splice(index, 1);
      }
    }

    return { order, updateOrder, goBack, addDetail, removeDetail, newDetail };
  },
};
</script>

<style scoped>
.order-edit {
  margin: auto;
  width: 80%;
}
.align-right {
  text-align: right;
}
</style>
