<template>
  <div>
    <h2>Add New Order</h2>
    <div class="action-buttons">
      <router-link to="/" class="back-button">Return to Home</router-link>
      <button type="submit" form="orderForm" class="create-button">
        Submit
      </button>
    </div>
    <form id="orderForm" @submit.prevent="createOrder">
      <label for="date">Date:</label>
      <input type="date" v-model="form.date" required />
      <label for="client">Customer:</label>
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
          type="button"
          @click="removeDetail(index)"
          class="remove-detail"
        >
          Remove
        </button>
      </div>
      <button type="button" @click="addDetail" class="add-detail">
        Add New Detail
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        date: "",
        client: "",
        deliveryAddress: "",
        trackNumber: "",
        status: "En cours",
        details: [],
      },
    };
  },
  methods: {
    createOrder() {
      // Logique pour créer une commande
      console.log("Commande créée", this.form);
      // Redirection ou autre action après la création
      this.$router.push("/orders"); // Par exemple, retourner à la liste des commandes
    },
    addDetail() {
      this.form.details.push({ product: "", quantity: 0, price: 0 });
    },
    removeDetail(index) {
      this.form.details.splice(index, 1);
    },
  },
};
</script>
<style scoped>
/* Style pour la page AddOrder */
div {
  padding: 2rem;
  background-color: #f9f9f9;
  max-width: 800px;
  margin: auto;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.75rem;
  color: #333;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 1rem; /* Espace entre les boutons et le formulaire */
  margin-right: 35px;
}

button {
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button.create-button {
  background-color: #4caf50;
  color: white;
}

button.create-button:hover {
  background-color: #45a049;
}

button.add-detail {
  background-color: #2196f3;
  color: white;
}

button.add-detail:hover {
  background-color: #1976d2;
}

button.remove-detail {
  background-color: #ff9800;
  color: white;
}

button.remove-detail:hover {
  background-color: #f57c00;
}

form {
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: grid;
  gap: 1rem;
}

.form-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input[type="text"],
input[type="date"],
input[type="number"],
select {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.order-detail {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

/* Style pour les liens */
.back-button {
  display: inline-block;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: #2196f3; /* Couleur bleue */
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #1976d2; /* Couleur bleue plus foncée */
}
</style>
