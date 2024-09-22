import { createRouter, createWebHistory } from "vue-router";
import Customers from "../views/Customers.vue";
import Products from "../views/Products.vue";
import Orders from "../views/Orders.vue";
import AddOrder from "../views/AddOrder.vue";
import ViewOrder from "../views/ViewOrder.vue";
import EditOrder from "../views/EditOrder.vue";

const routes = [
  { path: "/customers", component: Customers },
  { path: "/products", component: Products },
  { path: "/orders", component: Orders, meta: { activeMenu: "orders" } },
  { path: "/add-order", component: AddOrder, meta: { activeMenu: "orders" } },
  {
    path: "/orders/:id/view",
    component: ViewOrder,
    meta: { activeMenu: "orders" },
  },
  {
    path: "/orders/:id/edit",
    component: EditOrder,
    meta: { activeMenu: "orders" },
  },
  { path: "/", redirect: "/customers" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
