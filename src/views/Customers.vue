<template>
  <div class="customers-container">
    <h2>List of Customers</h2>
    <button class="add-button" @click="showModal('create')">
      Add New Customer
    </button>

    <table class="customers-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Adress</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.name }}</td>
          <td>{{ customer.address }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td class="actions">
            <button
              class="action-button view"
              @click="showModal('view', customer)"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              class="action-button edit"
              @click="showModal('edit', customer)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="action-button delete"
              @click="confirmDelete(customer.id)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal :visible="modalVisible" @close="closeModal">
      <template v-if="modalType === 'create'">
        <h3>Create new customer</h3>
        <form @submit.prevent="createCustomer" class="modal-form">
          <label for="name">Customer Name:</label>
          <input type="text" v-model="form.name" required />

          <label for="address">Adress:</label>
          <input type="text" v-model="form.address" required />

          <label for="email">Email:</label>
          <input type="email" v-model="form.email" required />

          <label for="phone">Phone:</label>
          <input type="text" v-model="form.phone" required />

          <button type="submit" class="submit-button">Confirm</button>
          <button @click="closeModal" class="close-button">Close</button>
        </form>
      </template>

      <template v-else-if="modalType === 'edit'">
        <h3>Edit customer</h3>
        <form @submit.prevent="updateCustomer" class="modal-form">
          <label for="name">Customer Name:</label>
          <input type="text" v-model="form.name" required />

          <label for="address">Adress:</label>
          <input type="text" v-model="form.address" required />

          <label for="email">Email:</label>
          <input type="email" v-model="form.email" required />

          <label for="phone">Phone:</label>
          <input type="text" v-model="form.phone" required />

          <button type="submit" class="submit-button">Confirm</button>
        </form>
      </template>

      <template v-else-if="modalType === 'view'">
        <h3>Customer Name</h3>
        <p><strong>Name:</strong> {{ form.name }}</p>
        <p><strong>Adress:</strong> {{ form.address }}</p>
        <p><strong>Email:</strong> {{ form.email }}</p>
        <p><strong>Phone:</strong> {{ form.phone }}</p>
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
    const customers = ref([
      {
        id: 1,
        name: "Alice Dupont",
        address: "123 Rue Principale",
        email: "alice@example.com",
        phone: "0123456789",
      },
      {
        id: 2,
        name: "Bob Martin",
        address: "456 Avenue des Champs",
        email: "bob@example.com",
        phone: "0987654321",
      },
    ]);

    const modalVisible = ref(false);
    const modalType = ref("create");
    const form = reactive({ name: "", address: "", email: "", phone: "" });
    const currentCustomerId = ref(null);

    function showModal(type, customer = null) {
      modalType.value = type;
      if (type === "view" || type === "edit") {
        Object.assign(form, customer);
        if (type === "edit") {
          currentCustomerId.value = customer.id;
        }
      }
      modalVisible.value = true;
    }

    function closeModal() {
      modalVisible.value = false;
      Object.assign(form, { name: "", address: "", email: "", phone: "" });
      currentCustomerId.value = null;
    }

    function createCustomer() {
      customers.value.push({ id: customers.value.length + 1, ...form });
      closeModal();
    }

    function updateCustomer() {
      const index = customers.value.findIndex(
        (c) => c.id === currentCustomerId.value
      );
      if (index !== -1)
        customers.value[index] = { ...customers.value[index], ...form };
      closeModal();
    }

    function confirmDelete(customerId) {
      if (window.confirm("Are you sure you want to delete this customer ?")) {
        customers.value = customers.value.filter((c) => c.id !== customerId);
      }
    }

    return {
      customers,
      modalVisible,
      modalType,
      form,
      currentCustomerId,
      showModal,
      closeModal,
      createCustomer,
      updateCustomer,
      confirmDelete,
    };
  },
};
</script>
