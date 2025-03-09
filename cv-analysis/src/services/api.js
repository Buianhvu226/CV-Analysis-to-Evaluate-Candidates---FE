import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const TIMEOUT = 10000;

/**
 * Tạo instance của axios với các cấu hình mặc định
 */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Tương đương với credentials: 'include' trong fetch
});

/**
 * Thêm interceptor cho request
 * - Tự động thêm token vào header Authorization
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu có
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Thêm interceptor cho response
 * - Xử lý lỗi từ API
 * - Log lỗi trong môi trường development
 */
axiosInstance.interceptors.response.use(
  (response) => {
    // Trả về data trực tiếp thay vì cả response object
    return response.data;
  },
  (error) => {
    // Xử lý lỗi
    if (import.meta.env.DEV) {
      console.error("API Error:", error.response || error);
    }

    const errorResponse = error.response || {};
    const errorData = errorResponse.data || {};

    // Tạo custom error object
    const customError = new Error(
      errorData.message || error.message || "API Error"
    );
    customError.status = errorResponse.status;
    customError.data = errorData;
    customError.response = errorResponse;

    return Promise.reject(customError);
  }
);

// API client sử dụng axios
const apiClient = {
  /**
   * Gửi request GET
   * @param {string} endpoint - URL endpoint
   * @param {Object} options - Options đi kèm với request
   */
  async get(endpoint, options = {}) {
    try {
      return await axiosInstance.get(endpoint, options);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Gửi request POST
   * @param {string} endpoint - URL endpoint
   * @param {Object} data - Dữ liệu gửi đi
   * @param {Object} options - Options đi kèm với request
   */
  async post(endpoint, data = {}, options = {}) {
    try {
      return await axiosInstance.post(endpoint, data, options);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Gửi request PUT
   * @param {string} endpoint - URL endpoint
   * @param {Object} data - Dữ liệu gửi đi
   * @param {Object} options - Options đi kèm với request
   */
  async put(endpoint, data = {}, options = {}) {
    try {
      return await axiosInstance.put(endpoint, data, options);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Gửi request DELETE
   * @param {string} endpoint - URL endpoint
   * @param {Object} options - Options đi kèm với request
   */
  async delete(endpoint, options = {}) {
    try {
      return await axiosInstance.delete(endpoint, options);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Upload file
   * @param {string} endpoint - URL endpoint
   * @param {FormData} formData - FormData chứa file cần upload
   * @param {Object} options - Options đi kèm với request
   * @param {Function} onProgress - Callback function để theo dõi tiến trình upload
   */
  async upload(endpoint, formData, options = {}, onProgress = null) {
    try {
      const uploadOptions = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        ...options,
      };

      // Thêm event listener để theo dõi tiến trình nếu cần
      if (onProgress) {
        uploadOptions.onUploadProgress = (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        };
      }

      return await axiosInstance.post(endpoint, formData, uploadOptions);
    } catch (error) {
      throw error;
    }
  },
};

export default apiClient;
