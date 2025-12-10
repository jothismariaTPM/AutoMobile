// utils/recentViews.js

export function addRecentView(productId) {
    //localStorage.removeItem("recentViews");

    let viewed = JSON.parse(localStorage.getItem("recentViews"));

    // If the stored value is not an array, reset it
    if (!Array.isArray(viewed)) {
        viewed = [];
    }

    viewed = viewed.filter(id => id !== productId); // remove duplicates
    viewed.unshift(productId); // add to top

    if (viewed.length > 10) viewed.pop(); // keep last 10

    localStorage.setItem("recentViews", JSON.stringify(viewed));
}

export function getRecentViews() {
    return JSON.parse(localStorage.getItem("recentViews")) || [];
}
