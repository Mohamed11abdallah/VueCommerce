<template>
  <div class="customers-container">
    <h2>List of Customers</h2>
    <button class="btn btn-primary mb-2 float-end" @click="showModal('create')">
      Add New Customer
    </button>

    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in customers" :key="customer.id">
          <td>{{ customer.name }}</td>
          <td>{{ customer.address }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>
            <button
              class="btn btn-info btn-sm me-2"
              @click="showModal('view', customer)"
            >
              <i class="fas fa-eye"></i>
            </button>
            <button
              class="btn btn-warning btn-sm me-2"
              @click="showModal('edit', customer)"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="btn btn-danger btn-sm me-2"
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
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name">Customer Name</label>
                <input
                  type="text"
                  v-model="form.name"
                  required
                  class="form-control form-control-sm-2"
                  placeholder="Enter customer name"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="phone">Phone</label>
                <input
                  type="text"
                  v-model="form.phone"
                  required
                  class="form-control form-control-sm-2"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          <div class="form-group mt-2">
            <label for="address">Address</label>
            <textarea
              v-model="form.address"
              required
              class="form-control form-control-sm-2"
              placeholder="Enter address"
            ></textarea>
          </div>

          <div class="col-md-6">
            <div class="form-group mt-2">
              <label for="email">Email</label>
              <input
                type="email"
                v-model="form.email"
                required
                class="form-control form-control-sm-2 email-input"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div class="mt-3">
            <button type="submit" class="btn btn-primary btn-sm-2">
              Confirm
            </button>
            <button @click="closeModal" class="btn btn-secondary btn-sm-2 ms-2">
              Close
            </button>
          </div>
        </form>
      </template>

      <template v-else-if="modalType === 'edit'">
        <h3>Edit customer</h3>
        <form @submit.prevent="updateCustomer" class="modal-form">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name">Customer Name</label>
                <input
                  type="text"
                  v-model="form.name"
                  required
                  class="form-control form-control-sm-2"
                  placeholder="Enter customer name"
                />
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label for="phone">Phone</label>
                <input
                  type="text"
                  v-model="form.phone"
                  required
                  class="form-control form-control-sm-2"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          <div class="form-group mt-2">
            <label for="address">Address</label>
            <textarea
              v-model="form.address"
              required
              class="form-control form-control-sm-2"
              placeholder="Enter address"
            ></textarea>
          </div>

          <div class="col-md-6">
            <div class="form-group mt-2">
              <label for="email">Email</label>
              <input
                type="email"
                v-model="form.email"
                required
                class="form-control form-control-sm-2"
                placeholder="Enter email"
              />
            </div>
          </div>

          <div class="mt-3 d-flex justify-content-end">
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
        </form>
      </template>

      <template v-else-if="modalType === 'view'">
        <h3>Customer Details</h3>
        <form class="customer-details-form" @submit.prevent>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label for="name">Customer Name:</label>
                <input
                  type="text"
                  v-model="form.name"
                  class="form-control form-control-sm-2"
                  disabled
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="phone">Phone:</label>
                <input
                  type="text"
                  v-model="form.phone"
                  class="form-control form-control-sm-2"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="form-group mt-2">
            <label for="address">Address:</label>
            <textarea
              v-model="form.address"
              class="form-control form-control-sm-2"
              disabled
            ></textarea>
          </div>

          <div class="col-md-6">
            <div class="form-group mt-2">
              <label for="email">Email:</label>
              <input
                type="email"
                v-model="form.email"
                class="form-control form-control-sm-2"
                disabled
              />
            </div>
          </div>

          <div class="mt-3 d-flex justify-content-end">
            <button @click="closeModal" class="btn btn-secondary">Close</button>
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
    const customers = ref([
      {
        id: 1,
        firstName: "Alice",
        lastName: "Dupont",
        name: "Alice Dupont",
        address: "123 Rue Principale",
        email: "alice@example.com",
        phone: "0123456789",
      },
      {
        id: 2,
        firstName: "Bob",
        lastName: "Martin",
        name: "Bob Martin",
        address: "456 Avenue des Champs",
        email: "bob@example.com",
        phone: "0987654321",
      },
    ]);

    const modalVisible = ref(false);
    const modalType = ref("create");
    const form = reactive({
      firstName: "",
      lastName: "",
      name: "",
      address: "",
      email: "",
      phone: "",
    });
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
      Object.assign(form, {
        firstName: "",
        lastName: "",
        name: "",
        address: "",
        email: "",
        phone: "",
      });
      currentCustomerId.value = null;
    }

    function createCustomer() {
      customers.value.push({
        id: customers.value.length + 1,
        ...form,
        name: `${form.firstName} ${form.lastName}`,
      });
      closeModal();
    }

    function updateCustomer() {
      const index = customers.value.findIndex(
        (c) => c.id === currentCustomerId.value
      );
      if (index !== -1)
        customers.value[index] = {
          ...customers.value[index],
          ...form,
          name: `${form.firstName} ${form.lastName}`,
        };
      closeModal();
    }

    function confirmDelete(customerId) {
      if (window.confirm("Are you sure you want to delete this customer?")) {
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

<style scoped>
.customers-container {
  width: 80%;
  margin: auto;
}
/* .email-input {
  width: 50%;
  max-width: 100%;
} */
</style>
