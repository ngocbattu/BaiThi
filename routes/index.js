var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/Them',function (req , res , next ){
  res.render('Them');
})
router.get('/DanhSach',function (req , res , next ){
  Anh.find({},function (err, data){
    res.render('DanhSach', {data : data});
  })

})
router.get('/Update',function (req , res , next ){
  Anh.find({},function (err, data){
    res.render('Update',{data : data});
  })

})
var dbb = "mongodb+srv://tranthengoc:02072002Ngoc@cluster0.nkn24.mongodb.net/Baithi?retryWrites=true&w=majority"
const mongoose = require('mongoose');
mongoose.connect(dbb).catch(error => {
  console.log("lỗi xảy ra " + error)
})
var AnhSchema = new mongoose.Schema({
  maOto:'string' ,
  nhanHieu : 'string',
  namSanXuat : 'string',
  giaGoc : 'string',
  giaBan : 'string',
  anhDaiDien : 'string'
});
var Anh = mongoose.model('oto' , AnhSchema);
router.post('/ThemOto' , function (req , res){

  var maOto = req.body.maOto;
  var nhanHieu = req.body.nhanHieu;
  var namSanXuat = req.body.namSanXuat;
  var giaGoc = req.body.giaGoc;
  var giaBan = req.body.giaBan;
  var anhDaiDien = req.body.anhDaiDien;


  const oto = new Anh({
    maOto : maOto,
    nhanHieu: nhanHieu,
    namSanXuat: namSanXuat,
    giaGoc: giaGoc,
    giaBan : giaBan,
    anhDaiDien : anhDaiDien
  });
  oto.save(function (error){
    var mess;
    if(error == null){
      mess = "Thêm thành công"
    }else {
      mess = error
    }
  })
  res.render('Them');
});
router.post('/Delete',function (req , res ){
  let ObejectID = require('mongodb').ObjectId;
  var id = req.body.id;
  Anh.deleteOne({_id :  ObejectID(id)}, function (err){
    if(err){
      console.log("lỗi ");
    }else {
      console.log("Xóa thành công")
    }
  })
})
router.post('/Update' , function (req , res ){
  let ObejectID = require('mongodb').ObjectId;
  var id = req.body.id;
  var maOto = req.body.maOto;
  var nhanHieu = req.body.nhanHieu;
  var namSanXuat = req.body.namSanXuat;
  var giaGoc = req.body.giaGoc;
  var giaBan = req.body.giaBan;
  var anhDaiDien = req.body.anhDaiDien;

  Anh.updateOne({_id : ObejectID(id)}, {maOto: maOto, nhanHieu : nhanHieu, namSanXuat: namSanXuat , giaGoc : giaGoc,giaBan : giaBan , anhDaiDien : anhDaiDien}, function (err){
    if(err) throw err;
    console.log('Sua thanh cong');
  })
})
module.exports = router;
