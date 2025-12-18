import dotenv from 'dotenv';
import users from './data/user.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUser = await User.insertMany(users);
        // get user with admin id
        const adminUser = createdUser[0]._id;

        // inserting every product with user:admin
        const sampleProducts = products.map((product) => {
            return {...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts);

        console.log("Data Imported".green.inverse);
        process.exit();

    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
       await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data destoryed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.inverse)
        process.exit(1);
    }
}


// console.log(process.argv)

if (process.argv[2] === '-d') {
    destroyData()
}else {
    importData()
}