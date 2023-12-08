import conf from "../config/conf";
import { Databases,ID,Storage } from "appwrite";

class Service{

     client = new Client();
     database;//no need to give datatype as it is declared at runtime
     storage;

     constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId)
        this.database=new Databases(this.client);
        this.storage=new Storage(this.client);
     }
    //slug is unique id we can also use ID.unique
     async createPost({title,slug,content,featuredImage,status,userId}){
        try {
           await this.database.createDocument(conf.appwriteDatabseId, conf.appwriteCollectionId,slug, {
              title,
              status,
              content,
              featuredImage,
              userId,
           });
        } catch (error) {
            throw error;
        }
    }
 //in updatePost slug is written separately so that i can get document.id easily otherwise from all post we have to find ...
     async updatePost(slug,{title,content,featuredImage,status}){
            try {
                return await this.database.updateDocument(
                    conf.appwriteDatabseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                    }
                    
                    )
            } catch (error) {
                console.log("Appwrite Service :: updatePost :: error",error)
            }
     }

     async deletePost(slug){
        try {
            await this.database.deleteDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error",error)
            return false;
        }
     }

     async getPost(slug){
        try {
            return await this.database.getDocument(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error",error)
        }

     }

     async getAllPosts(queries=[Query.equal("status","active")]){
          try {
            return await this.database.listDocuments(
                conf.appwriteDatabseId,
                conf.appwriteCollectionId,
                queries,
                /*also intead of queries we can include as stated in Appwritedocs.
                [Query.equal("status","active")]*/
            )
          } catch (error) {
            console.log("Appwrite Service :: getAllPosts :: error",error)
          }

     }

     /*file upload service*/

     async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file //file to be uploaded
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error",error)
        }
     }
     
     async deleteFile(fileId){
          try {
                await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId //id of the file to be deleted
            )
          } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error",error)
            return false;
          }
     }
     
     getFilePreview(fileId){

        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId //id of the file to be previewed
        )
     }


    }
const service=new Service();//making object of Service class so that methods can be easily accesssed with dot operator
export default service;