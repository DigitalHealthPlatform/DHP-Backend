import { userModel } from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSchema, loginValidator } from "../schema/user_schema.js";
import HealthRecordModel from "../models/healthRecord_models.js";

// User Signup
export const signup = async (req, res, next) => {
    try {
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const { email, password } = value;
        console.log('email', email);

        const findIfUserExist = await userModel.findOne({ email });
        if (findIfUserExist) {
            return res.status(401).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        value.password = hashedPassword;

        await userModel.create(value);

        return res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};

// User Login
export const login = async (req, res, next) => {
    try {
        const { error, value } = loginValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }

        const { email, username, password } = value;

        const user = await userModel.findOne({
            $or: [
                { email: email },
                { userName: username },
            ]
        });

        if (!user) {
            return res.status(401).json('No user found');
        }

        const correctPassword = bcrypt.compareSync(password, user.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '24h' },
        );

        res.status(200).json({
            message: 'User logged in successfully',
            accessToken: token
        });
    } catch (error) {
        next(error);
    }
};

// User Logout
export const logout = async (req, res, next) => {
    try {
        await req.session.destroy();
        res.status(200).json("User logged out");
    } catch (error) {
        next(error);
    }
};


export const getHealthRecords = async (req, res) => {
    try {
      const healthRecords = await HealthRecordModel.find({ userId: req.params.userId });
      if (!healthRecords) return res.status(404).send('Health records not found');
      res.send(healthRecords);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

