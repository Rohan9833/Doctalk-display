import mongoose from 'mongoose';
const enquirySchema=new mongoose.Schema({name:{type:String,required:true,trim:true,maxlength:120},email:{type:String,required:true,trim:true,lowercase:true,maxlength:254},phone:{type:String,trim:true,maxlength:30,default:''},company:{type:String,required:true,trim:true,maxlength:120},product:{type:String,enum:['All three formats','DocTalk','DocTalk Quiz','DocTalk Show'],default:'All three formats'},message:{type:String,trim:true,maxlength:2000,default:''}},{timestamps:true,versionKey:false});
enquirySchema.index({createdAt:-1});
export default mongoose.model('Enquiry',enquirySchema);
