import axios from "axios";

export default class ApiService {

    static BASE_URL = "http://localhost:8080";

    static getHeader() {
        const token = localStorage.getItem("JWT_TOKEN");
        return {
            Authorization: `Bearer ${token}`,
        };
    }

    /** AUTH API */

    static async registerUser(registration) {
        const response = await axios.post(
            `${this.BASE_URL}/auth/register`, registration)
        return response.data;
    }

    static async loginUser(loginDetails) {
        const response = await axios.post(
            `${this.BASE_URL}/auth/login`, loginDetails)
        return response.data;
    }

    /** USER API */

    static async getLoggedUser() {
        const response = await axios.get(
            `${this.BASE_URL}/user/my-info`, {
                headers: this.getHeader()
            })
        return response.data;
    }

    /** POLITICAL PARTY API */

    static async createPoliticalParty(formData) {
        const response = await axios.post(
            `${this.BASE_URL}/political-party/create`, formData, {
                headers: this.getHeader()
            })
        return response.data;
    }

    static async getAllPoliticalParties() {
        const response = await axios.get(
            `${this.BASE_URL}/political-party/get-all`)
        return response.data;
    }
    //
    // static async getPoliticalPartyById(politicalPartyId) {
    //     const response = await axios.get(
    //         `${this.BASE_URL}/political-party/get-political-party-by-id/${politicalPartyId}`)
    //     return response.data;
    // }
    //
    // static async updatePoliticalParty(politicalPartyId, formData) {
    //     const response = await axios.put(
    //         `${this.BASE_URL}/political-party/update/${politicalPartyId}`, formData,{
    //             headers: this.getHeader()
    //         })
    //     return response.data;
    // }
    //
    // static async deletePoliticalParty(politicalPartyId) {
    //     const response = await axios.delete(
    //         `${this.BASE_URL}/political-party/delete/${politicalPartyId}`,{
    //             headers: this.getHeader()
    //         })
    //     return response.data;
    // }

    /** IDEA API */

    static async createIdea(formData) {
        const response = await axios.post(
            `${this.BASE_URL}/idea/create`, formData, {
                headers: this.getHeader()
            })
        return response.data;
    }

    static async getAllIdeas() {
        const response = await axios.get(
            `${this.BASE_URL}/idea/get-all`)
        return response.data;
    }

    static async getAllIdeasFromUser(userId) {
        const response = await axios.get(
            `${this.BASE_URL}/idea/get-all-by-user/${userId}`)
        return response.data;
    }

    // static async getAllIdeasFromUser(userId) {
    //     const response = await axios.get(
    //         `${this.BASE_URL}/idea/get-all-from-user`, userId)
    //     return response.data;
    // }

    static async getIdeaById(ideaId) {
        const response = await axios.get(
            `${this.BASE_URL}/idea/get-idea-by-id`, ideaId, {
                headers: this.getHeader()});
        return response.data;
    }

    static async updateIdea(ideaId, formData) {
        console.log(ideaId);
        console.log(formData);
        const response = await axios.put(
            `${this.BASE_URL}/idea/update/${ideaId}`, formData,{
                headers: this.getHeader()
            })
        return response.data;
    }

    static async deleteIdea(ideaId) {
        const response = await axios.delete(
            `${this.BASE_URL}/idea/delete/${ideaId}`,{
                headers: this.getHeader()
            })
        return response.data;
    }

    /** COMMENT API */

    static async createComment(formData, ideaId) {
        const response = await axios.post(
            `${this.BASE_URL}/comment/create/${ideaId}`, formData, {
                headers: this.getHeader()
            })
        return response.data;
    }
    //
    static async getAllComments(ideaId) {
        const response = await axios.get(
            `${this.BASE_URL}/comment/get-all-by-idea/${ideaId}`)
        return response.data;
    }

    // static async getCommentById(commentId) {
    //     const response = await axios.get(
    //         `${this.BASE_URL}/comment/get-comment-by-id/${commentId}`)
    //     return response.data;
    // }
    //
    // static async updateComment(commentId, formData) {
    //     const response = await axios.put(
    //         `${this.BASE_URL}/comment/update/${commentId}`, formData,{
    //             headers: this.getHeader()
    //         })
    //     return response.data;
    // }
    //
    // static async deleteComment(commentId) {
    //     const response = await axios.delete(
    //         `${this.BASE_URL}/comment/delete/${commentId}`,{
    //             headers: this.getHeader()
    //         })
    //     return response.data;
    // }

    /** ADDRESS API */

    static async saveAddress(formData) {
        const response = await axios.post(
            `${this.BASE_URL}/address/save`, formData, {
                headers: this.getHeader()
            })
        return response.data;
    }

    /** AUTH CHECKER */

    // static logout() {
    //     localStorage.removeItem("JWT_TOKEN")
    // }

    static isAutheticated() {
        const token = localStorage.getItem("JWT_TOKEN")
        return !!token
    }

    static isPolitician() {
        const role = localStorage.getItem("USER_ROLE")
        return role === 'POLITICIAN'
    }

    /** ACTION */

    static async createLike(ideaId) {
        const response = await axios.post(
            `${this.BASE_URL}/idea/like-idea/${ideaId}`, {},{
                headers: this.getHeader()
            })
        return response.data;
    }

    static async createUnLike(ideaId) {
        const response = await axios.post(
            `${this.BASE_URL}/idea/unlike-idea/${ideaId}`, {}, {
                headers: this.getHeader()
            })
        return response.data;
    }

}