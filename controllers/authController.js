import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

const registor = async (req, res) => {
  try {
    const { name, email, password, role ,HouseNumber} = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
      HouseNumber,
    });

    await newUser.save();

    res.status(201).json({
      message: `User registered successfully with name ${name}`,
    });
  } catch (error) {
   console.error('Register Error:', error);
  res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token ,user: {
    _id: user._id,
      name:user.name,
    email: user.email,
    role: user.role,
    HouseNumber:user.HouseNumber,
  }, message:"succesfully login"});
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export { registor, login };
