const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password, role } = req.body; 

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },  
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    return res.status(201).json({ message: 'User registered successfully', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

 
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

  
    return res.json({ message: 'Login successful', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = (req, res) => {
  res.clearCookie('auth_token');
  return res.json({ message: 'Logout successful' });
};


module.exports={
register,login ,logout
}
