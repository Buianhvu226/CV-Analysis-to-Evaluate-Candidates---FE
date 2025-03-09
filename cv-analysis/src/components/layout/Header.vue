<template>
  <div class="flex flex-col w-full">
    <!-- Header Bar -->
    <div class="bg-gray-100 py-4 px-6 border-b border-gray-200">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-gray-300 rounded-md"></div>
          <h1 class="ml-4 text-xl font-bold text-gray-800">JobConnect</h1>
        </div>
        
        <div class="flex items-center">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span class="ml-2 text-gray-700">Hello, User</span>
          </div>
          <a href="#" class="ml-4 text-orange-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </a>
        </div>
      </div>
    </div>
    
    <!-- Subheader -->
    <div class="bg-white py-2 px-6 shadow-sm">
      <h2 class="text-gray-500 text-sm">Header- Candidates</h2>
    </div>
    
    <!-- List Title -->
    <div class="bg-white px-6 py-4 mt-4">
      <h3 class="text-gray-500 text-sm">List Jobs for candidates</h3>
    </div>
    
    <!-- Profile Completion Modal -->
    <Teleport to="body">
      <div v-if="showProfileModal" class="fixed inset-0 flex items-center justify-center z-50">
        <div class="absolute inset-0 bg-black opacity-30" @click="closeModal"></div>
        <div class="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <button 
            class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            @click="closeModal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h3 class="text-lg font-bold mb-2">Complete Your Profile</h3>
          <p class="text-gray-600 mb-4">Update your information and CV to get better job matches</p>
          
          <div class="mb-4">
            <div class="h-2 bg-gray-200 rounded-full">
              <div 
                class="h-2 bg-purple-600 rounded-full" 
                :style="{ width: '40%' }"
              ></div>
            </div>
            <div class="text-right text-gray-500 text-sm mt-1">40%</div>
          </div>
          
          <div class="flex space-x-4">
            <button class="flex-1 py-2 px-4 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50">
              Update Profile
            </button>
            <button class="flex-1 py-2 px-4 bg-white border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50">
              Upload CV
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      showProfileModal: true
    }
  },
  methods: {
    closeModal() {
      this.showProfileModal = false
    }
  }
}
</script>

<!-- Options API version above, Composition API version below -->

<!--
<script setup>
import { ref } from 'vue'

const showProfileModal = ref(true)

function closeModal() {
  showProfileModal.value = false
}
</script>
-->