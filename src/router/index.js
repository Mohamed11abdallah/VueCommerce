import { createRouter, createWebHistory } from "vue-router";
import Customers from "../views/Customers.vue";
import Products from "../views/Products.vue";
import Orders from "../views/Orders.vue";
import AddOrder from "../views/AddOrder.vue";

const routes = [
  { path: "/customers", component: Customers },
  { path: "/products", component: Products },
  { path: "/orders", component: Orders },
  { path: "/add-order", component: AddOrder },
  { path: "/", redirect: "/customers" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
