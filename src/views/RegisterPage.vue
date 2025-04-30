<template>
  <div class="register-page">
    <div class="content">
      <h2>Register Study Participants</h2>
      <p class="register-description">
        Create accounts for study participants by entering their parent's email
        and usernames.
      </p>

      <form @submit.prevent="handleSubmit" class="register-form">
        <!-- Parent Email -->
        <div class="form-group">
          <label for="email">Parent Email</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="parent@example.com"
            required
            class="input-field"
          />
        </div>

        <!-- Usernames -->
        <div class="form-group">
          <label>Usernames</label>
          <div
            v-for="(username, index) in usernames"
            :key="index"
            class="username-input"
          >
            <input
              v-model="usernames[index]"
              type="text"
              :placeholder="'Username ' + (index + 1)"
              required
              class="input-field"
            />
            <button
              type="button"
              @click="removeUsername(index)"
              class="remove-button"
              v-if="usernames.length > 1"
            >
              ✕
            </button>
          </div>
          <button type="button" @click="addUsername" class="add-button">
            + Add Another Username
          </button>
        </div>

        <button type="submit" class="register-button" :disabled="isSubmitting">
          {{ isSubmitting ? "Creating Accounts..." : "Create Accounts" }}
        </button>

        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import authenticationService from "@/services/authenticationService";

const router = useRouter();
const store = useStore();

const email = ref("");
const usernames = ref([""]);
const errorMessage = ref("");
const successMessage = ref("");
const isSubmitting = ref(false);

onMounted(async () => {
  // Check if user is admin, redirect if not
  const isAdmin = await store.getters["user/isResearcher"];
  if (!isAdmin) {
    alert("You are not authorized to access this page");
    router.push("/");
  }
});

const addUsername = () => {
  usernames.value.push("");
};

const removeUsername = (index) => {
  usernames.value.splice(index, 1);
};

const handleSubmit = async () => {
  try {
    isSubmitting.value = true;
    errorMessage.value = "";
    successMessage.value = "";

    // Filter out empty usernames
    const filteredUsernames = usernames.value.filter((username) =>
      username.trim()
    );

    // Create the accounts
    await authenticationService.createStudyAccount(
      email.value,
      filteredUsernames
    );

    // Clear form
    email.value = "";
    usernames.value = [""];
    successMessage.value = "Accounts created successfully!";
  } catch (error) {
    errorMessage.value =
      error.message || "Failed to create accounts. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #4a90e2, #14567a);
  color: white;
  padding: 2rem;
}

.content {
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.register-description {
  font-size: 1rem;
  color: #a0aec0;
  margin-bottom: 2rem;
  text-align: center;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.9rem;
  color: #a0aec0;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
}

.username-input {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.remove-button {
  background: #ff4444;
  border: none;
  border-radius: 5px;
  color: white;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-button {
  background: none;
  border: 1px dashed rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  color: white;
  padding: 0.5rem;
  cursor: pointer;
  width: 100%;
  margin-top: 0.5rem;
}

.add-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.register-button {
  width: 100%;
  padding: 0.75rem;
  background: #5865f2;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.register-button:disabled {
  background: #4752c4;
  cursor: not-allowed;
}

.register-button:hover:not(:disabled) {
  background: #4752c4;
}

.error-message {
  color: #ff4444;
  text-align: center;
  font-size: 0.875rem;
}

.success-message {
  color: #4caf50;
  text-align: center;
  font-size: 0.875rem;
}
</style>
