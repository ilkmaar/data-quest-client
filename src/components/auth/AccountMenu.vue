<template>
  <div class="account-menu">
    <DiscordLoginIcon v-if="!isLoggedIn"></DiscordLoginIcon>
    <Menu as="div" v-else class="relative inline-block text-left">
      <MenuButton @click="emitToggleMenu" class="icon-button">
        <slot :avatar="avatarUrl">
          <div
            class="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 ring-2 ring-white flex items-center justify-center"
          >
            <img
              v-if="avatarUrl"
              :src="avatarUrl"
              alt="User Avatar"
              class="w-full h-full object-cover"
            />
            <svg
              v-else
              class="w-5 h-5 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </slot>
      </MenuButton>
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <MenuItems v-if="isMenuOpen" class="dropdown-menu">
          <div class="menu-content">
            <UserInfo
              class="user-info"
              :avatar-url="avatarUrl"
              :username="username"
              :email="email"
            />
            <MenuItem v-slot="{ active }">
              <a
                @click="handleLogout"
                :class="['menu-item', active && 'active']"
              >
                Log out
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup>
import { useAccountMenu } from "@/composables/useAccountMenu";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import DiscordLoginIcon from "./DiscordLoginIcon.vue";
import UserInfo from "./UserInfo.vue";

const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["toggle-menu", "close-menu"]);

const { isLoggedIn, avatarUrl, username, email, logoutAndCloseMenu } =
  useAccountMenu();

const emitToggleMenu = () => {
  emit("toggle-menu");
};

const emitCloseMenu = () => {
  emit("close-menu");
};

const handleLogout = () => {
  logoutAndCloseMenu(emitCloseMenu);
};
</script>

<style scoped>
.account-menu {
  position: relative;
}

.icon-button {
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-button:hover {
  transform: scale(1.05);
}

.icon-button:active {
  transform: scale(0.95);
}

.dropdown-menu {
  position: absolute;
  right: 0;
  margin-top: 0.5rem;
  width: 16rem;
  background-color: white;
  color: var(--dark-gray);
  border-radius: 0.5rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 50;
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.menu-content {
  padding: 0.5rem;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.menu-item {
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
  text-decoration: none;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  text-align: left;
}

.menu-item:hover,
.menu-item.active {
  background-color: rgba(79, 70, 229, 0.1);
  color: rgb(79, 70, 229);
}

.menu-item:active {
  background-color: rgba(79, 70, 229, 0.2);
}
</style>
