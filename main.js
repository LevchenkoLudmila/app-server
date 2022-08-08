const http = require('http');
const fs = require('fs');
const path = require('path');
const { sensitiveHeaders } = require('http2');
const { features } = require('process');
let mime = require('mime-types')

let mmm = require('mmmagic'),
Magic = mmm.Magic;

let magic = new Magic(mmm.MAGIC_MIME_TYPE | mmm.MAGIC_MIME_ENCODING);
// the above flags can also be shortened down to just: mmm.MAGIC_MIME
magic.detectFile('node_modules/mmmagic/build/Release/magic.node', function(err, result) {
if (err) throw err;
console.log(result);
// output on Windows with 32-bit node:
//    application/x-dosexec; charset=binary
});

// const { receiveMessageOnPort } = require('worker_threads');
//1 уровень+
      // + підіймаєте веб сервер
      // + робите 2-3 роути (любі, просто пересвідчитись що воно працює)
      // + робите роут для 404
// лвл 2
// робимо роути, які будуть віддавати різні види файлів(реальні файли котрі віддають, на сервері не існують), по порядку:
// 1. просто текст
// 2. текст хтмл
// 3. JSON

// лвл 3
// робимо роути, які будуть віддавати різні види файлів, з реально існуючого файлу. По порядку:
// 1. файл з хтмл сторінкою, при цьому файл має не качатись а як сторінка відкритись
// 2. аналогічно до 1, тільки файл CSS
// 3. аналогічно до 1, тільки файл з малюнком

// лвл 4
// - робимо віддачу файла з малюнком, як у рівні 3, але MIME TYPE файла має визначатись автоматично (шукаємо рішеня на нпм). MIME TYPE це тип файлу, тобто що воно, JPG, PNG чи щось ще.

// лвл 5
// - робимо щоб роутер автоматично шукав файл в якійсь папці. Наприклад якщо запит http://localhost/5000/img/1.png, то ви маєте віддати файл з папки public/img/1.png
// - додаємо автоматичне визначення MIME TYPE

// лвл 6
// - придумуємо захист щоб через алгоритм лвл 5, неможна було запитупати файли за межами папки де ви склали файли для розшарювання
http.createServer((req,res) => {

   console.log('Request!', req.url);
   //загрузка корня
   if(req.url === "/"){
      res.statusCode = 202;
      res.end('Hey');
   } else if (req.url ==="/lord"){
      res.statusCode = 202;
      res.end('I am lord!');
   }else if(req.url ==="/html"){
      res.statusCode = 202( {'Content-Type': 'text/html'});
      res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
               <meta charset="UTF-8">
               <meta http-equiv="X-UA-Compatible" content="IE=edge">
               <meta name="viewport" content="width=device-width, initial-scale=1.0">
               <title>dlya otpravki</title>
            </head>
            <body>
               <h5>Для отправки индекс </h5>
            </body>
            </html>
            `)
   } else{
      res.statusCode = 404;
      res.end('ups, not found');
   }
   
   
   // отправка
   // if(req.url === "/"){
   //    sendRes()
   // }
   // else if (/\/uploads\/[^\/]+S/.test(req.url)&& req.metod === 'POST'{

   // }
   // else{

   // }
   
   function sendRes(url,contentType,res){

      let file = path.join(__dirname+'/static/',url);
      fs.ridfile(file,(err,content) => {
         if(err){
            res.statusCode = 404;
            res.write('not found');
            res.end();
            console.log(`error 404 ${file}`);
         }
      else{
         res.statusCode = 202({'Content-Type': contentType});
         res.write(content);
         res.end();
         console.log(`202 ${file}`);
         }
      });
   }
//вывод html  файла

// //путь после слеша
//    if(request.url.startWith('/oll/')){
//       const filePath = request.url.substr(1)
//       fs.readFile(filePath, function(err,data){
//          if(err){
//             res.statusCode = 404;
//             res.end('not found');
//          } else{
//             res.setHeader('Content-Type','text/html')
//             res.end(data)
//          }
//       })
//    } else{
//       res.end('hello world')
//    }
// //создание и чтение файла
//    fs.writeFile("newfile.txt", "wow мир!", function(error){
 
//       if(error){
//          res.statusCode = 404;
//          res.end('ups, not found'}; 
//          console.log("Запись файла завершена. Содержимое файла:");
//          let data = fs.readFile("hello.txt", "utf8");//данные
//          console.log(data);  // выводим считанные данные
//    });
}).listen(5000);
//не работает...
// http.createServer((req,res) => {
//    res.writeHead(200,{'Content-Type': 'text/html'});
//    res.end(`
//    <!DOCTYPE html>
//    <html lang="en">
//    <head>
//       <meta charset="UTF-8">
//       <meta http-equiv="X-UA-Compatible" content="IE=edge">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>dlya otpravki</title>
//    </head>
//    <body>
//       <h5>Для отправки индекс </h5>
//    </body>
//    </html>
//    `)
// }).listen(5000);