
import Listing from "../models/listing.model.js"
import { errorHandler } from "../utils/error.js";


export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create({
      ...req.body,
      userRef: req.user.id, // ✅ from verified token
    });
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req,res,next) =>{
  const listing = await Listing.findById(req.params.id);

  if(!listing){
    return next(errorHandler(404,'listing not found'));}

  if (req.user.id !== listing.userRef.toString()) {
  return next(errorHandler(401, 'You can only delete your own listings!'));
}

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('llisting has been deleted');
  } catch (error) {
    next(error)
  }

};

export const updateListing = async (req,res,next) =>{
  const listing = await Listing.findById(req.params.id);

  if(!listing){
    return next(errorHandler(401, 'listing not found'));
  }

  if(req.user.id !== listing.userRef){
    return next(errorHandler(401, 'you can only update your own listing'))
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );

    res.status(200).json(updatedListing);
  } catch (error) {
    next(error)
  }
};

export  const getListing = async(req,res,next)=>{
  try {
    const listing = await Listing.findById(req.params.id);
    if(!listing){
      return errorHandler(404, 'listing not found ')
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error)
  }
}

export const getListings = async (req,res,next) =>{
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if(offer === undefined || offer === 'true' ){
      offer = {$in: [false,true] };
    }

    let furnished = req.query.furnished;
    if(furnished === undefined || furnished === 'true' ){
      furnished = {$in: [false,true] };
    }

    let parking = req.query.offer;

    if(parking === undefined || parking === 'true' ){
      parking = {$in: [false,true] };
    }


    let type = req.query.type;
    if(type === undefined || type === 'all'){
      type = {$in: ['sale','rent'] };
    }


    const searchTerm = req.query.searchTerm || '';
    const order = req.query.order === 'asc' ? 1 : -1; // default to descending
    const sort = req.query.sort || 'createdAt';

    const listings = await Listing.find({
      name:{$regex: searchTerm, $options:'i'},
      offer,
      furnished,
      parking,
      type,
    }).sort(
      {[sort]:order}
    ).limit(limit).skip(startIndex);

    return res.status(200).json(listings);
    

  } catch (error) {
    next(error);
  }
}

