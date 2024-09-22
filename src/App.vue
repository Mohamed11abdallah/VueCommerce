<!-- <template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/customers">
          <h2><i class="fas fa-users"></i> Customers</h2>
        </router-link>
        <router-link to="/products">
          <h2><i class="fas fa-box"></i> Products</h2>
        </router-link>
        <router-link to="/orders">
          <h2><i class="fas fa-receipt"></i> Orders</h2>
        </router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style scoped>
#app {
  font-family: Arial, sans-serif;
}

header {
  background-color: #f4f4f4;
  padding: 1rem;
}

nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

nav a {
  text-decoration: none;
  color: #333;
}

nav h2 {
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 1.25rem;
}

nav i {
  margin-right: 0.5rem;
}

.router-link-active h2 {
  color: #007bff;
  font-weight: bold;
  border-bottom: 2px solid #007bff;
}

main {
  padding: 2rem;
}
</style> -->

<template>
  <div id="app">
    <header>
      <nav>
        <router-link
          to="/customers"
          class="nav-link"
          exact-active-class="active-link"
        >
          <h2><i class="fas fa-users"></i> Customers</h2>
        </router-link>
        <router-link
          to="/products"
          class="nav-link"
          exact-active-class="active-link"
        >
          <h2><i class="fas fa-box"></i> Products</h2>
        </router-link>
        <router-link
          to="/orders"
          class="nav-link"
          :class="{ 'active-link': isOrdersActive }"
        >
          <h2><i class="fas fa-receipt"></i> Orders</h2>
        </router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    isOrdersActive() {
      // Vérifie si la route active a 'activeMenu' défini sur 'orders'
      return this.$route.meta.activeMenu === "orders";
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
}

header {
  background-color: #f4f4f4;
  padding: 1rem;
}

nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}

nav a {
  text-decoration: none;
  color: #333;
}

nav h2 {
  display: flex;
  align-items: center;
  margin: 0;
  font-size: 1.25rem;
}

nav i {
  margin-right: 0.5rem;
}

.active-link h2 {
  color: #007bff;
  font-weight: bold;
  border-bottom: 2px solid #007bff;
}

main {
  padding: 2rem;
}
</style>
