import apiClient from "./api";

export default {
  /**
   * Đăng ký người dùng mới
   * @param {string} email - Email
   * @param {string} password - Mật khẩu
   * @param {string} role - Vai trò (recruiter/candidate)
   */
  register(email, password, role) {
    return apiClient.post("/auth/register", {
      email,
      password,
      role,
    });
  },

  /**
   * Đăng nhập
   * @param {string} email - Email
   * @param {string} password - Mật khẩu
   */
  login(email, password) {
    return apiClient.post("/auth/login", { email, password });
  },

  /**
   * Lưu thông tin đăng nhập vào localStorage
   * @param {Object} data - Dữ liệu phản hồi từ API
   */
  setUserData(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  },
};
