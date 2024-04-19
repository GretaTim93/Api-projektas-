const CustomerModel = require('../models/CustomerModel')
const mongoose = require('mongoose')


//get paduoda visa informacija i homepage puslapi
exports.homepage = async (req, res) => {
  
  const locals = {
    title: 'Studentu duomenu baze',
    description: 'Sistema valdanti informacija apie VDU studentus'
  }

  try {
    const customers = await CustomerModel.find({}).limit(20);
    res.render( 'index', { locals, customers});
  } catch(error){
    console.log(error);
  }

} 

//naujo studento sukurimo forma
exports.addCustomer = async(req, res ) => {

  const locals = {
    title: 'Studento pridejimo forma',
    description: 'Sistema valdanti informacija apie VDU studentus'
  }
  res.render( 'customer/add', locals );
}

//sukurti nauja studenta ir prideti ji į duomenų bazę
exports.postCustomer = async(req, res ) => {
  console.log(req.body);

  const newCustomer = new CustomerModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tel: req.body.tel,
    email: req.body.email,
    details: req.body.details
  });

  try {
    await CustomerModel.create(newCustomer);
    res.redirect('/');

  } catch(error){
    console.log(error);
  }
} 

//redaguoti studento informacija
exports.editCustomer = async(req, res ) => {
  try{
    const customer = await CustomerModel.findOne({_id: req.params.id});;
    const locals = {
      title: 'Redaguoti studenta',
      description: 'Sistema valdanti informacija apie VDU studentus'
    }
    res.render( 'customer/edit', { locals,customer } );

  } catch(error){
    console.log(error);
  } 
  
} 

//redaguoti studento informacija post panaudijimas
exports.editPost = async (req, res) => {
  try {
    await CustomerModel.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });

    await res.redirect('/');

  } catch (error) {
    console.log(error);
  }
};

//pašalinti studento informacija
exports.deleteCustomer = async (req, res) => {

  try {
    await CustomerModel.deleteOne({ _id: req.params.id });
    res.redirect('/');

  } catch (error) {
    console.log(error);
  }
};








