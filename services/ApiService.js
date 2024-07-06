import { http } from "./http";

function useApiService() {
    function signUpApi(params) {
        return http.post("auth/signup", params).then((res) => {
            return res
        })
    }

    function verifyOtpApi(params) {
        return http.post("auth/verify-otp", params).then((res) => {
            return res
        })
    }

    function loginApi(params) {
        return http.post("auth/login", params).then((res) => {
            return res
        })
    }

    function forgotPasswordApi(data) {
        return http.post(`auth/reset-passward`, data, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })
    }

    function getNovels() {
        return http.get("public/get-new-released-novels").then((res) => {
            return res
        })
    }

    function getMostPopularNovels() {
        return http.get("public/get-most-popular-novels").then((res) => {
            return res
        })
    }

    function getNovelByGenre() {
        return http.get("public/get-all-gernes").then((res) => {
            return res
        })
    }

    function getNovelByid(id) {
        return http.get(`public/get-novels-by-genre?genre=${id}&page=1&limit=10`).then((res) => {
            return res
        })
    }

    function bookmarkNovel(id) {
        return http.put(`user/bookmark-novel?id=${id}`, "", {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function notificationSubscribe(id) {
        return http.get(`user/subscribe-to-topic/${id}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function notificationUnsubscribe(id) {
        return http.get(`user/unsubscribe-from-topic/${id}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function bookmarkNotification(form) {
        return http.put(`user/manage-bookmark-novel-notification`, form, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getBookmarkNovel(url) {
        return http.get(`user/get-my-bookmark-novels?${url}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getProfile() {
        return http.get('user/get-profile', {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function profileImageEdit(form) {
        return http.post(`user/upload-profile-image?type=PROFILE`, form, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function authorProfile(id) {
        return http.get(`user/get-author/${id}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getNovelsByAuthor(url) {
        return http.get(`public/get-author-novels?${url}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function profileEdit(form) {
        return http.put('user/update-profile', form, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getLatesUpdateNovels() {
        return http.get('public/get-latest-update-novels').then((res) => {
            return res
        })
    }

    function getOriginalWork() {
        return http.get('public/get-original-novels').then((res) => {
            return res
        })
    }

    function getRankingByCoins(url) {
        return http.get(`public/get-rank-by-coin-novels?${url}`).then((res) => {
            return res
        })
    }

    function getRankingByView(url) {
        return http.get(`public/get-rank-by-view-novels?${url}`).then((res) => {
            return res
        })
    }

    function getRankingByBookmark(url) {
        return http.get(`public/get-rank-by-bookmark-novels?${url}`).then((res) => {
            return res
        })
    }

    function getPopularThisWeek() {
        return http.get('public/get-popular-this-week-novels').then((res) => {
            return res
        })
    }

    function getNovelDetailById(id) {
        return http.get(`public/get-novel?${id}`).then((res) => {
            return res
        })
    }

    function getChapter(url) {
        return http.get(`user/get-chapter?${url}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        })
    }

    function searchApi(url) {
        return http.get(`public/search-novels-with-filter?${url}`).then((res) => {
            return res
        })
    }

    function postComment(id, comment) {
        return http.post(`user/post-comment?id=${id}`, comment, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function likeComment(id) {
        return http.put(`user/like-comment?id=${id}`, "", {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function dislikeComment(id) {
        return http.put(`user/dislike-comment?id=${id}`, "", {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function likeReviewComment(id) {
        return http.put(`user/like-review?id=${id}`, "", {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function disLikeReviewComment(id) {
        return http.put(`user/dislike-review?id=${id}`, "", {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function postReplyComment(url, comment) {
        return http.post(`user/post-reply-on-comment?${url}`, comment, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function globalSearchFilter(url) {
        return http.get(`public/search-novels-with-filter?${url}`).then((res) => {
            return res
        })
    }

    function getFeaturedProduct() {
        return http.get(`public/get-featured-novels`).then((res) => {
            return res
        })
    }

    function getCoins() {
        return http.get(`public/get-all-coinpackages`).then((res) => {
            return res
        })
    }

    function getAuthorProfile(id) {
        return http.get(`user/get-author/${id}`).then((res) => {
            return res
        })
    }

    function otpResetPassword(form) {
        return http.post(`auth/send-otp-reset-pass`, form).then((res) => {
            return res
        })
    }

    function chepterCompleteStatus(form) {
        return http.put(`user/complete-mark-chapter-reading-status`, form, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function chapterUnreadStatus(form) {
        return http.put(`user/unread-mark-chapter-reading-status`, form, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function detailNovelRate(form) {
        return http.put(`user/rate-novel`, form, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function detailRemoveNovelRate(id) {
        return http.delete(`user/remove-novel-rating?id=${id}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function paymentApi(form) {
        return http.post(`user/payment`, form, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function likeReviewApi(data) {
        return http.put(`like-review`, data, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function dislikeReviewApi(data) {
        return http.put(`dislike-review`, data, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getNovelReviewsApi(url) {
        return http.get(`public/get-novel-reviews?${url}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function updateNovelRating(form) {
        return http.put(`update-novel-rating`, form, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function replyReview(form) {
        return http.post(`post-reply-on-review`, form, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function likeNovel(id) {
        return http.put(`user/like-novel?id=${id}`, '', {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getTransaction(url) {
        return http.get(`user/get-my-transactions?${url}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getGeneralAnnoucment() {
        return http.get(`public/get-general-announcements`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function chpaterAnnoucment(id) {
        return http.get(`public/get-novel-announcements?${id}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getPurchaseTiers(url) {
        return http.get(`user/get-my-tiers?${url}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getCoinHistory(url) {
        return http.get(`user/get-my-coin-history?${url}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function buyChapter(id) {
        return http.post(`user/buy-chapter-from-coins`, id, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function accesssToken() {
        return http.get(`auth/access-token`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getBanners() {
        return http.get(`public/get-banners`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function allNotificationBookmark(data) {
        return http.put(`user/update-bookmark-notification-preference?action=${data}`, "", {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getAllNotificaiton(url) {
        return http.get(`user/get-my-notifications?${url}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getChapterNovel(url) {
        return http.get(`public/get-chapters-by-novel?${url}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function themeMode(mode) {
        return http.put(`user/update-site-theme-preference?mode=${mode}`, "", {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function cms(type) {
        return http.get(`public/get-cms-by-type/${type}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function replyOnReview(id, comment) {
        return http.post(`user/post-reply-on-review?id=${id}`, comment, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function availableNovel(limit) {
        return http.get(`public/get-novels-by-subscription?${limit}`, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function updateTiersApi(form) {
        return http.post(`user/update-tier-payment`, form, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    function getUpgradeTiersData(tierBody) {
        return http.post(`user/update-tier-data`, tierBody, {
            headers: {
                'x-access-token': `${localStorage.getItem('token')}`
            }
        }).then((res) => {
            return res
        })
    }

    return {
        getUpgradeTiersData,
        updateTiersApi,
        availableNovel,
        replyOnReview,
        cms,
        chapterUnreadStatus,
        themeMode,
        getChapterNovel,
        getAllNotificaiton,
        allNotificationBookmark,
        getBanners,
        accesssToken,
        profileImageEdit,
        buyChapter,
        getCoinHistory,
        getPurchaseTiers,
        bookmarkNotification,
        chpaterAnnoucment,
        getGeneralAnnoucment,
        getTransaction,
        likeNovel,
        replyReview,
        updateNovelRating,
        authorProfile,
        likeReviewComment,
        disLikeReviewComment,
        getNovelReviewsApi,
        dislikeReviewApi,
        likeReviewApi,
        paymentApi,
        detailRemoveNovelRate,
        detailNovelRate,
        chepterCompleteStatus,
        notificationSubscribe,
        notificationUnsubscribe,
        otpResetPassword,
        getAuthorProfile,
        getCoins,
        getFeaturedProduct,
        globalSearchFilter,
        postReplyComment,
        dislikeComment,
        likeComment,
        postComment,
        searchApi,
        getChapter,
        getNovelsByAuthor,
        profileEdit,
        getNovelDetailById,
        getPopularThisWeek,
        getRankingByBookmark,
        getRankingByView,
        getRankingByCoins,
        getOriginalWork,
        getLatesUpdateNovels,
        getProfile,
        getBookmarkNovel,
        bookmarkNovel,
        getNovelByid,
        getNovelByGenre,
        getMostPopularNovels,
        getNovels,
        forgotPasswordApi,
        signUpApi,
        verifyOtpApi,
        loginApi,
    }
}

export default useApiService;