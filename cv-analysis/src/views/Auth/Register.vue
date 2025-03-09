<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import authService from "@/services/authService";

import bgImage from "@/assets/images/bg-signup.jpg";

const router = useRouter();

const isSubmitting = ref(false);
const errors = ref({});
const successMessage = ref("");

const formData = reactive({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  userType: "candidate",
});

const handleSubmit = async () => {
  errors.value = {};

  // Validate full name
  if (!formData.fullName) {
    errors.value.fullName = "Full name is required";
  }

  // Validate email
  if (!formData.email) {
    errors.value.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
    errors.value.email = "Invalid email format";
  }

  // Validate password
  if (!formData.password) {
    errors.value.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.value.password = "Password must be at least 6 characters";
  }

  // Validate confirm password
  if (!formData.confirmPassword) {
    errors.value.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    errors.value.confirmPassword = "Passwords do not match";
  }

  if (Object.keys(errors.value).length > 0) return;

  isSubmitting.value = true;

  try {
    await authService.register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      userType: formData.userType,
    });

    successMessage.value = "Registration successful! Redirecting...";

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  } catch (error) {
    errors.value.general =
      error.response?.data?.message ||
      "Registration failed. Please check your information.";
  } finally {
    isSubmitting.value = false;
  }
};

const setUserType = (type) => {
  formData.userType = type;
};
</script>

<template>
  <div
    class="flex h-screen bg-cover bg-center"
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
    />
    <div class="w-full flex justify-center items-center">
      <div
        class="flex bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-5xl mx-4"
      >
        <!-- Left Panel -->
        <div class="hidden md:flex bg-[#4318D1] text-white w-5/12 flex-col">
          <!-- Title block (top half) -->
          <div class="flex-1 p-8 flex flex-col justify-center">
            <div class="h-full flex flex-col justify-center">
              <h2 class="text-3xl font-bold mb-6">Start Your Career Journey</h2>
              <p class="text-lg mb-4">
                Connect with thousands of employers and opportunities in one
                place
              </p>
            </div>
          </div>

          <!-- Jobs Icons block (bottom half) -->
          <div class="flex-1 bg-gradient-to-b from-[#2E1398] to-[#4318D1] p-8">
            <div class="h-full flex flex-col justify-center gap-8">
              <!-- Job Icon -->
              <div class="flex items-center space-x-4">
                <div class="p-3 rounded-full bg-blue-900">
                  <i class="fas fa-briefcase text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-lg">10,000+ Jobs</h3>
                  <p class="text-sm text-purple-200">Updated daily</p>
                </div>
              </div>

              <!-- Companies Icon -->
              <div class="flex items-center space-x-4">
                <div class="p-3 rounded-full bg-blue-900">
                  <i class="fas fa-building text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-lg">500+ Companies</h3>
                  <p class="text-sm text-purple-200">Hiring now</p>
                </div>
              </div>

              <!-- Easy Apply Icon -->
              <div class="flex items-center space-x-4">
                <div class="p-3 rounded-full bg-blue-900">
                  <i class="fas fa-check-circle text-white text-xl"></i>
                </div>
                <div>
                  <h3 class="font-bold text-lg">Easy Apply</h3>
                  <p class="text-sm text-purple-200">One-click application</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Panel with Registration Form -->
        <div class="w-full md:w-7/12 p-6 md:p-10 overflow-y-auto max-h-screen">
          <!-- User Type Selection -->
          <div class="flex justify-center mb-8">
            <div class="bg-gray-100 rounded-sm p-1 shadow-sm">
              <button
                @click="setUserType('candidate')"
                :class="[
                  'px-6 py-2 rounded-sm transition-all font-medium',
                  formData.userType === 'candidate'
                    ? 'bg-[#4318D1] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200',
                ]"
              >
                Candidate
              </button>
              <button
                @click="setUserType('recruiter')"
                :class="[
                  'px-6 py-2 rounded-sm transition-all font-medium',
                  formData.userType === 'recruiter'
                    ? 'bg-[#4318D1] text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-200',
                ]"
              >
                Recruiter
              </button>
            </div>
          </div>

          <h2 class="text-3xl font-bold mb-2 text-center">Create Account</h2>
          <p class="text-gray-600 mb-8 text-center">
            Join us to start your journey
          </p>

          <!-- Success Message -->
          <div
            v-if="successMessage"
            class="mb-6 p-3 bg-green-100 text-green-700 rounded-md flex items-center"
          >
            <i class="fas fa-check-circle mr-2"></i>
            {{ successMessage }}
          </div>

          <!-- General Error Message -->
          <div
            v-if="errors.general"
            class="mb-6 p-3 bg-red-100 text-red-700 rounded-md flex items-center"
          >
            <i class="fas fa-exclamation-circle mr-2"></i>
            {{ errors.general }}
          </div>

          <form @submit.prevent="handleSubmit">
            <!-- Email Field -->
            <div class="mb-5">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >
                Email Address
              </label>
              <div class="relative">
                <span
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
                >
                  <i class="fas fa-envelope"></i>
                </span>
                <input
                  v-model="formData.email"
                  id="email"
                  class="border border-gray-300 rounded-md w-full py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-[#4318D1] focus:border-transparent"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <p v-if="errors.email" class="text-red-500 text-xs mt-1">
                {{ errors.email }}
              </p>
            </div>

            <!-- Password Field -->
            <div class="mb-5">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Password
              </label>
              <div class="relative">
                <span
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
                >
                  <i class="fas fa-lock"></i>
                </span>
                <input
                  v-model="formData.password"
                  id="password"
                  class="border border-gray-300 rounded-md w-full py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-[#4318D1] focus:border-transparent"
                  type="password"
                  placeholder="Create a password"
                />
              </div>
              <p v-if="errors.password" class="text-red-500 text-xs mt-1">
                {{ errors.password }}
              </p>
            </div>

            <!-- Confirm Password Field -->
            <div class="mb-8">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="confirmPassword"
              >
                Confirm Password
              </label>
              <div class="relative">
                <span
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
                >
                  <i class="fas fa-lock"></i>
                </span>
                <input
                  v-model="formData.confirmPassword"
                  id="confirmPassword"
                  class="border border-gray-300 rounded-md w-full py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-[#4318D1] focus:border-transparent"
                  type="password"
                  placeholder="Confirm your password"
                />
              </div>
              <p
                v-if="errors.confirmPassword"
                class="text-red-500 text-xs mt-1"
              >
                {{ errors.confirmPassword }}
              </p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="bg-[#4318D1] text-white py-3 px-4 rounded-md w-full mb-6 hover:bg-[#3a14b3] transition-colors font-medium shadow-md"
              :disabled="isSubmitting"
            >
              <span
                v-if="isSubmitting"
                class="flex items-center justify-center"
              >
                <i class="fas fa-spinner fa-spin mr-2"></i> Processing...
              </span>
              <span v-else>Create Account</span>
            </button>
          </form>

          <!-- Login Link -->
          <p class="text-center text-gray-600">
            Already have an account?
            <router-link
              to="/login"
              class="text-[#4318D1] font-medium hover:underline"
            >
              Login
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "candidate",
      },
      errors: {},
      isSubmitting: false,
      successMessage: "",
    };
  },
  methods: {
    setUserType(type) {
      this.formData.userType = type;
    },
    validateForm() {
      this.errors = {};

      if (!this.formData.fullName) {
        this.errors.fullName = "Full name is required";
      }

      if (!this.formData.email) {
        this.errors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(this.formData.email)) {
        this.errors.email = "Please enter a valid email address";
      }

      if (!this.formData.password) {
        this.errors.password = "Password is required";
      } else if (this.formData.password.length < 8) {
        this.errors.password = "Password must be at least 8 characters";
      }

      if (!this.formData.confirmPassword) {
        this.errors.confirmPassword = "Please confirm your password";
      } else if (this.formData.password !== this.formData.confirmPassword) {
        this.errors.confirmPassword = "Passwords do not match";
      }

      return Object.keys(this.errors).length === 0;
    },
    handleSubmit() {
      if (this.validateForm()) {
        this.isSubmitting = true;

        // Here you would typically make an API call to register the user
        // For demonstration, simulate a network request
        setTimeout(() => {
          this.isSubmitting = false;
          this.successMessage =
            "Registration successful! Redirecting to login...";

          // Redirect to login after successful registration
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        }, 1000);
      }
    },
  },
};
</script>
