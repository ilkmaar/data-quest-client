<template>
  <div class="account-menu">
    <DiscordLoginIcon v-if="!isLoggedIn"></DiscordLoginIcon>
    <Menu as="div" v-else class="relative inline-block text-left">
      <MenuButton @click="emitToggleMenu" class="icon-button">
        <img :src="avatarUrl" alt="User Avatar" class="user-avatar"/>
      </MenuButton>
      <MenuItems v-if="isMenuOpen" class="dropdown-menu">
        <div class="menu-content">
          <UserInfo class="user-info" />
          <MenuItem>
            <a @click="handleLogout" class="menu-item">Log out</a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  </div>
</template>

<script setup>
import { useAccountMenu } from '@/composables/useAccountMenu';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import DiscordLoginIcon from './DiscordLoginIcon.vue';
import UserInfo from './UserInfo.vue';

const props = defineProps({
  isMenuOpen: Boolean
});

const emit = defineEmits(['toggle-menu', 'close-menu']);

const { isLoggedIn, avatarUrl, logoutAndCloseMenu } = useAccountMenu();

const emitToggleMenu = () => {
  emit('toggle-menu');
};

const emitCloseMenu = () => {
  emit('close-menu');
};

const handleLogout = () => {
  logoutAndCloseMenu(emitCloseMenu);
};
</script>

<style scoped>
.account-menu {
    position: relative;
}

.login-button {
    padding: var(--login-button-padding);
    background-color: var(--login-button-bg-color);
    color: var(--color-text);
    border: none;
    cursor: pointer;
    transition: background-color var(--login-button-transition-duration);
    font-size: var(--login-button-font-size);
    border-radius: var(--login-button-border-radius);
    box-shadow: var(--login-button-box-shadow);
}

.login-button:hover {
    background-color: var(--login-button-hover-bg-color);
}

.icon-button {
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    transition: opacity var(--menu-item-transition-duration);
}

.icon-button:hover .user-avatar {
    opacity: var(--icon-button-opacity-hover);
}

.user-avatar {
    width: var(--user-avatar-size);
    height: var(--user-avatar-size);
    border-radius: var(--user-avatar-border-radius);
    border: 2px solid var(--user-avatar-border-color);
}

.dropdown-menu {
    position: absolute;
    right: 0;
    margin-top: 0.5rem;
    width: 16rem;
    background-color: var(--background-color); /* Fixed background color */
    border-radius: var(--dropdown-menu-border-radius);
    box-shadow: var(--dropdown-menu-box-shadow);
    z-index: 10;
    border: 1px solid var(--dropdown-menu-border-color);
}

.menu-content {
    padding: var(--menu-content-padding);
}

.user-info {
    display: flex;
    align-items: center;
    padding: 0;
    margin-bottom: 0.5rem;
}

.menu-item {
    display: block;
    padding: var(--menu-item-padding);
    font-size: var(--menu-item-font-size);
    color: var(--color-dark-text); /* Ensure dark text */
    text-decoration: none;
    cursor: pointer;
    border-radius: var(--menu-item-border-radius);
    transition: background-color var(--menu-item-transition-duration);
    text-align: var(--menu-item-text-align);
    background-color: var(--menu-item-bg-color);
}

.menu-item:hover {
    background-color: var(--menu-item-hover-bg-color);
}

.menu-item:first-child {
    margin-top: 0.5rem;
}
</style>