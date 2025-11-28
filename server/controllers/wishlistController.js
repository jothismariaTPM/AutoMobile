import User from '../models/User.js'

export const addToWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.wishlist.includes(productId)) {
      return res.json({ success: false, message: "Already in wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();

    return res.json({ success: true, message: "Added to wishlist" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getWishlist = async (req, res) => {
    //console.log("entering get wishlist")
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    return res.json({ success: true, wishlist: user.wishlist || [] });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};



export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    await User.findByIdAndUpdate(userId, {
      $pull: { wishlist: productId }
    });

    return res.json({ success: true, message: "Removed from wishlist" });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
