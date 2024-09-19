<template>
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

<style></style>
