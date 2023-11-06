import Blake2b from "./blake2b";

const hashPassword = (password:string)=>{
    const blake2 = new Blake2b();
    const hash =  blake2.hashString(password);
    return hash;
}
export default hashPassword;