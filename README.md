create model and database example :

npx sequelize-cli model:generate --name Role --attributes name:string
npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,role_id:integer

npx sequelize-cli model:generate --name Company --attributes name:string,description:text,address:string,phone:integer,img:string,user_id:integer,is_approved:boolean

npx sequelize-cli model:generate --name Payment --attributes account_number:bigint,name:string,company_id:integer

"name" : "Code Academy"
"description": "Lorem ipsum sit dolor amet"
"address": "Surabaya"
"phone": 081234567891
"img": "https://via.placeholder.com/150"

npx sequelize-cli model:generate --name CourseTag --attributes name:string,duration:integer,company_id:integer,

npx sequelize-cli model:generate --name Course --attributes course_tag_id:integer,description:text,quota:integer,start_date:string,end_date:string,price:bigint,img:string,is_active:boolean

npx sequelize-cli model:generate --name UserCourse --attributes user_id:integer,company_id:integer,course_id:integer,payment_id:integer,is_approved:boolean