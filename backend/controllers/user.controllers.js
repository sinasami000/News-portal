import User from '../models/User.model.js';

export const updateProfile = async (req, res) => {
  try {
    const { name, bio, avatar } = req.body;
    const user = await User.findById(req.user._id);

    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Current password is incorrect." });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "New password must be at least 6 characters.",
        });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: "Password changed successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}


export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}