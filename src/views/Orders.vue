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
            <router-link
              :to="`/orders/${order.id}/view`"
              class="btn btn-info btn-sm me-2"
            >
              <i class="fas fa-eye"></i>
            </router-link>
            <router-link
              :to="`/orders/${order.id}/edit`"
              class="btn btn-warning btn-sm me-2"
            >
              <i class="fas fa-edit"></i>
            </router-link>
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
  </div>
</template>

<script>
import { ref } from "vue";

export default {
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

    function confirmDelete(orderId) {
      if (window.confirm("Are you sure you want to delete this order?")) {
        deleteOrder(orderId);
      }
    }

    function deleteOrder(orderId) {
      orders.value = orders.value.filter((order) => order.id !== orderId);
    }

    return {
      orders,
      confirmDelete,
    };
  },
};
</script>

<style scoped>
.orders-container {
  width: 80%;
  margin: auto;
}
</style>
