const path = require('path');
const CustomError = require('../errors');

const {StatusCodes} = require ('http-status-codes');

const uploadProductImage = async (req, res) => {
    if (!req.files){
        throw new CustomError.BadRequestError('No File Upload');
    }

    const productImage = req.files.image;

    if (!productImage.mimetype.startsWith('image')){
        throw new CustomError.BadRequestError('Please upload image');
    }

    const maxSize = 1024 * 1024;

    if (productImage.size > maxSize){
        throw new CustomError.BadRequestError('Please upload image smaller than 1MB')
    }

    const imagePath = path.join(__dirname, '../public/uploads/'+`${productImage.name}`);
    await productImage.mv(imagePath);
    return res.status(StatusCodes.OK).json({image: {src: `/uploads/${productImage.name}`}});
};

module.exports = {
    uploadProductImage
}